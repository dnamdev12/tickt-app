import * as actionTypes from './constants'

const initialState = {
    editMilestoneId: null,
    editMilestoneTiming: null,
    editDetailPage: null,
    builderHome: null,
    testBuilderHome: null,
    localChanges: false,
    activeJobList: [],
    appliedJobList: [],
    pastJobList: [],
    newJobList: [],
    approvedMilestoneList: [],
    milestoneList: [],
    milestonesCount: 0,
    newJobsCount: 0,
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

        case actionTypes.FETCH_HOME_BUILDER:
            state.builderHome = action.payload;
            return { ...state }

        case actionTypes.SET_FETCH_HOME_BUILDER:
            return {
                ...state,
                testBuilderHome: action.payload
            }

        case actionTypes.SET_LOCAL_CHANGES:
            return {
                ...state,
                localChanges: action.payload.data
            }

        case actionTypes.GET_ACTIVE_JOBS_END:
          return {
            ...state,
            activeJobList: action.payload?.active || [],
            milestonesCount: action.payload?.milestonesCount,
            newJobsCount: action.payload?.newJobsCount,
          };
    
        case actionTypes.GET_APPLIED_JOBS_END:
          return {
            ...state,
            appliedJobList: action.payload.applied,
            milestonesCount: action.payload.milestonesCount,
            newJobsCount: action.payload.newJobsCount,
          };
    
        case actionTypes.GET_PAST_JOBS_END:
          return {
            ...state,
            pastJobList: action.payload.completed,
            milestonesCount: action.payload.milestonesCount,
            newJobsCount: action.payload.newJobsCount,
          };
    
        case actionTypes.GET_NEW_JOBS_END:
          return {
            ...state,
            newJobList: action.payload,
          };
    
        case actionTypes.GET_APPROVED_MILESTONE_END:
          return {
            ...state,
            approvedMilestoneList: action.payload,
          };

        case actionTypes.GET_MILESTONES_END:
          return {
            ...state,
            milestoneList: action.payload,
          };

        default: return state;
    }
}

export default reducer