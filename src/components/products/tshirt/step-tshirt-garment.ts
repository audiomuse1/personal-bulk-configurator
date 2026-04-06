import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {
  getSizesForStyle,
  getTShirtData,
  type TShirtData,
  type GarmentColor,
  type GarmentSize,
  type PrintLocation,
} from "./tshirt-sheets-data.js";
import { calculateTShirtPrice } from "./tshirt-pricing-engine.js";
import "../../info-tooltip.js";

interface TierOption {
  id: string;
  name: string;
}
interface FitOption {
  id: string;
  name: string;
}
interface DisplayPriceLine {
  label: string;
  priceEach: string;
  priceLine: string;
}

@customElement("step-tshirt-garment")
export class StepTShirtGarment extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: inherit;
    }
    .card {
      margin-bottom: 16px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      overflow: visible;
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
    .card-header .header-text {
      flex: 1;
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
    select {
      padding: 8px 12px;
      font-size: 14px;
      border: 1px solid #ccc;
      border-radius: 4px;
      min-width: 200px;
    }
    select:focus {
      border-color: #4ecdc4;
      outline: none;
    }
    .colors {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 8px;
    }
    .swatch {
      width: 32px;
      height: 32px;
      border-radius: 4px;
      cursor: pointer;
      border: 2px solid transparent;
      transition: all 0.15s;
    }
    .swatch:hover {
      opacity: 0.8;
      transform: scale(1.1);
    }
    .swatch.picked {
      border-color: #333;
      outline: 2px solid #333;
    }
    .swatch.lt {
      border-color: #ddd;
    }
    .color-section {
      margin-bottom: 16px;
    }
    .color-section-title {
      font-weight: 600;
      font-size: 14px;
      margin-bottom: 6px;
      color: #555;
    }
    .color-section-selected {
      font-size: 13px;
      color: #888;
      margin-bottom: 6px;
    }
    .color-section-selected strong {
      color: #333;
    }
    .color-divider {
      border: none;
      border-top: 1px solid #e0e0e0;
      margin: 12px 0;
    }
    .size-group {
      margin-bottom: 16px;
    }
    .size-group-title {
      text-align: center;
      font-weight: 600;
      margin-bottom: 12px;
    }
    .sizes {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      justify-content: center;
    }
    .sz {
      display: flex;
      align-items: center;
    }
    .sz label {
      padding: 6px 12px;
      font-weight: 600;
      font-size: 13px;
      min-width: 32px;
      text-align: center;
    }
    .sz input {
      width: 50px;
      padding: 6px;
      font-size: 13px;
      border: 1px solid #ccc;
      text-align: center;
      border-radius: 4px;
    }
    .sz input:focus {
      border-color: #4ecdc4;
      outline: none;
    }
    .pricebox {
      padding: 16px;
      margin-top: 16px;
      background: #f5f5f5;
      border-radius: 6px;
      border: 1px solid #e0e0e0;
    }
    .prow {
      display: flex;
      justify-content: space-between;
      padding: 4px 0;
      font-size: 14px;
    }
    .prow-size {
      font-weight: 600;
    }
    .ptotal {
      display: flex;
      justify-content: space-between;
      border-top: 2px solid #333;
      margin-top: 8px;
      padding-top: 8px;
      font-weight: 700;
      font-size: 18px;
    }
    .loading {
      text-align: center;
      padding: 20px;
      color: #999;
    }
    .price-prompt {
      margin-top: 16px;
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
    .qty-summary {
      text-align: center;
      margin-top: 12px;
      padding: 8px;
      background: #e8f8f5;
      border-radius: 4px;
    }
    .checklist {
      margin-top: 16px;
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
    .checklist-item.done { color: #2ecc71; }
    .checklist-item.done .label { text-decoration: line-through; color: #999; }
    .checklist-item.pending { color: #e67e22; }
  `;

  @property({ type: String }) productType = "tshirt";
  @state() sheetData: TShirtData | null = null;
  @state() loading = true;
  @state() tiers: TierOption[] = [];
  @state() printLocations: PrintLocation[] = [];
  @state() selectedLocationId = "";
  @state() selectedTier = "";
  @state() selectedFit = "";
  @state() selectedColor: GarmentColor | null = null;
  @state() selectedUnisexColor: GarmentColor | null = null;
  @state() selectedWomensColor: GarmentColor | null = null;
  @state() displayColors: GarmentColor[] = [];
  @state() unisexColors: GarmentColor[] = [];
  @state() womensColors: GarmentColor[] = [];
  @state() unisexSizes: GarmentSize[] = [];
  @state() womensSizes: GarmentSize[] = [];
  @state() unisexQuantities: Record<string, number> = {};
  @state() womensQuantities: Record<string, number> = {};
  @state() priceLines: DisplayPriceLine[] = [];
  @state() totalQty = 0;
  @state() totalPrice = "";
  @state() showValidation = false;

  private fitOptions: FitOption[] = [
    { id: "unisex", name: "Unisex" },
    { id: "womens", name: "Women's" },
    { id: "both", name: "Unisex and Women's" },
  ];

  get unisexStyleId(): string { return this.selectedTier + "-unisex"; }
  get womensStyleId(): string { return this.selectedTier + "-womens"; }
  get unisexBrand(): string {
    if (!this.sheetData) return "";
    const s = this.sheetData.styles.find((st) => st.id === this.unisexStyleId);
    return s ? s.brand : "";
  }
  get womensBrand(): string {
    if (!this.sheetData) return "";
    const s = this.sheetData.styles.find((st) => st.id === this.womensStyleId);
    return s ? s.brand : "";
  }
  get hasSelections(): boolean { return !!(this.selectedTier && this.selectedFit); }
  get showUnisexSizes(): boolean { return this.selectedFit === "unisex" || this.selectedFit === "both"; }
  get showWomensSizes(): boolean { return this.selectedFit === "womens" || this.selectedFit === "both"; }
  get isBothFit(): boolean { return this.selectedFit === "both"; }
  get effectiveUnisexColor(): GarmentColor | null { return this.isBothFit ? this.selectedUnisexColor : this.selectedColor; }
  get effectiveWomensColor(): GarmentColor | null { return this.isBothFit ? this.selectedWomensColor : this.selectedColor; }
  get locationValid(): boolean { return !!this.selectedLocationId; }
  get tierValid(): boolean { return !!this.selectedTier; }
  get fitValid(): boolean { return !!this.selectedFit; }
  get colorValid(): boolean {
    if (this.isBothFit) return !!this.selectedUnisexColor && !!this.selectedWomensColor;
    return !!this.selectedColor;
  }
  get quantityValid(): boolean { return this.computeTotalQty() > 0; }
  get allValid(): boolean {
    return this.locationValid && this.tierValid && this.fitValid && this.colorValid && this.quantityValid;
  }

  private computeTotalQty(): number {
    const uQty = Object.values(this.unisexQuantities).reduce((s, q) => s + q, 0);
    const wQty = Object.values(this.womensQuantities).reduce((s, q) => s + q, 0);
    return uQty + wQty;
  }

  private getSelectedLocationSidedness(): string {
    if (!this.sheetData) return "one-sided";
    const loc = this.sheetData.printLocations.find((l) => l.id === this.selectedLocationId);
    return loc ? loc.sidedness : "one-sided";
  }

  public validate(): boolean {
    this.showValidation = true;
    if (!this.allValid) {
      const firstInvalid = this.shadowRoot?.querySelector(".card.invalid-highlight");
      if (firstInvalid) firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
      return false;
    }
    return true;
  }

  async connectedCallback() {
    super.connectedCallback();
    this.loading = true;
    try {
      this.sheetData = await getTShirtData();
      this.printLocations = this.sheetData.printLocations;
      this.deriveTiers();
    } catch (err) {
      console.error("Failed to load data:", err);
    }
    this.loading = false;
  }

  private deriveTiers() {
    if (!this.sheetData) return;
    const tierMap = new Map<string, string>();
    for (const style of this.sheetData.styles) {
      const tier = style.id.replace(/-unisex$/, "").replace(/-womens$/, "");
      if (!tierMap.has(tier)) {
        const name = style.name.replace(/ Unisex$/, "").replace(/ Women's$/, "").trim();
        tierMap.set(tier, name);
      }
    }
    this.tiers = Array.from(tierMap.entries()).map(([id, name]) => ({ id, name }));
  }

  private resetColorsAndBelow() {
    this.selectedColor = null;
    this.selectedUnisexColor = null;
    this.selectedWomensColor = null;
    this.displayColors = [];
    this.unisexColors = [];
    this.womensColors = [];
    this.unisexQuantities = {};
    this.womensQuantities = {};
    this.priceLines = [];
    this.totalQty = 0;
    this.totalPrice = "";
  }

  onLocationChange(e: Event) {
    this.selectedLocationId = (e.target as HTMLSelectElement).value;
    this.dispatchEvent(new CustomEvent("step-data", {
      detail: { printLocationId: this.selectedLocationId, printLocationSidedness: this.getSelectedLocationSidedness() },
      bubbles: true, composed: true,
    }));
    this.doPrice();
  }

  onTierChange(e: Event) {
    this.selectedTier = (e.target as HTMLSelectElement).value;
    this.selectedFit = "";
    this.resetColorsAndBelow();
    this.dispatchEvent(new CustomEvent("step-data", {
      detail: { tier: this.selectedTier, fit: "" },
      bubbles: true, composed: true,
    }));
  }

  onFitChange(e: Event) {
    this.selectedFit = (e.target as HTMLSelectElement).value;
    this.resetColorsAndBelow();
    if (!this.sheetData || !this.selectedTier || !this.selectedFit) return;

    if (this.selectedFit === "unisex") {
      this.displayColors = this.sheetData.colors[this.unisexStyleId] || [];
      this.unisexSizes = getSizesForStyle(this.unisexStyleId);
    } else if (this.selectedFit === "womens") {
      this.displayColors = this.sheetData.colors[this.womensStyleId] || [];
      this.womensSizes = getSizesForStyle(this.womensStyleId);
    } else if (this.selectedFit === "both") {
      this.unisexColors = this.sheetData.colors[this.unisexStyleId] || [];
      this.womensColors = this.sheetData.colors[this.womensStyleId] || [];
      this.unisexSizes = getSizesForStyle(this.unisexStyleId);
      this.womensSizes = getSizesForStyle(this.womensStyleId);
    }

    this.dispatchEvent(new CustomEvent("step-data", {
      detail: { fit: this.selectedFit, printLocationId: this.selectedLocationId },
      bubbles: true, composed: true,
    }));
  }

  onColorSelect(color: GarmentColor) { this.selectedColor = color; this.doPrice(); }
  onUnisexColorSelect(color: GarmentColor) { this.selectedUnisexColor = color; this.doPrice(); }
  onWomensColorSelect(color: GarmentColor) { this.selectedWomensColor = color; this.doPrice(); }

  onUnisexQtyChange(size: GarmentSize, val: string) {
    this.unisexQuantities = { ...this.unisexQuantities, [size.size]: parseInt(val) || 0 };
    this.doPrice();
  }
  onWomensQtyChange(size: GarmentSize, val: string) {
    this.womensQuantities = { ...this.womensQuantities, [size.size]: parseInt(val) || 0 };
    this.doPrice();
  }

  doPrice() {
    if (!this.sheetData) return;
    this.totalQty = this.computeTotalQty();

    const hasRequiredColors = this.isBothFit
      ? !!(this.selectedUnisexColor && this.selectedWomensColor)
      : !!this.selectedColor;

    if (!this.selectedTier || !this.selectedFit || !this.selectedLocationId || !hasRequiredColors || this.totalQty < 1) {
      this.priceLines = [];
      this.totalPrice = "";
      this.dispatchStepData(null, null);
      return;
    }

    const sizes = this.sheetData.sizes;
    const grandTotal = this.totalQty;
    const unisexColorHex = this.effectiveUnisexColor?.hex || "";
    const womensColorHex = this.effectiveWomensColor?.hex || "";

    const unisexItems = this.showUnisexSizes
      ? sizes.filter((s) => (this.unisexQuantities[s.size] || 0) > 0).map((s) => ({ size: s.size, sizeTier: s.sizeTier, quantity: this.unisexQuantities[s.size] }))
      : [];
    const womensItems = this.showWomensSizes
      ? sizes.filter((s) => (this.womensQuantities[s.size] || 0) > 0).map((s) => ({ size: s.size, sizeTier: s.sizeTier, quantity: this.womensQuantities[s.size] }))
      : [];

    const unisexResult = unisexItems.length > 0
      ? calculateTShirtPrice(this.unisexStyleId, this.selectedLocationId, unisexColorHex, unisexItems, this.sheetData, grandTotal)
      : null;
    const womensResult = womensItems.length > 0
      ? calculateTShirtPrice(this.womensStyleId, this.selectedLocationId, womensColorHex, womensItems, this.sheetData, grandTotal)
      : null;

    const allLines: DisplayPriceLine[] = [];
    let runningTotal = 0;
    let runningQty = 0;

    if (unisexResult) {
      const prefix = this.selectedFit === "both" ? "Unisex " : "";
      for (const l of unisexResult.lines) {
        allLines.push({ label: prefix + l.size + " × " + l.quantity, priceEach: "$" + l.unitPrice.toFixed(2), priceLine: "$" + l.lineTotal.toFixed(2) });
      }
      runningTotal += unisexResult.totalPrice;
      runningQty += unisexResult.totalQuantity;
    }
    if (womensResult) {
      const prefix = this.selectedFit === "both" ? "Women's " : "";
      for (const l of womensResult.lines) {
        allLines.push({ label: prefix + l.size + " × " + l.quantity, priceEach: "$" + l.unitPrice.toFixed(2), priceLine: "$" + l.lineTotal.toFixed(2) });
      }
      runningTotal += womensResult.totalPrice;
      runningQty += womensResult.totalQuantity;
    }

    this.priceLines = allLines;
    this.totalQty = runningQty;
    this.totalPrice = "$" + runningTotal.toFixed(2);
    this.dispatchStepData(unisexResult, womensResult);
  }

  // ... CONTINUES FROM PART 6A

  private dispatchStepData(unisexResult: any, womensResult: any) {
    const totalPrice = (unisexResult?.totalPrice || 0) + (womensResult?.totalPrice || 0);
    const totalQuantity = (unisexResult?.totalQuantity || 0) + (womensResult?.totalQuantity || 0);
    this.dispatchEvent(
      new CustomEvent("step-data", {
        detail: {
          tier: this.selectedTier,
          fit: this.selectedFit,
          printLocationId: this.selectedLocationId,
          printLocationSidedness: this.getSelectedLocationSidedness(),
          color: this.isBothFit ? null : this.selectedColor,
          unisexColor: this.isBothFit ? this.selectedUnisexColor : this.selectedColor,
          womensColor: this.isBothFit ? this.selectedWomensColor : this.selectedColor,
          unisexStyleId: this.showUnisexSizes ? this.unisexStyleId : null,
          womensStyleId: this.showWomensSizes ? this.womensStyleId : null,
          unisexQuantities: this.showUnisexSizes ? this.unisexQuantities : null,
          womensQuantities: this.showWomensSizes ? this.womensQuantities : null,
          priceResult: totalPrice > 0
            ? { unisex: unisexResult, womens: womensResult, totalQuantity, totalPrice }
            : null,
        },
        bubbles: true, composed: true,
      }),
    );
  }

  private cardClass(isValid: boolean): string {
    if (!this.showValidation) return "card" + (isValid ? " valid" : "");
    return "card" + (isValid ? " valid" : " invalid-highlight");
  }
  private statusIcon(isValid: boolean): string { return isValid ? "✓" : ""; }
  private statusClass(isValid: boolean): string { return "status " + (isValid ? "done" : "needed"); }

  private renderChecklist() {
    const items = [
      { label: "Print Location", done: this.locationValid },
      { label: "Garment Type", done: this.tierValid },
      { label: "Garment Style", done: this.fitValid },
      { label: "Garment Color", done: this.colorValid },
      { label: "Sizes & Quantities (at least 1)", done: this.quantityValid },
    ];
    if (items.every((i) => i.done)) return html``;
    return html`
      <div class="checklist">
        <div class="checklist-title">📋 Complete these to see your quote:</div>
        ${items.map((item) => html`
          <div class="checklist-item ${item.done ? "done" : "pending"}">
            <span class="icon">${item.done ? "✅" : "⬜"}</span>
            <span class="label">${item.label}</span>
          </div>
        `)}
      </div>
    `;
  }

  private renderColorSection() {
    if (!this.hasSelections) return html``;

    if (this.isBothFit) {
      return html`
        <div class="${this.cardClass(this.colorValid)}">
          <div class="card-header">
            <info-tooltip>
              Select the color of tee you'd like for your order. Colors are approximate and may vary slightly from screen to physical tshirt color.
            </info-tooltip>
            <span class="header-text">Garment Color</span>
            <span class="${this.statusClass(this.colorValid)}">${this.statusIcon(this.colorValid)}</span>
          </div>
          <div class="card-body">
            <div class="color-section">
              <div class="color-section-title">Unisex Color</div>
              <div class="color-section-selected">
                Selected: <strong>${this.selectedUnisexColor ? this.selectedUnisexColor.name : "None — pick a color"}</strong>
              </div>
              ${this.unisexColors.length > 0 ? html`
                <div class="colors">
                  ${this.unisexColors.map((c) => html`
                    <div
                      class="swatch ${this.selectedUnisexColor && this.selectedUnisexColor.hex === c.hex ? "picked" : ""} ${c.brightness === "light" ? "lt" : ""}"
                      style="background-color: #${c.hex}"
                      title=${c.name}
                      @click=${() => this.onUnisexColorSelect(c)}
                    ></div>
                  `)}
                </div>
              ` : html`<p>No colors available.</p>`}
            </div>
            <hr class="color-divider" />
            <div class="color-section">
              <div class="color-section-title">Women's Color</div>
              <div class="color-section-selected">
                Selected: <strong>${this.selectedWomensColor ? this.selectedWomensColor.name : "None — pick a color"}</strong>
              </div>
              ${this.womensColors.length > 0 ? html`
                <div class="colors">
                  ${this.womensColors.map((c) => html`
                    <div
                      class="swatch ${this.selectedWomensColor && this.selectedWomensColor.hex === c.hex ? "picked" : ""} ${c.brightness === "light" ? "lt" : ""}"
                      style="background-color: #${c.hex}"
                      title=${c.name}
                      @click=${() => this.onWomensColorSelect(c)}
                    ></div>
                  `)}
                </div>
              ` : html`<p>No colors available.</p>`}
            </div>
          </div>
        </div>
      `;
    }

    return html`
      <div class="${this.cardClass(this.colorValid)}">
        <div class="card-header">
          <info-tooltip>
            Select the color of tee you'd like for your order. Colors are approximate and may vary slightly from screen to physical tshirt color.
          </info-tooltip>
          <span class="header-text">Garment Color</span>
          <span class="${this.statusClass(this.colorValid)}">${this.statusIcon(this.colorValid)}</span>
        </div>
        <div class="card-body">
          <p>Selected Color: <strong>${this.selectedColor ? this.selectedColor.name : "None — please pick a color"}</strong></p>
          ${this.displayColors.length > 0 ? html`
            <div class="colors">
              ${this.displayColors.map((c) => html`
                <div
                  class="swatch ${this.selectedColor && this.selectedColor.hex === c.hex ? "picked" : ""} ${c.brightness === "light" ? "lt" : ""}"
                  style="background-color: #${c.hex}"
                  title=${c.name}
                  @click=${() => this.onColorSelect(c)}
                ></div>
              `)}
            </div>
          ` : html`<p>No colors available for this combination.</p>`}
        </div>
      </div>
    `;
  }

  private renderPriceArea() {
    if (this.priceLines.length > 0) {
      return html`
        <div class="pricebox">
          ${this.priceLines.map((line) => html`
            <div class="prow">
              <span class="prow-size">${line.label}</span>
              <span>@ ${line.priceEach} = ${line.priceLine}</span>
            </div>
          `)}
          <div class="ptotal">
            <span>Total (${this.totalQty} items)</span>
            <span>${this.totalPrice}</span>
          </div>
        </div>
      `;
    }
    if (this.hasSelections) {
      const missing: string[] = [];
      if (!this.colorValid) missing.push("select a color");
      if (!this.quantityValid) missing.push("enter quantities");
      if (!this.locationValid) missing.push("choose a print location");
      if (missing.length > 0) {
        return html`<div class="price-prompt">👆 Please <strong>${missing.join("</strong> and <strong>")}</strong> to see your live quote</div>`;
      }
    }
    return html``;
  }

  render() {
    if (this.loading) return html`<div class="loading">Loading pricing data...</div>`;
    return html`
      ${this.renderChecklist()}

      <div class="${this.cardClass(this.locationValid)}">
        <div class="card-header">
          <info-tooltip>
            Select the location where you'd like your art to be printed. We offer front, back, left chest printing, or a mixture of those options for Direct-To-Garment printing. If you have other needs, please contact us directly!
          </info-tooltip>
          <span class="header-text">Print Location</span>
          <span class="${this.statusClass(this.locationValid)}">${this.statusIcon(this.locationValid)}</span>
        </div>
        <div class="card-body">
          <select @change=${this.onLocationChange} .value=${this.selectedLocationId}>
            <option value="">— Select Print Location —</option>
            ${this.printLocations.map((l) => html`<option value=${l.id} ?selected=${this.selectedLocationId === l.id}>${l.name}</option>`)}
          </select>
        </div>
      </div>

      <div class="${this.cardClass(this.tierValid)}">
        <div class="card-header">
          <info-tooltip>
            <strong>Standard:</strong> 100% ring spun cotton everyday tee with classic look and fit.<br />
            <strong>Premium:</strong> 100% ring spun cotton high-quality tee that offers a smoother, softer, and lightweight feel.<br />
            <strong>USA-made Premium:</strong> Premium feel and quality, made in the USA. Please note that only Unisex sizes are available for this type.
          </info-tooltip>
          <span class="header-text">Garment Type</span>
          <span class="${this.statusClass(this.tierValid)}">${this.statusIcon(this.tierValid)}</span>
        </div>
        <div class="card-body">
          <select @change=${this.onTierChange} .value=${this.selectedTier}>
            <option value="">— Select Type —</option>
            ${this.tiers.map((t) => html`<option value=${t.id} ?selected=${this.selectedTier === t.id}>${t.name}</option>`)}
          </select>
        </div>
      </div>

      ${this.selectedTier ? html`
        <div class="${this.cardClass(this.fitValid)}">
          <div class="card-header">
            <info-tooltip>
              <strong>Unisex:</strong> Classic tee with looser, more relaxed fit.<br />
              <strong>Women's:</strong> A slim-fit tee that is tighter and more form fitting with shorter sleeves. Sizes may run small.
            </info-tooltip>
            <span class="header-text">Garment Style</span>
            <span class="${this.statusClass(this.fitValid)}">${this.statusIcon(this.fitValid)}</span>
          </div>
          <div class="card-body">
            <select @change=${this.onFitChange} .value=${this.selectedFit}>
              <option value="">— Select Style —</option>
              ${this.fitOptions.map((f) => html`<option value=${f.id} ?selected=${this.selectedFit === f.id}>${f.name}</option>`)}
            </select>
          </div>
        </div>
      ` : html``}

      ${this.hasSelections ? html`
        ${this.renderColorSection()}
        <div class="${this.cardClass(this.quantityValid)}">
          <div class="card-header">
            <info-tooltip>
              Enter the quantities of each garment size. There are price breaks at order shirt totals of 1, 2, 3, 4, 5, 10, 20, 30, 40, 50 and upcharges for 2XL-4XL.
            </info-tooltip>
            <span class="header-text">Sizes and Quantities</span>
            <span class="${this.statusClass(this.quantityValid)}">${this.statusIcon(this.quantityValid)}</span>
          </div>
          <div class="card-body">
            ${this.showUnisexSizes ? html`
              <div class="size-group">
                <p class="size-group-title">Unisex Sizes${this.unisexBrand ? " (" + this.unisexBrand + ")" : ""}</p>
                <div class="sizes">
                  ${this.unisexSizes.map((s) => html`
                    <div class="sz">
                      <label>${s.size}</label>
                      <input type="number" min="0" .value=${String(this.unisexQuantities[s.size] || "")} placeholder="0" @input=${(e: Event) => this.onUnisexQtyChange(s, (e.target as HTMLInputElement).value)} />
                    </div>
                  `)}
                </div>
              </div>
            ` : html``}
            ${this.showWomensSizes ? html`
              <div class="size-group">
                <p class="size-group-title">Women's Sizes${this.womensBrand ? " (" + this.womensBrand + ")" : ""}</p>
                <div class="sizes">
                  ${this.womensSizes.map((s) => html`
                    <div class="sz">
                      <label>${s.size}</label>
                      <input type="number" min="0" .value=${String(this.womensQuantities[s.size] || "")} placeholder="0" @input=${(e: Event) => this.onWomensQtyChange(s, (e.target as HTMLInputElement).value)} />
                    </div>
                  `)}
                </div>
              </div>
            ` : html``}
            <div class="qty-summary">
              Total Quantity: <strong>${this.computeTotalQty()}</strong>
              ${this.computeTotalQty() === 0 ? html` <span style="color: #e67e22;">— enter at least 1</span>` : html``}
            </div>
          </div>
        </div>
        ${this.renderPriceArea()}
      ` : html``}
    `;
  }
}