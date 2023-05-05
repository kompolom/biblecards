import React from "react";
import { FlipCard } from './index';
import { Typography } from "@mui/material";

export default {
    component: FlipCard
}

export const Primary = () => <FlipCard frontContent={<Typography>Front side</Typography>} backContent={<Typography>Back side</Typography>} />