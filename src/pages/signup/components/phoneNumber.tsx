import React, { useState, useEffect } from 'react';
import { checkMobileNumber } from '../../../redux/auth/actions';
import Constants from '../../../utils/constants';
import regex from '../../../utils/regex';
import { setShowToast } from '../../../redux/common/actions';
import NumberFormat from "react-number-format";
interface Propstype {
    updateSteps: (num: number, data: any) => void
    step: number
    history?: any
    mobileNumber: any,
}

const PhoneNumber = (props: Propstype) => {
    const [errors, setErrors] = useState<any>({});
    const [mobileNumb, setMobileNumb] = useState<any>(props.mobileNumber)

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        let inputVal = e.target.value.replaceAll(' ', '');
        console.log(inputVal, inputVal.length, mobileNumb, "okok")

        if (regex.numeric.test(inputVal) || !inputVal) {
            if (inputVal.length === 3) {
                if (inputVal.length == mobileNumb.replaceAll(' ', '').length) {
                    inputVal = inputVal.slice(0, 2);
                    setMobileNumb(inputVal);
                    return;
                } else if (inputVal.length < mobileNumb.replaceAll(' ', '').length) {
                    inputVal = inputVal.slice(0, 3);
                    setMobileNumb(inputVal);
                    return;
                }
            }

            if (inputVal.length >= 3 && inputVal.length < 6) {
                inputVal = inputVal.slice(0, 3) + " " + inputVal.slice(3, inputVal.length);
                setMobileNumb(inputVal);
                return;
            }

            if (inputVal.length === 6) {
                console.log("OK")
                if (inputVal.length == mobileNumb.replaceAll(' ', '').length) {
                    inputVal = inputVal.slice(0, 3) + " " + inputVal.slice(3, 5);
                } else if (inputVal.length < mobileNumb.replaceAll(' ', '').length) {
                    inputVal = inputVal.slice(0, 3) + " " + inputVal.slice(3, 6);
                } else {
                    inputVal = inputVal.slice(0, 3) + " " + inputVal.slice(3, 6) + " ";
                }
                setMobileNumb(inputVal);
                return;
            }
            if (inputVal.length > 6) {
                inputVal = inputVal.slice(0, 3) + " " + inputVal.slice(3, 6) + " " + inputVal.slice(6, inputVal.length);
            }
            setMobileNumb(inputVal)
        }
        // const key = inputVal.charCodeAt(inputVal.length - 1)
        // if ((key == NaN || inputVal == "") && mobileNumber.length === 1) {
        //     setMobileNumber('');
        //     return;
        // }
        // if ((key > 47 && key < 58) || key === 8) {
        //     e.preventDefault();
        //     setMobileNumber(e.target.value)
        // }
    }

    const validateForm = () => {
        const newErrors: any = {};
        if (!mobileNumb) {
            newErrors.mobileNumber = Constants.errorStrings.phoneNumberEmpty;
        } else {
            const phoneRegex = new RegExp(regex.mobile);
            if (!phoneRegex.test(mobileNumb.replaceAll(' ', ''))) {
                newErrors.mobileNumber = Constants.errorStrings.phoneNumberErr
            }
        }
        setErrors(newErrors);
        return !Object.keys(newErrors).length;
    }

    const onSubmit = async (e: any) => {
        e.preventDefault();
        if (validateForm()) {
            const res: any = await checkMobileNumber(mobileNumb.replaceAll(' ', ''))
            res?.isProfileCompleted && setShowToast(true, res.message);
            if (!res.isProfileCompleted && res.success) {
                const mobileNumber = mobileNumb.replaceAll(' ', '');
                props.updateSteps(props.step + 1, { mobileNumber })
            }
        }
    }

    return (
        <div className="form_wrapper">
            <form onSubmit={onSubmit}>
                <div className="form_field">
                    <label className="form_label">Phone Number</label>
                    <div className="text_field">
                        {/* <input type="text" className="detect_input_ltr" placeholder="400 123 456" value={mobileNumb} onChange={changeHandler} maxLength={11} /> */}
                        <NumberFormat
                            type="text"
                            className="detect_input_ltr"
                            placeholder="400 123 456"
                            value={mobileNumb}
                            onValueChange={({ value }) => {
                                setMobileNumb(value);
                            }}
                            format="### ### ###"
                        />
                        <span className="detect_icon_ltr">+61</span>
                    </div>
                    {!!errors.mobileNumber && <span className="error_msg">{errors.mobileNumber}</span>}
                </div>

                <div className="form_field">
                    <button className="fill_btn btn-effect">Next</button>
                </div>
            </form>

        </div>
    )
}

export default PhoneNumber

