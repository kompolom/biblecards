import React, { ReactNode } from 'react';

export interface PageProps {
  children: ReactNode | ReactNode[];
}

export const Page = (props: PageProps) => {
  return <div className="Page">{props.children}</div>;
};
