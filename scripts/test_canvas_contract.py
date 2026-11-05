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

    def test_entry_regions_and_references(self):
        action = self.data['pages'][0]['sections'][0]['actions'][0]
        action['evidence'] = {'region': [10, 20, 8, 4]}
        self.assertTrue(validate(self.data)['ok'])
        action['targetActionId'] = 'missing'
        self.rejects()
        del action['targetActionId']
        action['evidence']['region'] = [98, 0, 5, 2]
        self.rejects()

    def test_endpoint_action_must_match_section(self):
        self.data['edges'] = [{'id':'bad-owner', 'from':'home', 'to':'home', 'label':'入口',
                               'fromActionId':'nav-home', 'fromSectionId':'home-calendar'}]
        self.rejects()

    def test_main_path_must_reference_confirmed_edge(self):
        self.data['canvas'] = {'mainPathEdgeIds': ['nav-home']}
        self.assertTrue(validate(self.data)['ok'])
        self.data['canvas']['mainPathEdgeIds'] = ['missing-edge']
        self.rejects()

    def test_dialogue_requires_real_host_page(self):
        import copy
        host = self.data['pages'][0]
        host['nodeType'] = 'page'
        answer = {'id':'answer','title':'本页回答','role':'对话状态','nodeType':'dialogue',
                  'ownerPageId':host['id'],'crop':copy.deepcopy(host['crop']),
                  'sections':[{'id':'answer-content','title':'回答','evidence':{'sourceId':host['crop']['sourceId']},
                               'fields':['答复内容'],'actions':[],'mappings':[]}],
                  'requirementSummary':{'facts':['当前问题的完整回答'],'componentWork':[],
                    'unknowns':['真实服务未接入'],'acceptance':['完整显示回答'],'scopeWorkItemIds':[]},
                  'capture':{'mode':'content-crop'}}
        self.data['pages'].append(answer)
        self.assertTrue(validate(self.data)['ok'])
        answer['ownerPageId'] = 'answer'
        self.rejects()
        answer['ownerPageId'] = 'missing'
        self.rejects()
        answer.pop('ownerPageId')
        self.rejects()

    def test_report_only_base_remains_supported(self):
        from validate_manifest import validate as base
        del self.data['pages'][0]['requirementSummary']
        self.assertTrue(base(self.data)['ok'])
        self.rejects()


if __name__ == '__main__':
    unittest.main()
