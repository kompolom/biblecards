import React from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { useFormik } from 'formik';
import './style.css';
import books from '../../data/books.json';
import { Verse } from "../../models/Verse";
import { addVerse } from "../../.store/actions";
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';

const VerseForm1 = (props) => {
        const formik = useFormik({
            initialValues: {
                listBooks: 'Бытие',
                chapter: '',
                verse: '',
                text: '',
            },
            onSubmit: (values) => {
                console.log(JSON.stringify(values, null, 2))
                const source = `${values.listBooks} ${values.chapter}:${values.verse}`;
                const verse = new Verse(source, values.text);
                props.addTodo(verse);
                formik.resetForm()
            }, 

        
        });
        return (
            <form className="container" onSubmit={formik.handleSubmit} >
                <div className="VerseForm-body VerseForm-row">
                    <Select
                        required
                        native
                        className="VerseForm-row" 
                        name="listBooks"
                        defaultValue={formik.values.listBooks}
                        onChange={formik.handleChange}
                    >
                        { books.map(book => { return ( <option key={book} value={book}> {book} </option> ) } ) }
                    </Select>
                    <TextField 
                        className="VerseForm-row" 
                        id="chaperForm" 
                        name="chapter" 
                        type="number" 
                        min="1" max="150" 
                        label="Глава"
                        value={formik.values.chapter}
                        onChange={formik.handleChange}
                    />
                    <TextField 
                        className="VerseForm-row"
                        id="verseForm" 
                        name="verse" 
                        type="number" 
                        min="1" 
                        label="Стих" 
                        required
                        value={formik.values.verse}
                        onChange={formik.handleChange}
                    />
                    <TextField
                        label="Текст стиха"
                        name="text" 
                        multiline 
                        required
                        rows={4}
                        value={formik.values.text}
                        onChange={formik.handleChange}
                    />
                </div>
                <div className="VerseForm-row VerseForm-SubmitSection">
                    <Button type="submit" variant="contained" color="primary" >
                        Добавить
                    </Button>
                </div>
            </form>
        );
};

const mapDispatchToProps = dispatch => ({
    addTodo: (verse) => {
        dispatch(addVerse(verse)); // FIXME: dispatch
    }
})

export const VerseForm = connect(null, mapDispatchToProps)(VerseForm1)