import { combineReducers } from 'redux';
import { ADD_VERSE, CORRECT, INCORRECT, RANDOM_VERSE } from './types';

// const verses = this.props.stateApp.map(verseData => {
//    return new Verse(verseData[0], verseData[1]) ;
//  });

function stateVerse(state = [], action) {
   switch(action.type) {
      default: return state;
   };
};

function Static(state = {}, action) {
   switch(action.type) {
      case CORRECT:
         return {...state, [action.payload]: itemStatic(state[action.payload], action)};
      case INCORRECT:
         return {...state, [action.payload]: itemStatic(state[action.payload], action)};
      default: return state;
      };
};
   
function itemStatic(state = [0,0], action) {
   switch(action.type) {
      case CORRECT:
         state[0] = state[0] + 1;
         return state;
      case INCORRECT:
         state[1] = state[1] + 1;
      default: return state;
      };
};

function getRandomElement(arr) {
   let randIndex = Math.floor(Math.random() * arr.length);
   return arr[randIndex];
};

function randomVerse(state = {}, action) {
   switch(action.type) {
      case RANDOM_VERSE:
         return getRandomElement();
      default: return state;
   };
};

function addVerse(state = {}, action) {
   switch(action.type) {
      case ADD_VERSE:
         return {...state, addVerse: action.payload};
      default: return state;
   };
};

export const rootReducer = combineReducers({
   static: Static,
   randomVerse,
   stateVerse,
   addVerse
});