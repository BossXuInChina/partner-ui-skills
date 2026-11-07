import { chromium } from './.work/skill/assets/harness/node_modules/@playwright/test/index.mjs';
import { prepareTemplateFixtures } from './.work/skill/assets/harness/tests/fixtures/template-backend.mjs';
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';
import { writeFileSync } from 'node:fs';
const root=resolve('.work/skill/assets/harness'), originals=resolve('.work/originals');
const servers=[spawn(process.execPath,[resolve(root,'node_modules/vite/bin/vite.js'),'--host','127.0.0.1','--port','17932','--strictPort'],{cwd:root,stdio:'ignore'}),spawn('python3',['-m','http.server','17933','--bind','127.0.0.1','--directory',originals],{stdio:'ignore'})];
const fixture=await prepareTemplateFixtures(root,{fontsRoot:resolve(originals,'fonts')});
let browser;
try {
 await new Promise(r=>setTimeout(r,3000)); browser=await chromium.launch({headless:true}); const results=[];
 for(const name of ['workbench-list','ai-assistant-workspace']) for(const viewport of [{width:1440,height:900},{width:1280,height:800}]) {
  for(const kind of ['before','after']) {
   const page=await browser.newPage({viewport}); const errors=[]; page.on('pageerror',e=>errors.push(e.message));
   if(kind==='after') await fixture.setupPage(page,{route:{path:'/templates/'+name},viewport});
   await page.goto(kind==='before'?`http://127.0.0.1:17933/${name}.html`:`http://127.0.0.1:17932/templates/${name}`,{waitUntil:'networkidle'}); await page.waitForTimeout(1500);
   const data=await page.evaluate(()=>({title:document.title,body:document.body.innerText.slice(0,3500),images:[...document.images].filter(x=>!x.complete||x.naturalWidth===0).map(x=>x.src),height:document.documentElement.scrollHeight}));
   if(process.env.PARTNER_UI_EVIDENCE==='1') await page.screenshot({path:`evidence/${name}-${viewport.width}-${kind}.png`,fullPage:true});
   results.push({name,viewport,kind,errors,...data}); await page.close();
  }
 }
 writeFileSync('evidence/visual-results.json',JSON.stringify(results,null,2));
} finally { await browser?.close(); await fixture.close(); servers.forEach(s=>s.kill('SIGTERM')); }
