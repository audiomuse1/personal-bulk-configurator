import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { sharedStyles } from "./shared-styles.js";
import {
  saveSession,
  loadSession,
  clearSession,
  buildCustomFields,
  fileToThumbnail,
  generateOrderId,
  submitNativeForm,
} from "./bigcommerce.js";
import { getProductConfig } from "./products/product-registry.js";
import type { ProductConfig, StepConfig, ValidatableStep } from "./types.js";

@customElement("bulk-configurator")
export class BulkConfigurator extends LitElement {
  static styles = [
    sharedStyles,
    css`
      :host {
        display: block;
      }

      .step-indicator {
        display: flex;
        justify-content: center;
        gap: 8px;
        margin-bottom: 8px;
      }

      .step-dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #ddd;
        cursor: pointer;
        transition: all 0.2s;
      }

      .step-dot.active {
        background: #4ecdc4;
        transform: scale(1.2);
      }

      .step-dot.complete {
        background: #333;
      }

      .step-labels {
        display: flex;
        justify-content: center;
        gap: 24px;
        margin-bottom: 20px;
        font-size: 12px;
        color: #999;
      }

      .step-label {
        text-align: center;
        transition: color 0.2s;
      }

      .step-label.active {
        color: #333;
        font-weight: 600;
      }

      .step-label.complete {
        color: #2ecc71;
      }

      .hidden {
        display: none;
      }

      .nav-buttons {
        display: flex;
        justify-content: center;
        gap: 12px;
        margin-top: 20px;
        padding: 16px 0;
      }

      button {
        padding: 10px 24px;
        font-size: 14px;
        font-weight: 600;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.2s;
      }

      button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      button:not(:disabled):hover {
        transform: translateY(-1px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      }

      .btn-back {
        background: #999;
        color: white;
      }

      .btn-next {
        background: #333;
        color: white;
      }

      .btn-cart {
        background: #4ecdc4;
        color: white;
        font-size: 16px;
        padding: 12px 32px;
      }

      .btn-cart:disabled {
        background: #ccc;
      }

      .btn-cart.loading {
        background: #95d5d0;
        cursor: wait;
      }

      .step-title {
        text-align: center;
        font-size: 18px;
        font-weight: 700;
        margin-bottom: 16px;
        color: #333;
      }

      .validation-toast {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 12px 24px;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 600;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        animation: slideDown 0.3s ease-out;
      }

      .validation-toast.error {
        background: #e74c3c;
        color: white;
      }

      .validation-toast.success {
        background: #2ecc71;
        color: white;
      }

      .validation-toast.fade-out {
        animation: slideUp 0.3s ease-in forwards;
      }

      @keyframes slideDown {
        from {
          transform: translateX(-50%) translateY(-20px);
          opacity: 0;
        }
        to {
          transform: translateX(-50%) translateY(0);
          opacity: 1;
        }
      }

      @keyframes slideUp {
        from {
          transform: translateX(-50%) translateY(0);
          opacity: 1;
        }
        to {
          transform: translateX(-50%) translateY(-20px);
          opacity: 0;
        }
      }

      .price-bar {
        position: sticky;
        bottom: 0;
        left: 0;
        right: 0;
        background: #2c3e50;
        color: white;
        padding: 12px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 16px;
        font-weight: 600;
        border-radius: 8px 8px 0 0;
        box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
        margin-top: 16px;
      }

      .price-bar .price-amount {
        font-size: 22px;
        color: #4ecdc4;
      }

      .price-bar .price-unit {
        font-size: 14px;
        color: #bbb;
        margin-left: 8px;
      }
    `,
  ];

  @property({ type: String }) productType = "tshirt";
  @property({ type: Number }) productId = 0;
  @state() currentStep = 0;
  @state() stepData: Record<string, any> = {};
  @state() toastMessage = "";
  @state() toastType: "error" | "success" = "error";
  @state() toastFading = false;
  @state() addingToCart = false;

  private productConfig!: ProductConfig;

  get steps(): StepConfig[] {
    return this.productConfig.steps;
  }

  get isLastStep(): boolean {
    return this.currentStep === this.steps.length - 1;
  }

  connectedCallback() {
    super.connectedCallback();
    this.productConfig = getProductConfig(this.productType);

    const saved = loadSession(this.productType);
    if (saved) {
      this.stepData = saved.stepData || {};
      this.currentStep = saved.currentStep || 0;
    }
  }

