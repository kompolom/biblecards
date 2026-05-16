import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ScrambleTest } from './ScrambleTest';
import { Excerpt, ExcerptSource, VerseSource } from 'entities/Verse';

const gen11 = new Excerpt(
  new ExcerptSource(new VerseSource({ book: 1, chapter: 1, verse: 1 })),
  'In the beginning God created the heaven and the earth.',
);

const meta: Meta<typeof ScrambleTest> = {
  component: ScrambleTest,
  args: { excerpt: gen11 },
};
export default meta;

export const Showcase: StoryObj<typeof ScrambleTest> = {};
