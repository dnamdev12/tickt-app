import React from 'react';
import colorLogo from '../../assets/images/ic-logo-yellow.png';
import gmail from '../../assets/images/ic-google.png';
import linkedin from '../../assets/images/ic-linkedin.png';
import apple from '../../assets/images/ic-apple.png';
import SliderComponent from '../common/slider-component';

const InitialLoginPage = (props: any) => {

    const forgetPasswordHandler = () => {
        props.history.push('/builder/forget-password/reset/3')
    }
    
    return (
        <div className="onboard_wrapper">
            <div className="f_row">
                <div className="left_col">
                    <SliderComponent></SliderComponent>
                </div>
                <div className="right_col">
                    <figure className="mob_logo hide">
                        <img src={colorLogo} alt="Tickt-logo" />
                    </figure>
                    <div className="onboarding_head">
                        <button className="back_btn"></button>
                        <h1>Log in</h1>
                    </div>
                    <div className="form_wrapper">
                        <form>
                            <div className="form_field">
                                <label className="form_label">Email</label>
                                <div className="text_field">
                                    <input type="text" placeholder="Enter your email" />
                                </div>
                            </div>
                            <div className="form_field">
                                <label className="form_label">Password</label>
                                <div className="text_field">
                                    <input type="password" className="detect_input" placeholder="Enter your password" />
                                    <span className="detect_icon">
                                    </span>
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
                </div>
            </div>
        </div>
    )
}

export default InitialLoginPage
