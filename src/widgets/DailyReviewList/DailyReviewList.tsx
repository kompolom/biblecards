import React, { useEffect, useState, useMemo } from 'react';
import {
  Typography,
  List,
  ListItem,
  Box,
  CircularProgress,
  Button,
  Stack,
  Divider
} from '@mui/material';
import { useProgressRepository, IProgress, MasteryBadge } from 'entities/Progress';
import { useSelector } from 'react-redux';
import { versesListSelector } from 'entities/Verse';
import { VerseCard } from 'entities/Verse/ui/VerseCard';
import { Link } from 'react-router-dom';
import { PlayArrow as PlayIcon } from '@mui/icons-material';

export const DailyReviewList = () => {
  const [dueProgress, setDueProgress] = useState<IProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const repository = useProgressRepository();
  const allVerses = useSelector(versesListSelector);

  useEffect(() => {
    if (!repository) return;

    repository.getDueReviews()
      .then(progress => {
        setDueProgress(progress);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [repository]);

  const dueVerses = useMemo(() => {
    return dueProgress
      .map(p => {
        const verse = allVerses.find(v => v.id === p.excerptId);
        return verse ? { verse, progress: p } : null;
      })
      .filter((v): v is { verse: any, progress: IProgress } => v !== null);
  }, [dueProgress, allVerses]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (dueVerses.length === 0) {
    return (
      <Box p={4} textAlign="center">
        <Typography variant="h6" color="text.secondary">
          На сегодня всё! Вы повторили все запланированные отрывки.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ px: 2, pt: 2 }}>
        Повторение на сегодня ({dueVerses.length})
      </Typography>
      <Divider />
      <List>
        {dueVerses.map(({ verse, progress }) => (
          <ListItem key={verse.id} sx={{ display: 'block', mb: 2 }}>
            <VerseCard
              verse={verse}
              renderProgress={() => <MasteryBadge level={progress.masteryLevel} />}
              actions={
                <Stack direction="row" spacing={1} sx={{ width: '100%' }} justifyContent="flex-end">
                  <Button
                    variant="contained"
                    startIcon={<PlayIcon />}
                    component={Link}
                    to={`/game?id=${encodeURIComponent(verse.id)}`}
                  >
                    Начать
                  </Button>
                </Stack>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
