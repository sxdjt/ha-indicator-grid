# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a Home Assistant custom Lovelace card called "Indicator Grid Card". It displays a customizable grid of indicator lights (similar to an aircraft cockpit panel) showing entity states with configurable colors, text, and click actions.

**Tech Stack:**
- TypeScript + lit-element (Web Components)
- Rollup for bundling
- Designed for HACS distribution
- Includes visual editor support for Home Assistant UI configuration

## Project Structure

```
/
├── src/
│   ├── indicator-grid-card.ts  # Main card component
│   ├── editor.ts                # Visual editor component
│   └── types.ts                 # TypeScript type definitions
├── dist/                        # Build output (git-ignored)
│   └── indicator-grid-card.js   # Bundled card file
├── package.json                 # Dependencies and scripts
├── tsconfig.json                # TypeScript configuration
├── rollup.config.js             # Rollup bundler config
├── hacs.json                    # HACS metadata
└── README.md                    # User documentation
```

## Development Commands

### Initial Setup
```bash
npm install
```

### Build
```bash
npm run build          # One-time build
npm run watch          # Watch mode with auto-rebuild
```

### Linting
```bash
npm run lint
```

### Testing the Card
After building, copy `dist/indicator-grid-card.js` to your Home Assistant `config/www/` directory and add it as a resource in Lovelace.

## Architecture

### Main Card Component (indicator-grid-card.ts)

The `IndicatorGridCard` class extends `LitElement` and implements the card logic:

- **State Management**: Subscribes to Home Assistant entity states via `hass` property
- **Grid Rendering**: Creates a CSS Grid with configurable rows/columns
- **Cell Computation**: For each cell, determines:
  - Display text (entity name, custom text, or template)
  - Background color (based on state, thresholds, or mappings)
  - Text color
  - Click behavior (toggle, more-info, or none)
- **Color Resolution**: Hierarchical color selection:
  1. Per-entity color overrides
  2. Global color settings
  3. Hard-coded defaults
- **Threshold Support**: Numeric sensors can have color thresholds (e.g., <50=blue, 50-80=green, >80=red)
- **State Mapping**: Arbitrary state values can map to specific colors

### Visual Editor (editor.ts)

The `IndicatorGridCardEditor` provides UI for configuration:

- Grid settings (rows, columns, cell size, gaps)
- Font settings (size, weight)
- Global color defaults
- Per-entity configuration (entity picker, text, colors, click actions)
- Dynamically shows cell positions based on grid dimensions

### Type Definitions (types.ts)

Key interfaces:
- `IndicatorGridCardConfig`: Main card configuration
- `EntityConfig`: Per-entity settings
- `ColorConfig`: Color configuration with thresholds and state mappings
- `IndicatorCell`: Computed cell data for rendering

## Configuration Features

### Global + Per-Entity Settings
Users can set global defaults and override them per entity. This applies to:
- Colors (on, off, unavailable, text)
- Click actions
- State-to-color mappings
- Numeric thresholds

### Color Resolution Priority
1. Entity-specific state mapping
2. Global state mapping
3. Entity-specific thresholds
4. Global thresholds
5. Entity-specific on/off colors
6. Global on/off colors
7. Hard-coded defaults

### Text Display Options
1. Static custom text
2. Simple templates with `{{ state }}` and `{{ name }}`
3. Entity friendly name (default)

### Click Behavior
- **Auto**: Determines action based on domain (toggle for lights/switches, more-info for sensors)
- **Toggle**: Explicitly toggle the entity
- **More-info**: Open Home Assistant more-info dialog
- **None**: No interaction

## Build Process

Rollup bundles TypeScript source into a single ES module:
1. Resolves npm dependencies (lit, custom-card-helpers)
2. Compiles TypeScript to JavaScript
3. Bundles into single file
4. Minifies with Terser
5. Outputs to `dist/indicator-grid-card.js`

## HACS Integration

The card is designed for HACS distribution:
- `hacs.json` defines the card name and filename
- GitHub releases should include built `dist/indicator-grid-card.js`
- Users install via HACS which downloads from releases

## Common Modifications

### Adding New Color Types
1. Update `ColorConfig` interface in `types.ts`
2. Add to default colors in `indicator-grid-card.ts` (`setConfig` method)
3. Add UI input in `editor.ts` (both global and per-entity sections)
4. Update color resolution logic in `_getColor` method

### Adding New Click Actions
1. Add action type to `EntityConfig.click_action` in `types.ts`
2. Handle action in `_handleClick` method
3. Add option to editor dropdown in `editor.ts`

### Enhancing Templates
Currently templates support simple `{{ state }}` and `{{ name }}` replacement. To add more sophisticated templating:
1. Consider integrating a template library (e.g., nunjucks)
2. Update `_getDisplayText` method to use the library
3. Document new template syntax in README

### Styling Improvements
CSS is in the `static get styles()` method of each component. Key areas:
- `.grid-container`: Grid layout
- `.cell`: Individual cell styling
- `.clickable`: Hover/active states
- Editor styles in `editor.ts`
