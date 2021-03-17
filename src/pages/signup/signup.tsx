import React, { useState, useEffect } from 'react'
import colorLogo from '../../assets/images/ic-logo-yellow.png';
import SliderComponent from '../common/slider-component';
import CreateAccount from './components/createAccount'
import InitialSignupPage from './components/initialSignupPage'
import LetsGo from './components/letsGo'
import SelectCategories from './components/selectCategories'
import PhoneNumber from './components/phoneNumber'
import VerifyPhoneNumber from './components/verifyPhoneNumber'
import AlmostDone from './components/almostDone'
import CreatePassword from './components/createPassword'

const Signup = (props: any) => {
    const [steps, setSteps] = useState(1);
    const [signupData, setSignupData] = useState({
        step: 1,
        firstName: '',
        email: '',
        tnc: false,
    })

    const stepsHandler = (step: number) => {
        setSteps(step)
    }

    const signupDataHandler = () => {
        
    }

    const renderPages = () => {
        //switch(Number(props.match.params.step) | steps){
        switch(steps){
            case 1:
                return <InitialSignupPage updateSteps={stepsHandler} history={props.history} stepCount={signupData.step}/>
                break;
            case 2:
                return <CreateAccount updateSteps={stepsHandler}  signupDetails={signupDataHandler}/>
                break;
            case 3:
                return <PhoneNumber />
                break;
            case 4:
                return <VerifyPhoneNumber />
                break;
            case 5:
                return <CreatePassword />
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
            default: 

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