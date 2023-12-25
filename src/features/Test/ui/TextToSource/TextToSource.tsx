import React from 'react';
import { Box } from "@mui/material";
import { IVerse, VerseCard } from "entities/Verse";

export interface TextToSourceProps {
    verse: IVerse;
    variants: IVerse[];
}

export const TextToSource = ({ verse, variants }: TextToSourceProps) => <Box>
    <VerseCard verse={verse} />
</Box>