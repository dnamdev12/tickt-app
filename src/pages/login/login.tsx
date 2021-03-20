import gmail from '../../assets/images/ic-google.png';
import linkedin from '../../assets/images/ic-linkedin.png';
import apple from '../../assets/images/ic-apple.png';
import AuthParent from '../../common/auth/authParent';

const InitialLoginPage = (props: any) => {
    const forgetPasswordHandler = (e: any) => {
        e.preventDefault()
        props.history.push('/forget-password/reset')
    }

    const backButtonHandler = () => {
        props.history.push('/')
    }

    return (
        <AuthParent sliderType='signup' backButtonHandler={backButtonHandler} header={{title: 'Log In'}}>
            <div className="form_wrapper">
                <form>
                    <div className="form_field">
                        <label className="form_label">Email</label>
                        <div className="text_field">
                            <input type="text" placeholder="Enter your email" />
                        </div>
                        <span className="error_msg"></span>
                    </div>
                    <div className="form_field">
                        <label className="form_label">Password</label>
                        <div className="text_field">
                            <input type="password" className="detect_input" placeholder="Enter your password" />
                            <span className="detect_icon eye"></span>
                        </div>
                    </div>
                    <div className="form_field">
                        <a href="/forgot" className="link" onClick={forgetPasswordHandler}>Forgotten your password?</a>
                    </div>
                    <div className="form_field">
                        <button className="fill_btn">Log in</button>
                    </div>
                </form>
                <span className="show_label text-center">or continue with</span>
                <div className="continue_with">
                    <a href="javascript:void(0)">
                        <img src={gmail} alt="google" />
                    </a>
                    <a href="javascript:void(0)" >
                        <img src={linkedin} alt="linkedin" />
                    </a>
                    <a href="javascript:void(0)" >
                        <img src={apple} alt="apple" />
                    </a>
                </div>
                <div className="form_field hide text-center">
                    <span className="reg">No account? <a className="link">Sign
                        up</a></span>
                </div>
            </div>
        </AuthParent>
    )
}

export default InitialLoginPage
