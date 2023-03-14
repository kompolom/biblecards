export type Side = 'front' | 'back';

export function reduceFlashCard(
  state: Side = 'front',
  action: { type: string },
) {
  switch (action.type) {
    case 'flip':
      return state === 'front' ? 'back' : 'front';
    default:
      return state;
  }
}

export function flip(dispatch: (action: { type: string }) => void) {
  dispatch({ type: 'flip' });
}
