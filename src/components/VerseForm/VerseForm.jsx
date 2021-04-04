import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { useFormik } from 'formik';
import './style.css';
import books from '../../data/books.json';
import { Verse } from "../../models/Verse";
import { addVerse, deleteVerse, saveVerse, showAlert } from "../../Redux/actions";
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import { Alert } from '../Alert';

const VerseFormTemplate = (props) => {
    const verseData = props.verse || {};
    const verse = useMemo(() => new Verse(verseData.id, verseData.source, verseData.text ), [props.verse]);
    const formik = useFormik({
        initialValues: {
            listBooks: verse.book || books[0] ,
            chapter: verse.chapter,
            verse: verse.verse,
            text: verse.text,
        },
        onSubmit: (values) => {
            const source = `${values.listBooks} ${values.chapter}${values.chapter? ":": ''}${values.verse}`;
            const verse = new Verse(props.verse.id, source, values.text);
            props.verse.id ? props.saveVerse(verse) : props.addVerse(verse);
            formik.resetForm()
            props.showAlert('Стих добавлен')
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
                    {props.verse ? "Сохранить" : "Добавить"}
                </Button>
            </div>

            {props.alert && <Alert text={props.alert} />}

        </form>
    );
};

const mapDispatchToProps = dispatch => ({
    addVerse: (verse) => {
        dispatch(addVerse(verse)); // FIXME: dispatch
    },
    saveVerse: (verse) => {
        dispatch(saveVerse(verse));
    },
    showAlert: (text) => {
        dispatch(showAlert(text))
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