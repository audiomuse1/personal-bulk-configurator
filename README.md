# @unionbase/bulk-configurator

Multi-product bulk order configurator for BigCommerce Cornerstone themes. Built as Lit web components with a Deno Deploy proxy for pricing and cart management.

**Current deployment:** [Bright Blue Ink / Bumperactive](https://print.bumperactive.com)

---

## Supported Products

- 👕 Custom T-Shirts (pricing from Google Sheets, min 1 shirt)
- ✨ Custom Stickers (min \$50 regular / \$100 holographic)
- ⚫ Custom Buttons (min 25)
- ☕ Custom Mugs (min 1)
- 🧊 Custom Can Coolers (min 25)
- 🪧 Coroplast Yard Signs (min 1)

---

## How It Works

1. Customer configures a product through a step wizard on the product page
2. Clicking "Add to Cart" submits a native HTML form to `/cart.php` at \$0.01
3. Cart page detects the \$0.01 item, shows a loading overlay, and calls the Deno proxy
4. Proxy fixes the price via BigCommerce Server-to-Server API
5. Page reloads with correct pricing and enhanced order details

BigCommerce doesn't support dynamic pricing on custom products, so the \$0.01 placeholder + server-side fix is the workaround.

---

## Repos

There are two repos that work together:

- **bulk-configurator** — Lit web components, pricing engines, Vite build
- **bulk-configurator-storefront** — BigCommerce Cornerstone theme with custom templates

Storefront git remotes:

- `origin` — your private repo
- `upstream` — `https://github.com/bigcommerce/cornerstone.git`

---

## Key Files

### Component App (bulk-configurator/)

- `src/components/bulk-configurator.ts` — Main wizard wrapper
- `src/components/bigcommerce.ts` — Form submission, CSRF, custom fields
- `src/components/config.ts` — Proxy URL resolution
- `src/components/products/product-registry.ts` — Maps product types to steps
- `src/components/products/[product]/step-[product]-config.ts` — Product step UI
- `src/components/products/[product]/[product]-pricing-engine.ts` — Pricing logic
- `src/components/shared-steps/` — Artwork upload, union label, notes
- `proxy/main.ts` — Deno Deploy proxy (deployed via dash.deno.com)
- `proxy/index.ts` — Local dev proxy (not deployed)

### Storefront (bulk-configurator-storefront/)

- `assets/js/custom/bulk-configurator.js` — Built component (copied from dist)
- `templates/pages/custom/product/bulk-configurator.html` — Product page template
- `templates/pages/cart.html` — Price fix + display enhancement
- `templates/pages/checkout.html` — Order detail injection
- `config.stencil.json` — Maps product URLs to template

---

## Dev Setup

**Component dev (standalone, hot reload):**

    cd ~/projects/bulk-configurator
    npm install
    npm run dev
    # Opens http://localhost:5173

**Full integration (inside BigCommerce theme):**

    cd ~/projects/bulk-configurator
    npm run build
    cp dist/bulk-configurator.iife.js \
      ~/projects/bulk-configurator-storefront/assets/js/custom/bulk-configurator.js
    cd ~/projects/bulk-configurator-storefront
    npm install
    stencil start
    # Visit http://localhost:3000/custom-sticker-order/

Stencil requires `secrets.stencil.json` in the storefront root (gitignored):

    {
      "auth_token": "<your-stencil-cli-token>"
    }

---

## Build and Deploy

### Component Changes

    cd ~/projects/bulk-configurator
    npm run build
    cp dist/bulk-configurator.iife.js \
      ~/projects/bulk-configurator-storefront/assets/js/custom/bulk-configurator.js
    cd ~/projects/bulk-configurator-storefront
    stencil bundle
    stencil push

### Theme Template Changes

    cd ~/projects/bulk-configurator-storefront
    # Edit templates, test with stencil start
    stencil bundle
    stencil push

### Proxy Changes

1. Go to [dash.deno.com](https://dash.deno.com) > Apps > light-cow-51
2. Click Playground
3. Edit `main.ts`
4. Click Deploy

No CI/CD — proxy is edited and deployed in the Deno dashboard.

---

## BigCommerce Products

- **Custom T-Shirt Order** — ID 475, slug `/custom-t-shirt-order/`, modifiers: orderId:3706 frontArtwork:3712 backArtwork:3713
- **Custom Sticker Order** — ID 476, slug `/custom-sticker-order/`, modifiers: orderId:3707 artwork:3714
- **Custom Button Order** — ID 477, slug `/custom-button-order/`, modifiers: orderId:3708 artwork:3716
- **Custom Mug Order** — ID 478, slug `/custom-mug-order/`, modifiers: orderId:3711 artwork:3717
- **Custom Can Cooler Order** — ID 479, slug `/custom-can-cooler-order/`, modifiers: orderId:3709 frontArtwork:3718 backArtwork:3719
- **Custom Yard Sign Order** — ID 480, slug `/custom-yard-sign-order/`, modifiers: orderId:3710 frontArtwork:3720 backArtwork:3721

### Adding a New Product

1. Create product in BC Admin at \$0.01 with Order ID (text) and Artwork (file upload) modifiers
2. Note the product ID and modifier IDs from the admin URL
3. Add to `PRODUCT_MODIFIERS` in `src/components/bigcommerce.ts`
4. Add URL to `config.stencil.json` under `customLayouts.product["bulk-configurator.html"]`
5. Register in `src/components/products/product-registry.ts`
6. Build and deploy

---

## Deno Deploy Proxy

- **URL:** `https://light-cow-51.andrewhartfordbac.deno.net`
- **Dashboard:** [dash.deno.com](https://dash.deno.com) > Apps > light-cow-51

### Endpoints

- `GET /sheets` — Google Sheets t-shirt pricing (cached 5 min)
- `POST /fix-price` — Updates line item `list_price` to real price
- `POST /update-message` — Appends order details to `customer_message`
- `GET /health` — Status check
- `GET /clear-cache` — Clears sheets cache
- `GET /modifiers/{productId}` — Returns product modifiers (debugging)

### Environment Variables

Set in Deno Deploy dashboard:

- `SHEET_ID` — Google Sheet ID for t-shirt pricing
- `CLIENT_ID` / `CLIENT_SECRET` / `REFRESH_TOKEN` — Google OAuth
- `BC_STORE_HASH` — `1gqkiz2hyx`
- `BC_API_TOKEN` — Server-to-Server API token (do not regenerate)

---

## Updating Pricing

### T-Shirts

Edit the Google Sheet directly. Changes take effect within 5 minutes. Force refresh by visiting `/clear-cache` on the proxy.

Sheet ID: `103FndWyqILCWIkNsS3rEXzksjqUisCVx3QYkRa7UbTw`

### Stickers

Edit `src/components/products/sticker/sticker-pricing-engine.ts`:

    export const BASE_PRICE_PER_TEN_SQ_IN = 0.25;
    export const ORDER_MINIMUM_REGULAR = 50;
    export const ORDER_MINIMUM_HOLOGRAPHIC = 100;
    export const HOLOGRAPHIC_SURCHARGE = 0.75;

### Buttons

Edit `src/components/products/button/button-pricing-engine.ts`:

    export const BUTTON_PRICE_BRACKETS = [
      { minQty: 25, maxQty: 49, retailPrice: 1.50 },
      { minQty: 50, maxQty: 99, retailPrice: 1.25 },
      // ...
    ];

### Mugs

Edit `src/components/products/mug/mug-pricing-engine.ts`:

    const PRICING: Record<string, PriceBracket[]> = {
      "11oz-usa": [
        { minQty: 1, maxQty: 1, price: 18.00 },
        { minQty: 2, maxQty: 5, price: 16.00 },
        // ...
      ],
    };
    export const PACKAGING_FEE = 2.50;
    export const SHIPPING_FEE = 4.00;

### Can Coolers

Edit `src/components/products/cancooler/cancooler-pricing-engine.ts`:

    const ONE_SIDED_BRACKETS = [
      { minQty: 25, maxQty: 49, netPrice: 4.50 },
      // ...
    ];
    const TWO_SIDED_BRACKETS = [
      { minQty: 25, maxQty: 49, netPrice: 5.50 },
      // ...
    ];

### Yard Signs

Edit `src/components/products/yardsign/yardsign-pricing-engine.ts`:

    export const FULL_BLEED_FEE = 0.50;
    export const STAKE_OPTIONS = [
      { id: "none", label: "No Stakes", pricePerSign: 0 },
      { id: "wire", label: "Wire H-Stakes", pricePerSign: 2.00 },
      { id: "heavy", label: "Heavy-Duty Stakes", pricePerSign: 4.00 },
    ];

### After Any Code Pricing Change

    cd ~/projects/bulk-configurator
    npm run build
    cp dist/bulk-configurator.iife.js \
      ~/projects/bulk-configurator-storefront/assets/js/custom/bulk-configurator.js
    cd ~/projects/bulk-configurator-storefront
    stencil bundle
    stencil push

---

## localStorage

- `bulk-order-pending` — Array of order configs (product type, fields, artwork thumbnails, orderId, needsPriceFix flag)
- `bulk-config-{type}` — In-progress configurator state (sessionStorage)

Old configs accumulate during testing. Clear with `localStorage.removeItem("bulk-order-pending")` or add cleanup logic to the order confirmation page.

=

## White-Label Notes

**Already reusable:** product types, modular architecture, separate pricing engines, Shadow DOM isolation, Google Sheets for t-shirts.

**Needs work for resale:**

- Centralize colors into a single `theme.ts` (currently hardcoded across 11+ files)
- Move pricing brackets to JSON config or Sheets (currently requires rebuild)
- Make `PRODUCT_MODIFIERS` configurable (currently hardcoded per store)

**Per-client setup always requires:** BC product/modifier creation, API credentials, proxy deployment, theme integration.

---

