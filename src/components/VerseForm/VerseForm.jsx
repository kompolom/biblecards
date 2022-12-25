import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import { useFormik } from 'formik';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';

import './style.css';
import books from '../../data/books.json';
import { Verse } from "../../models/Verse";
import { addVerse, deleteVerse, saveVerse } from "../../Redux/actions";

const VerseFormTemplate = (props) => {
    let verseData = props.verse || {};
    const verse = useMemo( () => new Verse(verseData.id, verseData.source, verseData.text ), [verseData]);
    const formik = useFormik({
        initialValues: {
            id: verse.id,
            book: verse.book || books[0] ,
            chapter: verse.chapter,
            verse: verse.verse,
            text: verse.text,
        },
        onSubmit: (values) => {
            const verse = Verse.create(values);
            props.verse ? props.saveVerse(verse) : props.addVerse(verse);
            props.verse ? verseData={} : formik.resetForm();
        },
    });
    return (
        <form className="container" onSubmit={formik.handleSubmit} >
            <div className="VerseForm-body VerseForm-row">
                <Select
                    required
                    native
                    className="VerseForm-row" 
                    name="book"
                    defaultValue={formik.values.book}
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
                    {props.verse ? "Сохранить" : "Добавить"}
                </Button>
            </div>
        </form>
    );
};

const mapDispatchToProps = dispatch => ({
    addVerse: (verse) => {
        dispatch(addVerse(verse));
    },
    saveVerse: (verse) => {
        dispatch(saveVerse(verse));
    },
    deleteVerse: (id) => {
        dispatch(deleteVerse(id))
    },
});

const mapStateToProps = state => ({
    verses: state.verses,
    alert: state.alert,
    editVerse: state.editVerse,
});

export const VerseForm = connect(mapStateToProps, mapDispatchToProps)(VerseFormTemplate)