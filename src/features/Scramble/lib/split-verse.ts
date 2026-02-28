import { Excerpt } from 'entities/Verse';

/**
 * Split excerpt text to chunks
 */
export const splitVerse = (excerpt: Excerpt) =>
  excerpt.text.split(' ').filter(Boolean);

export const clean = (str: string) =>
  str
    .toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '')
    .trim();
