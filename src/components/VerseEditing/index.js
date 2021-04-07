import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './style.css';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import IconEdit from '../../img/edit.png';
import IconDelete from '../../img/delete.png';
import { deleteVerse } from '../../Redux/actions';

const EventEditing = (props) => {
   const [open, setOpen] = React.useState(false);

   const handleClickOpen = () => {
      setOpen(true);
   };
   const handleClose = () => {
      setOpen(false);
   };
   const deleteVerse = () => {
      props.deleteVerse(props.id) 
   };

   return (
      <div className="VerseEditing"> 
         <Link to={`/edit/${props.id}`} className="Edit"> 
            <img src={IconEdit} width="35px" height="35px" alt="Изменить" /> 
         </Link>
         <div className="Delete" onClick={handleClickOpen}> 
            <img src={IconDelete} width="35px" height="35px" alt="Удалить" />
         </div>
         <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
         >
         <DialogTitle id="alert-dialog-title">Вы хотите удалить этот стих?</DialogTitle>
         <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
               Нет
            </Button>
            <Button onClick={deleteVerse} color="primary">
               Да
            </Button>
         </DialogActions>
      </Dialog>
      </div>
   );
};

const mapDispatchToProps = dispatch => ({
   deleteVerse: (id) => {
      dispatch(deleteVerse(id))
   }
});

export const VerseEditing = connect(null, mapDispatchToProps)(EventEditing);