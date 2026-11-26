import { test, describe, before, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';

/**
 * Branch coverage for the card: fallbacks in text, templates, filters, colors, icons,
 * header cells and rendering. Same setup as indicator-grid-card.test.ts: the built
 * bundle in jsdom, methods driven on bare instances or on a mounted element.
 *
 * IMPORTANT: never pass a DOM node to assert (see editor.test.ts).
 */

let IndicatorGridCard: any;
let dom: any;

before(async () => {
  dom = new JSDOM('<!DOCTYPE html><body></body>', { pretendToBeVisual: true });
  for (const key of ['window', 'document', 'HTMLElement', 'customElements', 'Document', 'CSSStyleSheet', 'Node', 'Event', 'CustomEvent']) {
    (globalThis as any)[key] = (dom.window as any)[key];
  }
  (globalThis as any).CSS = { supports: () => true };
  ({ IndicatorGridCard } = await import('../dist/indicator-grid-card.js'));
});

afterEach(() => {
  dom.window.document.body.innerHTML = '';
  delete (globalThis as any).getComputedStyle;
});

function makeCard(config: any = {}, hass: any = { states: {} }): any {
  const card = Object.create(IndicatorGridCard.prototype);
  Object.defineProperty(card, 'config', { value: config, writable: true, configurable: true });
  Object.defineProperty(card, 'hass', { value: hass, writable: true, configurable: true });
  card.dispatchEvent = () => true;
  return card;
}
const st = (entity_id: string, state: string, attributes: any = {}, extra: any = {}) =>
  ({ entity_id, state, attributes, last_changed: '', last_updated: '', ...extra });

async function mount(config: any, hass: any = { states: {} }): Promise<any> {
  const el: any = dom.window.document.createElement('indicator-grid-card');
  el.setConfig(config);
  el.hass = hass;
  dom.window.document.body.appendChild(el);
  await el.updateComplete;
  return el;
}
const styleOf = (el: any, i = 0) => el.shadowRoot.querySelectorAll('.cell')[i].getAttribute('style');

describe('card picker and sizing', () => {
  test('getConfigElement returns the editor; getStubConfig with and without hass', async () => {
    const editor = await IndicatorGridCard.getConfigElement();
    assert.equal(editor.tagName.toLowerCase(), 'indicator-grid-card-editor');
    const hass = { states: { 'light.a': {}, 'sensor.t': {}, 'switch.b': {} } };
    assert.deepEqual(IndicatorGridCard.getStubConfig(hass).entities, [{ entity: 'light.a' }, { entity: 'switch.b' }]);
    assert.deepEqual(IndicatorGridCard.getStubConfig().entities, []);
  });

  test('sizes with rows unset or no config', () => {
    assert.equal(makeCard({ cell_height: '100px', cell_gap: '5px' }).getCardSize(), Math.ceil(205 / 50));
    assert.equal(makeCard(undefined).getGridOptions().rows, Math.ceil((205 + 8) / 64));
  });

  test('_toNumber rejects non-strings and blanks', () => {
    const card = makeCard();
    assert.deepEqual([card._toNumber(5), card._toNumber('  '), card._toNumber('1e3')].map(String), ['NaN', 'NaN', '1000']);
  });
});

describe('text and templates', () => {
  test('unavailable cell name falls back to the entity id, then Unknown; empty unavailable_text uses INOP', () => {
    const card = makeCard({ unavailable_text: '' });
    assert.equal(card._computeCell({ entity: 'sensor.x' }, undefined).displayText, 'sensor.x\nINOP');
    assert.equal(card._computeCell({}, st('a.b', 'unknown')).displayText, 'Unknown\nINOP');
  });

  test('static text wins; shouldUpdate without config or hass changes renders', () => {
    const card = makeCard({});
    assert.equal(card._getDisplayText({ text: 'Hi', text_template: '{{ state }}' }, st('a.b', '1')), 'Hi');
    assert.equal(card.shouldUpdate(new Map([['other', 1]])), true);
  });

  test('default text: decimals value, then friendly name, then entity id, then empty', () => {
    const card = makeCard({ decimals: 1 });
    assert.equal(card._getDisplayText({ entity: 's.a' }, st('s.a', '3.14')), '3.1');
    assert.equal(card._getDisplayText({ entity: 's.a' }, st('s.a', 'on')), 's.a');
    assert.equal(card._getDisplayText({}, st('s.a', 'on')), '');
  });

  test('template variables and their fallbacks', () => {
    const now = Date.now();
    const hass = { states: { 'sensor.dir': st('sensor.dir', 'NW') } };
    const card = makeCard({}, hass);
    const s = st('', '5', { friendly_name: undefined, nul: null, v: 7 }, {
      last_changed: new Date(now - 120000).toISOString(), last_updated: new Date(now - 7200000).toISOString(),
    });
    const render = (t: string) => card._renderTemplate(t, s, { entity: 'sensor.x' });
    assert.equal(render('{{ name }}|{{ entity_id }}|{{ unit }}|{{ state_with_unit }}'), 'sensor.x|sensor.x||5');
    assert.equal(render('{{ last_changed }}|{{ last_updated }}'), '2 minutes ago|2 hours ago');
    assert.equal(render("{{ attributes.v }}|{{ attributes.nul }}|{{ attributes.none }}|{{ states('sensor.dir') }}|{{ states('sensor.gone') }}|{{ bogus }}"), '7|||NW||bogus');
    assert.equal(card._renderTemplate('{{ name }}', st('', '1'), {}), '');
  });

  test('filters: optional arguments and non-numeric input', () => {
    const f = (v: string, filter: string) => makeCard()._applyTemplateFilter(v, filter);
    assert.deepEqual(
      [f('2.6', 'round'), f('abc', 'round(1)'), f('2.66', "round('x')"), f('abc', 'int'), f('abc', 'int(-1)'), f('abc', 'float'), f('abc', 'float(9)'),
        f('a_b', "replace('_')"), f('x'.repeat(300), 'truncate').length, f('abcdef', "truncate('x')"), f('', 'default'), f('', "default('N/A')"), f('v', 'nope')],
      ['3', 'abc', '3', '0', '-1', '0', '9', 'a_b', 258, 'abcdef', '', 'N/A', 'v'],
    );
  });
});

describe('colors and icons', () => {
  test('_resolveRgb: var() and unresolvable named colors give undefined; named colors resolve when computed', () => {
    const card = makeCard();
    assert.equal(card._resolveRgb('var(--x)'), undefined);
    (globalThis as any).getComputedStyle = () => ({ color: 'rgb(255, 0, 0)' });
    assert.deepEqual(card._resolveRgb('red'), [255, 0, 0]);
    (globalThis as any).getComputedStyle = () => ({ color: '' });
    assert.equal(card._resolveRgb('notacolor'), undefined);
  });

  test('dimmed text keeps the color: rgba, hex, named and unresolvable colors', () => {
    const card = makeCard();
    assert.equal(card._colorWithOpacity('rgba(1, 2, 3, 0.9)', 0.5), 'rgba(1, 2, 3, 0.5)');
    assert.equal(card._colorWithOpacity('#0a0b0c', 0.5), 'rgba(10, 11, 12, 0.5)');
    (globalThis as any).getComputedStyle = () => ({ color: 'rgb(0, 128, 0)' });
    assert.equal(card._colorWithOpacity('green', 0.25), 'rgba(0, 128, 0, 0.25)');
    (globalThis as any).getComputedStyle = () => ({ color: '' });
    assert.equal(card._colorWithOpacity('var(--x)', 0.25), 'var(--x)');
  });

  test('_getIcon without attributes gives no icon', () => {
    assert.equal(makeCard({ show_icons: true })._getIcon('on', { entity: 'x.y' }, { entity_id: 'x.y' }), undefined);
  });
});

describe('header cells', () => {
  test('_getHeaderRow with no header rows; font weight falls back to the card, then bold', () => {
    const card = makeCard({ font_size: '16px' }, { states: {} });
    assert.equal(card._getHeaderRow(0), undefined);
    const html = (cfg: any, cell: any) => { const c = makeCard(cfg, { states: {} }); return c._renderHeaderCell(cell).values.join(' '); };
    assert.match(html({ font_weight: 600 }, { text: 'H' }), /font-weight: 600/);
    assert.match(html({}, { text: 'H', font_weight: 300 }), /font-weight: 300/);
    assert.match(html({}, { text: 'H' }), /font-weight: bold/);
  });
});

describe('rendered cells', () => {
  test('fixed cell width, dimmed off text, font weight fallback, unknown alignment, click', async () => {
    const calls: any[] = [];
    const hass = { states: { 'light.a': st('light.a', 'off', { friendly_name: 'A' }) }, callService: (...a: any[]) => calls.push(a) };
    const el = await mount({ columns: 1, rows: 1, cell_width: 80, dim_off_text: 50, global_colors: { text: '#ffffff' },
      entities: [{ entity: 'light.a', text_align: 'justify' }] }, hass);
    const grid = el.shadowRoot.querySelector('.grid-container').getAttribute('style');
    assert.match(grid, /repeat\(1, minmax\(0, 80px\)\)/);
    assert.match(styleOf(el), /color: rgba\(255, 255, 255, 0\.5\)/);
    assert.match(styleOf(el), /justify-content: center/);
    el.shadowRoot.querySelector('.cell').click();
    assert.deepEqual(calls[0], ['light', 'toggle', { entity_id: 'light.a' }]);
  });

  test('font weight falls back to bold when the card sets none', () => {
    const card = makeCard({ font_size: '16px' }, { states: {} });
    const out = card._renderCell({ displayText: 'x', backgroundColor: 'red', textColor: 'white', textOpacity: 1, clickable: false, clickAction: 'none' });
    assert.match(out.values.map((v: any) => (typeof v === 'symbol' ? '' : String(v))).join(' '), /font-weight: bold/);
  });

  test('shouldUpdate tracks entities referenced in text templates', async () => {
    const hass = { states: { 'sensor.a': st('sensor.a', '1'), 'sensor.ref': st('sensor.ref', 'x') } };
    const el = await mount({ columns: 1, rows: 1, entities: [{ entity: 'sensor.a', text_template: "{{ states('sensor.ref') }}" }] }, hass);
    const changed = { states: { ...hass.states, 'sensor.ref': st('sensor.ref', 'y') } };
    el.hass = changed;
    assert.equal(el.shouldUpdate(new Map([['hass', hass]])), true);
  });
});

describe('thresholds through the card bundle', () => {
  test('every operator, ordering within a group, trimmed operators, no match', () => {
    const card = makeCard();
    const color = (v: number, thresholds: any[]) => card._getThresholdStyles(v, { thresholds })?.backgroundColor ?? null;
    const bands = [
      { value: 60, color: 'ge60', operator: '>=' }, { value: 80, color: 'gt80', operator: ' > ' },
      { value: 20, color: 'le20' }, { value: 10, color: 'lt10', operator: '<' }, { value: 30, color: 'le30', operator: '<=' },
      { value: 45, color: 'eq45', operator: '==' },
    ];
    assert.deepEqual([95, 70, 5, 15, 25, 45, 50].map((v) => color(v, bands)), ['gt80', 'ge60', 'lt10', 'le20', 'le30', 'eq45', null]);
    assert.equal(color(5, [{ value: 10, color: 'x', operator: '!=' }]), null);
  });
});

// Guide D7 (2026-11-26, checked on the ha-test Variety page): the card must stay inside its slot
describe('layout stays inside the card (D7)', () => {
  test('fixed cell widths shrink when the columns do not fit the card', async () => {
    // ha-card is overflow: visible, so 4 x 100px cells in a 250px slot drew over the next card.
    // cell_width is now the most a column takes; the default 1fr columns are unchanged
    const el = await mount({ columns: 4, rows: 1, cell_width: 100, entities: [] });
    assert.match(el.shadowRoot.querySelector('.grid-container').getAttribute('style'), /repeat\(4, minmax\(0, 100px\)\)/);
    const auto = await mount({ columns: 3, rows: 1, entities: [] });
    assert.match(auto.shadowRoot.querySelector('.grid-container').getAttribute('style'), /repeat\(3, 1fr\)/);
  });
});
