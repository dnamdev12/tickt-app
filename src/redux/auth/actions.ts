import NetworkOps, { FetchResponse } from '../../network/NetworkOps';
import Urls from '../../network/Urls';

export const postSignup = async(data: any) => {
    const response: FetchResponse = await NetworkOps.postToJson(Urls.signup, data);
    console.log('res', response);
    if(response.status === 200) {
      return {success: true};
    }
    return {success: false, message: response.message};
};

export const checkEmailId = async(email: string) => {
  const response: FetchResponse = await NetworkOps.get(Urls.checkEmailId + `?email=${email}`);
  console.log('res', response);
  if(response.status === 200 || response.status_code === 200) {
    return {success: true, message: response.message};
  }
  return {success: false, message: response.message};
};

export const checkMobileNumber = async(mobile: string | number) => {
  const response: FetchResponse = await NetworkOps.get(Urls.checkMobileNumber + `?mobileNumber=${mobile}`);
  console.log('res', response);
  if(response.status === 200 || response.status_code === 200) {
    return {success: true, message: response.message};
  }
  return {success: false, message: response.message};
};

export const verifyOtp = async(otp: string | number) => {
  const response: FetchResponse = await NetworkOps.postToJson(Urls.verifyOTP, otp);
  console.log('res', response);
  if(response.status === 200 || response.status_code === 200) {
    return {success: true, message: response.message};
  }
  return {success: false, message: response.message};
};