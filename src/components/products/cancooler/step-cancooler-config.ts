import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import {
  calculateCoolerPrice,
  getCoolerBrackets,
  COOLER_COLORS,
  COOLER_PRINT_SIDES,
  PRESET_QUANTITIES,
  ORDER_MINIMUM,
  type CoolerColor,
  type CoolerPrintSide,
  type CoolerPriceResult,
} from "./cancooler-pricing-engine.js";
import "../../info-tooltip.js";

function formatMoney(n: number): string { return "$" + n.toFixed(2); }

@customElement("step-cancooler-config")
export class StepCanCoolerConfig extends LitElement {
  static styles = css`
    :host { display: block; font-family: inherit; }
    .card {
      margin-bottom: 16px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      overflow: visible;
      transition: border-color 0.3s;
    }
    .card.valid { border-color: #2ecc71; }
    .card.invalid-highlight { border-color: #e74c3c; animation: shake 0.4s ease-in-out; }
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-4px); }
      75% { transform: translateX(4px); }
    }
    .card-header {
      padding: 10px 16px;
      font-size: 16px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 8px;
      background: #fafafa;
      border-bottom: 1px solid #e0e0e0;
    }
    .card-header .header-text { flex: 1; }
    .card-header .status { font-size: 13px; font-weight: 400; }
    .card-header .status.done { color: #2ecc71; }
    .card-header .status.needed { color: #e74c3c; }
    .card-body { padding: 16px; }
    .print-options { display: flex; gap: 12px; margin-top: 8px; }
    .print-btn {
      flex: 1;
      padding: 16px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      background: white;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      transition: all 0.2s;
      text-align: center;
    }
    .print-btn:hover { border-color: #4ecdc4; background: #f9fffe; }
    .print-btn.selected { border-color: #4ecdc4; background: #e8f8f5; }
    .print-icon { font-size: 24px; display: block; margin-bottom: 4px; }
    .colors { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
    .swatch {
      width: 36px;
      height: 36px;
      border-radius: 6px;
      cursor: pointer;
      border: 2px solid transparent;
      transition: all 0.15s;
      position: relative;
    }
    .swatch:hover { transform: scale(1.15); }
    .swatch.picked { border-color: #333; outline: 2px solid #333; }
    .swatch.lt { border-color: #ddd; }
    .color-name { margin-top: 8px; font-size: 14px; }
    .color-name strong { font-weight: 700; }
    .qty-options { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
    .qty-btn {
      padding: 10px 16px;
      border: 2px solid #e0e0e0;
      border-radius: 6px;
      background: white;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      transition: all 0.2s;
      min-width: 60px;
      text-align: center;
    }
    .qty-btn:hover { border-color: #4ecdc4; background: #f9fffe; }
    .qty-btn.selected { border-color: #4ecdc4; background: #e8f8f5; }
    .custom-qty-input { margin-top: 12px; display: flex; align-items: center; gap: 8px; }
    .custom-qty-input label { font-weight: 600; font-size: 14px; }
    .qty-input {
      width: 120px;
      padding: 8px;
      font-size: 16px;
      font-weight: 600;
      border: 2px solid #ccc;
      border-radius: 6px;
      text-align: center;
    }
    .qty-input:focus { border-color: #4ecdc4; outline: none; }
    .min-note { font-size: 12px; color: #888; margin-top: 6px; }
    .min-error { font-size: 12px; color: #e74c3c; margin-top: 6px; font-weight: 600; }
    .price-display {
      margin-top: 20px;
      padding: 20px;
      background: #f5f5f5;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
      text-align: center;
    }
    .price-main { font-size: 28px; font-weight: 700; color: #2c3e50; }
    .price-per-unit { font-size: 18px; color: #4ecdc4; font-weight: 600; margin-top: 4px; }
    .price-detail { font-size: 13px; color: #888; margin-top: 8px; line-height: 1.6; }
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
    .price-table {
      width: 100%;
      margin-top: 16px;
      border-collapse: collapse;
      font-size: 13px;
    }
    .price-table th, .price-table td { padding: 6px 10px; border: 1px solid #e0e0e0; text-align: center; }
    .price-table th { background: #fafafa; font-weight: 600; }
    .price-table .current { background: #e8f8f5; font-weight: 700; }
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
    .price-prompt strong { color: #e67e22; }
    .checklist {
      margin-bottom: 16px;
      padding: 16px;
      background: #fff9e6;
      border: 1px solid #f0d060;
      border-radius: 6px;
    }
    .checklist-title { font-weight: 700; font-size: 15px; margin-bottom: 8px; color: #333; }
    .checklist-item { padding: 4px 0; font-size: 14px; display: flex; align-items: center; gap: 8px; }
    .checklist-item .icon { font-size: 16px; width: 20px; text-align: center; }
    .checklist-item.done { color: #2ecc71; }
    .checklist-item.done .label { text-decoration: line-through; color: #999; }
    .checklist-item.pending { color: #e67e22; }
    .full-color-note {
      margin-top: 8px;
      padding: 8px 12px;
      background: #e8f8f5;
      border-radius: 4px;
      font-size: 13px;
      color: #27ae60;
      font-weight: 600;
    }
  `;

