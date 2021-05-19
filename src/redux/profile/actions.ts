import * as actionTypes from './constants';

export const callTradieProfileData = () => ({ type: actionTypes.GET_TRADIE_PROFILE_DATA });

export const getBankDetails = () => ({
  type: actionTypes.GET_BANK_DETAILS_START,
});

export const addBankDetails = (data: any, milestoneData: any, callback: () => void) => ({
  type: actionTypes.ADD_BANK_DETAILS_START,
  data,
  milestoneData,
  callback,
});

export const updateBankDetails = (data: any, milestoneData: any, callback: () => void) => ({
  type: actionTypes.UPDATE_BANK_DETAILS_START,
  data,
  milestoneData,
  callback,
});
