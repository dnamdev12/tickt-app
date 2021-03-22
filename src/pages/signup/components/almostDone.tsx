import { useState } from 'react';
import Constants from '../../../utils/constants';
import regex from '../../../utils/regex'

interface Propstype {
    onSubmitSignup: (data: any) => void
}

const AlmostDone = (props: Propstype) => {
    const [errors, setErrors] = useState<any>({});
    const [almostDoneData, setAlmostDoneData] = useState<any>({
        companyName: '',
        position: '',
        abn: '',
    })

    const changeHandler = (e: any) => {
        if (e.target.name === 'abn' && e.target.value.length > 12) {
            return;
        }
        setAlmostDoneData((prevData: any) => ({ ...prevData, [e.target.name]: e.target.value }))
    }

    const validateForm = () => {
        const newErrors: any = {};
        if (!almostDoneData.companyName) {
            newErrors.companyName = Constants.errorStrings.companyNameEmpty;
        } else {
            const nameRegex = new RegExp(regex.fullname);
            if (almostDoneData.companyName.length < 3) {
                newErrors.companyName = Constants.errorStrings.companyNameShortErr
            } else if (!nameRegex.test(almostDoneData.companyName)) {
                newErrors.companyName = Constants.errorStrings.companyNameErr
            }
        }
        if (!almostDoneData.position) {
            newErrors.position = Constants.errorStrings.positionNameEmpty;
        } else {
            const positionRegex = new RegExp(regex.fullname);
            if (almostDoneData.position.length < 3) {
                newErrors.position = Constants.errorStrings.positionNameShortErr
            } else if (!positionRegex.test(almostDoneData.position)) {
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
            props.onSubmitSignup(almostDoneData)
        }
    }

    return (
        <div className="form_wrapper">
            <form onSubmit={onSubmit}>
                <div className="form_field">
                    <label className="form_label">Company Name</label>
                    <div className="text_field">
                        <input type="text" placeholder="Enter company name" value={almostDoneData.companyName} name="companyName" onChange={changeHandler} />
                    </div>
                    {!!errors.companyName && <span className="error_msg">{errors.companyName}</span>}
                </div>

                <div className="form_field">
                    <label className="form_label">Your Position</label>
                    <div className="text_field">
                        <input type="text" placeholder="Enter your position" value={almostDoneData.position} name="position" onChange={changeHandler} />
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
        </div>
    )
}

export default AlmostDone
