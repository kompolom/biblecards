import React from 'react';
import './style.css'

export const VerseStatistics = (props) => {
   return (
      <div className="VerseStatistics"> 
         <span role="img" aria-label="view" > &#128065; : {props.view} </span>
         <span role="img" aria-label="corrects" > &#10004; : {props.correct} </span>
         <span role="img" aria-label="incorrects" > &#10008; : {props.incorrect} </span>
      </div>
   );
};