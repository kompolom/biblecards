import React from 'react';
import { VersePreview } from './index';
import { Meta } from '@storybook/react';
import verses from '../../examples/verses';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const meta: Meta<typeof VersePreview> = {
  component: VersePreview,
};
export default meta;

export const Primary = () => <VersePreview verse={verses[0]} />;

export const WithActions = () => (
  <VersePreview
    verse={verses[0]}
    actions={
      <ButtonGroup size="small">
        <Button>Edit</Button>
        <Button>Delete</Button>
      </ButtonGroup>
    }
  />
);
