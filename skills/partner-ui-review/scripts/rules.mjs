export const RULES = ['R1_SPACING_TOKEN', 'R2_CARD_PADDING', 'R3_FONT_BUNDLE', 'R4_COLOUR_TOKEN', 'R5_GRID', 'R6_OVERFLOW', 'R7_CONSOLE', 'R8_COMPONENT_OVERRIDE'];
const near = (a, b) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= 0.05;
const px = s => /^-?[\d.]+px$/.test(s) ? Number.parseFloat(s) : s === '0' ? 0 : NaN;

export function checkRecord(record) {
  const findings = [];
  const add = (rule, expected, actual, severity = 'should-fix') => findings.push({ rule, severity, selectorPath: record.selectorPath, expected, actual, screenshotBox: record.box });
  if (!record.owned || !record.visible) return findings;
  for (const [property, value] of Object.entries(record.spacing)) {
    if (record.autoSpacing.includes(property)) continue;
    const n = px(value);
    if (!Number.isFinite(n) || near(n, 0)) continue;
    if (!record.spacingTokens.some(v => near(px(v), n))) {
      add('R1_SPACING_TOKEN', '0 or a resolved spacing token in this element scope', { property, value });
      if (!near(n, Math.round(n / 4) * 4)) add('R5_GRID', 'spacing on a 4px grid; review intentional geometry separately', { property, value }, 'warning');
    }
  }
  if (record.card && !record.cardException) {
    const expected = record.cardPadding;
    if (expected.block && expected.inline && ['Top', 'Bottom', 'Left', 'Right'].some(side => !near(px(record.spacing['padding' + side]), px(expected[['Top', 'Bottom'].includes(side) ? 'block' : 'inline']))))
      add('R2_CARD_PADDING', expected, Object.fromEntries(Object.entries(record.spacing).filter(([k]) => k.startsWith('padding'))));
  }
  if (record.hasText && record.fontBundles.length && !record.fontBundles.some(b => ['fontSize', 'fontWeight', 'lineHeight', 'letterSpacing'].every(k => b[k] === record.font[k])))
    add('R3_FONT_BUNDLE', 'one complete Foundation font bundle', record.font);
  for (const [property, value] of Object.entries(record.colours)) {
    if (value === 'rgba(0, 0, 0, 0)' || value === 'transparent') continue;
    if (!record.colourTokens.includes(value) && !record.tokenExpressions.includes(property))
      add('R4_COLOUR_TOKEN', 'resolved semantic colour (including alpha) or a token-based expression', { property, value });
  }
  if (record.clipped && !record.fullTextAvailable)
    add('R6_OVERFLOW', 'visible full text or a verified title/description/tooltip', { text: record.text, scrollWidth: record.scrollWidth, clientWidth: record.clientWidth }, 'needs-review');
  if (record.backgroundImage && record.backgroundImage !== 'none' && !record.imageTokenCandidate)
    add('R4_COLOUR_TOKEN', 'background image/gradient with a semantic token expression, or an explicitly reviewed asset exception', { property: 'backgroundImage', value: record.backgroundImage }, 'needs-review');
  return findings;
}

export function checkPage({ route, width, pageWidth, errors = [], overlaps = [] }) {
  const base = { route, width, selectorPath: 'html', screenshotBox: null };
  return [
    ...(pageWidth > width + 1 ? [{ ...base, rule: 'R6_OVERFLOW', severity: 'must-fix', expected: `page width <= ${width + 1}`, actual: pageWidth }] : []),
    ...errors.map(error => ({ ...base, rule: 'R7_CONSOLE', severity: 'must-fix', expected: 'no console errors, page errors or Vue warnings', actual: error })),
    ...overlaps.map(item => ({ ...base, rule: 'R6_OVERFLOW', severity: 'needs-review', selectorPath: item.target, screenshotBox: item.box, expected: 'interactive target reachable', actual: item }))
  ];
}

export function compareComponent(actual, baseline) {
  const keys = ['component', 'packageVersion', 'props', 'state', 'theme', 'containerWidth'];
  if (!baseline || actual.errors?.length || baseline.errors?.length || keys.some(key => actual[key] === undefined || baseline[key] === undefined || JSON.stringify(actual[key]) !== JSON.stringify(baseline[key])))
    return { notVerified: 'R8 needs an independent rendered baseline with matching package, component, props, state, theme and container width.' };
  const diffs = Object.entries(baseline.styles).filter(([key, value]) => actual.styles[key] !== value);
  return { findings: diffs.map(([property, expected]) => ({
    route: actual.route, width: actual.width, rule: 'R8_COMPONENT_OVERRIDE',
    severity: 'needs-review', selectorPath: actual.selectorPath, expected,
    actual: { property, value: actual.styles[property], matchedHostRules: actual.hostRules ?? [] }, screenshotBox: actual.box,
    reason: 'Controlled rendering differs. Confirm the winning host rule before promoting to must-fix; computed difference alone is not proof.'
  })) };
}
