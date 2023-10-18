import React from 'react';
import { Page } from 'shared/ui/Page';
import { useLoadVerses } from 'features/Verse';
import { VersesListWidget } from 'widgets/VersesList';

export const PageVersesList = () => {
    useLoadVerses();

    return (<Page><VersesListWidget /></Page>);
}
export default PageVersesList;