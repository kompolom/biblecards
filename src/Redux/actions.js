import {
   ADD_VERSE,
   ADD_VERSE_BATCH,
   CORRECT,
   DELETE_VERSE,
   INCORRECT,
   SAVE_VERSE,
   VERSE_VIEW
} from "./types";
import { actionNames } from "./reducers/alerts";
import { v4 } from 'uuid';
import { getDb } from "../getDb";

/**
 * Правильный ответ на стих
 * @param {number} id id стиха
 */
export function correct(id) {
   return async (dispatch, getState) => {
      const currentStats = getState().stats[id];
      const db = await getDb();
      currentStats?
          await db.updateVerseStat(id, currentStats[0]++, currentStats[1]++, currentStats[2]):
          await db.updateVerseStat(id, 1, 1, 0)
      dispatch({
         type: CORRECT,
         payload: id
      })
   }
};

export function incorrect(id) {
   return async (dispatch, getState) => {
      const currentStats = getState().stats[id];
      const db = await getDb();
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

/**
 * Добавляет пачку стихов в store
 * @param {Verse[]} batch
 */
export function loadVerses(batch) {
    return {
       type: ADD_VERSE_BATCH,
       payload: batch
    }
}

export function addVerse(verseData) {
   return async dispatch => {
      const db = await getDb();
      try {
         const verse = await db.createVerse(verseData)
         dispatch(pushVerse(verse));
         dispatch(showAlert('Стих сохранен', { status: 'success' }))
      } catch (e) {
         console.log(e);
         dispatch(showAlert('Не удалось сохранить стих', { status: 'error' }))
      }
   }
}

/**
 * Сохраняет существующий стих
 * @param {Verse} verse
 */
export function saveVerse(verse) {
   return async dispatch => {
      const db = await getDb();
      try {
         await db.updateVerse(verse)
         dispatch({
            type: SAVE_VERSE,
            payload: verse,
         });
         dispatch(showAlert('Стих сохранен', { status: 'success' }))
      } catch (e) {
         console.log(e);
         dispatch(showAlert('Не удалось сохранить стих', { status: 'error' }))
      }
   }
}

export function pushVerse(payload) {
   return {
      type: ADD_VERSE,
      payload
   }
}

export function deleteVerse(id) {
    return async dispatch => {
        const db = await getDb();
        try {
           await db.deleteVerse(id)
           dispatch({
              type: DELETE_VERSE,
              payload: id
           })
           dispatch(showAlert('Стих удален', { status: 'success' }))
        } catch (e) {
           console.error(e);
           dispatch(showAlert('Не удалось удалить стих', { status: 'error' }));
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
