// 1 --> tradie | 2 --> builder
const USER_TYPE = 2;

const OTP_TIMER = 60;

const errorStrings: any = {
    fullNameEmpty: 'Full Name is required',
    fullNameErr: 'Please enter a valid name',
    fullNameShortErr: 'Name must have minimum 3 letters',
    companyNameEmpty: 'Company Name is required',
    companyNameErr: 'Please enter a valid company name',
    companyNameShortErr: 'Company Name must have minimum 3 letters',
    positionNameEmpty: 'Position is required',
    positionNameErr: 'Please enter a valid position',
    positionNameShortErr: 'Position must have minimum 3 letters',
    emailEmpty: 'Email Address is required',
    emailExist: 'Email Address already in use',
    emailErr: 'Please enter valid Email Address',
    tncEmpty: 'Please accept privacy policy and terms & conditions',
    phoneNumberEmpty: 'Phone Number is required',
    phoneNumberErr: 'Please enter correct Phone Number',
    phoneNumberExist: 'Phone Number already in use',
    abnEmpty: 'ABN is required',
    abnErr: 'Please enter correct ABN',
    abnExist: 'ABN already in use',
    password: 'Password is required',
    oldPassword: 'Old Password is required',
    passwordInvalid: 'Invalid password',
    passwordError: 'Password must be 8 characters long and must include atleast one uppercase, one lowercase letter, one numeric and one special character',
    confirmNewPassword: 'New Password and confirm New Password doesn\'t match',
    otpEmpty: 'OTP is required',
    otpIncorrect: 'Please enter a valid OTP',
    sphereEmpty: 'Please select your trade',
    specializationEmpty: 'Please select your specialization',
    pleaseEnter: 'Please enter ',
    pleaseSelect: 'Please select',
    bannerSearchJob: 'Please Select Job Type from the List',
    bannerSearchJobError: 'Please search valid job name',
    bannerSearchJobEmpty: 'Job Type is required',
    bannerSearchLocation: 'Please select location from the list',
    maxBudgetEmpty: 'Budget is required',
    maxBudgetError: 'Budget have maximum two decimal values',
    askQuestion: 'Question is required',
    askReview: 'Review is required',
    askReply: 'Reply is required',
    JobName: 'Job Name is required',
    JobDescription: 'Job Description is required',
}
const SocialAuth = {
    GOOGLE_CLIENT_ID: '851150341637-9eaf8kkqhlq75gd30ck7ouhqjtn8j4cq.apps.googleusercontent.com',
    GOOGLE_SECRET_KEY: 'QZPArMrdjCvt7ODvnKRa1hhA',
    GOOGLE_GEOCODE_KEY: 'AIzaSyDKFFrKp0D_5gBsA_oztQUhrrgpKnUpyPo',
}

const LinkedInAuth = {
    REDIRECT_URI: `${window.location.origin}/linkedin`,
    CLIENT_ID: '77vhhfg24hx1s2',
    CLIENT_SECRET: '83ODjX9bN2GIjCoj',
}

const BasicAuthorizationToken = 'dGlja3RfYXBwOnRpY2t0X2FwcF8xMjNzYWRlZnNz';
const FirebasePushServiceKey = 'BHtgSVj0gw6YQDd6ByTPx_gyRtBWKlHBVYKFsemnv1t6bTH9efAseLWaoJx2GvTu0NW314ZF4DOj_eJ7tub9kHI';

export const qaStgFirebaseConfig = {
    apiKey: "AIzaSyDKFFrKp0D_5gBsA_oztQUhrrgpKnUpyPo",
    authDomain: "tickt-app.firebaseapp.com",
    databaseURL: "https://tickt-app-default-rtdb.firebaseio.com",
    projectId: "tickt-app",
    storageBucket: "tickt-app.appspot.com",
    messagingSenderId: "795502342919",
    appId: "1:795502342919:web:37a2294b55f69051d30ba2",
    measurementId: "G-KT3LTB6JMT"
};

export default {
    errorStrings,
    OTP_TIMER,
    USER_TYPE,
    SocialAuth,
    LinkedInAuth,
    BasicAuthorizationToken,
    FirebasePushServiceKey,
    qaStgFirebaseConfig,

}