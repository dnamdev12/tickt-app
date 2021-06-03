import * as actionTypes from './constants';

const initialState = {
  tradieProfileData: '',
  bankDetails: {},
  error: '',
  tradieInfo: [],
  builderProfile:{}
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

    case actionTypes.REMOVE_BANK_DETAILS_END:
      if (action.payload.success) {
        return {
          ...state,
          bankDetails: {
            userId: undefined,
            account_name: '',
            account_number: '',
            bsb_number: '',
          },
        }
      } else {
        return state;
      }

    case actionTypes.SET_TRADIE_PROFILE:
      return {
        ...state,
        tradieInfo: action.payload,
      };

    case actionTypes.SET_PROFILE_BUILDER:
      return {
        ...state,
        builderProfile: action.payload
      }


    default:
      return state;
  }
};

export default reducer;
