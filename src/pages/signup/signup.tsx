import { useState, useEffect } from 'react';
import CreateAccount from './components/createAccount';
import InitialSignupPage from './components/initialSignupPage';
import LetsGo from './components/letsGo';
import SelectYourSphere from './components/selectYourSphere';
import PhoneNumber from './components/phoneNumber';
import VerifyPhoneNumber from './components/verifyPhoneNumber';
import CreatePassword from './components/createPassword';
import Specialization from './components/specialization';
import AlmostDone from './components/almostDone';
import AddQualification from './components/addQualification';
import AddABN from './components/addABN';
import { postSignup, gmailSignupLogin } from '../../redux/auth/actions';
import Constants from '../../utils/constants';
import AuthParent from '../../common/auth/authParent';
import storageService from '../../utils/storageService';

const DATA = [
    { title: 'Welcome to Tickt', subTitle: 'Australia\'s fastest growing network for builders and tradesmen' },
    { title: 'Create account' },
    { title: 'Phone number' },
    { title: 'Verify your number' },
    { title: 'Create password' },
    { title: 'What is your sphere?' },
    { title: 'What Specialisation?' },
    { title: 'Almost done', tradieTitle: 'Add qualification' },
    { title: 'Add ABN' }
]

const Signup = (props: any) => {
    const [steps, setSteps] = useState(0);
    const [signupData, setSignupData] = useState({
        firstName: '',
        mobileNumber: '',
        email: '',
        password: '',
        socialId: '',
        accountType: '',
        trade: '',
        specialization: [],
        qualification: [],
        user_type: 0,
        // companyName: '',
        // position: '',
        // abn: '',
    })

    useEffect(() => {
        props.callTradeList();
    }, [])

    const backButtonHandler = () => {
        let minStep = 1;
        if (steps === 4) {
            minStep = 2;
        }
        setSteps(steps - minStep);
    }

    const updateSteps = (step: number, newData?: any) => {
        setSteps(step);
        if (newData) {
            setSignupData((prevData: any) => ({ ...prevData, ...newData }))
        }
    }
    console.log(signupData, '-->  signupData')

    const onNewAccount = (profileData: any, authType: string) => {
        setSteps(steps + 1);
        const newProfileData = {
            firstName: profileData.name,
            email: profileData.email,
            socialId: profileData.googleId,
            accountType: authType
        }
        setSignupData((prevData: any) => ({ ...prevData, ...newProfileData }))
    }

    const onSubmitSignup = async (lastStepFields: any) => {
        var res;
        const newData = { ...signupData, ...lastStepFields };
        const data = {
            ...newData,
            //company_name: newData.companyName,
            trade: [newData.trade],
            user_type: signupData.user_type,
            deviceToken: "323245356tergdfgrtuy68u566452354dfwe",
        }
        //delete data.companyName;
        if (data.user_type === 2) {
            delete data.qualification
        }
        if (signupData.accountType) {
            res = await gmailSignupLogin(data);
            res.success && storageService.setItem("jwtToken", res.successToken);
        } else {
            delete data.socialId;
            delete data.accountType;
            res = await postSignup(data);
        }
        if (res.success) {
            if (signupData.user_type === 2) {
                setSteps(8);
            } else {
                setSteps(9)
            }
        }
    }

    const renderPages = () => {
        switch (steps) {
            case 0:
                return <InitialSignupPage updateSteps={updateSteps} history={props.history} step={steps} />
            case 1:
                return <CreateAccount updateSteps={updateSteps} history={props.history} step={steps} data={signupData} onNewAccount={onNewAccount} />
            case 2:
                return <PhoneNumber updateSteps={updateSteps} step={steps} mobileNumber={signupData.mobileNumber} />
            case 3:
                return <VerifyPhoneNumber updateSteps={updateSteps} step={steps} mobileNumber={signupData.mobileNumber} />
            case 4:
                return <CreatePassword updateSteps={updateSteps} step={steps} password={signupData.password} />
            case 5:
                return <SelectYourSphere updateSteps={updateSteps} step={steps} tradeListData={props.tradeListData} trade={signupData.trade} />
            case 6:
                return <Specialization updateSteps={updateSteps} step={steps} tradeListData={props.tradeListData} trade={signupData.trade} specialization={signupData.specialization} />
            case 7:
                if (signupData.user_type === 2) {
                    return <AlmostDone onSubmitSignup={onSubmitSignup} />
                } else {
                    return <AddQualification updateSteps={updateSteps} step={steps} tradeListData={props.tradeListData} trade={signupData.trade} qualification={signupData.qualification} />
                }
            case 8:
                if (signupData.user_type === 2) {
                    return <LetsGo history={props.history} />
                } else {
                    return <AddABN onSubmitSignup={onSubmitSignup} />
                }
            case 9:
                return <LetsGo history={props.history} />
            default:
                return null
        }
    }

    const header = DATA[steps];
    const isSuccess = signupData.user_type === 2 ? steps === 8 : steps === 9;

    return !isSuccess ? (
        <AuthParent sliderType='login' backButtonHandler={backButtonHandler} header={header} userType={signupData.user_type} steps={steps}>{renderPages()}</AuthParent>
    ) : renderPages()
}

export default Signup