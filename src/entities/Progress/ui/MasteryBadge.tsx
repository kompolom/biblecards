import React from 'react';
import { Chip, Tooltip } from '@mui/material';
import {
  School as LearningIcon,
  CheckCircle as MasteredIcon,
  NewReleases as NewIcon,
  Update as ReviewIcon,
  Star as GoodIcon
} from '@mui/icons-material';

interface MasteryBadgeProps {
  level: number;
}

const LEVEL_CONFIG: Record<number, { label: string; color: any; icon: any }> = {
  1: { label: 'Новый', color: 'default', icon: <NewIcon fontSize="small" /> },
  2: { label: 'Учу', color: 'warning', icon: <LearningIcon fontSize="small" /> },
  3: { label: 'Повторяю', color: 'info', icon: <ReviewIcon fontSize="small" /> },
  4: { label: 'Знаю', color: 'success', icon: <GoodIcon fontSize="small" /> },
  5: { label: 'Освоен', color: 'primary', icon: <MasteredIcon fontSize="small" /> },
};

export const MasteryBadge = ({ level }: MasteryBadgeProps) => {
  const config = LEVEL_CONFIG[level] || LEVEL_CONFIG[1];

  return (
    <Tooltip title={`Уровень освоения: ${config.label}`}>
      <Chip
        icon={config.icon}
        label={level}
        color={config.color}
        size="small"
        variant="outlined"
      />
    </Tooltip>
  );
};
