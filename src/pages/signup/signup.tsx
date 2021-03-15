import React from 'react';
import colorLogo from '../../assets/images/ic-logo-yellow.png';
import gmail from '../../assets/images/ic-google.png';
import linkedin from '../../assets/images/ic-linkedin.png';
import apple from '../../assets/images/ic-apple.png';
import SliderComponent from '../component/slider-component';

export default function Signup() {
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
                        <h1>Create account</h1>
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

                            <div className="form_field">
                                <label className="form_label">Full Name</label>
                                <div className="text_field">
                                    <input placeholder="Enter your Full Name" />
                                </div>

                            </div>

                            <div className="form_field">
                                <label className="form_label">Email</label>
                                <div className="text_field">
                                    <input className="detect_input"
                                        placeholder="Enter your Email" />

                                </div>

                            </div>


                            <div className="form_field">
                                <div className="checkbox_wrap agree_check">
                                    <input className="filter-type filled-in" type="checkbox" name="filter" id="tnc" />
                                    <label htmlFor="tnc">I agree to </label>
                                    <a className="link">Privacy Policy</a>
                                    <label className="and">and</label>
                                    <a className="link m-l-30">Terms &amp; Conditions</a>
                                </div>
                            </div>
                            <div className="form_field">
                                <button type="submit" className="fill_btn ">Sign up</button>
                            </div>
                            <span className="show_label text-center">or continue with</span>
                            <div className="continue_with">
                                <a href="javascript:void(0)">
                                    <img src={gmail} alt="google" />
                                </a>
                                <a href="javascript:void(0)" >
                                    <img src={linkedin} alt="facebook" />
                                </a>
                                <a href="javascript:void(0)" >
                                    <img src={apple} alt="facebook" />
                                </a>
                            </div>
                            <div className="form_field hide text-center">
                                <span className="reg">Have an account? <a className="link">Sign in</a></span>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
