import React, { useState, useEffect } from 'react';
import colorLogo from '../../../assets/images/ic-logo-yellow.png';
import SliderComponent from '../../../common/slider-component';
import { checkMobileNumber, verifyOtp } from '../../../redux/auth/actions';
import Messages from '../../../common/Messages';
import globalRegex from '../../../common/globalRegex';
import OtpInput from "react-otp-input";

interface Propstype {
    step: number
    history?: any
    signupStepThree: (step: number) => void,
    mobileNumber: string
}

const VerifyPhoneNumber = (props: Propstype) => {
    const [errors, setErrors] = useState<any>({});
    const [counter, setCounter] = useState(10);
    const [OTP, setOTP] = useState('');
    const [resendOTP, setResendOTP] = useState(false)

    const changeHandler = (otp: any) => {
        console.log(otp, 'otp')
        setOTP(otp)
    }

    useEffect(() => {
        const timer: any = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer);
    }, [counter, resendOTP]);

    const validateForm = () => {
        const newErrors: any = {};
        if (!OTP) {
            newErrors.otp = Messages.otpEmpty;
        } else {
            const nameRegex = new RegExp(globalRegex.regex.otp);
            if (!nameRegex.test(OTP)) {
                newErrors.otp = Messages.otpErr
            } else if (nameRegex.test(OTP) && OTP.length < 5) {
                newErrors.otp = Messages.otpIncorrect
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
            const data = {
                otp: OTP
            }
            const res: any = await verifyOtp(data)
            if (res.success && res.message === 'OTP verified successfully') {
                props.signupStepThree(props.step + 1)
            } else {
                alert('wrong OTP')
            }
        }
    }

    const resendHandler = async (e: any) => {
        e.preventDefault()
        setResendOTP(true)
        setCounter(10)
        const res: any = await checkMobileNumber(props.mobileNumber)
        console.log(res, "resend Clicked")
        if (!res.success) {
            alert('something went wrong. Please try later!')
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
                            <div className="otp_input_wrapper">
                                <OtpInput
                                    className="sms-no-box"
                                    value={OTP}
                                    onChange={changeHandler}
                                    numInputs={5}
                                    isInputNum
                                    separator={<span>-</span>}
                                />
                            </div>
                            {!!errors.otp &&<span className="error_msg">{errors.otp}</span>}
                            <div className="form_field">
                                <span className="show_label">We have sent a verification code to your phone.
                          Please check SMS and enter the 5-digit code here.</span>
                            </div>
                            {counter === 0 && <div className="form_field text-center">
                                <span className="show_label">Don’t you receive any codes?</span>
                                <a href="#" className="link" onClick={resendHandler}>Re-send code</a>
                            </div>}
                            {counter > 0 && <div className="form_field text-center">
                                <span className="show_label timer">{counter}</span>
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

