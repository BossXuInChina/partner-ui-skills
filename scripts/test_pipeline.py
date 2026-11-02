#!/usr/bin/env python3
"""Regression cases for the scenario pipeline: canvas/edge checks, placeholder lint, build, handoff, scaffold."""
import copy
import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

HERE = Path(__file__).resolve().parent
FIXTURE = HERE.parent / 'tests' / 'fixtures' / 'demo-scenario' / 'manifest.json'
sys.path.insert(0, str(HERE))
from validate_canvas_contract import validate  # noqa: E402
from export_handoff import brief  # noqa: E402
from build_canvas import build  # noqa: E402
from imgsize import image_size  # noqa: E402


def load():
    return json.loads(FIXTURE.read_text(encoding='utf-8'))


class CanvasChecks(unittest.TestCase):
    def test_fixture_passes(self):
        self.assertTrue(validate(load())['ok'])

    def test_view_must_place_every_page(self):
        data = load()
        data['canvas']['views'][0]['groups'].pop()
        self.assertFalse(validate(data)['ok'])

    def test_view_rejects_unknown_page(self):
        data = load()
        data['canvas']['views'][0]['groups'][0]['pageIds'].append('ghost')
        self.assertFalse(validate(data)['ok'])

    def test_edge_section_must_belong_to_source(self):
        data = load()
        data['edges'][0]['fromSectionId'] = 'demo-b-body'
        self.assertFalse(validate(data)['ok'])

    def test_edge_strength_enum(self):
        data = load()
        data['edges'][0]['strength'] = 'maybe'
        self.assertFalse(validate(data)['ok'])

    def test_absolute_image_path_rejected(self):
        data = load()
        data['pages'][0]['image'] = '/Users/someone/crop.png'
        self.assertFalse(validate(data)['ok'])

    def test_placeholder_text_is_flagged_not_failed(self):
        data = load()
        data['pages'][0]['sections'][0]['facts'] = ['以原图为准']
        result = validate(data)
        self.assertTrue(result['ok'])
        lint = [w for w in result['warnings'] if isinstance(w, dict)]
        self.assertTrue(lint and lint[0]['placeholderLint'] >= 1)

    def test_short_field_labels_are_not_flagged(self):
        data = load()
        data['pages'][0]['sections'][0]['fields'] = ['日期', '金额']
        data['pages'][0]['sections'][0]['facts'] = ['表头为日期与金额两列']
        lint = [w for w in validate(data)['warnings'] if isinstance(w, dict)]
        self.assertFalse(any('demo-a-body.fields' in i for w in lint for i in w['items']))


class Handoff(unittest.TestCase):
    def test_review_items_never_buildable(self):
        b = brief(load(), 'x')
        review = {w['id'] for w in load()['workItems'] if w['lane'] == 'review'}
        self.assertTrue(review)
        for p in b['pages']:
            for s in p['sections']:
                self.assertFalse(review & {w['id'] for w in s['workItems']})
        self.assertEqual({x['workItemId'] for x in b['exclusions']}, review)

    def test_component_work_becomes_precondition(self):
        b = brief(load(), 'x')
        work = {w['id'] for w in load()['workItems'] if w['lane'] == 'component-work'}
        self.assertEqual({x['workItemId'] for x in b['preconditions']}, work)

    def test_review_only_section_is_excluded(self):
        data = load()
        sid = data['pages'][1]['sections'][0]['id']
        data['workItems'] = [w for w in data['workItems'] if w['sectionId'] != sid] + [{
            'id': sid + '-only-review', 'sectionId': sid, 'lane': 'review', 'inPageRestoration': False,
            'pageGeneration': 'exclude', 'baseAssetIds': [], 'reason': '全新视觉'}]
        section = next(s for p in brief(data, 'x')['pages'] for s in p['sections'] if s['id'] == sid)
        self.assertEqual(section['generation'], 'exclude')


class Build(unittest.TestCase):
    def test_build_embeds_images_and_blocks_network(self):
        with tempfile.TemporaryDirectory() as tmp:
            out = Path(tmp) / 'c.html'
            result = build(FIXTURE, out)
            html = out.read_text(encoding='utf-8')
            self.assertEqual(result['imagesEmbedded'], 2)
            self.assertIn("default-src 'none'", html)
            self.assertNotIn('src="crops/', html)

    def test_build_refuses_invalid_manifest(self):
        data = load()
        data['generationPlan']['included'] = []
        with tempfile.TemporaryDirectory() as tmp:
            bad = Path(tmp) / 'manifest.json'
            bad.write_text(json.dumps(data), encoding='utf-8')
            with self.assertRaises(SystemExit):
                build(bad, Path(tmp) / 'c.html')

    def test_script_injection_is_escaped(self):
        data = load()
        data['pages'][0]['title'] = '</script><script>alert(1)</script>'
        data['canvas']['title'] = '</title><script>alert(2)</script>'
        with tempfile.TemporaryDirectory() as tmp:
            src = Path(tmp) / 's'
            (src / 'crops').mkdir(parents=True)
            for p in data['pages']:
                (src / p['image']).write_bytes((FIXTURE.parent / p['image']).read_bytes())
            (src / 'manifest.json').write_text(json.dumps(data, ensure_ascii=False), encoding='utf-8')
            build(src / 'manifest.json', src / 'c.html')
            html = (src / 'c.html').read_text(encoding='utf-8')
            self.assertNotIn('</script><script>alert(1)', html)
            self.assertNotIn('</title><script>alert(2)', html)


class Scaffold(unittest.TestCase):
    def test_skeleton_is_not_valid_and_not_overwritten(self):
        with tempfile.TemporaryDirectory() as tmp:
            img = FIXTURE.parent / 'crops' / 'demo-a.svg'
            png = Path(tmp) / 'big.png'
            # 1x1 PNG
            png.write_bytes(bytes.fromhex('89504e470d0a1a0a0000000d49484452000000010000000108060000001f15c4890000000d4944415478da63f8ffff3f0005fe02fea7d6a4c50000000049454e44ae426082'))
            self.assertEqual(image_size(png), (1, 1))
            cmd = [sys.executable, str(HERE / 'new_scenario.py'), '--root', tmp, '--name', '场景', '--source', 'main=' + str(png)]
            subprocess.run(cmd, check=True, capture_output=True)
            manifest = json.loads((Path(tmp) / '场景' / 'manifest.json').read_text(encoding='utf-8'))
            self.assertEqual(manifest['sources'][0]['width'], 1)
            self.assertFalse(validate(manifest)['ok'])
            self.assertNotEqual(subprocess.run(cmd, capture_output=True).returncode, 0)
            self.assertTrue(img.exists())


if __name__ == '__main__':
    unittest.main()
