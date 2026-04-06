import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("info-tooltip")
export class InfoTooltip extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      position: relative;
      align-items: center;
      z-index: 10;
    }

    .info-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: #e8696e;
      color: white;
      font-size: 13px;
      font-weight: 700;
      font-style: italic;
      font-family: Georgia, "Times New Roman", serif;
      cursor: pointer;
      border: none;
      padding: 0;
      line-height: 1;
      transition: background 0.2s, transform 0.2s;
      flex-shrink: 0;
    }

    .info-btn:hover {
      background: #d35459;
      transform: scale(1.1);
    }

    .info-btn.active {
      background: #d35459;
    }

    .tooltip-overlay {
      position: absolute;
      top: calc(100% + 8px);
      left: 0;
      min-width: 280px;
      max-width: 380px;
      padding: 14px 16px;
      background: #4ecdc4;
      color: white;
      border-radius: 8px;
      font-size: 13px;
      line-height: 1.6;
      font-weight: 400;
      font-style: normal;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.18);
      z-index: 1000;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-4px);
      transition: opacity 0.2s, transform 0.2s, visibility 0.2s;
      pointer-events: none;
    }

    .tooltip-overlay.visible {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
      pointer-events: auto;
    }

    .tooltip-overlay::before {
      content: "";
      position: absolute;
      top: -6px;
      left: 14px;
      width: 12px;
      height: 12px;
      background: #4ecdc4;
      transform: rotate(45deg);
    }

    /* If tooltip would go off-screen right, flip it */
    :host([position="right"]) .tooltip-overlay {
      left: auto;
      right: 0;
    }
    :host([position="right"]) .tooltip-overlay::before {
      left: auto;
      right: 14px;
    }

    .tooltip-overlay ::slotted(strong),
    .tooltip-overlay strong {
      color: #fff;
      font-weight: 700;
    }

    .tooltip-close {
      position: absolute;
      top: 6px;
      right: 8px;
      background: none;
      border: none;
      color: rgba(255, 255, 255, 0.7);
      font-size: 16px;
      cursor: pointer;
      padding: 2px 4px;
      line-height: 1;
    }

    .tooltip-close:hover {
      color: white;
    }
  `;

  @property({ type: String }) position: "left" | "right" = "left";
  @state() private _visible = false;

  private _hideTimer: number | null = null;
  private _boundOutsideClick = this._onOutsideClick.bind(this);

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener("click", this._boundOutsideClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("click", this._boundOutsideClick);
    if (this._hideTimer) clearTimeout(this._hideTimer);
  }

  private _onOutsideClick(e: Event) {
    if (!this._visible) return;
    const path = e.composedPath();
    if (!path.includes(this)) {
      this._visible = false;
    }
  }

  private _onBtnClick(e: Event) {
    e.stopPropagation();
    this._visible = !this._visible;
  }

  private _onMouseEnter() {
    if (this._hideTimer) {
      clearTimeout(this._hideTimer);
      this._hideTimer = null;
    }
    this._visible = true;
  }

  private _onMouseLeave() {
    this._hideTimer = window.setTimeout(() => {
      this._visible = false;
    }, 300);
  }

  private _onClose(e: Event) {
    e.stopPropagation();
    this._visible = false;
  }

  render() {
    return html`
      <div
        @mouseenter=${this._onMouseEnter}
        @mouseleave=${this._onMouseLeave}
      >
        <button
          class="info-btn ${this._visible ? "active" : ""}"
          @click=${this._onBtnClick}
          aria-label="More information"
          type="button"
        >
          i
        </button>
        <div class="tooltip-overlay ${this._visible ? "visible" : ""}">
          <button class="tooltip-close" @click=${this._onClose}>✕</button>
          <slot></slot>
        </div>
      </div>
    `;
  }
}