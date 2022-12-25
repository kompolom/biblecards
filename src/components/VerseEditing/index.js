import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './style.css';
import { EditOutlined, DeleteOutlined } from '@mui/icons-material';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
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
             <EditOutlined />
         </Link>
         <Button className="Delete" aria-label="Удалить" onClick={handleClickOpen}>
             <DeleteOutlined />
         </Button>
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