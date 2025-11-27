import { LovelaceCardConfig } from 'custom-card-helpers';

export interface IndicatorGridCardConfig extends LovelaceCardConfig {
  type: string;
  columns: number;
  rows: number;
  cell_size?: number; // Deprecated: Use cell_width and cell_height instead
  cell_width?: string; // e.g., "100px", "25%", blank defaults to auto (100% / columns)
  cell_height?: string; // e.g., "100px", "10vh"
  cell_gap?: string; // Gap between cells, e.g., "5px", "1rem"
  font_size?: string; // e.g., "14px", "1rem"
  font_weight?: string | number; // e.g., "bold", 700
  entities: EntityConfig[];
  global_colors?: ColorConfig;
  unavailable_text?: string;
}

export interface EntityConfig {
  entity?: string; // Entity ID, omit for blank cell
  text?: string; // Custom text to display, defaults to entity friendly name
  text_template?: string; // Template for dynamic text
  colors?: ColorConfig; // Per-entity color overrides
  click_action?: 'toggle' | 'more-info' | 'none';
}

export interface ColorConfig {
  on?: string; // Color when entity is "on"
  off?: string; // Color when entity is "off"
  unavailable?: string; // Color when entity is unavailable/unknown
  text?: string; // Text color
  states?: Record<string, string>; // Map specific state values to colors
  thresholds?: ThresholdConfig[]; // For numeric values
}

export interface ThresholdConfig {
  value: number; // Threshold value
  color: string; // Color to use when below this threshold
  operator?: '<' | '<=' | '>' | '>=' | '=='; // Comparison operator, defaults to '<='
}

export interface IndicatorCell {
  entity?: string;
  displayText: string;
  backgroundColor: string;
  textColor: string;
  state?: string;
  clickable: boolean;
  clickAction: 'toggle' | 'more-info' | 'none';
}
