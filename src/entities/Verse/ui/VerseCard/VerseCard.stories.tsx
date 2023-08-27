import React from "react";
import { Meta } from "@storybook/react";
import { VerseCard } from './index';
import verses from '../../examples/verses';

const meta: Meta<typeof VerseCard> = {
    component: VerseCard
}
export default meta;


export const Primary = () => <VerseCard verse={verses[0]} />
