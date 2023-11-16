import React, { useCallback, useState } from 'react';
import { DeleteOutlined } from '@mui/icons-material';
import Button, { ButtonProps } from '@mui/material/Button';
import { VerseDeleteDialog } from '../VerseDeleteDialog';
import { EntityId } from '@reduxjs/toolkit';
import { versesSlice } from 'entities/Verse';
import { useDispatch } from 'react-redux';

export interface VerseDeleteButtonProps extends ButtonProps {
  verseId: EntityId;
}

export const VerseDeleteButton = ({
  verseId,
  ...props
}: VerseDeleteButtonProps) => {
  const dispatch = useDispatch();
  const [dialogOpen, setDialogOpen] = useState(false);
  const closeDialog = useCallback(() => setDialogOpen(false), []);
  const openDialog = useCallback(() => setDialogOpen(true), []);
  const handleDelete = () => {
    dispatch(versesSlice.actions.verseDeleted(verseId));
  };

  return (
    <>
      <Button
        startIcon={<DeleteOutlined />}
        aria-label="Удалить"
        {...props}
        onClick={openDialog}
      >
        <span className="ButtonText">Удалить</span>
      </Button>
      <VerseDeleteDialog
        open={dialogOpen}
        onClose={closeDialog}
        onCancel={closeDialog}
        onConfirm={handleDelete}
      />
    </>
  );
};