  firstUpdated() {
    this.renderRoot.addEventListener("step-data", ((e: CustomEvent) => {
      e.stopPropagation();
      this.stepData = { ...this.stepData, ...e.detail };
      this.persistSession();
      this.requestUpdate();

      // Re-dispatch for external listeners (e.g., template page sidebar preview)
      this.dispatchEvent(
        new CustomEvent("config-update", {
          detail: { ...this.stepData },
          bubbles: true,
          composed: true,
        }),
      );
    }) as EventListener);
  }

  updated(changedProps: Map<string, unknown>) {
    if (
      changedProps.has("productType") &&
      changedProps.get("productType") !== undefined
    ) {
      const oldType = changedProps.get("productType") as string;
      if (oldType && oldType !== this.productType) {
        this.productConfig = getProductConfig(this.productType);
        this.currentStep = 0;

        const saved = loadSession(this.productType);
        if (saved) {
          this.stepData = saved.stepData || {};
          this.currentStep = saved.currentStep || 0;
        } else {
          this.stepData = {};
        }
      }
    }
  }

  persistSession() {
    saveSession(this.productType, {
      stepData: this.stepData,
      currentStep: this.currentStep,
    });
  }

  private showToast(msg: string, type: "error" | "success" = "error") {
    this.toastMessage = msg;
    this.toastType = type;
    this.toastFading = false;
    setTimeout(() => {
      this.toastFading = true;
      setTimeout(() => {
        this.toastMessage = "";
        this.toastFading = false;
      }, 300);
    }, 2700);
  }

  private validateCurrentStep(): boolean {
    const stepConfig = this.steps[this.currentStep];
    const stepEl = this.shadowRoot?.querySelector(
      stepConfig.tag,
    ) as ValidatableStep | null;
    if (stepEl && typeof stepEl.validate === "function") {
      return stepEl.validate();
    }
    return true;
  }