  @state() selectedPrintSide: CoolerPrintSide | null = null;
  @state() selectedColor: CoolerColor | null = null;
  @state() qtyMode: "preset" | "custom" = "preset";
  @state() selectedQtyIndex: number = -1;
  @state() customQty = 0;
  @state() priceResult: CoolerPriceResult | null = null;
  @state() showValidation = false;

  get quantity(): number {
    if (this.qtyMode === "preset" && this.selectedQtyIndex >= 0) return PRESET_QUANTITIES[this.selectedQtyIndex];
    return this.customQty;
  }
  get printSideValid(): boolean { return !!this.selectedPrintSide; }
  get colorValid(): boolean { return !!this.selectedColor; }
  get quantityValid(): boolean { return this.quantity >= ORDER_MINIMUM; }
  get allValid(): boolean { return this.printSideValid && this.colorValid && this.quantityValid; }

  public validate(): boolean {
    this.showValidation = true;
    if (!this.allValid) {
      const firstInvalid = this.shadowRoot?.querySelector(".card.invalid-highlight");
      if (firstInvalid) firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
      return false;
    }
    if (this.priceResult && !this.priceResult.meetsMinimum) return false;
    return true;
  }

  onPrintSideSelect(side: CoolerPrintSide) { this.selectedPrintSide = side; this.doPrice(); }
  onColorSelect(color: CoolerColor) { this.selectedColor = color; this.doPrice(); }
  onPresetQtySelect(index: number) { this.qtyMode = "preset"; this.selectedQtyIndex = index; this.doPrice(); }
  onCustomQtyClick() { this.qtyMode = "custom"; this.selectedQtyIndex = -1; this.doPrice(); }
  onCustomQtyChange(e: Event) { this.customQty = parseInt((e.target as HTMLInputElement).value) || 0; this.doPrice(); }

  doPrice() {
    if (!this.selectedColor || !this.selectedPrintSide || this.quantity <= 0) {
      this.priceResult = null; this.dispatchStepData(null); return;
    }
    const result = calculateCoolerPrice(this.selectedColor.id, this.selectedPrintSide.id, this.quantity);
    this.priceResult = result;
    this.dispatchStepData(result);
  }

  private dispatchStepData(result: CoolerPriceResult | null) {
    this.dispatchEvent(new CustomEvent("step-data", {
      detail: {
        coolerColor: this.selectedColor, coolerPrintSide: this.selectedPrintSide, quantity: this.quantity,
        priceResult: result ? { totalQuantity: result.quantity, totalPrice: result.totalPrice, unitPrice: result.unitPrice } : null,
        coolerPriceDetail: result,
      },
      bubbles: true, composed: true,
    }));
  }

  private cardClass(isValid: boolean): string {
    if (!this.showValidation) return "card" + (isValid ? " valid" : "");
    return "card" + (isValid ? " valid" : " invalid-highlight");
  }
  private statusIcon(v: boolean): string { return v ? "✓" : ""; }
  private statusClass(v: boolean): string { return "status " + (v ? "done" : "needed"); }

  private renderChecklist() {
    const items = [
      { label: "Print Sides", done: this.printSideValid },
      { label: "Cooler Color", done: this.colorValid },
      { label: "Quantity (minimum " + ORDER_MINIMUM + ")", done: this.quantityValid },
    ];
    if (items.every((i) => i.done)) return html``;
    return html`
      <div class="checklist">
        <div class="checklist-title">📋 Configure your can coolers:</div>
        ${items.map((item) => html`
          <div class="checklist-item ${item.done ? "done" : "pending"}">
            <span class="icon">${item.done ? "✅" : "⬜"}</span>
            <span class="label">${item.label}</span>
          </div>
        `)}
      </div>
    `;
  }

  private renderPriceTable() {
    if (!this.selectedPrintSide) return html``;
    const brackets = getCoolerBrackets(this.selectedPrintSide.id);
    return html`
      <table class="price-table">
        <thead><tr><th>Quantity</th><th>Price Each (${this.selectedPrintSide.label})</th></tr></thead>
        <tbody>
          ${brackets.map((bracket) => {
            const label = bracket.maxQty ? bracket.minQty + "–" + bracket.maxQty : bracket.minQty + "+";
            const isCurrent = this.priceResult && this.quantity >= bracket.minQty && (bracket.maxQty === null || this.quantity <= bracket.maxQty);
            return html`<tr class="${isCurrent ? "current" : ""}"><td>${label}</td><td>${formatMoney(bracket.netPrice)}</td></tr>`;
          })}
        </tbody>
      </table>
    `;
  }

