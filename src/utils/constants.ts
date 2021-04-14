const SocialAuth = {
    GOOGLE_CLIENT_ID: '851150341637-9eaf8kkqhlq75gd30ck7ouhqjtn8j4cq.apps.googleusercontent.com',
    GOOGLE_SECRET_KEY: 'QZPArMrdjCvt7ODvnKRa1hhA',
}

const errorStrings = {
fullNameEmpty: 'Full Name cannnot be empty',
fullNameErr: 'Please enter a valid name',
fullNameShortErr: 'Name must have minimum 3 letters',
companyNameEmpty: 'Company Name cannnot be empty',
companyNameErr: 'Please enter a valid company name',
companyNameShortErr: 'Company Name must have minimum 3 letters',
positionNameEmpty: 'Position cannnot be empty',
positionNameErr: 'Please enter a valid position',
positionNameShortErr: 'Position must have minimum 3 letters',
emailEmpty: 'Email cannot be empty',
emailExist: 'Email id already in use',
emailErr: 'Invalid email id',
tncEmpty: 'Please accept privacy policy and terms & conditons',
phoneNumberEmpty: 'Phone Number cannot be empty',
phoneNumberErr: 'Please enter correct Phone Number',
phoneNumberExist: 'Phone number already in use',
abnEmpty: 'ABN cannot be empty',
abnErr: 'Please enter correct ABN',
abnExist: 'Phone number already in use',
password: 'Please enter password',
passwordInvalid: 'Invalid password',
passwordError: 'Password must be 8 charaters longs and should contain atleast one alphabet, one numeric and one special character',
otpEmpty: 'OTP cannot be empty',
otpIncorrect: 'Please enter a valid OTP',
sphereEmpty: 'Please select your trade',
specializationEmpty: 'Please select your specialization',
pleaseEnter: 'Please enter ',
pleaseSelect: 'Please select',
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