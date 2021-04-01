import { connect } from 'react-redux';
import React from 'react';
import { deleteVerse, editVerse } from '../../Redux/actions';
import './style.css';
import IconEdit from '../../img/edit.png';
import IconDelete from '../../img/delete.png';
import { Link } from 'react-router-dom';

const EventEditing = (props) => {
   const deleteVerse = () => { props.deleteVerse(props.id) }
   const editVerse = () => ( props.editVerse(props.id) )
   return (
      <div className="VerseEditing"> 
         <Link to="/add" className="Edit" onClick={editVerse}> 
            <img src={IconEdit} width="35px" height="35px" alt="Изменить" /> 
         </Link>
         <div className="Delete" onClick={deleteVerse}> 
            <img src={IconDelete} width="35px" height="35px" alt="Удалить" />
         </div>
         
      </div>
   );
};

const mapDispatchToProps = dispatch => ({
   deleteVerse: (id) => {
      dispatch(deleteVerse(id))
   },
   editVerse: (id) => {
      dispatch(editVerse(id))
   },
});

export const VerseEditing = connect(null, mapDispatchToProps)(EventEditing);