  private renderPriceArea() {
    if (this.priceResult) {
      const r = this.priceResult;
      const totalStr = formatMoney(r.totalPrice);
      const unitStr = formatMoney(r.unitPrice);
      return html`
        <div class="price-display">
          <div class="price-main">${totalStr}</div>
          <div class="price-per-unit">${unitStr} Ea.</div>
          <div class="price-detail">
            ${r.color.name} can cooler × ${r.quantity.toLocaleString()}<br />
            ${r.printSide.label} • Full color imprint<br />
            Price bracket: ${r.bracketLabel}
          </div>
          ${!r.meetsMinimum ? html`<div class="min-order-warning">⚠️ Minimum order is ${ORDER_MINIMUM} can coolers. You have ${r.quantity}. Please increase your quantity.</div>` : ""}
          ${this.renderPriceTable()}
        </div>
      `;
    }
    const missing: string[] = [];
    if (!this.printSideValid) missing.push("print sides");
    if (!this.colorValid) missing.push("color");
    if (!this.quantityValid) missing.push("quantity");
    if (missing.length > 0 && (this.printSideValid || this.colorValid || this.quantity > 0)) {
      return html`<div class="price-prompt">Select ${missing.map((m, i) => html`<strong>${m}</strong>${i < missing.length - 1 ? ", " : ""}`)} to see your price</div>`;
    }
    return html``;
  }

  render() {
    return html`
      ${this.renderChecklist()}

      <div class="${this.cardClass(this.printSideValid)}">
        <div class="card-header">
          <info-tooltip>
            Choose whether you'd like your design printed on one side or both
            sides of the can cooler. Two-sided printing is great for designs
            that should be visible from any angle. All coolers feature full-color
            imprint.
          </info-tooltip>
          <span class="header-text">Print Sides</span>
          <span class="${this.statusClass(this.printSideValid)}">${this.statusIcon(this.printSideValid)}</span>
        </div>
        <div class="card-body">
          <div class="print-options">
            ${COOLER_PRINT_SIDES.map((side) => html`
              <div class="print-btn ${this.selectedPrintSide?.id === side.id ? "selected" : ""}" @click=${() => this.onPrintSideSelect(side)}>
                <span class="print-icon">${side.id === "one-sided" ? "1️⃣" : "2️⃣"}</span>
                ${side.label}
              </div>
            `)}
          </div>
          <div class="full-color-note">🎨 Full color imprints on all can coolers!</div>
        </div>
      </div>

      <div class="${this.cardClass(this.colorValid)}">
        <div class="card-header">
          <info-tooltip>
            Select the color of can cooler you'd like for your order. Colors are
            approximate and may vary slightly from screen to the physical product.
            Choose a color that complements your artwork for the best result.
          </info-tooltip>
          <span class="header-text">Cooler Color</span>
          <span class="${this.statusClass(this.colorValid)}">${this.statusIcon(this.colorValid)}</span>
        </div>
        <div class="card-body">
          <p class="color-name">Selected: <strong>${this.selectedColor ? this.selectedColor.name : "None — pick a color"}</strong></p>
          <div class="colors">
            ${COOLER_COLORS.map((color) => html`
              <div
                class="swatch ${this.selectedColor?.id === color.id ? "picked" : ""} ${color.brightness === "light" ? "lt" : ""}"
                style="background-color: #${color.hex}"
                title=${color.name}
                @click=${() => this.onColorSelect(color)}
              ></div>
            `)}
          </div>
        </div>
      </div>

      <div class="${this.cardClass(this.quantityValid)}">
        <div class="card-header">
          <info-tooltip>
            Select a preset quantity or enter a custom amount. Larger orders
            unlock better per-cooler pricing. Minimum order is ${ORDER_MINIMUM}
            can coolers. Check the price table for volume discount breakpoints.
          </info-tooltip>
          <span class="header-text">Quantity</span>
          <span class="${this.statusClass(this.quantityValid)}">${this.statusIcon(this.quantityValid)}</span>
        </div>
        <div class="card-body">
          <div class="qty-options">
            ${PRESET_QUANTITIES.map((qty, i) => html`
              <div class="qty-btn ${this.qtyMode === "preset" && this.selectedQtyIndex === i ? "selected" : ""}" @click=${() => this.onPresetQtySelect(i)}>${qty.toLocaleString()}</div>
            `)}
            <div class="qty-btn ${this.qtyMode === "custom" ? "selected" : ""}" @click=${() => this.onCustomQtyClick()}>Custom</div>
          </div>
          ${this.qtyMode === "custom" ? html`
            <div class="custom-qty-input">
              <label>Quantity:</label>
              <input class="qty-input" type="number" min="${ORDER_MINIMUM}" step="1" placeholder="Min ${ORDER_MINIMUM}" .value=${this.customQty > 0 ? String(this.customQty) : ""} @input=${this.onCustomQtyChange} />
            </div>
          ` : ""}
          <div class="min-note">Minimum order: ${ORDER_MINIMUM} can coolers</div>
          ${this.quantity > 0 && this.quantity < ORDER_MINIMUM ? html`<div class="min-error">⚠️ Minimum order is ${ORDER_MINIMUM} can coolers</div>` : ""}
        </div>
      </div>

      ${this.renderPriceArea()}
    `;
  }
}