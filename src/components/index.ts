// Product registry — imports and registers all product + shared step components
import "./products/product-registry.js";

// Main configurator component
import "./bulk-configurator.js";

// Public API
export { BulkConfigurator } from "./bulk-configurator.js";
export { getProductConfig } from "./products/product-registry.js";
export { CONFIG } from "./config.js";
export { InfoTooltip } from "./info-tooltip.js";

// Types
export type { ProductConfig, StepConfig, ValidatableStep } from "./types.js";
