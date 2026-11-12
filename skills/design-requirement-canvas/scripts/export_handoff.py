#!/usr/bin/env python3
"""Export a generation handoff (design-handoff/1) from a validated manifest.

Output: <out>/generation-brief.json (machine input for a page generator such as partner-ui-pages /
partner-ui-vue3, or a product team's own pipeline) and <out>/generation-brief.md (human review).
Only `reuse` and `component-work` items become generation scope; `review` items are listed as
exclusions and never appear inside a page's buildable parts. Crop images are referenced, not embedded.
"""
import argparse
import hashlib
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from validate_canvas_contract import validate  # noqa: E402


def brief(data, manifest_hash):
    assets = {a['id']: a for a in data['assets']}
    work_by_section = {}
    for w in data['workItems']:
        work_by_section.setdefault(w['sectionId'], []).append(w)
    edges = data.get('edges', [])
    preconditions, exclusions, pages = [], [], []
    for page in data['pages']:
        sections = []
        for s in page['sections']:
            items = work_by_section.get(s['id'], [])
            build = [w for w in items if w['lane'] != 'review']
            excluded = [w for w in items if w['lane'] == 'review']
            for w in excluded:
                exclusions.append({'workItemId': w['id'], 'pageId': page['id'], 'sectionId': s['id'],
                                   'title': w.get('title', w['id']), 'reason': w['reason']})
            for w in build:
                if w['lane'] == 'component-work':
                    preconditions.append({'workItemId': w['id'], 'pageId': page['id'], 'sectionId': s['id'],
                                          'title': w.get('title', w['id']), 'workKind': w.get('workKind'),
                                          'baseAssets': [assets[a].get('publicExport', a) for a in w.get('baseAssetIds', [])],
                                          'reason': w['reason'], 'acceptance': w.get('acceptance', []),
                                          'capabilityRefs': w.get('capabilityRefs', []),
                                          'unknowns': w.get('unknowns', []),
                                          'acceptanceStatus': w.get('acceptanceStatus')})
            sections.append({
                'id': s['id'], 'title': s['title'],
                'generation': 'exclude' if items and not build else 'after-component-verification' if any(w['lane'] == 'component-work' for w in build) else 'use-existing-components' if build else 'unscoped',
                'region': s.get('evidence', {}).get('region'),
                'facts': s.get('facts', []), 'fields': s.get('fields', []),
                'referenceState': s.get('referenceState', {}), 'referenceDisplayData': s.get('referenceDisplayData', []),
                'actions': [{**a, 'target': a.get('targetPageId')} for a in s.get('actions', [])],
                'components': [{
                    'mappingId': m['id'], 'assetId': m['assetId'],
                    'publicExport': assets.get(m['assetId'], {}).get('publicExport'),
                    'version': assets.get(m['assetId'], {}).get('version'),
                    'configurationStatus': m['configurationStatus'],
                    'props': m.get('props', {}), 'slots': m.get('slots', {}), 'bindings': m.get('bindings', {}),
                    'events': m.get('events', {}), 'actionIds': m.get('actionIds', []), 'unknowns': m.get('unknowns', [])}
                    for m in s.get('mappings', [])],
                'workItems': [{'id': w['id'], 'lane': w['lane'], 'reason': w['reason'],
                               'capabilityRefs': w.get('capabilityRefs', []), 'unknowns': w.get('unknowns', []),
                               'acceptance': w.get('acceptance', []), 'acceptanceStatus': w.get('acceptanceStatus')} for w in build],
                'excludedParts': [{'id': w['id'], 'title': w.get('title', w['id']), 'reason': w['reason']} for w in excluded],
                'unknowns': s.get('unknowns', []), 'acceptance': s.get('acceptance', [])})
        pages.append({'id': page['id'], 'title': page['title'], 'role': page['role'], 'image': page.get('image'),
                      'description': page.get('description'),
                      **{k: page[k] for k in ('nodeType', 'ownerPageId', 'context', 'capture') if k in page},
                      'links': [{**e, 'strength': e.get('strength', 'explicit')} for e in edges if e['from'] == page['id']],
                      'summary': {k: page['requirementSummary'].get(k, []) for k in ('facts', 'unknowns', 'acceptance')},
                      'sections': sections})
    unconfigured = sum(1 for p in pages for s in p['sections'] if s['generation'] != 'exclude'
                       for c in s['components'] if c['configurationStatus'] == 'candidate')
    return {
        'schemaVersion': 'design-handoff/1',
        'sourceManifestSha256': manifest_hash,
        'title': (data.get('canvas') or {}).get('title') or (data.get('meta') or {}).get('title'),
        'rules': [
            'Build only sections whose generation is use-existing-components; after-component-verification waits for the listed preconditions.',
            'excludedParts and exclusions are review-only references: do not draw or approximate them.',
            'referenceDisplayData reproduces the screenshot sample values; it is not business data or a calculation rule.',
            'Links with kind evidence describe supplementary screenshots or explanations, never business navigation.',
            'Actions with targetStatus unknown stay visible with an unresolved destination; never invent routes.',
            'Component configurationStatus candidate means props/slots/events still need checking against the locked package reference.',
            'Use existing component public APIs and styles; do not override component internals to match pixels.'],
        'assets': [{k: a.get(k) for k in ('id', 'publicExport', 'version', 'qualification', 'contractSource')} for a in data['assets']],
        'capabilities': data.get('capabilities', []),
        'preconditions': preconditions, 'exclusions': exclusions, 'pages': pages,
        'stats': {'pages': len(pages), 'sections': sum(len(p['sections']) for p in pages),
                  'buildableSections': sum(1 for p in pages for s in p['sections'] if s['generation'] == 'use-existing-components'),
                  'waitingSections': sum(1 for p in pages for s in p['sections'] if s['generation'] == 'after-component-verification'),
                  'excludedParts': len(exclusions), 'candidateComponents': unconfigured},
    }


