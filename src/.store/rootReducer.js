import { combineReducers } from 'redux';
import { initState } from './initState';
import { CORRECT, RAND_VERSE } from './types';

// const verses = this.props.stateApp.map(verseData => {
//    return new Verse(verseData[0], verseData[1]) ;
//  });

function staticReducer(state = {}, action) {
   switch(action.type) {
      case CORRECT:
         return {...state, [action.payload]: itemStatic(state[action.payload], action)}
      default: return state
      }
};
   
function itemStatic(state = [0,0], action) {
   switch(action.type) {
      case CORRECT:
         state[0]=state[0]+1
         return state
      default: return state
      }
};

function getRandomElement(arr) {
   let randIndex = Math.floor(Math.random() * arr.length);
   return arr[randIndex];
};

function randomVerse(state = {}, action) {
   switch(action.type) {
      case RAND_VERSE:
         return getRandomElement()
      default: return state
   }
};

function stateReducer(state = [], action) {
   switch(action.type) {
      default: return state
   }
};

export const rootReducer = combineReducers({
   static: staticReducer,
   randomVerse: randomVerse,
   stateVerse: stateReducer   
})