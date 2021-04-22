import * as actionTypes from './constants'

const initialState = {
    searchJobListData: [],
    error: '',
}

const reducer = (state = initialState, action: any) => {
    console.log(action)
    switch (action.type) {
        case actionTypes.FETCH_FAILED:
            return {
                ...state,
                error: action.message
            }
        case actionTypes.SET_SEARCH_JOB_LIST:
            return {
                ...state,
                searchJobListData: action.payload
            }
        default: return state
    }
}

export default reducer