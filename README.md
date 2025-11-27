# Indicator Grid Card

A Home Assistant Lovelace card that displays a customizable grid of indicator lights, similar to an aircraft cockpit panel. Each indicator shows the state of an entity with configurable colors, text, and behavior.

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

<img width="514" height="221" alt="Screenshot 2025-11-26 at 21 49 21" src="https://github.com/user-attachments/assets/2b24bb82-c2b8-4163-ad46-28e2340b2bbf" />

<img width="248" height="66" alt="Screenshot 2025-11-26 at 21 50 17" src="https://github.com/user-attachments/assets/e2283e61-1cf6-4fad-9b31-373cec20bed8" />


## Features

- **Customizable Grid**: Define any number of rows and columns
- **Entity State Colors**: Automatically color indicators based on entity state
- **Threshold Support**: Set color thresholds for numeric sensors (e.g., temperature ranges)
- **Custom State Mapping**: Map specific states to specific colors
- **Flexible Text Display**: Show entity names, states, or custom text
- **Click Actions**: Toggle entities or show more info on click
- **Global & Per-Entity Settings**: Set defaults globally and override per entity
- **Visual Editor Support**: Configure everything through the Home Assistant UI
- **Empty Cells**: Support for blank cells in your grid

## Installation

### HACS (Recommended)

1. Open HACS in your Home Assistant instance
2. Go to "Frontend"
3. Click the menu (three dots) in the top right
4. Select "Custom repositories"
5. Add this repository URL and select "Lovelace" as the category
6. Click "Install"
7. Restart Home Assistant

### Manual Installation

