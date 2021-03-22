import React, { useState, useEffect } from 'react';
import{ createPassword } from '../../redux/auth/actions';
import CreatePassword from './components/createPassword';
import SuccessPage from './components/successPage';
import ResetPassword from './components/resetPassword';
import VerifyPhoneNumber from './components/verifyPhoneNumber';
import AuthParent from '../../common/auth/authParent';

const DATA = [
    { title: 'Reset Password' },
    { title: 'Verify your number' },
    { title: 'Create password' },
]

const ForgetPassword = (props: any) => {
    const [steps, setSteps] = useState(1);
    const [loginData, setLoginData] = useState({
        mobileNumber:'',
    })

    const updateSteps = (step: number, newData?: any) => {
        setSteps(step);
        if (newData) {
            setLoginData((prevData: any) => ({ ...prevData, ...newData }))
        }
    }

    const backButtonHandler = () => {
        let minStep = 1;
        if (steps === 1) {
            return props.history.push('/login')
        }
        if(steps === 3){
            minStep = 2
        }
        setSteps(steps - minStep)
    }

    const onResetPassword = async (password: any) => {
        const data = {...loginData, ...password}
        const res = await createPassword(data);
        if(res.success) {
            setSteps(4);
        }
    }

    const renderPages = () => {
        switch (steps) {
            case 1:
                return <ResetPassword updateSteps={updateSteps} history={props.history} step={steps} mobileNumber={loginData.mobileNumber} />
            case 2:
                return <VerifyPhoneNumber updateSteps={updateSteps} history={props.history} step={steps} mobileNumber={loginData.mobileNumber}/>
            case 3:
                return <CreatePassword onResetPassword={onResetPassword} />
            case 4:
                return <SuccessPage history={props.history}/>
            default: return null
        }
    }

    const header = DATA[steps-1];

    return header ? (
        <AuthParent sliderType='login' backButtonHandler={backButtonHandler} hideProgres header={header} steps={steps}>{renderPages()}</AuthParent>
    ) : renderPages()
}

export default ForgetPassword