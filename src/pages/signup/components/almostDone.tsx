import { useState, useEffect } from 'react';
import colorLogo from '../../../assets/images/ic-logo-yellow.png';
import SliderComponent from '../../../common/slider-component';
import Constants from '../../../utils/constants';
import regex from '../../../utils/regex'

interface Propstype {
    updateSteps: (num: number) => void
    step: number
    signupStepSeven: (data: any, step: number) => void,
}

const AlmostDone = (props: Propstype) => {
    const [errors, setErrors] = useState<any>({});
    const [almostDoneData, setAlmostDoneData] = useState<any>({
        companyName: '',
        position: '',
        abn: '',
    })

    const backButtonHandler = () => {
        props.updateSteps(props.step - 1)
    }

    const changeHandler = (e: any) => {
        setAlmostDoneData((prevData: any) => ({ ...prevData, [e.target.name]: e.target.value }))
    }

    const validateForm = () => {
        const newErrors: any = {};
        if (!almostDoneData.companyName) {
            newErrors.firstName = Constants.errorStrings.companyNameEmpty;
        } else {
            const nameRegex = new RegExp(regex.fullname);
            if (almostDoneData.companyName.length < 3) {
                newErrors.companyName = Constants.errorStrings.companyNameShortErr
            } else if (!nameRegex.test(almostDoneData.firstName)) {
                newErrors.companyName = Constants.errorStrings.companyNameErr
            }
        }
        if (!almostDoneData.position) {
            newErrors.position = Constants.errorStrings.positionNameEmpty;
        } else {
            const emailRegex = new RegExp(regex.fullname);
            if (almostDoneData.position.length < 3) {
                newErrors.position = Constants.errorStrings.positionNameShortErr
            } else if (!emailRegex.test(almostDoneData.position)) {
                newErrors.position = Constants.errorStrings.positionNameErr;
            }
        }

        if (!almostDoneData.abn) {
            newErrors.abn = Constants.errorStrings.abnEmpty;
        } else {
            const nameRegex = new RegExp(regex.abn);
            if (!nameRegex.test(almostDoneData.abn)) {
                newErrors.abn = Constants.errorStrings.abnErr
            }
        }
        setErrors(newErrors);
        return !Object.keys(newErrors).length;
    }

    const onSubmit = (e: any) => {
        e.preventDefault();
        if (validateForm()) {
            props.signupStepSeven(almostDoneData, props.step + 1)
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
                        <button className="back_btn" onClick={backButtonHandler}/>
                        <h1>Almost done</h1>
                        <ul className="custom_steppr">
                            <li className="active"></li>
                            <li className="active"></li>
                            <li className="active"></li>
                            <li className="active"></li>
                            <li className="active"></li>
                            <li className="active"></li>
                            <li className="active"></li>
                            <li></li>
                        </ul>
                    </div>
                    <div className="form_wrapper">
                        <form onSubmit={onSubmit}>
                            <div className="form_field">
                                <label className="form_label">Company Name</label>
                                <div className="text_field">
                                    <input type="text" placeholder="Enter company name" value={almostDoneData.companyName} name="companyName" onChange={changeHandler}/>
                                </div>
                                {!!errors.companyName && <span className="error_msg">{errors.companyName}</span>}
                            </div>

                            <div className="form_field">
                                <label className="form_label">Your Position</label>
                                <div className="text_field">
                                    <input type="text" placeholder="Enter your position" value={almostDoneData.position} name="position" onChange={changeHandler}/>
                                </div>
                                {!!errors.position && <span className="error_msg">{errors.position}</span>}
                            </div>

                            <div className="form_field">
                                <label className="form_label">Australian Business Number</label>
                                <div className="text_field">
                                    <input type="number" placeholder="Enter australian business number" value={almostDoneData.abn} name="abn" onChange={changeHandler} />
                                </div>
                                {!!errors.abn && <span className="error_msg">{errors.abn}</span>}
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

export default AlmostDone
