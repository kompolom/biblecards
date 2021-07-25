export const actionNames = {
    ADD_ALERT: 'alerts/ADD',
    DEL_ALERT: 'alerts/DELETE'
};

export function alertsReducer(state = [], action) {
    switch (action.type) {
        case actionNames.ADD_ALERT:
            return [...state, {...action.payload}];
        case actionNames.DEL_ALERT:
            return state.filter(alertData => alertData.id !== action.id)
        default:
            return state;
    }
}
