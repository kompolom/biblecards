import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ScrambleSession } from './scramble';
import { Excerpt, ExcerptSource, VerseSource } from 'entities/Verse';

const gen11 = new Excerpt(
  new ExcerptSource(new VerseSource({ book: 1, chapter: 1, verse: 1 })),
  'In the beginning God created the heaven and the earth.',
);

const meta: Meta<typeof ScrambleSession> = {
  component: ScrambleSession,
  args: { excerpt: gen11 },
};
export default meta;

export const Showcase: StoryObj<typeof ScrambleSession> = {};
