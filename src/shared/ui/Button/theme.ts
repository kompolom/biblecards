import { ButtonTokens } from './const';

export const themeLight = new CSSStyleSheet();
themeLight.insertRule(`
bc-button {
  ${ButtonTokens.Background}: #fff;
  ${ButtonTokens.BorderColor}: rgb(226 232 240);
  ${ButtonTokens.BorderColorDisabled}: rgb(226 232 240);
  ${ButtonTokens.TextColor}: rgb(15 23 42);
  ${ButtonTokens.TextColorDisabled}: rgb(226 232 240);
  ${ButtonTokens.Radius}: 5px;
}
`);

export const success = new CSSStyleSheet();
success.insertRule(`bc-button {
  ${ButtonTokens.BorderColor}: #4CAF50;
}`);

export const warning = new CSSStyleSheet();
success.insertRule(`bc-button {
  ${ButtonTokens.BorderColor}: #ff9800;
}`);

export const error = new CSSStyleSheet();
success.insertRule(`bc-button {
  ${ButtonTokens.BorderColor}: #ff9800;
}`);
