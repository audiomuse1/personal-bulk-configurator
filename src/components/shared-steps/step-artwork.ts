import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { sharedStyles } from "../shared-styles.js";
import "../info-tooltip.js";

const ACCEPTED_FILES =
  ".eps,.ai,.psd,.png,.jpg,.jpeg,.gif,.bmp,.svg,.tiff,.tif,.pdf";
const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB
const MIN_RECOMMENDED_DPI = 300;
const MIN_ACCEPTABLE_DPI = 150;

// Vector formats that don't need DPI checks
const VECTOR_EXTENSIONS = [".eps", ".ai", ".svg", ".pdf", ".psd"];

// Per-product artwork specs
const PRODUCT_ARTWORK_SPECS: Record<string, { area: string; notes: string }> = {
  tshirt: {
    area: "12\" × 16\" print area",
    notes: "Vector files (AI, EPS, SVG) or 300 DPI raster images preferred. For dark garments, provide artwork on a transparent background.",
  },
  sticker: {
    area: "Up to 6\" × 6\" depending on shape",
    notes: "Vector files strongly recommended for clean edges. Include 1/8\" bleed outside the cut line.",
  },
  button: {
    area: "Circular print area based on button size",
    notes: "Keep important elements away from edges — artwork wraps around the button. Vector preferred.",
  },
  mug: {
    area: "8.5\" × 3.5\" wrap area",
    notes: "Artwork wraps around the mug. Provide as a flat rectangle. 300 DPI minimum for photo-quality.",
  },
  cancooler: {
    area: "8\" × 3.5\" per side",
    notes: "Similar to mugs — artwork wraps around the cooler. Vector or 300 DPI raster.",
  },
  yardsign: {
    area: "Varies by sign size (e.g., 24\" × 18\")",
    notes: "Signs are viewed from a distance — bold text and high contrast work best. Vector preferred.",
  },
};

