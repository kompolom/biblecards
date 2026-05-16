import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import { DailyReviewList } from 'widgets/DailyReviewList';

export const HomePage = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4, mb: 4, textAlign: 'center', bgcolor: 'primary.main', color: 'primary.contrastText' }}>
        <Typography variant="h3" gutterBottom>
          BibiCards
        </Typography>
        <Typography variant="h6">
          Твой личный помощник в запоминании Священного Писания
        </Typography>
      </Paper>

      <Box sx={{ mt: 4 }}>
        <DailyReviewList />
      </Box>

      <Box sx={{ mt: 4, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
        <Typography variant="body1" color="text.secondary" align="center">
          Добавляйте новые стихи в разделе "Добавить стих" и тренируйтесь ежедневно,
          чтобы Слово Божье пребывало в вашем сердце.
        </Typography>
      </Box>
    </Container>
  );
};
