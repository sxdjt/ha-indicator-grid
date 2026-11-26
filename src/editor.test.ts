import { test, describe, before, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';

/**
 * Behavioural tests for the visual editor (indicator-grid-card-editor).
 *
 * The editor is bundled into dist/indicator-grid-card.js and registered when the
 * bundle loads. Each test mounts a real editor in jsdom, sets hass and config, waits
 * for Lit to render, then finds controls by their label and fires the events Home
 * Assistant's elements would fire. HA's own elements (ha-selector, ha-form,
 * ha-button, ha-expansion-panel) are not defined, so they are plain elements here.
 *
 * IMPORTANT: never pass a DOM node to assert. A failing assertion inspects the node,
 * which can walk the whole jsdom window and grow memory without bound.
 */

let document: any;

before(async () => {
  const dom = new JSDOM('<!DOCTYPE html><body></body>', { pretendToBeVisual: true });
  for (const key of [
    'window', 'document', 'HTMLElement', 'customElements',
    'Document', 'CSSStyleSheet', 'Node', 'Event', 'CustomEvent',
  ]) {
    (globalThis as any)[key] = (dom.window as any)[key];
  }
  // The editor validates colors with CSS.supports; jsdom has no CSS global
  (globalThis as any).CSS = {
    supports: (_p: string, v: string) => /^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(v) || /^(rgb|rgba|hsl|hsla|var)\(.+\)$/.test(v)
      || ['red', 'green', 'gray', 'orange', 'blue', 'white', 'black'].includes(v),
  };
  document = dom.window.document;
  await import('../dist/indicator-grid-card.js');
});

afterEach(() => { document.body.innerHTML = ''; });

async function mountEditor(config: any, hass: any = { states: {} }): Promise<any> {
  const el: any = document.createElement('indicator-grid-card-editor');
  el.changes = [];
  // ha-button is not defined here, so it cannot take focus; record what the editor
  // asks to focus instead (the real element is focusable)
  el.focused = [];
  const focusControl = el._focusControl.bind(el);
  el._focusControl = (key: string) => { el.focused.push(key); focusControl(key); };
  el.addEventListener('config-changed', (e: any) => el.changes.push(e.detail.config));
  el.hass = hass;
  el.setConfig(config);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

const last = (el: any) => el.changes.at(-1);
const selectors = (el: any) => [...el.shadowRoot.querySelectorAll('ha-selector')];
const byLabel = (el: any, label: string, nth = 0) => selectors(el).filter((s: any) => s.label === label)[nth];
const fire = (target: any, value: any) =>
  target.dispatchEvent(new (globalThis as any).CustomEvent('value-changed', { detail: { value } }));

describe('editor basics', () => {
  test('card-level text field writes its key', async () => {
    const el = await mountEditor({ columns: 1, rows: 1, entities: [] });
    fire(byLabel(el, 'Unavailable Text'), 'OFFLINE');
    assert.equal(last(el).unavailable_text, 'OFFLINE');
  });
});

describe('per-entity colors', () => {
  test('Unavailable Color writes colors.unavailable', async () => {
    const el = await mountEditor({ columns: 1, rows: 1, entities: [{ entity: 'light.a' }] });
    fire(byLabel(el, 'Unavailable Color', 1), 'purple');
    assert.equal(last(el).entities[0].colors.unavailable, 'purple');
  });
});

describe('review sweep findings', () => {
  // E1 (B6/B8): per-entity show_icon is tri-state in the card (unset inherits)
  test('per-entity Show Icon can return to the global setting', async () => {
    const el = await mountEditor({ columns: 1, rows: 1, show_icons: true, entities: [{ entity: 'light.a', show_icon: false }] });
    const control = byLabel(el, 'Show Icon');
    assert.ok(control, 'expected a Show Icon select (Default / Show / Hide)');
    fire(control, 'default');
    assert.equal('show_icon' in last(el).entities[0], false);
  });

  // E10 (B6): entities beyond rows x columns are in the config but not in the editor
  test('every configured entity has a panel', async () => {
    const el = await mountEditor({ columns: 1, rows: 1, entities: [{ entity: 'light.a' }, { entity: 'light.b' }] });
    assert.equal(selectors(el).filter((s: any) => s.label === 'Entity (leave empty for blank cell)').length, 2);
    const headings = [...el.shadowRoot.querySelectorAll('.entity-header strong')].map((h: any) => h.textContent.trim());
    assert.deepEqual(headings.slice(-2), ['Cell 1 (Row 1, Col 1)', 'Cell 2 (not shown: past the last row)']);
  });

  test('headings count header rows and column spans', async () => {
    const el = await mountEditor({ columns: 2, rows: 3, header_rows: [{ row_index: 0, cells: [{ text: 'H' }] }],
      entities: [{ entity: 'a.a', colspan: 2 }, { entity: 'a.b' }, { entity: 'a.c' }] });
    const headings = [...el.shadowRoot.querySelectorAll('.entity-item > .entity-header strong')].map((h: any) => h.textContent.trim())
      .filter((t: string) => t.startsWith('Cell'));
    assert.deepEqual(headings.filter((t: string) => /\(Row|not shown/.test(t)), ['Cell 1 (Row 2, Col 1)', 'Cell 2 (Row 3, Col 1)', 'Cell 3 (Row 3, Col 2)']);
  });

  test('Show Icon: Show and Hide store true and false', async () => {
    const el = await mountEditor({ columns: 1, rows: 1, entities: [{ entity: 'light.a' }] });
    assert.equal(byLabel(el, 'Show Icon').value, 'default');
    fire(byLabel(el, 'Show Icon'), 'show');
    assert.equal(last(el).entities[0].show_icon, true);
    fire(byLabel(el, 'Show Icon'), 'hide');
    assert.equal(last(el).entities[0].show_icon, false);
  });
});

const control = (el: any, label: string) => el.shadowRoot.querySelector(`[aria-label="${label}"]`);
const setInput = (el: any, label: string, value: string) => {
  const input = control(el, label);
  input.value = value;
  input.dispatchEvent(new (globalThis as any).Event('change'));
};
const button = (el: any, text: string) =>
  [...el.shadowRoot.querySelectorAll('ha-button')].find((b: any) => b.textContent.replace(/\s+/g, ' ').trim() === text);
const rerender = async (el: any) => { el.setConfig(last(el)); await el.updateComplete; };

describe('thresholds editor', () => {
  test('global: add, edit every field, default operator not stored, remove', async () => {
    const el = await mountEditor({ columns: 1, rows: 1, entities: [] });
    button(el, 'Add Threshold').click();
    assert.deepEqual(last(el).global_colors.thresholds, [{ value: 0, color: '#cccccc' }]);
    await rerender(el);
    setInput(el, 'Global threshold 1 value', '30');
    await rerender(el);
    setInput(el, 'Global threshold 1 operator', '>');
    await rerender(el);
    setInput(el, 'Global threshold 1 color', 'red');
    await rerender(el);
    setInput(el, 'Global threshold 1 text color', 'white');
    await rerender(el);
    setInput(el, 'Global threshold 1 font weight', '700');
    assert.deepEqual(last(el).global_colors.thresholds, [{ value: 30, operator: '>', color: 'red', text_color: 'white', font_weight: '700' }]);
    await rerender(el);
    setInput(el, 'Global threshold 1 operator', '<=');
    await rerender(el);
    setInput(el, 'Global threshold 1 text color', '');
    assert.deepEqual(last(el).global_colors.thresholds, [{ value: 30, color: 'red', font_weight: '700' }]);
    await rerender(el);
    button(el, 'Remove global threshold 1').click();
    assert.equal('thresholds' in last(el).global_colors, false);
    assert.equal(el.focused.at(-1), 'add-threshold-global');
  });

  test('rows show their config; an invalid color is flagged in text', async () => {
    const el = await mountEditor({ columns: 1, rows: 1, entities: [], global_colors: { thresholds: [{ value: 5, color: 'nope', operator: ' >= ', font_weight: 600 }] } });
    assert.equal(control(el, 'Global threshold 1 value').value, '5');
    assert.equal(control(el, 'Global threshold 1 operator').value, '>=');
    assert.equal(control(el, 'Global threshold 1 font weight').value, '600');
    const color = control(el, 'Global threshold 1 color');
    assert.equal(color.getAttribute('aria-invalid'), 'true');
    const error = el.shadowRoot.getElementById(color.getAttribute('aria-describedby'));
    assert.match(error.textContent, /Error: Global threshold 1 color is not a valid color/);
    assert.equal(control(el, 'Global threshold 1 text color').getAttribute('aria-invalid'), 'false');
  });

  test('a cleared value is removed; a row without value shows empty', async () => {
    const el = await mountEditor({ columns: 1, rows: 1, entities: [], global_colors: { thresholds: [{ value: 5, color: 'red' }, { color: 'blue' }] } });
    assert.equal(control(el, 'Global threshold 2 value').value, '');
    setInput(el, 'Global threshold 1 value', '');
    assert.deepEqual(last(el).global_colors.thresholds[0], { color: 'red' });
  });

  test('per entity: rows are named by cell and stored in that entity colors', async () => {
    const el = await mountEditor({ columns: 2, rows: 1, entities: [{ entity: 'sensor.a' }, { entity: 'sensor.b', colors: { on: 'green' } }] });
    button(el, 'Add Threshold to cell 2').click();
    assert.deepEqual(last(el).entities[1].colors, { on: 'green', thresholds: [{ value: 0, color: '#cccccc' }] });
    await rerender(el);
    assert.ok(control(el, 'Cell 2 threshold 1 value'), 'per-entity rows carry the cell number');
    button(el, 'Remove cell 2 threshold 1').click();
    assert.deepEqual(last(el).entities[1].colors, { on: 'green' });
    assert.equal(el.focused.at(-1), 'add-threshold-1');
  });

  test('removing the last per-entity color setting removes colors', async () => {
    const el = await mountEditor({ columns: 1, rows: 1, entities: [{ entity: 'sensor.a', colors: { thresholds: [{ value: 1, color: 'red' }] } }] });
    button(el, 'Remove cell 1 threshold 1').click();
    assert.equal('colors' in last(el).entities[0], false);
  });
});

describe('state colors editor', () => {
  test('global: add, rename, recolor, remove', async () => {
    const el = await mountEditor({ columns: 1, rows: 1, entities: [] });
    button(el, 'Add State Color').click();
    assert.deepEqual(last(el).global_colors.states, { '': '#cccccc' });
    await rerender(el);
    setInput(el, 'Global state 1 name', 'home');
    await rerender(el);
    setInput(el, 'Global state 1 color', 'green');
    assert.deepEqual(last(el).global_colors.states, { home: 'green' });
    await rerender(el);
    button(el, 'Remove global state 1').click();
    assert.equal('states' in last(el).global_colors, false);
    assert.equal(el.focused.at(-1), 'add-state-color-global');
  });

  test('per entity: rows keep their order and cell-numbered names', async () => {
    const el = await mountEditor({ columns: 1, rows: 1, entities: [{ entity: 'person.a', colors: { states: { home: 'green', away: 'red' } } }] });
    assert.equal(control(el, 'Cell 1 state 2 name').value, 'away');
    setInput(el, 'Cell 1 state 1 color', 'blue');
    assert.deepEqual(last(el).entities[0].colors.states, { home: 'blue', away: 'red' });
    button(el, 'Add State Color to cell 1').click();
    assert.deepEqual(Object.keys(last(el).entities[0].colors.states), ['home', 'away', '']);
  });
});
