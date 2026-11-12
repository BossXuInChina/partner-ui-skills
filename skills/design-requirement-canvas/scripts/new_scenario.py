#!/usr/bin/env python3
"""Scaffold one scenario folder: sources/, crops/, manifest.json skeleton and review-log.md.

The skeleton is intentionally invalid until pages, sections, work items and summaries are filled:
validators must not pass on an empty scenario.
"""
import argparse
import hashlib
import json
import shutil
import sys
from datetime import date
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from imgsize import image_size  # noqa: E402

REVIEW_LOG = """# {name} · 复核记录

三类核对互相独立；同一脚本重复运行不算新一轮。每条发现写：影响 → 证据定位 → 当前表达 → 修订 → 验证边界。

## 1. 原图内容 / 关系
- 检查范围：
- 发现与修正：

## 2. 组件能力 / 实施范围
- 锁定包与版本：
- 发现与修正：

## 3. 交付数据 / 实际交互
- validate_canvas_contract：
- test_canvas_browser：
- 人工浏览器核对：

## 未验证与待确认
-
"""


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', type=Path, required=True, help='folder that holds all scenarios')
    parser.add_argument('--name', required=True, help='scenario folder name, e.g. 伙伴工作台-证书中心')
    parser.add_argument('--title', help='canvas title (default: name)')
    parser.add_argument('--source', action='append', default=[], metavar='ID=PATH', help='original design image; repeatable')
    parser.add_argument('--no-copy', action='store_true', help='reference sources by path instead of copying them in')
    args = parser.parse_args()
    target = args.root.resolve() / args.name
    if (target / 'manifest.json').exists():
        raise SystemExit(f'refusing to overwrite {target / "manifest.json"}')
    if not args.source:
        raise SystemExit('at least one --source ID=PATH is required')
    (target / 'crops').mkdir(parents=True, exist_ok=True)
    sources = []
    for spec in args.source:
        sid, _, raw = spec.partition('=')
        path = Path(raw).expanduser().resolve()
        if not sid or not path.is_file():
            raise SystemExit(f'bad --source {spec!r}')
        width, height = image_size(path)
        if args.no_copy:
            rel = str(path)
        else:
            (target / 'sources').mkdir(exist_ok=True)
            shutil.copy2(path, target / 'sources' / path.name)
            rel = 'sources/' + path.name
        sources.append({'id': sid, 'path': rel, 'width': width, 'height': height,
                        'sha256': hashlib.sha256(path.read_bytes()).hexdigest(), 'recordedAt': date.today().isoformat()})
    manifest = {
        'schemaVersion': 'design-evidence/1',
        'meta': {'title': args.title or args.name, 'createdAt': date.today().isoformat(),
                 'scopePolicy': '已有组件样式优先；能力缺失/场景改造为组件优先；全新视觉组合待评审并排除。'},
        'canvas': {'title': args.title or args.name, 'scopeBanner': '还原基准：已有组件样式 · 能力缺失 / 场景改造优先 · 全新组合待评审，排除本次还原',
                   'views': []},
        'sources': sources, 'assets': [], 'pages': [], 'edges': [], 'workItems': [],
        'generationPlan': {'included': [], 'excludedPendingReview': []},
    }
    (target / 'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    log = target / 'review-log.md'
    if not log.exists():
        log.write_text(REVIEW_LOG.format(name=args.name), encoding='utf-8')
    print(json.dumps({'ok': True, 'scenario': str(target), 'sources': [s['id'] for s in sources],
                      'next': ['add pages with crop rectangles, then: python3 scripts/crop_pages.py ' + str(target / 'manifest.json')]},
                     ensure_ascii=False, indent=2))


if __name__ == '__main__':
    from cli_encoding import configure_cli_encoding
    configure_cli_encoding()
    main()
