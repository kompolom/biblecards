import React from "react";
import { VersesList  } from "./index";
import { Meta } from "@storybook/react";
import verses from '../../examples/verses';
import { VersePreview } from "../VersePreview";
import { ExcerptSource } from '../../model'

const meta: Meta<typeof VersesList> = {
    component: VersesList
}
export default meta;


export const Primary = () => { return (<VersesList>{verses.map((verse, i) => (<VersePreview key={i} source={ExcerptSource.parse(verse.id)} component="li" />))}</VersesList>)}