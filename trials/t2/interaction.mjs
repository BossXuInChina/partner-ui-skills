import { chromium } from './.work/skill/assets/harness/node_modules/@playwright/test/index.mjs';
import { prepareTemplateFixtures } from './.work/skill/assets/harness/tests/fixtures/template-backend.mjs';
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';
import { writeFileSync } from 'node:fs';
import assert from 'node:assert/strict';
const root=resolve('.work/skill/assets/harness');
const server=spawn(process.execPath,[resolve(root,'node_modules/vite/bin/vite.js'),'--host','127.0.0.1','--port','17934','--strictPort'],{cwd:root,stdio:'ignore'});
const fixture=await prepareTemplateFixtures(root); let browser;
try {
 await new Promise(r=>setTimeout(r,2500)); browser=await chromium.launch(); const results=[];
 for(const name of ['workbench-list','ai-assistant-workspace']) {
  const page=await browser.newPage({viewport:{width:1440,height:900}});
  await fixture.setupPage(page,{route:{path:'/templates/'+name}});
  await page.goto('http://127.0.0.1:17934/templates/'+name,{waitUntil:'networkidle'});
  const version=await page.evaluate(() => document.querySelector('#app').__vue_app__.version);
  assert.equal(version,'3.5.13');results.push({name,step:'Vue runtime version',value:version,passed:true});
  if(name==='workbench-list') {
   await page.getByPlaceholder('协议名称 / 编号 / 伙伴').fill('华东');
   await page.getByRole('button',{name:'查询',exact:true}).click();
   await page.getByText('共：5 项',{exact:true}).waitFor();
   const rows=page.locator('tbody tr'); assert.equal(await rows.count(),5,'filter must show five rows');
   for(const row of await rows.all()) assert.match(await row.innerText(),/华东/);
   results.push({name,step:'filter five 华东 rows',passed:true});
   await page.getByRole('button',{name:'新建协议'}).click();
   const dialog=page.getByRole('dialog'); await dialog.waitFor({state:'visible'});
   assert.match(await dialog.innerText(),/新建协议/);assert.ok(await dialog.locator('input').count()>0,'create dialog has fields');
   results.push({name,step:'create dialog',passed:true});
  } else {
   await page.getByText('到期协议',{exact:true}).first().click();
   const id=page.getByText('HT-2026-0101',{exact:true});await id.waitFor({state:'visible'});
   const table=page.locator('table').filter({has:id}); assert.equal(await table.count(),1,'structured response must contain a table');
   assert.match(await table.innerText(),/华东区分销框架协议/);
   assert.match(await page.locator('body').innerText(),/以下\s*3\s*份协议将在\s*90\s*天内到期/);
   results.push({name,step:'AI structured agreement answer',passed:true});
  }
  await page.close();
 }
 fixture.assertNoFailures();writeFileSync('evidence/interactions.json',JSON.stringify(results,null,2)+'\n');
 console.log(JSON.stringify(results));
} finally {await browser?.close(); await fixture.close();server.kill('SIGTERM');}
