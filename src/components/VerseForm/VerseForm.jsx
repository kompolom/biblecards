import React from 'react';
import Textfield from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import { Button } from '@material-ui/core';
import './style.css';
import books from '../../data/books.json';

export const VerseForm = (props) => {
    return (<form method='POST' className="container">
        <div className="VerseForm-row">
            <Select inputProps={{ name: "book" }} fullWidth native defaultValue={books[0]}>
                {
                    books.map(book => {
                        return (
                            <option key={book}>{book}</option>
                        )
                    } )
                }
            </Select>
            <Textfield fullWidth name="chapter" type="number" min="1" max="150" label="Глава"/>
            <Textfield fullWidth name="verse" type="number" min="1" label="Стих" required />
            <Textfield fullWidth multiline rows={4} name="text" label="Текст" required />
        </div>
        <div className="VerseForm-row VerseForm-SubmitSection">
            <Button type="submit" variant="contained" color="primary">Добавить</Button>
        </div>
    </form>);
}