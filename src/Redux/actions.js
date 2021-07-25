import { ADD_VERSE, CORRECT, DELETE_VERSE, INCORRECT, SAVE_VERSE, VERSE_VIEW } from "./types";
import { actionNames } from "./reducers/alerts";
import { v4 } from 'uuid';

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

export function deleteVerse(id) {
   return {
      type: DELETE_VERSE,
      payload: id
   };
};

/**
 * Добавляет уведомление
 * @param {String|React.ComponentType} text
 * @param [Object] props
 * @param [Number] props.timeout
 * @param [success|warning|error] props.status
 * @return {{payload: Object, type: string}}
 */
export function showAlert(text, props) {
   return {
      type: actionNames.ADD_ALERT,
      payload: {
         children: text,
         id: v4(),
         timeout: 3000,
         ...props
      }
   };
};

export function hideAlert(id) {
   return {
      type: actionNames.DEL_ALERT,
      id
   };
};

export function saveVerse(verse) {
   return {
      type: SAVE_VERSE,
      payload: verse,
      };
};