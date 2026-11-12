import test from 'node:test';
import assert from 'node:assert/strict';
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';
import { queryAssets } from '../shared/catalog/assets.mjs';

// Each fixture is intentionally outside the checkout and has NO runtime or node_modules.
// Leave OS-temporary fixtures for inspection rather than deleting computed paths.
function fixture(entries) {
  const root = mkdtempSync(resolve(tmpdir(), '资产查询 空格-'));
  mkdirSync(resolve(root, 'references/quick'), { recursive: true });
  mkdirSync(resolve(root, 'scripts'));
  const save = value => writeFileSync(resolve(root, 'references/quick/index.json'), JSON.stringify({ schemaVersion: 1, entries: value }));
  save(entries);
  writeFileSync(resolve(root, 'references/quick/example.md'), '# quick API\n');
  writeFileSync(resolve(root, 'references/full.md'), '# full API\n');
  cpSync(new URL('../shared/catalog/assets.mjs', import.meta.url), resolve(root, 'scripts/assets.mjs'));
  return { root, save };
}
const entry = (id, extra = {}) => ({ id, package: '@example/ui', name: 'Widget' + id, label: '指标卡片 ' + id,
  kind: 'block', summary: '经营概览', useWhen: ['经营指标'], avoidWhen: ['不适用的字段'],
  quickReference: 'quick/example.md', reference: 'full.md', exampleStatus: 'unknown', ...extra });

test('search is bounded, ranked, deterministic, paginated and reports no matches', () => {
  const { root } = fixture([entry('z'), entry('b'), entry('a')]);
  const search = (...args) => JSON.parse(queryAssets(root, ['search', '--query', '指标', ...args]));
  const first = search('--limit', '2');
  assert.equal(first.total, 3); assert.equal(first.nextOffset, 2);
  assert.deepEqual(first.items.map(e => e.id), ['a', 'b']);
  const last = search('--limit', '2', '--offset', '2');
  assert.equal(last.nextOffset, null); assert.deepEqual(last.items.map(e => e.id), ['z']);
  assert.equal(search('--offset', '10').items.length, 0);
  assert.equal(JSON.parse(queryAssets(root, ['search', '--query', 'Widgetb'])).items[0].matchedBy, 'exact-id-or-export');
  assert.equal(JSON.parse(queryAssets(root, ['search', '--query', '不存在'])).total, 0);
  assert.equal(JSON.parse(queryAssets(root, ['search', '--query', '不适用的字段'])).total, 0);
  assert.equal(search('--kind', 'component').total, 0);
  assert.equal(search('--package', 'other').total, 0);
});

test('pagination covers empty, exact-end and single-item pages without duplicates', () => {
  const { root, save } = fixture([entry('b'), entry('a'), entry('c')]);
  const search = (...args) => JSON.parse(queryAssets(root, ['search', '--query', '指标', ...args]));
  const collected = [];
  let offset = 0;
  do {
    const page = search('--offset', String(offset), '--limit', '1');
    assert.equal(page.total, 3);
    assert.equal(page.offset, offset);
    assert.equal(page.limit, 1);
    collected.push(...page.items.map(item => item.id));
    offset = page.nextOffset;
  } while (offset !== null);
  assert.deepEqual(collected, ['a', 'b', 'c']);
  for (const value of ['3', '4', String(Number.MAX_SAFE_INTEGER)]) {
    const page = search('--offset', value);
    assert.equal(page.total, 3);
    assert.equal(page.nextOffset, null);
    assert.deepEqual(page.items, []);
  }
  save([entry('only')]);
  assert.equal(search('--limit', '50').items.length, 1);
  assert.equal(search('--limit', '50').nextOffset, null);
  save([]);
  const empty = search();
  assert.equal(empty.total, 0);
  assert.equal(empty.nextOffset, null);
  assert.deepEqual(empty.items, []);
});

