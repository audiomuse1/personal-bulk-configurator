import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { sharedStyles } from "../shared-styles.js";
import "../info-tooltip.js";

const ACCEPTED_FILES =
  ".eps,.ai,.psd,.png,.jpg,.jpeg,.gif,.bmp,.svg,.tiff,.pdf";
const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

@customElement("step-artwork")
export class StepArtwork extends LitElement {
  static styles = [
    sharedStyles,
    css`
      .upload-option {
        display: flex;
        align-items: center;
        gap: 8px;
        margin: 8px 0;
        cursor: pointer;
        font-size: 15px;
      }
      .upload-option input[type="radio"] {
        accent-color: #4ecdc4;
      }

      .upload-section {
        margin: 16px 0;
        padding: 16px;
        border: 2px solid #e0e0e0;
        border-radius: 6px;
        transition: border-color 0.3s;
      }
      .upload-section.valid {
        border-color: #2ecc71;
      }
      .upload-section.invalid-highlight {
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

      .upload-section-title {
        font-weight: 600;
        font-size: 15px;
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .upload-section-title .status {
        font-size: 13px;
        font-weight: 400;
      }
      .upload-section-title .status.done {
        color: #2ecc71;
      }
      .upload-section-title .status.needed {
        color: #e74c3c;
      }

      .file-input-wrapper {
        display: flex;
        align-items: center;
        gap: 12px;
        margin: 8px 0;
      }
      .file-btn {
        padding: 8px 16px;
        background: #333;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 13px;
        font-weight: 600;
        transition: all 0.2s;
      }
      .file-btn:hover {
        background: #555;
      }
      .file-input {
        display: none;
      }

      .file-name {
        font-size: 14px;
        color: #333;
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .file-name .remove {
        color: #e74c3c;
        cursor: pointer;
        font-weight: 700;
        font-size: 16px;
        padding: 0 4px;
      }
      .file-name .remove:hover {
        color: #c0392b;
      }

      .preview-container {
        margin: 12px 0;
        padding: 8px;
        background: #f9f9f9;
        border-radius: 4px;
        display: inline-block;
      }
      .preview {
        max-width: 200px;
        max-height: 200px;
        border: 1px solid #ddd;
        border-radius: 4px;
      }

      .file-info {
        font-size: 13px;
        color: #888;
        margin-top: 8px;
      }
      .file-error {
        font-size: 13px;
        color: #e74c3c;
        margin-top: 4px;
        font-weight: 600;
      }

      .missing-prompt {
        color: #e74c3c;
        font-size: 14px;
        margin-top: 8px;
        padding: 8px 12px;
        background: #fdf0ef;
        border-radius: 4px;
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .option-info {
        margin-top: 12px;
        padding: 12px 16px;
        background: #e8f8f5;
        border-radius: 6px;
        font-size: 14px;
        color: #333;
        line-height: 1.6;
      }
      .option-info strong {
        color: #2c3e50;
      }
      .option-info p {
        margin: 8px 0;
      }
      .option-info p:first-child {
        margin-top: 0;
      }
      .option-info p:last-child {
        margin-bottom: 0;
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
    `,
  ];

  @property({ type: String }) printLocationId = "";
  @property({ type: String }) sidedness = "one-sided";

  @state() artworkOption: "upload" | "email" | "help" = "upload";
  @state() frontFileName = "";
  @state() frontFilePreview = "";
  @state() frontFileError = "";
  private frontFile: File | null = null;

  @state() backFileName = "";
  @state() backFilePreview = "";
  @state() backFileError = "";
  private backFile: File | null = null;

  @state() showValidation = false;

  get isTwoSided(): boolean {
    return this.sidedness === "two-sided";
  }

  private getUploadLabels(): string[] {
    switch (this.printLocationId) {
      case "front-only":
        return ["Front Artwork"];
      case "back-only":
        return ["Back Artwork"];
      case "left-chest":
        return ["Left Chest Artwork"];
      case "right-chest":
        return ["Right Chest Artwork"];
      case "full-front-full-back":
        return ["Front Artwork", "Back Artwork"];
      case "full-front-left-chest":
        return ["Front Artwork", "Left Chest Artwork"];
      default:
        if (this.isTwoSided) {
          return ["Front Artwork", "Back Artwork"];
        }
        return ["Artwork"];
    }
  }

