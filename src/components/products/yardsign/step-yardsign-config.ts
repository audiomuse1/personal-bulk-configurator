import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import {
  calculateSignPrice,
  getSignBrackets,
  SIGN_PRINT_SIDES,
  STAKE_OPTIONS,
  FULL_BLEED_FEE,
  type SignPrintSide,
  type SignStakeOption,
  type SignPriceResult,
} from "./yardsign-pricing-engine.js";
import "../../info-tooltip.js";

function formatMoney(n: number): string { return "$" + n.toFixed(2); }

@customElement("step-yardsign-config")
export class StepYardSignConfig extends LitElement {
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
    .addon-option {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      margin-top: 10px;
      padding: 14px 16px;
      border: 2px solid #e0e0e0;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .addon-option:hover { border-color: #4ecdc4; background: #f9fffe; }
    .addon-option.selected { border-color: #4ecdc4; background: #e8f8f5; }
    .addon-option input[type="checkbox"],
    .addon-option input[type="radio"] {
      accent-color: #4ecdc4;
      margin-top: 2px;
      width: 18px;
      height: 18px;
      pointer-events: none;
    }
    .addon-label { font-weight: 600; font-size: 15px; }
    .addon-note { font-size: 12px; color: #888; margin-top: 2px; }
    .addon-price { font-size: 12px; color: #4ecdc4; font-weight: 600; margin-top: 2px; }
    .stake-options { margin-top: 8px; }
    .size-note {
      margin-top: 8px;
      padding: 10px 14px;
      background: #f0f7ff;
      border-radius: 6px;
      font-size: 13px;
      color: #2c3e50;
      line-height: 1.5;
    }
    .size-note strong { color: #1a5ec7; }
    .no-stakes-note {
      margin-top: 8px;
      padding: 8px 12px;
      background: #fff9e6;
      border-radius: 4px;
      font-size: 12px;
      color: #e67e22;
      font-style: italic;
    }
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
    .price-row {
      display: flex;
      justify-content: space-between;
      padding: 4px 0;
      color: #555;
    }
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
    .price-table th,
    .price-table td {
      padding: 6px 10px;
      border: 1px solid #e0e0e0;
      text-align: center;
    }
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
    .custom-size-callout {
      margin-top: 12px;
      padding: 12px 16px;
      background: #f0f0f0;
      border-radius: 6px;
      font-size: 13px;
      color: #666;
      text-align: center;
    }
    .custom-size-callout strong { color: #333; }
  `;

  @state() selectedPrintSide: SignPrintSide | null = null;
  @state() quantity = 0;
  @state() fullBleed = false;
  @state() selectedStake: SignStakeOption = STAKE_OPTIONS[0];
  @state() priceResult: SignPriceResult | null = null;
  @state() showValidation = false;

  get printSideValid(): boolean { return !!this.selectedPrintSide; }
  get quantityValid(): boolean { return this.quantity > 0; }
  get allValid(): boolean { return this.printSideValid && this.quantityValid; }

  public validate(): boolean {
    this.showValidation = true;
    if (!this.allValid) {
      const firstInvalid = this.shadowRoot?.querySelector(".card.invalid-highlight");
      if (firstInvalid) firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
      return false;
    }
    return true;
  }

  onPrintSideSelect(side: SignPrintSide) { this.selectedPrintSide = side; this.doPrice(); }
  onQuantityChange(e: Event) { this.quantity = parseInt((e.target as HTMLInputElement).value) || 0; this.doPrice(); }
  onFullBleedToggle(e: Event) { e.preventDefault(); this.fullBleed = !this.fullBleed; this.doPrice(); }
  onStakeSelect(e: Event, stake: SignStakeOption) { e.preventDefault(); this.selectedStake = stake; this.doPrice(); }

  doPrice() {
    if (!this.selectedPrintSide || this.quantity <= 0) {
      this.priceResult = null; this.dispatchStepData(null); return;
    }
    const result = calculateSignPrice(this.selectedPrintSide.id, this.quantity, this.fullBleed, this.selectedStake.id);
    this.priceResult = result;
    this.dispatchStepData(result);
  }

  private dispatchStepData(result: SignPriceResult | null) {
    this.dispatchEvent(new CustomEvent("step-data", {
      detail: {
        signPrintSide: this.selectedPrintSide,
        quantity: this.quantity,
        fullBleed: this.fullBleed,
        stakeOption: this.selectedStake,
        priceResult: result
          ? { totalQuantity: result.quantity, totalPrice: result.totalPrice, unitPrice: result.unitPriceAllIn }
          : null,
        signPriceDetail: result,
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
      { label: "Quantity (at least 1)", done: this.quantityValid },
    ];
    if (items.every((i) => i.done)) return html``;
    return html`
      <div class="checklist">
        <div class="checklist-title">📋 Configure your yard signs:</div>
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
    const brackets = getSignBrackets(this.selectedPrintSide.id);
    return html`
      <table class="price-table">
        <thead><tr><th>Quantity</th><th>Sign Price Each (${this.selectedPrintSide.label})</th></tr></thead>
        <tbody>
          ${brackets.map((bracket) => {
            const label = bracket.maxQty
              ? bracket.minQty === bracket.maxQty ? String(bracket.minQty) : bracket.minQty + "–" + bracket.maxQty
              : bracket.minQty + "+";
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
      const allInStr = formatMoney(r.unitPriceAllIn);
      const signSubStr = formatMoney(r.signSubtotal);
      const signUnitStr = formatMoney(r.signUnitPrice);
      const bleedStr = formatMoney(r.fullBleedTotal);
      const stakeStr = formatMoney(r.stakeTotal);
      return html`
        <div class="price-display">
          <div class="price-main">${totalStr}</div>
          <div class="price-per-unit">${allInStr} per sign (all-in)</div>
          <div class="price-breakdown">
            <div class="price-row">
              <span>${r.quantity.toLocaleString()} × ${r.printSide.label} signs @ ${signUnitStr} ea.</span>
              <span>${signSubStr}</span>
            </div>
            ${r.fullBleed ? html`
              <div class="price-row">
                <span>Full-bleed @ ${formatMoney(FULL_BLEED_FEE)}/sign</span>
                <span>${bleedStr}</span>
              </div>
            ` : ""}
            ${r.stakeOption.id !== "none" ? html`
              <div class="price-row">
                <span>${r.stakeOption.label} @ ${formatMoney(r.stakePerSign)}/sign</span>
                <span>${stakeStr}</span>
              </div>
            ` : ""}
            <div class="price-row total">
              <span>Total</span>
              <span>${totalStr}</span>
            </div>
          </div>
          ${this.renderPriceTable()}
        </div>
      `;
    }
    const missing: string[] = [];
    if (!this.printSideValid) missing.push("print sides");
    if (!this.quantityValid) missing.push("quantity");
    if (missing.length > 0 && (this.printSideValid || this.quantity > 0)) {
      return html`<div class="price-prompt">Select ${missing.map((m, i) => html`<strong>${m}</strong>${i < missing.length - 1 ? ", " : ""}`)} to see your price</div>`;
    }
    return html``;
  }

  render() {
    return html`
      ${this.renderChecklist()}

      <div class="size-note">
        📐 Standard size: <strong>18" × 24"</strong> coroplast yard signs — full-color digitally printed.<br />
        Maximum size: 8' × 4'. Contact us for custom size quotes.
      </div>

      <div class="${this.cardClass(this.printSideValid)}">
        <div class="card-header">
          <info-tooltip>
            Choose single-sided or double-sided printing for your yard signs.
            Double-sided signs are printed on both faces so your message is
            visible from either direction — ideal for roadside placement.
          </info-tooltip>
          <span class="header-text">Print Sides</span>
          <span class="${this.statusClass(this.printSideValid)}">${this.statusIcon(this.printSideValid)}</span>
        </div>
        <div class="card-body">
          <div class="print-options">
            ${SIGN_PRINT_SIDES.map((side) => html`
              <div class="print-btn ${this.selectedPrintSide?.id === side.id ? "selected" : ""}" @click=${() => this.onPrintSideSelect(side)}>
                <span class="print-icon">${side.id === "one-sided" ? "1️⃣" : "2️⃣"}</span>
                ${side.label}
              </div>
            `)}
          </div>
        </div>
      </div>

      <div class="${this.cardClass(this.quantityValid)}">
        <div class="card-header">
          <info-tooltip>
            Enter the number of yard signs you need. There is no minimum order
            requirement. Larger quantities receive better per-sign pricing —
            check the price table for volume breakpoints.
          </info-tooltip>
          <span class="header-text">Quantity</span>
          <span class="${this.statusClass(this.quantityValid)}">${this.statusIcon(this.quantityValid)}</span>
        </div>
        <div class="card-body">
          <div class="qty-input-group">
            <label>How many signs?</label>
            <input class="qty-input" type="number" min="1" step="1" placeholder="Qty" .value=${this.quantity > 0 ? String(this.quantity) : ""} @input=${this.onQuantityChange} />
          </div>
          <div class="qty-hint">✓ No minimum order!</div>
        </div>
      </div>

      <div class="card valid">
        <div class="card-header">
          <info-tooltip>
            Full-bleed printing extends your design all the way to the edges
            of the sign with no white border. This gives a more polished,
            professional look. Add-on fee is ${formatMoney(FULL_BLEED_FEE)}
            per sign.
          </info-tooltip>
          <span class="header-text">Add-Ons</span>
          <span class="status done">Optional</span>
        </div>
        <div class="card-body">
          <div class="addon-option ${this.fullBleed ? "selected" : ""}" @click=${this.onFullBleedToggle}>
            <input type="checkbox" .checked=${this.fullBleed} />
            <div>
              <div class="addon-label">Full-Bleed Printing</div>
              <div class="addon-note">Print extends to the edges with no white border</div>
              <div class="addon-price">+${formatMoney(FULL_BLEED_FEE)} per sign</div>
            </div>
          </div>
        </div>
      </div>

      <div class="card valid">
        <div class="card-header">
          <info-tooltip>
            Yard sign stakes are sold separately. Choose from wire H-stakes
            (standard) or heavy-duty options depending on your needs. Stakes
            slide into the corrugated flutes of the sign for easy installation.
            Select "No stakes" if you already have your own.
          </info-tooltip>
          <span class="header-text">Stakes</span>
          <span class="status done">Optional</span>
        </div>
        <div class="card-body">
          <div class="no-stakes-note">⚠️ Sign price does not include stakes. Add stakes below if needed.</div>
          <div class="stake-options">
            ${STAKE_OPTIONS.map((stake) => html`
              <div class="addon-option ${this.selectedStake.id === stake.id ? "selected" : ""}" @click=${(e: Event) => this.onStakeSelect(e, stake)}>
                <input type="radio" name="stake" .checked=${this.selectedStake.id === stake.id} />
                <div>
                  <div class="addon-label">${stake.label}</div>
                  <div class="addon-note">${stake.description}</div>
                  ${stake.pricePerSign > 0 ? html`<div class="addon-price">+${formatMoney(stake.pricePerSign)} per sign</div>` : ""}
                </div>
              </div>
            `)}
          </div>
        </div>
      </div>

      <div class="custom-size-callout">
        Need a <strong>custom size</strong> (up to 8' × 4')? Please call or email us for a quote!
      </div>

      ${this.renderPriceArea()}
    `;
  }
}