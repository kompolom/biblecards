import * as React from 'react';

type CustomElementProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
> & {
  slot?: string;
};

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      [key: `bc-${string}`]: CustomElementProps;
    }
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [key: `bc-${string}`]: CustomElementProps;
    }
  }
}
