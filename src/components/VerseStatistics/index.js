import React from 'react';
import { Typography } from '@mui/material';

export const VerseStatistics = (props) => {
   return (
      <div className="VerseStatistics"> 
         <Typography variant="body2"> Стих показан {props.view} раз(а) </Typography>
         <Typography variant="body2"> Ответили правильно {props.correct} раз(а) </Typography>
         <Typography variant="body2"> Ответили неправильно {props.incorrect} раз(а) </Typography>
      </div>
   );
};