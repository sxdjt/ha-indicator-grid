import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, fireEvent, LovelaceCardEditor } from 'custom-card-helpers';
import { IndicatorGridCardConfig, EntityConfig, HeaderRowConfig, HeaderCellConfig } from './types';

@customElement('indicator-grid-card-editor')
export class IndicatorGridCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: IndicatorGridCardConfig;
  @state() private _selectedEntityIndex: number = -1;


  public setConfig(config: IndicatorGridCardConfig): void {
    this._config = config;
  }

  private _valueChanged(ev: CustomEvent): void {
    if (!this._config || !this.hass) {
      return;
    }

    const newConfig = { ...this._config, ...ev.detail.value };
    fireEvent(this, 'config-changed', { config: newConfig });
  }

  private _configValueChanged(key: string, value: any): void {
    if (!this._config || !this.hass) {
      return;
    }

    const newConfig = { ...this._config, [key]: value };
    fireEvent(this, 'config-changed', { config: newConfig });
  }

  private _globalColorChanged(ev: CustomEvent, colorType: string): void {
    const value = (ev.target as any).value;
    const newConfig = { ...this._config };

    if (!newConfig.global_colors) {
      newConfig.global_colors = {};
    }

    newConfig.global_colors = {
      ...newConfig.global_colors,
      [colorType]: value,
    };

    fireEvent(this, 'config-changed', { config: newConfig });
  }

  private _addEntity(): void {
    const newConfig = { ...this._config };

    if (!newConfig.entities) {
      newConfig.entities = [];
    }

    newConfig.entities = [...newConfig.entities, { entity: '' }];

    fireEvent(this, 'config-changed', { config: newConfig });
  }

  private _removeEntity(index: number): void {
    const newConfig = { ...this._config };
    newConfig.entities = [...newConfig.entities];
    newConfig.entities.splice(index, 1);

    if (this._selectedEntityIndex === index) {
      this._selectedEntityIndex = -1;
    }

    fireEvent(this, 'config-changed', { config: newConfig });
  }

  private _entityChanged(index: number, key: keyof EntityConfig, value: any): void {
    const newConfig = { ...this._config };
    newConfig.entities = [...newConfig.entities];

    newConfig.entities[index] = {
      ...newConfig.entities[index],
      [key]: value,
    };

    fireEvent(this, 'config-changed', { config: newConfig });
  }

  private _entityColorChanged(index: number, colorType: string, value: string): void {
    const newConfig = { ...this._config };
    newConfig.entities = [...newConfig.entities];

    const entity = { ...newConfig.entities[index] };

    if (!entity.colors) {
      entity.colors = {};
    }

    entity.colors = {
      ...entity.colors,
      [colorType]: value,
    };

    newConfig.entities[index] = entity;

    fireEvent(this, 'config-changed', { config: newConfig });
  }

  private _entityIconChanged(index: number, iconType: string, value: string): void {
    const newConfig = { ...this._config };
    newConfig.entities = [...newConfig.entities];

    const entity = { ...newConfig.entities[index] };

    if (!entity.icon) {
      entity.icon = {};
    }

    entity.icon = {
      ...entity.icon,
      [iconType]: value,
    };

    newConfig.entities[index] = entity;

    fireEvent(this, 'config-changed', { config: newConfig });
  }

  private _addHeaderRow(): void {
    const newConfig = { ...this._config };

    if (!newConfig.header_rows) {
      newConfig.header_rows = [];
    }

    newConfig.header_rows = [
      ...newConfig.header_rows,
      {
        row_index: 0,
        cells: [{ text: 'Header', colspan: 1 }],
      },
    ];

    fireEvent(this, 'config-changed', { config: newConfig });
  }

  private _removeHeaderRow(index: number): void {
    const newConfig = { ...this._config };
    if (!newConfig.header_rows) {
      return;
    }

    newConfig.header_rows = [...newConfig.header_rows];
    newConfig.header_rows.splice(index, 1);

    fireEvent(this, 'config-changed', { config: newConfig });
  }

  private _headerRowChanged(index: number, key: keyof HeaderRowConfig, value: any): void {
    const newConfig = { ...this._config };
    if (!newConfig.header_rows) {
      return;
    }

    newConfig.header_rows = [...newConfig.header_rows];
    newConfig.header_rows[index] = {
      ...newConfig.header_rows[index],
      [key]: value,
    };

    fireEvent(this, 'config-changed', { config: newConfig });
  }

  private _addHeaderCell(rowIndex: number): void {
    const newConfig = { ...this._config };
    if (!newConfig.header_rows) {
      return;
    }

    newConfig.header_rows = [...newConfig.header_rows];
    const headerRow = { ...newConfig.header_rows[rowIndex] };
    headerRow.cells = [...headerRow.cells, { text: 'Header', colspan: 1 }];
    newConfig.header_rows[rowIndex] = headerRow;

    fireEvent(this, 'config-changed', { config: newConfig });
  }

  private _removeHeaderCell(rowIndex: number, cellIndex: number): void {
    const newConfig = { ...this._config };
    if (!newConfig.header_rows) {
      return;
    }

    newConfig.header_rows = [...newConfig.header_rows];
    const headerRow = { ...newConfig.header_rows[rowIndex] };
    headerRow.cells = [...headerRow.cells];
    headerRow.cells.splice(cellIndex, 1);
    newConfig.header_rows[rowIndex] = headerRow;

    fireEvent(this, 'config-changed', { config: newConfig });
  }

  private _headerCellChanged(rowIndex: number, cellIndex: number, key: keyof HeaderCellConfig, value: any): void {
    const newConfig = { ...this._config };
    if (!newConfig.header_rows) {
      return;
    }

    newConfig.header_rows = [...newConfig.header_rows];
    const headerRow = { ...newConfig.header_rows[rowIndex] };
    headerRow.cells = [...headerRow.cells];
    headerRow.cells[cellIndex] = {
      ...headerRow.cells[cellIndex],
      [key]: value,
    };
    newConfig.header_rows[rowIndex] = headerRow;

    fireEvent(this, 'config-changed', { config: newConfig });
  }

  static get styles() {
    return css`
      ha-textfield,
      ha-selector {
        display: block;
        margin-bottom: 8px;
      }

      ha-expansion-panel {
        display: block;
        margin-top: 16px;
        margin-bottom: 16px;
      }

      .entity-item {
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        padding: 12px;
        margin-bottom: 8px;
        background: var(--card-background-color);
      }

      .entity-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
      }

      .entity-details {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .color-grid {
        display: grid;
        gap: 8px;
        margin-top: 8px;
      }
    `;
  }

  protected render() {
    if (!this.hass || !this._config) {
      return html``;
    }

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${[
          { name: 'columns', selector: { number: { min: 1, max: 20, mode: 'box' } } },
          { name: 'rows', selector: { number: { min: 1, max: 20, mode: 'box' } } },
        ]}
        .computeLabel=${(schema: any) => schema.label || schema.name}
        @value-changed=${this._valueChanged}
      ></ha-form>

      <ha-textfield
        label="Cell Width"
        .value=${this._config.cell_width || ''}
        @input=${(ev: Event) => this._configValueChanged('cell_width', (ev.target as HTMLInputElement).value)}
        helper-text="Leave blank for auto (100% width), or use 100px, 25%, etc."
      ></ha-textfield>

      <ha-textfield
        label="Cell Height"
        .value=${this._config.cell_height || '100px'}
        @input=${(ev: Event) => this._configValueChanged('cell_height', (ev.target as HTMLInputElement).value)}
        helper-text="Examples: 100px, 10vh, 5rem"
      ></ha-textfield>

      <ha-textfield
        label="Cell Gap"
        .value=${this._config.cell_gap || '5px'}
        @input=${(ev: Event) => this._configValueChanged('cell_gap', (ev.target as HTMLInputElement).value)}
        helper-text="Gap between cells. Examples: 5px, 0.5rem, 1%"
      ></ha-textfield>

      <ha-textfield
        label="Font Size"
        .value=${this._config.font_size || '16px'}
        @input=${(ev: Event) => this._configValueChanged('font_size', (ev.target as HTMLInputElement).value)}
        helper-text="Examples: 16px, 1.2rem, 14pt"
      ></ha-textfield>

      <ha-selector
        .hass=${this.hass}
        .selector=${{
          select: {
            options: [
              { value: '300', label: 'Light (300)' },
              { value: 'normal', label: 'Normal (400)' },
              { value: '500', label: 'Medium (500)' },
              { value: '600', label: 'Semi-Bold (600)' },
              { value: 'bold', label: 'Bold (700)' },
              { value: '800', label: 'Extra Bold (800)' },
              { value: '900', label: 'Black (900)' },
            ],
          },
        }}
        .value=${this._config.font_weight || 'bold'}
        @value-changed=${(ev: CustomEvent) => this._configValueChanged('font_weight', ev.detail.value)}
        .label=${'Font Weight'}
      ></ha-selector>

      <ha-textfield
        label="Unavailable Text"
        .value=${this._config.unavailable_text || 'INOP'}
        @input=${(ev: Event) => this._configValueChanged('unavailable_text', (ev.target as HTMLInputElement).value)}
        helper-text="Text to display when entity is unavailable"
      ></ha-textfield>

      <ha-textfield
        label="Dim Off Text (%)"
        type="number"
        min="0"
        max="100"
        .value=${this._config.dim_off_text ?? ''}
        @input=${(ev: Event) => this._configValueChanged('dim_off_text', (ev.target as HTMLInputElement).value ? Number((ev.target as HTMLInputElement).value) : undefined)}
        helper-text="Opacity percentage for text when entity is off (0-100). Leave blank for no dimming. Example: 50"
      ></ha-textfield>

      <ha-selector
        .hass=${this.hass}
        .selector=${{ boolean: {} }}
        .value=${this._config.show_icons ?? false}
        @value-changed=${(ev: CustomEvent) => this._configValueChanged('show_icons', ev.detail.value)}
        .label=${'Show Icons'}
      ></ha-selector>

      <ha-selector
        .hass=${this.hass}
        .selector=${{
          select: {
            options: [
              { value: 'above', label: 'Above text' },
              { value: 'below', label: 'Below text' },
              { value: 'left', label: 'Left of text' },
              { value: 'right', label: 'Right of text' },
            ],
          },
        }}
        .value=${this._config.icon_placement || 'above'}
        @value-changed=${(ev: CustomEvent) => this._configValueChanged('icon_placement', ev.detail.value)}
        .label=${'Icon Placement'}
      ></ha-selector>

      <ha-textfield
        label="Icon Size"
        .value=${this._config.icon_size || '24px'}
        @input=${(ev: Event) => this._configValueChanged('icon_size', (ev.target as HTMLInputElement).value)}
        helper-text="Examples: 24px, 2rem, 32px"
      ></ha-textfield>

      <ha-expansion-panel header="Global Colors" .expanded=${false}>
        <ha-textfield
          label="On Color"
          .value=${this._config.global_colors?.on || 'green'}
          @input=${(ev: CustomEvent) => this._globalColorChanged(ev, 'on')}
          helper-text="e.g., green, #00FF00"
        ></ha-textfield>

        <ha-textfield
          label="Off Color"
          .value=${this._config.global_colors?.off || 'gray'}
          @input=${(ev: CustomEvent) => this._globalColorChanged(ev, 'off')}
          helper-text="e.g., gray, #808080"
        ></ha-textfield>

        <ha-textfield
          label="Unavailable Color"
          .value=${this._config.global_colors?.unavailable || 'orange'}
          @input=${(ev: CustomEvent) => this._globalColorChanged(ev, 'unavailable')}
          helper-text="e.g., orange, #FFA500"
        ></ha-textfield>

        <ha-textfield
          label="Text Color"
          .value=${this._config.global_colors?.text || 'white'}
          @input=${(ev: CustomEvent) => this._globalColorChanged(ev, 'text')}
          helper-text="e.g., white, #FFFFFF"
        ></ha-textfield>

        <ha-textfield
          label="Blank Cell Color"
          .value=${this._config.global_colors?.blank || '#333333'}
          @input=${(ev: CustomEvent) => this._globalColorChanged(ev, 'blank')}
          helper-text="e.g., #333333, darkgray"
        ></ha-textfield>
      </ha-expansion-panel>

      <div style="margin-top: 16px;">
        <h3>Header Rows</h3>
        ${(this._config.header_rows || []).map((headerRow, index) => this._renderHeaderRowConfig(headerRow, index))}

        <mwc-button @click=${this._addHeaderRow}>
          Add Header Row
        </mwc-button>
      </div>

      <div style="margin-top: 16px;">
        <h3>Entities</h3>
        ${(this._config.entities || []).map((entity, index) => this._renderEntityConfig(entity, index))}

        <mwc-button @click=${this._addEntity}>
          Add Entity
        </mwc-button>
      </div>
    `;
  }

  private _renderHeaderRowConfig(headerRow: HeaderRowConfig, rowIndex: number) {
    return html`
      <div class="entity-item">
        <div class="entity-header">
          <strong>Header Row ${rowIndex + 1}</strong>
          <mwc-button @click=${() => this._removeHeaderRow(rowIndex)}>Remove</mwc-button>
        </div>

        <div class="entity-details">
          <ha-textfield
            label="Row Index (0-based)"
            type="number"
            min="0"
            .max=${this._config.rows - 1}
            .value=${headerRow.row_index}
            @input=${(ev: Event) =>
              this._headerRowChanged(rowIndex, 'row_index', Number((ev.target as HTMLInputElement).value))}
            helper-text="Which row this header occupies (0 = first row)"
          ></ha-textfield>

          <h4>Header Cells</h4>
          ${headerRow.cells.map((cell, cellIndex) => this._renderHeaderCellConfig(rowIndex, cell, cellIndex))}

          <mwc-button @click=${() => this._addHeaderCell(rowIndex)}>
            Add Header Cell
          </mwc-button>
        </div>
      </div>
    `;
  }

  private _renderHeaderCellConfig(rowIndex: number, cell: HeaderCellConfig, cellIndex: number) {
    return html`
      <div style="border: 1px dashed var(--divider-color); padding: 8px; margin: 8px 0; border-radius: 4px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <strong>Cell ${cellIndex + 1}</strong>
          <mwc-button @click=${() => this._removeHeaderCell(rowIndex, cellIndex)}>Remove</mwc-button>
        </div>

        <ha-textfield
          label="Text"
          .value=${cell.text || ''}
          @input=${(ev: Event) =>
            this._headerCellChanged(rowIndex, cellIndex, 'text', (ev.target as HTMLInputElement).value)}
        ></ha-textfield>

        <ha-textfield
          label="Column Span"
          type="number"
          min="1"
          .max=${this._config.columns}
          .value=${cell.colspan || 1}
          @input=${(ev: Event) =>
            this._headerCellChanged(rowIndex, cellIndex, 'colspan', Number((ev.target as HTMLInputElement).value))}
          helper-text="Number of columns this cell spans"
        ></ha-textfield>

        <ha-selector
          .hass=${this.hass}
          .selector=${{
            select: {
              options: [
                { value: 'left', label: 'Left' },
                { value: 'center', label: 'Center' },
                { value: 'right', label: 'Right' },
              ],
            },
          }}
          .value=${cell.text_align || 'center'}
          @value-changed=${(ev: CustomEvent) =>
            this._headerCellChanged(rowIndex, cellIndex, 'text_align', ev.detail.value)}
          .label=${'Text Alignment'}
        ></ha-selector>

        <ha-expansion-panel header="Advanced Styling (optional)" .expanded=${false}>
          <ha-textfield
            label="Font Size"
            .value=${cell.font_size || ''}
            @input=${(ev: Event) =>
              this._headerCellChanged(rowIndex, cellIndex, 'font_size', (ev.target as HTMLInputElement).value)}
            helper-text="Leave blank to use card font size"
          ></ha-textfield>

          <ha-selector
            .hass=${this.hass}
            .selector=${{
              select: {
                options: [
                  { value: '', label: 'Default (from card)' },
                  { value: '300', label: 'Light (300)' },
                  { value: 'normal', label: 'Normal (400)' },
                  { value: '500', label: 'Medium (500)' },
                  { value: '600', label: 'Semi-Bold (600)' },
                  { value: 'bold', label: 'Bold (700)' },
                  { value: '800', label: 'Extra Bold (800)' },
                  { value: '900', label: 'Black (900)' },
                ],
              },
            }}
            .value=${cell.font_weight || ''}
            @value-changed=${(ev: CustomEvent) =>
              this._headerCellChanged(rowIndex, cellIndex, 'font_weight', ev.detail.value)}
            .label=${'Font Weight'}
          ></ha-selector>

          <ha-textfield
            label="Text Color"
            .value=${cell.text_color || ''}
            @input=${(ev: Event) =>
              this._headerCellChanged(rowIndex, cellIndex, 'text_color', (ev.target as HTMLInputElement).value)}
            helper-text="Leave blank to use global text color"
          ></ha-textfield>

          <ha-textfield
            label="Background Color"
            .value=${cell.background_color || ''}
            @input=${(ev: Event) =>
              this._headerCellChanged(rowIndex, cellIndex, 'background_color', (ev.target as HTMLInputElement).value)}
            helper-text="Leave blank to use global blank color"
          ></ha-textfield>
        </ha-expansion-panel>
      </div>
    `;
  }

  private _renderEntityConfig(entity: EntityConfig, index: number) {
    const totalCells = this._config.columns * this._config.rows;
    const row = Math.floor(index / this._config.columns) + 1;
    const col = (index % this._config.columns) + 1;

    if (index >= totalCells) {
      return html``;
    }

    return html`
      <div class="entity-item">
        <div class="entity-header">
          <strong>Cell ${index + 1} (Row ${row}, Col ${col})</strong>
          <mwc-button @click=${() => this._removeEntity(index)}>Remove</mwc-button>
        </div>

        <div class="entity-details">
          <ha-selector
            .hass=${this.hass}
            .selector=${{ entity: {} }}
            .value=${entity.entity || ''}
            @value-changed=${(ev: CustomEvent) =>
              this._entityChanged(index, 'entity', ev.detail.value)}
            .label=${'Entity (leave empty for blank cell)'}
          ></ha-selector>

          <ha-textfield
            label="Custom text (optional)"
            .value=${entity.text || ''}
            @input=${(ev: Event) =>
              this._entityChanged(index, 'text', (ev.target as HTMLInputElement).value)}
          ></ha-textfield>

          <ha-textfield
            label="Text template"
            .value=${entity.text_template || ''}
            @input=${(ev: Event) =>
              this._entityChanged(index, 'text_template', (ev.target as HTMLInputElement).value)}
            helper-text="e.g., {{ state }}"
          ></ha-textfield>

          <ha-textfield
            label="Column Span"
            type="number"
            min="1"
            .max=${this._config.columns}
            .value=${entity.colspan || 1}
            @input=${(ev: Event) =>
              this._entityChanged(index, 'colspan', Number((ev.target as HTMLInputElement).value))}
            helper-text="Number of columns this cell spans (default: 1)"
          ></ha-textfield>

          <ha-selector
            .hass=${this.hass}
            .selector=${{
              select: {
                options: [
                  { value: '', label: 'Auto (toggle or more-info)' },
                  { value: 'toggle', label: 'Toggle' },
                  { value: 'more-info', label: 'More Info' },
                  { value: 'none', label: 'None' },
                ],
              },
            }}
            .value=${entity.click_action || ''}
            @value-changed=${(ev: CustomEvent) =>
              this._entityChanged(index, 'click_action', ev.detail.value)}
            .label=${'Click Action'}
          ></ha-selector>

          <ha-selector
            .hass=${this.hass}
            .selector=${{ boolean: {} }}
            .value=${entity.show_icon ?? false}
            @value-changed=${(ev: CustomEvent) =>
              this._entityChanged(index, 'show_icon', ev.detail.value)}
            .label=${'Show Icon (override global setting)'}
          ></ha-selector>

          <ha-expansion-panel header="Per-Entity Colors (optional)" .expanded=${false}>
            <div class="color-grid">
              <ha-textfield
                label="On Color"
                .value=${entity.colors?.on || ''}
                @input=${(ev: Event) =>
                  this._entityColorChanged(index, 'on', (ev.target as HTMLInputElement).value)}
                helper-text="Override global on color"
              ></ha-textfield>

              <ha-textfield
                label="Off Color"
                .value=${entity.colors?.off || ''}
                @input=${(ev: Event) =>
                  this._entityColorChanged(index, 'off', (ev.target as HTMLInputElement).value)}
                helper-text="Override global off color"
              ></ha-textfield>

              <ha-textfield
                label="Text Color"
                .value=${entity.colors?.text || ''}
                @input=${(ev: Event) =>
                  this._entityColorChanged(index, 'text', (ev.target as HTMLInputElement).value)}
                helper-text="Override global text color"
              ></ha-textfield>

              <ha-textfield
                label="Blank Cell Color"
                .value=${entity.colors?.blank || ''}
                @input=${(ev: Event) =>
                  this._entityColorChanged(index, 'blank', (ev.target as HTMLInputElement).value)}
                helper-text="Override global blank color (for blank cells only)"
              ></ha-textfield>

              <ha-textfield
                label="Dim Off Text (%)"
                type="number"
                min="0"
                max="100"
                .value=${entity.dim_off_text ?? ''}
                @input=${(ev: Event) =>
                  this._entityChanged(index, 'dim_off_text', (ev.target as HTMLInputElement).value ? Number((ev.target as HTMLInputElement).value) : undefined)}
                helper-text="Override global dim setting (0-100)"
              ></ha-textfield>
            </div>
          </ha-expansion-panel>

          <ha-expansion-panel header="Custom Icons (optional)" .expanded=${false}>
            <ha-selector
              .hass=${this.hass}
              .selector=${{ icon: {} }}
              .value=${entity.icon?.on || ''}
              @value-changed=${(ev: CustomEvent) =>
                this._entityIconChanged(index, 'on', ev.detail.value)}
              .label=${'On Icon'}
            ></ha-selector>

            <ha-selector
              .hass=${this.hass}
              .selector=${{ icon: {} }}
              .value=${entity.icon?.off || ''}
              @value-changed=${(ev: CustomEvent) =>
                this._entityIconChanged(index, 'off', ev.detail.value)}
              .label=${'Off Icon'}
            ></ha-selector>
          </ha-expansion-panel>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'indicator-grid-card-editor': IndicatorGridCardEditor;
  }
}
