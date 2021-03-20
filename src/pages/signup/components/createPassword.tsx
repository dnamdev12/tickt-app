import React, { useState, useEffect } from 'react';
import colorLogo from '../../../assets/images/ic-logo-yellow.png';
import eyeIconClose from '../../../assets/images/icon-eye-closed.png';
import eyeIconOpen from '../../../assets/images/icon-eye-open.png';
import SliderComponent from '../../../common/slider-component';
import Constants from '../../../utils/constants';
import regex from '../../../utils/regex'


interface Propstype {
    updateSteps: (num: number) => void
    step: number
    history?: any
    signupStepFour: (data: any, step: number) => void,
    password: any,
}

const CreatePassword = (props: Propstype) => {
    const [errors, setErrors] = useState<any>({});
    const [createPassword, setCreatePassword] = useState<any>(props.password)
    const [showPassword, setShowPassword] = useState(false)

    const backButtonHandler = () => {
        props.updateSteps(props.step - 2)
    }

    const changeHandler = (e: any) => {
        setCreatePassword(e.target.value)
    }

    const validateForm = () => {
        const newErrors: any = {};
        if (!createPassword) {
            newErrors.createPassword = Constants.errorStrings.password;
        } else {
            const nameRegex = new RegExp(regex.password);
            if (createPassword.length < 8) {
                newErrors.createPassword = Constants.errorStrings.passwordLengthErr
            } else if (!nameRegex.test(createPassword)) {
                newErrors.createPassword = Constants.errorStrings.passwordErr
            }
        }
        setErrors(newErrors);
        return !Object.keys(newErrors).length;
    }

    const onSubmit = async (e: any) => {
        e.preventDefault();
        if (validateForm()) {
            props.signupStepFour(createPassword, props.step + 1)
        }
    }

    return (
        <div className="onboard_wrapper">
            <div className="f_row">
                <div className="left_col">
                    <SliderComponent />
                </div>
                <div className="right_col">
                    <figure className="mob_logo hide">
                        <img src={colorLogo} alt="Tickt-logo" />
                    </figure>
                    <div className="onboarding_head">
                        <button className="back_btn" onClick={backButtonHandler} />
                        <h1>Create password</h1>
                        <ul className="custom_steppr">
                            <li className="active"></li>
                            <li className="active"></li>
                            <li className="active"></li>
                            <li className="active"></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                    <div className="form_wrapper">
                        <form onSubmit={onSubmit}>
                            <div className="form_field">
                                <label className="form_label">Password</label>
                                <div className="text_field">
                                    <input type={showPassword ? 'text' : 'password'} className="detect_input" value={createPassword} placeholder="Enter password" onChange={changeHandler} />
                                    <span className="detect_icon" onClick={() => setShowPassword(!showPassword)}><img src={showPassword ? eyeIconOpen : eyeIconClose}/></span>
                                </div>
                                {!!errors.createPassword && <span className="error_msg">{errors.createPassword}</span>}
                            </div>

                            <div className="form_field">
                                <button className="fill_btn">Next</button>
                            </div>
                        </form>
                        <div className="form_field hide text-center">
                            <span className="reg">No account? <a className="link">Signup</a></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePassword
