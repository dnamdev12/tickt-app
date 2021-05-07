// const ACTIVE_HOST = 'https://ticktdevapi.appskeeper.in';  // dev env
const ACTIVE_HOST = 'https://ticktqaapi.appskeeper.in';  // qa env

const versions = {
    v1: 'v1/',
}

const ServiceEnum = {
    auth: 'auth/',
    admin: 'admin/',
    job: 'job/',
    home: 'home/',
    profile: 'profile/',
    builder: 'builder/',
    tradie: 'tradie/',
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
    getRecentSearch: `${versions.v1}${ServiceEnum.admin}getRecentSearch`, //admin
    jobTypeList: `${versions.v1}${ServiceEnum.auth}jobTypeList`, //admin
    jobType: `${versions.v1}${ServiceEnum.auth}jobType`, //admin
    home: `${versions.v1}${ServiceEnum.home}`,
    homeSearch: `${versions.v1}${ServiceEnum.home}search`,
    profileTemplateList: `${versions.v1}${ServiceEnum.profile}${ServiceEnum.builder}templatesList`,
    createTemplate: `${versions.v1}${ServiceEnum.job}createTemplate`,
    createJob: `${versions.v1}${ServiceEnum.job}create`, // create job (post job)
    viewNearByJob: `${versions.v1}${ServiceEnum.home}viewNearByJob`,
    homeJobDetails: `${versions.v1}${ServiceEnum.home}jobDetails`,
    homeApplyJob: `${versions.v1}${ServiceEnum.home}apply`,
    homeSaveJob: `${versions.v1}${ServiceEnum.home}saveJob`,
    profileTradie: `${versions.v1}${ServiceEnum.profile}${ServiceEnum.tradie}`,
    askQuestion: `${versions.v1}${ServiceEnum.job}${ServiceEnum.tradie}askQuestion`,
    deleteQuestion: `${versions.v1}${ServiceEnum.job}${ServiceEnum.tradie}deleteQuestion`,
}

export const urlFor = (service: String): string => {
    return `${ACTIVE_HOST}/${service}`;
};

export default Urls;