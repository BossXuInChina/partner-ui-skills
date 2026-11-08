// In-memory DOM regression, not browser/visual acceptance. Pass an installed happy-dom module.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import assert from 'node:assert/strict';
const here=path.dirname(fileURLToPath(import.meta.url)),base=path.resolve(here,'../assets');
import {createRequire} from 'node:module';
const arg=process.argv.indexOf('--dom-module');
// Default: happy-dom from this repo's devDependencies (npm install); --dom-module overrides.
const domModule=arg>=0&&process.argv[arg+1]?path.resolve(process.argv[arg+1]):(()=>{try{return createRequire(path.join(here,'..','package.json')).resolve('happy-dom');}catch{throw Error('happy-dom not found: run npm install in the skill folder, or pass --dom-module /absolute/path/to/happy-dom/lib/index.js');}})();
const {Window}=await import(pathToFileURL(domModule).href);
const window=new Window({settings:{disableCSSFileLoading:true,disableJavaScriptFileLoading:true}});
const document=window.document;document.body.innerHTML='<aside id="detail"></aside>';
for(const f of ['page-review.js','inspector.js'])window.eval(fs.readFileSync(path.join(base,f),'utf8'));
const data=JSON.parse(fs.readFileSync(path.join(base,'inspector-demo.json'),'utf8')),original=JSON.stringify(data);
const host=document.querySelector('#detail'), calls=[];
const options={container:host,manifest:data,resolveImage:p=>'data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg"></svg>')};
for(const name of ['onHighlight','onClearHighlight','onPreview','onNavigate','onSelect','onClose'])options[name]=x=>calls.push({name,...x});
const api=window.DesignCanvasInspector.create(options);
let checked=0;
function check(fn){fn();checked++;}
check(()=>assert.ok(host.querySelector('[data-inspector-empty]')));
api.select('demo-a');
// Regression: leaving a non-label element while nothing is highlighted must not throw.
check(()=>host.querySelector('h2').dispatchEvent(new window.MouseEvent('mouseout',{bubbles:true})));
check(()=>assert.deepEqual([...host.querySelectorAll('[data-inspector-part]')].map(x=>x.dataset.inspectorPart),['identity','evidence','scope','completeness','sections','connections','limits']));
check(()=>assert.equal(host.querySelectorAll('[data-review-group]').length,4));
check(()=>assert.match(host.querySelector('[data-scope-counts]').textContent,/纳入还原 1 · 组件优先 1 · 待评审排除 1/));
check(()=>assert.equal(host.querySelectorAll('[data-section-spec],[data-section-contract]').length,2));
const region=host.querySelector('[data-mapping-id][data-inspector-action="region"]');host.scrollTop=135;
region.dispatchEvent(new window.MouseEvent('mouseover',{bubbles:true}));
check(()=>{assert.equal(calls.at(-1).name,'onHighlight');assert.equal(calls.at(-1).pageId,'demo-a');assert.equal(calls.at(-1).sectionId,'demo-a-body');assert.equal(calls.at(-1).precision,'approx-section');assert.equal(host.scrollTop,135);});
region.dispatchEvent(new window.MouseEvent('mouseout',{bubbles:true}));
check(()=>assert.equal(calls.at(-1).name,'onClearHighlight'));
region.focus();check(()=>assert.equal(calls.at(-1).name,'onHighlight'));
region.blur();check(()=>assert.equal(calls.at(-1).name,'onClearHighlight'));
const excluded=host.querySelector('[data-work-item-id$="-review"]');excluded.dispatchEvent(new window.MouseEvent('mouseover',{bubbles:true}));excluded.click();
check(()=>{assert.equal(calls.at(-1).name,'onPreview');assert.equal(calls.at(-1).lane,'review');assert.match(calls.at(-1).label,/排除/);});
let start=calls.length;api.select('demo-a');api.select('demo-a');host.querySelector('[data-inspector-action="preview"]').click();
check(()=>assert.equal(calls.slice(start).filter(x=>x.name==='onPreview').length,1));
host.querySelector('[data-inspector-part="connections"] [data-inspector-action="navigate"]').click();
check(()=>{assert.equal(api.getPageId(),'demo-b');assert.equal(calls.at(-1).name,'onNavigate');assert.equal(host.scrollTop,0);assert.match(host.querySelector('.dci-edge').textContent,/来自/);});
check(()=>assert.equal(host.querySelectorAll('[data-inspector-part="connections"] button').length,1));
host.querySelector('[data-inspector-action="close"]').click();
check(()=>{assert.equal(api.getPageId(),null);assert.ok(host.querySelector('[data-inspector-empty]'));assert.equal(calls.at(-1).name,'onClose');});
check(()=>assert.equal(JSON.stringify(data),original));
const weird=JSON.parse(original);weird.pages[0].title='<img src=x onerror=evil()>"';weird.pages[0].sections[0].fields=['<script>evil()</script>'];
const tmp=document.createElement('aside');document.body.append(tmp);const safe=window.DesignCanvasInspector.create({...options,container:tmp,manifest:weird});safe.select('demo-a');
check(()=>{assert.equal(tmp.querySelector('h2').textContent,weird.pages[0].title);assert.equal(tmp.querySelectorAll('script,img[onerror]').length,0);});
safe.destroy();
const bad=JSON.parse(original);bad.pages[0].requirementSummary.scopeWorkItemIds.push('foreign-id');const invalid=window.DesignCanvasInspector.create({...options,container:tmp,manifest:bad});
check(()=>{assert.throws(()=>invalid.select('demo-a'),/scope/i);assert.ok(tmp.querySelector('[data-inspector-error]'));assert.equal(tmp.querySelector('[data-scope-counts]'),null);});
invalid.destroy();
check(()=>assert.throws(()=>window.DesignCanvasInspector.create({...options,onPreview:undefined}),/onPreview/));
api.select('demo-a');const detached=host.querySelector('[data-inspector-action="preview"]');api.destroy();start=calls.length;detached.click();
check(()=>{assert.equal(calls.length,start);assert.equal(host.children.length,0);assert.throws(()=>api.select('demo-a'),/销毁/);});
let pagesChecked=0;
const manifestFlag=process.argv.indexOf('--manifest');
if(manifestFlag>=0){
 const actual=JSON.parse(fs.readFileSync(process.argv[manifestFlag+1],'utf8'));
 const mounted=window.DesignCanvasInspector.create({...options,container:host,manifest:actual});
 for(const p of actual.pages){
  mounted.select(p.id);
  assert.equal(host.querySelectorAll('[data-review-group]').length,4,p.id+' summary');
  assert.equal(host.querySelectorAll('[data-inspector-part]').length,7,p.id+' panel parts');
  assert.equal(host.querySelectorAll('[data-section-spec]').length,p.sections.length,p.id+' specifications');
  assert.equal(host.querySelectorAll('[data-section-contract]').length,p.sections.length,p.id+' contracts');
  assert.equal(host.querySelectorAll('.dci-contract').length,p.sections.reduce((n,s)=>n+(s.mappings||[]).length,0),p.id+' mapping coverage');
  const counts=window.DesignCanvasReview.forPage(actual,p.id).counts;
  assert.ok(host.querySelector('[data-scope-counts]').textContent.includes('纳入还原 '+counts.reuse+' · 组件优先 '+counts['component-work']+' · 待评审排除 '+counts.review),p.id+' scope');
  pagesChecked++;
 }
 mounted.destroy();
}
await window.happyDOM.close();console.log(JSON.stringify({passed:checked,pagesChecked,scope:'DOM rendering/events/state only; no browser or visual acceptance'}));
