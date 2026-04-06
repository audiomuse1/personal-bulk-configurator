import { CONFIG } from "./config.js";

const SESSION_PREFIX = CONFIG.sessionPrefix;

// ============================================
// Modifier IDs per product
// ============================================

interface ProductModifiers {
  orderId: number;
  frontArtwork?: number;
  backArtwork?: number;
  artwork?: number;
}

const PRODUCT_MODIFIERS: Record<number, ProductModifiers> = {
  475: { orderId: 3706, frontArtwork: 3712, backArtwork: 3713 },
  476: { orderId: 3707, artwork: 3714 },
  477: { orderId: 3708, artwork: 3716 },
  478: { orderId: 3711, artwork: 3717 },
  479: { orderId: 3709, frontArtwork: 3718, backArtwork: 3719 },
  480: { orderId: 3710, frontArtwork: 3720, backArtwork: 3721 },
};

// ============================================
// Session persistence
// ============================================

export function saveSession(productType: string, data: any): void {
  try {
    sessionStorage.setItem(SESSION_PREFIX + productType, JSON.stringify(data));
  } catch {}
}

export function loadSession(productType: string): any {
  try {
    const raw = sessionStorage.getItem(SESSION_PREFIX + productType);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearSession(productType: string): void {
  try {
    sessionStorage.removeItem(SESSION_PREFIX + productType);
  } catch {}
}

// ============================================
// Order config persistence in localStorage
// ============================================

interface OrderConfig {
  productType: string;
  productId: number;
  fields: Record<string, string>;
  artworkDataUrl?: string;
  artworkDataUrl2?: string;
  timestamp: number;
  cartId?: string;
  lineItemId?: string;
  needsPriceFix: boolean;
  orderId: string;
}

export function getPendingOrderConfigs(): OrderConfig[] {
  try {
    return JSON.parse(localStorage.getItem("bulk-order-pending") || "[]");
  } catch {
    return [];
  }
}

export function updatePendingConfigs(configs: OrderConfig[]): void {
  try {
    localStorage.setItem("bulk-order-pending", JSON.stringify(configs));
  } catch {}
}

export function clearPendingOrderConfigs(): void {
  try {
    localStorage.removeItem("bulk-order-pending");
    localStorage.removeItem("bulk-cart-id");
    localStorage.removeItem("bulk-cart-urls");
    localStorage.removeItem("bulk-pending-messages");
    localStorage.removeItem("bulk-pending-fixes");
    const types = [
      "tshirt",
      "sticker",
      "button",
      "mug",
      "cancooler",
      "yardsign",
    ];
    for (const t of types) {
      sessionStorage.removeItem(SESSION_PREFIX + t);
    }
  } catch {}
}

// ============================================
// Artwork thumbnail capture
// ============================================

export function fileToThumbnail(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const MAX = 150;
        let w = img.width;
        let h = img.height;
        if (w > h) {
          if (w > MAX) {
            h = (h * MAX) / w;
            w = MAX;
          }
        } else {
          if (h > MAX) {
            w = (w * MAX) / h;
            h = MAX;
          }
        }
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", 0.7));
      };
      img.onerror = reject;
      img.src = reader.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ============================================
// Generate unique order ID
// ============================================

export function generateOrderId(productType: string): string {
  return (
    productType +
    "-" +
    Date.now().toString(36) +
    "-" +
    Math.random().toString(36).slice(2, 8)
  );
}

// ============================================
// Native form submission via FormData + fetch
// ============================================

export async function submitNativeForm(
  productId: number,
  productType: string,
  orderId: string,
  frontFile: File | null,
  backFile: File | null,
): Promise<void> {
  const modifiers = PRODUCT_MODIFIERS[productId];
  if (!modifiers) {
    console.error(
      "[submitNativeForm] No modifier config for product " + productId,
    );
    window.location.href = "/cart.php";
    return;
  }

  console.log("[submitNativeForm] Submitting via FormData:", {
    productId,
    productType,
    orderId,
    hasFrontFile: !!frontFile,
    hasBackFile: !!backFile,
    frontFileName: frontFile?.name || "none",
    backFileName: backFile?.name || "none",
  });

  const formData = new FormData();

  // Required fields
  formData.append("product_id", String(productId));
  formData.append("action", "add");
  formData.append("qty[]", "1");

  // Order ID modifier (text field for uniqueness + matching)
  formData.append("attribute[" + modifiers.orderId + "]", orderId);

  // Front artwork file
  if (frontFile) {
    const fileModId = modifiers.frontArtwork || modifiers.artwork;
    if (fileModId) {
      formData.append("attribute[" + fileModId + "]", frontFile, frontFile.name);
      console.log("[submitNativeForm] Attached front file:", frontFile.name,
        "size:", frontFile.size, "type:", frontFile.type,
        "modifier:", fileModId);
    }
  }

  // Back artwork file
  if (backFile && modifiers.backArtwork) {
    formData.append("attribute[" + modifiers.backArtwork + "]", backFile, backFile.name);
    console.log("[submitNativeForm] Attached back file:", backFile.name,
      "size:", backFile.size, "type:", backFile.type,
      "modifier:", modifiers.backArtwork);
  }

  try {
    const response = await fetch("/cart.php", {
      method: "POST",
      body: formData,
      credentials: "same-origin",
      redirect: "follow",
    });

    console.log("[submitNativeForm] Response status:", response.status);
    console.log("[submitNativeForm] Response URL:", response.url);

    window.location.href = "/cart.php";
  } catch (err) {
    console.error("[submitNativeForm] Fetch error:", err);
    console.log("[submitNativeForm] Falling back to form element submission");
    submitNativeFormFallback(productId, productType, orderId, frontFile, backFile);
  }
}

// Fallback: traditional form element
function submitNativeFormFallback(
  productId: number,
  productType: string,
  orderId: string,
  frontFile: File | null,
  backFile: File | null,
): void {
  const modifiers = PRODUCT_MODIFIERS[productId];
  if (!modifiers) {
    window.location.href = "/cart.php";
    return;
  }

  const form = document.createElement("form");
  form.method = "POST";
  form.action = "/cart.php";
  form.enctype = "multipart/form-data";
  form.style.display = "none";

  const pidInput = document.createElement("input");
  pidInput.type = "hidden";
  pidInput.name = "product_id";
  pidInput.value = String(productId);
  form.appendChild(pidInput);

  const actionInput = document.createElement("input");
  actionInput.type = "hidden";
  actionInput.name = "action";
  actionInput.value = "add";
  form.appendChild(actionInput);

  const qtyInput = document.createElement("input");
  qtyInput.type = "hidden";
  qtyInput.name = "qty[]";
  qtyInput.value = "1";
  form.appendChild(qtyInput);

  const orderIdInput = document.createElement("input");
  orderIdInput.type = "hidden";
  orderIdInput.name = "attribute[" + modifiers.orderId + "]";
  orderIdInput.value = orderId;
  form.appendChild(orderIdInput);

  if (frontFile) {
    const fileModId = modifiers.frontArtwork || modifiers.artwork;
    if (fileModId) {
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.name = "attribute[" + fileModId + "]";
      const dt = new DataTransfer();
      dt.items.add(frontFile);
      fileInput.files = dt.files;
      form.appendChild(fileInput);
    }
  }

  if (backFile && modifiers.backArtwork) {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.name = "attribute[" + modifiers.backArtwork + "]";
    const dt = new DataTransfer();
    dt.items.add(backFile);
    fileInput.files = dt.files;
    form.appendChild(fileInput);
  }

  document.body.appendChild(form);
  form.submit();
}

// ============================================
// Artwork option labels
// ============================================

const ARTWORK_OPTION_LABELS: Record<string, string> = {
  upload: "Uploaded with order",
  email: "Will send later via email",
  help: "Needs design help",
};

// ============================================
// Build custom fields
// ============================================

export function buildCustomFields(
  productType: string,
  stepData: Record<string, any>,
): Record<string, string> {
  const fields: Record<string, string> = {
    "Configurator Type": productType,
  };

  switch (productType) {
    case "tshirt":
      if (stepData.tier) fields["Garment Tier"] = stepData.tier;
      if (stepData.fit) fields["Garment Fit"] = stepData.fit;
      if (stepData.printLocationId)
        fields["Print Location"] = stepData.printLocationId;
      // Single color mode (unisex-only or womens-only)
      if (stepData.color)
        fields["Color"] =
          stepData.color.name + " (#" + stepData.color.hex + ")";
      // Dual color mode (both unisex and women's)
      if (stepData.fit === "both") {
        if (stepData.unisexColor)
          fields["Unisex Color"] =
            stepData.unisexColor.name + " (#" + stepData.unisexColor.hex + ")";
        if (stepData.womensColor)
          fields["Women's Color"] =
            stepData.womensColor.name + " (#" + stepData.womensColor.hex + ")";
      }
      if (stepData.unisexQuantities) {
        const uQty = Object.entries(stepData.unisexQuantities)
          .filter(([_, q]) => (q as number) > 0)
          .map(([s, q]) => s + ":" + q)
          .join(", ");
        if (uQty) fields["Unisex Sizes"] = uQty;
      }
      if (stepData.womensQuantities) {
        const wQty = Object.entries(stepData.womensQuantities)
          .filter(([_, q]) => (q as number) > 0)
          .map(([s, q]) => s + ":" + q)
          .join(", ");
        if (wQty) fields["Women's Sizes"] = wQty;
      }
      break;

    case "sticker":
      if (stepData.shape) fields["Shape"] = stepData.shape.name;
      if (stepData.width) fields["Width"] = stepData.width + '"';
      if (stepData.height) fields["Height"] = stepData.height + '"';
      if (stepData.finish) fields["Finish"] = stepData.finish.name;
      if (stepData.quantity) fields["Quantity"] = String(stepData.quantity);
      break;

    case "button":
      if (stepData.buttonSize)
        fields["Button Size"] = stepData.buttonSize.label;
      if (stepData.quantity) fields["Quantity"] = String(stepData.quantity);
      break;

    case "mug":
      if (stepData.mugStyle) fields["Mug Style"] = stepData.mugStyle.label;
      if (stepData.quantity) fields["Quantity"] = String(stepData.quantity);
      if (stepData.includePackaging)
        fields["Packaging"] = "Individual gift box (+\$2.50/mug)";
      break;

    case "cancooler":
      if (stepData.coolerColor)
        fields["Cooler Color"] = stepData.coolerColor.name;
      if (stepData.coolerPrintSide)
        fields["Print Sides"] = stepData.coolerPrintSide.label;
      if (stepData.quantity) fields["Quantity"] = String(stepData.quantity);
      break;

    case "yardsign":
      if (stepData.signPrintSide)
        fields["Print Sides"] = stepData.signPrintSide.label;
      if (stepData.quantity) fields["Quantity"] = String(stepData.quantity);
      if (stepData.fullBleed) fields["Full Bleed"] = "Yes (+\$0.50/sign)";
      if (stepData.stakeOption && stepData.stakeOption.id !== "none")
        fields["Stakes"] = stepData.stakeOption.label;
      break;
  }

  // Artwork option — always include with human-readable label
  if (stepData.artworkOption) {
    fields["Upload Artwork"] =
      ARTWORK_OPTION_LABELS[stepData.artworkOption] || stepData.artworkOption;
  }
  if (stepData.frontFileName) fields["Artwork File"] = stepData.frontFileName;
  if (stepData.backFileName) fields["Artwork File 2"] = stepData.backFileName;

  // Always include Union Label — default to "No" if not set
  fields["Union Label"] = stepData.unionLabel ? "Yes" : "No";

  // Always include Notes — show "None" if blank
  fields["Notes"] = stepData.notes ? stepData.notes : "None";

  if (stepData.priceResult) {
    fields["Quoted Price"] =
      "$" + Number(stepData.priceResult.totalPrice).toFixed(2);
    fields["Quoted Quantity"] = String(
      stepData.priceResult.totalQuantity || 1,
    );
  }

  return fields;
}