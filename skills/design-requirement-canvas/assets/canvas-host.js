/* Design requirement canvas: shared canvas host, v1. No external dependencies.
 * Requires page-review.js and inspector.js. Renders nav, node graph, pan/zoom, preview and export
 * from one design-evidence/1 manifest so every scenario keeps the same canvas behavior. */
(function (root) {
  'use strict';
  const e = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const NS = 'http://www.w3.org/2000/svg';
  const L = {nodeWidth:480, colGap:180, rowGap:72, subGap:110, top:120, left:80, head:66, foot:44, pad:12, minScale:.12, maxScale:2.5};

  function views(data) {
    const pages = data.pages.map(p => p.id);
    const declared = data.canvas?.views;
    if (Array.isArray(declared) && declared.length) {
      for (const v of declared) for (const g of v.groups || []) for (const id of g.pageIds || []) if (!pages.includes(id)) throw new Error('画布分组引用了未登记页面：' + id);
      return declared;
    }
    const roles = [...new Set(data.pages.map(p => p.role))];
    return [{id:'all', title:'全部页面', groups:roles.map((r, i) => ({id:'role-' + i, title:r, pageIds:data.pages.filter(p => p.role === r).map(p => p.id)}))}];
  }

  function edgesOf(data) {
    // Preserve distinct physical entrances, even when their labels and destination match.
    const out = new Map();
    const key = ed => [ed.from, ed.to, ed.label, ed.fromActionId || ed.fromSectionId || '', JSON.stringify(ed.fromRegion || null), ed.toActionId || ed.toSectionId || '', JSON.stringify(ed.toRegion || null), ed.condition || ''].join('\0');
    for (const edge of data.edges || []) {
      const candidates = data.pages.find(p => p.id === edge.from)?.sections
        .filter(s => !edge.fromSectionId || s.id === edge.fromSectionId)
        .flatMap(s => (s.actions || []).filter(a => a.targetStatus === 'confirmed' && a.targetPageId === edge.to && a.label === edge.label).map(a => ({a,s}))) || [];
      const match = !edge.fromActionId && candidates.length === 1 ? candidates[0] : null;
      const normalized = match ? {...edge, fromActionId:match.a.id, fromSectionId:match.s.id,
        toActionId:edge.toActionId || match.a.targetActionId, toSectionId:edge.toSectionId || match.a.targetSectionId,
        toRegion:edge.toRegion || match.a.targetRegion, condition:edge.condition || match.a.condition} : edge;
      out.set(key(normalized), {...normalized,id:normalized.id || 'relation:'+encodeURIComponent(key(normalized))});
    }
    for (const p of data.pages) for (const s of p.sections) for (const a of s.actions || []) {
      if (a.targetStatus !== 'confirmed') continue;
      if ([...out.values()].some(ed => ed.from === p.id && ed.to === a.targetPageId &&
        (ed.fromActionId === a.id || !ed.fromActionId && ed.fromSectionId === s.id && ed.label === a.label))) continue;
      const ed = {id:a.id, from:p.id, to:a.targetPageId, label:a.label, fromActionId:a.id, fromSectionId:s.id,
        toActionId:a.targetActionId, toSectionId:a.targetSectionId, toRegion:a.targetRegion, condition:a.condition,
        strength:'explicit', evidence:'已登记动作目标'};
      out.set(key(ed), ed);
    }
    return [...out.values()];
  }

  function mount(options) {
    const {root:host, manifest:data, images = {}} = options;
    if (!root.DesignCanvasInspector) throw new Error('先加载 page-review.js 与 inspector.js');
    if (!host) throw new Error('需要画布容器');
    const allViews = views(data), allEdges = edgesOf(data);
    const page = id => data.pages.find(p => p.id === id);
    const viewOf = id => allViews.find(v => v.relationMode !== 'all' && v.groups.some(g => g.pageIds.includes(id))) || allViews.find(v => v.groups.some(g => g.pageIds.includes(id)));
    const nodeKinds={page:'页面',dialogue:'对话状态',modal:'弹窗',reference:'说明'};
    const title = data.canvas?.title || '设计需求画布';
    host.classList.add('dch');
    host.innerHTML = '<header class="dch-top"><div class="dch-brand"><b>' + e(title) + '</b><small>' + e(data.canvas?.subtitle || '原图证据 · 组件映射 · 实施范围') + '</small></div><div class="dch-actions"><button type="button" data-host="export">导出需求 JSON ↓</button><span class="dch-badge">离线画布</span></div></header>' +
      '<div class="dch-layout"><nav class="dch-nav" aria-label="场景与页面"><div class="dch-eyebrow">视图</div><div class="dch-views" role="tablist"></div><div class="dch-eyebrow">节点目录 <span data-host="count"></span></div><div class="dch-list"></div><div class="dch-legend"><p><i class="solid"></i>已确认交互 / 状态变化</p><p><i class="dashed"></i>起点区域可见 · 触点待核</p><p><i class="evidence"></i>同页截图或说明 · 非业务跳转</p><p>已定位入口连接到入口区域；缺少证据时降级到区块或整页。URL、权限和参数另行确认。</p></div></nav>' +
      '<main class="dch-stage"><div class="dch-stage-top"><div><h1 data-host="view-title"></h1><p data-host="view-desc"></p></div><div class="dch-zoom"><button type="button" data-host="fit">查看全图</button><button type="button" data-host="out" aria-label="缩小">−</button><span data-host="zoom">100%</span><button type="button" data-host="in" aria-label="放大">＋</button></div></div>' +
      (data.canvas?.scopeBanner ? '<div class="dch-scope">' + e(data.canvas.scopeBanner) + '</div>' : '') +
      '<div class="dch-relations"><div class="dch-relation-tools"><button type="button" data-host="relations-focus" aria-pressed="true">主线 / 当前页</button><button type="button" data-host="relations-all" aria-pressed="false">全部关系</button><label><input type="checkbox" data-host="relations-incoming">包含来自</label><span data-host="relation-count" aria-live="polite"></span></div><div class="dch-relation-list" aria-label="当前显示的关系"></div></div>' +
      '<div class="dch-viewport" tabindex="0" aria-label="页面关系画布：拖动空白处平移，滚轮缩放，方向键平移，0 适应全图"><div class="dch-world"><svg class="dch-links" aria-hidden="true"><defs><marker id="dch-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#aab4c7"/></marker><marker id="dch-arrow-on" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#cc2638"/></marker></defs></svg><div class="dch-nodes"></div></div><div class="dch-hint">拖动空白处平移 · 滚轮缩放 · 点击页面查看需求</div></div></main>' +
      '<aside class="dch-detail"></aside></div><dialog class="dch-preview" aria-label="原图预览"><div class="dch-preview-bar"><b></b><button type="button" data-host="close-preview">关闭原图</button></div><div class="dch-frame"><img alt=""><div class="dch-box" hidden><span></span></div></div></dialog>';
    const $ = s => host.querySelector(s);
    const viewport = $('.dch-viewport'), world = $('.dch-world'), nodesEl = $('.dch-nodes'), links = $('.dch-links'), detail = $('.dch-detail'), dialog = $('.dch-preview');
    let view = null, selected = null, layout = new Map(), size = {width:0, height:0}, t = {x:0, y:0, s:1}, trigger = null, version = 0, relationMode = 'focus', includeIncoming = false, traceId = null;

    // ---- pan / zoom: one transform, top-left origin, so focal math matches the rendered transform ----
    function apply() { world.style.transform = 'translate(' + t.x + 'px,' + t.y + 'px) scale(' + t.s + ')'; $('[data-host="zoom"]').textContent = Math.round(t.s * 100) + '%'; }
    function zoomAt(scale, px, py) { const s = Math.max(L.minScale, Math.min(L.maxScale, scale)); t.x = px - (px - t.x) * s / t.s; t.y = py - (py - t.y) * s / t.s; t.s = s; apply(); }
    function fit() { const w = viewport.clientWidth, h = viewport.clientHeight; if (!size.width || !w) return; t.s = Math.max(L.minScale, Math.min((w - 60) / size.width, (h - 60) / size.height, .9)); t.x = (w - size.width * t.s) / 2; t.y = (h - size.height * t.s) / 2; apply(); }
    function center(x, y, scale) { const w = viewport.clientWidth, h = viewport.clientHeight; if (scale) t.s = Math.max(L.minScale, Math.min(L.maxScale, scale)); t.x = w / 2 - x * t.s; t.y = h / 2 - y * t.s; apply(); }
    function focusNode(id) { const n = layout.get(id), el = node(id); if (!n || !el) return; const h = el.offsetHeight || n.height; center(n.x + L.nodeWidth / 2, n.y + h / 2, Math.min(.9, (viewport.clientWidth - 80) / L.nodeWidth, (viewport.clientHeight - 80) / h)); }
    viewport.addEventListener('wheel', ev => { ev.preventDefault(); const r = viewport.getBoundingClientRect(); const unit = ev.deltaMode === 1 ? 16 : ev.deltaMode === 2 ? r.height : 1; zoomAt(t.s * Math.exp(-(ev.deltaY || ev.deltaX) * unit * (ev.ctrlKey ? .01 : .002)), ev.clientX - r.left, ev.clientY - r.top); }, {passive:false});
    let drag = null;
    viewport.addEventListener('pointerdown', ev => { if (ev.button !== 0 || ev.target.closest('.dch-node,.dch-link')) return; drag = {id:ev.pointerId, x:ev.clientX - t.x, y:ev.clientY - t.y}; viewport.setPointerCapture?.(ev.pointerId); viewport.classList.add('dragging'); });
    viewport.addEventListener('pointermove', ev => { if (!drag || ev.pointerId !== drag.id) return; t.x = ev.clientX - drag.x; t.y = ev.clientY - drag.y; apply(); });
    const end = ev => { if (drag && ev.pointerId === drag.id) { drag = null; viewport.classList.remove('dragging'); } };
    viewport.addEventListener('pointerup', end); viewport.addEventListener('pointercancel', end);
    viewport.addEventListener('keydown', ev => {
      if (ev.target !== viewport) return;
      const step = 60, map = {ArrowLeft:[step, 0], ArrowRight:[-step, 0], ArrowUp:[0, step], ArrowDown:[0, -step]};
      if (map[ev.key]) { t.x += map[ev.key][0]; t.y += map[ev.key][1]; apply(); }
      else if (ev.key === '+' || ev.key === '=') zoomAt(t.s * 1.2, viewport.clientWidth / 2, viewport.clientHeight / 2);
      else if (ev.key === '-') zoomAt(t.s / 1.2, viewport.clientWidth / 2, viewport.clientHeight / 2);
      else if (ev.key === '0') fit(); else return;
      ev.preventDefault();
    });

    // ---- layout: columns = groups, rows stacked by real crop aspect; re-measured after images decode ----
    const node = id => nodesEl.querySelector('[data-page-id="' + CSS.escape(id) + '"]');
    function estimate(p) { const c = p.crop; return L.head + (L.nodeWidth - L.pad * 2) * c.height / c.width + L.foot; }
    function visibleEdges() {
      const ids = new Set(view.groups.flatMap(g => g.pageIds));
      const candidates = allEdges.filter(ed => ids.has(ed.from) && ids.has(ed.to));
      if (relationMode === 'all') return candidates;
      if (selected) return candidates.filter(ed => ed.from === selected || includeIncoming && ed.to === selected);
      if (view.showEvidence === true) return candidates.filter(ed => ed.kind === 'evidence');
      const byId = new Map(candidates.map(ed => [ed.id,ed]));
      return (data.canvas?.mainPathEdgeIds || []).map(id=>byId.get(id)).filter(Boolean);
    }
    function place() {
      const routeTop = L.top;
      layout = new Map(); let x = L.left, bottom = 0;
      const h = id => node(id)?.offsetHeight || estimate(page(id));
      // Long groups wrap into several columns, keeping reading order, so the canvas stays near 16:10.
      const tallest = Math.max(...view.groups.flatMap(g => g.pageIds.map(h)));
      const total = view.groups.reduce((a, g) => a + g.pageIds.reduce((b, id) => b + h(id) + L.rowGap, 0), 0);
      const target = Math.max(tallest, Math.sqrt(total * (L.nodeWidth + L.colGap) / 1.6));
      for (const g of view.groups) {
        const label = nodesEl.querySelector('[data-group-id="' + CSS.escape(g.id) + '"]'); if (label) { label.style.left = x + 'px'; label.style.top = (routeTop - 50) + 'px'; }
        let y = routeTop;
        g.pageIds.forEach((id, i) => {
          const hh = h(id);
          if (i && y + hh - routeTop > target) { x += L.nodeWidth + L.subGap; y = routeTop; }
          layout.set(id, {x, y, height:hh}); const el = node(id); if (el) { el.style.left = x + 'px'; el.style.top = y + 'px'; }
          y += hh + L.rowGap; bottom = Math.max(bottom, y);
        });
        x += L.nodeWidth + L.colGap;
      }
      size = {width:x - L.colGap + L.left, height:bottom + 40};
      Object.assign(world.style, {width:size.width + 'px', height:size.height + 'px'});
      links.setAttribute('width', size.width); links.setAttribute('height', size.height);
    }
    function endpoint(ed, side) {
      const id = side === 'from' ? ed.from : ed.to, p = page(id);
      const actionId = ed[side + 'ActionId'];
      const owner = p.sections.find(s => s.actions?.some(a => a.id === actionId));
      const action = owner?.actions.find(a => a.id === actionId);
      const section = owner || p.sections.find(s => s.id === ed[side + 'SectionId']);
      const exact = ed[side + 'Region'] || action?.evidence?.region;
      return {region:exact || section?.evidence?.region || null,
        precision:exact ? 'entry' : section?.evidence?.region ? 'section' : 'page'};
    }
    function anchor(ed, side, right) {
      const id = side === 'from' ? ed.from : ed.to, n = layout.get(id), ep = endpoint(ed, side);
      const el = node(id), media = el.querySelector('.dch-media img');
      // Use the real image box: borders, responsive image size and zoom cannot shift the endpoint.
      const image = media.getBoundingClientRect(), outer = el.getBoundingClientRect();
      const x = n.x + (image.left - outer.left) / t.s, y = n.y + (image.top - outer.top) / t.s;
      const w = image.width / t.s, h = image.height / t.s, r = ep.region;
      const vertical=right==='top'||right==='bottom';
      return {x:r ? x+w*(r[0]+(vertical?r[2]/2:right?r[2]:0))/100 : vertical?n.x+L.nodeWidth/2:n.x+(right?L.nodeWidth:0),
        y:r ? y+h*(r[1]+(vertical?(right==='bottom'?r[3]:0):r[3]/2))/100 : vertical?(right==='bottom'?y+h:y):y+h/2,precision:ep.precision};
    }
    function edgeLabel(ed) { return ed.label+(ed.condition?' · '+ed.condition:''); }
    function edgeById(id) { return allEdges.find(ed => ed.id === id); }
    function trace(id) {
      traceId = id;
      links.querySelectorAll('.dch-link').forEach(el => {
        el.classList.toggle('traced', !!id && el.dataset.edgeId === id);
        el.classList.toggle('muted', !!id && el.dataset.edgeId !== id);
      });
      host.querySelectorAll('[data-trace-edge]').forEach(el => el.classList.toggle('traced', el.dataset.traceEdge === id));
      clearBoxes();
      const ed = edgeById(id); if (!ed) return;
      for (const side of ['from','to']) {
        const pid = ed[side], ep = endpoint(ed, side), el = node(pid);
        if (el) box(el.querySelector('.dch-box'), {region:ep.region,label:(side==='from'?'触发入口 · ':'目标落点 · ')+ed.label});
      }
    }
    function directCurve(start,end,a,b) {
      const sameColumn=a.x===b.x, direction=b.x>a.x?1:-1, down=b.y>=a.y;
      const gap=sameColumn?(down?b.y-a.y-a.height:a.y-b.y-b.height):Math.abs(b.x-a.x)-L.nodeWidth;
      const c1=sameColumn?{x:start.x,y:down?a.y+a.height+gap*.45:a.y-gap*.45}:{x:direction>0?a.x+L.nodeWidth+gap*.45:a.x-gap*.45,y:start.y};
      const c2=sameColumn?{x:end.x,y:down?b.y-gap*.45:b.y+b.height+gap*.45}:{x:direction>0?b.x-gap*.45:b.x+L.nodeWidth+gap*.45,y:end.y};
      return `M${start.x} ${start.y}C${c1.x} ${c1.y} ${c2.x} ${c2.y} ${end.x} ${end.y}`;
    }
    function draw() {
      links.querySelectorAll('path.dch-link').forEach(p => p.remove());
      const shown = visibleEdges();
      if (!shown.some(ed => ed.id === traceId)) traceId = null;
      shown.forEach(ed => {
        const a = layout.get(ed.from), b = layout.get(ed.to); if (!a || !b) return;
        const forward=b.x>=a.x, sameColumn=a.x===b.x, down=b.y>=a.y;
        const start=anchor(ed,'from',sameColumn?(down?'bottom':'top'):forward),end=anchor(ed,'to',sameColumn?(down?'top':'bottom'):!forward);
        const d=directCurve(start,end,a,b);
        const path = document.createElementNS(NS, 'path'); path.setAttribute('d',d);
        path.setAttribute('class','dch-link'+(ed.strength==='origin-only'?' uncertain':'')+(ed.kind==='evidence'?' evidence':'')+(selected&&(ed.from===selected||ed.to===selected)?' on':''));
        path.dataset.curve='cubic';
        path.dataset.sourcePrecision=start.precision; path.dataset.targetPrecision=end.precision;
        path.dataset.from=ed.from;path.dataset.to=ed.to;path.dataset.edgeId=ed.id||'';
        const tip=document.createElementNS(NS,'title');tip.textContent=edgeLabel(ed)+' · '+page(ed.from).title+' → '+page(ed.to).title;path.appendChild(tip);
        path.addEventListener('pointerenter',()=>trace(ed.id));path.addEventListener('pointerleave',()=>trace(null));
        path.addEventListener('click',()=>trace(ed.id));links.appendChild(path);
      });
      $('[data-host="relations-focus"]').setAttribute('aria-pressed',String(relationMode==='focus'));
      $('[data-host="relations-all"]').setAttribute('aria-pressed',String(relationMode==='all'));
      $('[data-host="relations-incoming"]').disabled=relationMode==='all';
      const total=allEdges.filter(ed=>layout.has(ed.from)&&layout.has(ed.to)).length;
      $('[data-host="relation-count"]').textContent=`显示 ${shown.length} / ${total} 条`+(relationMode==='focus'?(selected?' · 当前页去向'+(includeIncoming?'与来源':''):(view.showEvidence?' · 截图从属关系，非业务跳转':' · 主线，选择页面展开分支')):' · 全部关系');
      const external=selected?allEdges.filter(ed=>ed.from===selected&&!layout.has(ed.to)).length:0;
      if(external)$('[data-host="relation-count"]').textContent+=' · 另有 '+external+' 条跨视图关系，可从右栏定位';
      $('.dch-relation-list').innerHTML=shown.map(ed=>'<div class="dch-relation-item"><button type="button" data-trace-edge="'+e(ed.id)+'" title="'+e(page(ed.from).title+' → '+page(ed.to).title)+'">'+e(edgeLabel(ed))+'</button><button type="button" data-edge-target="'+e(ed.id)+'" aria-label="定位目标：'+e(page(ed.to).title)+'">↗</button></div>').join('');
      $('.dch-relation-list').querySelectorAll('[data-trace-edge]').forEach(el=>{
        el.addEventListener('pointerenter',()=>trace(el.dataset.traceEdge));el.addEventListener('pointerleave',()=>trace(null));
        el.addEventListener('focus',()=>trace(el.dataset.traceEdge));el.addEventListener('blur',()=>trace(null));
        el.addEventListener('click',()=>trace(el.dataset.traceEdge));
      });
      trace(traceId);
    }
    function relations(mode, incoming=includeIncoming) {
      relationMode=mode==='all'?'all':'focus';includeIncoming=!!incoming;
      $('[data-host="relations-incoming"]').checked=includeIncoming;
      place();draw();if(selected)focusNode(selected);else fit();
    }

    function renderView(id, {keepInspector = false} = {}) {
      const v = allViews.find(x => x.id === id) || allViews[0];
      const ver = ++version; view = v;
      if (v.relationMode === 'all' || v.relationMode === 'focus') relationMode = v.relationMode; if (!keepInspector) { selected = null; traceId=null; host.classList.remove('has-detail'); inspector?.clear(); }
      host.querySelectorAll('[data-view-id]').forEach(b => { const on = b.dataset.viewId === v.id; b.classList.toggle('on', on); b.setAttribute('aria-selected', on); });
      $('[data-host="view-title"]').textContent = v.title; $('[data-host="view-desc"]').textContent = v.description || '选择页面卡片，查看原图证据、组件映射与实施范围。';
      const ids = v.groups.flatMap(g => g.pageIds);
      $('[data-host="count"]').textContent = String(ids.length).padStart(2, '0');
      $('.dch-list').innerHTML = ids.map((pid, i) => '<button type="button" class="dch-item" data-nav-page="' + e(pid) + '"><span>' + String(i + 1).padStart(2, '0') + '</span>' + e(page(pid).title) + '<small>' + e(page(pid).nodeType ? nodeKinds[page(pid).nodeType] : page(pid).role) + '</small></button>').join('');
      let n = 0;
      nodesEl.innerHTML = v.groups.map((g, gi) => '<div class="dch-group" data-group-id="' + e(g.id) + '"><b>' + String(gi + 1).padStart(2, '0') + '</b>' + e(g.title) + '</div>').join('') + v.groups.flatMap(g => g.pageIds).map(pid => {
        const p = page(pid), work = data.workItems.filter(w => p.sections.some(s => s.id === w.sectionId));
        const count = lane => work.filter(w => w.lane === lane).length;
        return '<article class="dch-node" tabindex="0" role="button" aria-label="查看' + e(p.title) + '需求" data-page-id="' + e(pid) + '" style="width:' + L.nodeWidth + 'px"><div class="dch-node-head"><span>' + String(++n).padStart(2, '0') + '</span><div><strong>' + e(p.title) + '</strong><small>' + e(p.nodeType ? nodeKinds[p.nodeType] + (p.ownerPageId ? ' · 属于 '+page(p.ownerPageId).title : '') : p.role) + '</small></div></div><div class="dch-media"><img src="' + e(images[pid] || '') + '" alt="' + e(p.title) + ' 原图裁剪" style="aspect-ratio:' + p.crop.width + '/' + p.crop.height + '"><div class="dch-box" hidden><span></span></div></div><div class="dch-node-foot"><button type="button" data-expand-page="' + e(pid) + '">去向 ' + allEdges.filter(ed => ed.from===pid && ed.kind!=='evidence').length + ' · 证据 ' + allEdges.filter(ed => ed.from===pid && ed.kind==='evidence').length + '</button><span class="reuse">纳入 ' + count('reuse') + '</span><span class="component-work">组件优先 ' + count('component-work') + '</span><span class="review">待评审 ' + count('review') + '</span><em>' + p.sections.length + ' 区块</em></div></article>';
      }).join('');
      place(); draw(); fit();
      Promise.all([...nodesEl.querySelectorAll('img')].map(img => img.decode ? img.decode().catch(() => {}) : null)).then(() => { if (ver !== version) return; place(); draw(); if (!selected) fit(); else markSelected(); host.dataset.ready = 'true'; });
    }
    function markSelected() { place(); nodesEl.querySelectorAll('.dch-node').forEach(el => el.classList.toggle('on', el.dataset.pageId === selected)); host.querySelectorAll('[data-nav-page]').forEach(el => el.classList.toggle('on', el.dataset.navPage === selected)); draw(); }
    function box(el, d) {
      el.hidden = !d.region; if (!d.region) return;
      const [x, y, w, h] = d.region; Object.assign(el.style, {left:x + '%', top:y + '%', width:w + '%', height:h + '%'});
      el.classList.toggle('review', d.lane === 'review'); el.querySelector('span').textContent = d.label;
    }
    function clearBoxes() { nodesEl.querySelectorAll('.dch-box').forEach(b => { b.hidden = true; }); }
    function openPreview(d) {
      trigger = document.activeElement; const p = page(d.pageId);
      dialog.querySelector('.dch-preview-bar b').textContent = p.title + ' · ' + (d.label || '原图整页');
      const img = dialog.querySelector('img'); img.src = images[p.id] || ''; img.alt = p.title + ' 原图';
      box(dialog.querySelector('.dch-box'), d);
      if (dialog.showModal) dialog.showModal(); else dialog.setAttribute('open', '');
      dialog.querySelector('[data-host="close-preview"]').focus();
    }
    const closePreview = () => { if (dialog.open) dialog.close ? dialog.close() : dialog.removeAttribute('open'); };
    dialog.addEventListener('close', () => { trigger?.focus?.(); trigger = null; });
    dialog.addEventListener('click', ev => { if (ev.target === dialog) closePreview(); });

    const inspector = root.DesignCanvasInspector.create({
      container:detail, manifest:data, resolveImage:p => images[p.id] || '',
      onSelect:({pageId}) => {
        if (!view.groups.some(g => g.pageIds.includes(pageId))) { const target = viewOf(pageId); if (target) renderView(target.id, {keepInspector:true}); }
        selected = pageId; traceId=null; host.classList.add('has-detail'); markSelected();
      },
      onHighlight:d => {
        clearBoxes(); const el = node(d.pageId); if (!el) return;
        box(el.querySelector('.dch-box'), d); if (!d.region) return;
        const img = el.querySelector('img').getBoundingClientRect(), vp = viewport.getBoundingClientRect();
        const cx = img.left + img.width * (d.region[0] + d.region[2] / 2) / 100 - vp.left, cy = img.top + img.height * (d.region[1] + d.region[3] / 2) / 100 - vp.top;
        if (cx < 20 || cy < 20 || cx > vp.width - 20 || cy > vp.height - 20) { t.x += vp.width / 2 - cx; t.y += vp.height / 2 - cy; apply(); }
      },
      onClearHighlight:clearBoxes,
      onPreview:openPreview,
      onNavigate:({pageId}) => requestAnimationFrame(() => focusNode(pageId)),
      onClose:({pageId}) => { selected = null; traceId=null; host.classList.remove('has-detail'); clearBoxes(); markSelected(); (node(pageId) || host.querySelector('[data-nav-page="' + CSS.escape(pageId || '') + '"]'))?.focus(); }
    });

    function choose(pid, {pan = false} = {}) { traceId=null; if (selected === pid) { if (pan) focusNode(pid); return; } inspector.select(pid); if (pan) focusNode(pid); }
    host.querySelector('.dch-views').innerHTML = allViews.map(v => '<button type="button" role="tab" data-view-id="' + e(v.id) + '">' + e(v.title) + '<small>' + v.groups.reduce((a, g) => a + g.pageIds.length, 0) + ' 个节点</small></button>').join('');
    host.addEventListener('click', ev => {
      const branch=ev.target.closest('[data-expand-page]');if(branch){relations('focus');choose(branch.dataset.expandPage,{pan:true});return;}
      const targetButton=ev.target.closest('[data-edge-target]');if(targetButton){const ed=edgeById(targetButton.dataset.edgeTarget);choose(ed.to,{pan:true});const ep=endpoint(ed,'to');const el=node(ed.to);if(el)box(el.querySelector('.dch-box'),{region:ep.region,label:ed.label});return;}
      const t0 = ev.target.closest('[data-view-id],[data-nav-page],.dch-node,[data-host]'); if (!t0 || !host.contains(t0)) return;
      if (t0.dataset.viewId) renderView(t0.dataset.viewId);
      else if (t0.dataset.navPage) choose(t0.dataset.navPage, {pan:true});
      else if (t0.classList.contains('dch-node')) choose(t0.dataset.pageId);
      else ({'relations-focus':()=>relations('focus'),'relations-all':()=>relations('all'),fit, in:() => zoomAt(t.s * 1.2, viewport.clientWidth / 2, viewport.clientHeight / 2), out:() => zoomAt(t.s / 1.2, viewport.clientWidth / 2, viewport.clientHeight / 2), export:exportJSON, 'close-preview':closePreview}[t0.dataset.host] || (() => {}))();
    });
    host.querySelector('[data-host="relations-incoming"]').addEventListener('change',ev=>relations(relationMode,ev.target.checked));
    nodesEl.addEventListener('keydown', ev => { const el = ev.target.closest('.dch-node'); if (el && ev.target === el && (ev.key === 'Enter' || ev.key === ' ')) { ev.preventDefault(); choose(el.dataset.pageId); } });
    function exportJSON() {
      const blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json'});
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = (title.replace(/[\\/:*?"<>|\s]+/g, '-') || 'canvas') + '-需求.json';
      host.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    }
    let resizeTimer; root.addEventListener?.('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(() => { if (!selected) fit(); }, 120); });
    renderView(data.canvas?.defaultViewId || allViews[0].id);
    return {inspector, select:id => choose(id, {pan:true}), view:id => renderView(id), fit, zoomAt, getTransform:() => ({...t}), getLayout:() => new Map(layout), edges:allEdges, relations, getVisibleEdges:()=>visibleEdges(), trace};
  }
  root.DesignCanvasHost = {version:'1', mount, views, edges:edgesOf, layoutDefaults:L};
})(globalThis);
