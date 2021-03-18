import React, { useState, useEffect } from 'react'
import colorLogo from '../../assets/images/ic-logo-yellow.png';
import SliderComponent from '../../common/slider-component';
import CreateAccount from './components/createAccount'
import InitialSignupPage from './components/initialSignupPage'
import LetsGo from './components/letsGo'
import SelectCategories from './components/selectCategories'
import PhoneNumber from './components/phoneNumber'
import VerifyPhoneNumber from './components/verifyPhoneNumber'
import AlmostDone from './components/almostDone'
import CreatePassword from './components/createPassword'
import {postSignup} from '../../redux/auth/actions'

const Signup = (props: any) => {
    const [steps, setSteps] = useState(6);
    const [signupData, setSignupData] = useState({
        firstName: '',
        email: '',
        tnc: false,
        mobileNumber: ''
    })

    const updateSteps = (step: number) => {
        setSteps(step)
    }

    const signupStepOne = (data: any, step: number) => {
        setSteps(step)
        setSignupData((prevData: any) => ({ ...prevData, firstName: data.firstName, email: data.email }))
    }

    const signupStepTwo = (data: any, step: number) => {
        setSteps(step)
        setSignupData((prevData: any) => ({ ...prevData, mobileNumber: data.mobileNumber }))
    }

    const signupStepThree = (data: any, step: number) => {
        setSteps(step)
        setSignupData((prevData: any) => ({ ...prevData, mobileNumber: data.mobileNumber }))
    }

    const signupStepFour = (data: any, step: number) => {
        setSteps(step)
        setSignupData((prevData: any) => ({ ...prevData, mobileNumber: data.mobileNumber }))
    }

    const signupDataHandler = async (e: any) => {
        e.preventDefault();
        const data = {
            firstName: "abc",
            mobileNumber: "1234567890",
            email: "dhavalddsdjitrafsefsdfsdfs@gmail.com",
            "password": "19999398",
            "deviceToken": "323245356tergdfgrtuy68u566452354dfwe",
            "trade": [
              "60486a001abc8a08073cf0e1",
              "60486a3d1abc8a08073cf0e2"
            ],
            "specialization": [
              "6049c78102f48e868d8dfdbd",
              "6049c85e02f48e868d8e0a40"
            ],
            "company_name": "abc",
            "position": "Owner",
            "abn": "12345678901",
            "user_type": 2
          }
        const res = await postSignup(data);
        console.log(res,' signup res');
    }

    const renderPages = () => {
        //switch(Number(props.match.params.step) | steps){
        switch(steps){
            case 1:
                return <InitialSignupPage updateSteps={updateSteps} history={props.history} step={steps}/>
                break;
            case 2:
                return <CreateAccount signupStepOne={signupStepOne} step={steps} />
                break;
            case 3:
                return <PhoneNumber signupSteptwo={signupStepTwo} step={steps}/>
                break;
            case 4:
                return <VerifyPhoneNumber signupStepThree={signupStepThree} step={steps}/>
                break;
            case 5:
                return <CreatePassword signupStepFour={signupStepFour} step={steps}/>
                break;
            case 6:
                return <SelectCategories />
                break;
            case 7:
                return <AlmostDone />
                break;
            case 8:
                return <LetsGo />
                break;
            default: return null

        }
    }

    return (
        <>
            {renderPages()}
        </>
    )
}

export default Signup

// export interface Props {
//     requestApiData: any
//     userData: any
// }

// export interface State {
//     userData: Array<any>
// }

// export {}