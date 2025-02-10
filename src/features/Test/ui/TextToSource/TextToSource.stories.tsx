import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { TextToSource } from './index';
import { action } from '@storybook/addon-actions';
import { TextToSourceVariants } from '../../model';
import { bookTranslator, verses } from 'entities/Verse/@x/storybook'
import { Excerpt, ExcerptSource, formatExcerptSource } from 'entities/Verse/'

const meta: Meta<typeof TextToSource> = {
  component: TextToSource,
};

export default meta;

const excerpts = verses.map(verse => new Excerpt(ExcerptSource.parse(verse.id), verse.text));

export const Playground: StoryObj<typeof TextToSource> = {
  render: (props) => {
    const test = new TextToSourceVariants(excerpts[0], excerpts, formatExcerptSource.bind(null, bookTranslator));
    return <TextToSource test={test} {...props} />
  },
  args: {
    onCommit: action('commit'),
  },
};
