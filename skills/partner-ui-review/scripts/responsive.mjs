// Geometry and hit testing need a real browser. Contracts describe consumer layout,
// never rewrite or reinterpret intentional library-internal padding.
export function collectResponsive(contracts = []) {
  const samples = [];
  const visible = el => { const r=el.getBoundingClientRect(),s=getComputedStyle(el); return r.width>0&&r.height>0&&s.visibility==='visible'&&!el.closest('[hidden],[inert]'); };
  for (const c of contracts) {
    if (!c.id || !c.selector || !c.basis || !(c.within || c.minInlineSize || c.overlay)) throw new Error('Responsive contracts require id, selector, basis and a boundary, minimum or overlay check');
    if (c.minInlineSize !== undefined && !(Number.isFinite(c.minInlineSize) && c.minInlineSize > 0)) throw new Error('minInlineSize must be a positive CSS pixel width justified by basis');
    const targets=[...document.querySelectorAll(c.selector)].filter(visible);
    if (!targets.length) { samples.push({...c,selectorPath:c.selector,notVerified:'Responsive contract target not rendered'}); continue; }
    for (const el of targets) {
      const r=el.getBoundingClientRect();
      const sample={id:c.id,basis:c.basis,selectorPath:c.selector,width:r.width,screenshotBox:{x:r.x+scrollX,y:r.y+scrollY,width:r.width,height:r.height},violations:[]};
      if(c.within) {
        const parent=el.parentElement?.closest(c.within);
        if(!parent) sample.notVerified='Declared layout container not found';
        else { const p=parent.getBoundingClientRect(); sample.containerWidth=p.width;
          if(r.left<p.left-1||r.right>p.right+1) sample.violations.push({type:'container-overflow',target:{left:r.left,right:r.right},container:{left:p.left,right:p.right}});
        }
      }
      if(c.minInlineSize && r.width<c.minInlineSize-1) sample.violations.push({type:'unusable-width',minimum:c.minInlineSize,actual:r.width});
      if(c.overlay) {
        if(r.left<0||r.right>innerWidth||r.top<0||r.bottom>innerHeight) sample.notVerified='Overlay is partly outside the viewport; position or scroll it into view and recapture';
        const points=[]; let tested=0;
        for(const x of [0.2,0.5,0.8]) for(const y of [0.25,0.5,0.75]) {
          const px=r.x+r.width*x,py=r.y+r.height*y;
          if(px<0||px>=innerWidth||py<0||py>=innerHeight)continue;
          tested++;
          const hit=document.elementFromPoint(px,py);
          if(hit && hit!==el && !el.contains(hit)) points.push({x:px,y:py,blocker:hit.id?'#'+hit.id:hit.tagName.toLowerCase()+'.'+[...hit.classList].join('.')});
        }
        sample.hitTests=tested; if(points.length) sample.violations.push({type:'overlay-occluded',points});
      }
      samples.push(sample);
    }
  }
  return samples;
}
export function checkResponsive(sample) {
  return (sample.violations ?? []).map(actual=>({rule:'R6_OVERFLOW',severity:'must-fix',contractId:sample.id,basis:sample.basis,selectorPath:sample.selectorPath,expected:'Usable control width, containment and unobstructed open overlay',actual,screenshotBox:sample.screenshotBox}));
}
