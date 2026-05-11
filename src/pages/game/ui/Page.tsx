import React from 'react';
import { Container } from 'shared/ui/Container';
import { SingleTextToVariantsWidget } from 'widgets/SingleTextToVariants';
import { ScrambleWidget } from 'widgets/Scramble';
import { getRandomArrayItem } from 'shared/random';

export const Page = () => {
  const Component = React.useMemo(
    () => getRandomArrayItem([SingleTextToVariantsWidget, ScrambleWidget]),
    [],
  );
  return (
    <Container sx={{ my: 2 }}>
      <Component />
    </Container>
  );
};
