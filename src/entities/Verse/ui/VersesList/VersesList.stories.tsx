import React from "react";
import { VersesList  } from "./index";
import { Meta } from "@storybook/react";
import verses from '../../examples/verses';
import { VersePreview } from "../VersePreview";

const meta: Meta<typeof VersesList> = {
    component: VersesList
}
export default meta;


export const Primary = () => { return (<VersesList>{verses.map((verse, i) => (<VersePreview key={i} verse={verse} component="li" />))}</VersesList>)}