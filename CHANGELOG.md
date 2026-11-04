# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Behavioural test suite for the card class (`src/indicator-grid-card.test.ts`, 106 tests) covering sizing, color resolution, numeric formatting, templates and filters, cell computation, icons, `shouldUpdate`, and rendering (colspan, text-only, unavailable, and header cells). Tests load the built bundle in jsdom, so `npm test` now runs `rollup -c` first. Running the tests requires Node 22.6+ (native TypeScript type stripping).

### Security
- Updated development dependencies to resolve Dependabot and `npm audit` advisories. None of these packages are bundled into the card, so the shipped JS is unchanged:
  - undici 8.10.0 -> 8.12.3 (via jsdom): TLS certificate validation bypass in BalancedPool, cross-origin cache poisoning, cross-user cookie disclosure via shared caches, RetryHandler denial of service, retry-interceptor response splitting, dump-interceptor response truncation, and caching of unsafe-method responses. 8.12.3 additionally fixes TLS certificate validation bypass via dropped tls options in Agent (GHSA-2m5v-pch6-74hx), denial of service via TLS 1.2 certificate-changing renegotiation (GHSA-qrxm-fqhp-jwvm), denial of service via excessive content-encodings (GHSA-xjj6-f33q-929c), and unbounded WebSocket PONG buffering (GHSA-9fm3-97px-rjf6).
  - source-map-js 1.2.1 -> 1.2.2 (via jsdom): event-loop denial of service through indexed source-map section offsets (GHSA-68fv-2mgg-jv7q).
  - brace-expansion 5.0.8 -> 5.0.12.
  - serialize-javascript 7.0.7 -> 7.1.4 (via @rollup/plugin-terser): cross-site scripting via unescaped `</script` at the end of a serialized function body (GHSA-m5mm-p8h7-m29v).

## [2026.8.3] - 2026-08-03

