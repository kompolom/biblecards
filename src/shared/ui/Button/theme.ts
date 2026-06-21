import { ButtonTokens } from './const';

export const themeLight = new CSSStyleSheet();
themeLight.insertRule(`
:host {
  ${ButtonTokens.Background}: #fff;
  ${ButtonTokens.BorderColor}: #e2e8f0;
  ${ButtonTokens.BorderColorDisabled}: #e2e8f0;
  ${ButtonTokens.TextColor}: var(--color-text);
  ${ButtonTokens.TextColorDisabled}: #e2e8f0;
  ${ButtonTokens.Radius}: 8px;
}
`);

export const success = new CSSStyleSheet();
success.insertRule(`:host {
  ${ButtonTokens.BorderColor}: #4CAF50;
}`);

export const warning = new CSSStyleSheet();
success.insertRule(`:host {
  ${ButtonTokens.BorderColor}: #ff9800;
}`);

export const error = new CSSStyleSheet();
success.insertRule(`:host {
  ${ButtonTokens.BorderColor}: #ff9800;
}`);
