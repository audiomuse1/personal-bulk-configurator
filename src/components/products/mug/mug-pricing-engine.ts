export interface MugStyle {
  id: string;
  label: string;
  size: string;
  origin: string;
  color: string;
  description: string;
}

export interface MugPriceBracket {
  minQty: number;
  maxQty: number | null;
  price: number;
}

export interface MugPriceResult {
  style: MugStyle;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  packagingPerMug: number;
  packagingTotal: number;
  includePackaging: boolean;
  shippingPerMug: number;
  shippingTotal: number;
  totalPrice: number;
  bracketLabel: string;
}

export const PACKAGING_FEE = 2.5;
export const SHIPPING_FEE = 2.5;

export const MUG_STYLES: MugStyle[] = [
  {
    id: "11oz-nonusa-white",
    label: "11oz Non-USA White",
    size: "11oz",
    origin: "Non-USA",
    color: "White",
    description: "11oz white ceramic mug",
  },
  {
    id: "11oz-nonusa-black",
    label: "11oz Non-USA Black",
    size: "11oz",
    origin: "Non-USA",
    color: "Black",
    description: "11oz black ceramic mug",
  },
  {
    id: "11oz-usa-white",
    label: "11oz USA-made White",
    size: "11oz",
    origin: "USA-made",
    color: "White",
    description: "11oz USA-made white ceramic mug",
  },
  {
    id: "15oz-usa-white",
    label: "15oz USA-made White",
    size: "15oz",
    origin: "USA-made",
    color: "White",
    description: "15oz USA-made white ceramic mug",
  },
];

// Retail pricing from the price chart
// Using NET prices from the internal spreadsheet where available,
// falling back to the retail price chart
const PRICING: Record<string, MugPriceBracket[]> = {
  "11oz-nonusa-white": [
    { minQty: 1, maxQty: 1, price: 22.24 },
    { minQty: 2, maxQty: 4, price: 14.74 },
    { minQty: 5, maxQty: 8, price: 10.24 },
    { minQty: 9, maxQty: 23, price: 8.91 },
    { minQty: 24, maxQty: 35, price: 7.86 },
    { minQty: 36, maxQty: 71, price: 7.66 },
    { minQty: 72, maxQty: 107, price: 7.45 },
    { minQty: 108, maxQty: 143, price: 7.45 },
    { minQty: 144, maxQty: null, price: 7.45 },
  ],
  "11oz-nonusa-black": [
    { minQty: 1, maxQty: 1, price: 23.52 },
    { minQty: 2, maxQty: 4, price: 16.02 },
    { minQty: 5, maxQty: 8, price: 11.52 },
    { minQty: 9, maxQty: 23, price: 10.18 },
    { minQty: 24, maxQty: 35, price: 9.14 },
    { minQty: 36, maxQty: 71, price: 8.93 },
    { minQty: 72, maxQty: 107, price: 8.73 },
    { minQty: 108, maxQty: 143, price: 8.66 },
    { minQty: 144, maxQty: null, price: 8.52 },
  ],
  "11oz-usa-white": [
    { minQty: 1, maxQty: 1, price: 28.07 },
    { minQty: 2, maxQty: 4, price: 20.57 },
    { minQty: 5, maxQty: 8, price: 16.07 },
    { minQty: 9, maxQty: 23, price: 14.74 },
    { minQty: 24, maxQty: 35, price: 13.7 },
    { minQty: 36, maxQty: 71, price: 13.49 },
    { minQty: 72, maxQty: 107, price: 13.28 },
    { minQty: 108, maxQty: 143, price: 13.28 },
    { minQty: 144, maxQty: null, price: 13.18 },
  ],
  "15oz-usa-white": [
    { minQty: 1, maxQty: 1, price: 29.58 },
    { minQty: 2, maxQty: 4, price: 22.18 },
    { minQty: 5, maxQty: 8, price: 17.75 },
    { minQty: 9, maxQty: 23, price: 16.43 },
    { minQty: 24, maxQty: 35, price: 15.41 },
    { minQty: 36, maxQty: 71, price: 15.2 },
    { minQty: 72, maxQty: 107, price: 14.99 },
    { minQty: 108, maxQty: 143, price: 14.99 },
    { minQty: 144, maxQty: null, price: 14.99 },
  ],
};

export function getMugBrackets(styleId: string): MugPriceBracket[] {
  return PRICING[styleId] || [];
}

export function calculateMugPrice(
  styleId: string,
  quantity: number,
  includePackaging: boolean,
): MugPriceResult | null {
  if (quantity <= 0) return null;

  const style = MUG_STYLES.find((s) => s.id === styleId);
  if (!style) return null;

  const brackets = PRICING[styleId];
  if (!brackets || brackets.length === 0) return null;

  let bracket: MugPriceBracket | null = null;
  for (const b of brackets) {
    if (quantity >= b.minQty) {
      bracket = b;
    } else {
      break;
    }
  }
  if (!bracket) bracket = brackets[0];

  const unitPrice = Math.round(bracket.price * 100) / 100;
  const subtotal = Math.round(unitPrice * quantity * 100) / 100;

  const packagingPerMug = includePackaging ? PACKAGING_FEE : 0;
  const packagingTotal = Math.round(packagingPerMug * quantity * 100) / 100;

  const shippingPerMug = SHIPPING_FEE;
  const shippingTotal = Math.round(shippingPerMug * quantity * 100) / 100;

  const totalPrice =
    Math.round((subtotal + packagingTotal + shippingTotal) * 100) / 100;

  const bracketLabel = bracket.maxQty
    ? bracket.minQty + "–" + bracket.maxQty
    : bracket.minQty + "+";

  return {
    style,
    quantity,
    unitPrice,
    subtotal,
    packagingPerMug,
    packagingTotal,
    includePackaging,
    shippingPerMug,
    shippingTotal,
    totalPrice,
    bracketLabel,
  };
}
