import { combineReducers } from 'redux';
import { ADD_VERSE, CORRECT, HIDE_ALERT, INCORRECT, SHOW_ALERT } from './types';

function versesReducer(state = [], action) {
   switch(action.type) {
      case ADD_VERSE:
         return state.concat([{
            ...action.payload,
            id: Date.now(),
         }]);
      default: return state;
   };
};

function statsReducer(state = {}, action) {
   switch(action.type) {
      case CORRECT:
      case INCORRECT:
         return {...state, [action.payload]: itemStaticReducer(state[action.payload], action)};
      default: return state;
      };
};
   
/**
 * [view, corrects, incorrects] 
 */
function itemStaticReducer(state = [0,0,0], action) {
   switch(action.type) {
      case CORRECT:
         state[0] = state[0] + 1;
         state[1] = state[1] + 1;
         return state;
      case INCORRECT:
         state[0] = state[0] + 1;
         state[2] = state[2] + 1;
         return state;
      default:return state;
   };
};


function alertReducer (state = null, action) {
   switch (action.type) {
     case SHOW_ALERT:
       return state = action.payload
     case HIDE_ALERT:
       return state = null
     default: return state;
   };
 }
;
export const rootReducer = combineReducers({
   stats: statsReducer,
   verses: versesReducer,
   alert: alertReducer
});