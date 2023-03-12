import React from "react";
import Select from "@mui/material/Select";
import { SelectProps } from "@mui/material/Select";
import { Bible } from '../../model';

export interface BookSelectProps extends SelectProps {
    bible: Bible
}

export const BookSelect = ({ bible, ...props}: BookSelectProps) => {
    return <Select {...props}>
        { bible.books.map(book => (
            <option key={book.number} value={book.number}>{book.title}</option>
        )) }
    </Select>
}