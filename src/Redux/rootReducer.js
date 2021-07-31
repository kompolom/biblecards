import { combineReducers } from 'redux';
import {
   ADD_VERSE,
   DELETE_VERSE,
   CORRECT,
   INCORRECT,
   SAVE_VERSE, ADD_VERSE_BATCH
} from './types';
import { alertsReducer } from './reducers/alerts';

function versesReducer(state = [], action) {
   switch(action.type) {
      case ADD_VERSE_BATCH:
         return state.concat(action.payload);
      case ADD_VERSE:
         return state.concat([{...action.payload }]);
      case SAVE_VERSE:
         return state.map( (verse) => {
            if (verse.id === action.payload.id) {
               return action.payload
            } else {
               return verse;
            }
         });
      case DELETE_VERSE:
         return state.filter( (value)=> value.id !== action.payload)
      default: return state;
   }
}

function statsReducer(state = {}, action) {
   switch(action.type) {
      case CORRECT:
      case INCORRECT:
         return {...state, [action.payload]: itemStatsReducer(state[action.payload], action)};
      case DELETE_VERSE:
         delete state[action.payload];
         return {...state};
      default: return state;
      };
};

/** state =  [view, corrects, incorrects] */
function itemStatsReducer(state = [0,0,0], action) {
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

export const rootReducer = combineReducers({
   stats: statsReducer,
   verses: versesReducer,
   alerts: alertsReducer
});