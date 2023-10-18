import React from 'react';
import { useParams } from 'react-router-dom';
import { Page } from 'shared/ui/Page';
import { VerseForm } from 'features/verse-form';
import { useSelector } from 'react-redux';
import { IVerse, VersesStateShape, getVerseById } from 'entities/Verse';
import { useLoadVerse } from 'features/Verse';

export const PageVerseEdit = () => {
    const { id } = useParams();
    useLoadVerse(Number.parseInt(id));
    const verse = useSelector<VersesStateShape, IVerse>((state) => getVerseById(state, Number(id)));

    return (<Page><VerseForm verse={verse} /></Page>);
}
export default PageVerseEdit;