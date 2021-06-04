import * as actionTypes from './constants';

export const callTradieProfileData = () => ({ type: actionTypes.GET_TRADIE_PROFILE_DATA });

export const getTradieProfileView = () => ({ type: actionTypes.GET_TRADIE_PROFILE_VIEW });

export const getTradieBasicDetails = () => ({ type: actionTypes.GET_TRADIE_BASIC_DETAILS });

export const getBankDetails = () => ({
  type: actionTypes.GET_BANK_DETAILS_START,
});

export const addBankDetails = (data: any, milestoneData: any, callback: (jobCompletedCount: number) => void) => ({
  type: actionTypes.ADD_BANK_DETAILS_START,
  data,
  milestoneData,
  callback,
});

export const updateBankDetails = (data: any, milestoneData: any, callback: (jobCompletedCount: number) => void) => ({
  type: actionTypes.UPDATE_BANK_DETAILS_START,
  data,
  milestoneData,
  callback,
});

export const removeBankDetails = () => ({
  type: actionTypes.REMOVE_BANK_DETAILS_START,
});

export const getTradieProfile = (data: any) => ({ type: actionTypes.GET_TRADIE_PROFILE, data })
export const getProfileBuilder = () => ({type:actionTypes.GET_PROFILE_BUILDER})