import { Pattern } from '../pattern';
import { until } from './until';

export const quoted = (char = '"'): Pattern => {
  const u = until(char);
  return {
    exec: (input, from = -1) => {
      let quoteStart = u.exec(input, from);
      let quoteEnd = u.exec(input, quoteStart.end);
      return {
        input,
        end: quoteEnd.end++,
        value: quoteEnd.value,
      };
    },
  };
};
