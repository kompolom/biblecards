import {
   ADD_VERSE,
   CORRECT,
   DELETE_VERSE,
   INCORRECT,
   SAVE_VERSE,
   VERSE_VIEW
} from "./types";
import { alertManagerSlice } from 'widgets/AlertManager';

/**
 * Правильный ответ на стих
 * @param {number} id id стиха
 */
export function correct(id, db) {
   return async (dispatch, getState) => {
      const currentStats = getState().stats[id];
      currentStats?
          await db.updateVerseStat(id, currentStats[0]++, currentStats[1]++, currentStats[2]):
          await db.updateVerseStat(id, 1, 1, 0)
      dispatch({
         type: CORRECT,
         payload: id
      })
   }
};

export function incorrect(id, db) {
   return async (dispatch, getState) => {
      const currentStats = getState().stats[id];
      currentStats?
          await db.updateVerseStat(id, currentStats[0]++, currentStats[1], currentStats[2]++):
          await db.updateVerseStat(id, 1, 0, 1)
      dispatch({
         type: INCORRECT,
         payload: id
      })
   }
};

export function viewedVerse(id) {
   return {
      type: VERSE_VIEW,
      payload: id
   }
}

export function addVerse(verseData, db) {
   return async dispatch => {
      try {
         const verse = await db.createVerse(verseData)
         dispatch(pushVerse(verse));
         dispatch(showAlert('Стих сохранен', 5, { status: 'success' }))
      } catch (e) {
         console.log(e);
         dispatch(showAlert('Не удалось сохранить стих', 5, { status: 'error' }))
      }
   }
}

/**
 * Сохраняет существующий стих
 * @param {Verse} verse
 */
export function saveVerse(verse, db) {
   return async dispatch => {
      try {
         await db.updateVerse(verse)
         dispatch({
            type: SAVE_VERSE,
            payload: verse,
         });
         dispatch(showAlert('Стих сохранен', 3, { status: 'success' }))
      } catch (e) {
         console.log(e);
         dispatch(showAlert('Не удалось сохранить стих', 3, { status: 'error' }))
      }
   }
}

export function pushVerse(payload) {
   return {
      type: ADD_VERSE,
      payload
   }
}

export function deleteVerse(id, db) {
    return async dispatch => {
        try {
           await db.deleteVerse(id)
           dispatch({
              type: DELETE_VERSE,
              payload: id
           })
           dispatch(showAlert('Стих удален', 3, { status: 'success' }))
        } catch (e) {
           console.error(e);
           dispatch(showAlert('Не удалось удалить стих', 3, { status: 'error' }));
        }
    }
}

/**
 * Добавляет уведомление
 * @param {String|React.ComponentType} text
 * @param [Object] props
 * @param [Number] props.timeout
 * @param [success|warning|error] props.status
 * @return {{payload: Object, type: string}}
 */
export function showAlert(text, seconds, props) {
   return alertManagerSlice.actions.showAlert({ text, timeout: seconds, status: 'success' });
};

export function hideAlert(id) {
   return alertManagerSlice.actions.hideAlert(id);
};
