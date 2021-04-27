const SocialAuth = {
    GOOGLE_CLIENT_ID: '851150341637-9eaf8kkqhlq75gd30ck7ouhqjtn8j4cq.apps.googleusercontent.com',
    GOOGLE_SECRET_KEY: 'QZPArMrdjCvt7ODvnKRa1hhA',
}

const errorStrings = {
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
emailExist: 'Email address already in use',
emailErr: 'Email Address is required',
tncEmpty: 'Please accept privacy policy and terms & conditions',
phoneNumberEmpty: 'Phone Number is required',
phoneNumberErr: 'Please enter correct Phone Number',
phoneNumberExist: 'Phone number already in use',
abnEmpty: 'ABN is required',
abnErr: 'Please enter correct ABN',
abnExist: 'Phone number already in use',
password: 'Password is required',
passwordInvalid: 'Invalid password',
passwordError: 'Password must be 8 characters long and must include atleast one alphabet, one numeric and one special character',
otpEmpty: 'OTP is required',
otpIncorrect: 'Please enter a valid OTP',
sphereEmpty: 'Please select your trade',
specializationEmpty: 'Please select your specialization',
pleaseEnter: 'Please enter ',
pleaseSelect: 'Please select',
bannerSearchJob: 'Please select job type from the list',
bannerSearchJobError: 'Please search valid job name',
bannerSearchJobEmpty: 'Job Type is required',
bannerSearchLocation: 'Please select location from the list',
}

const OTP_TIMER = 60;

// 1 --> tradie | 2 --> builder
const USER_TYPE = 2;  

export default {
    errorStrings,
    OTP_TIMER,
    USER_TYPE,
    SocialAuth
}