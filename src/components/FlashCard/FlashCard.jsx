import React from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { Card, withToggle } from '../Card';
import { correct, incorrect } from '../../.store/actions';
const CardToggleable = withToggle(Card);

/**
 * Карточка с вариантами ответов
 * @param {Object} props 
 * @param {Object} props.verse
 */
export const FlashCard = connect(null, (dispatch) => ({
    onCorrect: (id) => dispatch(correct(id)),
    onIncorrect: (id) => dispatch(incorrect(id))
}))(({ verse, onCorrect, onIncorrect, nextTrigger }) => {
    return (
        <>
        <div className='container'>
            <CardToggleable view="single" verse={verse} key={verse.id} />
        </div>
        <div className='container container_align_justify'>
            <Button 
                variant="outlined"
                onClick={ () => { nextTrigger(); onIncorrect(verse.id) } } > 
                Неправильно 
            </Button>
            <Button 
                variant="outlined" 
                onClick={ () => { nextTrigger(); onCorrect(verse.id) }} > 
                Правильно 
            </Button>
        </div>
        </>
    );
});