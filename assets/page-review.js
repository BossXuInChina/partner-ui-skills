/* Shared page review logic for an offline requirement canvas; no external dependencies. */
(function (root) {
  'use strict';
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function forPage(data, pageId) {
    const page = data.pages.find(p => p.id === pageId);
    if (!page?.requirementSummary) throw new Error('Missing page review: ' + pageId);
    const sections = new Set(page.sections.map(s => s.id));
    const work = data.workItems.filter(w => sections.has(w.sectionId));
    const expected = new Set(work.map(w => w.id));
    const declared = page.requirementSummary.scopeWorkItemIds;
    if (!Array.isArray(declared) || declared.length !== expected.size || new Set(declared).size !== declared.length || declared.some(id => !expected.has(id))) throw new Error('Page scope mismatch: ' + pageId);
    const counts = {reuse:0, 'component-work':0, review:0};
    work.forEach(w => { if (!(w.lane in counts)) throw new Error('Unknown lane'); counts[w.lane]++; });
    return {page, summary:page.requirementSummary, work, counts};
  }
  function render(data, pageId) {
    const {summary:s, work, counts:c} = forPage(data, pageId);
    const list = items => items.length ? '<ul>' + items.map(t => '<li>' + escape(t) + '</li>').join('') + '</ul>' : '<p>当前未登记；不代表没有缺口。</p>';
    const group = (key,title,items) => '<section data-review-group="'+key+'"><h4>'+title+'</h4>'+list(items)+'</section>';
    const scope = work.filter(w => w.lane !== 'reuse').map(w => (w.lane === 'review' ? '待评审排除：' : '组件优先：') + w.reason);
    if (!scope.length) scope.push('当前未登记组件前置或待评审项；基础组合仍须逐项验证。');
    return '<section data-page-scope data-inspector-part="scope"><h3>本次还原边界</h3><p>采用已有组件公开样式；先验证组件前置能力，待评审项排除页面生成。</p><div data-scope-counts>纳入还原 '+c.reuse+' · 组件优先 '+c['component-work']+' · 待评审排除 '+c.review+'</div><small>计数为本页已登记工作项，三类互斥；不代表识别完整或实例已验证。</small></section><section data-page-completeness data-inspector-part="completeness"><h3>需求完整性 · 生成前先核对</h3>'+group('facts','原图已见',s.facts)+group('capabilities','能力与组合线索 · 按范围执行',scope)+group('unknowns','业务待确认',s.unknowns)+group('acceptance','还原检查',s.acceptance)+'</section>';
  }
  root.DesignCanvasReview = {forPage, render};
})(globalThis);
