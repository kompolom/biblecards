import React from "react";
import { styled, Typography, TypographyProps } from "@mui/material";

const Root = styled(Typography, { name: 'TestQuestion' })({ fontStyle: 'italic' });

export const TestQuestion = (props: TypographyProps) => <Root variant="h6" {...props} />