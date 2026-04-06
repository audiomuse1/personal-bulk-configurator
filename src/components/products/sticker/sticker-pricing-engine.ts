export interface StickerShape {
  id: string;
  name: string;
  basePrice: number;
  areaCalc: "rect" | "circle" | "oval";
}

export interface StickerFinish {
  id: string;
  name: string;
  multiplier: number;
  note?: string;
  isHolographic: boolean;
}

export interface StickerPriceResult {
  shape: StickerShape;
  widthIn: number;
  heightIn: number;
  stickerAreaSqIn: number;
  tensSqInPerSticker: number;
  quantity: number;
  totalTensSqIn: number;
  finish: StickerFinish;
  basePricePer10SqIn: number;
  discountPct: number;
  discountedPricePer10SqIn: number;
  unitPrice: number;
  totalPrice: number;
  orderMinimum: number;
  meetsMinimum: boolean;
}

export const STICKER_SHAPES: StickerShape[] = [
  { id: "square", name: "Square", basePrice: 0.45, areaCalc: "rect" },
  { id: "rectangle", name: "Rectangle", basePrice: 0.45, areaCalc: "rect" },
  { id: "circle", name: "Circle", basePrice: 0.54, areaCalc: "circle" },
  { id: "oval", name: "Oval", basePrice: 0.54, areaCalc: "oval" },
  { id: "die-cut", name: "Die Cut", basePrice: 0.6, areaCalc: "rect" },
  { id: "bumper", name: "Bumper Sticker", basePrice: 0.45, areaCalc: "rect" },
  {
    id: "rounded-corner",
    name: "Rounded Corner",
    basePrice: 0.54,
    areaCalc: "rect",
  },
  {
    id: "sticker-sheet",
    name: "Sticker Sheets",
    basePrice: 0.77,
    areaCalc: "rect",
  },
];

const HOLO_NOTE =
  "Customer Service will be in contact regarding holographic design options before proofs.";

export const STICKER_FINISHES: StickerFinish[] = [
  { id: "gloss", name: "Gloss", multiplier: 1.0, isHolographic: false },
  { id: "matte", name: "Matte", multiplier: 1.0, isHolographic: false },
  {
    id: "mirror-holographic",
    name: "Mirror Holographic",
    multiplier: 1.75,
    isHolographic: true,
    note: HOLO_NOTE,
  },
  {
    id: "glitter-holographic",
    name: "Glitter Holographic",
    multiplier: 1.75,
    isHolographic: true,
    note: HOLO_NOTE,
  },
];

export const ORDER_MINIMUM_REGULAR = 75;
export const ORDER_MINIMUM_HOLOGRAPHIC = 150;
export const MIN_SIDE_LENGTH = 2;

export const DISCOUNT_BRACKETS: { minTensSqIn: number; discountPct: number }[] =
  [
    { minTensSqIn: 2, discountPct: 4.75 },
    { minTensSqIn: 251, discountPct: 16.25 },
    { minTensSqIn: 501, discountPct: 30.75 },
    { minTensSqIn: 751, discountPct: 42.25 },
    { minTensSqIn: 1001, discountPct: 48 },
    { minTensSqIn: 1501, discountPct: 50.75 },
    { minTensSqIn: 1801, discountPct: 53.25 },
    { minTensSqIn: 2101, discountPct: 56.25 },
    { minTensSqIn: 2501, discountPct: 57.25 },
    { minTensSqIn: 3701, discountPct: 61.25 },
    { minTensSqIn: 5001, discountPct: 63 },
    { minTensSqIn: 10001, discountPct: 64.25 },
    { minTensSqIn: 20001, discountPct: 65.5 },
  ];

export function calcStickerArea(
  width: number,
  height: number,
  areaCalc: "rect" | "circle" | "oval",
): number {
  switch (areaCalc) {
    case "circle":
      return Math.PI * Math.pow(width / 2, 2);
    case "oval":
      return Math.PI * (width / 2) * (height / 2);
    case "rect":
    default:
      return width * height;
  }
}

function findBracket(totalTensSqIn: number): { discountPct: number } {
  let bracket = DISCOUNT_BRACKETS[0];
  for (const b of DISCOUNT_BRACKETS) {
    if (totalTensSqIn >= b.minTensSqIn) {
      bracket = b;
    } else {
      break;
    }
  }
  return bracket;
}

export function calculateStickerPrice(
  shapeId: string,
  widthIn: number,
  heightIn: number,
  quantity: number,
  finishId: string,
): StickerPriceResult | null {
  if (quantity <= 0 || widthIn <= 0) return null;

  const shape = STICKER_SHAPES.find((s) => s.id === shapeId);
  if (!shape) return null;

  const finish = STICKER_FINISHES.find((f) => f.id === finishId);
  if (!finish) return null;

  const effectiveHeight =
    shape.areaCalc === "circle" || shape.id === "square"
      ? widthIn
      : heightIn > 0
        ? heightIn
        : widthIn;

  const stickerAreaSqIn = calcStickerArea(
    widthIn,
    effectiveHeight,
    shape.areaCalc,
  );
  const tensSqInPerSticker = stickerAreaSqIn / 10;
  const totalTensSqIn = tensSqInPerSticker * quantity;

  const bracket = findBracket(totalTensSqIn);
  const discountPct = bracket.discountPct;
  const discountedPricePer10SqIn = shape.basePrice * (1 - discountPct / 100);

  const unitPrice =
    Math.round(
      tensSqInPerSticker * discountedPricePer10SqIn * finish.multiplier * 100,
    ) / 100;
  const totalPrice = Math.round(unitPrice * quantity * 100) / 100;

  const orderMinimum = finish.isHolographic
    ? ORDER_MINIMUM_HOLOGRAPHIC
    : ORDER_MINIMUM_REGULAR;
  const meetsMinimum = totalPrice >= orderMinimum;

  return {
    shape,
    widthIn,
    heightIn: effectiveHeight,
    stickerAreaSqIn: Math.round(stickerAreaSqIn * 100) / 100,
    tensSqInPerSticker: Math.round(tensSqInPerSticker * 1000) / 1000,
    quantity,
    totalTensSqIn: Math.round(totalTensSqIn * 100) / 100,
    finish,
    basePricePer10SqIn: shape.basePrice,
    discountPct,
    discountedPricePer10SqIn: Math.round(discountedPricePer10SqIn * 100) / 100,
    unitPrice,
    totalPrice,
    orderMinimum,
    meetsMinimum,
  };
}
