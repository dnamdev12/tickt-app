import * as actionTypes from './constants'

const initialState = {
    searchJobListData: [],
    jobTypeListData: [],
    jobTypeList: [],
    jobDataWithJobTypeLatLong: {},
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
        case actionTypes.SET_JOB_TYPE_LIST:
            return {
                ...state,
                jobTypeListData: action.payload
            }
        case actionTypes.SET_JOB_TYPE:
            return {
                ...state,
                jobTypeData: action.payload
            }
        case actionTypes.SET_JOB_WITH_JOB_TYPE_AND_LATLONG:
            return {
                ...state,
                jobDataWithJobTypeLatLong: action.payload
            }
        default: return state
    }
}

export default reducer