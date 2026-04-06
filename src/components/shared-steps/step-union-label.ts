import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import { sharedStyles } from "../shared-styles.js";
import "../info-tooltip.js";

@customElement("step-union-label")
export class StepUnionLabel extends LitElement {
  static styles = [
    sharedStyles,
    css`
      .union-info {
        font-size: 14px;
        line-height: 1.6;
        margin-bottom: 16px;
      }

      .union-option {
        display: flex;
        align-items: center;
        gap: 8px;
        margin: 12px 0;
        font-size: 16px;
        cursor: pointer;
        padding: 12px 16px;
        border: 2px solid #e0e0e0;
        border-radius: 6px;
        transition: all 0.2s;
      }

      .union-option:hover {
        border-color: #4ecdc4;
        background: #f9fffe;
      }

      .union-option.selected {
        border-color: #4ecdc4;
        background: #e8f8f5;
      }

      .union-option input {
        accent-color: #4ecdc4;
      }

      a {
        color: #4ecdc4;
      }
    `,
  ];

  @state() unionLabel = true;

  connectedCallback() {
    super.connectedCallback();
    this.dispatchEvent(
      new CustomEvent("step-data", {
        detail: { unionLabel: this.unionLabel },
        bubbles: true,
        composed: true,
      }),
    );
  }

  get isComplete() {
    return true;
  }

  public validate(): boolean {
    return true;
  }

  onToggle(val: boolean) {
    this.unionLabel = val;
    this.dispatchEvent(
      new CustomEvent("step-data", {
        detail: { unionLabel: val },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    return html`
      <div class="step-card">
        <div class="step-header">
          <info-tooltip>
            Our design team will add our union label in a discreet location on
            your product if requested. We will always send a proof and make any
            adjustments as needed.
          </info-tooltip>
          <span class="step-header-text">We're a Union Print Shop!</span>
        </div>
        <div class="step-body">
          <p class="union-info">
            We can add a small Union label to your product so everyone will know
            it was printed and shipped by workers earning a living wage with
            access to quality, affordable health care. Our design team will send
            a proof!
          </p>
          <p><a href="#">Learn More</a></p>
          <hr />
          <label class="union-option ${this.unionLabel ? "selected" : ""}">
            <input
              type="radio"
              name="union"
              ?checked=${this.unionLabel}
              @change=${() => this.onToggle(true)}
            />
            ✊ Yes, add a Union Label!
          </label>
          <label class="union-option ${!this.unionLabel ? "selected" : ""}">
            <input
              type="radio"
              name="union"
              ?checked=${!this.unionLabel}
              @change=${() => this.onToggle(false)}
            />
            No thanks!
          </label>
        </div>
      </div>
    `;
  }
}