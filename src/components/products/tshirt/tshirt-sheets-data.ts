import { CONFIG } from "../../config.js";

const PROXY_URL = CONFIG.sheetsProxyUrl;
const CACHE_TTL = CONFIG.cacheTtl;

export interface GarmentStyle {
  id: string;
  name: string;
  brand: string;
  tabName: string;
  maxSize: string; // largest size available for this style
}

export interface GarmentColor {
  name: string;
  hex: string;
  brightness: string;
}

export interface GarmentSize {
  size: string;
  sizeTier: string;
  sortOrder: number;
}

export interface PriceBracket {
  minQty: number;
  maxQty: number | null;
  netPrice: number;
}

export interface PrintLocation {
  id: string;
  name: string;
  sidedness: string;
}

export interface TShirtData {
  styles: GarmentStyle[];
  colors: Record<string, GarmentColor[]>;
  sizes: GarmentSize[];
  pricing: Record<string, Record<string, Record<string, PriceBracket[]>>>;
  printLocations: PrintLocation[];
  fetchedAt: number;
}

const PRINT_LOCATIONS: PrintLocation[] = [
  { id: "front-only", name: "Front Only", sidedness: "one-sided" },
  { id: "back-only", name: "Back Only", sidedness: "one-sided" },
  { id: "left-chest", name: "Left Chest", sidedness: "one-sided" },
  { id: "right-chest", name: "Right Chest", sidedness: "one-sided" },
  {
    id: "full-front-full-back",
    name: "Full Front + Full Back",
    sidedness: "two-sided",
  },
  {
    id: "full-front-left-chest",
    name: "Full Front + Left Chest",
    sidedness: "two-sided",
  },
];

const ALL_SIZES: GarmentSize[] = [
  { size: "XS", sizeTier: "standard", sortOrder: 1 },
  { size: "S", sizeTier: "standard", sortOrder: 2 },
  { size: "M", sizeTier: "standard", sortOrder: 3 },
  { size: "L", sizeTier: "standard", sortOrder: 4 },
  { size: "XL", sizeTier: "standard", sortOrder: 5 },
  { size: "2XL", sizeTier: "2x", sortOrder: 6 },
  { size: "3XL", sizeTier: "3x", sortOrder: 7 },
  { size: "4XL", sizeTier: "4x", sortOrder: 8 },
];

const GARMENT_STYLES: GarmentStyle[] = [
  {
    id: "standard-unisex",
    name: "Standard Unisex",
    brand: "Unisex G64000",
    tabName: "Standard Unisex",
    maxSize: "4XL",
  },
  {
    id: "standard-womens",
    name: "Standard Women's",
    brand: "Ladies G6400",
    tabName: "Standard Women's",
    maxSize: "2XL",
  },
  {
    id: "premium-unisex",
    name: "Premium Unisex",
    brand: "Unisex 3001 Canvas",
    tabName: "Premium Unisex",
    maxSize: "4XL",
  },
  {
    id: "premium-womens",
    name: "Premium Women's",
    brand: "Ladies 6400 Bella",
    tabName: "Premium Women's",
    maxSize: "2XL",
  },
  {
    id: "usa-premium-unisex",
    name: "USA-made Premium Unisex",
    brand: "Unisex 5001 Royal Apparel",
    tabName: "USA-made Premium Unisex",
    maxSize: "4XL",
  },
  {
    id: "usa-premium-womens",
    name: "USA-made Premium Women's",
    brand: "Women's 5001W Royal Apparel",
    tabName: "USA-made Premium Women's",
    maxSize: "2XL",
  },
];

// Helper to get sizes filtered by style's max size
export function getSizesForStyle(styleId: string): GarmentSize[] {
  const style = GARMENT_STYLES.find((s) => s.id === styleId);
  if (!style) return ALL_SIZES;
  const maxOrder = ALL_SIZES.find((s) => s.size === style.maxSize)?.sortOrder || 99;
  return ALL_SIZES.filter((s) => s.sortOrder <= maxOrder);
}

let cache: TShirtData | null = null;

function loadCache(): TShirtData | null {
  if (cache && Date.now() - cache.fetchedAt < CACHE_TTL) return cache;
  try {
    const raw = sessionStorage.getItem("bulk-tshirt-data");
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Date.now() - parsed.fetchedAt > CACHE_TTL) return null;
    cache = parsed;
    return cache;
  } catch {
    return null;
  }
}

function saveCache(data: TShirtData) {
  cache = data;
  try {
    sessionStorage.setItem("bulk-tshirt-data", JSON.stringify(data));
  } catch {}
}

