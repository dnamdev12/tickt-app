import * as actionTypes from './constants';

const initialState = {
  tradieProfileData: '',
  bankDetails: {},
  error: '',
};

const reducer = (state = initialState, action: any) => {
  // console.log(action)
  switch (action.type) {
    case actionTypes.SET_TRADIE_PROFILE_DATA:
      return {
        ...state,
        tradieProfileData: action.payload,
      };

    case actionTypes.GET_BANK_DETAILS_END:
    case actionTypes.UPDATE_BANK_DETAILS_END:
    case actionTypes.ADD_BANK_DETAILS_END:
      return {
        ...state,
        bankDetails: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
