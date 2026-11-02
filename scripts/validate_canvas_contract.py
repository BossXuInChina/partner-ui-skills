#!/usr/bin/env python3
"""Check per-page review data and scope ownership; does not inspect rendered UI or images."""
import argparse
import json
from pathlib import Path
from validate_manifest import validate as validate_structure


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
    raise SystemExit(main())
