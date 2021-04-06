import React, { useState, useEffect } from 'react';
import { checkMobileNumber } from '../../../redux/auth/actions';
import Constants from '../../../utils/constants';
import regex from '../../../utils/regex';
import { setShowToast } from '../../../redux/common/actions';
interface Propstype {
    updateSteps: (num: number, data: any) => void
    step: number
    history?: any
    mobileNumber: any,
}

const PhoneNumber = (props: Propstype) => {
    const [errors, setErrors] = useState<any>({});
    const [mobileNumber, setMobileNumber] = useState<any>(props.mobileNumber)

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length < 10) {
            setMobileNumber(e.target.value)
        }
    }

    const validateForm = () => {
        const newErrors: any = {};
        if (!mobileNumber) {
            newErrors.mobileNumber = Constants.errorStrings.phoneNumberEmpty;
        } else {
            const nameRegex = new RegExp(regex.mobile);
            if (!nameRegex.test(mobileNumber)) {
                newErrors.mobileNumber = Constants.errorStrings.phoneNumberErr
            }
        }
        setErrors(newErrors);
        return !Object.keys(newErrors).length;
    }

    const onSubmit = async (e: any) => {
        e.preventDefault();
        if (validateForm()) {
            const res: any = await checkMobileNumber(mobileNumber)
            res?.isProfileCompleted && setShowToast(true, res.message);
            if (!res.isProfileCompleted) {
                props.updateSteps(props.step + 1, { mobileNumber })
            }
        }
    }

    return (
        <div className="form_wrapper">
            <form onSubmit={onSubmit}>
                <div className="form_field">
                    <label className="form_label">Phone number</label>
                    <div className="text_field">
                        <input type="number" className="detect_input_ltr" placeholder="Enter your Phone number" value={mobileNumber} onChange={changeHandler} maxLength={10} />
                        <span className="detect_icon_ltr">+61</span>
                    </div>
                    {!!errors.mobileNumber && <span className="error_msg">{errors.mobileNumber}</span>}
                </div>

                <div className="form_field">
                    <button className="fill_btn">Next</button>
                </div>
            </form>

        </div>
    )
}

export default PhoneNumber

