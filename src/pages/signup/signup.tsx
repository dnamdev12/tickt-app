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
import ChooseQualification from './components/chooseQualification';
import AddQualification from './components/addQualification';
import AddABN from './components/addABN';
import { postSignup, socialSignup } from '../../redux/auth/actions';
import Constants from '../../utils/constants';
import AuthParent from '../../common/auth/authParent';

const DATA = [
    { title: 'Welcome to Tickt', subTitle: 'Australia\'s fastest growing network for builders and tradesmen' },
    { title: 'Create account' },
    { title: 'Phone number' },
    { title: 'Verify your number' },
    { title: 'Create password' },
    { title: 'What is your sphere?' },
    { title: 'What Specialisation?' },
    { title: 'Almost done' },
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

    const onAuthSocial = (profileData: any, authType: string) => {
        setSteps(steps + 1);
        const newProfileData = {
            firstName: profileData.name,
            email: profileData.email,
            socialId: profileData.googleId,
            accountType: authType
        }
        setSignupData((prevData: any) => ({ ...prevData, ...newProfileData }))
    }

    const onSubmitSignup = async (almostData: any) => {
        var res;
        const newData = {...signupData, ...almostData};
        const data = {
            ...newData,
            company_name: newData.companyName,
            trade: [newData.trade],
            user_type: Constants.USER_TYPE,
            deviceToken: "323245356tergdfgrtuy68u566452354dfwe",
        }
        delete data.companyName;
        if(!signupData.accountType){
            delete data.socialId;
            delete data.accountType;
            res = await postSignup(data);
        } else {
            res = await socialSignup(data);
        }
        if(res.success) {
            setSteps(8);
        }
    }

    const renderPages = () => {
        switch (steps) {
            case 0:
                return <InitialSignupPage updateSteps={updateSteps} history={props.history} step={steps} />
            case 1:
                return <CreateAccount updateSteps={updateSteps} step={steps} data={signupData} onAuthSocial={onAuthSocial}/>
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
            // case 7:
            //     return <ChooseQualification updateSteps={updateSteps} step={steps}/>
            // case 8:
            //     return <AddQualification updateSteps={updateSteps} step={steps}/>
            // case 9:
            //     return <AddABN updateSteps={updateSteps} step={steps}/>
            case 7:
                return <AlmostDone onSubmitSignup={onSubmitSignup} />
            case 8:
                return <LetsGo history={props.history} />
            default:
                return null
        }
    }

    const header = DATA[steps];

    return header ? (
        <AuthParent sliderType='login' backButtonHandler={backButtonHandler} header={header} steps={steps}>{renderPages()}</AuthParent>
    ) : renderPages()
}

export default Signup