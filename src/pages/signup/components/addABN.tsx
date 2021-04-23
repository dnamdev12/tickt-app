import { useState } from 'react';
import Constants from '../../../utils/constants';
import regex from '../../../utils/regex';
import { validateABN } from '../../../utils/common';

interface Propstype {
    onSubmitSignup: (data: any) => void,
}

const AddABN = (props: Propstype) => {
    const [errors, setErrors] = useState<any>({});
    const [abn, setAbn] = useState<any>('')

    const changeHandler = (e: any) => {
        if (e.target.value.length > 11) {
            return;
        }
        setAbn(e.target.value)
    }

    const validateForm = () => {
        const newErrors: any = {};
        if (!abn) {
            newErrors.abn = Constants.errorStrings.abnEmpty;
        } else {
            const abnRegex = new RegExp(regex.abn);
            if (!abnRegex.test(abn)) {
                newErrors.abn = Constants.errorStrings.abnErr
            }
            if (!validateABN(abn)) {
                newErrors.abn = Constants.errorStrings.abnErr
            }
        }
        setErrors(newErrors);
        return !Object.keys(newErrors).length;
    }

    const onSubmit = (e: any) => {
        e.preventDefault();
        if (validateForm()) {
            props.onSubmitSignup({ abn })
        }
    }

    return (
        <div className="form_wrapper">
            <form onSubmit={onSubmit}>
                <div className="form_field">
                    <label className="form_label">Australian business number</label>
                    <div className="text_field">
                        <input type="number" placeholder="Enter Australian business number" value={abn} name="abn" onChange={changeHandler} />
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

export default AddABN
