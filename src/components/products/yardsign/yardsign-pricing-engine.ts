export interface SignPrintSide {
  id: string;
  label: string;
}

export interface SignStakeOption {
  id: string;
  label: string;
  pricePerSign: number;
  description: string;
}

export interface SignPriceBracket {
  minQty: number;
  maxQty: number | null;
  netPrice: number;
}

export interface SignPriceResult {
  printSide: SignPrintSide;
  quantity: number;
  fullBleed: boolean;
  stakeOption: SignStakeOption;
  signUnitPrice: number;
  signSubtotal: number;
  fullBleedPerSign: number;
  fullBleedTotal: number;
  stakePerSign: number;
  stakeTotal: number;
  unitPriceAllIn: number;
  totalPrice: number;
  bracketLabel: string;
}

export const SIGN_PRINT_SIDES: SignPrintSide[] = [
  { id: "one-sided", label: "1-Sided (front only)" },
  { id: "two-sided", label: "2-Sided (front & back)" },
];

export const FULL_BLEED_FEE = 0.5;

export const STAKE_OPTIONS: SignStakeOption[] = [
  {
    id: "none",
    label: "No Stakes",
    pricePerSign: 0,
    description: "Sign only — no stakes included",
  },
  {
    id: "h-stake",
    label: "H-Stakes (wire)",
    pricePerSign: 1.55,
    description: "2 wire H-stakes per sign — standard yard sign stakes",
  },
  {
    id: "i-stake",
    label: "I-Stakes (step)",
    pricePerSign: 1.9,
    description: "2 step-in I-stakes per sign — heavy duty",
  },
];

// NET pricing from spreadsheet — full color, 18" × 24"
const ONE_SIDED_BRACKETS: SignPriceBracket[] = [
  { minQty: 1, maxQty: 5, netPrice: 26.68 },
  { minQty: 6, maxQty: 10, netPrice: 7.93 },
  { minQty: 11, maxQty: 50, netPrice: 6.23 },
  { minQty: 51, maxQty: 100, netPrice: 4.62 },
  { minQty: 101, maxQty: 250, netPrice: 4.4 },
  { minQty: 251, maxQty: 300, netPrice: 4.29 },
  { minQty: 301, maxQty: 500, netPrice: 4.26 },
  { minQty: 501, maxQty: 1000, netPrice: 4.18 },
  { minQty: 1001, maxQty: null, netPrice: 4.18 },
];

const TWO_SIDED_BRACKETS: SignPriceBracket[] = [
  { minQty: 1, maxQty: 5, netPrice: 29.4 },
  { minQty: 6, maxQty: 10, netPrice: 10.65 },
  { minQty: 11, maxQty: 50, netPrice: 8.94 },
  { minQty: 51, maxQty: 100, netPrice: 7.34 },
  { minQty: 101, maxQty: 250, netPrice: 7.12 },
  { minQty: 251, maxQty: 300, netPrice: 7.01 },
  { minQty: 301, maxQty: 500, netPrice: 6.97 },
  { minQty: 501, maxQty: 1000, netPrice: 6.9 },
  { minQty: 1001, maxQty: null, netPrice: 6.9 },
];

export function getSignBrackets(printSideId: string): SignPriceBracket[] {
  return printSideId === "two-sided" ? TWO_SIDED_BRACKETS : ONE_SIDED_BRACKETS;
}

export function calculateSignPrice(
  printSideId: string,
  quantity: number,
  fullBleed: boolean,
  stakeId: string,
): SignPriceResult | null {
  if (quantity <= 0) return null;

  const printSide = SIGN_PRINT_SIDES.find((p) => p.id === printSideId);
  if (!printSide) return null;

  const stakeOption = STAKE_OPTIONS.find((s) => s.id === stakeId);
  if (!stakeOption) return null;

  const brackets = getSignBrackets(printSideId);
  let bracket: SignPriceBracket | null = null;
  for (const b of brackets) {
    if (quantity >= b.minQty) {
      bracket = b;
    } else {
      break;
    }
  }
  if (!bracket) bracket = brackets[0];

  const signUnitPrice = Math.round(bracket.netPrice * 100) / 100;
  const signSubtotal = Math.round(signUnitPrice * quantity * 100) / 100;

  const fullBleedPerSign = fullBleed ? FULL_BLEED_FEE : 0;
  const fullBleedTotal = Math.round(fullBleedPerSign * quantity * 100) / 100;

  const stakePerSign = stakeOption.pricePerSign;
  const stakeTotal = Math.round(stakePerSign * quantity * 100) / 100;

  const unitPriceAllIn =
    Math.round((signUnitPrice + fullBleedPerSign + stakePerSign) * 100) / 100;
  const totalPrice =
    Math.round((signSubtotal + fullBleedTotal + stakeTotal) * 100) / 100;

  const bracketLabel = bracket.maxQty
    ? bracket.minQty + "–" + bracket.maxQty
    : bracket.minQty + "+";

  return {
    printSide,
    quantity,
    fullBleed,
    stakeOption,
    signUnitPrice,
    signSubtotal,
    fullBleedPerSign,
    fullBleedTotal,
    stakePerSign,
    stakeTotal,
    unitPriceAllIn,
    totalPrice,
    bracketLabel,
  };
}
