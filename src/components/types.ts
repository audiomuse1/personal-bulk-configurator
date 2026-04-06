/**
 * Every step component must implement this interface.
 * The parent configurator calls validate() before allowing Next.
 */
export interface ValidatableStep extends HTMLElement {
  validate(): boolean;
}

/**
 * Defines a step in the product wizard.
 */
export interface StepConfig {
  id: string;
  title: string;
  tag: string;
  props?: (stepData: Record<string, any>) => Record<string, any>;
}

/**
 * Defines a product type's full configuration.
 */
export interface ProductConfig {
  productType: string;
  label: string;
  steps: StepConfig[];
}
