import { ADD_VERSE, CLEAR_EDIT_VERSE, CORRECT, DELETE_VERSE, EDIT_VERSE, HIDE_ALERT, INCORRECT, SAVE_VERSE, SHOW_ALERT, VERSE_VIEW } from "./types";

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

export function showAlert(text) {
   return dispatch => {
      dispatch({
         type: SHOW_ALERT,
         payload: text
      });

      setTimeout(() => {
         dispatch(hideAlert());
      }, 3000);
   };
};

export function hideAlert() {
   return {
      type: HIDE_ALERT
   };
};

export function editVerse(obj) {
   return dispatch => {
      dispatch({
         type: EDIT_VERSE,
         payload: obj
      });

      setTimeout(() => {
         dispatch(clearEditVerse());
      }, 3000);
   };
};

export function clearEditVerse() {
   return {
      type: CLEAR_EDIT_VERSE,
   };
};