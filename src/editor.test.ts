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

describe('editor fields', () => {
  const base = () => ({ columns: 2, rows: 2, entities: [{ entity: 'light.a' }] });

  test('grid size via ha-form, and every card-level field', async () => {
    const el = await mountEditor(base());
    const form = el.shadowRoot.querySelector('ha-form');
    assert.deepEqual([form.computeLabel({ name: 'rows' }), form.computeLabel({ name: 'rows', label: 'Rows' })], ['rows', 'Rows']);
    el.shadowRoot.querySelector('ha-form').dispatchEvent(new (globalThis as any).CustomEvent('value-changed', { detail: { value: { columns: 4 } } }));
    assert.equal(last(el).columns, 4);
    const fields: Array<[string, any, string, any]> = [
      ['Cell Width', '25%', 'cell_width', '25%'], ['Cell Height', '120px', 'cell_height', '120px'], ['Cell Gap', '8', 'cell_gap', '8'],
      ['Font Size', '18', 'font_size', '18'], ['Font Weight', '600', 'font_weight', '600'], ['Show Icons', true, 'show_icons', true],
      ['Icon Placement', 'left', 'icon_placement', 'left'], ['Icon Size', '30', 'icon_size', '30'],
      ['Dim Off Text (%)', '50', 'dim_off_text', 50], ['Decimals', '0', 'decimals', 0],
    ];
    for (const [label, value, key, stored] of fields) {
      fire(byLabel(el, label), value);
      assert.deepEqual(last(el)[key], stored, label);
    }
    fire(byLabel(el, 'Decimals'), '');
    fire(byLabel(el, 'Dim Off Text (%)'), undefined);
    assert.equal(last(el).dim_off_text, undefined);
  });

  test('global color fields', async () => {
    const el = await mountEditor({ ...base(), global_colors: { on: 'blue' } });
    for (const [label, key] of [['On Color', 'on'], ['Off Color', 'off'], ['Unavailable Color', 'unavailable'], ['Text Color', 'text'], ['Blank Cell Color', 'blank']]) {
      fire(byLabel(el, label), 'red');
      assert.equal(last(el).global_colors[key], 'red', label);
    }
    const blank = await mountEditor(base());
    fire(byLabel(blank, 'On Color'), 'red');
    assert.deepEqual(last(blank).global_colors, { on: 'red' });
  });

  test('entity fields, icons and colors; Add and Remove entity', async () => {
    const el = await mountEditor({ columns: 2, rows: 2, entities: [{ entity: 'light.a', colors: { on: 'x' }, icon: { on: 'mdi:a' } }] });
    const entityFields: Array<[string, any, string, any]> = [
      ['Entity (leave empty for blank cell)', 'light.b', 'entity', 'light.b'], ['Custom text (optional)', 'A', 'text', 'A'],
      ['Text template', '{{ state }}', 'text_template', '{{ state }}'], ['Column Span', '2', 'colspan', 2],
      ['Text Alignment', 'left', 'text_align', 'left'], ['Click Action', 'none', 'click_action', 'none'],
    ];
    for (const [label, value, key, stored] of entityFields) {
      fire(byLabel(el, label, label === 'Text Alignment' ? 0 : 0), value);
      assert.deepEqual(last(el).entities[0][key], stored, label);
    }
    fire(byLabel(el, 'Text Alignment'), '');
    assert.equal('text_align' in last(el).entities[0], false);
    for (const [label, key] of [['On Color', 'on'], ['Off Color', 'off'], ['Text Color', 'text'], ['Blank Cell Color', 'blank']]) {
      fire(byLabel(el, label, 1), 'teal');
      assert.equal(last(el).entities[0].colors[key], 'teal', label);
    }
    fire(byLabel(el, 'Dim Off Text (%)', 1), '30');
    assert.equal(last(el).entities[0].dim_off_text, 30);
    fire(byLabel(el, 'Decimals', 1), '');
    assert.equal('decimals' in last(el).entities[0], false);
    fire(byLabel(el, 'On Icon'), 'mdi:x');
    fire(byLabel(el, 'Off Icon'), 'mdi:y');
    assert.deepEqual(last(el).entities[0].icon, { on: 'mdi:a', off: 'mdi:y' });
    button(el, 'Add Entity').click();
    assert.equal(last(el).entities.length, 2);
    button(el, 'Remove cell 1').click();
    assert.equal(last(el).entities.length, 0);
    assert.equal(el.focused.at(-1), 'add-entity');
  });

  test('a blank entity panel shows empty fields; colors and icons start from nothing', async () => {
    const el = await mountEditor({ columns: 1, rows: 1, entities: [{}] });
    assert.deepEqual([byLabel(el, 'Entity (leave empty for blank cell)').value, byLabel(el, 'On Icon').value, byLabel(el, 'Column Span').value], ['', '', 1]);
    fire(byLabel(el, 'On Color', 1), 'red');
    assert.deepEqual(last(el).entities[0].colors, { on: 'red' });
    fire(byLabel(el, 'On Icon'), 'mdi:z');
    assert.deepEqual(last(el).entities[0].icon, { on: 'mdi:z' });
  });

  test('no entities key: Add Entity starts the list', async () => {
    const el = await mountEditor({ columns: 1, rows: 1 });
    button(el, 'Add Entity').click();
    assert.deepEqual(last(el).entities, [{ entity: '' }]);
  });

  test('header rows and cells: add, edit, remove', async () => {
    const el = await mountEditor({ columns: 2, rows: 3, entities: [] });
    button(el, 'Add Header Row').click();
    assert.deepEqual(last(el).header_rows, [{ row_index: 0, cells: [{ text: 'Header', colspan: 1 }] }]);
    await rerender(el);
    fire(byLabel(el, 'Row Index (0-based)'), '2');
    assert.equal(last(el).header_rows[0].row_index, 2);
    await rerender(el);
    button(el, 'Add Header Cell to header row 1').click();
    assert.equal(last(el).header_rows[0].cells.length, 2);
    await rerender(el);
    const cellFields: Array<[string, any, string, any]> = [
      ['Text', 'Living', 'text', 'Living'], ['Column Span', '2', 'colspan', 2], ['Text Alignment', 'left', 'text_align', 'left'],
      ['Font Size', '20', 'font_size', '20'], ['Font Weight', '600', 'font_weight', '600'],
    ];
    for (const [label, value, key, stored] of cellFields) {
      const nth = ['Font Size', 'Font Weight'].includes(label) ? 1 : 0;
      fire(byLabel(el, label, nth), value);
      assert.deepEqual(last(el).header_rows[0].cells[0][key], stored, label);
    }
    fire(byLabel(el, 'Text Color', 1), 'white');
    fire(byLabel(el, 'Background Color'), 'black');
    assert.equal(last(el).header_rows[0].cells[0].background_color, 'black');
    button(el, 'Remove cell 1 of header row 1').click();
    assert.equal(last(el).header_rows[0].cells.length, 1);
    assert.equal(el.focused.at(-1), 'add-header-cell-0');
    button(el, 'Remove header row 1').click();
    assert.deepEqual(last(el).header_rows, []);
    assert.equal(el.focused.at(-1), 'add-header-row');
  });

  test('header helpers do nothing without header rows; header cell without text shows empty', async () => {
    const el = await mountEditor({ columns: 1, rows: 1, entities: [] });
    const before = el.changes.length;
    el._removeHeaderRow(0);
    el._headerRowChanged(0, 'row_index', 1);
    el._addHeaderCell(0);
    el._removeHeaderCell(0, 0);
    el._headerCellChanged(0, 0, 'text', 'x');
    assert.equal(el.changes.length, before);
    const withCell = await mountEditor({ columns: 1, rows: 2, entities: [], header_rows: [{ row_index: 0, cells: [{}] }] });
    assert.deepEqual([byLabel(withCell, 'Text').value, byLabel(withCell, 'Column Span').value, byLabel(withCell, 'Text Alignment').value], ['', 1, 'center']);
  });

  test('Show Icon starts at Show or Hide; per-entity dim and decimals clear', async () => {
    const el = await mountEditor({ columns: 2, rows: 1, entities: [{ entity: 'a.a', show_icon: true, dim_off_text: 20, decimals: 2 }, { entity: 'a.b', show_icon: false }] });
    assert.deepEqual([byLabel(el, 'Show Icon').value, byLabel(el, 'Show Icon', 1).value], ['show', 'hide']);
    fire(byLabel(el, 'Dim Off Text (%)', 1), undefined);
    fire(byLabel(el, 'Decimals', 1), undefined);
    assert.equal('decimals' in last(el).entities[0], false);
    fire(byLabel(el, 'Decimals', 1), '3');
    assert.equal(last(el).entities[0].decimals, 3);
    const before = el.changes.length;
    el._stateColorChanged(1, 0, 'color', 'red');
    assert.equal(el.changes.length, before, 'no state row 1 on cell 2: nothing fired');
  });

  test('row helpers with no list yet; a threshold without color shows empty', async () => {
    const el = await mountEditor({ columns: 1, rows: 1, entities: [{ entity: 'a.a' }], global_colors: { thresholds: [{ value: 1 }] } });
    assert.equal(control(el, 'Global threshold 1 color').value, '');
    el._removeThreshold(0, 0);
    el._thresholdChanged(0, 0, 'color', 'red');
    el._removeStateColor(0, 0);
    el._addStateColor(0);
    assert.deepEqual(last(el).entities[0].colors.states, { '': '#cccccc' });
    el._config = { ...el._config, entities: [{ entity: 'a.a', colors: { states: { home: 'g' } } }] };
    el._stateColorChanged(0, 0, 'state', 'away');
    assert.deepEqual(last(el).entities[0].colors.states, { away: 'g' });
  });

  test('nothing is fired or rendered without hass', async () => {
    const el = await mountEditor(base(), null);  // undefined would take the default hass
    el._valueChanged({ detail: { value: { columns: 3 } } });
    el._configValueChanged('rows', 3);
    assert.equal(el.changes.length, 0);
    assert.equal(el.shadowRoot.querySelectorAll('ha-selector').length, 0);
  });

  test('editor defaults: grid size and lists when unset', async () => {
    const el = await mountEditor({ entities: [{}] });
    assert.deepEqual(el._entityPositions(), [{ row: 1, col: 1 }]);
    const shown = await mountEditor({ columns: 1, rows: 1, entities: [], global_colors: {} });
    assert.equal(byLabel(shown, 'Font Weight').value, 'bold');
    assert.equal(byLabel(shown, 'Cell Height').value, '100px');
  });
});