  next() {
    if (!this.validateCurrentStep()) {
      this.showToast(
        "⚠️ Please complete all required fields before continuing",
      );
      return;
    }
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
      this.persistSession();
      this.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  back() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.persistSession();
      this.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  goToStep(i: number) {
    if (i < this.currentStep) {
      this.currentStep = i;
      this.persistSession();
    } else if (i > this.currentStep) {
      if (this.validateCurrentStep() && i === this.currentStep + 1) {
        this.currentStep = i;
        this.persistSession();
      } else if (!this.validateCurrentStep()) {
        this.showToast("⚠️ Please complete this step first");
      } else {
        this.showToast("⚠️ Please complete each step in order");
      }
    }
  }

  async handleAddToCart() {
    if (this.addingToCart) return;

    const pr = this.stepData.priceResult;
    if (!pr || !pr.totalPrice) {
      this.showToast("⚠️ No price calculated");
      return;
    }

    this.addingToCart = true;

    try {
      const customFields = buildCustomFields(this.productType, this.stepData);

      const frontFile =
        this.stepData.file instanceof File ? this.stepData.file : null;
      const backFile =
        this.stepData.backFile instanceof File ? this.stepData.backFile : null;

      // Capture thumbnails for cart page display
      let artworkDataUrl: string | undefined;
      let artworkDataUrl2: string | undefined;

      if (frontFile) {
        try {
          artworkDataUrl = await fileToThumbnail(frontFile);
        } catch {}
      }
      if (backFile) {
        try {
          artworkDataUrl2 = await fileToThumbnail(backFile);
        } catch {}
      }

      // Generate unique order ID for matching on cart page
      const orderId = generateOrderId(this.productType);

      // Store order config in localStorage for cart page to use
      const orderConfig = {
        productType: this.productType,
        productId: this.productId,
        fields: customFields,
        artworkDataUrl,
        artworkDataUrl2,
        timestamp: Date.now(),
        needsPriceFix: true,
        orderId: orderId,
      };

      const pendingKey = "bulk-order-pending";
      const existing = JSON.parse(
        localStorage.getItem(pendingKey) || "[]",
      );
      existing.push(orderConfig);
      localStorage.setItem(pendingKey, JSON.stringify(existing));

      console.log("[handleAddToCart] Order config stored:", {
        productType: this.productType,
        productId: this.productId,
        price: pr.totalPrice,
        orderId,
        hasFrontFile: !!frontFile,
        hasBackFile: !!backFile,
      });

      // Dispatch event for any external listeners
      this.dispatchEvent(
        new CustomEvent("add-to-cart", {
          detail: {
            productId: this.productId,
            productType: this.productType,
            quantity: pr.totalQuantity || 1,
            price: pr.totalPrice,
            customFields,
          },
          bubbles: true,
          composed: true,
        }),
      );

      if (this.productId > 0) {
        this.showToast("✅ Adding to cart...", "success");
        clearSession(this.productType);

        await submitNativeForm(
          this.productId,
          this.productType,
          orderId,
          frontFile,
          backFile,
        );
      } else {
        console.log("[handleAddToCart] Dev mode — order config:", customFields);
        this.showToast("✅ Added to cart! (dev mode)", "success");
        this.addingToCart = false;
      }
    } catch (err) {
      console.error("[handleAddToCart] Error:", err);
      this.showToast("⚠️ Error: " + String(err));
      this.addingToCart = false;
    }
  }

  private getCartButtonText(): string {
    if (this.addingToCart) return "Adding...";
    if (this.stepData.priceResult) {
      const price =
        "$" + Number(this.stepData.priceResult.totalPrice).toFixed(2);
      return "Add to Cart — " + price;
    }
    return "Add to Cart";
  }

  private getPriceDisplay(): {
    total: string;
    unit: string;
  } | null {
    const pr = this.stepData.priceResult;
    if (!pr || !pr.totalPrice) return null;
    const total = "$" + Number(pr.totalPrice).toFixed(2);
    const qty = pr.totalQuantity || 0;
    const unit =
      qty > 0 ? "$" + (pr.totalPrice / qty).toFixed(2) + " ea." : "";
    return { total, unit };
  }

  private renderStepElement(
    stepConfig: StepConfig,
    props: Record<string, any>,
  ) {
    switch (stepConfig.tag) {
      case "step-tshirt-garment":
        return html`<step-tshirt-garment
          .productType=${this.productType}
        ></step-tshirt-garment>`;
      case "step-sticker-config":
        return html`<step-sticker-config></step-sticker-config>`;
      case "step-button-config":
        return html`<step-button-config></step-button-config>`;
      case "step-mug-config":
        return html`<step-mug-config></step-mug-config>`;
      case "step-cancooler-config":
        return html`<step-cancooler-config></step-cancooler-config>`;
      case "step-yardsign-config":
        return html`<step-yardsign-config></step-yardsign-config>`;
      case "step-artwork":
        return html`<step-artwork
          .printLocationId=${props.printLocationId || ""}
          .sidedness=${props.sidedness || "one-sided"}
          .productType=${this.productType}
        ></step-artwork>`;
      case "step-union-label":
        return html`<step-union-label></step-union-label>`;
      case "step-notes":
        return html`<step-notes></step-notes>`;
      default:
        return html`<div>Unknown step: ${stepConfig.tag}</div>`;
    }
  }

  private renderStep(stepConfig: StepConfig, index: number) {
    const isActive = this.currentStep === index;
    const props = stepConfig.props ? stepConfig.props(this.stepData) : {};
    return html`
      <div class="${isActive ? "" : "hidden"}">
        ${this.renderStepElement(stepConfig, props)}
      </div>
    `;
  }

  render() {
    const priceDisplay = this.getPriceDisplay();

    return html`
      ${this.toastMessage
        ? html`
            <div
              class="validation-toast ${this.toastType} ${this.toastFading
                ? "fade-out"
                : ""}"
            >
              ${this.toastMessage}
            </div>
          `
        : ""}

      <div class="step-indicator">
        ${this.steps.map(
          (_, i) => html`
            <div
              class="step-dot
                ${i === this.currentStep ? "active" : ""}
                ${i < this.currentStep ? "complete" : ""}"
              @click=${() => this.goToStep(i)}
            ></div>
          `,
        )}
      </div>

      <div class="step-labels">
        ${this.steps.map(
          (step, i) => html`
            <span
              class="step-label
                ${i === this.currentStep ? "active" : ""}
                ${i < this.currentStep ? "complete" : ""}"
            >
              ${step.title}
            </span>
          `,
        )}
      </div>

      <div class="step-title">
        Step ${this.currentStep + 1}: ${this.steps[this.currentStep].title}
      </div>

      ${this.steps.map((step, i) => this.renderStep(step, i))}
      ${priceDisplay
        ? html`
            <div class="price-bar">
              <span>Your Quote</span>
              <span>
                <span class="price-amount">${priceDisplay.total}</span>
                <span class="price-unit">${priceDisplay.unit}</span>
              </span>
            </div>
          `
        : ""}

      <div class="nav-buttons">
        ${this.currentStep > 0
          ? html`<button class="btn-back" @click=${this.back}>Back</button>`
          : ""}
        ${this.isLastStep
          ? html`
              <button
                class="btn-cart ${this.addingToCart ? "loading" : ""}"
                ?disabled=${this.addingToCart}
                @click=${this.handleAddToCart}
              >
                ${this.getCartButtonText()}
              </button>
            `
          : html`<button class="btn-next" @click=${this.next}>Next</button>`}
      </div>
    `;
  }
}