import React from 'react';
import { VersePreview } from './index';
import { Meta } from '@storybook/react';
import verses from '../../examples/verses';
import { bookTranslator } from '../../examples/bookTranslator';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { BookTranslatorContext, ExcerptSource } from '../../model';

const meta: Meta<typeof VersePreview> = {
  component: VersePreview,
};
export default meta;

export const Primary = () => (
  <BookTranslatorContext value={bookTranslator}>
    <VersePreview source={ExcerptSource.parse(verses[0].id)} />
  </BookTranslatorContext>
);

export const WithActions = () => (
  <VersePreview
    source={ExcerptSource.parse(verses[0].id)}
    actions={
      <ButtonGroup size="small">
        <Button>Edit</Button>
        <Button>Delete</Button>
      </ButtonGroup>
    }
  />
);
