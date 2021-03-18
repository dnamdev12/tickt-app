import React, { useState, useEffect } from 'react';
import colorLogo from '../../../assets/images/ic-logo-yellow.png';
import SliderComponent from '../../../common/slider-component';
import { verifyOtp } from '../../../redux/auth/actions';
import Messages from '../../../common/Messages';
import globalRegex from '../../../common/globalRegex';
import OtpInput from "react-otp-input";

interface Propstype {
    step: number
    history?: any
    signupStepThree: (data: any, step: number) => void,
}

const VerifyPhoneNumber = (props: Propstype) => {
    const [errors, setErrors] = useState({});
    const [timer, setTimer] = useState(60);
    const [OTP, setOTP] = useState('');
    const [resendOTP, setResendOTP] = useState(false)

    const changeHandler = (otp: any) => {
        console.log(otp, 'otp')
        setOTP(otp)
    }

    // useEffect(() => {
    //     var time = 60
    //     if (timer > 0 && time > 0) {
    //         setInterval(() => {
    //             console.log('useEffect cdm')
    //             setTimer(time--)
    //         }, 1000)
    //     }
    // }, [])

    // useEffect(() => {
    //     if (timer > 0 && resendOTP === false) {
    //         setInterval(() => {
    //             console.log('useEffect cdm')
    //             setTimer({timer: timer -1})
    //         }, 1000)
    //     }
    //     if(timer === 0){
    //         setResendOTP(true)
    //     }
    // }, [resendOTP])


    console.log('ook')

    const validateForm = () => {
        const newErrors: any = {};
        if (!OTP) {
            newErrors.OTP = Messages.otpEmpty;
        } else {
            const nameRegex = new RegExp(globalRegex.regex.mobile);
            if (!nameRegex.test(OTP)) {
                newErrors.OTP = Messages.otpErr
            } else if (nameRegex.test(OTP) && OTP.length < 5) {
                newErrors.OTP = Messages.otpIncorrect
            }
        }
        console.log(newErrors)
        setErrors(newErrors);
        return !Object.keys(newErrors).length;
    }

    const onSubmit = async (e: any) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('ok 68')
            const res: any = await verifyOtp(OTP)
            if (res.success && res.message === 'This Mobile Number is Unique') {
                props.signupStepThree(OTP, props.step + 1)
            } else if (res.success && res.message === 'This Mobile Number is already in use') {
                let newErrors: any = {}
                newErrors.email = Messages.phoneNumberExist
                setErrors(newErrors)
            } else {
                alert('something went wrong. Please try later!')
            }
        }
    }

    return (
        <div className="onboard_wrapper">
            <div className="f_row">
                <div className="left_col">
                    <SliderComponent></SliderComponent>
                </div>
                <div className="right_col">
                    <figure className="mob_logo hide">
                        <img src={colorLogo} alt="Tickt-logo" />
                    </figure>
                    <div className="onboarding_head">
                        <button className="back_btn"></button>
                        <h1>Verify your number</h1>
                        <ul className="custom_steppr">
                            <li className="active"></li>
                            <li className="active"></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                    <div className="form_wrapper">
                        <form onSubmit={onSubmit}>
                            <span className="show_label"><b>Verification Code</b></span>
                            {/* <div className="otp_input_wrapper">
                                <input type="number" className="sms-no-box" name="ssn-1" maxLength={1} onChange={changeHandler} />
                                <input type="number" className="sms-no-box" name="ssn-2" maxLength={1} onChange={changeHandler} />
                                <input type="number" className="sms-no-box" name="ssn-3" maxLength={1} onChange={changeHandler} />
                                <input type="number" className="sms-no-box" name="ssn-4" maxLength={1} onChange={changeHandler} />
                                <input type="number" className="sms-no-box" name="ssn-5" maxLength={1} onChange={changeHandler} />
                            </div> */}
                            <div>
                                <OtpInput
                                    className="sms-no-box"
                                    value={OTP}
                                    onChange={changeHandler}
                                    numInputs={5}
                                    isInputNum
                                    separator={<span>-</span>}
                                />
                            </div>
                            <div className="form_field">
                                <span className="show_label">We have sent a verification code to your phone.
                          Please check SMS and enter the 5-digit code here.</span>
                            </div>
                            {resendOTP && <div className="form_field text-center">
                                <span className="show_label">Don’t you receive any codes?</span>
                                <a href="#" className="link">Re-send code</a>
                            </div>}
                            {timer > 0 && <div className="form_field text-center">
                                <span className="show_label timer">{timer}</span>
                            </div>}
                            <div className="form_field">
                                <button className="fill_btn">Next</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerifyPhoneNumber

