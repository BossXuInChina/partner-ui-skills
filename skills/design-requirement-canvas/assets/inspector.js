/* Design requirement canvas: shared right inspector, v1. No external dependencies.
 * Requires page-review.js. Host supplies screenshot/canvas/navigation adapters. */
(function (root) {
  'use strict';
  const e = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const text = value => typeof value === 'string' ? value : JSON.stringify(value, null, 2);
  const list = (items, empty = '当前未登记，需核对后补齐。') => Array.isArray(items) && items.length ? '<ul>' + items.map(x => '<li>' + e(text(x)) + '</li>').join('') + '</ul>' : '<p class="dci-note">' + e(empty) + '</p>';
  const code = value => value && Object.keys(value).length ? '<pre>' + e(text(value)) + '</pre>' : '<p class="dci-note">未配置 / 待核对。</p>';
  const lanes = {reuse:'纳入还原 · 复用已有样式', 'component-work':'组件优先 · 先验证能力', review:'待评审 · 排除还原'};
  const statuses = {candidate:'候选，未验证', partial:'部分配置，待核对', verified:'配置已验证（以登记证据为准）'};
  function connect(data, pageId) {
    if (root.DesignCanvasHost) return root.DesignCanvasHost.edges(data).filter(ed => ed.from === pageId || ed.to === pageId);
    const out = [];
    (data.edges || []).forEach(ed => {if (ed.from === pageId || ed.to === pageId) out.push(ed);});
    data.pages.forEach(p => p.sections.forEach(s => (s.actions || []).filter(a => a.targetStatus === 'confirmed').forEach(a => {
      if ((p.id === pageId || a.targetPageId === pageId) && !out.some(ed => ed.fromActionId === a.id || !ed.fromActionId && ed.from === p.id && ed.to === a.targetPageId && ed.label === a.label))
        out.push({from:p.id,to:a.targetPageId,label:a.label,fromActionId:a.id,fromSectionId:s.id});
    })));
    return out;
  }

  function create(options) {
    if (!root.DesignCanvasReview) throw new Error('先加载 page-review.js');
    const {container, manifest:data, resolveImage} = options;
    if (!container || typeof container.replaceChildren !== 'function') throw new Error('需要右侧面板容器');
    for (const name of ['resolveImage','onHighlight','onClearHighlight','onPreview','onNavigate','onSelect','onClose']) if (typeof options[name] !== 'function') throw new Error('缺少面板适配器：' + name);
    let current = null, active = null, destroyed = false;
    container.classList.add('dci');
    container.setAttribute('aria-label','页面需求详情');
    container.setAttribute('data-inspector-version','1');
    const page = id => data.pages.find(p => p.id === id);
    const workFor = s => data.workItems.filter(w => w.sectionId === s.id);
    function regionFor(button) {
      const p = page(current), s = p?.sections.find(v => v.id === button.dataset.sectionId);
      if (!p) return null;
      const m = s?.mappings?.find(v => v.id === button.dataset.mappingId);
      const w = data.workItems.find(v => v.id === button.dataset.workItemId);
      const action = s?.actions?.find(a => a.id === button.dataset.actionId);
      const specific = action?.evidence?.region || m?.evidence?.region || w?.evidence?.region;
      return {pageId:p.id, sectionId:s?.id || null, mappingId:m?.id || null, workItemId:w?.id || null,
        region:specific || s?.evidence?.region || null,
        precision:action?.evidence?.region ? 'entry' : specific ? 'approx-component' : s?.evidence?.region ? 'approx-section' : 'page',
        lane:w?.lane || null, label:action?.evidence?.region ? action.label + ' · 入口' : w?.lane === 'review' ? '待评审 · 排除还原' : specific ? '组件参考区域 · 近似' : s?.evidence?.region ? '整区近似范围' : '未标注区域 · 查看整页'};
    }
    function clearHighlight() { active = null; options.onClearHighlight({pageId:current}); }
    function show(button) { const detail = regionFor(button); if (detail) { active = button; options.onHighlight(detail); } }
    function empty() {
      container.innerHTML = '<div class="dci-empty" data-inspector-empty><span>◫</span><small>PAGE INSPECTOR</small><h2>选择一个页面</h2><p>点击画布节点，查看原图、还原边界、需求完整性、组件与页面连接。</p></div>';
      container.scrollTop = 0;
    }
    function mappingHTML(s, m) {
      const a = data.assets.find(v => v.id === m.assetId);
      return '<article class="dci-contract" data-mapping-id="'+e(m.id)+'"><strong>'+e(a?.publicExport || '公开符号待核')+'</strong><small>'+e(m.assetId)+' · '+e(a?.version || '版本待核')+'</small><p>'+e(a?.qualification || '资格未登记')+'</p><p>配置状态：'+e(statuses[m.configurationStatus] || '待核')+'</p><p>契约来源：'+e(a?.contractSource || '未登记')+'</p><dl><dt>公开 API 索引 · 非实例配置</dt><dd>'+code(a?.publicContract)+'</dd><dt>确定的 Props</dt><dd>'+code(m.props)+'</dd><dt>Slots</dt><dd>'+code(m.slots)+'</dd><dt>状态绑定</dt><dd>'+code(m.bindings)+'</dd><dt>事件与动作</dt><dd>'+list((m.actionIds || []).map(id => {const action=s.actions?.find(x=>x.id===id);return action ? action.label+'（'+id+'）' : id;}),'未登记事件映射，需核对公开契约。')+code(m.events)+'</dd><dt>配置缺项</dt><dd>'+list(m.unknowns,'当前未登记缺项；不代表实例已完成。')+'</dd></dl></article>';
    }
    function sectionHTML(s) {
      const work = workFor(s), lane = !work.length ? 'unregistered' : work.some(w => w.lane === 'review') && work.some(w => w.lane !== 'review') ? 'mixed' : work.some(w=>w.lane==='component-work') ? 'component-work' : work.some(w=>w.lane==='review') ? 'review' : 'reuse';
      const label = lane === 'mixed' ? '混合范围 · 部分待评审' : work.length ? lanes[lane] : '范围未登记';
      const chips = (s.mappings || []).map(m => '<button type="button" class="dci-chip" data-inspector-action="region" data-section-id="'+e(s.id)+'" data-mapping-id="'+e(m.id)+'">'+e(m.assetId)+'</button>').join('');
      const actions = s.actions || [];
      const entryChips = actions.filter(a => a.evidence?.region).map(a => '<button type="button" class="dci-chip" data-inspector-action="region" data-section-id="'+e(s.id)+'" data-action-id="'+e(a.id)+'">入口 · '+e(a.label)+'</button>').join('');
      return '<article class="dci-section" data-section-id="'+e(s.id)+'"><div class="dci-section-head"><h4>'+e(s.title)+'</h4><span class="dci-badge '+e(lane)+'">'+e(label)+'</span></div>'+list(s.facts)+'<div class="dci-chips">'+chips+entryChips+'</div><p class="dci-note">指向或聚焦标签可定位；点击查看原图。红框为辅助范围。</p><div data-section-work>'+work.map(w=>'<div class="dci-work '+e(w.lane)+'"><button type="button" class="dci-chip" data-inspector-action="region" data-section-id="'+e(s.id)+'" data-work-item-id="'+e(w.id)+'">'+e(w.title || w.id)+'</button><b>'+e(lanes[w.lane])+'</b><p>'+e(w.reason)+'</p><p>'+e(w.implementation || (w.lane==='review'?'仅保留评审参考，排除页面生成。':w.lane==='component-work'?'先验证并补齐公开组件能力，再接入页面。':'使用已有组件公开接口，宿主负责内容与布局。'))+'</p></div>').join('')+'</div><button type="button" class="dci-evidence" data-inspector-action="region" data-section-id="'+e(s.id)+'">查看区块原图位置 ↗</button><details data-section-spec><summary>展开字段、状态与验收</summary><dl><dt>字段</dt><dd>'+list(s.fields)+'</dd><dt>截图状态与参考数据</dt><dd>'+code(s.referenceState)+list(s.referenceDisplayData,'当前未登记样例；不得据此编造默认值。')+'</dd><dt>操作与关系</dt><dd>'+actions.map(a=>'<div class="dci-action"><span>'+e(a.label)+(a.condition?'（'+e(a.condition)+'）':'')+'</span>'+ (a.targetStatus==='confirmed' ? '<button type="button" data-inspector-action="navigate" data-target-page-id="'+e(a.targetPageId)+'">'+e(page(a.targetPageId)?.title || a.targetPageId)+' ↗</button>' : a.effect ? '<small>'+e(a.effect)+' · 无跨页目标</small>' : '<small>行为或目标待确认</small>')+'</div>').join('')+(actions.length?'':'<p class="dci-note">当前未登记动作，需对照原图核查。</p>')+'</dd><dt>待确认</dt><dd>'+list(s.unknowns)+'</dd><dt>还原检查 · 受实施范围约束</dt><dd>'+list(s.acceptance)+'</dd></dl><button type="button" class="dci-evidence" data-inspector-action="region" data-section-id="'+e(s.id)+'">查看原图位置 ↗</button></details><details data-section-contract><summary>组件公开契约与实例配置 <small>'+(s.mappings || []).length+' 项</small></summary>'+(s.mappings || []).map(m=>mappingHTML(s,m)).join('')+'<p class="dci-note">资产存在及 API 清单不代表实例适配已完成；候选资格以锁定包为准。</p></details></article>';
    }
    function select(id, {notify=true} = {}) {
      if (destroyed) throw new Error('面板已销毁');
      clearHighlight();
      try {
        const view = root.DesignCanvasReview.forPage(data,id), p=view.page;
        const edges = connect(data,id), src=data.sources.find(s=>s.id===p.crop.sourceId), url=resolveImage(p);
        current=id;
        container.innerHTML='<header class="dci-header" data-inspector-part="identity"><div class="dci-overline"><span>PAGE INSPECTOR / '+e(p.role)+'</span><button type="button" data-inspector-action="close" aria-label="关闭详情">×</button></div><h2>'+e(p.title)+'</h2><p>'+e((p.nodeType ? ({page:'业务页面',dialogue:'同页对话状态',modal:'同页弹窗',reference:'资料说明'}[p.nodeType])+(p.ownerPageId?' · 所属页面：'+page(p.ownerPageId).title:'')+'。' : '')+(p.description || p.note || p.originalState || '静态原图参考；行为规则另行核对。'))+'</p>'+(p.ownerPageId?'<button type="button" class="dci-evidence" data-inspector-action="navigate" data-target-page-id="'+e(p.ownerPageId)+'">定位所属页面 ↗</button>':'')+'</header><div class="dci-body"><section data-inspector-part="evidence"><button type="button" class="dci-preview" data-inspector-action="preview" aria-label="放大'+e(p.title)+'原图">'+(url?'<img src="'+e(url)+'" alt="'+e(p.title)+'原图裁剪">':'<span>截图未提供，需补齐证据</span>')+'</button><div class="dci-caption"><span>'+e(({"expanded-scroll":"滚动内容完整展开","content-crop":"当前状态内容截图",viewport:"视口截图"})[p.capture?.mode] || '原始大图裁剪')+'</span><b>点击放大 ↗</b></div><p class="dci-source">来源：'+e(src?.path || '未登记')+'<br>原图 '+e(src?.width)+' × '+e(src?.height)+'；裁剪 '+e([p.crop.x,p.crop.y,p.crop.width,p.crop.height].join(', '))+' px；不代表设计视口。</p></section>'+root.DesignCanvasReview.render(data,id)+'<section data-inspector-part="sections"><h3 class="dci-label">页面结构与组件 <small>'+p.sections.length+' 个区块 · 指向标签可定位</small></h3>'+p.sections.map(sectionHTML).join('')+'</section><section data-inspector-part="connections"><h3 class="dci-label">交互与状态连接 <small>'+edges.length+' 条</small></h3>'+edges.map(edge=>{const outgoing=edge.from===id,target=outgoing?edge.to:edge.from;return '<div class="dci-edge"><div>'+e(edge.kind==='evidence'?(outgoing?'关联证据':'属于页面'):(outgoing?'去往':'来自'))+' · '+e(edge.label)+(edge.condition?'（'+e(edge.condition)+'）':'')+'<small>'+e(edge.evidence || '已登记关系；URL、参数、打开方式与权限待确认。')+'</small></div><button type="button" data-inspector-action="navigate" data-target-page-id="'+e(target)+'">'+e(page(target).title)+' ↗</button></div>';}).join('')+(edges.length?'':'<p class="dci-note">原图未登记本页连接；可见未知入口仍保留在区块动作中。</p>')+'</section><footer data-inspector-part="limits"><p>组件映射是适配建议；原图内容、候选组件与生成边界需一起核对。</p><details><summary>整页还原前还需补充</summary><ul><li>页面尺寸、间距、字体、断点与公开变体配置。</li><li>真实数据、接口、权限、计算口径及跳转规则。</li><li>截图未展示的空、加载、失败、保存和返回状态。</li><li>人工定位不证明组件使用事实；待评审项不得进入页面生成。</li></ul></details></footer></div>';
        container.scrollTop=0;
        if(notify) options.onSelect({pageId:id});
      } catch (error) {
        current=null;
        container.innerHTML='<div class="dci-empty" data-inspector-error role="alert"><h2>本页数据待补齐</h2><p>'+e(error.message)+'</p><button type="button" data-inspector-action="close">关闭详情</button></div>';
        throw error;
      }
    }
    function clear() {clearHighlight();current=null;empty();}
    function click(event) {
      const button=event.target.closest('[data-inspector-action]'); if(!button||!container.contains(button))return;
      const kind=button.dataset.inspectorAction;
      if(kind==='close'){const old=current;clear();options.onClose({pageId:old});}
      else if(kind==='preview')options.onPreview({pageId:current,region:null,precision:'page',label:'原图整页'});
      else if(kind==='region')options.onPreview(regionFor(button));
      else if(kind==='navigate'){const from=current,to=button.dataset.targetPageId;select(to);options.onNavigate({fromPageId:from,pageId:to});}
    }
    function enter(event){const b=event.target.closest('[data-inspector-action="region"]');if(b&&container.contains(b)&&!b.contains(event.relatedTarget))show(b);}
    function leave(event){const b=event.target.closest('[data-inspector-action="region"]');if(b&&b===active&&!b.contains(event.relatedTarget)){const focused=b.ownerDocument.activeElement;if(event.type==='mouseout'&&focused===b)return;clearHighlight();}}
    const listeners={click,mouseover:enter,mouseout:leave,focusin:enter,focusout:leave};
    Object.entries(listeners).forEach(([type,fn])=>container.addEventListener(type,fn));
    empty();
    return {select,clear,getPageId:()=>current,destroy(){if(destroyed)return;clear();Object.entries(listeners).forEach(([type,fn])=>container.removeEventListener(type,fn));container.replaceChildren();destroyed=true;}};
  }
  root.DesignCanvasInspector={version:'1',create,connections:connect};
})(globalThis);
