import { test } from 'node:test';
import assert from 'node:assert/strict';
import { evaluateThresholds } from './thresholds.ts';
import type { ThresholdConfig } from './types.ts';

/**
 * Convenience helper: returns just the resolved background color (or null) so
 * tests read as "value X resolves to color Y".
 */
function colorFor(value: number, thresholds?: ThresholdConfig[]): string | null {
  return evaluateThresholds(value, thresholds)?.backgroundColor ?? null;
}

test('returns null when there are no thresholds', () => {
  assert.equal(evaluateThresholds(50, undefined), null);
  assert.equal(evaluateThresholds(50, []), null);
});

test('default operator behaves as an ascending "<=" ladder', () => {
  // No operators specified: mirrors the common "value only" configuration.
  const ladder: ThresholdConfig[] = [
    { value: 0.49, color: 'darkgreen' },
    { value: 0.5, color: 'yellow' },
    { value: 0.75, color: 'orange' },
    { value: 1, color: 'red' },
  ];

  assert.equal(colorFor(0, ladder), 'darkgreen');
  assert.equal(colorFor(0.49, ladder), 'darkgreen');
  assert.equal(colorFor(0.5, ladder), 'yellow');
  assert.equal(colorFor(0.6, ladder), 'orange');
  assert.equal(colorFor(0.75, ladder), 'orange');
  assert.equal(colorFor(0.9, ladder), 'red');
  assert.equal(colorFor(1, ladder), 'red');
  // Above the top band nothing matches; the card falls back to other colors.
  assert.equal(colorFor(1.5, ladder), null);
});

test("reporter's mixed-operator config: a value at/above the '>=60' band resolves to red, not the '>=0' catch-all", () => {
  // Regression test for issue #9. Previously the ascending sort tested the
  // "value 0, >=" blue entry first and it swallowed every value >= 0.
  const config: ThresholdConfig[] = [
    { value: 0, operator: '>=', color: 'blue' },
    { value: 40, operator: '<', color: 'orange' },
    { value: 60, operator: '<', color: 'green' },
    { value: 60, operator: '>=', color: 'red' },
  ];

  assert.equal(colorFor(62, config), 'red');
  assert.equal(colorFor(60, config), 'red');
  assert.equal(colorFor(80, config), 'red');
});

test('multiple greater-than thresholds pick the highest matching bound', () => {
  const config: ThresholdConfig[] = [
    { value: 50, operator: '>', color: 'yellow' },
    { value: 80, operator: '>', color: 'red' },
  ];

  assert.equal(colorFor(90, config), 'red'); // 90 > 80 wins over 90 > 50
  assert.equal(colorFor(70, config), 'yellow'); // only 70 > 50 matches
  assert.equal(colorFor(50, config), null); // 50 is not strictly greater than 50
});

test('multiple less-than thresholds pick the lowest matching bound', () => {
  const config: ThresholdConfig[] = [
    { value: 40, operator: '<', color: 'blue' },
    { value: 60, operator: '<=', color: 'green' },
    { value: 70, operator: '<=', color: 'orange' },
  ];

  assert.equal(colorFor(38, config), 'blue'); // 38 < 40 wins over the wider bands
  assert.equal(colorFor(55, config), 'green');
  assert.equal(colorFor(65, config), 'orange');
  assert.equal(colorFor(75, config), null);
});

test('greater-than bands are evaluated before less-than bands', () => {
  // A value satisfying both a ">=" and a "<" band resolves to the ">=" band.
  const config: ThresholdConfig[] = [
    { value: 100, operator: '<', color: 'green' },
    { value: 60, operator: '>=', color: 'red' },
  ];

  assert.equal(colorFor(75, config), 'red');
});

test("equality thresholds are checked last", () => {
  const config: ThresholdConfig[] = [
    { value: 60, operator: '>=', color: 'red' },
    { value: 20, operator: '==', color: 'purple' },
  ];

  assert.equal(colorFor(20, config), 'purple');
  assert.equal(colorFor(65, config), 'red');
  assert.equal(colorFor(21, config), null);
});

test('operator whitespace is tolerated', () => {
  const config: ThresholdConfig[] = [
    { value: 60, operator: ' >= ' as ThresholdConfig['operator'], color: 'red' },
  ];

  assert.equal(colorFor(70, config), 'red');
});

test('carries text_color and font_weight from the matched threshold', () => {
  const config: ThresholdConfig[] = [
    { value: 60, operator: '>=', color: 'red', text_color: 'white', font_weight: 'bold' },
  ];

  assert.deepEqual(evaluateThresholds(70, config), {
    backgroundColor: 'red',
    textColor: 'white',
    fontWeight: 'bold',
  });
});
