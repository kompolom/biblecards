import { combineReducers } from 'redux';
import { ADD_VERSE, CORRECT, INCORRECT, RANDOM_VERSE } from './types';

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
         return {...state, [action.payload]: itemStaticReducer(state[action.payload], action)};
      case INCORRECT:
         return {...state, [action.payload]: itemStaticReducer(state[action.payload], action)};
      default: return state;
      };
};
   
function itemStaticReducer(state = [0,0], action) {
   switch(action.type) {
      case CORRECT:
         state[0] = state[0] + 1;
         return state;
      case INCORRECT:
         state[1] = state[1] + 1;
      default: return state;
      };
};

export const rootReducer = combineReducers({
   stats: statsReducer,
   verses: versesReducer
});