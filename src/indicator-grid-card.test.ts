import { test, describe, before } from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';

/**
 * Full behavioural test suite for the IndicatorGridCard class.
 *
 * The card is a Lit web component: it registers a custom element and calls
 * document.createTreeWalker at module load, so it can only be imported inside a
 * DOM. We therefore spin up jsdom, wire the globals Lit needs, then import the
 * built bundle (dist/indicator-grid-card.js) which exports the class with all
 * of its methods intact. TypeScript's `private` is compile-time only, so every
 * method is callable at runtime.
 *
 * The tests exercise the real shipped code (no refactor, no copies). Because
 * the class methods only read `this.config`, `this.hass` and each other, we can
 * drive them on a bare instance created with Object.create(prototype) instead
 * of mounting the element - this keeps each test to plain input/output checks of
 * the calculation and display logic, which is where user-facing bugs (like the
 * issue #9 threshold-ordering regression) actually live.
 */

// Populated in the before() hook once jsdom globals are in place.
let IndicatorGridCard: any;

/**
 * Creates a bare card instance whose `config` and `hass` are plain own data
 * properties. Lit exposes `config` as a reactive accessor that fires
 * requestUpdate on assignment; shadowing it with a data property lets tests set
 * config/hass directly without the reactive lifecycle. Returns the instance.
 */
function makeCard(config?: any, hass?: any): any {
  const card = Object.create(IndicatorGridCard.prototype);
  Object.defineProperty(card, 'config', { value: config, writable: true, configurable: true });
  Object.defineProperty(card, 'hass', { value: hass, writable: true, configurable: true });
  // Stub so _showMoreInfo's fireEvent has something to dispatch on.
  card.dispatchEvent = () => true;
  return card;
}

/**
 * Builds a minimal Home Assistant state object for an entity. `attributes` and
 * the timestamp fields are optional; sensible defaults keep call sites short.
 */
function stateObj(entity_id: string, state: string, attributes: Record<string, any> = {}): any {
  return {
    entity_id,
    state,
    attributes,
    last_changed: '2026-08-03T00:00:00.000Z',
    last_updated: '2026-08-03T00:00:00.000Z',
  };
}

/**
 * Mounts a real <indicator-grid-card> element in jsdom, applies config/hass,
 * waits for Lit's async render to settle, and returns the element. Used by the
 * render-layer tests to assert on the DOM the card actually produces
 * (render -> _renderAllCells -> _renderCell), with no changes to the card.
 */