  get frontValid(): boolean {
    if (this.artworkOption !== "upload") return true;
    return !!this.frontFileName;
  }

  get backValid(): boolean {
    if (this.artworkOption !== "upload") return true;
    if (!this.isTwoSided) return true;
    return !!this.backFileName;
  }

  get isComplete(): boolean {
    if (this.artworkOption === "email" || this.artworkOption === "help")
      return true;
    if (this.isTwoSided) return !!(this.frontFileName && this.backFileName);
    return !!this.frontFileName;
  }

  public validate(): boolean {
    this.showValidation = true;
    if (!this.isComplete) {
      const firstInvalid = this.shadowRoot?.querySelector(
        ".upload-section.invalid-highlight",
      );
      if (firstInvalid) {
        firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return false;
    }
    return true;
  }

  private clearAllFiles() {
    this.frontFile = null;
    this.frontFileName = "";
    this.frontFilePreview = "";
    this.frontFileError = "";
    this.backFile = null;
    this.backFileName = "";
    this.backFilePreview = "";
    this.backFileError = "";
  }

  private dispatchData() {
    const isUpload = this.artworkOption === "upload";
    this.dispatchEvent(
      new CustomEvent("step-data", {
        detail: {
          artworkOption: this.artworkOption,
          file: isUpload ? this.frontFile : null,
          backFile: isUpload ? this.backFile : null,
          frontFileName: isUpload ? this.frontFileName : "",
          backFileName: isUpload ? this.backFileName : "",
        },
        bubbles: true,
        composed: true,
      }),
    );
  }

  onOptionChange(opt: "upload" | "email" | "help") {
    this.artworkOption = opt;
    this.showValidation = false;
    if (opt !== "upload") {
      this.clearAllFiles();
    }
    this.dispatchData();
  }

  private validateFile(file: File): string | null {
    if (file.size > MAX_FILE_SIZE) {
      return "File is too large. Maximum size is 20 MB.";
    }
    const ext = "." + file.name.split(".").pop()?.toLowerCase();
    const allowed = ACCEPTED_FILES.split(",");
    if (!allowed.includes(ext)) {
      return "File type not accepted. Please use: " + ACCEPTED_FILES;
    }
    return null;
  }

  onFrontFileChange(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const error = this.validateFile(file);
    if (error) {
      this.frontFileError = error;
      return;
    }

    this.frontFile = file;
    this.frontFileName = file.name;
    this.frontFilePreview = "";
    this.frontFileError = "";

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        this.frontFilePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
    this.dispatchData();
  }

  onBackFileChange(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const error = this.validateFile(file);
    if (error) {
      this.backFileError = error;
      return;
    }

    this.backFile = file;
    this.backFileName = file.name;
    this.backFilePreview = "";
    this.backFileError = "";

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        this.backFilePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
    this.dispatchData();
  }

  removeFrontFile() {
    this.frontFile = null;
    this.frontFileName = "";
    this.frontFilePreview = "";
    this.frontFileError = "";
    this.dispatchData();
  }

  removeBackFile() {
    this.backFile = null;
    this.backFileName = "";
    this.backFilePreview = "";
    this.backFileError = "";
    this.dispatchData();
  }

  private uploadSectionClass(isValid: boolean): string {
    if (!this.showValidation)
      return "upload-section" + (isValid ? " valid" : "");
    return "upload-section" + (isValid ? " valid" : " invalid-highlight");
  }

  private renderUploadSlot(
    label: string,
    fileName: string,
    filePreview: string,
    fileError: string,
    isValid: boolean,
    onChangeHandler: (e: Event) => void,
    onRemoveHandler: () => void,
    inputId: string,
  ) {
    return html`
      <div class="${this.uploadSectionClass(isValid)}">
        <p class="upload-section-title">
          <span>${label}</span>
          <span class="status ${isValid ? "done" : "needed"}">
            ${isValid ? "✓ Uploaded" : "Required"}
          </span>
        </p>

        ${fileName
          ? html`
              <div class="file-name">
                <span>📎 ${fileName}</span>
                <span
                  class="remove"
                  title="Remove file"
                  @click=${onRemoveHandler}
                  >✕</span
                >
              </div>
              ${filePreview
                ? html`
                    <div class="preview-container">
                      <img class="preview" src=${filePreview} alt="Preview" />
                    </div>
                  `
                : html``}
            `
          : html`
              <div class="file-input-wrapper">
                <button
                  class="file-btn"
                  @click=${() => {
                    const input = this.shadowRoot?.getElementById(
                      inputId,
                    ) as HTMLInputElement;
                    input?.click();
                  }}
                >
                  Choose File
                </button>
                <span style="color: #999; font-size: 13px;"
                  >No file chosen</span
                >
              </div>
              <input
                id=${inputId}
                type="file"
                class="file-input"
                accept=${ACCEPTED_FILES}
                @change=${onChangeHandler}
              />
              ${this.showValidation && !isValid
                ? html`
                    <div class="missing-prompt">
                      ⚠️ Please upload your ${label.toLowerCase()}
                    </div>
                  `
                : html``}
            `}
        ${fileError ? html`<p class="file-error">⚠️ ${fileError}</p>` : html``}
      </div>
    `;
  }

  private renderChecklist() {
    if (this.artworkOption !== "upload") return html``;

    const labels = this.getUploadLabels();
    const items = [{ label: labels[0], done: this.frontValid }];
    if (this.isTwoSided && labels.length > 1) {
      items.push({ label: labels[1], done: this.backValid });
    }

    const allDone = items.every((i) => i.done);
    if (allDone) return html``;

    return html`
      <div class="checklist">
        <div class="checklist-title">📋 Upload required artwork:</div>
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

  render() {
    const labels = this.getUploadLabels();
    const headerText = this.isTwoSided
      ? "Upload Artwork"
      : "Upload " + labels[0];

    return html`
      <div class="step-card">
        <div class="step-header">
          <info-tooltip>
            Upload your print-ready artwork, or choose to send it later or
            request design help. We accept .eps, .ai, .psd, .png, .jpg, .svg,
            .pdf, and more. For best results, provide vector files or
            high-resolution images (300 DPI minimum).
          </info-tooltip>
          <span class="step-header-text">${headerText}</span>
        </div>
        <div class="step-body">
          <label class="upload-option">
            <input
              type="radio"
              name="artwork"
              ?checked=${this.artworkOption === "upload"}
              @change=${() => this.onOptionChange("upload")}
            />
            Upload now
          </label>
          <label class="upload-option">
            <input
              type="radio"
              name="artwork"
              ?checked=${this.artworkOption === "email"}
              @change=${() => this.onOptionChange("email")}
            />
            I'll send later via email
          </label>
          <label class="upload-option">
            <input
              type="radio"
              name="artwork"
              ?checked=${this.artworkOption === "help"}
              @change=${() => this.onOptionChange("help")}
            />
            I Need Design Help!
          </label>

          ${this.artworkOption === "upload"
            ? html`
                <hr />
                ${this.renderChecklist()}
                ${this.renderUploadSlot(
                  labels[0],
                  this.frontFileName,
                  this.frontFilePreview,
                  this.frontFileError,
                  this.frontValid,
                  (e: Event) => this.onFrontFileChange(e),
                  () => this.removeFrontFile(),
                  "front-file-input",
                )}
                ${this.isTwoSided && labels.length > 1
                  ? html`
                      ${this.renderUploadSlot(
                        labels[1],
                        this.backFileName,
                        this.backFilePreview,
                        this.backFileError,
                        this.backValid,
                        (e: Event) => this.onBackFileChange(e),
                        () => this.removeBackFile(),
                        "back-file-input",
                      )}
                    `
                  : html``}
                <p class="file-info">📏 20 MB Maximum file size</p>
                <p class="file-info">
                  📁 Accepted: .eps, .ai, .psd, .png, .jpg, .jpeg, .gif, .bmp,
                  .svg, .tiff, .pdf
                </p>
              `
            : html``}
          ${this.artworkOption === "email"
            ? html`
                <div class="option-info">
                  <p>
                    Great! Our design team will be in touch via the email address
                    you provide in checkout.
                  </p>
                </div>
              `
            : html``}
          ${this.artworkOption === "help"
            ? html`
                <div class="option-info">
                  <p>Excellent, we'll still get your order going!</p>
                  <p>
                    Orders that require design assistance will ship within 5
                    business days of final art approval.
                  </p>
                  <p>
                    Our design team will be in touch by the end of next business
                    day via the email you provide in checkout.
                  </p>
                </div>
              `
            : html``}
        </div>
      </div>
    `;
  }
}