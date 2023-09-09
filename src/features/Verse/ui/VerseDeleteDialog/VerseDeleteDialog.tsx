import React from 'react';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export interface VerseDeleteDialogProps extends DialogProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export const VerseDeleteDialog = ({
  onConfirm,
  onCancel,
  ...props
}: VerseDeleteDialogProps) => {
  return (
    <Dialog
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      {...props}
    >
      <DialogTitle id="alert-dialog-title">
        Вы хотите удалить этот стих?
      </DialogTitle>
      <DialogActions>
        <Button onClick={onCancel} color="primary" autoFocus>
          Нет
        </Button>
        <Button onClick={onConfirm} color="error">
          Да
        </Button>
      </DialogActions>
    </Dialog>
  );
};
