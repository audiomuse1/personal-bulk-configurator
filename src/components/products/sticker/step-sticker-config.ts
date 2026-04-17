import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import {
  calculateStickerPrice,
  calcStickerArea,
  STICKER_SHAPES,
  STICKER_FINISHES,
  MIN_SIDE_LENGTH,
  ORDER_MINIMUM_REGULAR,
  ORDER_MINIMUM_HOLOGRAPHIC,
  type StickerShape,
  type StickerFinish,
  type StickerPriceResult,
} from "./sticker-pricing-engine.js";

interface PresetSize {
  label: string;
  width: number;
  height: number;
}

const PRESET_SIZES: PresetSize[] = [
  { label: "2 × 2", width: 2, height: 2 },
  { label: "3 × 3", width: 3, height: 3 },
  { label: "3.5 × 3.5", width: 3.5, height: 3.5 },
  { label: "4 × 4", width: 4, height: 4 },
  { label: "5 × 5", width: 5, height: 5 },
  { label: "6 × 6", width: 6, height: 6 },
];

const PRESET_QUANTITIES: number[] = [
  100, 200, 300, 500, 1000, 2500, 5000, 10000,
];

function formatMoney(n: number): string {
  return "$" + n.toFixed(2);
}

@customElement("step-sticker-config")
export class StepStickerConfig extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: inherit;
    }

    .card {
      background: var(--bulk-card-bg, #ffffff);
      margin-bottom: 16px;
      border: 2px solid var(--bulk-card-border, #e0e0e0);
      border-radius: 8px;
      overflow: hidden;
      transition: border-color 0.3s;
    }

    .card.valid {
      border-color: #2ecc71;
    }

    .card.invalid-highlight {
      border-color: #e74c3c;
      animation: shake 0.4s ease-in-out;
    }

    @keyframes shake {
      0%,
      100% {
        transform: translateX(0);
      }
      25% {
        transform: translateX(-4px);
      }
      75% {
        transform: translateX(4px);
      }
    }

    .card-header {
      padding: 10px 16px;
      font-size: 16px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: var(--bulk-card-header-bg, #fafafa);
      border-bottom: 1px solid var(--bulk-card-border, #e0e0e0);
    }

    .card-header .status {
      font-size: 13px;
      font-weight: 400;
    }

    .card-header .status.done {
      color: #2ecc71;
    }

    .card-header .status.needed {
      color: #e74c3c;
    }

    .card-body {
      padding: 16px;
    }

    .shape-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
      gap: 10px;
      margin-top: 8px;
    }

    .shape-btn {
      padding: 14px 10px;
      border: 2px solid var(--bulk-card-border, #e0e0e0);
      border-radius: 8px;
      background: white;
      cursor: pointer;
      font-size: 13px;
      font-weight: 600;
      transition: all 0.2s;
      text-align: center;
    }

    .shape-btn:hover {
      border-color: #4ecdc4;
      background: #f9fffe;
    }

    .shape-btn.selected {
      border-color: #4ecdc4;
      background: #e8f8f5;
    }

    .shape-icon {
      font-size: 24px;
      display: block;
      margin-bottom: 4px;
    }

    .size-options {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 8px;
    }

    .size-btn {
      padding: 10px 16px;
      border: 2px solid var(--bulk-card-border, #e0e0e0);
      border-radius: 6px;
      background: white;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      transition: all 0.2s;
      min-width: 70px;
      text-align: center;
    }

    .size-btn:hover {
      border-color: #4ecdc4;
      background: #f9fffe;
    }

    .size-btn.selected {
      border-color: #4ecdc4;
      background: #e8f8f5;
    }

    .custom-size-inputs {
      margin-top: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .custom-size-inputs label {
      font-weight: 600;
      font-size: 14px;
    }

    .dim-input {
      width: 70px;
      padding: 8px;
      font-size: 14px;
      border: 2px solid #ccc;
      border-radius: 4px;
      text-align: center;
    }

    .dim-input:focus {
      border-color: #4ecdc4;
      outline: none;
    }

    .dim-input:disabled {
      background: #f0f0f0;
      color: #999;
    }

    .dim-x {
      font-weight: 700;
      font-size: 16px;
      color: #666;
    }

    .dim-hint {
      font-size: 12px;
      color: #888;
      margin-top: 6px;
    }

    .dim-error {
      font-size: 12px;
      color: #e74c3c;
      margin-top: 6px;
      font-weight: 600;
    }

    .qty-options {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 8px;
    }

    .qty-btn {
      padding: 10px 16px;
      border: 2px solid var(--bulk-card-border, #e0e0e0);
      border-radius: 6px;
      background: white;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      transition: all 0.2s;
      min-width: 70px;
      text-align: center;
    }

    .qty-btn:hover {
      border-color: #4ecdc4;
      background: #f9fffe;
    }

    .qty-btn.selected {
      border-color: #4ecdc4;
      background: #e8f8f5;
    }

    .custom-qty-input {
      margin-top: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .custom-qty-input label {
      font-weight: 600;
      font-size: 14px;
    }

    .qty-input {
      width: 120px;
      padding: 8px;
      font-size: 16px;
      font-weight: 600;
      border: 2px solid #ccc;
      border-radius: 6px;
      text-align: center;
    }

    .qty-input:focus {
      border-color: #4ecdc4;
      outline: none;
    }

    .finish-options {
      margin-top: 8px;
    }

    .finish-option {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      margin: 10px 0;
      padding: 12px 16px;
      border: 2px solid var(--bulk-card-border, #e0e0e0);
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .finish-option:hover {
      border-color: #4ecdc4;
      background: #f9fffe;
    }

    .finish-option.selected {
      border-color: #4ecdc4;
      background: #e8f8f5;
    }

    .finish-option input[type="radio"] {
      accent-color: #4ecdc4;
      margin-top: 2px;
    }

    .finish-label {
      font-weight: 600;
      font-size: 15px;
    }

    .finish-note {
      font-size: 12px;
      color: #e67e22;
      font-style: italic;
      margin-top: 4px;
    }

    .finish-surcharge {
      font-size: 12px;
      color: #888;
      margin-top: 2px;
    }

    .price-display {
      margin-top: 20px;
      padding: 20px;
      background: #f5f5f5;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
      text-align: center;
    }

    .price-main {
      font-size: 28px;
      font-weight: 700;
      color: #2c3e50;
    }

    .price-per-unit {
      font-size: 18px;
      color: #4ecdc4;
      font-weight: 600;
      margin-top: 4px;
    }

    .price-detail {
      font-size: 13px;
      color: #888;
      margin-top: 8px;
      line-height: 1.6;
    }

    .min-order-warning {
      margin-top: 12px;
      padding: 10px 16px;
      background: #fdf0ef;
      border: 1px solid #e74c3c;
      border-radius: 6px;
      font-size: 14px;
      color: #e74c3c;
      font-weight: 600;
      text-align: center;
    }

    .min-order-info {
      margin-top: 8px;
      font-size: 12px;
      color: #888;
      text-align: center;
    }

    .price-prompt {
      margin-top: 20px;
      padding: 16px;
      background: #f0f0f0;
      border-radius: 6px;
      text-align: center;
      color: #888;
      font-size: 14px;
      border: 1px dashed #ccc;
    }

    .price-prompt strong {
      color: #e67e22;
    }

    .area-note {
      color: #666;
      font-size: 13px;
      margin-top: 8px;
    }

    .checklist {
      margin-bottom: 16px;
      padding: 16px;
      background: #fff9e6;
      border: 1px solid #f0d060;
      border-radius: 6px;
    }

    .checklist-title {
      font-weight: 700;
      font-size: 15px;
      margin-bottom: 8px;
      color: #333;
    }

    .checklist-item {
      padding: 4px 0;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .checklist-item .icon {
      font-size: 16px;
      width: 20px;
      text-align: center;
    }

    .checklist-item.done {
      color: #2ecc71;
    }

    .checklist-item.done .label {
      text-decoration: line-through;
      color: #999;
    }

    .checklist-item.pending {
      color: #e67e22;
    }
  `;

  @state() selectedShape: StickerShape | null = null;
  @state() sizeMode: "preset" | "custom" = "preset";
  @state() selectedPresetIndex: number = -1;
  @state() customWidth = 0;
  @state() customHeight = 0;
  @state() qtyMode: "preset" | "custom" = "preset";
  @state() selectedQtyIndex: number = -1;
  @state() customQty = 0;
  @state() selectedFinish: StickerFinish | null = null;
  @state() priceResult: StickerPriceResult | null = null;
  @state() showValidation = false;

  private shapeIcons: Record<string, string> = {
    square: "⬜",
    rectangle: "▬",
    circle: "⚫",
    oval: "⬭",
    "die-cut": "✂️",
    bumper: "🚗",
    "rounded-corner": "▢",
    "sticker-sheet": "📄",
  };

  get widthIn(): number {
    if (this.sizeMode === "preset" && this.selectedPresetIndex >= 0) {
      return PRESET_SIZES[this.selectedPresetIndex].width;
    }
    return this.customWidth;
  }

  get heightIn(): number {
    if (this.sizeMode === "preset" && this.selectedPresetIndex >= 0) {
      return PRESET_SIZES[this.selectedPresetIndex].height;
    }
    return this.customHeight;
  }

  get quantity(): number {
    if (this.qtyMode === "preset" && this.selectedQtyIndex >= 0) {
      return PRESET_QUANTITIES[this.selectedQtyIndex];
    }
    return this.customQty;
  }

  get needsHeight(): boolean {
    if (!this.selectedShape) return true;
    return (
      this.selectedShape.id !== "square" &&
      this.selectedShape.areaCalc !== "circle"
    );
  }

  get customWidthValid(): boolean {
    if (this.sizeMode !== "custom") return true;
    return this.customWidth >= MIN_SIDE_LENGTH;
  }

  get customHeightValid(): boolean {
    if (this.sizeMode !== "custom") return true;
    if (!this.needsHeight) return true;
    return this.customHeight >= MIN_SIDE_LENGTH;
  }

  get shapeValid(): boolean {
    return !!this.selectedShape;
  }

  get sizeValid(): boolean {
    if (this.sizeMode === "preset") return this.selectedPresetIndex >= 0;
    if (!this.customWidthValid) return false;
    if (this.needsHeight && !this.customHeightValid) return false;
    return this.widthIn > 0;
  }

  get quantityValid(): boolean {
    return this.quantity > 0;
  }

  get finishValid(): boolean {
    return !!this.selectedFinish;
  }

  get allValid(): boolean {
    return (
      this.shapeValid &&
      this.sizeValid &&
      this.quantityValid &&
      this.finishValid
    );
  }

  public validate(): boolean {
    this.showValidation = true;
    if (!this.allValid) {
      const firstInvalid = this.shadowRoot?.querySelector(
        ".card.invalid-highlight",
      );
      if (firstInvalid) {
        firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return false;
    }
    if (this.priceResult && !this.priceResult.meetsMinimum) {
      return false;
    }
    return true;
  }

  onShapeSelect(shape: StickerShape) {
    this.selectedShape = shape;
    this.doPrice();
  }

  onPresetSizeSelect(index: number) {
    this.sizeMode = "preset";
    this.selectedPresetIndex = index;
    this.doPrice();
  }

  onCustomSizeClick() {
    this.sizeMode = "custom";
    this.selectedPresetIndex = -1;
    this.doPrice();
  }

  onCustomWidthChange(e: Event) {
    this.customWidth = parseFloat((e.target as HTMLInputElement).value) || 0;
    this.doPrice();
  }

  onCustomHeightChange(e: Event) {
    this.customHeight = parseFloat((e.target as HTMLInputElement).value) || 0;
    this.doPrice();
  }

  onPresetQtySelect(index: number) {
    this.qtyMode = "preset";
    this.selectedQtyIndex = index;
    this.doPrice();
  }

  onCustomQtyClick() {
    this.qtyMode = "custom";
    this.selectedQtyIndex = -1;
    this.doPrice();
  }

  onCustomQtyChange(e: Event) {
    this.customQty = parseInt((e.target as HTMLInputElement).value) || 0;
    this.doPrice();
  }

  onFinishSelect(finish: StickerFinish) {
    this.selectedFinish = finish;
    this.doPrice();
  }

  doPrice() {
    if (
      !this.selectedShape ||
      !this.selectedFinish ||
      !this.sizeValid ||
      this.quantity <= 0
    ) {
      this.priceResult = null;
      this.dispatchStepData(null);
      return;
    }

    const result = calculateStickerPrice(
      this.selectedShape.id,
      this.widthIn,
      this.needsHeight ? this.heightIn : this.widthIn,
      this.quantity,
      this.selectedFinish.id,
    );

    this.priceResult = result;
    this.dispatchStepData(result);
  }

  private dispatchStepData(result: StickerPriceResult | null) {
    this.dispatchEvent(
      new CustomEvent("step-data", {
        detail: {
          shape: this.selectedShape,
          width: this.widthIn,
          height: this.heightIn,
          quantity: this.quantity,
          finish: this.selectedFinish,
          priceResult: result
            ? {
                totalQuantity: result.quantity,
                totalPrice: result.totalPrice,
                unitPrice: result.unitPrice,
              }
            : null,
          stickerPriceDetail: result,
        },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private cardClass(isValid: boolean): string {
    if (!this.showValidation) return "card" + (isValid ? " valid" : "");
    return "card" + (isValid ? " valid" : " invalid-highlight");
  }

  private statusIcon(v: boolean): string {
    return v ? "✓" : "";
  }

  private statusClass(v: boolean): string {
    return "status " + (v ? "done" : "needed");
  }

  private getAreaDisplay(): string {
    if (!this.selectedShape || !this.sizeValid) return "";
    const w = this.widthIn;
    const h = this.needsHeight ? this.heightIn : w;
    const area = calcStickerArea(w, h, this.selectedShape.areaCalc);

    if (this.selectedShape.areaCalc === "circle") {
      return w + '" diameter — ' + area.toFixed(1) + " sq in";
    }
    return w + '" × ' + h + '" — ' + area.toFixed(1) + " sq in";
  }

  private renderChecklist() {
    const items = [
      { label: "Sticker Shape", done: this.shapeValid },
      { label: "Sticker Size", done: this.sizeValid },
      { label: "Quantity", done: this.quantityValid },
      { label: "Finish", done: this.finishValid },
    ];
    if (items.every((i) => i.done)) return html``;
    return html`
      <div class="checklist">
        <div class="checklist-title">📋 Configure your stickers:</div>
        ${items.map(
          (item) => html`
            <div class="checklist-item ${item.done ? "done" : "pending"}">
              <span class="icon">${item.done ? "✅" : "⬜"}</span>
              <span class="label">${item.label}</span>
            </div>
          `,
        )}
      </div>
    `;
  }

  private renderPriceArea() {
    if (this.priceResult) {
      const r = this.priceResult;
      const totalStr = formatMoney(r.totalPrice);
      const unitStr = formatMoney(r.unitPrice);
      const minStr = formatMoney(r.orderMinimum);
      const regMinStr = formatMoney(ORDER_MINIMUM_REGULAR);
      const holoMinStr = formatMoney(ORDER_MINIMUM_HOLOGRAPHIC);
      const areaStr = this.getAreaDisplay();
      const qtyStr = r.quantity.toLocaleString();
      const tensSqStr = r.totalTensSqIn.toLocaleString();

      return html`
        <div class="price-display">
          <div class="price-main">${totalStr}</div>
          <div class="price-per-unit">${unitStr} Ea.</div>
          <div class="price-detail">
            ${r.shape.name} — ${areaStr}<br />
            ${qtyStr} stickers × ${unitStr} ea.<br />
            Volume discount: ${r.discountPct}% off (${tensSqStr} tens sq in
            total)
            ${r.finish.isHolographic
              ? html`<br />Holographic surcharge: +75%`
              : ""}
          </div>

          ${!r.meetsMinimum
            ? html`
                <div class="min-order-warning">
                  ⚠️ Order minimum for
                  ${r.finish.isHolographic ? "holographic" : "regular"} stickers
                  is ${minStr}. Your current total is ${totalStr}. Please
                  increase quantity or size.
                </div>
              `
            : ""}

          <div class="min-order-info">
            Order minimum: ${regMinStr} regular / ${holoMinStr} holographic
          </div>
        </div>
      `;
    }

    const missing: string[] = [];
    if (!this.shapeValid) missing.push("shape");
    if (!this.sizeValid) missing.push("size");
    if (!this.quantityValid) missing.push("quantity");
    if (!this.finishValid) missing.push("finish");

    if (
      missing.length > 0 &&
      (this.shapeValid || this.sizeValid || this.quantityValid)
    ) {
      return html`
        <div class="price-prompt">
          Select
          ${missing.map(
            (m, i) => html`
              <strong>${m}</strong>${i < missing.length - 1 ? ", " : ""}
            `,
          )}
          to see your price
        </div>
      `;
    }
    return html``;
  }

  render() {
    return html`
      ${this.renderChecklist()}

      <div class="${this.cardClass(this.shapeValid)}">
        <div class="card-header">
          <span>Sticker Shape</span>
          <span class="${this.statusClass(this.shapeValid)}">
            ${this.statusIcon(this.shapeValid)}
          </span>
        </div>
        <div class="card-body">
          <div class="shape-grid">
            ${STICKER_SHAPES.map(
              (shape) => html`
                <div
                  class="shape-btn ${this.selectedShape?.id === shape.id
                    ? "selected"
                    : ""}"
                  @click=${() => this.onShapeSelect(shape)}
                >
                  <span class="shape-icon">
                    ${this.shapeIcons[shape.id] || "📐"}
                  </span>
                  ${shape.name}
                </div>
              `,
            )}
          </div>
        </div>
      </div>

      <div class="${this.cardClass(this.sizeValid)}">
        <div class="card-header">
          <span>Sticker Size (inches)</span>
          <span class="${this.statusClass(this.sizeValid)}">
            ${this.statusIcon(this.sizeValid)}
          </span>
        </div>
        <div class="card-body">
          <div class="size-options">
            ${PRESET_SIZES.map(
              (ps, i) => html`
                <div
                  class="size-btn ${this.sizeMode === "preset" &&
                  this.selectedPresetIndex === i
                    ? "selected"
                    : ""}"
                  @click=${() => this.onPresetSizeSelect(i)}
                >
                  ${ps.label}
                </div>
              `,
            )}
            <div
              class="size-btn ${this.sizeMode === "custom" ? "selected" : ""}"
              @click=${() => this.onCustomSizeClick()}
            >
              Custom Size
            </div>
          </div>

          ${this.sizeMode === "custom"
            ? html`
                <div class="custom-size-inputs">
                  <label>Width:</label>
                  <input
                    class="dim-input"
                    type="number"
                    min="${MIN_SIDE_LENGTH}"
                    max="24"
                    step="0.25"
                    placeholder="W"
                    .value=${this.customWidth > 0
                      ? String(this.customWidth)
                      : ""}
                    @input=${this.onCustomWidthChange}
                  />

                  <span class="dim-x">×</span>

                  <label>Height:</label>
                  <input
                    class="dim-input"
                    type="number"
                    min="${MIN_SIDE_LENGTH}"
                    max="24"
                    step="0.25"
                    placeholder="H"
                    .value=${this.customHeight > 0
                      ? String(this.customHeight)
                      : ""}
                    @input=${this.onCustomHeightChange}
                    ?disabled=${!this.needsHeight}
                  />

                  <span style="color:#888; font-size:13px;">inches</span>
                </div>

                <div class="dim-hint">
                  Minimum side length: ${MIN_SIDE_LENGTH}" per side
                </div>

                ${this.customWidth > 0 && this.customWidth < MIN_SIDE_LENGTH
                  ? html`
                      <div class="dim-error">
                        ⚠️ Width must be at least ${MIN_SIDE_LENGTH}"
                      </div>
                    `
                  : ""}
                ${this.needsHeight &&
                this.customHeight > 0 &&
                this.customHeight < MIN_SIDE_LENGTH
                  ? html`
                      <div class="dim-error">
                        ⚠️ Height must be at least ${MIN_SIDE_LENGTH}"
                      </div>
                    `
                  : ""}
                ${!this.needsHeight && this.selectedShape
                  ? html`
                      <div class="dim-hint">
                        ${this.selectedShape.areaCalc === "circle"
                          ? "Enter diameter — circles are equal on all sides"
                          : "Height matches width for squares"}
                      </div>
                    `
                  : ""}
              `
            : ""}
          ${this.sizeValid && this.selectedShape
            ? html`<p class="area-note">${this.getAreaDisplay()}</p>`
            : ""}
        </div>
      </div>

      <div class="${this.cardClass(this.quantityValid)}">
        <div class="card-header">
          <span>Sticker Quantity</span>
          <span class="${this.statusClass(this.quantityValid)}">
            ${this.statusIcon(this.quantityValid)}
          </span>
        </div>
        <div class="card-body">
          <div class="qty-options">
            ${PRESET_QUANTITIES.map(
              (qty, i) => html`
                <div
                  class="qty-btn ${this.qtyMode === "preset" &&
                  this.selectedQtyIndex === i
                    ? "selected"
                    : ""}"
                  @click=${() => this.onPresetQtySelect(i)}
                >
                  ${qty.toLocaleString()}
                </div>
              `,
            )}
            <div
              class="qty-btn ${this.qtyMode === "custom" ? "selected" : ""}"
              @click=${() => this.onCustomQtyClick()}
            >
              Custom
            </div>
          </div>

          ${this.qtyMode === "custom"
            ? html`
                <div class="custom-qty-input">
                  <label>Quantity:</label>
                  <input
                    class="qty-input"
                    type="number"
                    min="1"
                    step="1"
                    placeholder="Enter qty"
                    .value=${this.customQty > 0 ? String(this.customQty) : ""}
                    @input=${this.onCustomQtyChange}
                  />
                </div>
              `
            : ""}
        </div>
      </div>

      <div class="${this.cardClass(this.finishValid)}">
        <div class="card-header">
          <span>Sticker Finish</span>
          <span class="${this.statusClass(this.finishValid)}">
            ${this.statusIcon(this.finishValid)}
          </span>
        </div>
        <div class="card-body">
          <div class="finish-options">
            ${STICKER_FINISHES.map(
              (finish) => html`
                <label
                  class="finish-option ${this.selectedFinish?.id === finish.id
                    ? "selected"
                    : ""}"
                  @click=${() => this.onFinishSelect(finish)}
                >
                  <input
                    type="radio"
                    name="finish"
                    ?checked=${this.selectedFinish?.id === finish.id}
                  />
                  <div>
                    <div class="finish-label">${finish.name}</div>
                    ${finish.isHolographic
                      ? html`
                          <div class="finish-surcharge">
                            +75% surcharge • Min order
                            ${formatMoney(ORDER_MINIMUM_HOLOGRAPHIC)}
                          </div>
                        `
                      : ""}
                    ${finish.note
                      ? html` <div class="finish-note">${finish.note}</div> `
                      : ""}
                  </div>
                </label>
              `,
            )}
          </div>
        </div>
      </div>

      ${this.renderPriceArea()}
    `;
  }
}
