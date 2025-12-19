import { LovelaceCardConfig } from 'custom-card-helpers';

export interface IndicatorGridCardConfig extends LovelaceCardConfig {
  type: string;
  columns: number;
  rows: number;
  cell_size?: number; // Deprecated: Use cell_width and cell_height instead
  cell_width?: string | number; // e.g., "100px", 100 (auto-converts to px)
  cell_height?: string | number; // e.g., "100px", 100 (auto-converts to px)
  cell_gap?: string | number; // Gap between cells, e.g., "5px", 5 (auto-converts to px)
  font_size?: string | number; // e.g., "14px", 14 (auto-converts to px)
  font_weight?: string | number; // e.g., "bold", 700
  dim_off_text?: number; // Opacity percentage (0-100) for text when entity is off, e.g., 50
  decimals?: number; // Number of decimal places for numeric states (0-10), e.g., 2
  show_icons?: boolean; // Enable/disable icons globally (default false)
  icon_placement?: 'none' | 'above' | 'below' | 'left' | 'right'; // Global icon placement
  icon_size?: string | number; // Icon size, e.g., "24px", 24 (auto-converts to px)
  entities: EntityConfig[];
  global_colors?: ColorConfig;
  unavailable_text?: string;
  header_rows?: HeaderRowConfig[]; // Optional header rows
}

export interface EntityConfig {
  entity?: string; // Entity ID, omit for blank cell
  text?: string; // Custom text to display, defaults to entity friendly name
  text_template?: string; // Template for dynamic text
  colors?: ColorConfig; // Per-entity color overrides
  show_icon?: boolean; // Per-entity override to show/hide icon
  icon?: IconConfig; // Per-entity custom icon (on/off states)
  click_action?: 'toggle' | 'more-info' | 'none';
  dim_off_text?: number; // Per-entity override for dim_off_text
  decimals?: number; // Per-entity override for decimals (0-10)
  colspan?: number; // Number of columns to span (default: 1) - BETA feature
}

export interface ColorConfig {
  on?: string; // Color when entity is "on"
  off?: string; // Color when entity is "off"
  unavailable?: string; // Color when entity is unavailable/unknown
  text?: string; // Text color
  blank?: string; // Color for blank cells (no entity assigned)
  states?: Record<string, string>; // Map specific state values to colors
  thresholds?: ThresholdConfig[]; // For numeric values
}

export interface IconConfig {
  on?: string; // Icon for "on" state (e.g., "mdi:lightbulb-on")
  off?: string; // Icon for "off" state (e.g., "mdi:lightbulb-off")
}

export interface ThresholdConfig {
  value: number; // Threshold value
  color: string; // Color to use when below this threshold
  operator?: '<' | '<=' | '>' | '>=' | '=='; // Comparison operator, defaults to '<='
  text_color?: string; // Text color override for this threshold
  font_weight?: string | number; // Font weight override for this threshold
}

export interface IndicatorCell {
  entity?: string;
  displayText: string;
  backgroundColor: string;
  textColor: string;
  textOpacity: number;
  fontWeight?: string | number; // Font weight override from threshold
  icon?: string; // Icon to display (if any)
  state?: string;
  clickable: boolean;
  clickAction: 'toggle' | 'more-info' | 'none';
  colspan?: number; // Number of columns to span (default: 1) - BETA feature
}

export interface HeaderRowConfig {
  row_index: number; // Which row this header occupies (0-based)
  cells: HeaderCellConfig[]; // Header cells in this row
}

export interface HeaderCellConfig {
  text: string; // Text to display in header
  colspan?: number; // Number of columns to span (default: 1)
  text_align?: 'left' | 'center' | 'right'; // Text alignment (default: center)
  font_size?: string | number; // Font size override, e.g., "14px", 14 (auto-converts to px)
  font_weight?: string | number; // Font weight override (default: card font_weight)
  text_color?: string; // Text color override (default: global_colors.text)
  background_color?: string; // Background color override (default: global_colors.blank)
}