### Fixed
- Threshold colors with mixed comparison operators now resolve correctly.
  Previously all thresholds were sorted by value and the first match won, so
  an open-ended low `>=` band could override a more specific higher band
  (e.g. a `>=0` band swallowing values that should have matched `>=60`).
  Greater-than bands (`>`, `>=`) are now evaluated highest-value first,
  less-than bands (`<`, `<=`) lowest-value first, and equality (`==`) last.
  Plain ascending `<=` ladders are unaffected. Thanks to @dmindfuse (#9, #10)
  for the diagnosis and fix.

## [2026.7.25] - 2026-07-25

### Changed
- Version-only release to correct a versioning mistake. This card was briefly switched from CalVer (`2026.x`) to SemVer (`1.x`) and back, which broke HACS update detection (HACS compares versions numerically, so `2026.x` outranks `1.x` and installs pinned to the earlier CalVer build stopped seeing new releases). Returning to CalVer with a later date restores a single monotonic version line so updates flow normally again. No functional changes to the card.

## [1.9.0] - 2026-07-20

### Fixed
- Sections view sizing: `getGridOptions()` now derives the number of section grid rows from the configured `rows`, `cell_height`, and `cell_gap` (using HA's 56px row height and 8px row gap) instead of a hardcoded value that clipped taller grids. Per-card `grid_options: rows: auto` workarounds are no longer needed.

### Changed
- Reverted to Semantic Versioning (`X.Y.Z`); this release follows `2026.7.6` and continues the pre-CalVer `1.8.0` line.

### Removed
- Internal cleanup: removed the unused `_getCells()` method, a duplicated size-normalization helper in `setConfig()`, and an unused editor state field. No behavior change.

## [2026.7.6] - 2026-07-06

### Added
- Card picker preview: added `preview: true` to card registration and updated `getStubConfig()` to accept the `hass` object, populating the grid with real binary sensor, switch, light, and input boolean entities for a meaningful preview thumbnail.

### Changed
- Adopted CalVer versioning (`YYYY.M.D`); this release follows 1.8.0.
- Updated dependencies: lit 3.3.2 -> 3.3.3 (bundled into the card), rollup 4.60.3 -> 4.62.2, eslint 10.3.0 -> 10.6.0, typescript-eslint 8.59.3 -> 8.63.0, @rollup/plugin-commonjs 29.0.2 -> 29.0.3.

## [1.8.0] - 2026-06-04

### Added
- Card suggestion support for HA 2026.6+: the card now appears in the "Community" section of the card picker when the user selects a `binary_sensor`, `switch`, `light`, or `input_boolean` entity.
- New template variables for `text_template`:
  - `unit` - shorthand for `attributes.unit_of_measurement`
  - `state_with_unit` - state value and unit combined, e.g. `105 degF`
  - `entity_id` - the entity's ID
  - `last_changed` - relative time since state last changed, e.g. `5 minutes ago`
  - `last_updated` - relative time since entity last updated

## [1.7.1] - 2026-05-13

### Fixed
- Replace deprecated `ha-textfield` with `ha-selector` in visual editor for compatibility with HA 2026.5.1+

## [1.7.0] - 2026-04-15

### Added
- **Template expressions in header cell text**: Header row `text` fields now support
  `{{ states('entity_id') }}` syntax to display live entity state values
  - Supports all existing filters: `{{ states('sensor.mode') | title }}`
  - Filters can be chained: `{{ states('sensor.precip_type') | upper | truncate(8) }}`
  - Card automatically re-renders when any header-referenced entity changes state
  - Example: `text: "PRECIP {{ states('sensor.tempest_precipitation_type') }}"`

### Fixed
- Sections view dashboard layout: added `getGridOptions()` for proper card sizing
- Card height calculation now uses `height: 100%` for correct sections view rendering

### Changed
- CI: updated Node.js from 18 to 20

### Documentation
- Added `grid_options: rows: auto` tip for sections view dashboards
- Documented template support for header cell `text` field

## [1.6.0] - 2026-03-31

### Added
- **Cross-entity references in templates**: Templates can now reference any entity's state using
  `states('entity_id')` syntax, enabling multi-entity cells from a single entity slot
  - Syntax: `{{ states('entity_id') }}`
  - Supports all existing filters: `{{ states('sensor.wind_dir') | round(0) }}`
  - Example: `text_template: "{{state|round(0)}} mph @ {{states('sensor.wind_dir')|round(0)}}"`
  - Card automatically re-renders when any template-referenced entity changes state

### Changed
- Updated all dependencies to latest versions (lit 3.3.2, rollup 4.60.1, typescript 6, eslint 9,
  typescript-eslint 8, all @rollup/plugin-* to latest majors, custom-card-helpers 2.0.0)
- Migrated ESLint config to flat config format (eslint.config.js) required by ESLint 9
- Updated TypeScript moduleResolution from deprecated `node` to `bundler`
- Updated softprops/action-gh-release GitHub Action to v2

### Fixed
- Removed unused `IconConfig` import in indicator-grid-card.ts

## [1.5.0] - 2026-03-09

### Added
- **Jinja2-style template filters for `text_template`**: The `text_template` field now supports
  a filter pipeline using `{{ variable | filter }}` syntax, compatible with common Jinja2 filters
  - Variables: `state`, `name`, `attributes.<attr>`
  - Filters: `upper`, `lower`, `title`, `round(n)`, `int`, `float`, `replace('a','b')`,
    `truncate(n)`, `default('value')`
  - Filters can be chained: `{{ state | upper | truncate(8) }}`
  - Example: `text_template: "Charging:\n {{ state | upper }}"`
  - Fully backward compatible with existing `{{ state }}` and `{{ name }}` templates

## [1.4.0] - 2026-01-14

### Added
- **Text Alignment for Entity Cells**: Control text alignment within entity cells
  - `text_align` property accepts `left`, `center`, or `right`
  - Works for all cell types: text-only cells, entity cells, and blank cells
  - Visual editor support with dropdown selector
  - Useful for creating table-like layouts with row labels

### Fixed
- **Text-only Cells**: Cells with `text` property but no `entity` now correctly display their text
  - Previously these cells appeared blank
  - Enables row labels and static text cells without requiring an entity

## [1.3.0] - 2025-12-18

### Added
- **Threshold Text Styling**: Thresholds can now customize text appearance beyond background color
  - `text_color` property for threshold-specific text colors
  - `font_weight` property for threshold-specific font weights
  - Enables better visual hierarchy when values cross important thresholds
  - Example: Display critical temperature readings in bold yellow text on red background

### Changed
- Threshold configuration now returns styling object instead of just background color
- Text color and font weight resolution includes threshold-based overrides

## [1.2.0] - 2025-12-06

### Added
- **Numeric Rounding Support**: Control decimal places for numeric sensor values
  - Global `decimals` setting (0-10) applies to all numeric sensors
  - Per-entity `decimals` override for individual sensors
  - Example: Show "72.5" instead of "72.456789" for temperature sensors
  - Visual editor support for configuring decimal places

### Changed
- Numeric sensor display now respects rounding configuration
- Updated documentation with decimal place examples

## [1.1.0] - 2025-12-01

### Added
- **Entity Column Spanning**: Entity cells can now span multiple columns
  - `colspan` property for entity cells (similar to header rows)
  - Enables flexible layouts with wide status displays
  - Mix different column widths in the same grid
  - Visual editor includes Column Span input field

### Fixed
- Phantom row issue when using colspan

### Removed
- Beta build configuration and files

## [1.0.0] - 2025-11-30

### Changed
- First stable release
- Version bump to 1.0.0 indicating production readiness

## [0.5.0] - 2025-11-29

### Added
- **Simplified Size Configuration**: Size values now accept numbers that auto-convert to pixels
  - Example: `cell_height: 100` automatically converts to `"100px"`
  - Works for all size properties: cell_height, cell_width, cell_gap, font_size, icon_size
  - Backward compatible with string format

### Fixed
- **Card Layout Issue**: Fixed overlapping with cards positioned below the indicator grid
  - Improved `getCardSize()` calculation to properly report height to Home Assistant
  - Added CSS positioning fixes to establish proper stacking context

### Changed
- Type definitions now accept `string | number` for size fields
- All default values use numbers instead of strings
- Documentation updated with simplified number syntax

### Removed
- **Breaking Change**: Removed support for percentage-based `cell_height` (only pixel values supported)
- Note: `cell_width` still supports percentages for responsive layouts

## [0.4.0] - 2025-11-28

### Added
- **Header Row Support**: Configurable header rows at any position in the grid
  - Header cells with colspan support for grouping
  - Text alignment options: left, center, right
  - Custom styling per header cell: font size, weight, color, background
  - Headers are non-clickable display elements
  - Visual editor support for header configuration

## [0.3.0] - 2025-11-28

### Added
- **Multi-line Unavailable Entity Display**: Improved display for unavailable entities
  - Entity name/custom text on first line
  - Status text (INOP or custom) on second line
  - Better visual clarity for error states
- Build timestamp added to output for version verification

## [0.2.0] - 2025-11-27

### Added
- **Icon Support**: Display entity icons with full customization
  - Global `show_icons` setting to enable/disable icons
  - Configurable icon placement: above, below, left, right
  - Configurable icon size
  - Per-entity `show_icon` override
  - Custom icons per state (`icon.on` / `icon.off`)
  - Icon hierarchy: entity override → global setting → custom state icons → HA default → domain fallback
- **Blank Cell Colors**: Configure background color for empty cells
  - Global `blank` color in `global_colors`
  - Per-cell color override

### Fixed
- Visual ghosting artifacts

## [0.1.1] - 2025-11-26

### Changed
- Optimized `shouldUpdate` lifecycle method to prevent unnecessary re-renders
- Performance improvements

## [0.1.0] - 2025-11-26

### Added
- Initial release of Indicator Grid Card
- Customizable grid layout (rows and columns)
- Entity state-based color indicators
- Threshold support for numeric sensors
- Custom state mapping (specific states to colors)
- Global and per-entity color configuration
- Click actions: toggle, more-info, none
- Auto-detection of click action based on domain
- Text templates with `{{ state }}` and `{{ name }}` placeholders
- Dim off text feature (opacity control for "off" entities)
- Visual configuration editor
- Blank cell support
- Responsive width with percentage support
- TypeScript + Lit 3 implementation
- HACS integration ready
