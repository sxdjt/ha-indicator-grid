# Tests

Run with `npm test`: it rebuilds `dist/` with rollup, then runs every `src/*.test.ts` file with Node's built-in test runner (Node strips the TypeScript types). `jsdom` is a dev dependency; nothing here ships with the card.

`npm test` runs under `scripts/run-capped.sh`, which kills the run past 1 GB of memory or 60 seconds. IMPORTANT: never pass a DOM node to `assert`; a failing assertion inspects the node and can grow memory without bound. Assert on strings, numbers and booleans.

## How it works

The card and editor tests load `dist/indicator-grid-card.js`, the bundle Home Assistant loads, into a jsdom window. Methods are driven on bare instances (`Object.create(prototype)`) or on mounted elements. `thresholds.test.ts` imports `src/thresholds.ts` directly.

Home Assistant's own elements (`ha-selector`, `ha-form`, `ha-button`, ...) are not defined, so they are plain elements: tests set their properties, fire `value-changed`, and record what the editor asks to focus (`ha-button` cannot take focus in jsdom).

## Coverage

```bash
npm run coverage
```

Every function and branch of `src/indicator-grid-card.ts` (62 functions, 348 branches) and `src/editor.ts` (101, 244) is covered, reported through the bundle's source maps. Line percentages under-report (imports, CSS, decorators map as uncovered).

`src/thresholds.ts` is loaded twice: as source by `thresholds.test.ts` and inside the bundle by the other files. Each copy is fully covered (check with `node --test --experimental-test-coverage src/thresholds.test.ts`, and with `src/card-coverage.test.ts` for the bundled copy), but the merged report pairs the two copies' functions imperfectly and shows phantom gaps for that file.

| File | Covers |
|------|--------|
| `thresholds.test.ts` | Threshold evaluation: operators, ordering, mixed ladders |
| `indicator-grid-card.test.ts` | Config defaults, colors, text, templates, icons, clicks, `shouldUpdate`, rendering, header rows, review sweep fixes |
| `card-coverage.test.ts` | Fallback branches: card picker, sizing, template variables and filters, color resolution, dimmed text, header cells, thresholds through the bundle |
| `editor.test.ts` | Every editor field and handler, threshold and state color rows, header rows, per-entity Show Icon, entity positions |
