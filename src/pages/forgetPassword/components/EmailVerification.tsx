import React, { useState, useEffect } from 'react';
import { checkMobileNumber, verifyOtp } from '../../../redux/auth/actions';
import Constants from '../../../utils/constants';
import regex from '../../../utils/regex';
import { setShowToast } from '../../../redux/common/actions';
import OtpInput from "react-otp-input";

interface Propstype {
    updateSteps: (num: number, data: any) => void
    step: number
    history?: any
    email: any,
}

const PhoneNumber = (props: Propstype) => {
    const [errors, setErrors] = useState<any>({});
    const [counter, setCounter] = useState(Constants.OTP_TIMER);
    const [otp, setOTP] = useState('');

    const changeHandler = (newOtp: any) => {
        setOTP(newOtp)
    }

    const validateForm = () => {
        const newErrors: any = {};
        if (!otp) {
            newErrors.otp = Constants.errorStrings.otpEmpty;
        } else {
            const otpRegex = new RegExp(regex.otp);
            if (!otpRegex.test(otp)) {
                newErrors.otp = Constants.errorStrings.otpIncorrect
            }
        }
        setErrors(newErrors);
        return !Object.keys(newErrors).length;
    }

    const onSubmit = async (e: any) => {
        e.preventDefault();
        if (validateForm()) {
            const data = {
                otp: otp
            }
            const res: any = await verifyOtp(data)
            if (res.success) {
                props.updateSteps(props.step + 1, {
                    email: props.email
                })
            }
        }
    }

    return (
        <div className="form_wrapper">
            <form onSubmit={onSubmit}>
                <div className="form_field">
                    <label className="form_label">
                        {'We have sent a mail with varification link. '}
                    </label>
                    <label className="form_label">
                        {'Please check your email. Tap the link to verify your account and to get started!'}
                    </label>
                </div>


                <div className="form_field">
                    <div className="otp_input_wrapper">
                        <OtpInput
                            className="sms-no-box"
                            inputStyle={{ "width": "48px" }}
                            value={otp}
                            onChange={changeHandler}
                            numInputs={5}
                            isInputNum
                        />
                    </div>
                    {!!errors.otp && <span className="error_msg">{errors.otp}</span>}
                </div>

                <div className="form_field">
                    <span className="show_label">
                        We have sent a verification code to your email. Please check email and enter the 5-digit code here.
                    </span>
                </div>

                <div className="form_field  text-center">
                    <span className="eg">  {'Didn’t receive a mail with link?'} </span>
                    <br />
                    <span className="link"> {'Re-send a mail'}</span>
                </div>

                <div className="form_field">
                    <button className="fill_btn btn-effect">Next</button>
                </div>
            </form>

        </div>
    )
}

export default PhoneNumber

