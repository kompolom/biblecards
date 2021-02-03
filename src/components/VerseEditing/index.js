import { connect } from 'react-redux';
import React from 'react';
import { deleteVerse } from '../../Redux/actions';
import './style.css'

const EventEditing = (props) => {
   const click = () => { props.deleteVerse(props.id) }
   return (
      <div className="VerseEditing"> 
        <button className='Edit' type='button' >Редактировать</button> 
        <button className='Delete' type='button' onClick={click}>Удалить</button>
      </div>
   );
};

const mapDispatchToProps = dispatch => ({
   deleteVerse: (id) => {
      dispatch(deleteVerse(id))
   }
});

export const VerseEditing = connect(null, mapDispatchToProps)(EventEditing);