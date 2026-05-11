type TokenType =
  | 'color'
  | 'dimension'
  | 'number'
  | 'fontFamily'
  | 'fontWeight'
  | 'duration'
  | 'cubicBezier';

export const Type = {
  Color: 'color',
  Dimension: 'dimension',
  Number: 'number',
  FontFamily: 'fontFamily',
  FontWeight: 'fontWeight',
  Duration: 'duration',
} as const;

const TOKEN_DELIMITER = '-';
const normalizePath = (path: string | string[]) =>
  typeof path === 'string'
    ? path.replace(' ', '-')
    : path.join(TOKEN_DELIMITER);

/**
 * Define css custom property
 * @example --container--dimension--width
 */
export const cssVar = (group: string, type: string, path: string | string[]) =>
  `--${group}--${type}--${normalizePath(path)}`;

/**
 * Использует css переменную
 * @example var(--container--width)
 */
export const getCssVar = (
  group: string,
  type: string,
  path: string | string[],
  defaultValue?: string,
) =>
  `var(${cssVar(group, type, path)}${defaultValue ? ', ' + defaultValue : ''})`;

type CssToken = {
  (defaultValue?: string): string;
} & string;

/**
 * Define scoped css token
 * @example
 * const cw = cssToken('Container', 'dimension', 'width');
 */
export const cssToken = (
  group: string,
  type: TokenType,
  path: string | string[],
) => {
  const fn = getCssVar.bind(null, group, type, path);
  fn.toString = cssVar.bind(null, group, type, path);
  return fn as CssToken;
};

/**
 * Define global css token
 */
export const globalCssToken = (type: TokenType, path: string | string[]) =>
  cssToken('global', type, path);