interface FileAnalysis {
  name: string;
  size: number;
  type: string;
  extension: string;
  isVector: boolean;
  width?: number;
  height?: number;
  dpi?: number;
  dpiWarning?: "low" | "very-low" | null;
}

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
        accent-color: var(--bulk-configurator-accent, #4ecdc4);
      }

      /* ── Artwork specs banner ─────────────────────────────── */
      .artwork-specs {
        margin: 12px 0;
        padding: 12px 16px;
        background: var(--bulk-card-header-bg, #f0f8ff);
        border: 1px solid var(--bulk-card-border, #d0e8f0);
        border-radius: 6px;
        font-size: 13px;
        line-height: 1.6;
      }
      .artwork-specs-title {
        font-weight: 700;
        font-size: 14px;
        margin-bottom: 4px;
        color: var(--bulk-configurator-text-color, #333);
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .artwork-specs-area {
        font-weight: 600;
        color: var(--bulk-configurator-accent, #4ecdc4);
      }
      .artwork-specs-notes {
        color: var(--bulk-configurator-text-muted, #666);
        margin-top: 4px;
      }

      /* ── Drop zone ────────────────────────────────────────── */
      .upload-section {
        margin: 16px 0;
        padding: 16px;
        border: 2px solid var(--bulk-card-border, #e0e0e0);
        border-radius: 6px;
        transition: border-color 0.3s, background-color 0.3s;
      }
      .upload-section.valid {
        border-color: #2ecc71;
      }
      .upload-section.invalid-highlight {
        border-color: #e74c3c;
        animation: shake 0.4s ease-in-out;
      }
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-4px); }
        75% { transform: translateX(4px); }
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
      .upload-section-title .status.done { color: #2ecc71; }
      .upload-section-title .status.needed { color: #e74c3c; }

      /* ── Drag and drop zone ───────────────────────────────── */
      .drop-zone {
        border: 2px dashed var(--bulk-card-border, #ccc);
        border-radius: 8px;
        padding: 24px 16px;
        text-align: center;
        cursor: pointer;
        transition: all 0.2s ease;
        background: var(--bulk-card-body-bg, #fafafa);
      }
      .drop-zone:hover {
        border-color: var(--bulk-configurator-accent, #4ecdc4);
        background: #f0faf9;
      }
      .drop-zone.drag-over {
        border-color: var(--bulk-configurator-accent, #4ecdc4);
        background: #e8f8f5;
        transform: scale(1.01);
      }
      .drop-zone-icon {
        font-size: 32px;
        margin-bottom: 8px;
      }
      .drop-zone-text {
        font-size: 14px;
        color: var(--bulk-configurator-text-muted, #666);
        margin-bottom: 4px;
      }
      .drop-zone-text strong {
        color: var(--bulk-configurator-accent, #4ecdc4);
        cursor: pointer;
      }
      .drop-zone-hint {
        font-size: 12px;
        color: #999;
      }

      .file-input { display: none; }

      /* ── File display ─────────────────────────────────────── */
      .file-display {
        display: flex;
        gap: 12px;
        align-items: flex-start;
        padding: 12px;
        background: #f9f9f9;
        border-radius: 6px;
        border: 1px solid #e8e8e8;
      }
      .file-preview-thumb {
        width: 80px;
        height: 80px;
        object-fit: contain;
        border: 1px solid #ddd;
        border-radius: 4px;
        background: white;
        flex-shrink: 0;
      }
      .file-details {
        flex: 1;
        min-width: 0;
      }
      .file-details-name {
        font-weight: 600;
        font-size: 14px;
        color: #333;
        word-break: break-all;
      }
      .file-details-meta {
        font-size: 12px;
        color: #888;
        margin-top: 2px;
      }
      .file-remove-btn {
        background: none;
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 4px 10px;
        font-size: 12px;
        color: #e74c3c;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.2s;
        flex-shrink: 0;
      }
      .file-remove-btn:hover {
        background: #fdf0ef;
        border-color: #e74c3c;
      }

      /* ── DPI warnings ─────────────────────────────────────── */
      .dpi-badge {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        font-size: 11px;
        font-weight: 600;
        padding: 2px 8px;
        border-radius: 3px;
        margin-top: 4px;
      }
      .dpi-badge.good {
        background: #e8f8f0;
        color: #27ae60;
      }
      .dpi-badge.low {
        background: #fef9e7;
        color: #e67e22;
      }
      .dpi-badge.very-low {
        background: #fdf0ef;
        color: #e74c3c;
      }
      .dpi-badge.vector {
        background: #e8f0fe;
        color: #2b6cb0;
      }

      .dpi-warning {
        font-size: 12px;
        padding: 8px 12px;
        border-radius: 4px;
        margin-top: 8px;
        line-height: 1.5;
      }
      .dpi-warning.low {
        background: #fef9e7;
        border: 1px solid #f0d060;
        color: #856404;
      }
      .dpi-warning.very-low {
        background: #fdf0ef;
        border: 1px solid #f5c6cb;
        color: #721c24;
      }

      /* ── File info/error ──────────────────────────────────── */
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
      .option-info strong { color: #2c3e50; }
      .option-info p { margin: 8px 0; }
      .option-info p:first-child { margin-top: 0; }
      .option-info p:last-child { margin-bottom: 0; }

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
      .checklist-item.done { color: #2ecc71; }
      .checklist-item.done .label {
        text-decoration: line-through;
        color: #999;
      }
      .checklist-item.pending { color: #e67e22; }
    `,
  ];

  @property({ type: String }) printLocationId = "";
  @property({ type: String }) sidedness = "one-sided";
  @property({ type: String }) productType = "";

  @state() artworkOption: "upload" | "email" | "help" = "upload";
  @state() frontFileName = "";
  @state() frontFilePreview = "";
  @state() frontFileError = "";
  @state() frontFileAnalysis: FileAnalysis | null = null;
  @state() frontDragOver = false;
  private frontFile: File | null = null;

  @state() backFileName = "";
  @state() backFilePreview = "";
  @state() backFileError = "";
  @state() backFileAnalysis: FileAnalysis | null = null;
  @state() backDragOver = false;
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
    if (this.artworkOption === "email" || this.artworkOption === "help") return true;
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
    this.frontFileAnalysis = null;
    this.backFile = null;
    this.backFileName = "";
    this.backFilePreview = "";
    this.backFileError = "";
    this.backFileAnalysis = null;
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

  private getFileExtension(name: string): string {
    return "." + (name.split(".").pop()?.toLowerCase() || "");
  }

  private isVectorFile(name: string): boolean {
    return VECTOR_EXTENSIONS.includes(this.getFileExtension(name));
  }

  private formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  }

  private validateFile(file: File): string | null {
    if (file.size > MAX_FILE_SIZE) {
      return "File is too large. Maximum size is 20 MB.";
    }
    const ext = this.getFileExtension(file.name);
    const allowed = ACCEPTED_FILES.split(",");
    if (!allowed.includes(ext)) {
      return `File type "${ext}" not accepted. Please use: AI, EPS, PSD, PDF, SVG, PNG, JPG, or TIFF.`;
    }
    return null;
  }

  private async analyzeFile(file: File): Promise<FileAnalysis> {
    const ext = this.getFileExtension(file.name);
    const isVector = this.isVectorFile(file.name);
    const analysis: FileAnalysis = {
      name: file.name,
      size: file.size,
      type: file.type,
      extension: ext,
      isVector,
      dpiWarning: null,
    };

    // For raster images, check dimensions and estimate DPI
    if (!isVector && file.type.startsWith("image/")) {
      try {
        const dimensions = await this.getImageDimensions(file);
        analysis.width = dimensions.width;
        analysis.height = dimensions.height;

        // Estimate DPI based on typical print sizes
        // We'll assume the longer dimension maps to about 12 inches (t-shirt scale)
        const longerPx = Math.max(dimensions.width, dimensions.height);
        const estimatedDPI = Math.round(longerPx / 12);
        analysis.dpi = estimatedDPI;

        if (estimatedDPI < MIN_ACCEPTABLE_DPI) {
          analysis.dpiWarning = "very-low";
        } else if (estimatedDPI < MIN_RECOMMENDED_DPI) {
          analysis.dpiWarning = "low";
        }
      } catch {
        // Can't analyze — that's ok
      }
    }

    return analysis;
  }

  private getImageDimensions(file: File): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        resolve({ width: img.naturalWidth, height: img.naturalHeight });
        URL.revokeObjectURL(url);
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error("Could not load image"));
      };
      img.src = url;
    });
  }

  private async processFile(file: File, side: "front" | "back") {
    const error = this.validateFile(file);
    if (error) {
      if (side === "front") {
        this.frontFileError = error;
      } else {
        this.backFileError = error;
      }
      return;
    }

    const analysis = await this.analyzeFile(file);

    if (side === "front") {
      this.frontFile = file;
      this.frontFileName = file.name;
      this.frontFilePreview = "";
      this.frontFileError = "";
      this.frontFileAnalysis = analysis;
    } else {
      this.backFile = file;
      this.backFileName = file.name;
      this.backFilePreview = "";
      this.backFileError = "";
      this.backFileAnalysis = analysis;
    }

    // Generate preview for image files
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        if (side === "front") {
          this.frontFilePreview = reader.result as string;
        } else {
          this.backFilePreview = reader.result as string;
        }
      };
      reader.readAsDataURL(file);
    }

    this.dispatchData();
  }

  // ── Drag and drop handlers ──────────────────────────────────────────
  private onDragOver(e: DragEvent, side: "front" | "back") {
    e.preventDefault();
    e.stopPropagation();
    if (side === "front") this.frontDragOver = true;
    else this.backDragOver = true;
  }

  private onDragLeave(e: DragEvent, side: "front" | "back") {
    e.preventDefault();
    e.stopPropagation();
    if (side === "front") this.frontDragOver = false;
    else this.backDragOver = false;
  }

  private onDrop(e: DragEvent, side: "front" | "back") {
    e.preventDefault();
    e.stopPropagation();
    if (side === "front") this.frontDragOver = false;
    else this.backDragOver = false;

    const file = e.dataTransfer?.files?.[0];
    if (file) {
      this.processFile(file, side);
    }
  }

  onFrontFileChange(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) this.processFile(file, "front");
  }

  onBackFileChange(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) this.processFile(file, "back");
  }

  removeFrontFile() {
    this.frontFile = null;
    this.frontFileName = "";
    this.frontFilePreview = "";
    this.frontFileError = "";
    this.frontFileAnalysis = null;
    this.dispatchData();
  }

  removeBackFile() {
    this.backFile = null;
    this.backFileName = "";
    this.backFilePreview = "";
    this.backFileError = "";
    this.backFileAnalysis = null;
    this.dispatchData();
  }

  private uploadSectionClass(isValid: boolean): string {
    if (!this.showValidation) return "upload-section" + (isValid ? " valid" : "");
    return "upload-section" + (isValid ? " valid" : " invalid-highlight");
  }

  private renderDpiBadge(analysis: FileAnalysis | null) {
    if (!analysis) return html``;

    if (analysis.isVector) {
      return html`<span class="dpi-badge vector">✓ Vector — print-ready</span>`;
    }

    if (!analysis.dpi) return html``;

    if (analysis.dpiWarning === "very-low") {
      return html`<span class="dpi-badge very-low">⚠ ~${analysis.dpi} DPI — may print poorly</span>`;
    }
    if (analysis.dpiWarning === "low") {
      return html`<span class="dpi-badge low">⚠ ~${analysis.dpi} DPI — below 300 recommended</span>`;
    }
    return html`<span class="dpi-badge good">✓ ~${analysis.dpi} DPI</span>`;
  }

  private renderDpiWarning(analysis: FileAnalysis | null) {
    if (!analysis || !analysis.dpiWarning) return html``;

    if (analysis.dpiWarning === "very-low") {
      return html`
        <div class="dpi-warning very-low">
          <strong>⚠️ Low resolution detected.</strong> This image is approximately ${analysis.dpi} DPI
          at print size. We recommend 300 DPI for high-quality printing. Your order will still be
          processed, but our design team may reach out about image quality.
        </div>
      `;
    }

    if (analysis.dpiWarning === "low") {
      return html`
        <div class="dpi-warning low">
          <strong>⚠️ Resolution note:</strong> This image is approximately ${analysis.dpi} DPI at print
          size. 300 DPI is recommended for best quality. It may still print acceptably depending on
          the design.
        </div>
      `;
    }

    return html``;
  }

  private renderUploadSlot(
    label: string,
    fileName: string,
    filePreview: string,
    fileError: string,
    fileAnalysis: FileAnalysis | null,
    isValid: boolean,
    isDragOver: boolean,
    side: "front" | "back",
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

        ${fileName && fileAnalysis
          ? html`
              <div class="file-display">
                ${filePreview
                  ? html`<img class="file-preview-thumb" src=${filePreview} alt="Preview" />`
                  : html`
                      <div class="file-preview-thumb" style="display:flex;align-items:center;justify-content:center;font-size:24px;background:#f0f0f0;">
                        ${fileAnalysis.isVector ? "📐" : "📄"}
                      </div>
                    `}
                <div class="file-details">
                  <div class="file-details-name">${fileName}</div>
                  <div class="file-details-meta">
                    ${this.formatFileSize(fileAnalysis.size)}
                    ${fileAnalysis.width ? html` · ${fileAnalysis.width} × ${fileAnalysis.height}px` : ""}
                  </div>
                  ${this.renderDpiBadge(fileAnalysis)}
                </div>
                <button class="file-remove-btn" @click=${onRemoveHandler}>Remove</button>
              </div>
              ${this.renderDpiWarning(fileAnalysis)}
            `
          : html`
              <div
                class="drop-zone ${isDragOver ? "drag-over" : ""}"
                @dragover=${(e: DragEvent) => this.onDragOver(e, side)}
                @dragleave=${(e: DragEvent) => this.onDragLeave(e, side)}
                @drop=${(e: DragEvent) => this.onDrop(e, side)}
                @click=${() => {
                  const input = this.shadowRoot?.getElementById(inputId) as HTMLInputElement;
                  input?.click();
                }}
              >
                <div class="drop-zone-icon">📁</div>
                <div class="drop-zone-text">
                  Drag & drop your file here, or <strong>browse</strong>
                </div>
                <div class="drop-zone-hint">
                  AI, EPS, PSD, PDF, SVG, PNG, JPG, TIFF — 20 MB max
                </div>
              </div>
              <input
                id=${inputId}
                type="file"
                class="file-input"
                accept=${ACCEPTED_FILES}
                @change=${onChangeHandler}
              />
              ${this.showValidation && !isValid
                ? html`<div class="missing-prompt">⚠️ Please upload your ${label.toLowerCase()}</div>`
                : html``}
            `}
        ${fileError ? html`<p class="file-error">⚠️ ${fileError}</p>` : html``}
      </div>
    `;
  }

  private renderArtworkSpecs() {
    const specs = PRODUCT_ARTWORK_SPECS[this.productType];
    if (!specs) return html``;

    return html`
      <div class="artwork-specs">
        <div class="artwork-specs-title">
          🎨 Artwork Specifications
        </div>
        <div class="artwork-specs-area">📐 ${specs.area}</div>
        <div class="artwork-specs-notes">${specs.notes}</div>
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
            request design help. We accept AI, EPS, PSD, PDF, SVG, PNG, JPG,
            TIFF, and more. For best results, provide vector files or
            high-resolution images (300 DPI minimum).
          </info-tooltip>
          <span class="step-header-text">${headerText}</span>
        </div>
        <div class="step-body">
          ${this.renderArtworkSpecs()}

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
                  this.frontFileAnalysis,
                  this.frontValid,
                  this.frontDragOver,
                  "front",
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
                        this.backFileAnalysis,
                        this.backValid,
                        this.backDragOver,
                        "back",
                        (e: Event) => this.onBackFileChange(e),
                        () => this.removeBackFile(),
                        "back-file-input",
                      )}
                    `
                  : html``}
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