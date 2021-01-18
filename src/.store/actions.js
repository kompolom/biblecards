import { ADD_VERSE, CORRECT, INCORRECT, VERSE_VIEW } from "./types";

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

export function viewedVerse(id) {
   return {
      type: VERSE_VIEW,
      payload: id
   }
}

export function addVerse(verse) {
   return {
      type: ADD_VERSE,
      payload: verse
   };
};
