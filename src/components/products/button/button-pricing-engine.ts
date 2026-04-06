export interface ButtonSize {
  id: string;
  label: string;
  diameter: string;
}

export interface ButtonPriceBracket {
  minQty: number;
  maxQty: number | null;
  retailPrice: number;
}

export interface ButtonPriceResult {
  size: ButtonSize;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  bracketLabel: string;
  meetsMinimum: boolean;
}

export const BUTTON_SIZES: ButtonSize[] = [
  { id: "small", label: '1.25" Circle', diameter: "1.25" },
  { id: "large", label: '2.25" Circle', diameter: "2.25" },
];

export const ORDER_MINIMUM = 50;

export const BUTTON_PRICE_BRACKETS: ButtonPriceBracket[] = [
  { minQty: 50, maxQty: 99, retailPrice: 1.1 },
  { minQty: 100, maxQty: 249, retailPrice: 0.85 },
  { minQty: 250, maxQty: 499, retailPrice: 0.6 },
  { minQty: 500, maxQty: 999, retailPrice: 0.45 },
  { minQty: 1000, maxQty: 2499, retailPrice: 0.4 },
  { minQty: 2500, maxQty: null, retailPrice: 0.35 },
];

export const PRESET_QUANTITIES: number[] = [50, 100, 250, 500, 1000, 2500];

export function calculateButtonPrice(
  sizeId: string,
  quantity: number,
): ButtonPriceResult | null {
  if (quantity <= 0) return null;

  const size = BUTTON_SIZES.find((s) => s.id === sizeId);
  if (!size) return null;

  const meetsMinimum = quantity >= ORDER_MINIMUM;

  let bracket: ButtonPriceBracket | null = null;
  for (const b of BUTTON_PRICE_BRACKETS) {
    if (quantity >= b.minQty) {
      bracket = b;
    } else {
      break;
    }
  }

  if (!bracket) {
    bracket = BUTTON_PRICE_BRACKETS[0];
  }

  const unitPrice = Math.round(bracket.retailPrice * 100) / 100;
  const totalPrice = Math.round(unitPrice * quantity * 100) / 100;

  const bracketLabel = bracket.maxQty
    ? bracket.minQty + "–" + bracket.maxQty
    : bracket.minQty + "+";

  return {
    size,
    quantity,
    unitPrice,
    totalPrice,
    bracketLabel,
    meetsMinimum,
  };
}
