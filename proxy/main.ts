const SHEET_ID = Deno.env.get("SHEET_ID") || "";
const CLIENT_ID = Deno.env.get("CLIENT_ID") || "";
const CLIENT_SECRET = Deno.env.get("CLIENT_SECRET") || "";
const REFRESH_TOKEN = Deno.env.get("REFRESH_TOKEN") || "";

const BC_STORE_HASH = Deno.env.get("BC_STORE_HASH") || "";
const BC_API_TOKEN = Deno.env.get("BC_API_TOKEN") || "";
const BC_API_BASE = "https://api.bigcommerce.com/stores/" + BC_STORE_HASH + "/v3";

const OAUTH_URL = "https://oauth2.googleapis.com/token";
const SHEETS_BASE = "https://sheets.googleapis.com/v4/spreadsheets/";

let cached: { data: any; at: number } | null = null;
const TTL = 5 * 60 * 1000;

async function getAccessToken(): Promise<string> {
  const res = await fetch(OAUTH_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      refresh_token: REFRESH_TOKEN,
      grant_type: "refresh_token",
    }),
  });
  const json = await res.json();
  if (!json.access_token) throw new Error("Token failed");
  return json.access_token;
}

async function fetchSheets(): Promise<any> {
  if (cached && Date.now() - cached.at < TTL) return cached.data;
  const token = await getAccessToken();
  const auth = { Authorization: "Bearer " + token };
  const metaRes = await fetch(SHEETS_BASE + SHEET_ID, { headers: auth });
  const meta = await metaRes.json();
  const titles = meta.sheets.map((s: any) => s.properties.title);
  const rangeParams = titles
    .map((t: string) => "ranges=" + encodeURIComponent(t))
    .join("&");
  const batchUrl =
    SHEETS_BASE +
    SHEET_ID +
    "/values:batchGet?" +
    rangeParams +
    "&valueRenderOption=UNFORMATTED_VALUE";
  const dataRes = await fetch(batchUrl, { headers: auth });
  const dataJson = await dataRes.json();
  const tabs: Record<string, any[][]> = {};
  for (let i = 0; i < titles.length; i++) {
    tabs[titles[i]] = dataJson.valueRanges?.[i]?.values || [];
  }
  const result = { tabs, tabTitles: titles, fetchedAt: Date.now() };
  cached = { data: result, at: Date.now() };
  return result;
}

async function bcFetch(
  path: string,
  method: string,
  body?: unknown
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
  return fetch(BC_API_BASE + path, opts);
}

// ─── NEW HELPER: Extract the line item ID for a given productId ───
// BigCommerce returns all line items in the cart response.
// We find the one matching our productId. If there are multiple
// (duplicate product orders), we pick the last one (most recently added).
function extractLineItemId(cartData: any, productId: number): string | null {
  const items = cartData?.data?.line_items?.physical_items || [];
  // Find all items matching this product ID
  const matching = items.filter((item: any) => item.product_id === productId);
  if (matching.length === 0) return null;
  // Return the LAST matching item (the one just added)
  return matching[matching.length - 1].id || null;
}

