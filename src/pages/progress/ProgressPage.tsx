import React, { useEffect, useState } from 'react';
import {
  Typography,
  Container,
  Box,
  Paper,
  Grid,
  CircularProgress,
  LinearProgress
} from '@mui/material';
import { useProgressRepository, IProgress } from 'entities/Progress';

export const ProgressPage = () => {
  const [allProgress, setAllProgress] = useState<IProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const repository = useProgressRepository();

  useEffect(() => {
    if (!repository) return;
    repository.getAll()
      .then(data => {
        setAllProgress(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [repository]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  const masteryCounts = allProgress.reduce((acc, curr) => {
    acc[curr.masteryLevel] = (acc[curr.masteryLevel] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const total = allProgress.length;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Ваш прогресс запоминания
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">
              Всего отрывков в обучении
            </Typography>
            <Typography variant="h2">
              {total}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Уровни освоения
            </Typography>
            {[5, 4, 3, 2, 1].map(level => {
              const count = masteryCounts[level] || 0;
              const percentage = total > 0 ? (count / total) * 100 : 0;
              return (
                <Box key={level} sx={{ mb: 2 }}>
                  <Box display="flex" justifyContent="space-between" mb={0.5}>
                    <Typography variant="body2">Уровень {level}</Typography>
                    <Typography variant="body2">{count} ({Math.round(percentage)}%)</Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={percentage}
                    color={level === 5 ? 'primary' : level >= 3 ? 'success' : 'warning'}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
              );
            })}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
