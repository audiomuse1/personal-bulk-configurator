import { css } from "lit";

export const sharedStyles = css`
  :host {
    display: block;
    font-family:
      -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }

  .step-card {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: visible;
    margin-bottom: 16px;
  }

  .step-header {
    padding: 12px 16px;
    font-size: 16px;
    font-weight: 600;
    background: #fafafa;
    border-bottom: 1px solid #e0e0e0;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .step-header-text {
    flex: 1;
  }

  .step-body {
    padding: 16px;
  }

  .info-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #4ecdc4;
    color: white;
    font-size: 12px;
    font-weight: 700;
  }

  hr {
    border: none;
    border-top: 1px solid #e0e0e0;
    margin: 16px 0;
  }
`;