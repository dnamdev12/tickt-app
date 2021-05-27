import { useState } from 'react';
import Constants from '../../../utils/constants';
import regex from '../../../utils/regex';
import { validateABN } from '../../../utils/common';

interface Propstype {
    onSubmitSignup: (data: any) => void,
}

const AlmostDone = (props: Propstype) => {
    const [errors, setErrors] = useState<any>({});
    const [almostDoneData, setAlmostDoneData] = useState<any>({
        company_name: '',
        position: '',
        abn: '',
    })

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAlmostDoneData((prevData: any) => ({ ...prevData, [e.target.name]: e.target.value }))
    }

    const abnHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        let inputVal = e.target.value.replaceAll(' ', '');
        if (regex.numeric.test(inputVal) || !inputVal) {
            if (inputVal.length === 2) {
                if (inputVal.length < almostDoneData.abn.replaceAll(' ', '').length) {
                    inputVal = inputVal.slice(0, 2);
                    setAlmostDoneData((prevData: any) => ({ ...prevData, [e.target.name]: inputVal }))
                    return;
                } else if (inputVal.length == almostDoneData.abn.replaceAll(' ', '').length) {
                    inputVal = inputVal.slice(0, 1);
                    setAlmostDoneData((prevData: any) => ({ ...prevData, [e.target.name]: inputVal }))
                    return;
                }
            }

            if (inputVal.length >= 2 && inputVal.length < 5) {
                inputVal = inputVal.slice(0, 2) + " " + inputVal.slice(2, inputVal.length);
                setAlmostDoneData((prevData: any) => ({ ...prevData, [e.target.name]: inputVal }))
                return;
            }

            if (inputVal.length === 5) {
                if (inputVal.length == almostDoneData.abn.replaceAll(' ', '').length) {
                    inputVal = inputVal.slice(0, 2) + " " + inputVal.slice(2, 4);
                } else if (inputVal.length < almostDoneData.abn.replaceAll(' ', '').length) {
                    inputVal = inputVal.slice(0, 2) + " " + inputVal.slice(2, 5);
                } else {
                    inputVal = inputVal.slice(0, 2) + " " + inputVal.slice(2, 5) + " ";
                }
                setAlmostDoneData((prevData: any) => ({ ...prevData, [e.target.name]: inputVal }))
                return;
            }

            if (inputVal.length === 8) {
                if (inputVal.length == almostDoneData.abn.replaceAll(' ', '').length) {
                    inputVal = inputVal.slice(0, 2) + " " + inputVal.slice(2, 5) + " " + inputVal.slice(5, 7);
                } else if (inputVal.length < almostDoneData.abn.replaceAll(' ', '').length) {
                    inputVal = inputVal.slice(0, 2) + " " + inputVal.slice(2, 5) + " " + inputVal.slice(5, 8);
                } else {
                    inputVal = inputVal.slice(0, 2) + " " + inputVal.slice(2, 5) + " " + inputVal.slice(5, 8) + " ";
                }
                setAlmostDoneData((prevData: any) => ({ ...prevData, [e.target.name]: inputVal }))
                return;
            }

            if (inputVal.length > 5 && inputVal.length < 8) {
                inputVal = inputVal.slice(0, 2) + " " + inputVal.slice(2, 5) + " " + inputVal.slice(5, inputVal.length);
                setAlmostDoneData((prevData: any) => ({ ...prevData, [e.target.name]: inputVal }))
                return;
            }

            if (inputVal.length > 8) {
                inputVal = inputVal.slice(0, 2) + " " + inputVal.slice(2, 5) + " " + inputVal.slice(5, 8) + " " + inputVal.slice(8, inputVal.length);
            }
            setAlmostDoneData((prevData: any) => ({ ...prevData, [e.target.name]: inputVal }))
        }
    }

    const validateForm = () => {
        const newErrors: any = {};
        if (!almostDoneData.company_name) {
            newErrors.company_name = Constants.errorStrings.companyNameEmpty;
        } else {
            const nameRegex = new RegExp(regex.fullname);
            if (!nameRegex.test(almostDoneData.company_name.trim())) {
                newErrors.company_name = Constants.errorStrings.companyNameErr;
            }
        }
        if (!almostDoneData.position) {
            newErrors.position = Constants.errorStrings.positionNameEmpty;
        } else {
            const positionRegex = new RegExp(regex.fullname);
            if (!positionRegex.test(almostDoneData.position.trim())) {
                newErrors.position = Constants.errorStrings.positionNameErr;
            }
        }

        if (!almostDoneData.abn) {
            newErrors.abn = Constants.errorStrings.abnEmpty;
        } else {
            const abnRegex = new RegExp(regex.abn);
            if (!abnRegex.test(almostDoneData.abn.replaceAll(' ', ''))) {
                newErrors.abn = Constants.errorStrings.abnErr
            }
            if (!validateABN(almostDoneData.abn.replaceAll(' ', ''))) {
                newErrors.abn = Constants.errorStrings.abnErr
            }
        }
        setErrors(newErrors);
        return !Object.keys(newErrors).length;
    }

    const onSubmit = (e: any) => {
        e.preventDefault();
        if (validateForm()) {
            var newAlmostData = almostDoneData;
            newAlmostData.abn = newAlmostData.abn.replaceAll(' ', '');
            console.log(newAlmostData, "newAlmostData");
            props.onSubmitSignup(newAlmostData)
        }
    }

    return (
        <div className="form_wrapper">
            <form onSubmit={onSubmit}>
                <div className="form_field">
                    <label className="form_label">Company Name</label>
                    <div className="text_field">
                        <input type="text" placeholder="Enter Company Name" value={almostDoneData.company_name} name="company_name" onChange={changeHandler} />
                    </div>
                    {!!errors.company_name && <span className="error_msg">{errors.company_name}</span>}
                </div>

                <div className="form_field">
                    <label className="form_label">Your Position</label>
                    <div className="text_field">
                        <input type="text" placeholder="Enter Position" value={almostDoneData.position} name="position" onChange={changeHandler} />
                    </div>
                    {!!errors.position && <span className="error_msg">{errors.position}</span>}
                </div>

                <div className="form_field">
                    <label className="form_label">Australian Business Number</label>
                    <div className="text_field">
                        {/* <input type="number" placeholder="Enter australian business number" value={almostDoneData.abn} name="abn" onChange={changeHandler} /> */}
                        <input type="text" placeholder="51 824 753 556" value={almostDoneData.abn} name="abn" onChange={abnHandler} maxLength={14} />
                    </div>
                    {!!errors.abn && <span className="error_msg">{errors.abn}</span>}
                </div>

                <div className="form_field">
                    <button className="fill_btn btn-effect">Next</button>
                </div>
            </form>
        </div>
    )
}

export default AlmostDone
