export interface CoolerColor {
  id: string;
  name: string;
  hex: string;
  brightness: "light" | "dark";
}

export interface CoolerPrintSide {
  id: string;
  label: string;
}

export interface CoolerPriceBracket {
  minQty: number;
  maxQty: number | null;
  netPrice: number;
}

export interface CoolerPriceResult {
  color: CoolerColor;
  printSide: CoolerPrintSide;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  bracketLabel: string;
  meetsMinimum: boolean;
}

export const ORDER_MINIMUM = 24;

export const COOLER_PRINT_SIDES: CoolerPrintSide[] = [
  { id: "one-sided", label: "1-Sided Print" },
  { id: "two-sided", label: "2-Sided Print (front & back)" },
];

export const COOLER_COLORS: CoolerColor[] = [
  { id: "white", name: "White", hex: "FFFFFF", brightness: "light" },
  { id: "black", name: "Black", hex: "000000", brightness: "dark" },
  { id: "navy", name: "Navy Blue", hex: "1B2A4A", brightness: "dark" },
  { id: "royal-blue", name: "Royal Blue", hex: "1A5EC7", brightness: "dark" },
  { id: "light-blue", name: "Light Blue", hex: "87CEEB", brightness: "light" },
  { id: "red", name: "Red", hex: "CC0000", brightness: "dark" },
  { id: "maroon", name: "Maroon", hex: "6B1C2A", brightness: "dark" },
  { id: "orange", name: "Orange", hex: "FF6600", brightness: "dark" },
  {
    id: "burnt-orange",
    name: "Burnt Orange",
    hex: "CC5500",
    brightness: "dark",
  },
  {
    id: "gold",
    name: "Gold / Athletic Yellow",
    hex: "FFD700",
    brightness: "light",
  },
  { id: "yellow", name: "Yellow", hex: "FFEE00", brightness: "light" },
  { id: "kelly-green", name: "Kelly Green", hex: "2E8B57", brightness: "dark" },
  { id: "lime-green", name: "Lime Green", hex: "76C043", brightness: "light" },
  {
    id: "hunter-green",
    name: "Hunter Green",
    hex: "2D5A27",
    brightness: "dark",
  },
  { id: "teal", name: "Teal", hex: "008080", brightness: "dark" },
  { id: "purple", name: "Purple", hex: "6B2D8B", brightness: "dark" },
  { id: "lavender", name: "Lavender", hex: "B19CD9", brightness: "light" },
  { id: "pink", name: "Pink", hex: "FF69B4", brightness: "light" },
  { id: "hot-pink", name: "Hot Pink", hex: "FF1493", brightness: "dark" },
  { id: "gray", name: "Gray", hex: "808080", brightness: "dark" },
  { id: "charcoal", name: "Charcoal", hex: "36454F", brightness: "dark" },
  { id: "brown", name: "Brown", hex: "6B4226", brightness: "dark" },
  { id: "tan", name: "Tan / Khaki", hex: "D2B48C", brightness: "light" },
  { id: "coral", name: "Coral", hex: "FF7F50", brightness: "light" },
  { id: "neon-green", name: "Neon Green", hex: "39FF14", brightness: "light" },
  { id: "neon-orange", name: "Neon Orange", hex: "FF6103", brightness: "dark" },
  { id: "neon-pink", name: "Neon Pink", hex: "FF10F0", brightness: "dark" },
  { id: "camo", name: "Camo Green", hex: "4B5320", brightness: "dark" },
];

// NET pricing from the spreadsheet
const ONE_SIDED_BRACKETS: CoolerPriceBracket[] = [
  { minQty: 24, maxQty: 36, netPrice: 2.83 },
  { minQty: 37, maxQty: 72, netPrice: 2.5 },
  { minQty: 73, maxQty: 250, netPrice: 2.2 },
  { minQty: 251, maxQty: 500, netPrice: 1.98 },
  { minQty: 501, maxQty: 1000, netPrice: 1.93 },
  { minQty: 1001, maxQty: null, netPrice: 1.89 },
];

const TWO_SIDED_BRACKETS: CoolerPriceBracket[] = [
  { minQty: 24, maxQty: 36, netPrice: 4.01 },
  { minQty: 37, maxQty: 72, netPrice: 3.68 },
  { minQty: 73, maxQty: 250, netPrice: 3.38 },
  { minQty: 251, maxQty: 500, netPrice: 3.16 },
  { minQty: 501, maxQty: 1000, netPrice: 3.12 },
  { minQty: 1001, maxQty: null, netPrice: 3.07 },
];

export function getCoolerBrackets(printSideId: string): CoolerPriceBracket[] {
  return printSideId === "two-sided" ? TWO_SIDED_BRACKETS : ONE_SIDED_BRACKETS;
}

export const PRESET_QUANTITIES: number[] = [
  24, 48, 72, 100, 150, 250, 500, 1000,
];

export function calculateCoolerPrice(
  colorId: string,
  printSideId: string,
  quantity: number,
): CoolerPriceResult | null {
  if (quantity <= 0) return null;

  const color = COOLER_COLORS.find((c) => c.id === colorId);
  if (!color) return null;

  const printSide = COOLER_PRINT_SIDES.find((p) => p.id === printSideId);
  if (!printSide) return null;

  const meetsMinimum = quantity >= ORDER_MINIMUM;

  const brackets = getCoolerBrackets(printSideId);
  let bracket: CoolerPriceBracket | null = null;
  for (const b of brackets) {
    if (quantity >= b.minQty) {
      bracket = b;
    } else {
      break;
    }
  }
  if (!bracket) bracket = brackets[0];

  const unitPrice = Math.round(bracket.netPrice * 100) / 100;
  const totalPrice = Math.round(unitPrice * quantity * 100) / 100;

  const bracketLabel = bracket.maxQty
    ? bracket.minQty + "–" + bracket.maxQty
    : bracket.minQty + "+";

  return {
    color,
    printSide,
    quantity,
    unitPrice,
    totalPrice,
    bracketLabel,
    meetsMinimum,
  };
}
