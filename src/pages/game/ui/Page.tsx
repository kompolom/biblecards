import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'shared/ui/Container';
import { LearningSessionWidget } from 'widgets/LearningSession';

export const Page = () => {
  const navigate = useNavigate();

  const handleClose = React.useCallback(() => {
    navigate('/');
  }, [navigate]);

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
