#!/usr/bin/env python3
"""Check per-page review data and scope ownership; does not inspect rendered UI or images."""
import argparse
import json
from pathlib import Path
from validate_manifest import validate as validate_structure


# Generic filler that says nothing the screenshot could not already say. Warnings, not errors:
# a human must decide whether the item is truly unreadable or just not transcribed yet.
PLACEHOLDERS = ('以原图为准', '见原图', '参考原图', '同上', '与上一页一样', '与上页一致', 'TODO', 'TBD', '待补充', '……')


def check_canvas(data, error, warnings):
    pages = {p['id'] for p in data['pages']}
    sections = {s['id']: p['id'] for p in data['pages'] for s in p['sections']}
    canvas = data.get('canvas')
    if canvas is not None:
        if not isinstance(canvas, dict):
            error('canvas', 'expected object')
        else:
            placed = set()
            views = canvas.get('views', [])
            if not isinstance(views, list):
                error('canvas.views', 'expected array')
                views = []
            view_ids = set()
            for i, view in enumerate(views):
                vpath = f'canvas.views[{i}]'
                if not isinstance(view, dict) or not isinstance(view.get('id'), str) or not view['id']:
                    error(vpath, 'view needs a fixed id')
                    continue
                if view['id'] in view_ids:
                    error(vpath + '.id', 'duplicate view id')
                view_ids.add(view['id'])
                if 'relationMode' in view and view['relationMode'] not in ('all', 'focus'):
                    error(vpath + '.relationMode', 'expected all or focus')
                if 'showEvidence' in view and not isinstance(view['showEvidence'], bool):
                    error(vpath + '.showEvidence', 'expected boolean')
                if not isinstance(view.get('groups'), list) or not view['groups']:
                    error(vpath + '.groups', 'expected nonempty group array')
                    continue
                for j, group in enumerate(view['groups']):
                    gpath = f'{vpath}.groups[{j}]'
                    ids = group.get('pageIds') if isinstance(group, dict) else None
                    if not isinstance(ids, list) or not ids:
                        error(gpath + '.pageIds', 'expected nonempty page ID array')
                        continue
                    for pid in ids:
                        if pid not in pages:
                            error(gpath + '.pageIds', 'unresolved page: ' + str(pid))
                        placed.add(pid)
            if views and pages - placed:
                error('canvas.views', 'pages not placed in any view: ' + ', '.join(sorted(pages - placed)))
    action_owners = {a['id']: (p['id'], s['id']) for p in data['pages'] for s in p['sections'] for a in s.get('actions', [])}
    def check_region(value, path):
        if not isinstance(value, list) or len(value) != 4 or any(isinstance(x, bool) or not isinstance(x, (int, float)) or not __import__('math').isfinite(x) for x in value):
            error(path, 'expected finite [left, top, width, height] percentages')
        elif value[0] < 0 or value[1] < 0 or value[2] <= 0 or value[3] <= 0 or value[0]+value[2] > 100 or value[1]+value[3] > 100:
            error(path, 'region outside cropped screenshot or empty')
    def endpoint(owner_page, section_id, action_id, region, path):
        if any(x is not None for x in (section_id, action_id, region)) and owner_page not in pages:
            error(path, 'endpoint details require a resolved page')
        if section_id is not None and sections.get(section_id) != owner_page:
            error(path, 'section must belong to endpoint page')
        if action_id is not None:
            owner = action_owners.get(action_id)
            if not owner or owner[0] != owner_page or section_id is not None and owner[1] != section_id:
                error(path, 'action must belong to endpoint page and section')
        if region is not None: check_region(region, path + '.region')
    for p in data['pages']:
        for s in p['sections']:
            for a in s.get('actions', []):
                if 'region' in a.get('evidence', {}): check_region(a['evidence']['region'], 'actions.' + a['id'] + '.evidence.region')
                endpoint(a.get('targetPageId'), a.get('targetSectionId'), a.get('targetActionId'), a.get('targetRegion'), 'actions.' + a['id'] + '.target')
    page_map = {p['id']: p for p in data['pages']}
    for p in data['pages']:
        kind = p.get('nodeType', 'page')
        if kind not in ('page', 'dialogue', 'modal', 'reference'):
            error('pages.' + p['id'] + '.nodeType', 'unknown node type')
        owner = p.get('ownerPageId')
        if kind in ('dialogue', 'modal') and not owner:
            error('pages.' + p['id'] + '.ownerPageId', 'dialogue/modal requires a host page')
        if owner is not None and (owner == p['id'] or owner not in page_map or page_map[owner].get('nodeType', 'page') != 'page'):
            error('pages.' + p['id'] + '.ownerPageId', 'must reference a distinct real page')
        if 'capture' in p and (not isinstance(p['capture'], dict) or p['capture'].get('mode') not in ('expanded-scroll', 'content-crop', 'viewport')):
            error('pages.' + p['id'] + '.capture', 'expected a supported capture mode')
    edge_ids = set()
    for i, edge in enumerate(data.get('edges', []) or []):
        epath = f'edges[{i}]'
        if not isinstance(edge, dict):
            error(epath, 'expected object')
            continue
        for key in ('from', 'to'):
            if edge.get(key) not in pages:
                error(epath + '.' + key, 'unresolved page')
        if not isinstance(edge.get('label'), str) or not edge['label'].strip():
            error(epath + '.label', 'edge needs the trigger text seen in the reference')
        if edge.get('kind', 'navigation') not in ('navigation', 'evidence'):
            error(epath + '.kind', 'expected navigation or evidence')
        if edge.get('strength', 'explicit') not in ('explicit', 'origin-only'):
            error(epath + '.strength', 'expected explicit or origin-only')
        if 'fromSectionId' in edge and sections.get(edge['fromSectionId']) != edge.get('from'):
            error(epath + '.fromSectionId', 'section must belong to the edge source page')
        for side, pid in [('from', edge.get('from')), ('to', edge.get('to'))]:
            endpoint(pid, edge.get(side+'SectionId'), edge.get(side+'ActionId'), edge.get(side+'Region'), epath+'.'+side)
        if edge.get('id'):
            if edge['id'] in edge_ids:
                error(epath + '.id', 'duplicate edge id')
            edge_ids.add(edge['id'])
    main = (data.get('canvas') or {}).get('mainPathEdgeIds', [])
    known_edges = {ed.get('id') for ed in data.get('edges', [])} | {a['id'] for p in data['pages'] for s in p['sections'] for a in s.get('actions', []) if a.get('targetStatus') == 'confirmed'}
    if not isinstance(main, list) or any(not isinstance(k, str) or k not in known_edges for k in main) or len(main) != len(set(main)):
        error('canvas.mainPathEdgeIds', 'expected unique confirmed edge/action IDs; never infer a main business flow')
    default_view = (data.get('canvas') or {}).get('defaultViewId')
    if default_view is not None and default_view not in {v.get('id') for v in (data.get('canvas') or {}).get('views', [])}:
        error('canvas.defaultViewId', 'unresolved view')
    for page in data['pages']:
        if 'image' in page and (not isinstance(page['image'], str) or not page['image'] or page['image'].startswith('/')):
            error('pages.' + page['id'] + '.image', 'expected crop image path relative to the manifest')


