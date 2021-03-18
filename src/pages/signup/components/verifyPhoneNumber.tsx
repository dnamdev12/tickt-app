import React, { useState } from 'react';
import colorLogo from '../../../assets/images/ic-logo-yellow.png';
import SliderComponent from '../../../common/slider-component';
import { verifyOtp } from '../../../redux/auth/actions';
import Messages from '../../../common/Messages';
import globalRegex from '../../../common/globalRegex';

interface Propstype {
    step: number
    history?: any
    signupStepThree: (data: any, step: number) => void,
}

const VerifyPhoneNumber = (props: Propstype) => {
    const [errors, setErrors] = useState({});
    const [otp, setOtp] = useState('');
    const [ssnValues, setValue] = useState({
        ssn1: "",
        ssn2: "",
        ssn3: "",
        ssn4: "",
        ssn5: ''
    });

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { maxLength, value, name } = e.target;
        const [fieldName, fieldIndex] = name.split("-");

        if (value.length === maxLength) {
            if (parseInt(fieldIndex, 10) < 5) {
                setValue((prevValue: any) => ({ ...prevValue, [`ssn${fieldIndex}`]: value }));
                const nextSibling: any = document.querySelector(
                    `input[name=ssn-${parseInt(fieldIndex, 10) + 1}]`
                );
                if (nextSibling !== null) {
                    nextSibling.focus();
                }
            }
        }
        // if(name === 'ssn-5'){
        //     setOtp(Object.values(ssnValues).join(''))
        // }
    }

    console.log()

    const validateForm = () => {
        const newErrors: any = {};
        if (!otp) {
            newErrors.otp = Messages.otpEmpty;
        } else {
            const nameRegex = new RegExp(globalRegex.regex.mobile);
            if (!nameRegex.test(otp)) {
                newErrors.otp = Messages.otpErr
            } else if (nameRegex.test(otp) && otp.length < 5) {
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
            const res: any = await verifyOtp(otp)
            if (res.success && res.message === 'This Mobile Number is Unique') {
                props.signupStepThree(otp, props.step + 1)
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
                            <div className="otp_input_wrapper">
                                <input type="number" className="sms-no-box" name="ssn-1" maxLength={1} onChange={changeHandler} />
                                <input type="number" className="sms-no-box" name="ssn-2" maxLength={1} onChange={changeHandler} />
                                <input type="number" className="sms-no-box" name="ssn-3" maxLength={1} onChange={changeHandler} />
                                <input type="number" className="sms-no-box" name="ssn-4" maxLength={1} onChange={changeHandler} />
                                <input type="number" className="sms-no-box" name="ssn-5" maxLength={1} onChange={changeHandler} />
                            </div>
                            <div className="form_field">
                                <span className="show_label">We have sent a verification code to your phone.
                          Please check SMS and enter the 5-digit code here.</span>
                            </div>
                            <div className="form_field text-center">
                                <span className="show_label">Don’t you receive any codes?</span>
                                <a href="#" className="link">Re-send code</a>
                            </div>
                            <div className="form_field text-center">
                                <span className="show_label timer">0:21</span>
                            </div>
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

