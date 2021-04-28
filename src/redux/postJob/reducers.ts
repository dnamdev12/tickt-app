import * as actionTypes from './constants'

const initialState = {
    editMilestoneId: null
}

const reducer = (state = initialState, action: any) => {
    console.log(action)
    switch (action.type) {

        case actionTypes.EDIT_MILESTONE_ID:
            state.editMilestoneId = action.payload;
            return { ...state }

        default: return state
    }
}

export default reducer