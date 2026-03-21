import { Type, globalCssToken } from '../../css-token';

export const ThemeTokens = {
  ColorSurface: globalCssToken(Type.Color, 'surface'),
  ColorText: globalCssToken(Type.Color, 'text'),
  ColorGreen: globalCssToken(Type.Color, 'green'),
  ColorBlue: globalCssToken(Type.Color, 'blue'),
  ColorRed: globalCssToken(Type.Color, 'blue'),
  ColorOrange: globalCssToken(Type.Color, 'orange'),

  ColorSuccess: globalCssToken(Type.Color, 'success'),
  ColorBorder: globalCssToken(Type.Color, 'border'),
  ColorBorderDisabled: globalCssToken(Type.Color, ['border', 'disabled']),
};
