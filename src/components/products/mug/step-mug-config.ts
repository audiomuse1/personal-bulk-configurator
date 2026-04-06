import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import {
  calculateMugPrice,
  getMugBrackets,
  MUG_STYLES,
  PACKAGING_FEE,
  SHIPPING_FEE,
  type MugStyle,
  type MugPriceResult,
} from "./mug-pricing-engine.js";
import "../../info-tooltip.js";

function formatMoney(n: number): string { return "$" + n.toFixed(2); }

@customElement("step-mug-config")
export class StepMugConfig extends LitElement {
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
    .style-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 12px;
      margin-top: 8px;
    }
    .style-btn {
      padding: 16px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      background: white;
      cursor: pointer;
      transition: all 0.2s;
      text-align: center;
    }
    .style-btn:hover { border-color: #4ecdc4; background: #f9fffe; }
    .style-btn.selected { border-color: #4ecdc4; background: #e8f8f5; }
    .style-icon { font-size: 32px; display: block; margin-bottom: 6px; }
    .style-label { font-size: 14px; font-weight: 600; }
    .style-desc { font-size: 11px; color: #888; margin-top: 4px; }
    .style-badge {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 10px;
      font-size: 10px;
      font-weight: 700;
      margin-top: 6px;
    }
    .badge-usa { background: #e8f8f5; color: #27ae60; }
    .badge-import { background: #fef9e7; color: #f39c12; }
    .qty-input-group {
      margin-top: 8px;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .qty-input-group label { font-weight: 600; font-size: 14px; }
    .qty-input {
      width: 120px;
      padding: 10px;
      font-size: 16px;
      font-weight: 600;
      border: 2px solid #ccc;
      border-radius: 6px;
      text-align: center;
    }
    .qty-input:focus { border-color: #4ecdc4; outline: none; }
    .qty-hint { font-size: 12px; color: #27ae60; margin-top: 6px; font-weight: 600; }
    .packaging-option {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      margin-top: 12px;
      padding: 14px 16px;
      border: 2px solid #e0e0e0;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .packaging-option:hover { border-color: #4ecdc4; background: #f9fffe; }
    .packaging-option.selected { border-color: #4ecdc4; background: #e8f8f5; }
    .packaging-option input[type="checkbox"] {
      accent-color: #4ecdc4;
      margin-top: 2px;
      width: 18px;
      height: 18px;
      pointer-events: none;
    }
    .packaging-label { font-weight: 600; font-size: 15px; }
    .packaging-note { font-size: 12px; color: #888; margin-top: 2px; }
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
    .price-breakdown { margin-top: 12px; text-align: left; font-size: 14px; }
    .price-row { display: flex; justify-content: space-between; padding: 4px 0; color: #555; }
    .price-row.total {
      border-top: 2px solid #333;
      margin-top: 8px;
      padding-top: 8px;
      font-weight: 700;
      font-size: 16px;
      color: #2c3e50;
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
    .shipping-note { font-size: 12px; color: #888; margin-top: 8px; text-align: center; font-style: italic; }
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
  `;

  @state() selectedStyle: MugStyle | null = null;
  @state() quantity = 0;
  @state() includePackaging = false;
  @state() priceResult: MugPriceResult | null = null;
  @state() showValidation = false;

  get styleValid(): boolean { return !!this.selectedStyle; }
  get quantityValid(): boolean { return this.quantity > 0; }
  get allValid(): boolean { return this.styleValid && this.quantityValid; }

  public validate(): boolean {
    this.showValidation = true;
    if (!this.allValid) {
      const firstInvalid = this.shadowRoot?.querySelector(".card.invalid-highlight");
      if (firstInvalid) firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
      return false;
    }
    return true;
  }

  onStyleSelect(style: MugStyle) { this.selectedStyle = style; this.doPrice(); }
  onQuantityChange(e: Event) { this.quantity = parseInt((e.target as HTMLInputElement).value) || 0; this.doPrice(); }
  onPackagingToggle(e: Event) { e.preventDefault(); this.includePackaging = !this.includePackaging; this.doPrice(); }

  doPrice() {
    if (!this.selectedStyle || this.quantity <= 0) {
      this.priceResult = null; this.dispatchStepData(null); return;
    }
    const result = calculateMugPrice(this.selectedStyle.id, this.quantity, this.includePackaging);
    this.priceResult = result;
    this.dispatchStepData(result);
  }

  private dispatchStepData(result: MugPriceResult | null) {
    this.dispatchEvent(new CustomEvent("step-data", {
      detail: {
        mugStyle: this.selectedStyle, quantity: this.quantity, includePackaging: this.includePackaging,
        priceResult: result ? { totalQuantity: result.quantity, totalPrice: result.totalPrice, unitPrice: result.unitPrice } : null,
        mugPriceDetail: result,
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
      { label: "Mug Style", done: this.styleValid },
      { label: "Quantity (at least 1)", done: this.quantityValid },
    ];
    if (items.every((i) => i.done)) return html``;
    return html`
      <div class="checklist">
        <div class="checklist-title">📋 Configure your mugs:</div>
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
    if (!this.selectedStyle) return html``;
    const brackets = getMugBrackets(this.selectedStyle.id);
    return html`
      <table class="price-table">
        <thead><tr><th>Quantity</th><th>Price Each</th></tr></thead>
        <tbody>
          ${brackets.map((bracket) => {
            const label = bracket.maxQty
              ? bracket.minQty + (bracket.minQty === bracket.maxQty ? "" : "–" + bracket.maxQty)
              : bracket.minQty + "+";
            const isCurrent = this.priceResult && this.quantity >= bracket.minQty && (bracket.maxQty === null || this.quantity <= bracket.maxQty);
            return html`<tr class="${isCurrent ? "current" : ""}"><td>${label}</td><td>${formatMoney(bracket.price)}</td></tr>`;
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
      const subtotalStr = formatMoney(r.subtotal);
      const packagingStr = formatMoney(r.packagingTotal);
      const shippingStr = formatMoney(r.shippingTotal);
      const perMugTotal = formatMoney(r.unitPrice + r.packagingPerMug + r.shippingPerMug);
      return html`
        <div class="price-display">
          <div class="price-main">${totalStr}</div>
          <div class="price-per-unit">${perMugTotal} per mug (all-in)</div>
          <div class="price-breakdown">
            <div class="price-row"><span>${r.quantity.toLocaleString()} × ${r.style.label} @ ${unitStr} ea.</span><span>${subtotalStr}</span></div>
            ${r.includePackaging ? html`<div class="price-row"><span>Individual packaging @ ${formatMoney(PACKAGING_FEE)}/mug</span><span>${packagingStr}</span></div>` : ""}
            <div class="price-row"><span>Shipping @ ${formatMoney(SHIPPING_FEE)}/mug</span><span>${shippingStr}</span></div>
            <div class="price-row total"><span>Total</span><span>${totalStr}</span></div>
          </div>
          <div class="shipping-note">Shipping is ${formatMoney(SHIPPING_FEE)} per mug for all orders</div>
          ${this.renderPriceTable()}
        </div>
      `;
    }
    const missing: string[] = [];
    if (!this.styleValid) missing.push("mug style");
    if (!this.quantityValid) missing.push("quantity");
    if (missing.length > 0 && (this.styleValid || this.quantity > 0)) {
      return html`<div class="price-prompt">Select ${missing.map((m, i) => html`<strong>${m}</strong>${i < missing.length - 1 ? ", " : ""}`)} to see your price</div>`;
    }
    return html``;
  }

  render() {
    return html`
      ${this.renderChecklist()}

      <div class="${this.cardClass(this.styleValid)}">
        <div class="card-header">
          <info-tooltip>
            Choose from our available mug styles. We offer both USA-made and
            imported options in various sizes. All mugs feature full-color
            sublimation printing that won't fade or peel. USA-made mugs are
            produced domestically with premium materials.
          </info-tooltip>
          <span class="header-text">Mug Style</span>
          <span class="${this.statusClass(this.styleValid)}">${this.statusIcon(this.styleValid)}</span>
        </div>
        <div class="card-body">
          <div class="style-grid">
            ${MUG_STYLES.map((style) => html`
              <div class="style-btn ${this.selectedStyle?.id === style.id ? "selected" : ""}" @click=${() => this.onStyleSelect(style)}>
                <span class="style-icon">☕</span>
                <span class="style-label">${style.label}</span>
                <span class="style-desc">${style.description}</span>
                <span class="style-badge ${style.origin === "USA-made" ? "badge-usa" : "badge-import"}">${style.origin === "USA-made" ? "🇺🇸 USA-made" : "🌍 Imported"}</span>
              </div>
            `)}
          </div>
        </div>
      </div>

      <div class="${this.cardClass(this.quantityValid)}">
        <div class="card-header">
          <info-tooltip>
            Enter the number of mugs you'd like to order. There's no minimum
            order requirement for mugs! Larger quantities get better per-mug
            pricing — check the price table for volume breakpoints.
          </info-tooltip>
          <span class="header-text">Quantity</span>
          <span class="${this.statusClass(this.quantityValid)}">${this.statusIcon(this.quantityValid)}</span>
        </div>
        <div class="card-body">
          <div class="qty-input-group">
            <label>How many mugs?</label>
            <input class="qty-input" type="number" min="1" step="1" placeholder="Qty" .value=${this.quantity > 0 ? String(this.quantity) : ""} @input=${this.onQuantityChange} />
          </div>
          <div class="qty-hint">✓ No minimum order!</div>
        </div>
      </div>

      <div class="card valid">
        <div class="card-header">
          <info-tooltip>
            Add individual gift box packaging for each mug. Great for events,
            gifts, or retail. Each mug is carefully packaged in its own
            presentation-ready box.
          </info-tooltip>
          <span class="header-text">Individual Packaging</span>
          <span class="status done">Optional</span>
        </div>
        <div class="card-body">
          <div class="packaging-option ${this.includePackaging ? "selected" : ""}" @click=${this.onPackagingToggle}>
            <input type="checkbox" .checked=${this.includePackaging} />
            <div>
              <div class="packaging-label">Add individual gift box packaging</div>
              <div class="packaging-note">${formatMoney(PACKAGING_FEE)} per mug — each mug packaged separately in a gift-ready box</div>
            </div>
          </div>
        </div>
      </div>

      ${this.renderPriceArea()}
    `;
  }
}