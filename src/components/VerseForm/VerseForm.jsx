import React from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { Formik, Field, Form } from 'formik';
import './style.css';
import books from '../../data/books.json';
import { Verse } from "../../models/Verse";
import { addVerse } from "../../.store/actions";

const VerseForm1 = (props) => {
   
        return (
            <Formik
                initialValues={{
                    listBooks: 'Бытие',
                    chapter: '',
                    verse: '',
                    text: '',
                }}
                onSubmit={props.addTodo} >
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
                                autocomlete="new-password"
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
};

const mapDispatchToProps = dispatch => ({
    addTodo: (values) => {
        console.log(JSON.stringify(values, null, 2))
        const source = `${values.listBooks} ${values.chapter}:${values.verse}`;
        const verse = new Verse(source, values.text);
        dispatch(addVerse(verse)); // FIXME: dispatch
    }
})

export const VerseForm = connect(null, mapDispatchToProps)(VerseForm1)