1. Download `indicator-grid-card.js` from the [latest release](https://github.com/sxdjt/ha-indicator-grid/releases)
2. Copy it to `config/www/indicator-grid-card.js`
3. Add the resource to your Lovelace configuration:

```yaml
resources:
  - url: /local/indicator-grid-card.js
    type: module
```

4. Restart Home Assistant

## Configuration

### Minimal Example

```yaml
type: custom:indicator-grid-card
columns: 3
rows: 2
entities:
  - entity: light.kitchen
  - entity: light.living_room
  - entity: switch.fan
  - entity: binary_sensor.door
  - {} # Empty cell
  - entity: sensor.temperature
```

### Full Example

```yaml
type: custom:indicator-grid-card
columns: 4
rows: 3
cell_width: 25%  # Auto-sizes to fill width
cell_height: 120px
cell_gap: 8px
font_size: 18px
font_weight: bold
unavailable_text: OFFLINE
dim_off_text: 50  # Dim "off" entities to 50% opacity
global_colors:
  on: '#00FF00'
  off: '#404040'
  unavailable: '#FFA500'
  text: white
entities:
  - entity: light.kitchen
    text: KITCHEN
  - entity: light.living_room
    text: LIVING RM
    colors:
      on: blue
      off: gray
  - entity: sensor.temperature
    text_template: '{{ state }}°C'
    colors:
      thresholds:
        - value: 18
          color: blue
        - value: 22
          color: green
        - value: 26
          color: orange
        - value: 30
          color: red
  - entity: binary_sensor.motion
    text: MOTION
    colors:
      states:
        'on': red
        'off': green
  - {} # Empty cell
  - entity: switch.pump
    text: PUMP
    click_action: toggle
```

## Configuration Options

### Card Options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `type` | string | **required** | Must be `custom:indicator-grid-card` |
| `columns` | number | `3` | Number of columns in the grid |
| `rows` | number | `2` | Number of rows in the grid |
| `cell_width` | string | auto (100%) | Width of each cell (e.g., `100px`, `25%`, blank for auto) |
| `cell_height` | string | `100px` | Height of each cell (e.g., `100px`, `10vh`) |
| `cell_gap` | string | `5px` | Gap between cells (e.g., `5px`, `0.5rem`) |
| `font_size` | string | `16px` | Font size for text (CSS units) |
| `font_weight` | string/number | `bold` | Font weight for text |
| `unavailable_text` | string | `INOP` | Text to display for unavailable entities |
| `dim_off_text` | number | none | Opacity percentage (0-100) for text when entity is "off" (e.g., `50` for 50% opacity) |
| `global_colors` | object | see below | Global color configuration |
| `entities` | list | **required** | List of entity configurations |

### Global Colors

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `on` | string | `green` | Color when entity is "on" |
| `off` | string | `gray` | Color when entity is "off" |
| `unavailable` | string | `orange` | Color when entity is unavailable |
| `text` | string | `white` | Text color |
| `states` | object | - | Map specific states to colors |
| `thresholds` | list | - | Threshold configuration for numeric values |

### Entity Configuration

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `entity` | string | - | Entity ID (omit for blank cell) |
| `text` | string | entity name | Custom static text to display |
| `text_template` | string | - | Template for dynamic text (use `{{ state }}` for state) |
| `click_action` | string | auto | Action on click: `toggle`, `more-info`, or `none` |
| `dim_off_text` | number | - | Per-entity override for dim_off_text (0-100) |
| `colors` | object | - | Per-entity color overrides |

### Color Configuration

Colors can be specified as:
- CSS color names: `red`, `green`, `blue`
- Hex codes: `#FF0000`, `#00FF00`
- RGB: `rgb(255, 0, 0)`
- RGBA: `rgba(255, 0, 0, 0.5)`

#### State Mapping

```yaml
colors:
  states:
    'home': green
    'away': red
    'not_home': orange
```

#### Thresholds (for numeric sensors)

```yaml
colors:
  thresholds:
    - value: 50
      color: blue
      operator: '<'
    - value: 80
      color: green
      operator: '<='
    - value: 100
      color: red
      operator: '>'
```

Operators: `<`, `<=`, `>`, `>=`, `==` (default: `<=`)

## Usage Tips

1. **Empty Cells**: To create a blank space in your grid, add an empty object `{}` in the entities list
2. **Cell Order**: Entities fill the grid left-to-right, top-to-bottom in the order listed
3. **Text Templates**: Use `{{ state }}` for entity state and `{{ name }}` for entity name
4. **Click Behavior**: By default, lights/switches toggle and sensors show more-info
5. **Responsive Sizing**: Leave `cell_width` blank or use percentages (e.g., `25%`) for responsive layouts that adapt to screen size. Use fixed pixels (e.g., `100px`) for precise control

## Examples

### System Status Panel

```yaml
type: custom:indicator-grid-card
columns: 4
rows: 2
cell_height: 100px
entities:
  - entity: binary_sensor.internet
    text: INTERNET
  - entity: binary_sensor.nas
    text: NAS
  - entity: binary_sensor.camera_1
    text: CAM 1
  - entity: binary_sensor.camera_2
    text: CAM 2
  - entity: sensor.cpu_usage
    text_template: 'CPU {{ state }}%'
    colors:
      thresholds:
        - value: 50
          color: green
        - value: 80
          color: orange
        - value: 100
          color: red
  - entity: sensor.memory_usage
    text_template: 'MEM {{ state }}%'
    colors:
      thresholds:
        - value: 50
          color: green
        - value: 80
          color: orange
        - value: 100
          color: red
```

### Room Lighting Control

```yaml
type: custom:indicator-grid-card
columns: 3
rows: 3
cell_height: 80px
global_colors:
  on: '#FFD700'
  off: '#2C2C2C'
entities:
  - entity: light.kitchen
    text: KITCHEN
  - entity: light.living_room
    text: LIVING
  - entity: light.bedroom
    text: BEDROOM
  - entity: light.bathroom
    text: BATH
  - entity: light.hallway
    text: HALL
  - entity: light.outside
    text: OUTSIDE
```

## Troubleshooting

**Card not showing**: Make sure you've added the resource and restarted Home Assistant

**Colors not working**: Check that color values are valid CSS colors

**Entities not updating**: Verify entity IDs are correct and entities exist in Home Assistant

## Support

For bugs and feature requests, please [open an issue](https://github.com/sxdjt/ha-indicator-grid/issues).

## License

MIT License - see [LICENSE](LICENSE) file for details
