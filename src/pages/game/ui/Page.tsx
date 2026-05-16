import React from 'react';
import { Container } from 'shared/ui/Container';
import { LearningSessionWidget } from 'widgets/LearningSession';

export const Page = () => {
  const handleClose = React.useCallback(() => {
    // В будущем здесь может быть навигация на главную
    console.log('Learning session closed');
  }, []);

  return (
    <Container sx={{ my: 2 }}>
      <LearningSessionWidget
        config={{
          count: 5,
          strategy: 'weakest',
        }}
        onClose={handleClose}
      />
    </Container>
  );
};
