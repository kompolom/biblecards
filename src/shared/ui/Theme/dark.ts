import { ThemeTokens } from './tokens';
export const dark = new CSSStyleSheet();
dark.replaceSync(`:root {
  ${ThemeTokens.ColorSurface}: rgb(19, 31, 36);
  ${ThemeTokens.ColorText}: rgb(220, 230, 236);
  ${ThemeTokens.ColorBlue}: rgb(73, 192, 248);
  ${ThemeTokens.ColorOrange}: rgb(255, 150, 0);
}`);
