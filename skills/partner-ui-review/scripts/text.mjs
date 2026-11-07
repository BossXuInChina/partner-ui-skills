// Explicit typography/readability contracts may sample public component content without
// treating its padding or internal layout as page-owned. Serialized into the browser.
export function collectText(contracts = []) {
  const samples = [];
  const keys = ['fontSize', 'fontWeight', 'lineHeight', 'letterSpacing'];
  const cssName = key => key.replace(/[A-Z]/g, char => '-' + char.toLowerCase());
  const style = el => {
    const cs = getComputedStyle(el);
    return Object.fromEntries([...keys, 'fontFamily'].map(key => [key, key === 'letterSpacing' && cs[key] === 'normal' ? '0px' : cs[key]]));
  };
  for (const contract of contracts) {
    if (!contract.id || !contract.selector || !contract.basis || (!contract.font && !contract.maxLines && !contract.within) || (contract.font && !/^--wb-font-(body|headline|display|caption)-[a-z]+$/.test(contract.font)) || (contract.maxLines !== undefined && (!Number.isInteger(contract.maxLines) || contract.maxLines < 1)))
      throw new Error('Text contracts require id, selector, normative basis and a font bundle, maxLines or containing item.');
    const targets = [...document.querySelectorAll(contract.selector)].filter(el => { const r=el.getBoundingClientRect(), s=getComputedStyle(el); return r.width > 0 && r.height > 0 && s.visibility === 'visible'; });
    if (!targets.length) samples.push({ ...contract, selectorPath: contract.selector, notVerified: 'Text contract target not rendered in this state' });
    for (const el of targets) {
      const cs=getComputedStyle(el), r=el.getBoundingClientRect();
      const sample={id:contract.id,basis:contract.basis,selectorPath:el.id ? '#' + CSS.escape(el.id) : contract.selector,text:el.textContent.trim(),screenshotBox:{x:r.x+scrollX,y:r.y+scrollY,width:r.width,height:r.height},font:style(el)};
      if (contract.font) {
        const values=Object.fromEntries(keys.map(key=>[key,cs.getPropertyValue(contract.font+'-'+cssName(key)).trim()]));
        const family=contract.familyFrom ? document.querySelector(contract.familyFrom) : null;
        if (keys.some(key=>!values[key]) || (contract.familyFrom && !family)) sample.notVerified='Font bundle or declared family source unavailable';
        else {
          const probe=document.createElement('span'); probe.style.cssText='position:fixed;visibility:hidden;pointer-events:none;';
          Object.assign(probe.style,values); el.append(probe);
          sample.expectedFont=Object.fromEntries(keys.map(key=>[key,style(probe)[key]])); probe.remove();
          if (family) sample.expectedFont.fontFamily=getComputedStyle(family).fontFamily;
        }
      }
      if (contract.maxLines) {
        const tops=new Set(), walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);
        while(walker.nextNode()) {
          if(!walker.currentNode.textContent.trim()) continue;
          const range=document.createRange();range.selectNodeContents(walker.currentNode);
          for(const rect of range.getClientRects()) if(rect.width && rect.height) tops.add(Math.round(rect.top));
        }
        sample.lines=tops.size; sample.maxLines=contract.maxLines;
        if (!tops.size) sample.notVerified='No rendered text lines to measure';
      }
      if (contract.within) {
        const item=el.closest(contract.within);
        if (!item) sample.notVerified='Containing item unavailable';
        else {const b=item.getBoundingClientRect();sample.contained=r.left>=b.left-1 && r.right<=b.right+1 && r.top>=b.top-1 && r.bottom<=b.bottom+1 && el.scrollWidth<=el.clientWidth+1;}
      }
      samples.push(sample);
    }
  }
  return samples;
}

export function checkText(sample) {
  if (sample.notVerified) return [];
  const base={selectorPath:sample.selectorPath,screenshotBox:sample.screenshotBox,contract:sample.id,basis:sample.basis,severity:'must-fix'};
  return [
    ...(sample.expectedFont && Object.entries(sample.expectedFont).some(([key,value])=>sample.font[key]!==value) ? [{...base,rule:'R3_FONT_BUNDLE',expected:sample.expectedFont,actual:sample.font}] : []),
    ...(sample.lines>sample.maxLines || sample.contained===false ? [{...base,rule:'R6_OVERFLOW',expected:{maxLines:sample.maxLines,contained:true},actual:{text:sample.text,lines:sample.lines,contained:sample.contained}}] : []),
  ];
}
