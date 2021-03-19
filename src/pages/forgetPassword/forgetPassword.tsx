import React, { useState, useEffect } from 'react'
import CreatePassword from './components/createPassword'
import SuccessPage from './components/successPage'
import ResetPassword from './components/resetPassword'
import VerifyPhoneNumber from './components/verifyPhoneNumber'

const ForgetPassword = () => {
    const [steps, setSteps] = useState(3);
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    })

    const renderPages = () => {
        switch (steps) {
            case 1:
                return <ResetPassword />
            case 2:
                return <VerifyPhoneNumber />
            case 3:
                return <CreatePassword />
            case 4:
                return <SuccessPage />
            default: return null
        }
    }
    return renderPages()
}

export default ForgetPassword