def markdown(b):
    out = [f'# 生成交接 · {b["title"]}', '',
           f'来源 manifest SHA-256：`{b["sourceManifestSha256"]}`。截图请配合场景 `crops/` 或离线画布 HTML 使用。', '',
           '| 页面 | 区块 | 可直接生成 | 等待组件前置 | 待评审排除 | 候选未配置组件 |', '|---|---|---|---|---|---|',
           f'| {b["stats"]["pages"]} | {b["stats"]["sections"]} | {b["stats"]["buildableSections"]} | {b["stats"]["waitingSections"]} | {b["stats"]["excludedParts"]} | {b["stats"]["candidateComponents"]} |', '',
           '## 执行规则', ''] + [f'- {r}' for r in b['rules']] + ['', '## 组件前置工作（先完成并验证）', '']
    out += [f'- **{p["title"]}**（{p["pageId"]}/{p["sectionId"]}，{p["workKind"]}；基础：{", ".join(p["baseAssets"]) or "无"}）：{p["reason"]}' for p in b['preconditions']] or ['- 无']
    out += ['', '## 待评审排除（不生成）', '']
    out += [f'- **{x["title"]}**（{x["pageId"]}/{x["sectionId"]}）：{x["reason"]}' for x in b['exclusions']] or ['- 无']
    for p in b['pages']:
        out += ['', f'## {p["title"]} · {p["role"]}', '', f'`{p["id"]}` · 截图 `{p["image"]}`', '']
        for s in p['sections']:
            comps = '、'.join(f'{c["publicExport"] or c["assetId"]}（{c["configurationStatus"]}）' for c in s['components']) or '无'
            out.append(f'- **{s["title"]}** · `{s["generation"]}` · 组件：{comps}')
            if s['excludedParts']:
                out.append('  - 排除：' + '；'.join(x['title'] for x in s['excludedParts']))
            if s['unknowns']:
                out.append('  - 待确认：' + '；'.join(s['unknowns'][:4]) + ('…' if len(s['unknowns']) > 4 else ''))
    return '\n'.join(out) + '\n'


def export(manifest, out=None):
    raw = Path(manifest).read_bytes()
    data = json.loads(raw)
    result = validate(data)
    if not result['ok']:
        raise SystemExit(json.dumps({'ok': False, 'errors': result['errors']}, ensure_ascii=False, indent=2))
    b = brief(data, hashlib.sha256(raw).hexdigest())
    out = Path(out or Path(manifest).resolve().parent / 'dist' / 'handoff').resolve()
    out.mkdir(parents=True, exist_ok=True)
    (out / 'generation-brief.json').write_text(json.dumps(b, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    (out / 'generation-brief.md').write_text(markdown(b), encoding='utf-8')
    return {'ok': True, 'out': str(out), 'stats': b['stats']}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('manifest', type=Path)
    parser.add_argument('--out', type=Path, help='output folder (default: <scenario>/dist/handoff)')
    args = parser.parse_args()
    print(json.dumps(export(args.manifest, args.out), ensure_ascii=False, indent=2))


if __name__ == '__main__':
    from cli_encoding import configure_cli_encoding
    configure_cli_encoding()
    main()
