import React, { useState } from 'react';
import colorLogo from '../../../assets/images/ic-logo-yellow.png';
import SliderComponent from '../../../common/slider-component';
import { createPassword } from '../../../redux/auth/actions';
import Messages from '../../../common/Messages';
import globalRegex from '../../../common/globalRegex'


interface Propstype {
    step: number
    history?: any
    signupStepFour: (data: any, step: number) => void,
}

const CreatePassword = (props: Propstype) => {
    const [errors, setErrors] = useState<any>({});
    const [createPassword, setCreatePassword] = useState<any>(null)

    const changeHandler = (e: any) => {
        setCreatePassword((prevData: any) => ({ ...prevData, [e.target.name]: e.target.value }))
    }

    const validateForm = () => {
        const newErrors: any = {};
        if (!createPassword) {
            newErrors.firstName = Messages.password;
        } else {
            const nameRegex = new RegExp(globalRegex.regex.password);
            if (!nameRegex.test(createPassword)) {
                newErrors.createPassword = Messages.passwordErr
            } else if (nameRegex.test(createPassword) && createPassword.length < 8) {
                newErrors.createPassword = Messages.passwordLengthErr
            }
        }
        setErrors(newErrors);
        return !Object.keys(newErrors).length;
    }

    const onSubmit = async (e: any) => {
        e.preventDefault();
        if (validateForm()) {
            const res: any = await createPassword(createPassword)
            if (res.success && res.message === 'This Email Id is Unique') {
                //props.signupStepFour(createPassword.step + 1)
            } else if (res.success && res.message === 'This Email Id is already in use') {
                let newErrors: any = {}
                newErrors.email = Messages.emailExist
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
                        <h1>Create password</h1>
                    </div>
                    <div className="form_wrapper">
                        <form>
                            <div className="form_field">
                                <label className="form_label">Password</label>
                                <div className="text_field">
                                    <input type="password" className="detect_input" placeholder="Enter password" />
                                    <span className="detect_icon">
                                    </span>
                                </div>
                                <span className="error_msg"></span>
                            </div>

                            <div className="form_field">
                                <button className="fill_btn">Next</button>
                            </div>
                        </form>
                        <div className="form_field hide text-center">
                            <span className="reg">No account? <a className="link">Sign
                        up</a></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePassword
