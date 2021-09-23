import React, { useState, useEffect } from 'react';
import { callForgotPassword } from '../../../redux/auth/actions';
import Constants from '../../../utils/constants';
import regex from '../../../utils/regex'
import { checkEmailId } from '../../../redux/auth/actions';
import { setShowToast } from '../../../redux/common/actions';
interface Propstype {
    updateSteps: (num: number, data: any) => void
    step: number
    history?: any
    emailAddress?: any,
}

const ResetPassword = (props: Propstype) => {
    const [errors, setErrors] = useState<any>({});
    const [email, setEmail] = useState<any>('')

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        let inputVal = e.target.value.replaceAll(' ', '');
        setEmail(inputVal)
    }

    const validateForm = () => {
        const newErrors: any = {};
        if (!email) {
            newErrors.email = Constants.errorStrings.emailEmpty;
        } else {
            const nameRegex = new RegExp(regex.email);
            if (!nameRegex.test(email.replaceAll(' ', ''))) {
                newErrors.email = Constants.errorStrings.emailErr
            }
        }
        setErrors(newErrors);
        return !Object.keys(newErrors).length;
    }

    const onSubmit = async (e: any) => {
        e.preventDefault();
        if (validateForm()) {
            const data: any = {
                email: email.replaceAll(' ', '')
            }
            // const checkIfExist = await checkEmailId(data.email, true);
            // if (checkIfExist?.success) {
                const res: any = await callForgotPassword(data)
                if (res.success) {
                    const email_ = email.replaceAll(' ', '');
                    props.updateSteps(props.step + 1, { email: email_ })
                }
            // } else {
            //     setShowToast(true, 'Email not exist.')
            // }
        }
    }

    return (
        <div className="form_wrapper">
            <form onSubmit={onSubmit}>
                <div className="form_field">
                    <label className="form_label">Email</label>
                    <div className="text_field">
                        <input
                            className="detect_input"
                            name="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={changeHandler}
                        />
                        {/* <span className="detect_icon_ltr">+61</span> */}
                    </div>
                    {!!errors.email && <span className="error_msg">{errors.email}</span>}
                </div>

                <div className="form_field">
                    <span className="show_label">
                        Enter the email associated with your account and we will send a code to reset your password.
                    </span>
                </div>
                <div className="form_field">
                    <button className="fill_btn btn-effect">Next</button>
                </div>
            </form>

        </div>
    )
}

export default ResetPassword
