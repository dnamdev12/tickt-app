const ACTIVE_HOST = 'https://ticktdevapi.appskeeper.in';  // dev env
// const ACTIVE_HOST = 'https://ticktqaapi.appskeeper.in';  // qa env

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
    getRecentLocation: `${versions.v1}${ServiceEnum.admin}getRecentLocation`, //admin
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
    updateQuestion: `${versions.v1}${ServiceEnum.job}${ServiceEnum.tradie}updateQuestion`,
    activeJobList: `${versions.v1}${ServiceEnum.job}${ServiceEnum.tradie}activeJobList`,
    appliedJobList: `${versions.v1}${ServiceEnum.job}${ServiceEnum.tradie}appliedJobList`,
    pastJobList: `${versions.v1}${ServiceEnum.job}${ServiceEnum.tradie}pastJobList`,
    newJobList: `${versions.v1}${ServiceEnum.job}${ServiceEnum.tradie}newJobList`,
    approvedMilestoneList: `${versions.v1}${ServiceEnum.job}${ServiceEnum.tradie}approveMilestoneList`,
    activeJobListBuilder: `${versions.v1}${ServiceEnum.job}${ServiceEnum.builder}activeJobList`, //active-job-list (builder)
    OpenJobLisBuilder: `${versions.v1}${ServiceEnum.job}${ServiceEnum.builder}openJobList`, //open-job-list (builder)
    pastJobListBuilder: `${versions.v1}${ServiceEnum.job}${ServiceEnum.builder}pastJobList`,  //past-job-list (builder)
    newApplicantsBuilder: `${versions.v1}${ServiceEnum.job}${ServiceEnum.builder}newApplicants`, //new-applicants (builder)
    newJobApplicationListBuilder: `${versions.v1}${ServiceEnum.job}${ServiceEnum.builder}newJobApplicationList`, //new-job-application-list (builder)
    needApprovalBuilder: `${versions.v1}${ServiceEnum.job}${ServiceEnum.builder}needApproval`, //new-approval (builder)
    jobDetailsBuilder: `${versions.v1}${ServiceEnum.job}${ServiceEnum.builder}jobDetails`, //job-details (builder)
    milestoneList: `${versions.v1}${ServiceEnum.job}${ServiceEnum.tradie}milestoneList`,
    markComplete: `${versions.v1}${ServiceEnum.job}${ServiceEnum.tradie}markComplete`,
    addBankDetails: `${versions.v1}${ServiceEnum.profile}${ServiceEnum.tradie}addBankDetails`,
    updateBankDetails: `${versions.v1}${ServiceEnum.profile}${ServiceEnum.tradie}updateBankDetails`,
    getBankDetails: `${versions.v1}${ServiceEnum.profile}${ServiceEnum.tradie}getBankDetails`,
    reviewBuilder: `${versions.v1}${ServiceEnum.job}${ServiceEnum.tradie}reviewBuilder`,
    builderProfile: `${versions.v1}${ServiceEnum.job}${ServiceEnum.tradie}builderProfile`,
    deleteRecentSearch: `${versions.v1}${ServiceEnum.admin}deleteRecentSearch`, //admin
    tradieReviewList: `${versions.v1}${ServiceEnum.job}${ServiceEnum.tradie}reviewList`,
    tradieQuestionList: `${versions.v1}${ServiceEnum.job}${ServiceEnum.tradie}questionList`,
    tradieReviewReply: `${versions.v1}${ServiceEnum.job}${ServiceEnum.tradie}reviewReply`,
    tradieUpdateReviewReply: `${versions.v1}${ServiceEnum.job}${ServiceEnum.tradie}updateReviewReply`,
    tradieRemoveReviewReply: `${versions.v1}${ServiceEnum.job}${ServiceEnum.tradie}removeReviewReply`,
    tradieProfile: `${versions.v1}${ServiceEnum.job}${ServiceEnum.builder}tradieProfile`,
    reviewList: `${versions.v1}${ServiceEnum.job}${ServiceEnum.builder}reviewList`,
    acceptDeclineRequest: `${versions.v1}${ServiceEnum.job}${ServiceEnum.builder}acceptDeclineRequest`,
    milestoneListBuilder: `${versions.v1}${ServiceEnum.job}${ServiceEnum.builder}milestoneList`,
    milestoneDetails: `${versions.v1}${ServiceEnum.job}${ServiceEnum.builder}milestoneDetails`,
}

export const urlFor = (service: String): string => {
    return `${ACTIVE_HOST}/${service}`;
};

export default Urls;