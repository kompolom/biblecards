import { CORRECT, INCORRECT, RAND_VERSE } from "./types";

export function correct() {
   return {
      type: CORRECT
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