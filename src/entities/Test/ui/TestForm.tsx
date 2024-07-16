import React, { FormHTMLAttributes, PropsWithChildren, ReactNode } from "react";
import { TestQuestion } from './TestQuestion';
import { TestTitle } from './TestTitle';
import Box from "@mui/material/Box";
import { styled } from "@mui/material";

const TestFormFooter = styled('footer')({});

export interface TestFormProps extends FormHTMLAttributes<HTMLFormElement> {
    testTitle?: ReactNode;
    question?: ReactNode;
    submitButton?: ReactNode;
}
export const TestForm = ({ testTitle, question, submitButton, children, ...props }: TestFormProps) => {
    return (<form {...props}>
        <TestTitle>{testTitle}</TestTitle>
        <TestQuestion sx={{ my: 2 }}>{question}</TestQuestion>
        <Box>
            {children}
        </Box>
        <TestFormFooter>{submitButton}</TestFormFooter>
    </form>)
}