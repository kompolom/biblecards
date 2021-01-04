import React from 'react';
import { initState } from './initState';

export function rootReducer(state = initState, action) {
   switch(action.type) {
      case 'TYPE':
         return state;
   
      default: return state
   }
}
