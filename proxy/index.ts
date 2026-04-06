import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

const SHEET_ID = process.env.SHEET_ID || "";
const CLIENT_ID = process.env.CLIENT_ID || "";
const CLIENT_SECRET = process.env.CLIENT_SECRET || "";
const REFRESH_TOKEN = process.env.REFRESH_TOKEN || "";
const GRANT_TYPE = process.env.GRANT_TYPE || "refresh_token";
const PORT = parseInt(process.env.PROXY_PORT || "3001");

// BigCommerce Server-to-Server API
const BC_STORE_HASH = process.env.BC_STORE_HASH || "";
const BC_API_TOKEN = process.env.BC_API_TOKEN || "";
const BC_API_BASE = `https://api.bigcommerce.com/stores/${BC_STORE_HASH}/v3`;

// Cache
let cachedSheetData: any = null;
let cachedAt = 0;
const CACHE_TTL = 5 * 60 * 1000;

app.use(
  "*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "OPTIONS"],
    allowHeaders: ["Content-Type"],
  }),
);

// ============================================
// Google Sheets OAuth + Data (existing — unchanged)
// ============================================

async function getAccessToken(): Promise<string> {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      refresh_token: REFRESH_TOKEN,
      grant_type: GRANT_TYPE,
    }),
  });
  const json = (await res.json()) as any;
  if (!json.access_token) {
    throw new Error("Token failed: " + JSON.stringify(json));
  }
  return json.access_token;
}

async function getSheetMetadata(accessToken: string): Promise<string[]> {
  const res = await fetch(
    "https://sheets.googleapis.com/v4/spreadsheets/" + SHEET_ID + "/",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    },
  );
  const data = (await res.json()) as any;
  return data.sheets.map((s: any) => s.properties.title);
}

async function getSheetTab(
  accessToken: string,
  tabTitle: string,
): Promise<any[][]> {
  const encoded = encodeURIComponent(tabTitle);
  const res = await fetch(
    "https://sheets.googleapis.com/v4/spreadsheets/" +
      SHEET_ID +
      "/values/" +
      encoded +
      "?valueRenderOption=UNFORMATTED_VALUE",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    },
  );
  const data = (await res.json()) as any;
  return data.values || [];
}

async function getAllSheetData(): Promise<any> {
  if (cachedSheetData && Date.now() - cachedAt < CACHE_TTL) {
    console.log("Returning cached sheet data");
    return cachedSheetData;
  }

  console.log("Fetching fresh data from Google Sheets...");
  const accessToken = await getAccessToken();
  const tabTitles = await getSheetMetadata(accessToken);

  const result: Record<string, any[][]> = {};

  for (const title of tabTitles) {
    try {
      result[title] = await getSheetTab(accessToken, title);
      console.log(
        "  Fetched: " + title + " (" + result[title].length + " rows)",
      );
    } catch (err) {
      console.error("  Failed: " + title, err);
      result[title] = [];
    }
  }

  cachedSheetData = {
    tabs: result,
    tabTitles,
    fetchedAt: Date.now(),
  };
  cachedAt = Date.now();

  return cachedSheetData;
}

// ============================================
// BigCommerce Cart API helpers
// ============================================

