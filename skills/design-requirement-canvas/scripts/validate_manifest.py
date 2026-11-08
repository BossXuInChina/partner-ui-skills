#!/usr/bin/env python3
"""Structural/scope checks for design-evidence/1; does not establish visual completeness."""
import argparse
import json
import math
from pathlib import Path


def validate(data):
    errors = []
    warnings = []

    def error(path, message):
        errors.append({'path': path, 'message': message})

    def objects(value, path):
        if not isinstance(value, list):
            error(path, 'expected array')
            return []
        result = []
        for i, item in enumerate(value):
            if not isinstance(item, dict):
                error(f'{path}[{i}]', 'expected object')
            else:
                result.append((f'{path}[{i}]', item))
        return result

    def string(value):
        return isinstance(value, str) and bool(value.strip())

    def number(value):
        return isinstance(value, (int, float)) and not isinstance(value, bool) and math.isfinite(value)

    def index(pairs):
        found = {}
        for path, item in pairs:
            ident = item.get('id')
            if not string(ident):
                error(path + '.id', 'expected nonempty semantic ID')
            elif ident in found:
                error(path + '.id', 'duplicate ID: ' + ident)
            else:
                found[ident] = item
        return found

    def refs(value, path, allowed):
        if not isinstance(value, list):
            error(path, 'expected ID array')
            return []
        seen = set()
        good = []
        for i, ident in enumerate(value):
            if not string(ident):
                error(f'{path}[{i}]', 'expected nonempty ID')
            elif ident in seen:
                error(f'{path}[{i}]', 'duplicate reference: ' + ident)
            else:
                seen.add(ident)
                if ident not in allowed:
                    error(f'{path}[{i}]', 'unresolved reference: ' + ident)
                good.append(ident)
        return good

    def region(value, path):
        if not isinstance(value, list) or len(value) != 4 or not all(number(x) for x in value):
            error(path, 'expected [left, top, width, height] percentages')
        elif value[0] < 0 or value[1] < 0 or value[2] <= 0 or value[3] <= 0 or value[0]+value[2] > 100 or value[1]+value[3] > 100:
            error(path, 'region outside cropped screenshot or empty')

    if not isinstance(data, dict):
        return {'ok': False, 'errors': [{'path': '$', 'message': 'expected root object'}], 'warnings': []}
    if data.get('schemaVersion') != 'design-evidence/1':
        error('schemaVersion', 'unsupported schema; adapt existing formats before validation')
    source_pairs = objects(data.get('sources'), 'sources')
    asset_pairs = objects(data.get('assets'), 'assets')
    page_pairs = objects(data.get('pages'), 'pages')
    work_pairs = objects(data.get('workItems'), 'workItems')
    sources, assets, pages, work = [index(x) for x in (source_pairs, asset_pairs, page_pairs, work_pairs)]
    if not sources or not pages:
        error('$', 'at least one source and page required')
    for path, source in source_pairs:
        for key in ('width', 'height'):
            if not number(source.get(key)) or source[key] <= 0:
                error(path+'.'+key, 'expected positive original image dimension')
        if not string(source.get('path')):
            error(path+'.path', 'expected source path or identifier')
    for path, asset in asset_pairs:
        if not string(asset.get('version')) or not string(asset.get('contractSource')):
            error(path, 'asset needs version and authoritative contractSource')
    section_pairs = []
    action_pairs = []
    mapping_pairs = []
    for path, page in page_pairs:
        if not string(page.get('title')) or not string(page.get('role')):
            error(path, 'page needs title and role')
        crop = page.get('crop')
        source_id = None
        if not isinstance(crop, dict):
            error(path+'.crop', 'expected source crop object')
        else:
            source_id = crop.get('sourceId')
            source = sources.get(source_id) if isinstance(source_id, str) else None
            if source is None:
                error(path+'.crop.sourceId', 'unresolved source')
            values = [crop.get(k) for k in ('x', 'y', 'width', 'height')]
            if not all(number(v) for v in values):
                error(path+'.crop', 'crop needs numeric x, y, width, height')
            else:
                x, y, width, height = values
                if x < 0 or y < 0 or width <= 0 or height <= 0:
                    error(path+'.crop', 'crop empty or has negative origin')
                elif source and number(source.get('width')) and number(source.get('height')) and (x+width > source['width'] or y+height > source['height']):
                    error(path+'.crop', 'crop exceeds original image')
        for spath, section in objects(page.get('sections'), path+'.sections'):
            section_pairs.append((spath, section))
            if not string(section.get('title')):
                error(spath+'.title', 'expected section title')
            evidence = section.get('evidence')
            if not isinstance(evidence, dict):
                error(spath+'.evidence', 'expected evidence object')
            else:
                sid = evidence.get('sourceId')
                if not isinstance(sid, str) or sid not in sources:
                    error(spath+'.evidence.sourceId', 'unresolved source')
                elif sid != source_id:
                    error(spath+'.evidence.sourceId', 'does not match page crop source')
                if 'region' in evidence:
                    region(evidence['region'], spath+'.evidence.region')
            action_pairs.extend(objects(section.get('actions', []), spath+'.actions'))
            mapping_pairs.extend(objects(section.get('mappings', []), spath+'.mappings'))
    sections, actions = index(section_pairs), index(action_pairs)
    index(mapping_pairs)
    for path, action in action_pairs:
        if not string(action.get('label')):
            error(path+'.label', 'visible operation needs label or descriptive label for its icon')
        if not isinstance(action.get('visibleInReference'), bool):
            error(path+'.visibleInReference', 'expected explicit boolean for visible operation')
        sid = action.get('evidenceSourceId')
        if not isinstance(sid, str) or sid not in sources:
            error(path+'.evidenceSourceId', 'unresolved source')
        target = action.get('targetPageId')
        status = action.get('targetStatus')
        if status == 'unknown':
            if target is not None:
                error(path, 'unknown target must remain null')
        elif status == 'confirmed':
            if not isinstance(target, str) or target not in pages:
                error(path+'.targetPageId', 'confirmed target must resolve to page')
        else:
            error(path+'.targetStatus', 'expected confirmed or unknown')
    for path, mapping in mapping_pairs:
        aid = mapping.get('assetId')
        if not isinstance(aid, str) or aid not in assets:
            error(path+'.assetId', 'unresolved verified asset reference')
        if mapping.get('configurationStatus') not in ('candidate', 'partial', 'verified'):
            error(path+'.configurationStatus', 'expected candidate, partial or verified')
        refs(mapping.get('actionIds', []), path+'.actionIds', actions)
    for path, item in work_pairs:
        sid = item.get('sectionId')
        if not isinstance(sid, str) or sid not in sections:
            error(path+'.sectionId', 'unresolved section')
        base = refs(item.get('baseAssetIds', []), path+'.baseAssetIds', assets)
        lane = item.get('lane')
        expected = {'reuse': (True, 'use-existing-components'), 'component-work': (True, 'after-component-verification'), 'review': (False, 'exclude')}
        if not isinstance(lane, str) or lane not in expected:
            error(path+'.lane', 'expected reuse, component-work or review')
            continue
        restoration, generation = expected[lane]
        if item.get('inPageRestoration') is not restoration or item.get('pageGeneration') != generation:
            error(path, 'lane conflicts with restoration or generation scope')
        if not string(item.get('reason')):
            error(path+'.reason', 'scope decision needs a reason')
        if lane == 'component-work':
            if item.get('priority') != 1:
                error(path+'.priority', 'component work is first priority')
            if item.get('workKind') not in ('primitive-gap', 'existing-adaptation'):
                error(path+'.workKind', 'expected primitive-gap or existing-adaptation')
            if item.get('workKind') == 'existing-adaptation' and not base:
                error(path+'.baseAssetIds', 'existing adaptation needs an existing asset')
        elif lane == 'reuse' and not base and item.get('layoutContentOnly') is not True:
            error(path+'.baseAssetIds', 'reuse needs assets or explicit content-only layout')
    plan = data.get('generationPlan')
    if not isinstance(plan, dict):
        error('generationPlan', 'expected included and excludedPendingReview ID arrays')
    else:
        for key, expected_ids in (
            ('included', {k for k, v in work.items() if v.get('lane') in ('reuse', 'component-work')}),
            ('excludedPendingReview', {k for k, v in work.items() if v.get('lane') == 'review'})
        ):
            actual = set(refs(plan.get(key), 'generationPlan.'+key, work))
            if actual != expected_ids:
                error('generationPlan.'+key, 'scope index differs from work item decisions')
    warnings.append('Structural checks do not prove image/content coverage, component fit, or human acceptance.')
    return {'ok': not errors, 'errors': errors, 'warnings': warnings,
            'counts': {'pages': len(pages), 'sections': len(sections), 'actions': len(actions), 'workItems': len(work)}}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('manifest', type=Path)
    args = parser.parse_args()
    try:
        data = json.loads(args.manifest.read_text(encoding='utf-8'))
    except (OSError, ValueError) as exc:
        print(json.dumps({'ok': False, 'errors': [{'path': '$', 'message': str(exc)}]}, ensure_ascii=False))
        return 2
    result = validate(data)
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0 if result['ok'] else 1


if __name__ == '__main__':
    raise SystemExit(main())
