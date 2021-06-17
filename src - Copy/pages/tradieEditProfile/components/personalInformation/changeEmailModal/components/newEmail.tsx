import React, { useState } from 'react';
import Constants from '../../../../../../utils/constants';
import regex from '../../../../../../utils/regex';
import { tradieChangeEmail } from '../../../../../../redux/profile/actions';

import eyeIconClose from '../../../../../../assets/images/icon-eye-closed.png';
import eyeIconOpen from '../../../../../../assets/images/icon-eye-open.png';
import cancel from "../../../../../../assets/images/ic-cancel.png";

interface PropsTypes {
    currentEmail: string,
    newEmail: string,
    currentPassword: string,
    updateSteps: (step: number, newData?: any) => void,
    backButtonHandler: () => void,
    closeModalHandler: () => void,
}

const NewEmail = (props: PropsTypes) => {
    const [errors, setErrors] = useState<any>({});
    const [newEmail, setNewEmail] = useState<string>(props.newEmail);
    const [password, setPassword] = useState<string>(props.currentPassword);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const validateChangeEmailForm = () => {
        const newErrors: any = {};
        if (!newEmail) {
            newErrors.newEmail = Constants.errorStrings.emailEmpty;
        } else {
            const emailRegex = new RegExp(regex.email);
            if (!emailRegex.test(newEmail)) {
                newErrors.newEmail = Constants.errorStrings.emailErr;
            }
        }

        if (!password) {
            newErrors.currentPassword = Constants.errorStrings.password;
        } else {
            const passwordRegex = new RegExp(regex.password);
            if (!passwordRegex.test(password.trim())) {
                newErrors.currentPassword = Constants.errorStrings.passwordError;
            }
        }

        setErrors({ errors: newErrors });
        return !Object.keys(newErrors).length;
    }

    const changeEmailHandler = async () => {
        if (validateChangeEmailForm()) {
            const data = {
                currentEmail: props.currentEmail,
                newEmail: newEmail,
                password: password,
                user_type: 1
            }
            const res = await tradieChangeEmail(data);
            if (res?.success) {
                props.updateSteps(2);
            }
        }
    }

    return (
        <>
            <div className="heading form_field">
                <div className="relate">
                    <button className="back" onClick={props.backButtonHandler}></button>
                    <div className="md_heading">
                        <span className="sub_title">Change email</span>
                        <span className="show_label">Enter your password too and we will send you message to verify new email</span>
                    </div>
                </div>
                <button className="close_btn" onClick={props.closeModalHandler}>
                    <img src={cancel} alt="cancel" />
                </button>
            </div>
            <div className="inner_wrap">
                <div className="inner_wrappr">
                    <div className="form_field">
                        <label className="form_label">New Email</label>
                        <div className="text_field">
                            <input type="text" placeholder="Enter New Email" value={newEmail} name='newEmail' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewEmail(e.target.value)} />
                        </div>
                        {!!errors?.newEmail && <span className="error_msg">{errors?.newEmail}</span>}
                    </div>
                    <div className="form_field">
                        <label className="form_label">Current Password</label>
                        <div className="text_field">
                            <input type={showPassword ? 'text' : 'password'} className="detect_input" placeholder="Enter Current Password" name='password' value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                            <span className="detect_icon" onClick={() => setShowPassword(!showPassword)}>
                                <img src={showPassword ? eyeIconOpen : eyeIconClose} />
                            </span>
                        </div>
                        {!!errors?.currentPassword && <span className="error_msg">{errors?.currentPassword}</span>}
                    </div>
                </div>
            </div>
            <div className="bottom_btn custom_btn">
                <button className="fill_btn full_btn btn-effect" onClick={changeEmailHandler}>Next</button>
            </div>
        </>
    )
}

export default NewEmail;
