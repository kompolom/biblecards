import React from 'react';
import { ScrambleSession } from 'features/Scramble';
import { useVerseStorageContext } from 'features/Verse';
import { Excerpt } from 'entities/Verse';
import { getRandomArrayItem } from 'shared/random';
import { Loader } from 'shared/ui/Loader';

export const ScrambleWidget = () => {
  const repository = useVerseStorageContext();
  const [excerpt, setExcerpt] = React.useState<Excerpt | null>(null);

  React.useEffect(() => {
    repository
      .getVerses({})
      .then(getRandomArrayItem)
      .then((verse) => {
        setExcerpt(verse);
      });
  }, [repository]);

  return excerpt ? (
    <ScrambleSession onComplete={console.log} excerpt={excerpt} />
  ) : (
    <Loader />
  );
};
