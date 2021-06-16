import NetworkOps, { FetchResponse } from '../../network/NetworkOps';
import Urls from '../../network/Urls';
import * as actionTypes from './constants';
import { setShowToast, setLoading } from '../common/actions';


export const callTradieProfileData = () => ({ type: actionTypes.GET_TRADIE_PROFILE_DATA });

export const getTradieProfileView = () => ({ type: actionTypes.GET_TRADIE_PROFILE_VIEW });

export const getTradieBasicDetails = () => ({ type: actionTypes.GET_TRADIE_BASIC_DETAILS });

export const tradieUpdateProfileDetails = async (data: any) => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.putToJson(Urls.tradieUpdateProfileDetails, data);
  setLoading(false);
  if (response.status_code === 200) {
    setShowToast(true, response.message);
    return { success: true };
  }
  return { success: false };
}

export const tradieUpdateBasicDetails = async (data: any) => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.putToJson(Urls.tradieEditBasicDetails, data);
  setLoading(false);
  if (response.status_code === 200) {
    setShowToast(true, response.message);
    return { success: true };
  }
  setShowToast(true, response.message);
  return { success: false };
}

export const tradieAddPortfolioJob = async (data: any) => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.postToJson(Urls.tradieAddPortfolioJob, data);
  setLoading(false);
  if (response.status_code === 200) {
    setShowToast(true, response.message);
    return { success: true, data: response.result };
  }
  setShowToast(true, response.message);
  return { success: false };
}

export const tradieUpdatePortfolioJob = async (data: any) => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.putToJson(Urls.tradieUpdatePortfolioJob, data);
  setLoading(false);
  if (response.status_code === 200) {
    setShowToast(true, response.message);
    return { success: true };
  }
  setShowToast(true, response.message);
  return { success: false };
}

export const tradieChangeEmail = async (data: any) => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.putToJson(Urls.tradieChangeEmail, data);
  setLoading(false);
  if (response.status_code === 200) {
    return { success: true };
  }
  return { success: false };
}

export const tradieDeletePortfolioJob = async (portfolioId: any) => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.delete(Urls.tradieDeletePortfolioJob +  `?portfolioId=${portfolioId}`);
  setLoading(false);
  if (response.status_code === 200) {
    setShowToast(true, response.message);
    return { success: true };
  }
  setShowToast(true, response.message);
  return { success: false };
}

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

export const getTradieProfile = (data: any) => ({ type: actionTypes.GET_TRADIE_PROFILE, data });
export const getProfileBuilder = () => ({ type: actionTypes.GET_PROFILE_BUILDER });

export const tradieUpdatePassword = async (data: any) => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.putToJson(Urls.tradieChangePassword, data);
  setLoading(false);
  if (response.status_code === 200) {
    setShowToast(true, response.message);
    return { success: true };
  }
  setShowToast(true, response.message);
  return { success: false };
}