async function handleCart(req: Request): Promise<Response> {
  if (!BC_STORE_HASH || !BC_API_TOKEN) {
    return jsonResponse(
      { success: false, error: "Cart API not configured on server" },
      500
    );
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ success: false, error: "Invalid JSON body" }, 400);
  }

  const { productId, price, customFields, cartId } = body;

  if (!productId || !price) {
    return jsonResponse(
      { success: false, error: "Missing productId or price" },
      400
    );
  }

  if (price <= 0 || price > 50000) {
    return jsonResponse(
      { success: false, error: "Price out of reasonable range" },
      400
    );
  }

  const orderLines: string[] = [];
  if (customFields) {
    for (const [key, value] of Object.entries(customFields)) {
      orderLines.push(key + ": " + value);
    }
  }
  const orderSummary = orderLines.join("\n");
  const productType = String(
    customFields?.["Configurator Type"] || "unknown"
  );

  const lineItem = {
    product_id: productId,
    quantity: 1,
    list_price: price,
  };

  try {
    if (cartId) {
      console.log("Adding to existing cart " + cartId);
      const addRes = await bcFetch("/carts/" + cartId + "/items", "POST", {
        line_items: [lineItem],
      });

      if (addRes.ok) {
        const cartData = await addRes.json();

        // ─── Extract line item ID for the just-added item ───
        const lineItemId = extractLineItemId(cartData, productId);
        console.log("Added line item: " + lineItemId);

        const existingMessage = cartData?.data?.customer_message || "";
        const separator = existingMessage
          ? "\n\n--- " + productType.toUpperCase() + " ORDER ---\n"
          : "--- " + productType.toUpperCase() + " ORDER ---\n";
        const newMessage = existingMessage + separator + orderSummary;

        await bcFetch("/carts/" + cartId, "PUT", {
          customer_message: newMessage,
        });

        let redirectUrls = null;
        const redirectRes = await bcFetch(
          "/carts/" + cartId + "/redirect_urls",
          "POST"
        );
        if (redirectRes.ok) {
          const rd = await redirectRes.json();
          redirectUrls = rd?.data;
        }

        return jsonResponse({
          success: true,
          cartId,
          lineItemId,      // ← NEW
          redirectUrls,
          orderSummary,
        });
      } else {
        console.log("Existing cart not found, creating new one");
      }
    }

    console.log("Creating new cart...");
    const cartPayload = {
      line_items: [lineItem],
      customer_message:
        "--- " +
        productType.toUpperCase() +
        " ORDER ---\n" +
        orderSummary,
    };

    const cartRes = await bcFetch("/carts", "POST", cartPayload);
    const cartData = await cartRes.json();

    if (!cartRes.ok) {
      console.error(
        "BigCommerce create-cart error:",
        JSON.stringify(cartData)
      );
      return jsonResponse(
        {
          success: false,
          error: "BigCommerce API error",
          detail: cartData,
        },
        502
      );
    }

    const newCartId = cartData?.data?.id;
    // ─── Extract line item ID from new cart ───
    const lineItemId = extractLineItemId(cartData, productId);
    console.log("Cart created: " + newCartId + ", line item: " + lineItemId);

    let redirectUrls = null;
    if (newCartId) {
      const redirectRes = await bcFetch(
        "/carts/" + newCartId + "/redirect_urls",
        "POST"
      );
      if (redirectRes.ok) {
        const rd = await redirectRes.json();
        redirectUrls = rd?.data;
      }
    }

    return jsonResponse({
      success: true,
      cartId: newCartId,
      lineItemId,          // ← NEW
      redirectUrls,
      orderSummary,
    });
  } catch (err) {
    console.error("Cart error:", err);
    return jsonResponse(
      { success: false, error: "Server error: " + String(err) },
      500
    );
  }
}

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

function jsonResponse(data: any, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: corsHeaders });
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const url = new URL(req.url);

  try {
    if (url.pathname === "/" || url.pathname === "/sheets") {
      const data = await fetchSheets();
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, "Cache-Control": "public, max-age=300" },
      });
    }

    if (url.pathname === "/cart") {
      if (req.method !== "POST") {
        return jsonResponse({ error: "POST required" }, 405);
      }
      return handleCart(req);
    }

    if (url.pathname === "/health") {
      return jsonResponse({
        status: "ok",
        cached: !!cached,
        sheetId: SHEET_ID ? "yes" : "MISSING",
        clientId: CLIENT_ID ? "yes" : "MISSING",
        hasCartApi: !!(BC_STORE_HASH && BC_API_TOKEN),
      });
    }

    if (url.pathname === "/clear-cache") {
      cached = null;
      return jsonResponse({ status: "cleared" });
    }

    return jsonResponse({ error: "not found" }, 404);
  } catch (err) {
    return jsonResponse({ error: String(err) }, 500);
  }
});