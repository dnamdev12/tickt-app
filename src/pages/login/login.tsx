import { useState } from "react";
// @ts-ignore
import { Link } from "react-router-dom";
import { callLogin } from '../../redux/auth/actions';
import eyeIconClose from '../../assets/images/icon-eye-closed.png';
import eyeIconOpen from '../../assets/images/icon-eye-open.png';
import AuthParent from '../../common/auth/authParent';
import Constants from '../../utils/constants';
import regex from '../../utils/regex'
import { gmailSignupLogin } from '../../redux/auth/actions';
import SocialAuth from "../../common/auth/socialAuth";
import Signup from '../signup/signup';

interface Propstype {
    history?: any
}

const LoginPage = (props: Propstype) => {
    const [errors, setErrors] = useState<any>({});
    const [loginData, setLoginData] = useState<any>({
        email: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false)

    const backButtonHandler = () => {
        props.history.push('/')
    }

    const changeHandler = (e: any) => {
        setLoginData((prevData: any) => ({ ...prevData, [e.target.name]: e.target.value }))
    }

    const validateForm = () => {
        const newErrors: any = {};

        if (!loginData.email) {
            newErrors.email = Constants.errorStrings.emailEmpty;
        } else {
            const emailRegex = new RegExp(regex.email);
            if (!emailRegex.test(loginData.email)) {
                newErrors.email = Constants.errorStrings.emailErr;
            }
        }

        if (!loginData.password) {
            newErrors.password = Constants.errorStrings.password;
        } else {
            const passwordRegex = new RegExp(regex.password);
            if (!passwordRegex.test(loginData.password.trim())) {
                newErrors.password = Constants.errorStrings.passwordInvalid;
            }
        }

        setErrors(newErrors);
        return !Object.keys(newErrors).length;
    }

    const onNewAccount = () => {
        props.history.push('/signup')
    }

    const onSubmit = async (e: any) => {
        e.preventDefault();
        const newData = { email: loginData.email, password: loginData.password.trim(), deviceToken: "323245356tergdfgrtuy68u566452354dfwe" };
        if (validateForm()) {
            const res: any = await callLogin(newData)
            if (res.success) {
                props.history.push('/')
            }
        }
    }

    return (
        <AuthParent sliderType='signup' backButtonHandler={backButtonHandler} header={{ title: 'Log In' }}>
            <div className="form_wrapper">
                <form onSubmit={onSubmit}>
                    <div className="form_field">
                        <label className="form_label">Email</label>
                        <div className="text_field">
                            <input type="text" placeholder="Enter your email" name="email" onChange={changeHandler} />
                        </div>
                        {!!errors.email && <span className="error_msg">{errors.email}</span>}
                    </div>
                    <div className="form_field">
                        <label className="form_label">Password</label>
                        <div className="text_field">
                            <input type={showPassword ? "text" : "password"} className="detect_input" placeholder="Enter your password" name="password" onChange={changeHandler} />
                            <span className="detect_icon" onClick={() => setShowPassword(!showPassword)}><img src={showPassword ? eyeIconOpen : eyeIconClose} /></span>
                        </div>
                        {!!errors.password && <span className="error_msg">{errors.password}</span>}
                    </div>
                    <div className="form_field">
                        <Link to="/reset-password" className="link">Forgotten your password?</Link>
                    </div>
                    <div className="form_field">
                        <button className="fill_btn">Log in</button>
                    </div>
                </form>
                <span className="show_label text-center">or continue with</span>
                <SocialAuth onNewAccount={onNewAccount}
                    history={props.history} />
                <div className="form_field hide text-center">
                    <span className="reg">No account? <Link to="/signup" className="link">Signup</Link></span>
                </div>
            </div>

        </AuthParent>
    )
}

export default LoginPage