test('search ranking and package tie-breaks are independent of index order', () => {
  const values = [
    entry('c', { summary: 'needle scenario' }),
    entry('b', { label: 'needle widget' }),
    entry('needle'),
    entry('b', { label: 'needle widget', package: '@another/ui' }),
  ];
  const { root, save } = fixture(values);
  const args = ['search', '--query', ' NEEDLE ', '--limit', '50'];
  const first = JSON.parse(queryAssets(root, args));
  assert.deepEqual(first.items.map(item => [item.package, item.id, item.matchedBy]), [
    ['@example/ui', 'needle', 'exact-id-or-export'],
    ['@another/ui', 'b', 'name'],
    ['@example/ui', 'b', 'name'],
    ['@example/ui', 'c', 'summary-or-useWhen'],
  ]);
  save([...values].reverse());
  assert.deepEqual(JSON.parse(queryAssets(root, args)), first);
});

test('show returns complete quick/full documents and requires disambiguation', () => {
  const { root } = fixture([entry('a'), entry('a', { package: '@other/ui' })]);
  assert.throws(() => queryAssets(root, ['show', '--id', 'a']), /ambiguous/);
  assert.equal(queryAssets(root, ['show', '--id', 'a', '--package', '@example/ui']), '# quick API\n');
  assert.equal(queryAssets(root, ['show', '--id', 'a', '--package', '@example/ui', '--view', 'full']), '# full API\n');
  assert.throws(() => queryAssets(root, ['show', '--id', 'missing']), /not found/);
});

test('invalid arguments never fall back to an unbounded dump', () => {
  const { root } = fixture([entry('a')]);
  for (const args of [
    ['search'], ['search', '--query', ''], ['search', '--query', ' '], ['show'],
    ['unknown'], ['search', '--query', 'x', '--query', 'y'],
    ['search', '--query', 'x', '--kind', 'typo'], ['show', '--id', 'a', '--view', '../full'],
    ['search', '--query', 'x', '--oops', 'value'], ['search', '--query', 'x', 'extra'],
    ...['-1', '0', '1.5', 'NaN', 'Infinity', '51', '9007199254740992'].map(v => ['search', '--query', 'x', '--limit', v]),
    ...['-1', '1.1', 'NaN', '9007199254740992'].map(v => ['search', '--query', 'x', '--offset', v]),
  ]) assert.throws(() => queryAssets(root, args), /ASSET_QUERY/);
  assert.match(queryAssets(root, []), /search/);
});

test('malformed indexes, duplicate identities, traversal and external symlinks are rejected', () => {
  const { root, save } = fixture([entry('a')]);
  save([entry('a'), entry('a')]);
  assert.throws(() => queryAssets(root, ['search', '--query', '指标']), /duplicate/);
  save([{}]); assert.throws(() => queryAssets(root, ['search', '--query', '指标']), /invalid index entry/);
  for (const path of ['../outside.md', '/etc/passwd', '..\\outside']) {
    save([entry('a', { quickReference: path })]);
    assert.throws(() => queryAssets(root, ['show', '--id', 'a']), /invalid reference/);
    save([entry('a', { reference: path })]);
    assert.throws(() => queryAssets(root, ['show', '--id', 'a', '--view', 'full']), /invalid reference/);
  }
  writeFileSync(resolve(root, 'outside.md'), 'outside');
  symlinkSync(resolve(root, 'outside.md'), resolve(root, 'references/quick/escape.md'));
  save([entry('a', { quickReference: 'quick/escape.md' })]);
  assert.throws(() => queryAssets(root, ['show', '--id', 'a']), /escapes/);
  writeFileSync(resolve(root, 'references/quick/index.json'), '{}');
  assert.throws(() => queryAssets(root, ['search', '--query', '指标']), /schema/);
});