async function bcFetch(
  path: string,
  method: string,
  body?: unknown,
): Promise<Response> {
  const opts: RequestInit = {
    method,
    headers: {
      "X-Auth-Token": BC_API_TOKEN,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  if (body) opts.body = JSON.stringify(body);
  return fetch(`${BC_API_BASE}${path}`, opts);
}

// ============================================
// ENDPOINTS — Sheets (existing — unchanged)
// ============================================

app.get("/api/sheets", async (c) => {
  try {
    const data = await getAllSheetData();
    return c.json(data);
  } catch (err: any) {
    console.error("Sheet fetch error:", err);
    return c.json({ error: err.message }, 500);
  }
});

app.get("/api/sheets/:tab", async (c) => {
  try {
    const data = await getAllSheetData();
    const tabName = decodeURIComponent(c.req.param("tab"));
    const tabData = data.tabs[tabName];
    if (!tabData) {
      return c.json(
        { error: "Tab not found", available: data.tabTitles },
        404,
      );
    }
    return c.json({ tab: tabName, values: tabData, fetchedAt: data.fetchedAt });
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

// ============================================
// ENDPOINTS — Cart (NEW)
// ============================================

/**
 * POST /api/cart — Create a new cart with a bulk order line item
 *
 * Body: {
 *   productId: number,
 *   quantity: number,        // display quantity (e.g., 72 coolers)
 *   price: number,           // total configured price (e.g., 180.00)
 *   customFields: Record<string, string>,
 *   cartId?: string          // if provided, adds to existing cart
 * }
 */
app.post("/api/cart", async (c) => {
  if (!BC_STORE_HASH || !BC_API_TOKEN) {
    return c.json(
      { success: false, error: "Cart API not configured on server" },
      500,
    );
  }

  let body: any;
  try {
    body = await c.req.json();
  } catch {
    return c.json({ success: false, error: "Invalid JSON body" }, 400);
  }

  const { productId, quantity, price, customFields, cartId } = body;

  // Validation
  if (!productId || !price) {
    return c.json(
      { success: false, error: "Missing productId or price" },
      400,
    );
  }

  if (price <= 0 || price > 50000) {
    return c.json(
      { success: false, error: "Price out of reasonable range" },
      400,
    );
  }

  // Build order summary for customer_message
  const orderLines: string[] = [];
  if (customFields) {
    for (const [key, value] of Object.entries(customFields)) {
      orderLines.push(`${key}: ${value}`);
    }
  }
  const orderSummary = orderLines.join("\n");
  const productType = (customFields?.["Configurator Type"] || "unknown") as string;

  try {
    const lineItem = {
      product_id: productId,
      quantity: 1,
      list_price: price,
    };

    let cartData: any;
    let responseCartId: string;

    if (cartId) {
      // ── Add to existing cart ──
      console.log(`Adding to existing cart ${cartId}...`);

      const addRes = await bcFetch(`/carts/${cartId}/items`, "POST", {
        line_items: [lineItem],
      });

      if (!addRes.ok) {
        const errData = await addRes.json();
        // If cart not found (expired), fall through to create new one
        if (addRes.status === 404) {
          console.log("Existing cart not found, creating new one...");
          // Fall through — don't return, let it create a new cart below
        } else {
          console.error("BigCommerce add-to-cart error:", JSON.stringify(errData));
          return c.json(
            { success: false, error: "BigCommerce API error", detail: errData },
            502,
          );
        }
      } else {
        cartData = await addRes.json();
        responseCartId = cartId;

        // Update customer_message to append new order details
        const existingMessage = cartData?.data?.customer_message || "";
        const separator = existingMessage
          ? `\n\n--- ${productType.toUpperCase()} ORDER ---\n`
          : `--- ${productType.toUpperCase()} ORDER ---\n`;
        const newMessage = existingMessage + separator + orderSummary;

        await bcFetch(`/carts/${cartId}`, "PUT", {
          customer_message: newMessage,
        });

        // Get redirect URLs
        let redirectUrls = null;
        const redirectRes = await bcFetch(
          `/carts/${cartId}/redirect_urls`,
          "POST",
        );
        if (redirectRes.ok) {
          const redirectData = await redirectRes.json();
          redirectUrls = redirectData?.data;
        }

        return c.json({
          success: true,
          cartId: responseCartId,
          redirectUrls,
          orderSummary,
        });
      }
    }

    // ── Create new cart ──
    console.log("Creating new cart...");

    const cartPayload = {
      line_items: [lineItem],
      customer_message: `--- ${productType.toUpperCase()} ORDER ---\n${orderSummary}`,
    };

    const cartRes = await bcFetch("/carts", "POST", cartPayload);
    cartData = await cartRes.json();

    if (!cartRes.ok) {
      console.error(
        "BigCommerce create-cart error:",
        JSON.stringify(cartData),
      );
      return c.json(
        { success: false, error: "BigCommerce API error", detail: cartData },
        502,
      );
    }

    responseCartId = cartData?.data?.id;
    console.log("Cart created:", responseCartId);

    // Get redirect URLs so browser can navigate to cart/checkout
    let redirectUrls = null;
    if (responseCartId) {
      const redirectRes = await bcFetch(
        `/carts/${responseCartId}/redirect_urls`,
        "POST",
      );
      if (redirectRes.ok) {
        const redirectData = await redirectRes.json();
        redirectUrls = redirectData?.data;
      }
    }

    return c.json({
      success: true,
      cartId: responseCartId,
      redirectUrls,
      orderSummary,
    });
  } catch (err) {
    console.error("Cart creation error:", err);
    return c.json(
      { success: false, error: "Server error: " + String(err) },
      500,
    );
  }
});

// ============================================
// ENDPOINTS — Health & Cache (updated)
// ============================================

app.get("/api/health", (c) => {
  return c.json({
    status: "ok",
    cached: !!cachedSheetData,
    cachedAt: cachedAt ? new Date(cachedAt).toISOString() : null,
    tabsCached: cachedSheetData ? cachedSheetData.tabTitles : [],
    hasCartApi: !!BC_STORE_HASH && !!BC_API_TOKEN,
  });
});

app.get("/api/clear-cache", (c) => {
  cachedSheetData = null;
  cachedAt = 0;
  return c.json({ status: "cache cleared" });
});

console.log("Sheets + Cart proxy running on port " + PORT);
serve({ fetch: app.fetch, port: PORT });