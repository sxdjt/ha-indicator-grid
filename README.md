# Indicator Grid Card

A Home Assistant Lovelace card that displays a customizable grid of indicator lights, similar to an aircraft cockpit panel. Each indicator shows the state of an entity with configurable colors, text, and behavior.

![GitHub Release](https://img.shields.io/github/v/release/sxdjt/ha-indicator-grid?style=for-the-badge)
![GitHub License](https://img.shields.io/github/license/sxdjt/ha-indicator-grid?style=for-the-badge)
[![AI Assisted](https://img.shields.io/badge/AI-Claude%20Code-AAAAAA.svg?style=for-the-badge)](https://claude.ai/code)

**Default:**

<img width="476" height="506" alt="Screenshot 2025-11-29 at 22 33 15" src="https://github.com/user-attachments/assets/b7e28496-602b-4c5d-abe3-4866945c924f" />


**With ```show_icons``` enabled:**

<img width="475" height="505" alt="Screenshot 2025-11-29 at 22 35 57" src="https://github.com/user-attachments/assets/453f8158-7eb6-47fe-973e-a775d19143de" />


## Features

- **Customizable Grid**: Define any number of rows and columns
- **Header Rows**: Add header rows at any position with configurable colspan and styling
- **Entity State Colors**: Automatically color indicators based on entity state
- **Threshold Support**: Set color, text color, and font weight thresholds for numeric sensors (e.g., temperature ranges with custom styling)
- **Custom State Mapping**: Map specific states to specific colors
- **Icon Support**: Display entity icons with configurable size and placement (above, below, left, right)
- **Global & Per-Entity Settings**: Set defaults globally and override per entity

## Installation

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=sxdjt&repository=ha-indicator-grid)


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
cell_width: 25%  # Auto-sizes to fill width (percentages supported)
cell_height: 120  # Numbers auto-convert to px ("120px")
cell_gap: 8       # Numbers auto-convert to px ("8px")
font_size: 18     # Numbers auto-convert to px ("18px")
font_weight: bold
unavailable_text: OFFLINE
dim_off_text: 50  # Dim "off" entities to 50% opacity
decimals: 1  # Show 1 decimal place for numeric sensors
show_icons: true  # Enable icons globally
icon_placement: above  # Icons above text
icon_size: 28     # Numbers auto-convert to px ("28px")
global_colors:
  on: '#00FF00'
  off: '#404040'
  unavailable: '#FFA500'
  text: white
  blank: '#1a1a1a'  # Dark color for blank cells
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
    icon:
      on: mdi:pump
      off: mdi:pump-off
  - entity: sensor.humidity
    text_template: '{{ state }}%'
    decimals: 0  # Override global, no decimals for humidity
    show_icon: false  # Override global setting, hide icon for this entity
```

### Header Rows Example

```yaml
type: custom:indicator-grid-card
columns: 5
rows: 6
cell_height: 100
header_rows:
  - row_index: 0  # First row is a header
    cells:
      - text: Living Room
        colspan: 3
        text_align: center
      - text: Bedroom
        colspan: 2
  - row_index: 3  # Fourth row is a header
    cells:
      - text: Basement
        colspan: 5
        font_size: 20
        background_color: '#1a1a1a'
entities:
  # Only need entities for non-header rows (4 rows x 5 columns = 20 entities)
  - entity: light.living_room_1
  - entity: light.living_room_2
  # ... etc
```

### Table Layout with Row Labels Example

```yaml
type: custom:indicator-grid-card
columns: 3
rows: 4
cell_height: 40
cell_gap: 4
font_weight: normal
global_colors:
  "off": "#1a1a1a"
  text: white
header_rows:
  - row_index: 0
    cells:
      - text: Room
        text_align: left
      - text: Temp
      - text: Humidity
entities:
  # Row 1: Kitchen
  - text: Kitchen
    text_align: left
  - entity: sensor.kitchen_temperature
    text_template: "{{ state }}F"
  - entity: sensor.kitchen_humidity
    text_template: "{{ state }}%"
  # Row 2: Bedroom
  - text: Bedroom
    text_align: left
  - entity: sensor.bedroom_temperature
    text_template: "{{ state }}F"
  - entity: sensor.bedroom_humidity
    text_template: "{{ state }}%"
  # Row 3: Garage
  - text: Garage
    text_align: left
  - entity: sensor.garage_temperature
    text_template: "{{ state }}F"
  - entity: sensor.garage_humidity
    text_template: "{{ state }}%"
```

## Configuration Options

### Card Options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `type` | string | **required** | Must be `custom:indicator-grid-card` |
| `columns` | number | `3` | Number of columns in the grid |
| `rows` | number | `2` | Number of rows in the grid |
| `cell_width` | string/number | auto (100%) | Width of each cell (e.g., `100`, `"100px"`, `"25%"`, blank for auto) |
| `cell_height` | string/number | `100` | Height of each cell (e.g., `100` or `"100px"`) - numbers auto-convert to px |
| `cell_gap` | string/number | `5` | Gap between cells (e.g., `5` or `"5px"`) - numbers auto-convert to px |
| `font_size` | string/number | `16` | Font size for text (e.g., `16` or `"16px"`) - numbers auto-convert to px |
| `font_weight` | string/number | `bold` | Font weight for text |
| `unavailable_text` | string | `INOP` | Text to display for unavailable entities |
| `dim_off_text` | number | none | Opacity percentage (0-100) for text when entity is "off" (e.g., `50` for 50% opacity) |
| `decimals` | number | none | Number of decimal places for numeric sensors (0-10, e.g., `2` shows "72.50") |
| `show_icons` | boolean | `false` | Enable/disable icons globally |
| `icon_placement` | string | `above` | Icon placement: `above`, `below`, `left`, or `right` |
| `icon_size` | string/number | `24` | Icon size (e.g., `24` or `"24px"`) - numbers auto-convert to px |
| `global_colors` | object | see below | Global color configuration |
| `header_rows` | list | - | List of header row configurations |
| `entities` | list | **required** | List of entity configurations |

### Global Colors

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `on` | string | `green` | Color when entity is "on" |
| `off` | string | `gray` | Color when entity is "off" |
| `unavailable` | string | `orange` | Color when entity is unavailable |
| `text` | string | `white` | Text color |
| `blank` | string | `#333333` | Background color for blank cells |
| `states` | object | - | Map specific states to colors |
| `thresholds` | list | - | Threshold configuration for numeric values |

### Entity Configuration

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `entity` | string | - | Entity ID (omit for blank cell or text-only cell) |
| `text` | string | entity name | Custom static text to display (works without entity for text-only cells) |
| `text_template` | string | - | Template for dynamic text (use `{{ state }}` for state) |
| `text_align` | string | `center` | Text alignment: `left`, `center`, or `right` |
| `colspan` | number | `1` | Number of columns this cell spans |
| `click_action` | string | auto | Action on click: `toggle`, `more-info`, or `none` |
| `dim_off_text` | number | - | Per-entity override for dim_off_text (0-100) |
| `decimals` | number | - | Per-entity override for decimals (0-10) |
| `show_icon` | boolean | - | Override global `show_icons` setting for this entity |
| `icon` | object | - | Custom icon configuration (on/off states) |
| `colors` | object | - | Per-entity color overrides |

### Header Row Configuration

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `row_index` | number | **required** | Which row this header occupies (0-based, 0 = first row) |
| `cells` | list | **required** | List of header cell configurations |

### Header Cell Configuration

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `text` | string | **required** | Text to display in header |
| `colspan` | number | `1` | Number of columns this cell spans |
| `text_align` | string | `center` | Text alignment: `left`, `center`, or `right` |
| `font_size` | string/number | card default | Font size override (e.g., `20` or `"20px"`) - numbers auto-convert to px |
| `font_weight` | string/number | card default | Font weight override (e.g., `bold`, `600`) |
| `text_color` | string | global text | Text color override |
| `background_color` | string | global blank | Background color override |

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
      text_color: white       # Optional: override text color for this threshold
      font_weight: normal     # Optional: override font weight for this threshold
    - value: 80
      color: green
      operator: '<='
      text_color: black
      font_weight: bold
    - value: 100
      color: red
      operator: '>'
      text_color: yellow
      font_weight: bold
```

Operators: `<`, `<=`, `>`, `>=`, `==` (default: `<=`)

**NEW in v1.3.0**: Thresholds can now customize text appearance with `text_color` and `font_weight` in addition to background `color`. This allows for better visual hierarchy and readability when values cross important thresholds.

#### Icons

Icons are displayed from the entity's default icon or can be customized per state:

```yaml
# Enable icons globally
show_icons: true
icon_placement: above  # above, below, left, or right
icon_size: 28

# Per-entity custom icons
entities:
  - entity: light.bedroom
    icon:
      on: mdi:lightbulb-on
      off: mdi:lightbulb-off
  - entity: switch.fan
    show_icon: false  # Hide icon for this entity only
```

**Icon hierarchy:**
1. If `show_icon` is set on entity, use that value
2. Otherwise, use global `show_icons` setting
3. If enabled, use entity's custom `icon.on/off` if defined
4. Otherwise, use entity's default icon from Home Assistant
5. If no icon available, fall back to domain-based default

## Usage Tips

1. **Simplified Configuration**: Size values can be specified as numbers (auto-convert to `px`) or strings. For example, `cell_height: 100` is equivalent to `cell_height: "100px"`
2. **Blank Cells**: Create blank spaces with `{}`. Customize their color with `global_colors.blank` or per-cell with `colors.blank`
3. **Cell Order**: Entities fill the grid left-to-right, top-to-bottom in the order listed
4. **Text Templates**: Use `{{ state }}` for entity state and `{{ name }}` for entity name
5. **Icons**: Enable globally with `show_icons: true`, then customize placement, size, and per-entity icons
6. **Click Behavior**: By default, lights/switches toggle and sensors show more-info
7. **Responsive Width**: Leave `cell_width` blank or use percentages (e.g., `25%`) for responsive layouts. Use pixels (e.g., `100` or `"100px"`) for fixed widths
8. **Cell Height**: Use pixel values for `cell_height` (e.g., `100` or `"100px"`). The card automatically calculates its total height to prevent overlapping with cards below

## Support

For bugs and feature requests, please [open an issue](https://github.com/sxdjt/ha-indicator-grid/issues).

## License

MIT License - see [LICENSE](LICENSE) file for details
