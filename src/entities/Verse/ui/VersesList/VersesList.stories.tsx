import React from "react";
import { VersesList  } from "./index";
import { Meta } from "@storybook/react";
import verses from '../../examples/verses';

const meta: Meta<typeof VersesList> = {
    component: VersesList
}
export default meta;


export const Primary = () => <VersesList verses={verses} />