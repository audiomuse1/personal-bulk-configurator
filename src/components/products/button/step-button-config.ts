import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import {
  calculateButtonPrice,
  BUTTON_SIZES,
  BUTTON_PRICE_BRACKETS,
  PRESET_QUANTITIES,
  ORDER_MINIMUM,
  type ButtonSize,
  type ButtonPriceResult,
} from "./button-pricing-engine.js";
import "../../info-tooltip.js";

function formatMoney(n: number): string { return "$" + n.toFixed(2); }

@customElement("step-button-config")
export class StepButtonConfig extends LitElement {
  static styles = css`
    :host { display: block; font-family: inherit; }
    .card {
      background: var(--bulk-card-bg, #ffffff);
      margin-bottom: 16px;
      border: 2px solid var(--bulk-card-border, #e0e0e0);
      border-radius: 8px;
      overflow: visible;
      transition: border-color 0.3s;
    }
    .card.valid { border-color: #2ecc71; }
    .card.invalid-highlight {
      border-color: #e74c3c;
      animation: shake 0.4s ease-in-out;
    }
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
      background: var(--bulk-card-header-bg, #fafafa);
      border-bottom: 1px solid var(--bulk-card-border, #e0e0e0);
    }
    .card-header .header-text { flex: 1; }
    .card-header .status { font-size: 13px; font-weight: 400; }
    .card-header .status.done { color: #2ecc71; }
    .card-header .status.needed { color: #e74c3c; }
    .card-body { padding: 16px; background: var(--bulk-card-body-bg, #ffffff); }
    .size-options {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 8px;
    }
    .size-btn {
      padding: 16px 24px;
      border: 2px solid var(--bulk-card-border, #e0e0e0);
      border-radius: 8px;
      background: white;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      transition: all 0.2s;
      text-align: center;
      min-width: 140px;
    }
    .size-btn:hover { border-color: #4ecdc4; background: #f9fffe; }
    .size-btn.selected { border-color: #4ecdc4; background: #e8f8f5; }
    .size-icon { font-size: 32px; display: block; margin-bottom: 6px; }
    .size-label { font-size: 15px; }
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
    .qty-btn:hover { border-color: #4ecdc4; background: #f9fffe; }
    .qty-btn.selected { border-color: #4ecdc4; background: #e8f8f5; }
    .custom-qty-input {
      margin-top: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
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
      margin-top: 12px;
      border-collapse: collapse;
      font-size: 13px;
    }
    .price-table th, .price-table td {
      padding: 6px 10px;
      border: 1px solid #e0e0e0;
      text-align: center;
    }
    .price-table th { background: var(--bulk-card-header-bg, #fafafa); font-weight: 600; }
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
    .checklist-item {
      padding: 4px 0;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .checklist-item .icon { font-size: 16px; width: 20px; text-align: center; }
    .checklist-item.done { color: #2ecc71; }
    .checklist-item.done .label { text-decoration: line-through; color: #999; }
    .checklist-item.pending { color: #e67e22; }
  `;

  @state() selectedSize: ButtonSize | null = null;
  @state() qtyMode: "preset" | "custom" = "preset";
  @state() selectedQtyIndex: number = -1;
  @state() customQty = 0;
  @state() priceResult: ButtonPriceResult | null = null;
  @state() showValidation = false;

  get quantity(): number {
    if (this.qtyMode === "preset" && this.selectedQtyIndex >= 0) return PRESET_QUANTITIES[this.selectedQtyIndex];
    return this.customQty;
  }
  get sizeValid(): boolean { return !!this.selectedSize; }
  get quantityValid(): boolean { return this.quantity >= ORDER_MINIMUM; }
  get allValid(): boolean { return this.sizeValid && this.quantityValid; }

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

  onSizeSelect(size: ButtonSize) { this.selectedSize = size; this.doPrice(); }
  onPresetQtySelect(index: number) { this.qtyMode = "preset"; this.selectedQtyIndex = index; this.doPrice(); }
  onCustomQtyClick() { this.qtyMode = "custom"; this.selectedQtyIndex = -1; this.doPrice(); }
  onCustomQtyChange(e: Event) { this.customQty = parseInt((e.target as HTMLInputElement).value) || 0; this.doPrice(); }

