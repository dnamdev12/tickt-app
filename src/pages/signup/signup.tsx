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
import { postSignup, socialSignupLogin } from '../../redux/auth/actions';
import Constants from '../../utils/constants';
import AuthParent from '../../common/auth/authParent';
import storageService from '../../utils/storageService';

interface Propstype {
    history?: any,
    showModal: boolean,
    callTradeList: () => void,
    tradeListData: Array<any>,
    modalUpdateSteps: (data: any) => void,
    setShowModal: (data: any) => void,
    socialData: any,
}

const DATA = [
    { title: 'Welcome to Tickt', subTitle: 'Australia\'s fastest growing network for builders and tradesmen' },
    { title: 'Create account' },
    { title: 'Phone number' },
    { title: 'Verify your number' },
    { title: 'Create password' },
    { title: 'Select trades you require', tradieTitle: 'What is your trade?' },
    { title: 'What Specialisation?' },
    { title: 'Almost done', tradieTitle: 'Add qualification' },
    // { title: 'Add ABN' }
    { title: 'Almost done' }
]

const Signup = (props: Propstype) => {
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
        user_type: 0
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
        if (steps === 2 && (props.socialData || props.history.location.redirect === "socialRedirectFromLogin")) {
            minStep = 2
        }
        setSteps(steps - minStep);
    }

    const updateSteps = (step: number, newData?: any) => {
        var newStep = step;
        if (!signupData.socialId && (props.socialData || props.history.location.redirect === "socialRedirectFromLogin")) {
            const profile = props.socialData ? props.socialData : props.history.location.state.profileData;
            console.log(profile, "profile updateSteps", props.history)
            if (props.socialData) {
                setSignupData((prevData: any) => ({ ...prevData, ...profile }))
            }
            if (props.history.location.state?.profileData) {
                setSignupData((prevData: any) => ({ ...prevData, ...profile }))
            }
            newStep += 1;
        }
        if(newStep == 1 && signupData.socialId){
            newStep +=1;
        }
        setSteps(newStep);
        if (newData) {
            setSignupData((prevData: any) => ({ ...prevData, ...newData }))
        }
    }

    const onNewAccount = (profileData: any, authType: string) => {
        setSteps(steps + 1);
        const newProfileData = {
            firstName: profileData.name,
            email: profileData.email,
            // socialId: profileData.googleId,
            accountType: authType,
            ...(authType === 'google' && { socialId: profileData.googleId }),
            ...(authType === 'linkedin' && { socialId: profileData.socialId })
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
            res = await socialSignupLogin(data);
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

    console.log("signupData ==>", signupData)

    const renderPages = () => {
        switch (steps) {
            case 0:
                return <InitialSignupPage updateSteps={updateSteps} history={props.history} step={steps} showModal={props.showModal} />
            case 1:
                return <CreateAccount updateSteps={updateSteps} history={props.history} step={steps} data={signupData} onNewAccount={onNewAccount} showModal={props.showModal} setShowModal={props.setShowModal} modalUpdateSteps={props.modalUpdateSteps} />
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
                    return <LetsGo history={props.history} showModal={props.showModal} setShowModal={props.setShowModal} modalUpdateSteps={props.modalUpdateSteps} />
                } else {
                    return <AddABN onSubmitSignup={onSubmitSignup} />
                }
            case 9:
                return <LetsGo history={props.history} showModal={props.showModal} setShowModal={props.setShowModal} modalUpdateSteps={props.modalUpdateSteps} />
            default:
                return null
        }
    }

    const header = DATA[steps];
    const isSuccess = signupData.user_type === 2 ? steps === 8 : steps === 9;

    return !isSuccess ? (
        <AuthParent sliderType='login' backButtonHandler={backButtonHandler} header={header} userType={signupData.user_type} steps={steps} history={props.history} showModal={props.showModal} setShowModal={props.setShowModal} modalUpdateSteps={props.modalUpdateSteps}>{renderPages()}</AuthParent>
    ) : renderPages()
}

export default Signup