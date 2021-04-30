const ACTIVE_HOST = 'https://ticktdevapi.appskeeper.in';  // dev env
// const ACTIVE_HOST = 'https://ticktqaapi.appskeeper.in';  // qa env

const versions = {
    v1: 'v1/',
}

const ServiceEnum = {
    auth: 'auth/',
    admin: 'admin/',
    job: 'job/',
    profile:'profile/',
    builder:'builder/',
}

const Urls = {
    signup: `${versions.v1}${ServiceEnum.auth}signup`,
    login: `${versions.v1}${ServiceEnum.auth}login`,
    checkEmailId: `${versions.v1}${ServiceEnum.auth}checkEmailId`,
    checkMobileNumber: `${versions.v1}${ServiceEnum.auth}checkMobileNumber`,
    verifyOTP: `${versions.v1}${ServiceEnum.auth}verifyOTP`,
    createPassword: `${versions.v1}${ServiceEnum.auth}createPassword`,
    tradeList: `${versions.v1}${ServiceEnum.auth}tradeList`, //admin
    forgotPassword: `${versions.v1}${ServiceEnum.auth}forgot_password`,
    checkSocialId: `${versions.v1}${ServiceEnum.auth}checkSocialId`,
    SocialAuth: `${versions.v1}${ServiceEnum.auth}socialAuth`,
    upload: `${versions.v1}upload`,
    linkedInAuth: `${versions.v1}${ServiceEnum.auth}linkedInAuth`,
    jobCategories: `${versions.v1}${ServiceEnum.auth}jobType`,
    milestones: `${versions.v1}${ServiceEnum.job}tempMilestoneList`,
    getSearchData: `${versions.v1}${ServiceEnum.admin}getSearchData`, //admin
    jobTypeList: `${versions.v1}${ServiceEnum.auth}jobTypeList`, //admin
    jobType: `${versions.v1}${ServiceEnum.auth}jobType`, //admin
    home: `${versions.v1}home`,
    homeSearch: `${versions.v1}home/search`, 
    profileTemplateList:`${versions.v1}${ServiceEnum.profile}${ServiceEnum.builder}templatesList`,
    createTemplate:`${versions.v1}${ServiceEnum.job}createTemplate`,
    createJob:`${versions.v1}${ServiceEnum.job}create` // create job (post job)
}

export const urlFor = (service: String): string => {
    return `${ACTIVE_HOST}/${service}`;
};

export default Urls;