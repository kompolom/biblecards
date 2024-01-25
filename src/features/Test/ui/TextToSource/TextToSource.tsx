import React, { PointerEventHandler, useCallback, ReactNode } from 'react';
import { Box, Typography } from '@mui/material';
import { IVerse, getVerseSource } from 'entities/Verse';
import Button from '@mui/material/Button';

export interface TextToSourceProps {
  verse: IVerse;
  variants: IVerse[];
  onSelect: (id: number) => void;
  title?: ReactNode;
}

export const TextToSource = ({
  verse,
  variants,
  onSelect,
  title,
}: TextToSourceProps) => {
  const onClick: PointerEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      const id = event.currentTarget.dataset.variantid;
      const variant = variants.find((v) => v.id === Number(id));
      if (!id || !variant) return;
      onSelect(variant.id);
    },
    [onSelect],
  );
  return (
    <Box>
      <Typography>{title}</Typography>
      <Typography variant="h6" sx={{ my: 2, fontStyle: 'italic' }}>
        &laquo;{verse.text}&raquo;
      </Typography>
      <Box
        sx={{
          display: 'grid',
          width: '100%',
          gap: 1,
          gridTemplateColumns: 'auto',
          my: 2,
        }}
      >
        {variants.map((variant) => (
          <Button
            onClick={onClick}
            data-variantId={variant.id}
            variant="outlined"
            key={variant.id}
          >
            {getVerseSource(variant)}
          </Button>
        ))}
      </Box>
    </Box>
  );
};
