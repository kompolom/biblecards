import React, { useCallback } from 'react';
import { useVerseStorageContext } from "features/Verse"
import { useEffect, useState } from "react"
import { Loader } from "shared/ui/Loader";
import { TextToSource, TextToSourceVariants } from 'features/Test';
import { useAlertManager } from 'shared/ui/AlertManager';

export const SingleTextToVariantsWidget = () => {
    const am = useAlertManager();
    const storage = useVerseStorageContext()
    const [model,setModel]  = useState<TextToSourceVariants|undefined>()
    useEffect(() => {
        const getVerses = async () => {
            const verses = await storage.getVerses({});
            setModel(new TextToSourceVariants(verses[0], verses));
        }
        getVerses();
    }, [storage]);
    const onCommit = useCallback(async (answer: string) => {
        const result = await model.commit(answer);
        am.showAlert(result.status? 'Верно!': 'Неверно!', 2000, { status: result.status? 'success': 'error'});
        // TODO: get next
    }, [model, am]);

    if(!model) {
        return <Loader />
    }

    return <TextToSource onCommit={onCommit} test={model} />
}