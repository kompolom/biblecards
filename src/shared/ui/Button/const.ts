import { cssToken, Type } from '../../css-token';

export const name = 'bc-button';
export const ButtonTokens = {
  BorderColor: cssToken(name, Type.Color, 'border'),
  BorderColorActive: cssToken(name, Type.Color, ['border', 'active']),
  BorderColorDisabled: cssToken(name, Type.Color, ['border', 'disabled']),
  TextColor: cssToken(name, Type.Color, 'text'),
  TextColorDisabled: cssToken(name, Type.Color, ['text', 'disabled']),
  Background: cssToken(name, Type.Color, 'bg'),
  Radius: cssToken(name, Type.Dimension, 'radius'),
  Gap: cssToken(name, Type.Dimension, 'gap'),
  TextSize: cssToken(name, Type.Dimension, ['text', 'size']),
};