test('malformed search fields are rejected instead of silently changing matching semantics', () => {
  const { root, save } = fixture([]);
  const invalid = [
    { id: '' }, { package: '' }, { id: 7 }, { package: null },
    ...['name', 'label', 'kind', 'summary', 'exampleStatus'].flatMap(key =>
      [false, 1, {}, []].map(value => ({ [key]: value }))),
    ...['useWhen', 'avoidWhen'].flatMap(key =>
      ['经营指标', {}, null, undefined, [1], [null], [{}]].map(value => ({ [key]: value }))),
  ];
  for (const patch of invalid) {
    save([entry('a', patch)]);
    assert.throws(() => queryAssets(root, ['search', '--query', '指标']), /invalid index/);
    assert.throws(() => queryAssets(root, ['show', '--id', 'a']), /invalid index/);
  }
  save([entry('a', { name: null, label: null, kind: null, summary: null, exampleStatus: null })]);
  assert.equal(JSON.parse(queryAssets(root, ['search', '--query', '经营指标'])).total, 1);
  writeFileSync(resolve(root, 'references/quick/index.json'), '{broken JSON');
  assert.throws(() => queryAssets(root, ['search', '--query', '指标']), SyntaxError);
  for (const value of [{ schemaVersion: 2, entries: [] }, { schemaVersion: 1, entries: {} }]) {
    writeFileSync(resolve(root, 'references/quick/index.json'), JSON.stringify(value));
    assert.throws(() => queryAssets(root, ['search', '--query', '指标']), /schema/);
  }
});

test('stdin module imports do not accidentally run the CLI entry guard', () => {
  const { root } = fixture([entry('a')]);
  const script = pathToFileURL(resolve(root, 'scripts/assets.mjs')).href;
  const result = spawnSync(process.execPath, ['--input-type=module', '-'], {
    cwd: tmpdir(), encoding: 'utf8',
    input: `import { queryAssets } from ${JSON.stringify(script)};\nprocess.stdout.write(queryAssets(${JSON.stringify(root)}, ['search', '--query', '指标']));`,
  });
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stderr, '');
  assert.equal(JSON.parse(result.stdout).total, 1);
});

test('standalone CLI uses its own base, keeps stdout clean and needs no runtime', () => {
  const { root } = fixture([entry('a')]);
  const invoke = args => spawnSync(process.execPath, [resolve(root, 'scripts/assets.mjs'), ...args], { cwd: tmpdir(), encoding: 'utf8' });
  const result = invoke(['search', '--query', '指标']);
  assert.equal(result.status, 0, result.stderr); assert.equal(result.stderr, '');
  assert.equal(JSON.parse(result.stdout).total, 1);
  const bad = invoke(['show', '--id', 'missing']);
  assert.equal(bad.status, 1); assert.equal(bad.stdout, ''); assert.match(bad.stderr, /not found/);
});

test('all three generated consumers have identical standalone tools and resolvable references', () => {
  const source = readFileSync(new URL('../shared/catalog/assets.mjs', import.meta.url), 'utf8');
  for (const skill of ['partner-ui-pages', 'partner-ui-vue3', 'partner-ui-review']) {
    const root = new URL('../skills/' + skill + '/', import.meta.url);
    assert.equal(readFileSync(new URL('scripts/assets.mjs', root), 'utf8'), source);
    const index = JSON.parse(readFileSync(new URL('references/quick/index.json', root), 'utf8'));
    assert.ok(index.entries.length > 0);
    for (const entry of index.entries) for (const key of ['quickReference', 'reference'])
      assert.ok(readFileSync(new URL('references/' + entry[key], root)).length > 0);
    // Copy actual generated bytes, not just the source CLI or synthetic documents.
    const isolated = fixture(index.entries).root;
    cpSync(new URL('scripts/assets.mjs', root), resolve(isolated, 'scripts/assets.mjs'));
    cpSync(new URL('references/quick/index.json', root), resolve(isolated, 'references/quick/index.json'));
    const selected = index.entries[0];
    for (const [key, view] of [['quickReference', 'quick'], ['reference', 'full']]) {
      const source = new URL('references/' + selected[key], root);
      const target = resolve(isolated, 'references', selected[key]);
      mkdirSync(dirname(target), { recursive: true });
      cpSync(source, target);
      const result = spawnSync(process.execPath, [resolve(isolated, 'scripts/assets.mjs'), 'show',
        '--id', selected.id, '--package', selected.package, '--view', view], { cwd: tmpdir(), encoding: 'utf8' });
      assert.equal(result.status, 0, `${skill}/${view}: ${result.stderr}`);
      assert.equal(result.stderr, '');
      assert.equal(result.stdout, readFileSync(source, 'utf8'));
    }
    assert.equal(existsSync(resolve(isolated, 'assets/runtime')), false);
    assert.equal(existsSync(resolve(isolated, 'node_modules')), false);
  }
});
