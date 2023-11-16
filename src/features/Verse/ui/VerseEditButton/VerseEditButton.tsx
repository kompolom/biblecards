import React from 'react';
import { useNavigate } from 'react-router';
import { EntityId } from '@reduxjs/toolkit';
import { EditOutlined } from '@mui/icons-material';
import Button from '@mui/material/Button';

export interface VerseEditButtonProps {
  verseId: EntityId;
}

export const VerseEditButton = ({ verseId }: VerseEditButtonProps) => {
  const navigate = useNavigate();
  const onEditClick = React.useCallback(() => {
    navigate(`/edit/${verseId}`);
  }, [verseId, navigate]);
  return (
    <Button startIcon={<EditOutlined />} onClick={onEditClick}>
      <span className="ButtonText">Редактировать</span>
    </Button>
  );
};
