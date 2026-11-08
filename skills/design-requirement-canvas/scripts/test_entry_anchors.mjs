#!/usr/bin/env node
// Browser geometry regression: physical entry endpoints, duplicate labels, old-data fallback and zoom.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {execFileSync} from 'node:child_process';
const require = createRequire(import.meta.url);
const bases = [process.cwd(), path.dirname(new URL(import.meta.url).pathname)];
try {bases.push(execFileSync('npm',['root','-g'],{encoding:'utf8'}).trim());} catch {}
let playwright;
for (const base of bases) {try {playwright=require(require.resolve('playwright',{paths:[base]}));break;} catch {}}
if (!playwright) throw new Error('playwright not found; run where it is installed');
const {chromium}=playwright;
const skill = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'entry-anchors-'));
let browser;
try {
  fs.cpSync(path.join(skill,'tests/fixtures/demo-scenario'), tmp, {recursive:true});
  const file = path.join(tmp,'manifest.json'), data=JSON.parse(fs.readFileSync(file));
  const a=data.pages[0].sections[0].actions[0], b=data.pages[1].sections[0].actions[0];
  a.evidence={region:[72,30,12,6]}; a.targetActionId=b.id;
  b.evidence={region:[10,60,15,8]};
  const second={...a,id:'second-entry',evidence:{region:[72,75,12,6]}};
  data.pages[0].sections[0].actions.push(second);
  data.pages[1].sections[0].actions.push({...b,id:'reverse-entry',evidence:{region:[25,40,12,6]},targetStatus:'confirmed',targetPageId:'demo-a',targetActionId:a.id});
  data.edges=[{id:'first-entry-edge',from:'demo-a',to:'demo-b',fromActionId:a.id,toActionId:b.id,label:a.label}];
  const obstacle={id:'obstacle',title:'中间截图',role:'示例角色',crop:{...data.pages[1].crop},image:data.pages[1].image,
    sections:[{id:'obstacle-body',title:'自然连接下方的截图',evidence:{sourceId:data.pages[1].crop.sourceId},fields:['截图'],facts:['连线可以从这张截图下方穿过'],actions:[],mappings:[]}],
    requirementSummary:{facts:['用于验证自然直连不受中间节点影响'],unknowns:['仅合成数据'],acceptance:['保持直接贝塞尔'],componentWork:[],scopeWorkItemIds:[]}};
  data.pages.push(obstacle);
  data.canvas.views[0].groups=[{id:'source',title:'来源',pageIds:['demo-a']},{id:'obstacle-group',title:'中间截图',pageIds:['obstacle']},{id:'target',title:'目标',pageIds:['demo-b']}];
  data.canvas.mainPathEdgeIds=['first-entry-edge'];
  fs.writeFileSync(file,JSON.stringify(data));
  execFileSync('python3',[path.join(skill,'scripts/build_canvas.py'),file,'--out',path.join(tmp,'canvas.html')]);
  browser=await chromium.launch(); const page=await browser.newPage({viewport:{width:1440,height:900}});
  await page.goto('file://'+path.join(tmp,'canvas.html'));await page.waitForSelector('[data-ready="true"]');
  assert.equal(await page.evaluate(()=>window.__CANVAS__.edges.length),3,'distinct same-label entrances must remain separate');
  assert.equal(await page.locator('path.dch-link').count(),1,'overview must show only declared main path');
  await page.evaluate(()=>window.__CANVAS__.select('demo-a'));
  assert.equal(await page.locator('path.dch-link').count(),2,'selecting page shows its outgoing branches');
  await page.getByLabel('包含来自').check();
  assert.equal(await page.locator('path.dch-link').count(),3,'incoming relations can be expanded');
  await page.getByRole('button',{name:'全部关系',exact:true}).click();
  assert.equal(await page.locator('path.dch-link').count(),3,'all relations remain available');
  const firstChip=page.locator('[data-trace-edge="first-entry-edge"]');
  await firstChip.focus();
  assert.equal(await page.locator('path.dch-link.traced').count(),1);
  assert.equal(await page.locator('path.dch-link.muted').count(),2);
  assert.equal(await page.locator('.dch-node .dch-box:not([hidden])').count(),2,'trace highlights both endpoints');
  await firstChip.blur();
  assert.equal(await page.locator('path.dch-link.traced').count(),0);
  assert.equal(await page.locator('.dch-node .dch-box:not([hidden])').count(),0);
  const curves=await page.locator('path.dch-link').evaluateAll(lines=>lines.map(l=>l.getAttribute('d')));
  assert.ok(curves.every(d=>(d.match(/C/g)||[]).length===1&&!/[LHVQSTA]/.test(d)),'every relation must use one direct cubic, with no obstacle detour');
  const layers=await page.evaluate(()=>({line:Number(getComputedStyle(document.querySelector('.dch-links')).zIndex),node:Number(getComputedStyle(document.querySelector('.dch-node')).zIndex)}));
  assert.ok(layers.line<layers.node,'normal connectors must stay below page cards');
  async function geometry(){return page.evaluate(()=>{
    const c=window.__CANVAS__, results=[];
    for(const edge of c.edges){
      const line=document.querySelector(`[data-edge-id="${edge.id}"]`);
      const from=document.querySelector(`[data-page-id="${edge.from}"] .dch-media img`).getBoundingClientRect();
      const to=document.querySelector(`[data-page-id="${edge.to}"] .dch-media img`).getBoundingClientRect();
      const reverse=edge.id==='reverse-entry';
      const sr=reverse?[25,40,12,6]:edge.id==='first-entry-edge'?[72,30,12,6]:[72,75,12,6], tr=reverse?[72,30,12,6]:[10,60,15,8];
      const st=line.getPointAtLength(0).matrixTransform(line.getScreenCTM()),en=line.getPointAtLength(line.getTotalLength()).matrixTransform(line.getScreenCTM());
      results.push(Math.hypot(st.x-(from.left+from.width*(sr[0]+(reverse?0:sr[2]))/100),st.y-(from.top+from.height*(sr[1]+sr[3]/2)/100)),Math.hypot(en.x-(to.left+to.width*(tr[0]+(reverse?tr[2]:0))/100),en.y-(to.top+to.height*(tr[1]+tr[3]/2)/100)));
    }return results;
  });}
  for(const mode of ['initial','selected','zoom','resize']){
    if(mode==='selected')await page.evaluate(()=>window.__CANVAS__.select('demo-a'));
    if(mode==='zoom')await page.evaluate(()=>window.__CANVAS__.zoomAt(1.3,300,200));
    if(mode==='resize'){await page.setViewportSize({width:1200,height:800});await page.waitForTimeout(200);}
    const errors=await geometry();assert.ok(errors.every(e=>e<2),`${mode}: endpoint drift ${errors}`);
  }
  assert.equal(await page.locator('[data-action-id="'+a.id+'"]:visible').count(),1);
  console.log(JSON.stringify({ok:true,checks:['separate entrances','explicit edge deduplication','source and target image coordinates','reverse connections','selection','zoom','resize','entry inspector chips','main path default','outgoing filter','optional incoming','all relations retained','single-line keyboard trace','cubic Bezier curves','direct curves despite intermediate cards','connectors beneath nodes']}));
} finally {await browser?.close();fs.rmSync(tmp,{recursive:true,force:true});}
