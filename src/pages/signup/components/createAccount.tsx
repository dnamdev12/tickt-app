import { useState } from 'react';
import { Link } from 'react-router-dom';
import gmail from '../../../assets/images/ic-google.png';
import linkedin from '../../../assets/images/ic-linkedin.png';
import apple from '../../../assets/images/ic-apple.png';
import { checkEmailId } from '../../../redux/auth/actions';
import Constants from '../../../utils/constants';
import regex from '../../../utils/regex';
import SocialAuth from "../../../common/auth/socialAuth";
interface Propstype {
    updateSteps: (num: number, data: any) => void,
    step: number,
    history?: any,
    data: any,
    onNewAccount: Function,
}

const CreateAccount = (props: Propstype) => {
    const [errors, setErrors] = useState<any>({});
    const [signupData, setSignupData] = useState<any>({
        firstName: props.data.firstName,
        email: props.data.email,
        tnc: false,
    })

    const changeHandler = (e: any) => {
        setSignupData((prevData: any) => ({ ...prevData, [e.target.name]: e.target.value }))
    }

    const tncHandler = () => {
        setSignupData((prevData: any) => ({ ...prevData, tnc: !prevData.tnc }))
    }

    const validateForm = () => {
        const newErrors: any = {};
        if (!signupData.firstName.trim()) {
            newErrors.firstName = Constants.errorStrings.fullNameEmpty;
        } else {
            const nameRegex = new RegExp(regex.fullname);
            if (!nameRegex.test(signupData.firstName.trim())) {
                newErrors.firstName = Constants.errorStrings.fullNameErr
            }
        }
        if (!signupData.email) {
            newErrors.email = Constants.errorStrings.emailEmpty;
        } else {
            const emailRegex = new RegExp(regex.email);
            if (!emailRegex.test(signupData.email)) {
                newErrors.email = Constants.errorStrings.emailErr;
            }
        }
        if (!signupData.tnc) {
            newErrors.tnc = Constants.errorStrings.tncEmpty;
        }
        setErrors(newErrors);
        return !Object.keys(newErrors).length;
    }

    const onSubmit = async (e: any) => {
        const data = { ...signupData };
        delete data.tnc;
        e.preventDefault();
        if (validateForm()) {
            const res: any = await checkEmailId(signupData.email)
            if (res.success) {
                props.updateSteps(props.step + 1, data)
            }
        }
    }

    return (
        <div className="form_wrapper">
            <form onSubmit={onSubmit}>
                <div className="form_field">
                    <label className="form_label">Full Name</label>
                    <div className="text_field">
                        <input placeholder="Enter your Full Name" value={signupData.firstName} name="firstName" onChange={changeHandler} />
                    </div>
                    {!!errors.firstName && <span className="error_msg">{errors.firstName}</span>}
                </div>

                <div className="form_field">
                    <label className="form_label">Email</label>
                    <div className="text_field">
                        <input className="detect_input" name="email" value={signupData.email}
                            placeholder="Enter your Email" onChange={changeHandler} />
                    </div>
                    {!!errors.email && <span className="error_msg">{errors.email}</span>}
                </div>


                <div className="form_field">
                    <div className="checkbox_wrap agree_check">
                        <input className="filter-type filled-in" type="checkbox" name="tnc" id="tnc"
                            checked={signupData.tnc} onChange={tncHandler} />
                        <label htmlFor="tnc">I agree to </label>
                        <a href="https://ticktdevapi.appskeeper.in/privacyPolicy" target="_blank" rel="noopener" className="link">Privacy Policy</a>
                        <label className="and">&nbsp;and&nbsp;</label>
                        <a href="https://ticktdevapi.appskeeper.in/tnc" target="_blank" rel="noopener" className="link m-l-30">Terms &amp; Conditions</a>
                    </div>
                    {!!errors.tnc && <span className="error_msg">{errors.tnc}</span>}
                </div>
                <div className="form_field">
                    <button type="submit" className="fill_btn">Sign up</button>
                </div>
                <span className="show_label text-center">or continue with</span>
                <SocialAuth onNewAccount={props.onNewAccount}
                    history={props.history} />
                <div className="form_field hide text-center">
                    <span className="reg">Have an account? <Link to="/login" className="link">Sign in</Link></span>
                </div>

            </form>
        </div>
    )
}

export default CreateAccount
