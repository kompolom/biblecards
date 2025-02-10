import React from 'react';
import { Page } from 'shared/ui/Page';
import { VerseForm } from 'features/verse-form';
import { ImportButton } from 'features/import';

export const PageVerseAdd = () => {
  return (
    <Page>
      <VerseForm />
      <ImportButton variant='contained'>Import from file</ImportButton>
    </Page>
  );
};
export default PageVerseAdd;
