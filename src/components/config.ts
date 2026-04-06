declare const __SHEETS_PROXY_URL__: string;

function resolveProxyBase(): string {
  // 1. Host page override
  if (
    typeof window !== "undefined" &&
    (window as any).__BULK_CONFIG__?.proxyBase
  ) {
    return (window as any).__BULK_CONFIG__.proxyBase;
  }

  // 2. Dev mode — Vite proxy
  if (
    typeof window !== "undefined" &&
    window.location.hostname === "localhost"
  ) {
    // Check if running under Stencil (port 3000) vs Vite dev
    if (window.location.port === "3000") {
      // Stencil dev — use production proxy
      return "https://light-cow-51.andrewhartfordbac.deno.net";
    }
    return "";  // Vite dev — use Vite proxy at same origin
  }

  // 3. Production default
  return "https://light-cow-51.andrewhartfordbac.deno.net";
}

function resolveSheetsUrl(): string {
  // 1. Host page override
  if (
    typeof window !== "undefined" &&
    (window as any).__BULK_CONFIG__?.sheetsProxyUrl
  ) {
    return (window as any).__BULK_CONFIG__.sheetsProxyUrl;
  }

  // 2. Build-time replacement
  try {
    if (typeof __SHEETS_PROXY_URL__ !== "undefined" && __SHEETS_PROXY_URL__) {
      return __SHEETS_PROXY_URL__;
    }
  } catch {
    // Not defined — fall through
  }

  // 3. Derived from proxyBase
  return resolveProxyBase() + "/api/sheets";
}

export const CONFIG = {
  proxyBase: resolveProxyBase(),
  sheetsProxyUrl: resolveSheetsUrl(),
  cacheTtl: 10 * 60 * 1000,
  sessionPrefix: "bulk-config-",
};