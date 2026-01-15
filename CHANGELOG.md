# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
