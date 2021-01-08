import { initState } from './initState';
import { CORRECT } from './types';

// const verses = this.props.stateApp.map(verseData => {
//    return new Verse(verseData[0], verseData[1]) ;
//  });

export function rootReducer(state = initState, action) {
   switch(action.type) {
      case CORRECT:
         return 
   
      default: return state
   }
}
