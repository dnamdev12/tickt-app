import * as actionTypes from './constants';

const initialState = {
    tradieProfileData: '',
    error: '',
}

const reducer = (state = initialState, action: any) => {
    // console.log(action)
    switch (action.type) {
        case actionTypes.SET_TRADIE_PROFILE_DATA:
            return {
                ...state,
                tradieProfileData: action.payload
            }
        default: return state
    }
}

export default reducer;