async function mount(config: any, hass: any = { states: {} }): Promise<any> {
  const el: any = document.createElement('indicator-grid-card');
  el.setConfig(config);
  el.hass = hass;
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

/** Returns the trimmed text of every rendered .cell (header and entity cells). */
function cellTexts(el: any): string[] {
  return [...el.shadowRoot.querySelectorAll('.cell')].map((c: any) => c.textContent.trim());
}

/** Returns the `grid-column` value from an element's inline style, or null. */
function gridColumn(cell: any): string | null {
  return cell.getAttribute('style')?.match(/grid-column:\s*([^;]*)/)?.[1]?.trim() ?? null;
}

before(async () => {
  const dom = new JSDOM('<!DOCTYPE html><body></body>', { pretendToBeVisual: true });
  // Wire only the globals the Lit bundle touches at import time.
  for (const key of [
    'window', 'document', 'HTMLElement', 'customElements',
    'Document', 'CSSStyleSheet', 'Node', 'Event', 'CustomEvent',
  ]) {
    (globalThis as any)[key] = (dom.window as any)[key];
  }
  ({ IndicatorGridCard } = await import('../dist/indicator-grid-card.js'));
});

describe('_normalizeSize', () => {
  test('appends px to a plain integer', () => {
    assert.equal(makeCard()._normalizeSize(100, 'x'), '100px');
  });
  test('appends px to a decimal number', () => {
    assert.equal(makeCard()._normalizeSize(12.5, 'x'), '12.5px');
  });
  test('leaves an explicit px value unchanged', () => {
    assert.equal(makeCard()._normalizeSize('80px', 'x'), '80px');
  });
  test('leaves non-pixel units (fr, %) unchanged', () => {
    const card = makeCard();
    assert.equal(card._normalizeSize('1fr', 'x'), '1fr');
    assert.equal(card._normalizeSize('50%', 'x'), '50%');
  });
  test('returns the default when the value is undefined', () => {
    assert.equal(makeCard()._normalizeSize(undefined, 'DEFAULT'), 'DEFAULT');
  });
});

describe('setConfig', () => {
  test('throws when config is falsy', () => {
    assert.throws(() => makeCard().setConfig(undefined), /Invalid configuration/);
  });

  test('applies documented defaults for omitted fields', () => {
    const card = makeCard();
    card.setConfig({ columns: 4, rows: 3, entities: [] });
    assert.equal(card.config.columns, 4);
    assert.equal(card.config.rows, 3);
    assert.equal(card.config.cell_height, '100px');
    assert.equal(card.config.cell_gap, '5px');
    assert.equal(card.config.font_size, '16px');
    assert.equal(card.config.font_weight, 'bold');
    assert.equal(card.config.show_icons, false);
    assert.equal(card.config.icon_placement, 'above');
    assert.equal(card.config.icon_size, '24px');
    assert.equal(card.config.unavailable_text, 'INOP');
  });

  test('defaults columns to 3 and rows to 2 when omitted', () => {
    const card = makeCard();
    card.setConfig({ entities: [] });
    assert.equal(card.config.columns, 3);
    assert.equal(card.config.rows, 2);
  });

  test('normalizes numeric cell_gap to a px string', () => {
    const card = makeCard();
    card.setConfig({ entities: [], cell_gap: 8 });
    assert.equal(card.config.cell_gap, '8px');
  });

  test('legacy cell_size populates both width and height', () => {
    const card = makeCard();
    card.setConfig({ entities: [], cell_size: 120 });
    assert.equal(card.config.cell_width, '120px');
    assert.equal(card.config.cell_height, '120px');
  });

  test('explicit cell_width/height win over legacy cell_size', () => {
    const card = makeCard();
    card.setConfig({ entities: [], cell_size: 120, cell_width: '60px', cell_height: '90px' });
    assert.equal(card.config.cell_width, '60px');
    assert.equal(card.config.cell_height, '90px');
  });

  test('merges user global_colors over the built-in defaults', () => {
    const card = makeCard();
    card.setConfig({ entities: [], global_colors: { on: 'lime' } });
    assert.equal(card.config.global_colors.on, 'lime');   // overridden
    assert.equal(card.config.global_colors.off, 'gray');  // default kept
    assert.equal(card.config.global_colors.blank, '#333333');
  });
});

describe('getCardSize (masonry/stack view height, 1 unit = 50px)', () => {
  test('returns 2 when config is not set', () => {
    assert.equal(makeCard().getCardSize(), 2);
  });
  test('2 rows @100px + 5 gap -> ceil(205/50) = 5', () => {
    assert.equal(makeCard({ rows: 2, cell_height: '100px', cell_gap: '5px' }).getCardSize(), 5);
  });
  test('3 rows @100px + 5 gap -> ceil(310/50) = 7', () => {
    assert.equal(makeCard({ rows: 3, cell_height: '100px', cell_gap: '5px' }).getCardSize(), 7);
  });
  test('1 row @100px -> ceil(100/50) = 2', () => {
    assert.equal(makeCard({ rows: 1, cell_height: '100px', cell_gap: '5px' }).getCardSize(), 2);
  });
});

describe('getGridOptions (sections view, 56px rows + 8px gaps, 12 cols)', () => {
  test('2 rows @100px + 5 gap: cardHeight 205 -> ceil(213/64) = 4 grid rows', () => {
    const opts = makeCard({ rows: 2, cell_height: '100px', cell_gap: '5px' }).getGridOptions();
    assert.equal(opts.rows, 4);
  });
  test('3 rows @100px + 5 gap: cardHeight 310 -> ceil(318/64) = 5 grid rows', () => {
    assert.equal(makeCard({ rows: 3, cell_height: '100px', cell_gap: '5px' }).getGridOptions().rows, 5);
  });
  test('always reports 12 columns and the documented minimums', () => {
    const opts = makeCard({ rows: 2 }).getGridOptions();
    assert.equal(opts.columns, 12);
    assert.equal(opts.min_rows, 1);
    assert.equal(opts.min_columns, 3);
  });
});

describe('_formatNumericState', () => {
  test('returns non-numeric states unchanged', () => {
    assert.equal(makeCard({})._formatNumericState('on', {}), 'on');
  });
  test('returns the original string when no decimals are configured', () => {
    assert.equal(makeCard({})._formatNumericState('3.14159', {}), '3.14159');
  });
  test('applies per-entity decimals', () => {
    assert.equal(makeCard({})._formatNumericState('3.14159', { decimals: 2 }), '3.14');
  });
  test('falls back to global decimals', () => {
    assert.equal(makeCard({ decimals: 1 })._formatNumericState('3.14159', {}), '3.1');
  });
  test('per-entity decimals override global decimals', () => {
    assert.equal(makeCard({ decimals: 0 })._formatNumericState('3.14159', { decimals: 3 }), '3.142');
  });
  test('pads integers to the requested precision', () => {
    assert.equal(makeCard({})._formatNumericState('5', { decimals: 2 }), '5.00');
  });
  test('clamps decimals above 10 down to 10', () => {
    assert.equal(makeCard({})._formatNumericState('1', { decimals: 20 }), '1.0000000000');
  });
  test('clamps negative decimals up to 0', () => {
    assert.equal(makeCard({})._formatNumericState('3.9', { decimals: -5 }), '4');
  });
  test('floors a fractional decimals setting', () => {
    assert.equal(makeCard({})._formatNumericState('3.14159', { decimals: 2.9 }), '3.14');
  });
  test('returns the original string for non-finite numbers', () => {
    assert.equal(makeCard({})._formatNumericState('Infinity', { decimals: 2 }), 'Infinity');
  });
});

describe('_getColor (priority: entity -> global -> hard-coded default)', () => {
  test('entity color wins over global', () => {
    const card = makeCard({ global_colors: { on: 'green' } });
    assert.equal(card._getColor('on', { on: 'blue' }), 'blue');
  });
  test('falls back to global color when the entity omits it', () => {
    const card = makeCard({ global_colors: { on: 'green' } });
    assert.equal(card._getColor('on', {}), 'green');
  });
  test('falls back to the hard-coded default when neither is set', () => {
    const card = makeCard({});
    assert.equal(card._getColor('text', undefined), 'white');
    assert.equal(card._getColor('off', undefined), 'gray');
    assert.equal(card._getColor('unavailable', undefined), 'orange');
    assert.equal(card._getColor('blank', undefined), '#333333');
  });
});

describe('_getBackgroundColor (resolution order)', () => {
  // Guards the same class of ordering bug as issue #9.
  test('entity state-map has the highest priority', () => {
    const card = makeCard({ global_colors: { states: { on: 'globalcolor' } } });
    const color = card._getBackgroundColor('on', { colors: { states: { on: 'entitycolor' } } });
    assert.equal(color, 'entitycolor');
  });
  test('global state-map is used when the entity has none', () => {
    const card = makeCard({ global_colors: { states: { open: 'purple' } } });
    assert.equal(card._getBackgroundColor('open', {}), 'purple');
  });
  test('thresholds resolve for numeric states', () => {
    const card = makeCard({ global_colors: {} });
    const color = card._getBackgroundColor('75', {
      colors: { thresholds: [{ value: 60, operator: '>=', color: 'red' }] },
    });
    assert.equal(color, 'red');
  });
  test('entity thresholds win over global thresholds', () => {
    const card = makeCard({ global_colors: { thresholds: [{ value: 0, operator: '>=', color: 'globalred' }] } });
    const color = card._getBackgroundColor('50', {
      colors: { thresholds: [{ value: 0, operator: '>=', color: 'entityred' }] },
    });
    assert.equal(color, 'entityred');
  });
  test("plain 'on'/'off' states use the on/off colors", () => {
    const card = makeCard({ global_colors: { on: 'green', off: 'gray' } });
    assert.equal(card._getBackgroundColor('on', {}), 'green');
    assert.equal(card._getBackgroundColor('off', {}), 'gray');
  });
  test('an unmatched non-numeric state falls back to the off color', () => {
    const card = makeCard({ global_colors: { off: 'gray' } });
    assert.equal(card._getBackgroundColor('idle', {}), 'gray');
  });
});

describe('_computeCell', () => {
  const config = { unavailable_text: 'INOP', global_colors: { on: 'green', off: 'gray', unavailable: 'orange', text: 'white' } };

  test('a null state produces an unavailable, non-clickable cell', () => {
    const card = makeCard(config);
    const cell = card._computeCell({ entity: 'light.x', text: 'Kitchen' }, null);
    assert.equal(cell.displayText, 'Kitchen\nINOP');
    assert.equal(cell.backgroundColor, 'orange');
    assert.equal(cell.clickable, false);
    assert.equal(cell.clickAction, 'none');
  });

  test("state 'unavailable' takes the INOP path", () => {
    const card = makeCard(config);
    const cell = card._computeCell({ entity: 'sensor.x' }, stateObj('sensor.x', 'unavailable', { friendly_name: 'Temp' }));
    assert.equal(cell.displayText, 'Temp\nINOP');
    assert.equal(cell.backgroundColor, 'orange');
  });

  test("state 'unknown' takes the INOP path", () => {
    const card = makeCard(config);
    const cell = card._computeCell({ entity: 'sensor.x' }, stateObj('sensor.x', 'unknown'));
    assert.ok(cell.displayText.endsWith('\nINOP'));
  });

  test('an on light is clickable with a toggle action and on color', () => {
    const card = makeCard(config);
    const cell = card._computeCell({ entity: 'light.x' }, stateObj('light.x', 'on', { friendly_name: 'Lamp' }));
    assert.equal(cell.backgroundColor, 'green');
    assert.equal(cell.clickable, true);
    assert.equal(cell.clickAction, 'toggle');
    assert.equal(cell.state, 'on');
  });

  test('threshold text_color and font_weight override the cell styles', () => {
    const card = makeCard({
      ...config,
      global_colors: { ...config.global_colors, thresholds: [{ value: 60, operator: '>=', color: 'red', text_color: 'black', font_weight: 700 }] },
    });
    const cell = card._computeCell({ entity: 'sensor.load' }, stateObj('sensor.load', '75'));
    assert.equal(cell.backgroundColor, 'red');
    assert.equal(cell.textColor, 'black');
    assert.equal(cell.fontWeight, 700);
  });

  test('colspan is passed through (default 1)', () => {
    const card = makeCard(config);
    const spanned = card._computeCell({ entity: 'light.x', colspan: 3 }, stateObj('light.x', 'on'));
    assert.equal(spanned.colspan, 3);
    const single = card._computeCell({ entity: 'light.x' }, stateObj('light.x', 'on'));
    assert.equal(single.colspan, 1);
  });
});

describe('_getIcon', () => {
  test('returns undefined when icons are globally disabled and no entity override', () => {
    const card = makeCard({ show_icons: false });
    assert.equal(card._getIcon('on', {}, stateObj('light.x', 'on')), undefined);
  });
  test('entity show_icon:false overrides a global true', () => {
    const card = makeCard({ show_icons: true });
    assert.equal(card._getIcon('on', { show_icon: false }, stateObj('light.x', 'on')), undefined);
  });
  test('uses the entity custom icon for the current state', () => {
    const card = makeCard({ show_icons: true });
    const on = card._getIcon('on', { icon: { on: 'mdi:on', off: 'mdi:off' } }, stateObj('light.x', 'on'));
    const off = card._getIcon('off', { icon: { on: 'mdi:on', off: 'mdi:off' } }, stateObj('light.x', 'off'));
    assert.equal(on, 'mdi:on');
    assert.equal(off, 'mdi:off');
  });
  test("falls back to the entity's own icon attribute", () => {
    const card = makeCard({ show_icons: true });
    assert.equal(card._getIcon('on', {}, stateObj('light.x', 'on', { icon: 'mdi:custom' })), 'mdi:custom');
  });
  test('falls back to a per-domain default icon', () => {
    const card = makeCard({ show_icons: true });
    assert.equal(card._getIcon('on', {}, stateObj('light.x', 'on')), 'mdi:lightbulb-on');
    assert.equal(card._getIcon('off', {}, stateObj('light.x', 'off')), 'mdi:lightbulb');
    assert.equal(card._getIcon('on', {}, stateObj('sensor.x', '5')), 'mdi:eye');
  });
});

describe('_getTextOpacity', () => {
  test('non-off states are never dimmed', () => {
    assert.equal(makeCard({ dim_off_text: 50 })._getTextOpacity('on', {}), 1);
  });
  test('per-entity dim_off_text is applied as a fraction', () => {
    assert.equal(makeCard({})._getTextOpacity('off', { dim_off_text: 50 }), 0.5);
  });
  test('falls back to the global dim_off_text', () => {
    assert.equal(makeCard({ dim_off_text: 25 })._getTextOpacity('off', {}), 0.25);
  });
  test('per-entity dim overrides global', () => {
    assert.equal(makeCard({ dim_off_text: 25 })._getTextOpacity('off', { dim_off_text: 80 }), 0.8);
  });
  test('off with no dim setting stays at full opacity', () => {
    assert.equal(makeCard({})._getTextOpacity('off', {}), 1);
  });
});

describe('_getDefaultClickAction', () => {
  test('toggleable domains map to toggle', () => {
    const card = makeCard();
    for (const domain of ['light', 'switch', 'input_boolean', 'automation', 'fan']) {
      assert.equal(card._getDefaultClickAction(stateObj(`${domain}.x`, 'on')), 'toggle');
    }
  });
  test('other domains map to more-info', () => {
    const card = makeCard();
    assert.equal(card._getDefaultClickAction(stateObj('sensor.x', '5')), 'more-info');
    assert.equal(card._getDefaultClickAction(stateObj('binary_sensor.x', 'on')), 'more-info');
  });
});

describe('_relativeTime', () => {
  const card = () => makeCard();
  const ago = (seconds: number) => new Date(Date.now() - seconds * 1000).toISOString();

  test('empty input returns empty string', () => {
    assert.equal(card()._relativeTime(''), '');
  });
  test('an invalid timestamp returns empty string', () => {
    assert.equal(card()._relativeTime('not-a-date'), '');
  });
  test('under a minute reads "just now"', () => {
    assert.equal(card()._relativeTime(ago(10)), 'just now');
  });
  test('minutes are pluralized correctly', () => {
    assert.equal(card()._relativeTime(ago(65)), '1 minute ago');
    assert.equal(card()._relativeTime(ago(130)), '2 minutes ago');
  });
  test('hours are pluralized correctly', () => {
    assert.equal(card()._relativeTime(ago(3600)), '1 hour ago');
    assert.equal(card()._relativeTime(ago(2 * 3600)), '2 hours ago');
  });
  test('days are pluralized correctly', () => {
    assert.equal(card()._relativeTime(ago(24 * 3600)), '1 day ago');
    assert.equal(card()._relativeTime(ago(3 * 24 * 3600)), '3 days ago');
  });
});

describe('templates', () => {
  const entityConfig = { entity: 'sensor.temp' };
  const st = stateObj('sensor.temp', '21.5', { friendly_name: 'Living Room', unit_of_measurement: '°C', humidity: 40 });

  test('{{ state }} renders the (formatted) state', () => {
    assert.equal(makeCard({})._renderTemplate('{{ state }}', st, entityConfig), '21.5');
  });
  test('{{ name }} renders the friendly name', () => {
    assert.equal(makeCard({})._renderTemplate('{{ name }}', st, entityConfig), 'Living Room');
  });
  test('{{ state_with_unit }} appends the unit', () => {
    assert.equal(makeCard({})._renderTemplate('{{ state_with_unit }}', st, entityConfig), '21.5 °C');
  });
  test('{{ unit }} renders the unit of measurement', () => {
    assert.equal(makeCard({})._renderTemplate('{{ unit }}', st, entityConfig), '°C');
  });
  test('{{ attributes.x }} renders an arbitrary attribute', () => {
    assert.equal(makeCard({})._renderTemplate('{{ attributes.humidity }}', st, entityConfig), '40');
  });
  test("{{ states('id') }} resolves another entity's state via hass", () => {
    const card = makeCard({}, { states: { 'sensor.other': stateObj('sensor.other', '99') } });
    assert.equal(card._renderTemplate("{{ states('sensor.other') }}", st, entityConfig), '99');
  });
  test('literal text passes through untouched', () => {
    assert.equal(makeCard({})._renderTemplate('Hello {{ name }}!', st, entityConfig), 'Hello Living Room!');
  });

  describe('filters', () => {
    const run = (tpl: string) => makeCard({})._renderTemplate(tpl, st, entityConfig);
    test('upper / lower / title', () => {
      assert.equal(makeCard({})._applyTemplateFilter('aBc', 'upper'), 'ABC');
      assert.equal(makeCard({})._applyTemplateFilter('aBc', 'lower'), 'abc');
      assert.equal(makeCard({})._applyTemplateFilter('hello world', 'title'), 'Hello World');
    });
    test('round(n)', () => {
      assert.equal(run('{{ state | round(0) }}'), '22');
      assert.equal(run('{{ state | round(1) }}'), '21.5');
    });
    test('int falls back to a default for non-numeric input', () => {
      assert.equal(makeCard({})._applyTemplateFilter('abc', 'int'), '0');
      assert.equal(makeCard({})._applyTemplateFilter('abc', "int('N/A')"), 'N/A');
      assert.equal(makeCard({})._applyTemplateFilter('7.9', 'int'), '7');
    });
    test('float', () => {
      assert.equal(makeCard({})._applyTemplateFilter('7.50', 'float'), '7.5');
      assert.equal(makeCard({})._applyTemplateFilter('abc', 'float'), '0');
    });
    test('replace(a,b)', () => {
      assert.equal(makeCard({})._applyTemplateFilter('a-b-c', "replace('-','_')"), 'a_b_c');
    });
    test('truncate(n)', () => {
      assert.equal(makeCard({})._applyTemplateFilter('abcdefgh', 'truncate(3)'), 'abc...');
      assert.equal(makeCard({})._applyTemplateFilter('ab', 'truncate(5)'), 'ab');
    });
    test('default(val) fills in for empty input', () => {
      assert.equal(makeCard({})._applyTemplateFilter('', "default('N/A')"), 'N/A');
      assert.equal(makeCard({})._applyTemplateFilter('x', "default('N/A')"), 'x');
    });
    test('an unknown filter passes the value through', () => {
      assert.equal(makeCard({})._applyTemplateFilter('x', 'bogus'), 'x');
    });
    test('filters chain left to right', () => {
      assert.equal(run('{{ state | float | round(0) }}'), '22');
    });
  });
});

describe('_extractTemplateEntityIds', () => {
  test('extracts a single referenced entity id', () => {
    assert.deepEqual(makeCard()._extractTemplateEntityIds("{{ states('sensor.a') }}"), ['sensor.a']);
  });
  test('extracts multiple referenced entity ids', () => {
    const ids = makeCard()._extractTemplateEntityIds("{{ states('sensor.a') }} / {{ states('sensor.b') | upper }}");
    assert.deepEqual(ids, ['sensor.a', 'sensor.b']);
  });
  test('returns an empty array when there are no references', () => {
    assert.deepEqual(makeCard()._extractTemplateEntityIds('{{ state }} plain'), []);
  });
});

describe('_processHeaderText', () => {
  const hass = { states: { 'sensor.a': stateObj('sensor.a', 'hello') } };
  test("resolves states('id') in header text", () => {
    assert.equal(makeCard({}, hass)._processHeaderText("Status: {{ states('sensor.a') }}"), 'Status: hello');
  });
  test('applies a filter to the resolved value', () => {
    assert.equal(makeCard({}, hass)._processHeaderText("{{ states('sensor.a') | upper }}"), 'HELLO');
  });
  test('a missing entity resolves to empty string', () => {
    assert.equal(makeCard({}, hass)._processHeaderText("{{ states('sensor.missing') }}"), '');
  });
  test('an unknown expression is returned as-is', () => {
    assert.equal(makeCard({}, hass)._processHeaderText('{{ literal }}'), 'literal');
  });
});

describe('click handling', () => {
  test('a toggle cell calls hass.callService(domain, "toggle", { entity_id })', () => {
    const calls: any[] = [];
    const card = makeCard({}, { callService: (domain: string, service: string, data: any) => calls.push([domain, service, data]) });
    card._handleClick({ clickable: true, entity: 'switch.fan', clickAction: 'toggle' });
    assert.deepEqual(calls, [['switch', 'toggle', { entity_id: 'switch.fan' }]]);
  });

  test('a more-info cell dispatches a hass-more-info event with the entity id', () => {
    let dispatched: any = null;
    const card = makeCard({});
    card.dispatchEvent = (event: any) => { dispatched = event; return true; };
    card._handleClick({ clickable: true, entity: 'sensor.x', clickAction: 'more-info' });
    assert.equal(dispatched.type, 'hass-more-info');
    assert.deepEqual(dispatched.detail, { entityId: 'sensor.x' });
  });

  test('a non-clickable cell does nothing', () => {
    const calls: any[] = [];
    const card = makeCard({}, { callService: (...a: any[]) => calls.push(a) });
    card._handleClick({ clickable: false, entity: 'switch.fan', clickAction: 'toggle' });
    assert.equal(calls.length, 0);
  });

  test('a cell without an entity does nothing', () => {
    const calls: any[] = [];
    const card = makeCard({}, { callService: (...a: any[]) => calls.push(a) });
    card._handleClick({ clickable: true, clickAction: 'toggle' });
    assert.equal(calls.length, 0);
  });
});

describe('shouldUpdate', () => {
  const changed = (entries: [string, any][]) => new Map(entries);

  test('returns false before any config is set', () => {
    const card = makeCard(undefined);
    assert.equal(card.shouldUpdate(changed([['config', undefined]])), false);
  });

  test('always updates when the config changes', () => {
    const card = makeCard({ entities: [] });
    assert.equal(card.shouldUpdate(changed([['config', undefined]])), true);
  });

  test('updates on the first hass (no previous value)', () => {
    const card = makeCard({ entities: [{ entity: 'light.x' }] }, { states: {} });
    assert.equal(card.shouldUpdate(changed([['hass', undefined]])), true);
  });

  test('updates only when a referenced entity actually changed', () => {
    const oldOn = stateObj('light.x', 'on');
    const newOff = stateObj('light.x', 'off');
    const other = stateObj('sensor.y', '1');

    const card = makeCard({ entities: [{ entity: 'light.x' }] }, { states: { 'light.x': newOff, 'sensor.y': other } });
    // light.x changed identity -> update
    assert.equal(card.shouldUpdate(changed([['hass', { states: { 'light.x': oldOn, 'sensor.y': other } }]])), true);

    // Nothing our card references changed -> skip
    const card2 = makeCard({ entities: [{ entity: 'light.x' }] }, { states: { 'light.x': oldOn, 'sensor.y': stateObj('sensor.y', '2') } });
    assert.equal(card2.shouldUpdate(changed([['hass', { states: { 'light.x': oldOn, 'sensor.y': other } }]])), false);
  });
});

describe('render layer (_renderAllCells / _renderCell)', () => {
  test('renders one cell per entity in a simple grid', async () => {
    const el = await mount(
      { columns: 2, rows: 1, entities: [{ entity: 'light.a' }, { entity: 'light.b' }] },
      { states: { 'light.a': stateObj('light.a', 'on'), 'light.b': stateObj('light.b', 'off') } }
    );
    assert.equal(el.shadowRoot.querySelectorAll('.cell').length, 2);
    el.remove();
  });

  test('a colspan entity spans multiple columns and fills the row (no phantom cells)', async () => {
    // Regression guard for the 1.1.0 phantom-row issue with colspan.
    const el = await mount(
      { columns: 2, rows: 1, entities: [{ entity: 'light.a', colspan: 2 }] },
      { states: { 'light.a': stateObj('light.a', 'on') } }
    );
    const cells = el.shadowRoot.querySelectorAll('.cell');
    assert.equal(cells.length, 1);
    assert.equal(gridColumn(cells[0]), 'span 2');
    el.remove();
  });

  test('mixed spans fill each row exactly, producing no extra rows/cells', async () => {
    // columns=2, rows=2. Row 0: A spans 2 (fills row). Row 1: B + C.
    // A phantom-row bug would render more than 3 cells.
    const el = await mount(
      {
        columns: 2, rows: 2,
        entities: [{ entity: 'light.a', colspan: 2 }, { entity: 'light.b' }, { entity: 'light.c' }],
      },
      {
        states: {
          'light.a': stateObj('light.a', 'on'),
          'light.b': stateObj('light.b', 'on'),
          'light.c': stateObj('light.c', 'off'),
        },
      }
    );
    const cells = el.shadowRoot.querySelectorAll('.cell');
    assert.equal(cells.length, 3);
    assert.equal(gridColumn(cells[0]), 'span 2');
    el.remove();
  });

  test('a text-only cell (text, no entity) renders its text and is not clickable', async () => {
    // Regression guard for 1.4.0: these cells previously rendered blank.
    const el = await mount({ columns: 1, rows: 1, entities: [{ text: 'Row Label' }] });
    const cells = el.shadowRoot.querySelectorAll('.cell');
    assert.equal(cells.length, 1);
    assert.equal(cells[0].textContent.trim(), 'Row Label');
    assert.equal(cells[0].classList.contains('clickable'), false);
    el.remove();
  });

  test('a blank cell (no entity, no text) renders empty', async () => {
    const el = await mount({ columns: 1, rows: 1, entities: [{}] });
    assert.deepEqual(cellTexts(el), ['']);
    el.remove();
  });

  test('an unavailable entity renders name and INOP on two lines', async () => {
    const el = await mount(
      { columns: 1, rows: 1, unavailable_text: 'INOP', entities: [{ entity: 'sensor.x', text: 'Temp' }] },
      { states: { 'sensor.x': stateObj('sensor.x', 'unavailable') } }
    );
    const lines = [...el.shadowRoot.querySelectorAll('.text-line')].map((l: any) => l.textContent.trim());
    assert.deepEqual(lines, ['Temp', 'INOP']);
    el.remove();
  });

  test('a clickable entity cell gets the clickable class', async () => {
    const el = await mount(
      { columns: 1, rows: 1, entities: [{ entity: 'light.a' }] },
      { states: { 'light.a': stateObj('light.a', 'on') } }
    );
    assert.equal(el.shadowRoot.querySelector('.cell').classList.contains('clickable'), true);
    el.remove();
  });

  test('a clickable cell is a keyboard button; a non-clickable cell is not', async () => {
    const el = await mount(
      { columns: 2, rows: 1, entities: [{ entity: 'light.a' }, { entity: 'light.b', click_action: 'none' }] },
      { states: { 'light.a': stateObj('light.a', 'on'), 'light.b': stateObj('light.b', 'on') } }
    );
    const [clickable, plain] = el.shadowRoot.querySelectorAll('.cell');
    assert.equal(clickable.getAttribute('role'), 'button');
    assert.equal(clickable.getAttribute('tabindex'), '0');
    assert.equal(plain.hasAttribute('role'), false);
    assert.equal(plain.hasAttribute('tabindex'), false);
    el.remove();
  });

  test('Enter and Space on a clickable cell run its action; other keys do not', async () => {
    const el = await mount(
      { columns: 1, rows: 1, entities: [{ entity: 'light.a' }] },
      { states: { 'light.a': stateObj('light.a', 'on') } }
    );
    const calls = [];
    el._handleClick = (cell) => calls.push(cell.entity);
    await el.updateComplete;
    const cell = el.shadowRoot.querySelector('.cell');
    for (const key of ['Enter', ' ', 'a']) {
      cell.dispatchEvent(new window.KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
    }
    assert.deepEqual(calls, ['light.a', 'light.a']);
    el.remove();
  });

  test('a header row renders header cells with their text and colspan', async () => {
    const el = await mount({
      columns: 2, rows: 1,
      entities: [],
      header_rows: [{ row_index: 0, cells: [{ text: 'GROUP', colspan: 2 }] }],
    });
    const header = el.shadowRoot.querySelector('.header-cell');
    assert.ok(header, 'expected a .header-cell to render');
    assert.equal(header.textContent.trim(), 'GROUP');
    assert.equal(gridColumn(header), 'span 2');
    el.remove();
  });

  test('renders an icon element when icons are enabled', async () => {
    const el = await mount(
      { columns: 1, rows: 1, show_icons: true, icon_placement: 'above', entities: [{ entity: 'light.a' }] },
      { states: { 'light.a': stateObj('light.a', 'on') } }
    );
    const icon = el.shadowRoot.querySelector('ha-icon');
    assert.ok(icon, 'expected an ha-icon element');
    assert.equal(icon.icon, 'mdi:lightbulb-on');
    el.remove();
  });

  test('renders no cells until hass is provided', async () => {
    const el: any = document.createElement('indicator-grid-card');
    el.setConfig({ columns: 1, rows: 1, entities: [{ entity: 'light.a' }] });
    document.body.appendChild(el);
    await el.updateComplete;
    assert.equal(el.shadowRoot.querySelectorAll('.cell').length, 0);
    el.remove();
  });
});

describe('header row helpers', () => {
  const config = { header_rows: [{ row_index: 0, cells: [{ text: 'Header' }] }] };
  test('_isHeaderRow identifies configured header rows', () => {
    const card = makeCard(config);
    assert.equal(card._isHeaderRow(0), true);
    assert.equal(card._isHeaderRow(1), false);
  });
  test('_isHeaderRow is false when no header rows are configured', () => {
    assert.equal(makeCard({})._isHeaderRow(0), false);
  });
  test('_getHeaderRow returns the matching row config', () => {
    const card = makeCard(config);
    assert.deepEqual(card._getHeaderRow(0), config.header_rows[0]);
    assert.equal(card._getHeaderRow(1), undefined);
  });
});

describe('_getTextColor', () => {
  test('with no text color set, picks black or white for the higher contrast', () => {
    const card = makeCard({});
    assert.equal(card._getTextColor(undefined, '#808080'), 'black'); // gray: white is 3.9:1
    assert.equal(card._getTextColor(undefined, '#ffa500'), 'black'); // orange: white is 2.0:1
    assert.equal(card._getTextColor(undefined, '#008000'), 'white'); // green: white is 5.1:1
    assert.equal(card._getTextColor(undefined, '#333'), 'white');
    assert.equal(card._getTextColor(undefined, 'rgb(255, 235, 59)'), 'black');
  });

  test('configured entity and global text colors win', () => {
    const card = makeCard({ global_colors: { text: 'yellow' } });
    assert.equal(card._getTextColor(undefined, '#808080'), 'yellow');
    assert.equal(card._getTextColor({ text: 'red' }, '#808080'), 'red');
  });

  test('falls back to white when the fill cannot be resolved', () => {
    const card = makeCard({});
    assert.equal(card._getTextColor(undefined, 'var(--state-on-color)'), 'white');
  });
});
