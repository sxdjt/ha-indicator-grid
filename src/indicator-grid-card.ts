import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, LovelaceCardEditor, fireEvent } from 'custom-card-helpers';
import { IndicatorGridCardConfig, EntityConfig, ColorConfig, IconConfig, IndicatorCell } from './types';

const CARD_VERSION = '0.3.0';

console.info(
  `%c  INDICATOR-GRID-CARD  \n%c  Version ${CARD_VERSION}  `,
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray'
);

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'indicator-grid-card',
  name: 'Indicator Grid Card',
  description: 'A card displaying a grid of indicator lights showing entity status',
});

@customElement('indicator-grid-card')
export class IndicatorGridCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config!: IndicatorGridCardConfig;

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import('./editor');
    return document.createElement('indicator-grid-card-editor') as LovelaceCardEditor;
  }

  public static getStubConfig(): Partial<IndicatorGridCardConfig> {
    return {
      columns: 3,
      rows: 2,
      cell_width: '',
      cell_height: '100px',
      cell_gap: '5px',
      font_size: '16px',
      font_weight: 'bold',
      show_icons: false,
      icon_placement: 'above',
      icon_size: '24px',
      entities: [],
      unavailable_text: 'INOP',
      global_colors: {
        on: 'green',
        off: 'gray',
        text: 'white',
        unavailable: 'orange',
        blank: '#333333',
      },
    };
  }

  public setConfig(config: IndicatorGridCardConfig): void {
    if (!config) {
      throw new Error('Invalid configuration');
    }

    // Backward compatibility: if cell_size is set, use it for width and height
    let cellWidth = config.cell_width;
    let cellHeight = config.cell_height;

    if (config.cell_size !== undefined) {
      cellWidth = cellWidth ?? `${config.cell_size}px`;
      cellHeight = cellHeight ?? `${config.cell_size}px`;
    }

    this.config = {
      ...config,
      columns: config.columns ?? 3,
      rows: config.rows ?? 2,
      cell_width: cellWidth ?? '',
      cell_height: cellHeight ?? '100px',
      cell_gap: config.cell_gap ?? '5px',
      font_size: config.font_size ?? '16px',
      font_weight: config.font_weight ?? 'bold',
      show_icons: config.show_icons ?? false,
      icon_placement: config.icon_placement ?? 'above',
      icon_size: config.icon_size ?? '24px',
      unavailable_text: config.unavailable_text ?? 'INOP',
      global_colors: {
        on: 'green',
        off: 'gray',
        text: 'white',
        unavailable: 'orange',
        blank: '#333333',
        ...config.global_colors,
      },
    };
  }

  public getCardSize(): number {
    return this.config?.rows || 2;
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (!this.config) {
      return false;
    }

    // Always update if config changed
    if (changedProps.has('config')) {
      return true;
    }

    // Check if any of our configured entities changed
    if (changedProps.has('hass')) {
      const oldHass = changedProps.get('hass') as HomeAssistant | undefined;
      if (!oldHass) {
        return true;
      }

      // Get all entity IDs from config
      const entityIds = this.config.entities
        .filter((e): e is EntityConfig => e && !!e.entity)
        .map(e => e.entity!);

      // Check if any of our entities changed
      return entityIds.some(entityId => {
        const oldState = oldHass.states[entityId];
        const newState = this.hass.states[entityId];
        return oldState !== newState;
      });
    }

    return true;
  }

  private _getCells(): IndicatorCell[] {
    const totalCells = this.config.columns * this.config.rows;
    const cells: IndicatorCell[] = [];

    for (let i = 0; i < totalCells; i++) {
      const entityConfig = this.config.entities[i];

      if (!entityConfig || !entityConfig.entity) {
        // Empty/blank cell
        cells.push({
          displayText: '',
          backgroundColor: this._getColor('blank', entityConfig?.colors),
          textColor: this._getColor('text', entityConfig?.colors),
          textOpacity: 1,
          clickable: false,
          clickAction: 'none',
        });
        continue;
      }

      const stateObj = this.hass.states[entityConfig.entity];
      const cell = this._computeCell(entityConfig, stateObj);
      cells.push(cell);
    }

    return cells;
  }

  private _computeCell(entityConfig: EntityConfig, stateObj: any): IndicatorCell {
    if (!stateObj || stateObj.state === 'unavailable' || stateObj.state === 'unknown') {
      // Get entity name - prefer custom text, then friendly_name, then entity ID
      const entityName = entityConfig.text ||
                        stateObj?.attributes?.friendly_name ||
                        entityConfig.entity ||
                        'Unknown';
      const unavailableText = this.config.unavailable_text || 'INOP';
      const displayText = `${entityName}\n${unavailableText}`;

      return {
        entity: entityConfig.entity,
        displayText,
        backgroundColor: this._getColor('unavailable', entityConfig.colors),
        textColor: this._getColor('text', entityConfig.colors),
        textOpacity: 1,
        state: stateObj?.state,
        clickable: false,
        clickAction: 'none',
      };
    }

    const state = stateObj.state;
    const displayText = this._getDisplayText(entityConfig, stateObj);
    const backgroundColor = this._getBackgroundColor(state, entityConfig);
    const textColor = this._getColor('text', entityConfig.colors);
    const textOpacity = this._getTextOpacity(state, entityConfig);
    const icon = this._getIcon(state, entityConfig, stateObj);
    const clickAction = entityConfig.click_action || this._getDefaultClickAction(stateObj);

    return {
      entity: entityConfig.entity,
      displayText,
      backgroundColor,
      textColor,
      textOpacity,
      icon,
      state,
      clickable: clickAction !== 'none',
      clickAction,
    };
  }

  private _getDisplayText(entityConfig: EntityConfig, stateObj: any): string {
    if (entityConfig.text) {
      return entityConfig.text;
    }

    if (entityConfig.text_template) {
      // Simple template replacement - could be enhanced with more sophisticated templating
      return entityConfig.text_template
        .replace(/\{\{\s*state\s*\}\}/g, stateObj.state)
        .replace(/\{\{\s*name\s*\}\}/g, stateObj.attributes.friendly_name || entityConfig.entity);
    }

    return stateObj.attributes.friendly_name || entityConfig.entity || '';
  }

  private _getBackgroundColor(state: string, entityConfig: EntityConfig): string {
    const colors = entityConfig.colors;

    // Check for specific state mapping first
    if (colors?.states && colors.states[state]) {
      return colors.states[state];
    }

    // Check global state mapping
    if (this.config.global_colors?.states && this.config.global_colors.states[state]) {
      return this.config.global_colors.states[state];
    }

    // Check for numeric thresholds
    const numericState = parseFloat(state);
    if (!isNaN(numericState)) {
      const thresholdColor = this._getThresholdColor(numericState, colors) ||
                             this._getThresholdColor(numericState, this.config.global_colors);
      if (thresholdColor) {
        return thresholdColor;
      }
    }

    // Check for on/off states
    if (state === 'on') {
      return this._getColor('on', colors);
    }
    if (state === 'off') {
      return this._getColor('off', colors);
    }

    // Default fallback
    return this._getColor('off', colors);
  }

  private _getThresholdColor(value: number, colors?: ColorConfig): string | null {
    if (!colors?.thresholds || colors.thresholds.length === 0) {
      return null;
    }

    // Sort thresholds by value
    const sorted = [...colors.thresholds].sort((a, b) => a.value - b.value);

    for (const threshold of sorted) {
      const operator = threshold.operator || '<=';
      let matches = false;

      switch (operator) {
        case '<':
          matches = value < threshold.value;
          break;
        case '<=':
          matches = value <= threshold.value;
          break;
        case '>':
          matches = value > threshold.value;
          break;
        case '>=':
          matches = value >= threshold.value;
          break;
        case '==':
          matches = value === threshold.value;
          break;
      }

      if (matches) {
        return threshold.color;
      }
    }

    return null;
  }

  private _getColor(type: 'on' | 'off' | 'unavailable' | 'text' | 'blank', entityColors?: ColorConfig): string {
    // Check entity-specific color first
    if (entityColors && entityColors[type]) {
      return entityColors[type]!;
    }

    // Fall back to global color
    if (this.config.global_colors && this.config.global_colors[type]) {
      return this.config.global_colors[type]!;
    }

    // Hard-coded defaults
    const defaults = {
      on: 'green',
      off: 'gray',
      unavailable: 'orange',
      text: 'white',
      blank: '#333333',
    };

    return defaults[type];
  }

  private _getIcon(state: string, entityConfig: EntityConfig, stateObj: any): string | undefined {
    // Check entity-specific override first
    if (entityConfig && entityConfig.show_icon !== undefined) {
      // Entity explicitly sets show_icon, respect it
      if (!entityConfig.show_icon) {
        return undefined;
      }
      // Entity wants icon, continue to get icon
    } else {
      // No entity override, check global setting
      if (!this.config.show_icons) {
        return undefined;
      }
    }

    // Determine which icon to use based on state
    const iconType = state === 'on' ? 'on' : 'off';

    // Check entity-specific custom icon first
    if (entityConfig && entityConfig.icon && entityConfig.icon[iconType]) {
      return entityConfig.icon[iconType];
    }

    // Fall back to entity's own icon from Home Assistant
    if (stateObj && stateObj.attributes) {
      // Try icon attribute first
      if (stateObj.attributes.icon) {
        return stateObj.attributes.icon;
      }

      // Try entity_picture as fallback (some entities use this)
      // Actually, entity_picture is an image URL, not an icon, so skip this

      // For domains that don't set icon, return a default based on domain
      const domain = stateObj.entity_id.split('.')[0];
      const domainIcons: Record<string, string> = {
        'light': state === 'on' ? 'mdi:lightbulb-on' : 'mdi:lightbulb',
        'switch': state === 'on' ? 'mdi:toggle-switch' : 'mdi:toggle-switch-off',
        'binary_sensor': state === 'on' ? 'mdi:checkbox-marked-circle' : 'mdi:checkbox-blank-circle-outline',
        'sensor': 'mdi:eye',
      };

      if (domainIcons[domain]) {
        return domainIcons[domain];
      }
    }

    // No icon available
    return undefined;
  }

  private _getTextOpacity(state: string, entityConfig: EntityConfig): number {
    // Only dim if state is "off"
    if (state !== 'off') {
      return 1;
    }

    // Check for per-entity dim setting first
    if (entityConfig.dim_off_text !== undefined) {
      return entityConfig.dim_off_text / 100;
    }

    // Fall back to global dim setting
    if (this.config.dim_off_text !== undefined) {
      return this.config.dim_off_text / 100;
    }

    // Default: no dimming
    return 1;
  }

  private _getDefaultClickAction(stateObj: any): 'toggle' | 'more-info' | 'none' {
    const domain = stateObj.entity_id.split('.')[0];

    // Toggleable domains
    if (['light', 'switch', 'input_boolean', 'automation', 'fan'].includes(domain)) {
      return 'toggle';
    }

    // Everything else shows more-info
    return 'more-info';
  }

  private _handleClick(cell: IndicatorCell): void {
    if (!cell.clickable || !cell.entity) {
      return;
    }

    if (cell.clickAction === 'toggle') {
      this._toggleEntity(cell.entity);
    } else if (cell.clickAction === 'more-info') {
      this._showMoreInfo(cell.entity);
    }
  }

  private _toggleEntity(entityId: string): void {
    const domain = entityId.split('.')[0];
    this.hass.callService(domain, 'toggle', {
      entity_id: entityId,
    });
  }

  private _showMoreInfo(entityId: string): void {
    fireEvent(this, 'hass-more-info', { entityId });
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      ha-card {
        box-shadow: none;
        padding: 0;
        background: transparent;
        border: none;
      }

      .grid-container {
        display: grid;
        width: 100%;
      }

      .cell {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        word-wrap: break-word;
        overflow: hidden;
        padding: 4px;
        box-sizing: border-box;
      }

      .cell.icon-above {
        flex-direction: column;
      }

      .cell.icon-below {
        flex-direction: column-reverse;
      }

      .cell.icon-left {
        flex-direction: row;
      }

      .cell.icon-right {
        flex-direction: row-reverse;
      }

      .cell-icon {
        flex-shrink: 0;
      }

      .cell.icon-above .cell-icon,
      .cell.icon-below .cell-icon {
        margin: 2px 0;
      }

      .cell.icon-left .cell-icon,
      .cell.icon-right .cell-icon {
        margin: 0 4px;
      }

      .cell-text {
        min-width: 0;
        word-break: break-word;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .text-line {
        line-height: 1.2;
      }

      .cell.clickable {
        cursor: pointer;
      }

      .cell.clickable:hover {
        filter: brightness(1.2);
      }

      .cell.clickable:active {
        filter: brightness(0.8);
      }
    `;
  }

  protected render() {
    if (!this.config || !this.hass) {
      return html``;
    }

    const cells = this._getCells();

    // If cell_width is blank/empty, use 1fr for auto-sizing
    const columnSize = this.config.cell_width && this.config.cell_width.trim() !== ''
      ? this.config.cell_width
      : '1fr';

    const gridStyle = {
      'grid-template-columns': `repeat(${this.config.columns}, ${columnSize})`,
      'grid-template-rows': `repeat(${this.config.rows}, ${this.config.cell_height})`,
      'gap': this.config.cell_gap || '5px',
    };

    return html`
      <ha-card>
        <div class="grid-container" style=${this._styleMap(gridStyle)}>
          ${cells.map((cell) => this._renderCell(cell))}
        </div>
      </ha-card>
    `;
  }

  private _colorWithOpacity(color: string, opacity: number): string {
    // If already rgba, extract rgb and apply new opacity
    const rgbaMatch = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)$/);
    if (rgbaMatch) {
      return `rgba(${rgbaMatch[1]}, ${rgbaMatch[2]}, ${rgbaMatch[3]}, ${opacity})`;
    }

    // Try to convert hex to rgba
    const hexMatch = color.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
    if (hexMatch) {
      const r = parseInt(hexMatch[1], 16);
      const g = parseInt(hexMatch[2], 16);
      const b = parseInt(hexMatch[3], 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }

    // For named colors, we'll need to use a different approach
    // Create a temporary element to get computed color
    const temp = document.createElement('div');
    temp.style.color = color;
    document.body.appendChild(temp);
    const computed = getComputedStyle(temp).color;
    document.body.removeChild(temp);

    // Extract RGB from computed rgb() or rgba()
    const computedMatch = computed.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (computedMatch) {
      return `rgba(${computedMatch[1]}, ${computedMatch[2]}, ${computedMatch[3]}, ${opacity})`;
    }

    // Fallback: just return the color as-is
    return color;
  }

  private _renderCell(cell: IndicatorCell) {
    // Convert text color to rgba with opacity if needed
    const textColor = cell.textOpacity < 1
      ? this._colorWithOpacity(cell.textColor, cell.textOpacity)
      : cell.textColor;

    const cellStyle = {
      'background-color': cell.backgroundColor,
      'color': textColor,
      'font-size': this.config.font_size || '16px',
      'font-weight': String(this.config.font_weight || 'bold'),
    };

    // Determine icon placement class
    const iconPlacementClass = cell.icon
      ? `icon-${this.config.icon_placement}`
      : '';

    const iconStyle = {
      '--mdc-icon-size': this.config.icon_size || '24px',
    };

    // Check if text contains newlines for multi-line display
    const textLines = cell.displayText.split('\n');

    return html`
      <div
        class="cell ${cell.clickable ? 'clickable' : ''} ${iconPlacementClass}"
        style=${this._styleMap(cellStyle)}
        @click=${() => this._handleClick(cell)}
      >
        ${cell.icon ? html`<ha-icon class="cell-icon" .icon=${cell.icon} style=${this._styleMap(iconStyle)}></ha-icon>` : ''}
        <div class="cell-text">
          ${textLines.map(line => html`<div class="text-line">${line}</div>`)}
        </div>
      </div>
    `;
  }

  private _styleMap(styles: Record<string, string>): string {
    return Object.entries(styles)
      .map(([key, value]) => `${key}: ${value}`)
      .join('; ');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'indicator-grid-card': IndicatorGridCard;
  }
}
