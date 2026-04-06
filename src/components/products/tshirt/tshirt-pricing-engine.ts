import type { TShirtData, PriceBracket } from "./tshirt-sheets-data.js";

export interface PriceItem {
  size: string;
  sizeTier: string;
  quantity: number;
}

export interface PriceLine {
  size: string;
  sizeTier: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface PriceResult {
  printType: string;
  lines: PriceLine[];
  totalQuantity: number;
  totalPrice: number;
}

export function calculateTShirtPrice(
  garmentStyleId: string,
  printLocationId: string,
  colorHex: string,
  items: PriceItem[],
  data: TShirtData,
  totalOrderQty?: number,
): PriceResult {
  const loc = data.printLocations.find((l) => l.id === printLocationId);
  const sidedness = loc ? loc.sidedness : "one-sided";
  const clean = colorHex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16) || 0;
  const g = parseInt(clean.substring(2, 4), 16) || 0;
  const b = parseInt(clean.substring(4, 6), 16) || 0;
  const brightness =
    (r * 299 + g * 587 + b * 114) / 1000 > 160 ? "light" : "dark";
  const printType = brightness + "-" + sidedness;

  const stylePricing = data.pricing[garmentStyleId];
  if (!stylePricing)
    return { printType, lines: [], totalQuantity: 0, totalPrice: 0 };
  const typePricing = stylePricing[printType];
  if (!typePricing)
    return { printType, lines: [], totalQuantity: 0, totalPrice: 0 };

  const styleQty = items.reduce((sum, item) => sum + item.quantity, 0);
  const qtyForBracket = totalOrderQty != null ? totalOrderQty : styleQty;

  const lines: PriceLine[] = [];
  let totalQuantity = 0;
  let totalPrice = 0;

  for (const item of items) {
    if (item.quantity <= 0) continue;
    const brackets = typePricing[item.sizeTier];
    if (!brackets || brackets.length === 0) continue;
    let bracket: PriceBracket | null = null;
    for (const b of brackets) {
      if (qtyForBracket >= b.minQty) bracket = b;
      else break;
    }
    if (!bracket) bracket = brackets[0];
    const unitPrice = Math.round(bracket.netPrice * 100) / 100;
    const lineTotal = Math.round(unitPrice * item.quantity * 100) / 100;
    lines.push({
      size: item.size,
      sizeTier: item.sizeTier,
      quantity: item.quantity,
      unitPrice,
      lineTotal,
    });
    totalQuantity += item.quantity;
    totalPrice += lineTotal;
  }

  return {
    printType,
    lines,
    totalQuantity,
    totalPrice: Math.round(totalPrice * 100) / 100,
  };
}