// Found on ha-test (2026-11-26): HA's number selector sends undefined when a field is
// cleared, not ''; a bare Number() saved NaN (`.nan` in the YAML), and null became 0
describe('cleared number fields', () => {
  test('cleared (undefined, null) or non-numeric number fields remove the key', async () => {
    const el = await mountEditor({ columns: 2, rows: 3, dim_off_text: 40, decimals: 2,
      header_rows: [{ row_index: 0, cells: [{ text: 'H', colspan: 2 }] }],
      entities: [{ entity: 'a.a', colspan: 2, dim_off_text: 50, decimals: 1 }] });
    for (const cleared of [undefined, null, 'abc']) {
      const tag = String(cleared);
      fire(byLabel(el, 'Dim Off Text (%)', 0), cleared);
      assert.equal('dim_off_text' in last(el), false, `card dim ${tag}`);
      fire(byLabel(el, 'Decimals', 0), cleared);
      assert.equal('decimals' in last(el), false, `card decimals ${tag}`);
      fire(byLabel(el, 'Row Index (0-based)'), cleared);
      assert.equal('row_index' in last(el).header_rows[0], false, `row_index ${tag}`);
      fire(byLabel(el, 'Column Span', 0), cleared);
      assert.equal('colspan' in last(el).header_rows[0].cells[0], false, `header colspan ${tag}`);
      fire(byLabel(el, 'Column Span', 1), cleared);
      assert.equal('colspan' in last(el).entities[0], false, `entity colspan ${tag}`);
      fire(byLabel(el, 'Dim Off Text (%)', 1), cleared);
      assert.equal('dim_off_text' in last(el).entities[0], false, `entity dim ${tag}`);
      fire(byLabel(el, 'Decimals', 1), cleared);
      assert.equal('decimals' in last(el).entities[0], false, `entity decimals ${tag}`);
    }
  });
});
