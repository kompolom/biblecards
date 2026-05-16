import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Divider,
} from '@mui/material';
import { ISessionResult } from 'entities/LearningSession';
import { useVerseStorageContext } from 'features/Verse';
import { useProgressRepository, MasteryBadge } from 'entities/Progress';
import { Excerpt, useFormatSource } from 'entities/Verse';
import { Loader } from 'shared/ui/Loader';

interface SessionSummaryProps {
  results: ISessionResult[];
  onClose: () => void;
}

export const SessionSummary = ({ results, onClose }: SessionSummaryProps) => {
  const verseStorage = useVerseStorageContext();
  const progressRepository = useProgressRepository();
  const formatSource = useFormatSource();
  const [data, setData] = useState<{ excerpt: Excerpt; mastery: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!verseStorage || !progressRepository) return;

      const details = await Promise.all(
        results.map(async (res) => {
          const [excerpt, progress] = await Promise.all([
            verseStorage.getById(res.excerptId),
            progressRepository.getById(res.excerptId),
          ]);
          return {
            excerpt: excerpt!,
            mastery: progress?.masteryLevel ?? 1,
          };
        }),
      );
      setData(details);
      setLoading(false);
    }
    load();
  }, [results, verseStorage, progressRepository]);

  if (loading) return <Loader />;

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom align="center">
        Сессия завершена!
      </Typography>
      <Typography variant="subtitle1" gutterBottom align="center">
        Твой текущий прогресс:
      </Typography>

      <List>
        {data.map(({ excerpt, mastery }, index) => (
          <React.Fragment key={excerpt.id}>
            <ListItem
              sx={{ flexDirection: 'column', alignItems: 'flex-start' }}
            >
              <Box
                sx={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'space-between',
                  mb: 1,
                }}
              >
                <Typography variant="subtitle2" color="primary">
                  {formatSource(excerpt.source)}
                </Typography>
                <MasteryBadge level={mastery} />
              </Box>
              <Typography
                variant="body2"
                sx={{ fontStyle: 'italic', color: 'text.secondary' }}
              >
                &laquo;{excerpt.text.slice(0, 100)}...&raquo;
              </Typography>
            </ListItem>
            {index < data.length - 1 && <Divider component="li" />}
          </React.Fragment>
        ))}
      </List>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        <Button variant="contained" size="large" onClick={onClose}>
          Закончить
        </Button>
      </Box>
    </Box>
  );
};
