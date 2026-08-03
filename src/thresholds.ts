import type { ThresholdConfig } from './types';

/**
 * Styles resolved from a matching threshold. Mirrors the fields the card
 * applies to a cell: background color, text color, and font weight. Any field
 * may be undefined when the threshold does not specify it.
 */
export interface ThresholdStyles {
  backgroundColor?: string;
  textColor?: string;
  fontWeight?: string | number;
}

// Operator applied when a threshold omits one. Matches the documented default
// so existing "value only" ladders keep behaving as a series of "<=" bands.
const DEFAULT_OPERATOR = '<=';

/**
 * Returns the threshold's comparison operator, defaulting to '<=' and trimming
 * stray whitespace so a value like '>= ' still matches a known operator.
 */
function normalizeOperator(threshold: ThresholdConfig): string {
  return (threshold.operator ?? DEFAULT_OPERATOR).trim();
}

/**
 * Tests whether `value` satisfies a single threshold's comparison.
 * An unrecognized operator never matches.
 */
function matchesThreshold(value: number, threshold: ThresholdConfig): boolean {
  switch (normalizeOperator(threshold)) {
    case '<':
      return value < threshold.value;
    case '<=':
      return value <= threshold.value;
    case '>':
      return value > threshold.value;
    case '>=':
      return value >= threshold.value;
    case '==':
      return value === threshold.value;
    default:
      return false;
  }
}

/** Extracts the display styles carried by a matched threshold. */
function stylesFor(threshold: ThresholdConfig): ThresholdStyles {
  return {
    backgroundColor: threshold.color,
    textColor: threshold.text_color,
    fontWeight: threshold.font_weight,
  };
}

/**
 * Resolves the styles for the first threshold that matches `value`, using
 * operator-aware ordering so mixed operators resolve the way a user intuitively
 * expects. Evaluation happens in three passes:
 *
 *   1. Greater-than thresholds ('>', '>=') are checked highest value first, so
 *      the tightest lower bound wins (e.g. '>=60' is preferred over '>=0').
 *   2. Less-than thresholds ('<', '<=') are checked lowest value first, so the
 *      tightest upper bound wins (e.g. '<40' is preferred over '<60').
 *   3. Equality thresholds ('==') are checked last.
 *
 * A plain ascending ladder of default '<=' thresholds still resolves exactly as
 * before, since every band lands in the less-than pass in ascending order.
 *
 * Returns null when no threshold matches, letting the caller fall back to other
 * color sources.
 */
export function evaluateThresholds(
  value: number,
  thresholds?: ThresholdConfig[]
): ThresholdStyles | null {
  if (!thresholds || thresholds.length === 0) {
    return null;
  }

  const isGreaterThan = (threshold: ThresholdConfig): boolean => {
    const operator = normalizeOperator(threshold);
    return operator === '>' || operator === '>=';
  };
  const isLessThan = (threshold: ThresholdConfig): boolean => {
    const operator = normalizeOperator(threshold);
    return operator === '<' || operator === '<=';
  };
  const isEqual = (threshold: ThresholdConfig): boolean => {
    return normalizeOperator(threshold) === '==';
  };

  // Greater-than: largest value first so the strictest lower bound wins.
  const greaterThan = thresholds
    .filter(isGreaterThan)
    .sort((first, second) => second.value - first.value);

  // Less-than: smallest value first so the strictest upper bound wins.
  const lessThan = thresholds
    .filter(isLessThan)
    .sort((first, second) => first.value - second.value);

  // Equality: order does not matter, checked last.
  const equal = thresholds.filter(isEqual);

  for (const threshold of [...greaterThan, ...lessThan, ...equal]) {
    if (matchesThreshold(value, threshold)) {
      return stylesFor(threshold);
    }
  }

  return null;
}
