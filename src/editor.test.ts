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

describe('review sweep findings', () => {
  // E1 (B6/B8): per-entity show_icon is tri-state in the card (unset inherits)
  test('per-entity Show Icon can return to the global setting', { todo: 'boolean switch shows unset as off and can only write true/false' }, async () => {
    const el = await mountEditor({ columns: 1, rows: 1, show_icons: true, entities: [{ entity: 'light.a', show_icon: false }] });
    const control = byLabel(el, 'Show Icon');
    assert.ok(control, 'expected a Show Icon select (Default / Show / Hide)');
    fire(control, 'default');
    assert.equal('show_icon' in last(el).entities[0], false);
  });

  // E10 (B6): entities beyond rows x columns are in the config but not in the editor
  test('every configured entity has a panel', { todo: 'entities past rows*columns are not rendered, so they cannot be removed' }, async () => {
    const el = await mountEditor({ columns: 1, rows: 1, entities: [{ entity: 'light.a' }, { entity: 'light.b' }] });
    assert.equal(selectors(el).filter((s: any) => s.label === 'Entity (leave empty for blank cell)').length, 2);
  });
});
