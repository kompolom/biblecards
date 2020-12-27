import React from 'react';
import { Button } from '@material-ui/core';
import { Formik, Field, Form } from 'formik';
import './style.css';
import books from '../../data/books.json';

export const VerseForm = (props) => {
    return (
        <Formik
            initialValues={{
                listBooks: '',
                chapter: '',
                verse: '',
                text: '',
            }}
            onSubmit={async (values) => {
                await new Promise((r) => setTimeout(r, 500));
                alert(JSON.stringify(values, null, 2));
            }}
        >
            <Form className="container" >
                <div className="VerseForm-body VerseForm-row">
                    <Field 
                        className="VerseForm-row" 
                        as="select" 
                        name="listBooks">
                            { books.map(book => { return ( <option key={book}> {book} </option> ) } ) }
                    </Field>
                    <Field 
                        className="VerseForm-row" 
                        id="chaperForm" 
                        name="chapter" 
                        type="number" 
                        min="1" max="150" 
                        placeholder="Глава"/>
                    <Field 
                        className="VerseForm-row"
                        id="verseForm" 
                        name="verse" 
                        type="number" 
                        min="1" 
                        placeholder="Стих" required />
                    <Field 
                        className="VerseForm-row"
                        id="textForm" 
                        name="text" 
                        placeholder="Текст" required />
                </div>
                <div className="VerseForm-row VerseForm-SubmitSection">
                    <Button type="submit" variant="contained" color="primary">
                        Добавить
                    </Button>
                </div>
            </Form>
        </Formik>
        );
}