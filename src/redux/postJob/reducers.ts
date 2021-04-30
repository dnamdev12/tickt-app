import * as actionTypes from './constants'

const initialState = {
    editMilestoneId: null,
    editMilestoneTiming: null,
    editDetailPage: null
}

const reducer = (state = initialState, action: any) => {
    console.log(action)
    switch (action.type) {

        case actionTypes.EDIT_MILESTONE_ID:
            state.editMilestoneId = action.payload;
            return { ...state }

        case actionTypes.EDIT_MILESTONE_TIMINGS:
            state.editMilestoneTiming = action.payload;
            return { ...state }

        case actionTypes.EDIT_DETAIL_SCREEN:
            state.editDetailPage = action.payload;
            return { ...state }

        default: return state
    }
}

export default reducer