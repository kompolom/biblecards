import React from "react";
import { VersePreview  } from "./index";
import { Meta } from "@storybook/react";
import verses from '../../examples/verses';

const meta: Meta<typeof VersePreview> = {
    component: VersePreview
}
export default meta;


export const Primary = () => <VersePreview verse={verses[0]} />