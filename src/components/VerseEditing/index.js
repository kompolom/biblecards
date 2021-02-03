import { connect } from 'react-redux';
import React from 'react';
import { deleteVerse } from '../../Redux/actions';
import './style.css';
import IconEdit from '../../img/edit.png';
import IconDelete from '../../img/delete.png';

const EventEditing = (props) => {
   const deleteVerse = () => { props.deleteVerse(props.id) }
   const editVerse = () => ( console.log( "Я всё исправлю!" ))
   return (
      <div className="VerseEditing"> 
         <div className="Edit" onClick={editVerse}> 
            <img src={IconEdit} width="35px" height="35px" alt="Изменить" /> 
         </div>
         <div className="Delete" onClick={deleteVerse}> 
            <img src={IconDelete} width="35px" height="35px" alt="Удалить" />
         </div>
         
      </div>
   );
};

const mapDispatchToProps = dispatch => ({
   deleteVerse: (id) => {
      dispatch(deleteVerse(id))
   }
});

export const VerseEditing = connect(null, mapDispatchToProps)(EventEditing);