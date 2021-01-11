import { CORRECT, INCORRECT, RAND_VERSE } from "./types";

export function correct(id) {
   return {
      type: CORRECT,
      payload: id
   }
}

export function incorrect() {
   return {
      type: INCORRECT
   }
}

export function randVerse() {
   return {
      type: RAND_VERSE
   }
}