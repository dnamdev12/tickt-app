import NetworkOps, { FetchResponse } from '../../network/NetworkOps';
import Urls from '../../network/Urls';
import * as actionTypes from './constants';
import { setShowToast, setLoading } from './../common/actions';

export const postSignup = async(data: any) => {
    setLoading(true);
    const response: FetchResponse = await NetworkOps.postToJson(Urls.signup, data);
    setLoading(false);
    if(response.status_code === 200) {
      return {success: true};
    }
    setShowToast(true, response.message);
    return {success: false};
};

export const checkEmailId = async(email: string) => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.get(Urls.checkEmailId + `?email=${email}`);
  setLoading(false);
  if(response.status_code === 200) {
    return {success: true};
  }
  setShowToast(true, response.message);
  return {success: false};
};

export const checkMobileNumber = async(mobile: string | number) => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.get(Urls.checkMobileNumber + `?mobileNumber=${mobile}`);
  setLoading(false);
  if(response.status_code === 200) {
    return {success: true};
  }
  setShowToast(true, response.message);
  return {success: false};
};

export const verifyOtp = async(data: object) => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.postToJson(Urls.verifyOTP, data);
  setLoading(false);
  if(response.status_code === 200) {
    return {success: true, message: response.message};
  }
  setShowToast(true, response.message);
  return {success: false}
};

export const createPassword = async(passwordInfo: object) => {
  const response: FetchResponse = await NetworkOps.postToJson(Urls.createPassword, passwordInfo);
  console.log('res', response);
  if(response.status_code === 200) {
    return {success: true, message: response.message};
  }
  return {success: false, message: response.message};
};

export const callTradeList = () => ({type: actionTypes.CALL_TRADE_LIST})