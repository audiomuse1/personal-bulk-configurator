import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import { sharedStyles } from "../shared-styles.js";
import "../info-tooltip.js";

@customElement("step-notes")
export class StepNotes extends LitElement {
  static styles = [
    sharedStyles,
    css`
      textarea {
        width: 100%;
        min-height: 120px;
        padding: 12px;
        font-size: 15px;
        border: 2px solid #ddd;
        border-radius: 6px;
        resize: vertical;
        font-family: inherit;
        box-sizing: border-box;
      }
      textarea:focus {
        border-color: #4ecdc4;
        outline: none;
      }
      .char-count {
        text-align: right;
        font-size: 12px;
        color: #999;
        margin-top: 4px;
      }
      .optional-badge {
        display: inline-block;
        background: #e0e0e0;
        color: #666;
        padding: 2px 8px;
        border-radius: 10px;
        font-size: 11px;
        font-weight: 600;
        margin-left: 8px;
      }
    `,
  ];

  @state() notes = "";

  get isComplete() {
    return true;
  }

  public validate(): boolean {
    return true;
  }

  onInput(e: Event) {
    this.notes = (e.target as HTMLTextAreaElement).value;
    this.dispatchEvent(
      new CustomEvent("step-data", {
        detail: { notes: this.notes },
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
            Use this space for any special requests such as deadlines,
            Pantone color matching, placement instructions, or anything else
            our production team should know. This is optional — leave blank
            if you have no additional notes.
          </info-tooltip>
          <span class="step-header-text">
            Additional Customer Notes
            <span class="optional-badge">Optional</span>
          </span>
        </div>
        <div class="step-body">
          <p>
            If you have additional notes or requests you would like to send in
            with your order, please type them below:
          </p>
          <textarea
            placeholder="Enter any special instructions, deadlines, color matching notes..."
            .value=${this.notes}
            @input=${this.onInput}
            maxlength="2000"
          ></textarea>
          <div class="char-count">${this.notes.length} / 2,000</div>
        </div>
      </div>
    `;
  }
}