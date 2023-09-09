import React, { useCallback, useState } from 'react';
import { DeleteOutlined } from '@mui/icons-material';
import Button, { ButtonProps } from '@mui/material/Button';
import { VerseDeleteDialog } from '../VerseDeleteDialog';
import { EntityId } from '@reduxjs/toolkit';

export interface VerseDeleteButtonProps extends ButtonProps {
  verseId: EntityId;
}

export const VerseDeleteButton = ({
  verseId,
  ...props
}: VerseDeleteButtonProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const closeDialog = useCallback(() => setDialogOpen(false), []);
  const openDialog = useCallback(() => setDialogOpen(true), []);
  const handleDelete = () => {
    console.info('Delete verse', verseId);
    alert('Delete verse not implemented');
  };

  return (
    <>
      <Button
        startIcon={<DeleteOutlined />}
        aria-label="Удалить"
        {...props}
        onClick={openDialog}
      >
        Удалить
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
