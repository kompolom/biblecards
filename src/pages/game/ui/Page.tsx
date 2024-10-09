import React from 'react';
import { Container } from 'shared/ui/Container';
import { SingleTextToVariantsWidget } from 'widgets/SingleTextToVariants';

export const Page = () => {
  return <Container sx={{ my: 2 }}>
    <SingleTextToVariantsWidget />
  </Container>;
};
