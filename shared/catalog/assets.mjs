// Copied into each consumer's scripts/ by the generator. No runtime/compiler imports.
import { existsSync, readFileSync, realpathSync } from 'node:fs';
import { dirname, isAbsolute, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const fail = (message) => { throw new Error('ASSET_QUERY: ' + message); };
const compare = (a, b) => a < b ? -1 : a > b ? 1 : 0;
const kinds = ['component', 'block', 'pattern'];
const help = `node scripts/assets.mjs search --query <text> [--kind component|block|pattern] [--package <name>] [--limit 5] [--offset 0] [--paths]
node scripts/assets.mjs show --id <id> [--package <name>] [--view quick|full]
Space-separated terms must all match. A zero or partial result does not prove an asset is missing.
--paths adds reference paths (relative to this Skill's references directory). Querying does NOT validate the runtime or project lock.
`;
const zeroHint = 'No match. This does not prove the asset is missing. Retry with one shorter keyword or the English export name, then read references/workbench/index.md and references/ai-ui.md.';
const cjkRun = /[\u3400-\u9fff\uf900-\ufaff]+/g;
function number(value, fallback, minimum, maximum) {
  if (value === undefined) return fallback;
  if (!/^\d+$/.test(value)) fail('invalid integer: ' + value);
  const result = Number(value);
  if (!Number.isSafeInteger(result) || result < minimum || result > maximum) fail('integer out of range: ' + value);
  return result;
}
function readInside(root, name) {
  if (typeof name !== 'string' || !name || isAbsolute(name) || name.includes('\\') || name.split('/').some(p => p === '..' || p === '.')) fail('invalid reference path');
  const base = realpathSync(root);
  const target = realpathSync(resolve(base, name));
  const rel = relative(base, target);
  if (!rel || rel === '..' || rel.startsWith('..' + sep) || isAbsolute(rel)) fail('reference escapes Skill');
  return readFileSync(target, 'utf8');
}
function parse(argv) {
  if (argv.length === 0 || (argv.length === 1 && argv[0] === '--help')) return { command: 'help' };
  const [command, ...rest] = argv;
  const allowed = command === 'search' ? ['--query', '--kind', '--package', '--limit', '--offset', '--paths']
    : command === 'show' ? ['--id', '--package', '--view'] : fail('expected search or show');
  const options = { command };
  for (let i = 0; i < rest.length; i++) {
    const flag = rest[i];
    if (!allowed.includes(flag) || Object.hasOwn(options, flag)) fail('unknown or duplicate option: ' + flag);
    if (flag === '--paths') { options[flag] = true; continue; }
    const value = rest[++i];
    if (!value || value.startsWith('--') || !value.trim()) fail('missing value: ' + flag);
    options[flag] = value;
  }
  if (command === 'search' && !options['--query']) fail('--query required (no implicit full catalog dump)');
  if (command === 'show' && !options['--id']) fail('--id required');
  if (options['--kind'] && !kinds.includes(options['--kind'])) fail('invalid kind');
  if (options['--view'] && !['quick', 'full'].includes(options['--view'])) fail('invalid view');
  return options;
}
export function queryAssets(skillRoot, argv) {
  const options = parse(argv);
  if (options.command === 'help') return help;
  const root = resolve(skillRoot, 'references');
  const index = JSON.parse(readInside(root, 'quick/index.json'));
  if (index.schemaVersion !== 1 || !Array.isArray(index.entries)) fail('invalid index schema');
  const identities = new Set();
  for (const entry of index.entries) {
    if (!entry || typeof entry.id !== 'string' || typeof entry.package !== 'string' ||
        typeof entry.quickReference !== 'string' || typeof entry.reference !== 'string') fail('invalid index entry');
    if (!entry.id || !entry.package ||
        ['name', 'label', 'kind', 'summary', 'exampleStatus'].some(key => entry[key] != null && typeof entry[key] !== 'string') ||
        ['useWhen', 'avoidWhen'].some(key => !Array.isArray(entry[key]) || entry[key].some(value => typeof value !== 'string')) ||
        // Optional so older indexes stay readable; when present they must be string arrays.
        ['searchAliases'].some(key => entry[key] !== undefined &&
          (!Array.isArray(entry[key]) || entry[key].some(value => typeof value !== 'string'))))
      fail('invalid index search fields');
    const key = JSON.stringify([entry.package, entry.id]);
    if (identities.has(key)) fail('duplicate package/id in index');
    identities.add(key);
  }
  let entries = index.entries.filter(e => !options['--package'] || e.package === options['--package']);
  if (options.command === 'show') {
    entries = entries.filter(e => e.id === options['--id']);
    if (!entries.length) fail('asset not found');
    if (entries.length !== 1) fail('ambiguous id; specify --package');
    return readInside(root, options['--view'] === 'full' ? entries[0].reference : entries[0].quickReference);
  }
  const limit = number(options['--limit'], 5, 1, 50);
  const offset = number(options['--offset'], 0, 0, Number.MAX_SAFE_INTEGER);
  const terms = options['--query'].trim().toLowerCase().split(/\s+/);
  const lower = value => typeof value === 'string' ? value.toLowerCase() : null;
  const has = (values, term) => values.some(v => typeof v === 'string' && v.toLowerCase().includes(term));
  // Per term: exact id/export (3) > id/export/label/alias (2) > summary/useWhen (1). Every term must match.
  const rankTerm = (entry, term) => {
    if ([entry.id, entry.name].some(v => lower(v) === term)) return { rank: 3, matchedBy: 'exact-id-or-export' };
    if (has([entry.id, entry.name, entry.label], term)) return { rank: 2, matchedBy: 'name' };
    if (has(entry.searchAliases ?? [], term)) return { rank: 2, matchedBy: 'alias' };
    if (has([entry.summary, ...entry.useWhen], term)) return { rank: 1, matchedBy: 'summary-or-useWhen' };
    return null;
  };
  const allTerms = entry => {
    let best = null;
    for (const term of terms) {
      const found = rankTerm(entry, term);
      if (!found) return null;
      if (!best || found.rank > best.rank) best = found;
    }
    return best;
  };
  // Loose fallback for unspaced Chinese phrases: overlapping two-character pieces.
  const pieces = [...new Set(terms.flatMap(term => [...term.matchAll(cjkRun)].flatMap(([run]) =>
    Array.from({ length: Math.max(0, run.length - 1) }, (_, i) => run.slice(i, i + 2)))))];
  const partial = entry => {
    const hits = pieces.filter(piece => has([entry.label, entry.summary, ...entry.useWhen, ...(entry.searchAliases ?? [])], piece)).length;
    return hits >= 2 ? { rank: hits, matchedBy: 'partial' } : null;
  };
  const candidates = entries.filter(e => !options['--kind'] || e.kind === options['--kind']);
  const run = match => candidates.flatMap(e => { const found = match(e); return found ? [{ ...e, ...found }] : []; })
    .sort((a, b) => b.rank - a.rank || compare(a.package, b.package) || compare(a.id, b.id));
  let matchMode = 'all-terms';
  entries = run(allTerms);
  if (!entries.length && pieces.length) { entries = run(partial); matchMode = 'partial'; }
  if (!entries.length) matchMode = 'none';
  const item = entry => {
    const out = { id: entry.id, package: entry.package, name: entry.name, label: entry.label, kind: entry.kind, summary: entry.summary };
    if (JSON.stringify(entry.useWhen) !== JSON.stringify(entry.summary == null ? [] : [entry.summary])) out.useWhen = entry.useWhen;
    Object.assign(out, { avoidWhen: entry.avoidWhen, exampleStatus: entry.exampleStatus, matchedBy: entry.matchedBy });
    if (options['--paths']) Object.assign(out, { quickReference: entry.quickReference, reference: entry.reference });
    return out;
  };
  const nextOffset = offset + Math.min(limit, Math.max(0, entries.length - offset));
  // One compact line per item keeps the response small while staying line-diffable.
  const items = entries.slice(offset, offset + limit).map(entry => JSON.stringify(item(entry)));
  const head = JSON.stringify({
    schemaVersion: 1, scope: 'reference lookup only; runtime/project validation not performed',
    ...(options['--paths'] ? { referenceBase: 'references/' } : {}),
    query: options['--query'], matchMode, total: entries.length, offset, limit,
    nextOffset: nextOffset < entries.length ? nextOffset : null,
    ...(entries.length ? {} : { hint: zeroHint }),
    items: [],
  }, null, 2);
  return (items.length ? head.slice(0, -4) + '[\n    ' + items.join(',\n    ') + '\n  ]\n}' : head) + '\n';
}
if (process.argv[1] && existsSync(process.argv[1]) && realpathSync(resolve(process.argv[1])) === fileURLToPath(import.meta.url)) {
  try { process.stdout.write(queryAssets(resolve(dirname(fileURLToPath(import.meta.url)), '..'), process.argv.slice(2))); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
