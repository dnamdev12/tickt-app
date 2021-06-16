import React, { useState, useEffect } from 'react';
import Constants from '../../../../../utils/constants';
import regex from '../../../../../utils/regex';
import { tradieChangeEmail } from '../../../../../redux/profile/actions';
import { callForgotPassword, verifyOtp } from '../../../../../redux/auth/actions';
import OtpInput from "react-otp-input";

interface PropsTypes {
    currentEmail: string,
    newEmail: string,
    currentPassword: string,
    updateSteps: (step: number, newData?: any) => void,
    backButtonHandler: () => void,
}

const VerifyNewEmail = (props: PropsTypes) => {
    const [errors, setErrors] = useState<any>({});
    const [counter, setCounter] = useState(Constants.OTP_TIMER);
    const [otp, setOTP] = useState('');

    const changeHandler = (newOtp: any) => {
        setOTP(newOtp);
    }

    useEffect(() => {
        const timer: any = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer);
    }, [counter]);

    const validateForm = () => {
        const newErrors: any = {};
        if (!otp) {
            newErrors.otp = Constants.errorStrings.otpEmpty;
        } else {
            const otpregex = new RegExp(regex.otp);
            if (!otpregex.test(otp)) {
                newErrors.otp = Constants.errorStrings.otpIncorrect;
            }
        }
        setErrors(newErrors);
        return !Object.keys(newErrors).length;
    }

    const resendHandler = async (e: any) => {
        e.preventDefault()
        const data = {
            currentEmail: props.currentEmail,
            newEmail: props.newEmail,
            password: props.currentPassword,
            user_type: 1
        }
        const res = await tradieChangeEmail(data);
        if (res.success) {
            setCounter(Constants.OTP_TIMER);
        }
    }

    const onSubmit = async (e: any) => {
        e.preventDefault();
        if (validateForm()) {
            alert('success page started!!!');
            const data = {
                otp: otp
            }
            const res: any = await verifyOtp(data)
            if (res.success) {
                alert('verify otp started!!!');
                return;
                props.updateSteps(3);
            }
        }
    }

    return (
        <>
            <div className="heading form_field">
                <div className="relate">
                    <button className="back" onClick={props.backButtonHandler}></button>
                    <div className="md_heading">
                        <span className="sub_title">Verify your email</span>
                    </div>
                </div>
            </div>
            <div className="inner_wrap">
                <div className="form_wrapper">
                    <form onSubmit={onSubmit}>
                        <span className="show_label">Verification Code</span>
                        <div className="form_field">
                            <div className="otp_input_wrapper">
                                <OtpInput
                                    className="sms-no-box"
                                    inputStyle={{ "width": "48px" }}
                                    value={otp}
                                    onChange={changeHandler}
                                    numInputs={5}
                                    isInputNum
                                //separator={<span>-</span>}
                                />
                            </div>
                            {!!errors.otp && <span className="error_msg">{errors.otp}</span>}
                        </div>
                        <div className="form_field">
                            <span className="show_label">We have sent a verification code to your phone.
                                Please check SMS and enter the 5-digit code here.</span>
                        </div>
                        {counter === 0 && <div className="form_field text-center">
                            <span className="show_label">Don’t you receive any codes?</span>
                            <a href="#" className="link" onClick={resendHandler}>Re-send code</a>
                        </div>}
                        {counter > 0 && <div className="form_field text-center">
                            <span className="show_label timer">{counter > 59 ? `01 : 00` : `00 : ${counter}`}</span>
                        </div>}
                        <div className="form_field">
                            <button className="fill_btn btn-effect">Next</button>
                        </div>
                    </form>
                </div>
            </div>
            {/* <div className="bottom_btn custom_btn">
                <button className="fill_btn full_btn btn-effect">Next</button>
            </div> */}
        </>
    )
}

export default VerifyNewEmail;
