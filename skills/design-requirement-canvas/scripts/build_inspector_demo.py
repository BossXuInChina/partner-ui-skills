#!/usr/bin/env python3
"""Build a standalone inspector demonstration with synthetic data, not a business canvas."""
import argparse
import json
from pathlib import Path


def build(output):
    assets = Path(__file__).resolve().parents[1] / 'assets'
    data = json.loads((assets / 'inspector-demo.json').read_text())
    from validate_canvas_contract import validate
    result = validate(data)
    if not result['ok']:
        raise ValueError(result['errors'])
    scripts = '\n'.join((assets / x).read_text() for x in ('page-review.js', 'inspector.js'))
    css = (assets / 'inspector.css').read_text()
    html = '''<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>统一右侧面板 · 模板示例</title><style>
body{margin:0;background:#f4f6fa;color:#354154;font:14px/1.7 -apple-system,BlinkMacSystemFont,"PingFang SC",sans-serif}*{box-sizing:border-box}button{font:inherit;cursor:pointer}header.demo-top{height:68px;padding:13px 24px;background:white;border-bottom:1px solid #e8edf3;display:flex;justify-content:space-between;align-items:center}header.demo-top b{font-size:17px}header.demo-top small{display:block;color:#8a98aa;font-size:11px}button.demo-btn{border:1px solid #dde3ed;background:white;border-radius:6px;padding:6px 12px;color:#5c6e86}.demo-layout{display:grid;grid-template-columns:180px minmax(300px,1fr) 360px;height:calc(100vh - 68px)}nav{background:white;padding:24px 16px;border-right:1px solid #e8edf3}nav p{font-size:12px;color:#94a0af}nav button{display:block;width:100%;margin:8px 0;text-align:left}main{padding:28px;overflow:auto;background-image:radial-gradient(#d8dfeb 1px,transparent 1px);background-size:20px 20px}.demo-node{background:white;border:1px solid #e0e5ee;border-radius:10px;padding:15px;max-width:620px;box-shadow:0 7px 25px #2634480c}.demo-node.selected{border:2px solid #cf2c43}.demo-node h2{font-size:16px;margin:0 0 10px}.demo-image{position:relative}.demo-image img{width:100%;display:block}.demo-box{position:absolute;border:3px solid #d92f47;background:#e3384520;pointer-events:none}.demo-box[hidden]{display:none}.demo-box span{position:absolute;top:0;left:0;font-size:10px;white-space:nowrap;background:#ce2c43;color:white;padding:1px 4px}#feedback{font-size:12px;color:#7d8da4}dialog{border:0;border-radius:10px;padding:16px;max-width:90vw;max-height:90vh}dialog::backdrop{background:#152237c9}dialog img{display:block;max-width:80vw;max-height:70vh}dialog .demo-btn{margin-bottom:10px}@media(max-width:800px){.demo-layout{grid-template-columns:120px minmax(260px,1fr) 340px}}
</style><style>INSPECTOR_CSS</style></head><body><header class="demo-top"><div><b>统一右侧面板 · 模板示例</b><small>合成数据，仅用于核对面板结构与交互；不是业务页面或真实组件库。</small></div><button class="demo-btn" id="export">导出示例 JSON</button></header><div class="demo-layout"><nav><b>示例页面</b><button class="demo-btn" data-page="demo-a">示例页 A</button><button class="demo-btn" data-page="demo-b">示例页 B</button><p>右栏固定七区、四类摘要、区块字段与契约、双向连接。</p></nav><main><div class="demo-node" id="node"><h2 id="node-title">示例页 A</h2><div class="demo-image"><img id="shot" alt="合成示例截图"><div class="demo-box" hidden id="box"><span></span></div></div></div><p id="feedback">点击左侧或截图选择页面；指向右栏标签查看区域。</p></main><aside id="detail"></aside></div><dialog id="preview"><button class="demo-btn" id="close-preview">关闭原图</button><div class="demo-image"><img id="preview-shot" alt="合成示例原图"><div class="demo-box" id="preview-box" hidden><span></span></div></div></dialog><script>INSPECTOR_JS</script><script>
const manifest=MANIFEST;
function imageFor(p){const svg='<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="700"><rect width="1000" height="700" fill="#f6f8fb"/><rect x="80" y="105" width="840" height="455" rx="20" fill="white" stroke="#dbe3ed"/><text x="110" y="165" fill="#52637c" font-size="36">'+p.title+'</text><text x="110" y="235" fill="#8493a5" font-size="24">合成截图 · 仅用于模板演示</text><rect x="110" y="290" width="760" height="70" rx="8" fill="#eef3f9"/><text x="140" y="335" fill="#73859c" font-size="24">示例信息区 · 示例字段</text></svg>';return 'data:image/svg+xml,'+encodeURIComponent(svg)}
const $=s=>document.querySelector(s);let shown='demo-a',trigger=null;
function clearBox(){$('#box').hidden=true}
function mark(el,detail){el.hidden=!detail.region;if(detail.region){const [x,y,w,h]=detail.region;Object.assign(el.style,{left:x+'%',top:y+'%',width:w+'%',height:h+'%'});el.querySelector('span').textContent=detail.label}}
const inspector=DesignCanvasInspector.create({container:$('#detail'),manifest,resolveImage:imageFor,onSelect:({pageId})=>{shown=pageId;const p=manifest.pages.find(p=>p.id===pageId);$('#node-title').textContent=p.title;$('#shot').src=imageFor(p);$('#node').classList.add('selected');},onHighlight:detail=>mark($('#box'),detail),onClearHighlight:clearBox,onPreview:detail=>{trigger=document.activeElement;$('#preview-shot').src=imageFor(manifest.pages.find(p=>p.id===detail.pageId));mark($('#preview-box'),detail);$('#preview').showModal();$('#close-preview').focus();},onNavigate:({pageId})=>{$('#feedback').textContent='已定位到 '+manifest.pages.find(p=>p.id===pageId).title;},onClose:()=>{$('#node').classList.remove('selected');clearBox();document.querySelector('[data-page="'+shown+'"]').focus();}});
$('#shot').src=imageFor(manifest.pages[0]);$('#node').onclick=()=>inspector.select(shown);document.querySelectorAll('[data-page]').forEach(b=>b.onclick=()=>inspector.select(b.dataset.page));$('#close-preview').onclick=()=>$('#preview').close();$('#preview').addEventListener('close',()=>trigger?.focus());$('#preview').onclick=e=>{if(e.target===e.currentTarget)e.currentTarget.close()};$('#export').onclick=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(manifest,null,2)],{type:'application/json'}));a.download='统一面板-示例数据.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)};inspector.select('demo-a');
</script></body></html>'''
    html = html.replace('INSPECTOR_CSS', css).replace('INSPECTOR_JS', scripts).replace('MANIFEST', json.dumps(data, ensure_ascii=False).replace('</', '<\\/'))
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(html, encoding='utf-8')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('output', type=Path)
    build(parser.parse_args().output.resolve())
