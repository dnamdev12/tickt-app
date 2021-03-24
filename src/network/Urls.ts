const ACTIVE_HOST = 'https://ticktdevapi.appskeeper.in';  // dev env
//const ACTIVE_HOST = 'https://ticktqaapi.appskeeper.in';  // qa env

const versions = {
    v1: 'v1/',
}

const ServiceEnum = {
    auth: 'auth/',
}

 const Urls = {
    signup: `${versions.v1}${ServiceEnum.auth}signup`,
    login: `${versions.v1}${ServiceEnum.auth}login`,
    checkEmailId: `${versions.v1}${ServiceEnum.auth}checkEmailId`,
    checkMobileNumber: `${versions.v1}${ServiceEnum.auth}checkMobileNumber`,
    verifyOTP: `${versions.v1}${ServiceEnum.auth}verifyOTP`,
    createPassword: `${versions.v1}${ServiceEnum.auth}createPassword`,
    tradeList: `${versions.v1}${ServiceEnum.auth}tradeList`,
    forgotPassword: `${versions.v1}${ServiceEnum.auth}forgot_password`,
    checkSocialId: `${versions.v1}${ServiceEnum.auth}checkSocialId`,
    SocialAuth: `${versions.v1}${ServiceEnum.auth}socialAuth`,
}

export const urlFor = (service: String): string => {
    return `${ACTIVE_HOST}/${service}`;
  };

export default Urls;