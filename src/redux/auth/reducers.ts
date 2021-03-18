import * as actionTypes from './constants'

const initialState = {
    userData: [],
    error: ''
}

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.RECEIVE_API_DATA:
            return {
                ...state,
                userData: action.data
            }
        case actionTypes.FAILED_API_DATA:
            return {
                ...state,
                error: action.message
            }
        default: return state
    }
}

export default reducer