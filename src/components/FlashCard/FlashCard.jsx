import React from 'react';
import { connect } from 'react-redux';
import { Button } from '@mui/material';
import { VerseCard, withToggle } from '../VerseCard';
import { correct, incorrect, viewedVerse } from '../../Redux/actions';
const CardToggleable = withToggle(VerseCard);

/**
 * Карточка с вариантами ответов
 * @param {Object} props 
 * @param {Object} props.verse
 */
export const FlashCard = connect(null, (dispatch) => ({
    view: (id) => dispatch(viewedVerse(id)),
    onCorrect: (id) => dispatch(correct(id)),
    onIncorrect: (id) => dispatch(incorrect(id))
}))(({ verse, onCorrect, onIncorrect, nextTrigger, mode = 'text' }) => {
    return (
        <>
        <div className='container'>
            <CardToggleable view="single" show={mode} verse={verse} key={verse.id} />
        </div>
        <div className='container container_align_justify'>
            <Button 
                variant="outlined"
                onClick={ () => { onIncorrect(verse.id); nextTrigger() } } > 
                Неправильно 
            </Button>
            <Button 
                variant="outlined" 
                onClick={ () => { onCorrect(verse.id); nextTrigger() }} > 
                Правильно 
            </Button>
        </div>
        </>
    );
});