  doPrice() {
    if (!this.selectedSize || this.quantity <= 0) {
      this.priceResult = null; this.dispatchStepData(null); return;
    }
    const result = calculateButtonPrice(this.selectedSize.id, this.quantity);
    this.priceResult = result;
    this.dispatchStepData(result);
  }

  private dispatchStepData(result: ButtonPriceResult | null) {
    this.dispatchEvent(new CustomEvent("step-data", {
      detail: {
        buttonSize: this.selectedSize, quantity: this.quantity,
        priceResult: result ? { totalQuantity: result.quantity, totalPrice: result.totalPrice, unitPrice: result.unitPrice } : null,
        buttonPriceDetail: result,
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
      { label: "Button Size", done: this.sizeValid },
      { label: "Quantity (minimum " + ORDER_MINIMUM + ")", done: this.quantityValid },
    ];
    if (items.every((i) => i.done)) return html``;
    return html`
      <div class="checklist">
        <div class="checklist-title">📋 Configure your buttons:</div>
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
    return html`
      <table class="price-table">
        <thead><tr><th>Quantity</th><th>Price Each</th></tr></thead>
        <tbody>
          ${BUTTON_PRICE_BRACKETS.map((bracket) => {
            const label = bracket.maxQty ? bracket.minQty + "–" + bracket.maxQty : bracket.minQty + "+";
            const isCurrent = this.priceResult && this.quantity >= bracket.minQty && (bracket.maxQty === null || this.quantity <= bracket.maxQty);
            return html`<tr class="${isCurrent ? "current" : ""}"><td>${label}</td><td>${formatMoney(bracket.retailPrice)}</td></tr>`;
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
            ${r.size.label} × ${r.quantity.toLocaleString()} buttons<br />
            Price bracket: ${r.bracketLabel}
          </div>
          ${!r.meetsMinimum ? html`
            <div class="min-order-warning">⚠️ Minimum order is ${ORDER_MINIMUM} buttons. You have ${r.quantity}. Please increase your quantity.</div>
          ` : ""}
          ${this.renderPriceTable()}
        </div>
      `;
    }
    const missing: string[] = [];
    if (!this.sizeValid) missing.push("size");
    if (!this.quantityValid) missing.push("quantity");
    if (missing.length > 0 && (this.sizeValid || this.quantity > 0)) {
      return html`<div class="price-prompt">Select ${missing.map((m, i) => html`<strong>${m}</strong>${i < missing.length - 1 ? ", " : ""}`)} to see your price</div>`;
    }
    return html``;
  }

  render() {
    return html`
      ${this.renderChecklist()}

      <div class="${this.cardClass(this.sizeValid)}">
        <div class="card-header">
          <info-tooltip>
            Choose from our standard button sizes. Both sizes feature full-color
            printing with a pin-back closure. Buttons are a great low-cost way
            to promote your campaign, event, or cause.
          </info-tooltip>
          <span class="header-text">Button Size</span>
          <span class="${this.statusClass(this.sizeValid)}">${this.statusIcon(this.sizeValid)}</span>
        </div>
        <div class="card-body">
          <div class="size-options">
            ${BUTTON_SIZES.map((size) => html`
              <div class="size-btn ${this.selectedSize?.id === size.id ? "selected" : ""}" @click=${() => this.onSizeSelect(size)}>
                <span class="size-icon">⚫</span>
                <span class="size-label">${size.label}</span>
              </div>
            `)}
          </div>
        </div>
      </div>

      <div class="${this.cardClass(this.quantityValid)}">
        <div class="card-header">
          <info-tooltip>
            Select a preset quantity or enter a custom amount. Larger orders
            get better per-button pricing. Minimum order is ${ORDER_MINIMUM}
            buttons. See the price table for volume discount breakpoints.
          </info-tooltip>
          <span class="header-text">Button Quantity</span>
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
          <div class="min-note">Minimum order: ${ORDER_MINIMUM} buttons</div>
          ${this.quantity > 0 && this.quantity < ORDER_MINIMUM ? html`<div class="min-error">⚠️ Minimum order is ${ORDER_MINIMUM} buttons</div>` : ""}
        </div>
      </div>

      ${this.renderPriceArea()}
    `;
  }
}