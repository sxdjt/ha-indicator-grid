import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, LovelaceCardEditor, fireEvent } from 'custom-card-helpers';
import { IndicatorGridCardConfig, EntityConfig, ColorConfig, IndicatorCell } from './types';

const CARD_VERSION = '0.1.0';

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
      entities: [],
      unavailable_text: 'INOP',
      global_colors: {
        on: 'green',
        off: 'gray',
        text: 'white',
        unavailable: 'orange',
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
      unavailable_text: config.unavailable_text ?? 'INOP',
      global_colors: {
        on: 'green',
        off: 'gray',
        text: 'white',
        unavailable: 'orange',
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
          backgroundColor: this.config.global_colors?.off || 'gray',
          textColor: this.config.global_colors?.text || 'white',
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
      return {
        entity: entityConfig.entity,
        displayText: this.config.unavailable_text || 'INOP',
        backgroundColor: this._getColor('unavailable', entityConfig.colors),
        textColor: this._getColor('text', entityConfig.colors),
        state: stateObj?.state,
        clickable: false,
        clickAction: 'none',
      };
    }

    const state = stateObj.state;
    const displayText = this._getDisplayText(entityConfig, stateObj);
    const backgroundColor = this._getBackgroundColor(state, entityConfig);
    const textColor = this._getColor('text', entityConfig.colors);
    const clickAction = entityConfig.click_action || this._getDefaultClickAction(stateObj);

    return {
      entity: entityConfig.entity,
      displayText,
      backgroundColor,
      textColor,
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

  private _getColor(type: 'on' | 'off' | 'unavailable' | 'text', entityColors?: ColorConfig): string {
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
    };

    return defaults[type];
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

  private _renderCell(cell: IndicatorCell) {
    const cellStyle = {
      'background-color': cell.backgroundColor,
      'color': cell.textColor,
      'font-size': this.config.font_size || '16px',
      'font-weight': String(this.config.font_weight || 'bold'),
    };

    return html`
      <div
        class="cell ${cell.clickable ? 'clickable' : ''}"
        style=${this._styleMap(cellStyle)}
        @click=${() => this._handleClick(cell)}
      >
        ${cell.displayText}
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
