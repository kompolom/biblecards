import React from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { useFormik } from 'formik';
import './style.css';
import books from '../../data/books.json';
import { Verse } from "../../models/Verse";
import { addVerse, showAlert } from "../../Redux/actions";
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import { Alert } from '../Alert';

const VerseFormTemplate = (props) => {

    let verseToEdit;
    props.idToEditVerse ? verseToEdit = props.verses.find(verse => verse.id === props.idToEditVerse) : verseToEdit = { source: '', text: ''};
    const verseSourse = verseToEdit.source.split(' ');
    let verseTemplate = {
            listBooks: '',
            chapter: '',
            verse: '',
            text: verseToEdit.text || '',
        };
    if (verseSourse.length === 1) {
        verseTemplate.listBooks='';
    } else if (verseSourse.length === 2) {
        verseTemplate.listBooks=verseSourse[0];
        const e = verseSourse[1].split(':');
        verseTemplate.chapter = e[0];
        verseTemplate.verse = e[1];
    } else {
        verseTemplate.listBooks=(verseSourse[0]+' '+verseSourse[1]);
        const e = verseSourse[2].split(':');
        verseTemplate.chapter = e[0];
        verseTemplate.verse = e[1];
    };

    console.log(verseSourse);
    console.log(verseToEdit);

    const formik = useFormik({
        initialValues: {
            listBooks: verseTemplate.listBooks || books[0] ,
            chapter: verseTemplate.chapter || '',
            verse: verseTemplate.verse || '',
            text: verseTemplate.text || '',
        },
        onSubmit: (values) => {
            const source = `${values.listBooks} ${values.chapter}:${values.verse}`;
            const verse = new Verse(source, values.text);
            props.addTodo(verse);
            formik.resetForm()
            props.showAlert('Стих добавлен')
        },
    });
    console.log(formik.values);
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

            {props.alert && <Alert text={props.alert} />}

        </form>
    );
};

const mapDispatchToProps = dispatch => ({
    addTodo: (verse) => {
        dispatch(addVerse(verse)); // FIXME: dispatch
    },
    showAlert: (text) => {
        dispatch(showAlert(text))
    }
});

const mapStateToProps = state => ({
    verses: state.verses,
    alert: state.alert,
    idToEditVerse: state.idToEditVerse,
})

export const VerseForm = connect(mapStateToProps, mapDispatchToProps)(VerseFormTemplate)