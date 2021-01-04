import { initState } from './initState';
import { Verse } from '../models/Verse';

const verses = initState.map(verseData => {
  return new Verse(verseData[0], verseData[1]) ;
});
export function rootReducer(state = verses, action) {
   switch(action.type) {
      case 'TYPE':
         return state;
   
      default: return state
   }
}
