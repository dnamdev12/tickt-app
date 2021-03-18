import React from 'react';
import colorLogo from '../../../assets/images/ic-logo-yellow.png';
import SliderComponent from '../../../common/slider-component';

const VerifyPhoneNumber = () => {
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
                        <h1>Verify your number</h1>
                        <ul className="custom_steppr">
                            <li className="active"></li>
                            <li className="active"></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                    <div className="form_wrapper">
                        <form>
                            <span className="show_label"><b>Verification Code</b></span>
                            <div className="otp_input_wrapper">
                                <input type="number" className="sms-no-box" />
                                <input type="number" className="sms-no-box" />
                                <input type="number" className="sms-no-box" />
                                <input type="number" className="sms-no-box" />
                                <input type="number" className="sms-no-box" />
                            </div>
                            <div className="form_field">
                                <span className="show_label">We have sent a verification code to your phone.
                          Please check SMS and enter the 5-digit code here.</span>
                            </div>
                            <div className="form_field text-center">
                                <span className="show_label">Don’t you receive any codes?</span>
                                <a href="#" className="link">Re-send code</a>
                            </div>
                            <div className="form_field text-center">
                                <span className="show_label timer">0:21</span>
                            </div>
                            <div className="form_field">
                                <button className="fill_btn">Next</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerifyPhoneNumber

