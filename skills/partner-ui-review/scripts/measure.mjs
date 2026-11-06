#!/usr/bin/env node
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, relative } from 'node:path';
import { options, visitRoutes, saveJSON, isMain } from './browser.mjs';
import { checkRecord, checkPage, checkLayout, compareComponent, RULES } from './rules.mjs';
import { collectText, checkText } from './text.mjs';

// This function is serialized into the real browser, not a simulated DOM.
export function collectPage(config = {}) {
  const root = document.querySelector(config.rootSelector || 'body');
  if (!root) throw new Error('Review root not found');
  const selectors = config.pageOwnedSelectors ?? [];
  const ignored = config.cardExceptions ?? [];
  if (ignored.some(x => !x.selector || !x.reason || !x.basis)) throw new Error('Every card exception requires selector, reason and a normative basis; business composition alone is not an exception.');
  const styleRules = [], tokenNames = new Set(), inaccessible = [], packageClasses = new Set();
  function collect(rules, source) {
    for (const r of rules) {
      if (r.conditionText && r.constructor.name === 'CSSMediaRule' && !matchMedia(r.conditionText).matches) continue;
      if (r.style) {
        for (const key of r.style) if (key.startsWith('--wb-') || key.startsWith('--ai-') || key.startsWith('--partner-')) tokenNames.add(key);
        if (r.selectorText) styleRules.push({ selector: r.selectorText, style: r.style, source });
        if (r.selectorText && /(?:@workbench|workbench[+_]ui-vue3|huawei-partner-ai-ui)/.test(source))
          for (const selector of r.selectorText.split(',')) {
            // Only the leading component class, never shared modifiers such as .is-wide.
            const classes = [...selector.matchAll(/\.([a-zA-Z_][\w-]*)/g)].map(m => m[1]);
            const candidate = classes.find(c => c !== 'partner-ai');
            if (candidate && !/^(is-|has-)/.test(candidate)) packageClasses.add(candidate);
          }
      }
      if (r.cssRules) collect(r.cssRules, source);
    }
  }
  for (const sheet of document.styleSheets) {
    const source = sheet.href || sheet.ownerNode?.getAttribute('data-vite-dev-id') || 'inline';
    try { collect(sheet.cssRules, source); } catch { inaccessible.push(source); }
  }
  const tokenList = [...tokenNames];
  const probe = document.createElement('span');
  probe.style.cssText = 'position:fixed;visibility:hidden;pointer-events:none;';
  document.body.append(probe);
  const normalColour = value => { probe.style.color = ''; probe.style.color = value; return probe.style.color ? getComputedStyle(probe).color : null; };
  const normalLength = value => { probe.style.width = ''; probe.style.width = value; return probe.style.width ? getComputedStyle(probe).width : null; };
  const path = el => {
    if (el.id) return '#' + CSS.escape(el.id);
    const parts = [];
    for (let e = el; e && e.nodeType === 1 && parts.length < 7; e = e.parentElement) {
      if (e.id) { parts.unshift('#' + CSS.escape(e.id)); break; }
      const classes = [...e.classList].slice(0, 3).map(x => '.' + CSS.escape(x)).join('');
      const siblings = e.parentElement ? [...e.parentElement.children].filter(s => s.tagName === e.tagName) : [e];
      parts.unshift(e.tagName.toLowerCase() + classes + (siblings.length > 1 ? `:nth-of-type(${siblings.indexOf(e) + 1})` : ''));
    }
    return parts.join(' > ');
  };
  const packageNode = el => (config.packageRootSelectors ?? []).some(s => el.matches(s)) || [...el.classList].some(c => c !== 'partner-ai' && (packageClasses.has(c) || /^(wb-|partner-|tr-|workspace-smart-)/.test(c)));
  const ownership = el => {
    for (let e = el; e && e !== root.parentElement; e = e.parentElement) {
      // Nearest boundary wins: a page slot does not own nested library components.
      if (packageNode(e)) return 'package';
      if (selectors.some(s => e.matches(s))) return 'page-slot';
      if (e.classList.contains('partner-ai')) return 'unclassified-ai';
    }
    return 'page';
  };
  const owned = el => ownership(el).startsWith('page');
  const ownershipCounts = { page: 0, 'page-slot': 0, package: 0, 'unclassified-ai': 0 };
  const props = ['paddingTop','paddingBottom','paddingLeft','paddingRight','marginTop','marginBottom','marginLeft','marginRight','rowGap','columnGap'];
  const fontKeys = ['fontSize','fontWeight','lineHeight','letterSpacing'];
  const cssName = p => p.replace(/[A-Z]/g, c => '-' + c.toLowerCase());
  const bundles = [...new Set(tokenList.filter(n => /^--wb-font-.+-font-size$/.test(n)).map(n => n.slice(0, -10)))];
  const fontCache = new Map();
  const records = [], matchesFor = el => styleRules.filter(r => { try { return el.matches(r.selector); } catch { return false; } });
  for (const el of [root, ...root.querySelectorAll('*')]) {
    if (el === probe || ['SCRIPT','STYLE','SVG','PATH'].includes(el.tagName)) continue;
    const rect = el.getBoundingClientRect(), cs = getComputedStyle(el);
    if (rect.width <= 0 || rect.height <= 0 || cs.visibility !== 'visible' || cs.display === 'none' || el.closest('[hidden],[inert]')) continue;
    const owner = ownership(el); ownershipCounts[owner]++;
    if (!owner.startsWith('page')) continue;
    const rules = matchesFor(el);
    const values = name => cs.getPropertyValue(name).trim();
    const spacingTokens = tokenList.filter(n => n.startsWith('--wb-spacing-')).map(n => normalLength(values(n))).filter(Boolean);
    const colourTokens = tokenList.filter(n => n.startsWith('--wb-color-') || /^(--ai-|--partner-).*(color|bg|background)/.test(n)).map(n => normalColour(values(n))).filter(Boolean);
    const rawBundles = bundles.map(prefix => Object.fromEntries(fontKeys.map(p => [p, values(prefix + '-' + cssName(p)) || (p === 'letterSpacing' ? '0px' : '')]))).filter(b => b.fontSize && b.fontWeight && b.lineHeight);
    const fontSignature = JSON.stringify(rawBundles);
    if (!fontCache.has(fontSignature)) fontCache.set(fontSignature, rawBundles.map(bundle => {
      for (const key of fontKeys) probe.style[key] = bundle[key];
      const computed = getComputedStyle(probe);
      return Object.fromEntries(fontKeys.map(key => [key, key === 'letterSpacing' && computed[key] === 'normal' ? '0px' : computed[key]]));
    }));
    const fontBundles = fontCache.get(fontSignature);
    const text = [...el.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent.trim()).filter(Boolean).join(' ');
    const colourProps = ['backgroundColor', ...(text ? ['color'] : []), ...['Top','Right','Bottom','Left'].filter(s => parseFloat(cs['border' + s + 'Width']) > 0 && cs['border' + s + 'Style'] !== 'none').map(s => 'border' + s + 'Color')];
    const desc = (el.getAttribute('aria-describedby') || '').split(/\s+/).map(id => document.getElementById(id)?.textContent || '').join(' ');
    const title = el.closest('[title]')?.getAttribute('title') || '';
    const clip = cs.textOverflow === 'ellipsis' && el.scrollWidth > el.clientWidth + 1;
    const card = Boolean(config.cardSelector && el.matches(config.cardSelector));
    records.push({ selectorPath: path(el), owned: true, visible: true, box: { x: rect.x + scrollX, y: rect.y + scrollY, width: rect.width, height: rect.height },
      spacing: Object.fromEntries(props.map(p => [p, cs[p]])), spacingTokens,
      // Typed OM preserves auto after logical-property resolution and the real CSS cascade.
      autoSpacing: props.filter(p => String(el.computedStyleMap?.().get(cssName(p)) ?? cs[p]) === 'auto'),
      card, cardException: ignored.find(x => el.matches(x.selector)) ?? null,
      cardPadding: { block: normalLength(values('--wb-spacing-layout-container-block')), inline: normalLength(values('--wb-spacing-layout-container-inline')) },
      hasText: Boolean(text), text, font: Object.fromEntries(fontKeys.map(p => [p, p === 'letterSpacing' && cs[p] === 'normal' ? '0px' : cs[p]])), fontBundles,
      colours: Object.fromEntries(colourProps.map(p => [p, cs[p]])), colourTokens,
      backgroundImage: cs.backgroundImage,
      imageTokenCandidate: /var\(--(?:wb-|ai-|partner-)/.test(el.style.backgroundImage || el.style.background || '') || rules.some(r => /var\(--(?:wb-|ai-|partner-)/.test(r.style.backgroundImage || r.style.background || '')),
      tokenExpressions: colourProps.filter(p => rules.some(r => {
        const value = r.style.getPropertyValue(cssName(p)) || (p === 'backgroundColor' ? r.style.background : p.startsWith('border') ? r.style.border : '');
        return /var\(--(?:wb-|ai-|partner-)/.test(value) && /color-mix\(/.test(value);
      })),
      clipped: clip, fullTextAvailable: Boolean(text && (title.includes(text) || desc.includes(text))), scrollWidth: el.scrollWidth, clientWidth: el.clientWidth
    });
  }
  const layoutSamples = [];
  const box = r => ({ x: r.x + scrollX, y: r.y + scrollY, width: r.width, height: r.height });
  for (const contract of config.layoutContracts ?? []) {
    if (!contract.id || !contract.selector || !contract.role || !contract.basis || (!Object.keys(contract.properties ?? {}).length && !contract.relations?.length))
      throw new Error('Layout contracts require id, selector, role, normative basis and properties or relations.');
    const entries = [...Object.entries(contract.properties ?? {}).map(([property, token]) => ({ property, token })), ...(contract.relations ?? [])];
    for (const entry of entries) if (!/^--wb-(?:spacing-|layout-)/.test(entry.token ?? '') || (entry.property ? !props.includes(entry.property) : !entry.from || !entry.to || !['x','y'].includes(entry.axis)))
      throw new Error(`Invalid layout contract ${contract.id}: use semantic token names and supported geometry/properties.`);
    const targets = [...root.querySelectorAll(contract.selector)];
    if (root.matches(contract.selector)) targets.unshift(root);
    if (!targets.length) layoutSamples.push({ id: contract.id, role: contract.role, basis: contract.basis, selectorPath: contract.selector, notVerified: 'Contract target not rendered' });
    for (const el of targets) {
      const rect = el.getBoundingClientRect(), cs = getComputedStyle(el);
      const sample = { id: contract.id, role: contract.role, basis: contract.basis, selectorPath: path(el), screenshotBox: box(rect), checks: [] };
      if (!owned(el) || rect.width <= 0 || rect.height <= 0 || cs.visibility !== 'visible' || cs.display === 'none') {
        layoutSamples.push({ ...sample, notVerified: !owned(el) ? 'Component-owned target requires its public contract/independent baseline' : 'Contract target not visible' }); continue;
      }
      for (const entry of entries) {
        const expected = normalLength(cs.getPropertyValue(entry.token).trim());
        const check = { token: entry.token, expected, property: entry.property, axis: entry.axis };
        if (!expected) check.notVerified = 'Semantic token unavailable';
        else if (entry.property) check.actual = cs[entry.property];
        else {
          const from = el.querySelectorAll(entry.from), to = el.querySelectorAll(entry.to);
          if (from.length !== 1 || to.length !== 1) check.notVerified = 'Relation requires exactly one rendered source and target';
          else {
            const a = from[0].getBoundingClientRect(), b = to[0].getBoundingClientRect();
            if (![from[0],to[0]].every(e => { const s=getComputedStyle(e), r=e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && s.visibility === 'visible' && s.display !== 'none'; })) check.notVerified = 'Relation endpoint not visible';
            else { check.actual = (entry.axis === 'y' ? b.top - a.bottom : b.left - a.right) + 'px'; check.from = path(from[0]); check.to = path(to[0]); }
          }
        }
        sample.checks.push(check);
      }
      layoutSamples.push(sample);
    }
  }
  // Discover external relations even when both endpoints are package components.
  // These are review candidates until a project contract confirms the intended composition.
  const roleOf = el => el.matches('.wb-tabs') ? 'tabs' : el.matches('.wb-data-toolbar') ? 'toolbar' : el.matches('.wb-table') ? 'table' : null;
  const visible = el => { const s=getComputedStyle(el), r=el.getBoundingClientRect(); return r.width > 0 && r.height > 0 && s.visibility === 'visible' && s.display !== 'none'; };
  const endpoint = el => {
    if (roleOf(el)) return el;
    if (!owned(el)) return null;
    const children=[...el.children].filter(visible);
    return children.length === 1 && roleOf(children[0]) ? children[0] : null;
  };
  for (const parent of [root, ...root.querySelectorAll('*')]) {
    if (!owned(parent)) continue;
    const children=[...parent.children].filter(visible);
    for (let i=1;i<children.length;i++) {
      const from=endpoint(children[i-1]), to=endpoint(children[i]);
      if (!from || !to || !['tabs:toolbar','tabs:table','toolbar:table'].includes(`${roleOf(from)}:${roleOf(to)}`)) continue;
      const a=from.getBoundingClientRect(), b=to.getBoundingClientRect();
      // Horizontal controls and overlapping panels do not establish a vertical content relation.
      if (b.top < a.bottom - 0.05 || Math.min(a.right,b.right) <= Math.max(a.left,b.left)) continue;
      const fromPath=path(from), toPath=path(to);
      if (layoutSamples.some(s => !s.inferred && s.checks?.some(c => c.from === fromPath && c.to === toPath))) continue;
      const token='--wb-spacing-layout-content-gap';
      const expected=normalLength(getComputedStyle(parent).getPropertyValue(token).trim());
      layoutSamples.push({ id:`discovered-${roleOf(from)}-${roleOf(to)}`, inferred:true, role:'adjacent-content-regions',
        basis:'Foundation content-gap candidate; confirm the page composition or provide an explicit normative contract',
        selectorPath:path(parent), screenshotBox:box(parent.getBoundingClientRect()),
        checks:[{token,expected,actual:(b.top-a.bottom)+'px',from:fromPath,to:toPath,axis:'y',...(!expected ? {notVerified:'Semantic token unavailable'} : {})}] });
    }
  }
  const components = (config.components ?? []).map(item => {
    const el = document.querySelector(item.selector); if (!el) return { ...item, missing: true };
    const cs = getComputedStyle(el), rect = el.getBoundingClientRect();
    return { ...item, selectorPath: item.selector, containerWidth: el.parentElement.getBoundingClientRect().width,
      styles: Object.fromEntries(['paddingTop','paddingBottom','paddingLeft','paddingRight','color','backgroundColor'].map(k => [k, cs[k]])),
      box: { x: rect.x + scrollX, y: rect.y + scrollY, width: rect.width, height: rect.height },
      hostRules: matchesFor(el).filter(r => !/node_modules|@workbench|huawei-partner-ai-ui/.test(r.source)).map(r => ({ selector: r.selector, source: r.source, css: r.style.cssText })) };
  });
  const overlaps = [];
  for (const el of root.querySelectorAll('button,a[href],input,select,textarea,[role="button"]')) {
    if (!owned(el) || el.closest('[inert],[hidden]') || el.disabled) continue;
    const r = el.getBoundingClientRect(); if (r.width < 2 || r.height < 2 || r.top < 0 || r.bottom > innerHeight || r.left < 0 || r.right > innerWidth) continue;
    const hit = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);
    if (hit && hit !== el && !el.contains(hit) && !hit.contains(el) && hit.closest('button,a[href],input,select,textarea,[role="button"]') && !hit.closest('[role="dialog"],[aria-modal="true"]'))
      overlaps.push({ target: path(el), blocker: path(hit), box: { x: r.x + scrollX, y: r.y + scrollY, width: r.width, height: r.height } });
  }
  probe.remove();
  return { records, components, layoutSamples, ownershipCounts, typedSpacing: typeof root.computedStyleMap === 'function', overlaps, pageWidth: document.documentElement.scrollWidth, aiRoots: document.querySelectorAll('.partner-ai').length,
    tokenCount: tokenList.length, inaccessible, skippedPackageDescendants: 'Nearest boundary wins: package internals are not page layout; explicit page slots stay checked, nested package components remain library-owned.',
    cards: config.cardSelector ? 'explicit selectors' : 'not verified: supply --card-selector; card appearance alone does not establish its contract' };
}

function sourceIndex(project) {
  const result = new Map();
  function walk(dir) { if (!existsSync(dir)) return; for (const item of readdirSync(dir, { withFileTypes: true })) {
    const file = resolve(dir, item.name); if (item.isSymbolicLink()) continue;
    if (item.isDirectory()) walk(file);
    else if (/\.(vue|css|[jt]sx?)$/.test(file)) readFileSync(file, 'utf8').split('\n').forEach((line, index) => {
      for (const m of line.matchAll(/(?:class=["']([^"']+)["']|\.([a-zA-Z_][\w-]*))/g)) for (const cls of (m[1] || m[2]).split(/\s+/)) {
        if (!result.has(cls)) result.set(cls, []);
        result.get(cls).push({ file: relative(project, file), line: index + 1 });
      }
    });
  } } walk(resolve(project, 'src')); return result;
}
export async function measure(opt) {
  const index = sourceIndex(opt.project);
  const baseline = opt.baseline ? JSON.parse(readFileSync(opt.baseline, 'utf8')) : [];
  const results = await visitRoutes(opt, async (page, ctx) => {
    const textSamples = await page.evaluate(collectText, (opt.config.textContracts ?? []).filter(c => (!c.routes || c.routes.includes(ctx.route)) && (!c.states || c.states.includes(ctx.state))));
    const sampled = await page.evaluate(collectPage, { ...opt.config, components: (opt.config.components ?? []).filter(c => !c.routes || c.routes.includes(ctx.route)), layoutContracts: (opt.config.layoutContracts ?? []).filter(c => !c.routes || c.routes.includes(ctx.route)), rootSelector: opt.rootSelector, cardSelector: opt.cardSelector });
    const findings = [...sampled.records.flatMap(checkRecord), ...sampled.layoutSamples.flatMap(checkLayout), ...textSamples.flatMap(checkText), ...checkPage({ ...ctx, pageWidth: sampled.pageWidth, overlaps: sampled.overlaps })];
    const notVerified = [];
    if (!sampled.tokenCount) notVerified.push('R1–R4: loaded semantic tokens unavailable');
    if (!opt.cardSelector) notVerified.push('R2: explicit card selectors required');
    if (!sampled.layoutSamples.some(s => !s.inferred)) notVerified.push('R9: explicit semantic composition contracts not supplied for this route; discovered relations are candidates only');
    for (const sample of sampled.layoutSamples) {
      if (sample.notVerified) notVerified.push(`R9 ${sample.id}: ${sample.notVerified}`);
      for (const check of sample.checks ?? []) if (check.notVerified) notVerified.push(`R9 ${sample.id}: ${check.notVerified}`);
    }
    if (!sampled.typedSpacing) notVerified.push('Logical/auto spacing: Typed OM unavailable');
    if (sampled.ownershipCounts['unclassified-ai']) notVerified.push('AI namespace contains elements without confirmed page-slot or component ownership');
    if (sampled.inaccessible.length) notVerified.push('Cross-origin stylesheets could not be inspected: ' + sampled.inaccessible.join(', '));
    if (!sampled.components.length) notVerified.push('R8: standalone component fixture/baseline not supplied');
    for (const sample of textSamples) if (sample.notVerified) notVerified.push(`Text ${sample.id}: ${sample.notVerified}`);
    const componentSamples = sampled.components.map(c => ({ ...c, ...ctx, state: c.state, captureState: ctx.state, errors: ctx.errors }));
    for (const actual of componentSamples) {
      const compared = compareComponent(actual, baseline.find(b => b.id === actual.id && b.width === ctx.width && (b.captureState ?? 'default') === ctx.state));
      if (compared.notVerified) notVerified.push(compared.notVerified); else findings.push(...compared.findings);
    }
    for (const f of findings) {
      Object.assign(f, { route: ctx.route, width: ctx.width, state: ctx.state });
      const classes = [...f.selectorPath.matchAll(/\.([a-zA-Z_][\w-]*)/g)].map(m => m[1]).reverse();
      const candidates = classes.map(c => index.get(c)).find(Boolean) ?? [];
      f.sourceCandidates = candidates.slice(0, 12);
      // A class search is a candidate mapping, not proof of the winning source line.
      if (candidates.length === 1) Object.assign(f, candidates[0]);
    }
    return { findings, notVerified, componentSamples, layoutSamples: sampled.layoutSamples, textSamples, coverage: { rules: RULES, sampledElements: sampled.records.length, ownership: sampled.ownershipCounts, aiRoots: sampled.aiRoots, tokenCount: sampled.tokenCount, slotBoundary: sampled.skippedPackageDescendants, tooltip: 'title and mounted aria-describedby only; lazy hover tooltips need interaction verification', cardExceptions: opt.config.cardExceptions ?? [] } };
  });
  saveJSON(resolve(opt.out, 'measure.json'), results);
  saveJSON(resolve(opt.out, 'findings.json'), results.flatMap(r => r.findings ?? []));
  saveJSON(resolve(opt.out, 'component-samples.json'), results.flatMap(r => r.componentSamples ?? []));
  return results;
}
if (isMain(import.meta.url)) {
  const results = await measure(options(process.argv.slice(2)));
  console.log(JSON.stringify(results.map(r => ({ route: r.route, width: r.width, state: r.state, findings: r.findings?.length, errors: r.errors.length, notVerified: r.notVerified }))));
  process.exitCode = results.some(r => r.errors.length || r.findings?.some(f => f.severity === 'must-fix')) ? 1 : 0;
}
