import { connect } from 'react-redux';
import React from 'react';
import { deleteVerse } from '../../Redux/actions';
import './style.css';
import IconEdit from '../../img/edit.png';
import IconDelete from '../../img/delete.png';
import { Link } from 'react-router-dom';

const EventEditing = (props) => {
   const deleteVerse = () => { props.deleteVerse(props.id) }
   return (
      <div className="VerseEditing"> 
         <Link to={`/edit/${props.id}`} className="Edit"> 
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
   }
});

export const VerseEditing = connect(null, mapDispatchToProps)(EventEditing);