function parsePricingSection(rows: any[][]): Record<string, PriceBracket[]> {
  const result: Record<string, PriceBracket[]> = {};
  if (!rows || rows.length < 2) return result;
  const headerRow = rows[0];
  const qtyBrackets: number[] = [];
  for (let c = 1; c < headerRow.length; c++) {
    const val = headerRow[c];
    if (typeof val === "number") qtyBrackets.push(val);
  }
  const tierMap: Record<string, string> = {
    NET: "standard",
    "NET 2X": "2x",
    "NET 3X": "3x",
    "NET 4X": "4x",
  };
  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    if (!row || !row[0]) continue;
    const label = String(row[0]).trim().toUpperCase();
    const tier = tierMap[label];
    if (!tier) continue;
    const brackets: PriceBracket[] = [];
    for (let c = 0; c < qtyBrackets.length; c++) {
      const val = row[c + 1];
      if (val == null || val === "") continue;
      const price =
        typeof val === "number"
          ? val
          : parseFloat(String(val).replace("$", ""));
      if (!isNaN(price)) {
        brackets.push({
          minQty: qtyBrackets[c],
          maxQty: qtyBrackets[c + 1] ? qtyBrackets[c + 1] - 1 : null,
          netPrice: price,
        });
      }
    }
    result[tier] = brackets;
  }
  return result;
}

function parseStyleTab(rows: any[][]): {
  pricing: Record<string, Record<string, PriceBracket[]>>;
  colors: GarmentColor[];
} {
  const pricing: Record<string, Record<string, PriceBracket[]>> = {};
  const colors: GarmentColor[] = [];
  const sections: { type: string; startRow: number }[] = [];
  let colorsStart = -1;
  for (let i = 0; i < rows.length; i++) {
    const cell = String(rows[i]?.[0] || "").trim();
    const cellLower = cell.toLowerCase();
    if (cellLower === "dark one-sided")
      sections.push({ type: "dark-one-sided", startRow: i });
    else if (cellLower === "light one-sided")
      sections.push({ type: "light-one-sided", startRow: i });
    else if (cellLower === "dark two-sided")
      sections.push({ type: "dark-two-sided", startRow: i });
    else if (cellLower === "light two-sided")
      sections.push({ type: "light-two-sided", startRow: i });
    else if (cellLower === "garment color") colorsStart = i;
  }
  for (const section of sections) {
    const sectionRows = rows.slice(section.startRow + 1, section.startRow + 6);
    pricing[section.type] = parsePricingSection(sectionRows);
  }
  if (colorsStart >= 0) {
    for (let i = colorsStart + 2; i < rows.length; i++) {
      const row = rows[i];
      if (!row || row.length < 3) continue;
      const active = String(row[0] || "")
        .trim()
        .toUpperCase();
      if (active !== "Y") continue;
      const name = String(row[1] || "").trim();
      let hex = String(row[2] || "").trim();
      if (typeof row[2] === "number") hex = String(row[2]).padStart(6, "0");
      const clean = hex.replace("#", "");
      const r = parseInt(clean.substring(0, 2), 16) || 0;
      const g = parseInt(clean.substring(2, 4), 16) || 0;
      const b = parseInt(clean.substring(4, 6), 16) || 0;
      const brightness =
        (r * 299 + g * 587 + b * 114) / 1000 > 160 ? "light" : "dark";
      colors.push({ name, hex: clean, brightness });
    }
  }
  return { pricing, colors };
}

export async function getTShirtData(): Promise<TShirtData> {
  const cached = loadCache();
  if (cached) return cached;
  try {
    const res = await fetch(PROXY_URL);
    if (!res.ok) throw new Error("Proxy error: " + res.status);
    const raw = await res.json();
    const allColors: Record<string, GarmentColor[]> = {};
    const allPricing: Record<
      string,
      Record<string, Record<string, PriceBracket[]>>
    > = {};
    for (const style of GARMENT_STYLES) {
      const tabData = raw.tabs[style.tabName];
      if (!tabData) {
        console.warn("Tab not found: " + style.tabName);
        continue;
      }
      const parsed = parseStyleTab(tabData);
      allPricing[style.id] = parsed.pricing;
      allColors[style.id] = parsed.colors;
      console.log(
        "Parsed " +
          style.tabName +
          ": " +
          Object.keys(parsed.pricing).length +
          " pricing sections, " +
          parsed.colors.length +
          " colors",
      );
    }
    const data: TShirtData = {
      styles: GARMENT_STYLES,
      sizes: ALL_SIZES,
      printLocations: PRINT_LOCATIONS,
      colors: allColors,
      pricing: allPricing,
      fetchedAt: Date.now(),
    };
    saveCache(data);
    console.log("Sheet data loaded and cached");
    return data;
  } catch (err) {
    console.error("Failed to load sheet data:", err);
    return {
      styles: GARMENT_STYLES,
      sizes: ALL_SIZES,
      printLocations: PRINT_LOCATIONS,
      colors: {},
      pricing: {},
      fetchedAt: Date.now(),
    };
  }
}