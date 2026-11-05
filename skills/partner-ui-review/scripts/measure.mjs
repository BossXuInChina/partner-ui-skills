#!/usr/bin/env node
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, relative } from 'node:path';
import { options, visitRoutes, saveJSON, isMain } from './browser.mjs';
import { checkRecord, checkPage, compareComponent, RULES } from './rules.mjs';

// This function is serialized into the real browser, not a simulated DOM.
export function collectPage(config = {}) {
  const root = document.querySelector(config.rootSelector || 'body');
  if (!root) throw new Error('Review root not found');
  const selectors = config.pageOwnedSelectors ?? [];
  const ignored = config.cardExceptions ?? [];
  if (ignored.some(x => !x.selector || !x.reason)) throw new Error('Every card exception requires selector and reason');
  const styleRules = [], tokenNames = new Set(), inaccessible = [];
  function collect(rules, source) {
    for (const r of rules) {
      if (r.conditionText && r.constructor.name === 'CSSMediaRule' && !matchMedia(r.conditionText).matches) continue;
      if (r.style) {
        for (const key of r.style) if (key.startsWith('--wb-') || key.startsWith('--ai-') || key.startsWith('--partner-')) tokenNames.add(key);
        if (r.selectorText) styleRules.push({ selector: r.selectorText, style: r.style, source });
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
  const packageNode = el => [...el.classList].some(c => /^(wb-|partner-|tr-)/.test(c));
  const owned = el => {
    for (let e = el; e && e !== root.parentElement; e = e.parentElement) {
      if (packageNode(e)) return false;
      if (selectors.some(s => e.matches(s))) return true;
    }
    return true;
  };
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
    if (!owned(el)) continue;
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
      autoSpacing: props.filter(p => rules.some(r => r.style.getPropertyValue(cssName(p)) === 'auto' || p.startsWith('margin') && /\bauto\b/.test(r.style.margin))),
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
  return { records, components, overlaps, pageWidth: document.documentElement.scrollWidth, aiRoots: document.querySelectorAll('.partner-ai').length,
    tokenCount: tokenList.length, inaccessible, skippedPackageDescendants: 'Package descendants excluded; page slot content requires pageOwnedSelectors.',
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
    const sampled = await page.evaluate(collectPage, { ...opt.config, components: (opt.config.components ?? []).filter(c => !c.routes || c.routes.includes(ctx.route)), rootSelector: opt.rootSelector, cardSelector: opt.cardSelector });
    const findings = [...sampled.records.flatMap(checkRecord), ...checkPage({ ...ctx, pageWidth: sampled.pageWidth, overlaps: sampled.overlaps })];
    const notVerified = [];
    if (!sampled.tokenCount) notVerified.push('R1–R4: loaded semantic tokens unavailable');
    if (!opt.cardSelector) notVerified.push('R2: explicit card selectors required');
    if (sampled.inaccessible.length) notVerified.push('Cross-origin stylesheets could not be inspected: ' + sampled.inaccessible.join(', '));
    if (!sampled.components.length) notVerified.push('R8: standalone component fixture/baseline not supplied');
    const componentSamples = sampled.components.map(c => ({ ...c, ...ctx, errors: ctx.errors }));
    for (const actual of componentSamples) {
      const compared = compareComponent(actual, baseline.find(b => b.id === actual.id && b.width === ctx.width));
      if (compared.notVerified) notVerified.push(compared.notVerified); else findings.push(...compared.findings);
    }
    for (const f of findings) {
      Object.assign(f, { route: ctx.route, width: ctx.width });
      const classes = [...f.selectorPath.matchAll(/\.([a-zA-Z_][\w-]*)/g)].map(m => m[1]).reverse();
      const candidates = classes.map(c => index.get(c)).find(Boolean) ?? [];
      f.sourceCandidates = candidates.slice(0, 12);
      // A class search is a candidate mapping, not proof of the winning source line.
      if (candidates.length === 1) Object.assign(f, candidates[0]);
    }
    return { findings, notVerified, componentSamples, coverage: { rules: RULES, sampledElements: sampled.records.length, aiRoots: sampled.aiRoots, tokenCount: sampled.tokenCount, slotBoundary: sampled.skippedPackageDescendants, tooltip: 'title and mounted aria-describedby only; lazy hover tooltips need interaction verification', cardExceptions: opt.config.cardExceptions ?? [] } };
  });
  saveJSON(resolve(opt.out, 'measure.json'), results);
  saveJSON(resolve(opt.out, 'findings.json'), results.flatMap(r => r.findings ?? []));
  saveJSON(resolve(opt.out, 'component-samples.json'), results.flatMap(r => r.componentSamples ?? []));
  return results;
}
if (isMain(import.meta.url)) {
  const results = await measure(options(process.argv.slice(2)));
  console.log(JSON.stringify(results.map(r => ({ route: r.route, width: r.width, findings: r.findings?.length, errors: r.errors.length, notVerified: r.notVerified }))));
  process.exitCode = results.some(r => r.errors.length || r.findings?.some(f => f.severity === 'must-fix')) ? 1 : 0;
}
