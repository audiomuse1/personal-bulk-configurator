import type { ProductConfig } from "../types.js";

import "./tshirt/step-tshirt-garment.js";
import "./sticker/step-sticker-config.js";
import "./button/step-button-config.js";
import "./mug/step-mug-config.js";
import "./cancooler/step-cancooler-config.js";
import "./yardsign/step-yardsign-config.js";

import "../shared-steps/step-artwork.js";
import "../shared-steps/step-union-label.js";
import "../shared-steps/step-notes.js";

const TSHIRT_CONFIG: ProductConfig = {
  productType: "tshirt",
  label: "Custom T-Shirts",
  steps: [
    {
      id: "garment",
      title: "Choose Your Garment",
      tag: "step-tshirt-garment",
    },
    {
      id: "artwork",
      title: "Upload Artwork",
      tag: "step-artwork",
      props: (data) => ({
        productType: "tshirt",
        printLocationId: data.printLocationId || "",
        sidedness: data.printLocationSidedness || "one-sided",
      }),
    },
    {
      id: "union-label",
      title: "Union Label",
      tag: "step-union-label",
    },
    {
      id: "notes",
      title: "Additional Notes",
      tag: "step-notes",
    },
  ],
};

const STICKER_CONFIG: ProductConfig = {
  productType: "sticker",
  label: "Custom Stickers",
  steps: [
    {
      id: "sticker-config",
      title: "Configure Your Stickers",
      tag: "step-sticker-config",
    },
    {
      id: "artwork",
      title: "Upload Artwork",
      tag: "step-artwork",
      props: () => ({
        productType: "sticker",
        printLocationId: "sticker-front",
        sidedness: "one-sided",
      }),
    },
    {
      id: "union-label",
      title: "Union Label",
      tag: "step-union-label",
    },
    {
      id: "notes",
      title: "Additional Notes",
      tag: "step-notes",
    },
  ],
};

const BUTTON_CONFIG: ProductConfig = {
  productType: "button",
  label: "Custom Buttons",
  steps: [
    {
      id: "button-config",
      title: "Configure Your Buttons",
      tag: "step-button-config",
    },
    {
      id: "artwork",
      title: "Upload Artwork",
      tag: "step-artwork",
      props: () => ({
        productType: "button",
        printLocationId: "button-front",
        sidedness: "one-sided",
      }),
    },
    {
      id: "union-label",
      title: "Union Label",
      tag: "step-union-label",
    },
    {
      id: "notes",
      title: "Additional Notes",
      tag: "step-notes",
    },
  ],
};

const MUG_CONFIG: ProductConfig = {
  productType: "mug",
  label: "Custom Mugs",
  steps: [
    {
      id: "mug-config",
      title: "Configure Your Mugs",
      tag: "step-mug-config",
    },
    {
      id: "artwork",
      title: "Upload Artwork",
      tag: "step-artwork",
      props: () => ({
        productType: "mug",
        printLocationId: "mug-wrap",
        sidedness: "one-sided",
      }),
    },
    {
      id: "union-label",
      title: "Union Label",
      tag: "step-union-label",
    },
    {
      id: "notes",
      title: "Additional Notes",
      tag: "step-notes",
    },
  ],
};

const CANCOOLER_CONFIG: ProductConfig = {
  productType: "cancooler",
  label: "Custom Can Coolers",
  steps: [
    {
      id: "cancooler-config",
      title: "Configure Your Can Coolers",
      tag: "step-cancooler-config",
    },
    {
      id: "artwork",
      title: "Upload Artwork",
      tag: "step-artwork",
      props: (data) => ({
        productType: "cancooler",
        printLocationId: "cooler-wrap",
        sidedness:
          data.coolerPrintSide?.id === "two-sided" ? "two-sided" : "one-sided",
      }),
    },
    {
      id: "union-label",
      title: "Union Label",
      tag: "step-union-label",
    },
    {
      id: "notes",
      title: "Additional Notes",
      tag: "step-notes",
    },
  ],
};

const YARDSIGN_CONFIG: ProductConfig = {
  productType: "yardsign",
  label: "Coroplast Yard Signs",
  steps: [
    {
      id: "yardsign-config",
      title: "Configure Your Yard Signs",
      tag: "step-yardsign-config",
    },
    {
      id: "artwork",
      title: "Upload Artwork",
      tag: "step-artwork",
      props: (data) => ({
        productType: "yardsign",
        printLocationId: "sign-face",
        sidedness:
          data.signPrintSide?.id === "two-sided" ? "two-sided" : "one-sided",
      }),
    },
    {
      id: "union-label",
      title: "Union Label",
      tag: "step-union-label",
    },
    {
      id: "notes",
      title: "Additional Notes",
      tag: "step-notes",
    },
  ],
};

const REGISTRY: Record<string, ProductConfig> = {
  tshirt: TSHIRT_CONFIG,
  sticker: STICKER_CONFIG,
  button: BUTTON_CONFIG,
  mug: MUG_CONFIG,
  cancooler: CANCOOLER_CONFIG,
  yardsign: YARDSIGN_CONFIG,
};

export function getProductConfig(productType: string): ProductConfig {
  return REGISTRY[productType] || TSHIRT_CONFIG;
}