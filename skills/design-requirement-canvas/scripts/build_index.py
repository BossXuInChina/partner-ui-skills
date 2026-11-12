#!/usr/bin/env python3
"""Batch mode: validate every <root>/*/manifest.json, optionally rebuild canvases and handoffs,
and write a navigation-only <root>/index.html + index.json. A failing scenario is reported, not skipped silently."""
import argparse
import html
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from validate_canvas_contract import validate  # noqa: E402
from build_canvas import build  # noqa: E402
from export_handoff import export  # noqa: E402


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('root', type=Path)
    parser.add_argument('--build', action='store_true', help='rebuild canvas HTML and handoff for valid scenarios')
    args = parser.parse_args()
    root = args.root.resolve()
    rows = []
    for manifest in sorted(root.glob('*/manifest.json')):
        scenario = manifest.parent
        try:
            data = json.loads(manifest.read_text(encoding='utf-8'))
            result = validate(data)
        except ValueError as exc:
            data, result = {}, {'ok': False, 'errors': [{'path': '$', 'message': str(exc)}], 'warnings': []}
        row = {'scenario': scenario.name, 'ok': result['ok'], 'errors': len(result['errors']),
               'firstErrors': result['errors'][:3], 'counts': result.get('counts', {}),
               'placeholderLint': next((w['placeholderLint'] for w in result['warnings'] if isinstance(w, dict)), 0),
               'title': (data.get('canvas') or {}).get('title') or scenario.name}
        if result['ok'] and args.build:
            build(manifest, scenario / 'dist' / f'{scenario.name}-画布.html')
            export(manifest)
        canvas = scenario / 'dist' / f'{scenario.name}-画布.html'
        row['canvas'] = canvas.relative_to(root).as_posix() if canvas.exists() else None
        brief = scenario / 'dist' / 'handoff' / 'generation-brief.md'
        row['handoff'] = brief.relative_to(root).as_posix() if brief.exists() else None
        rows.append(row)
    (root / 'index.json').write_text(json.dumps(rows, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    link = lambda href, text: f'<a href="{html.escape(href)}">{text}</a>' if href else '<span class="muted">未生成</span>'
    body = ''.join(
        f'<tr><td>{html.escape(r["title"])}<small>{html.escape(r["scenario"])}</small></td>'
        f'<td class="{"ok" if r["ok"] else "bad"}">{"通过" if r["ok"] else "失败 " + str(r["errors"])}</td>'
        f'<td>{r["counts"].get("pages", "–")}</td><td>{r["counts"].get("sections", "–")}</td><td>{r["counts"].get("workItems", "–")}</td>'
        f'<td>{r["placeholderLint"]}</td><td>{link(r["canvas"], "画布")}</td><td>{link(r["handoff"], "交接")}</td></tr>' for r in rows)
    page = ('<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>需求画布索引</title>'
            '<style>body{margin:0;padding:24px 16px;background:#f4f6fa;color:#354154;font:14px/1.6 -apple-system,"PingFang SC",sans-serif}main{max-width:1100px;margin:auto}'
            'table{width:100%;border-collapse:collapse;background:#fff;border-radius:8px;overflow:hidden}th,td{padding:10px 12px;border-bottom:1px solid #e8edf3;text-align:left}'
            'th{font-size:12px;color:#8a98aa;font-weight:500}small{display:block;color:#9aa6b6;font-size:11px}.ok{color:#4f7a5c}.bad{color:#b04b54}.muted{color:#aab4c2}'
            '.wrap{overflow-x:auto}a{color:#c83246}</style></head><body><main><h1>需求画布索引</h1>'
            '<p>仅导航。结构校验通过不代表识别完整；占位提示数需回看原图处理。</p><div class="wrap"><table><thead><tr><th>场景</th><th>结构校验</th><th>页面</th><th>区块</th><th>工作项</th><th>占位提示</th><th>画布</th><th>交接</th></tr></thead>'
            f'<tbody>{body}</tbody></table></div></main></body></html>')
    (root / 'index.html').write_text(page, encoding='utf-8')
    print(json.dumps({'ok': all(r['ok'] for r in rows), 'scenarios': len(rows), 'failed': [r['scenario'] for r in rows if not r['ok']]}, ensure_ascii=False, indent=2))
    return 0 if all(r['ok'] for r in rows) else 1


if __name__ == '__main__':
    from cli_encoding import configure_cli_encoding
    configure_cli_encoding()
    raise SystemExit(main())
