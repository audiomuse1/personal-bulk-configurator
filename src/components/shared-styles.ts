import { css } from "lit";

export const sharedStyles = css`
  :host {
    display: block;
    font-family: var(--bulk-configurator-font, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
    color: var(--bulk-configurator-text-color, #333333);
  }

  /* ── Card base (used by shared steps as .step-card) ── */

  .step-card {
    border: 1px solid var(--bulk-card-border, #e0e0e0);
    border-radius: var(--bulk-card-radius, 8px);
    overflow: visible;
    margin-bottom: 16px;
    background: var(--bulk-card-bg, #ffffff);
    box-shadow: var(--bulk-card-shadow, none);
  }

  .step-header {
    padding: 12px 16px;
    font-size: 16px;
    font-weight: 600;
    background: var(--bulk-card-header-bg, #fafafa);
    color: var(--bulk-card-header-color, #333333);
    border-bottom: 1px solid var(--bulk-card-border, #e0e0e0);
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .step-header-text {
    flex: 1;
  }

  .step-body {
    padding: 16px;
    background: var(--bulk-card-body-bg, #ffffff);
    color: var(--bulk-card-body-color, #333333);
  }

  /* ── Card base (used by product configs as .card) ── */

  .card {
    margin-bottom: 16px;
    border: 2px solid var(--bulk-card-border, #e0e0e0);
    border-radius: var(--bulk-card-radius, 8px);
    overflow: visible;
    transition: border-color 0.3s;
    background: var(--bulk-card-bg, #ffffff);
    box-shadow: var(--bulk-card-shadow, none);
  }
  .card.valid { border-color: #2ecc71; }
  .card.invalid-highlight { border-color: #e74c3c; animation: shake 0.4s ease-in-out; }
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-4px); }
    75% { transform: translateX(4px); }
  }

  .card-header {
    padding: 10px 16px;
    font-size: 16px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--bulk-card-header-bg, #fafafa);
    color: var(--bulk-card-header-color, #333333);
    border-bottom: 1px solid var(--bulk-card-border, #e0e0e0);
  }
  .card-header .header-text { flex: 1; }
  .card-header .status { font-size: 13px; font-weight: 400; }
  .card-header .status.done { color: #2ecc71; }
  .card-header .status.needed { color: #e74c3c; }

  .card-body {
    padding: 16px;
    background: var(--bulk-card-body-bg, #ffffff);
    color: var(--bulk-card-body-color, #333333);
  }

  .info-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--bulk-configurator-accent, #4ecdc4);
    color: white;
    font-size: 12px;
    font-weight: 700;
  }

  hr {
    border: none;
    border-top: 1px solid var(--bulk-card-border, #e0e0e0);
    margin: 16px 0;
  }
`;