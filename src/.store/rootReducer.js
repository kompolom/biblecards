import { initState } from './initState';
import { CORRECT, RAND_VERSE } from './types';

// const verses = this.props.stateApp.map(verseData => {
//    return new Verse(verseData[0], verseData[1]) ;
//  });

function getRandomElement(arr) {
   let randIndex = Math.floor(Math.random() * arr.length);
   return arr[randIndex];
 }

export function rootReducer(state = initState, action) {
   switch(action.type) {
      case RAND_VERSE:
         return {...state, randomVerse: getRandomElement(state.stateVerse)}
      default: return state
   }
}