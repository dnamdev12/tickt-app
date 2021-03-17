import React, { useState, useEffect } from 'react'
import CreatePassword from './components/createPassword'
import SuccessPage from './components/successPage'
import ResetPassword from './components/resetPassword'
import VerifyPhoneNumber from './components/verifyPhoneNumber'

const ForgetPassword = () => {
    const [steps, setSteps] = useState(3);
    const [signupData, setSignupData] = useState({
        step: 1,
        firstName: '',
        email: '',
        tnc: false,
    })

    const renderPages = () => {
        switch(steps){
            case 1:
                return <ResetPassword />
                break;
            case 2:
                return <VerifyPhoneNumber />
                break;
            case 3:
                return <CreatePassword />
                break;
            case 4:
                return <SuccessPage />
                break;
            default: 
        }
    }

    return (
        <>
            {renderPages()}
        </>
    )
}

export default ForgetPassword