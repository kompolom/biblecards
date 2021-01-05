import { CORRECT, INCORRECT } from "./types";

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