def lint_placeholders(data, warnings):
    hits = []
    for page in data['pages']:
        texts = [('requirementSummary.facts', t) for t in page.get('requirementSummary', {}).get('facts', []) if isinstance(t, str)]
        for s in page['sections']:
            texts += [(s['id'] + '.facts', t) for t in s.get('facts', []) if isinstance(t, str)]
            texts += [(s['id'] + '.fields', t) for t in s.get('fields', []) if isinstance(t, str)]
            if not s.get('fields') and not s.get('referenceDisplayData'):
                hits.append(page['id'] + '/' + s['id'] + ': no fields or referenceDisplayData recorded')
        for where, text in texts:
            stripped = text.strip()
            # Field labels are short by nature; only facts must say something concrete.
            too_short = where.endswith('facts') and len(stripped) < 4
            if too_short or any(p in stripped for p in PLACEHOLDERS):
                hits.append(page['id'] + '/' + where + ': generic or placeholder text “' + stripped[:30] + '”')
    if hits:
        warnings.append({'placeholderLint': len(hits), 'items': hits[:40],
                         'note': 'Re-read the screenshot: transcribe readable values or mark the item explicitly unreadable.'})


def validate(data):
    result = validate_structure(data)
    # Invalid base documents are not safe to traverse; preserve their original diagnostics.
    if not result['ok']:
        return result
    errors = result['errors']
    warnings = result['warnings']
    work = {w['id']: w for w in data['workItems']}

    def error(path, text):
        errors.append({'path': path, 'message': text})

    capabilities = data.get('capabilities', [])
    if not isinstance(capabilities, list):
        error('capabilities', 'expected array')
        capabilities = []
    capability_ids = set()
    for i, capability in enumerate(capabilities):
        cid = capability.get('id') if isinstance(capability, dict) else None
        if not isinstance(cid, str) or not cid.strip() or cid in capability_ids:
            error(f'capabilities[{i}].id', 'expected unique nonempty ID')
        else:
            capability_ids.add(cid)
    for item in data['workItems']:
        refs = item.get('capabilityRefs', [])
        if not isinstance(refs, list) or any(not isinstance(ref, str) or ref not in capability_ids for ref in refs):
            error('workItems.' + item['id'] + '.capabilityRefs', 'expected references to declared capabilities')

    def strings(value, path):
        if not isinstance(value, list) or any(not isinstance(s, str) or not s.strip() for s in value):
            error(path, 'expected array of nonempty strings (empty array allowed with explicit UI state)')
            return False
        return True

    for asset in data['assets']:
        public = asset.get('publicExport')
        if not isinstance(public, str) or not public.strip() or public.startswith('@') or '/' in public:
            error('assets.' + asset['id'] + '.publicExport', 'expected actual public component symbol, not package name; unresolved assets must not pretend verified')

    for page in data['pages']:
        path = 'pages.' + page['id'] + '.requirementSummary'
        summary = page.get('requirementSummary')
        if not isinstance(summary, dict):
            error(path, 'missing page review summary: facts/componentWork/unknowns/acceptance/scopeWorkItemIds')
            continue
        for key in ('facts', 'unknowns', 'acceptance'):
            if strings(summary.get(key), path + '.' + key) and not summary[key]:
                warnings.append(path + '.' + key + ': empty; show 未登记/不适用 accurately, do not imply complete')
        section_ids = {s['id'] for s in page['sections']}
        expected = {k for k, w in work.items() if w['sectionId'] in section_ids}
        actual = summary.get('scopeWorkItemIds')
        if strings(actual, path + '.scopeWorkItemIds'):
            if len(actual) != len(set(actual)) or set(actual) != expected:
                error(path + '.scopeWorkItemIds', 'must contain exactly this page’s work item IDs; no duplicates or foreign items')
        special = {k for k in expected if work[k]['lane'] in ('component-work', 'review')}
        entries = summary.get('componentWork')
        if not isinstance(entries, list):
            error(path + '.componentWork', 'expected work summary array; may be empty')
            continue
        seen = set()
        for i, item in enumerate(entries):
            ipath = path + '.componentWork[' + str(i) + ']'
            if not isinstance(item, dict):
                error(ipath, 'expected work summary object')
                continue
            wid = item.get('workItemId')
            if not isinstance(wid, str) or wid not in special:
                error(ipath, 'must reference this page’s component-work or review item')
                continue
            if wid in seen:
                error(ipath, 'duplicate work summary')
            seen.add(wid)
            if item.get('lane') != work[wid]['lane']:
                error(ipath + '.lane', 'summary lane differs from source work item')
            if not isinstance(item.get('reason'), str) or not item['reason'].strip():
                error(ipath + '.reason', 'expected specific reason')
        if seen != special:
            error(path + '.componentWork', 'missing component preconditions or review exclusions in page summary')
        # Optional cached UI counts must never contradict the authoritative work items.
        if 'scopeCounts' in summary:
            expected_counts = {lane: sum(work[k]['lane'] == lane for k in expected)
                               for lane in ('reuse', 'component-work', 'review')}
            if summary['scopeCounts'] != expected_counts:
                error(path + '.scopeCounts', 'stale scope counts; derive counts from work item IDs')
    check_canvas(data, error, warnings)
    lint_placeholders(data, warnings)
    result['ok'] = not errors
    warnings.append('Canvas contract checks do not establish visible panels, readable facts, hover correctness or image coverage; browser and source review remain required.')
    return result


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('manifest', type=Path)
    args = parser.parse_args()
    try:
        data = json.loads(args.manifest.read_text(encoding='utf-8'))
    except (OSError, ValueError) as exc:
        print(json.dumps({'ok': False, 'errors': [{'path': '$', 'message': str(exc)}]}))
        return 2
    result = validate(data)
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0 if result['ok'] else 1


if __name__ == '__main__':
    from cli_encoding import configure_cli_encoding
    configure_cli_encoding()
    raise SystemExit(main())
