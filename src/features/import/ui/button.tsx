import React from 'react';
import { Button, ButtonProps, styled } from '@mui/material';
import { useImportVerses } from '../model';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export const ImportButton = ({ children, ...props }: ButtonProps) => {
  const importVerses = useImportVerses();
  return (
    // @ts-expect-error label
    <Button component="label" role={undefined} {...props}>
      {children}
      <VisuallyHiddenInput
        onChange={(e) => {
          const files = e.currentTarget.files;
          if (!files.length) return;
          return importVerses(files.item(0));
        }}
        type="file"
        accept="text/csv"
      />
    </Button>
  );
};
