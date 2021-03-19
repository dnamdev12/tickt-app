import * as actionTypes from './constants';

const initialState = {
    isLoading: false
}

const reducer = (state = initialState, action: any) => {
    switch (action.type) { 
        case actionTypes.SET_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }
        default: return state
    }
}

export default reducer