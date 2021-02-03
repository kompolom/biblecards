import React from 'react';
import './style.css'

export const VerseStatistics = (props) => {
   return (
      <div className="VerseStatistics"> 
         <span className="span" role="img" aria-label="view" > Стих показан {props.view} раз(а) </span>
         <span className="span" role="img" aria-label="corrects" > Ответили правильно {props.correct} раз(а) </span>
         <span className="span" role="img" aria-label="incorrects" > Ответили неправильно {props.incorrect} раз(а) </span>
      </div>
   );
};