import NetworkOps, { FetchResponse } from '../../network/NetworkOps';
import Urls from '../../network/Urls';
import * as actionTypes from './constants';
import { setShowToast, setLoading } from './../common/actions';
import storageService from '../../utils/storageService';

export const callTradeList = () => ({ type: actionTypes.CALL_TRADE_LIST })

export const postSignup = async (data: any) => {
  console.log(data);
  setLoading(true);
  const response: FetchResponse = await NetworkOps.postToJson(Urls.signup, data);
  setLoading(false);
  if (response.status_code === 200) {
    return { success: true };
  }
  setShowToast(true, response.message);
  return { success: false };
};

export const checkEmailId = async (email: string) => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.get(Urls.checkEmailId + `?email=${email}`);
  setLoading(false);
  if (response.status_code === 200 && !response.result.isProfileCompleted) {
    return { success: true};
  }
  setShowToast(true, response.message);
  return { success: false };
};

export const checkMobileNumber = async (mobile: string | number) => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.get(Urls.checkMobileNumber + `?mobileNumber=${mobile}`);
  setLoading(false);
  if (response.status_code === 200) {
    return { success: true };
  }
  setShowToast(true, response.message);
  return { success: false };
};

export const verifyOtp = async (data: object) => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.postToJson(Urls.verifyOTP, data);
  setLoading(false);
  if (response.status_code === 200) {
    return { success: true, message: response.message };
  }
  setShowToast(true, response.message);
  return { success: false }
};

export const createPassword = async (passwordInfo: object) => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.putToJson(Urls.createPassword, passwordInfo);
  setLoading(false);
  if (response.status_code === 200) {
    return { success: true, message: response.message };
  }
  setShowToast(true, response.message);
  return { success: false, message: response.message };
};


export const callLogin = async (data: any) => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.postToJson(Urls.login, data);
  setLoading(false);
  if (response.status_code === 200) {
    storageService.setItem("jwtToken", response.result.token);
    return { success: true };
  }
  setShowToast(true, response.message);
  return { success: false };
};

export const callForgotPassword = async (data: any) => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.putToJson(Urls.forgotPassword, data);
  setLoading(false);
  if (response.status_code === 200) {
    return { success: true };
  }
  setShowToast(true, response.message);
  return { success: false };
};

export const checkSocialId = async (socialID: string) => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.get(Urls.checkSocialId + `?socialId=${socialID}`);
  setLoading(false);
  if (response.status_code === 200) {
    return { success: true, isProfileCompleted: response.result.isProfileCompleted };
  }
  setShowToast(true, response.message);
  return { success: false };
};

export const gmailSignupLogin = async (data: any) => {
  console.log(data);
  setLoading(true);
  const response: FetchResponse = await NetworkOps.postToJson(Urls.SocialAuth, data);
  setLoading(false);
  if (response.status_code === 200) {
    storageService.setItem("jwtToken", response.result.token);
    return { success: true, successToken: response.result.token };
  }
  setShowToast(true, response.message);
  return { success: false };
};

export const callSocialLinkedin = async (data: string) => {
  setLoading(true);
  //const response: FetchResponse = await NetworkOps.get(data);
  const response: any = await fetch(data, {
    mode: 'no-cors',
  })
  console.log(response, 'okk')
  setLoading(false);
  if (response.status === 200) {
    //return { success: true, code: response.code };
    return response;
  }
  setShowToast(true, response.message);
  return { success: false };
};

export const onFileUpload = async (data: any) => {
  setLoading(true);
  const options = {
    headerOverrides: {
      'Content-Type': 'multipart/form-data'
    }
  }
  const response: FetchResponse = await NetworkOps.postRaw(Urls.upload, data, options);
  setLoading(false);
  if (response.status_code === 200) {
    return { success: true, imgUrl: response.result.url[0] };
  }
  setShowToast(true, response.message);
  return { success: false };
};


