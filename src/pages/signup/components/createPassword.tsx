import { useState } from 'react';
import eyeIconClose from '../../../assets/images/icon-eye-closed.png';
import eyeIconOpen from '../../../assets/images/icon-eye-open.png';
import Constants from '../../../utils/constants';
import regex from '../../../utils/regex'


interface Propstype {
    updateSteps: (num: number, data: any) => void
    step: number
    history?: any
    password: any,
}

const CreatePassword = (props: Propstype) => {
    const [errors, setErrors] = useState<any>({});
    const [password, setPassword] = useState<any>(props.password)
    const [showPassword, setShowPassword] = useState(false)

    const changeHandler = (e: any) => {
        setPassword(e.target.value)
    }

    const validateForm = () => {
        const newErrors: any = {};
        if (!password) {
            newErrors.password = Constants.errorStrings.password;
        } else {
            const nameRegex = new RegExp(regex.password);
            if (!nameRegex.test(password)) {
                newErrors.password = Constants.errorStrings.passwordInValid
            }
        }
        setErrors(newErrors);
        return !Object.keys(newErrors).length;
    }

    const onSubmit = async (e: any) => {
        e.preventDefault();
        if (validateForm()) {
            props.updateSteps(props.step + 1, {password})
        }
    }

    return (
        <div className="form_wrapper">
            <form onSubmit={onSubmit}>
                <div className="form_field">
                    <label className="form_label">Password</label>
                    <div className="text_field">
                        <input type={showPassword ? 'text' : 'password'} className="detect_input" value={password} placeholder="Enter password" onChange={changeHandler} />
                        <span className="detect_icon" onClick={() => setShowPassword(!showPassword)}><img src={showPassword ? eyeIconOpen : eyeIconClose} /></span>
                    </div>
                    {!!errors.password && <span className="error_msg">{errors.password}</span>}
                </div>

                <div className="form_field">
                    <button className="fill_btn">Next</button>
                </div>
            </form>
        </div>
    )
}

export default CreatePassword
