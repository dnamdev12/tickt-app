import * as actionTypes from './constants';

const initialState = {
    isLoading: false,
    showToast: false,
    toastType: undefined,
    toastMessage: undefined,
}

const reducer = (state = initialState, action: any) => {
    switch (action.type) { 
        case actionTypes.SET_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }
        case actionTypes.SHOW_HIDE_TOAST:
            return {
                ...state,
                showToast: action.showToast,
                toastType: action.toastType,
                toastMessage: action.toastMessage,
            }
        default: return state
    }
}

export default reducer