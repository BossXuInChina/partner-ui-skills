#!/usr/bin/env python3
"""Regression cases for missing summaries, cross-page scope, and stale exclusions/counts."""
import copy
import json
import unittest
from pathlib import Path
from validate_canvas_contract import validate


def fixture():
    data = json.loads((Path(__file__).resolve().parents[1] / 'references/manifest-example.json').read_text())
    for asset in data['assets']: asset['publicExport'] = 'ExamplePublicComponent'
    page = data['pages'][0]
    work = data['workItems']
    page['requirementSummary'] = {
        'facts': ['示例内容事实'], 'unknowns': ['示例业务规则待确认'],
        'acceptance': ['示例选中结果可见'],
        'scopeWorkItemIds': [w['id'] for w in work],
        'componentWork': [{'workItemId': w['id'], 'lane': w['lane'], 'reason': w['reason']}
                          for w in work if w['lane'] != 'reuse']}
    return data


class CanvasContractTest(unittest.TestCase):
    def setUp(self):
        self.data = fixture()
        self.summary = self.data['pages'][0]['requirementSummary']

    def rejects(self):
        self.assertFalse(validate(self.data)['ok'])

    def test_package_is_not_public_component(self):
        self.data['assets'][0]['publicExport'] = '@workbench/ui-vue3'
        self.rejects()

    def test_valid(self):
        self.assertTrue(validate(self.data)['ok'])

    def test_missing_panel_data(self):
        del self.data['pages'][0]['requirementSummary']
        self.rejects()

    def test_missing_acceptance_group(self):
        del self.summary['acceptance']
        self.rejects()

    def test_exclusion_missing_from_summary(self):
        self.summary['componentWork'] = [x for x in self.summary['componentWork'] if x['lane'] != 'review']
        self.rejects()

    def test_lane_disagrees(self):
        self.summary['componentWork'][0]['lane'] = 'reuse'
        self.rejects()

    def test_stale_counts(self):
        self.summary['scopeCounts'] = {'reuse': 999, 'component-work': 0, 'review': 0}
        self.rejects()

    def test_foreign_work_item(self):
        page = copy.deepcopy(self.data['pages'][0])
        page['id'] = 'another-page'
        for s in page['sections']:
            s['id'] = 'another-' + s['id']
            for a in s.get('actions', []): a['id'] = 'another-' + a['id']
            for m in s.get('mappings', []):
                m['id'] = 'another-' + m['id']
                m['actionIds'] = ['another-' + a for a in m.get('actionIds', [])]
        page['requirementSummary'] = {
            'facts': [], 'unknowns': [], 'acceptance': [], 'componentWork': [],
            'scopeWorkItemIds': list(self.summary['scopeWorkItemIds'])}
        self.data['pages'].append(page)
        self.rejects()

    def test_review_leaks_into_generation(self):
        review = self.data['generationPlan']['excludedPendingReview'][0]
        self.data['generationPlan']['included'].append(review)
        self.rejects()

    def test_report_only_base_remains_supported(self):
        from validate_manifest import validate as base
        del self.data['pages'][0]['requirementSummary']
        self.assertTrue(base(self.data)['ok'])
        self.rejects()


if __name__ == '__main__':
    unittest.main()
