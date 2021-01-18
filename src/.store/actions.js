import { ADD_VERSE, CORRECT, INCORRECT, RANDOM_VERSE } from "./types";

export function correct(id) {
   return {
      type: CORRECT,
      payload: id
   };
};

export function incorrect(id) {
   return {
      type: INCORRECT,
      payload: id
   };
};

export function randomVerse() {
   return {
      type: RANDOM_VERSE,
   };
};

// export function addVerse(value) {
//    return {
//       type: ADD_VERSE,
//       payload: value
//    };
// };
