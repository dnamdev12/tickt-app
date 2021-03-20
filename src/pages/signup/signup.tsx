import React, { useState, useEffect } from 'react';
import colorLogo from '../../assets/images/ic-logo-yellow.png';
import SliderComponent from '../../common/slider-component';
import CreateAccount from './components/createAccount';
import InitialSignupPage from './components/initialSignupPage';
import LetsGo from './components/letsGo';
import SelectYourSphere from './components/selectYourSphere';
import PhoneNumber from './components/phoneNumber';
import VerifyPhoneNumber from './components/verifyPhoneNumber';
import CreatePassword from './components/createPassword';
import Specialisation from './components/specialisation';
import AlmostDone from './components/almostDone';
import ChooseQualification from './components/chooseQualification';
import AddQualification from './components/addQualification';
import AddABN from './components/addABN';
import {postSignup} from '../../redux/auth/actions';

const Signup = (props: any) => {
    const [steps, setSteps] = useState(0);
    const [signupData, setSignupData] = useState({
        firstName: '',
        mobileNumber: '',
        email: '',
        password: '',
        trade: '',
        specialization: [],
        company_name: '',
        position: '',
        abn: '',
    })

    useEffect(()=> {
        props.callTradeList();
    }, [])

    const updateSteps = (step: number) => {
        setSteps(step)
    }

    const signupStepOne = (data: any, step: number) => {
        setSteps(step)
        setSignupData((prevData: any) => ({ ...prevData, firstName: data.firstName, email: data.email, tnc: data.tnc }))
    }

    const signupStepTwo = (data: any, step: number) => {
        setSteps(step)
        setSignupData((prevData: any) => ({ ...prevData, mobileNumber: data }))
    }

    const signupStepThree = (step: number) => {
        setSteps(step)
    }

    const signupStepFour = (data: any, step: number) => {
        setSteps(step)
        setSignupData((prevData: any) => ({ ...prevData, password: data }))
    }

    const signupStepFive = (trade: any, step: number) => {
        setSteps(step)
        setSignupData((prevData: any) => ({ ...prevData, trade: trade }))
    }

    const signupStepSix = (data: any, step: number) => {
        setSteps(step)
        //setSignupData((prevData: any) => ({ ...prevData, password: data }))
    }

    const signupStepSeven = (data: any, step: number) => {
        setSteps(step)
        setSignupData((prevData: any) => ({ ...prevData, company_name: data.companyName, position: data.position, abn: data.abn }))
    }

    const signupDataHandler = async (e: any) => {
        e.preventDefault();
        const data = {
            firstName: "abc",
            mobileNumber: "1234567890",
            email: "dhavalddsdjitrafsefsdfsdfs@gmail.com",
            password: "19999398",
            "deviceToken": "323245356tergdfgrtuy68u566452354dfwe",
            trade: [
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
        switch(steps){
            case 0:
                return <InitialSignupPage updateSteps={updateSteps} history={props.history} step={steps} />
            case 1:
                return <CreateAccount  updateSteps={updateSteps} signupStepOne={signupStepOne} step={steps} data={signupData} />
            case 2:
                return <PhoneNumber  updateSteps={updateSteps} signupSteptwo={signupStepTwo} step={steps} mobileNumber={signupData.mobileNumber}/>
            case 3:
                return <VerifyPhoneNumber updateSteps={updateSteps} signupStepThree={signupStepThree} step={steps} mobileNumber={signupData.mobileNumber}/>
            case 4:
                return <CreatePassword  updateSteps={updateSteps} signupStepFour={signupStepFour} step={steps} password={signupData.password}/>
            case 5:
                return <SelectYourSphere updateSteps={updateSteps} signupStepFive={signupStepFive} step={steps} tradeListData={props.tradeListData} trade={signupData.trade}/>
            case 6:
                return <Specialisation updateSteps={updateSteps} signupStepSix={signupStepSix} step={steps} tradeListData={props.tradeListData} trade={signupData.trade} />
            // case 7:
            //     return <ChooseQualification updateSteps={updateSteps} signupStepSeven={signupStepSeven} step={steps}/>
            // case 8:
            //     return <AddQualification updateSteps={updateSteps} signupStepEight={signupStepEight} step={steps}/>
            // case 9:
            //     return <AddABN updateSteps={updateSteps} signupStepNine={signupStepNine} step={steps}/>
            case 7:
                return  <AlmostDone updateSteps={updateSteps} signupStepSeven={signupStepSeven} step={steps}/>
            case 8:
                return <LetsGo history={props.history}/>
            default: return null
        }
    }

    return renderPages()
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