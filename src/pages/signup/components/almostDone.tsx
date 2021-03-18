import React from 'react';
import colorLogo from '../../../assets/images/ic-logo-yellow.png';

import SliderComponent from '../../../common/slider-component';

const AlmostDone = () => {
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
                        <h1>Almost done</h1>
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
                                <label className="form_label">Company Name</label>
                                <div className="text_field">
                                    <input type="text" placeholder="Enter company name" />
                                </div>
                                <span className="error_msg"></span>
                            </div>

                            <div className="form_field">
                                <label className="form_label">Your Position</label>
                                <div className="text_field">
                                    <input type="text" placeholder="Enter your position" />
                                </div>
                                <span className="error_msg"></span>
                            </div>

                            <div className="form_field">
                                <label className="form_label">Australian Business Number</label>
                                <div className="text_field">
                                    <input type="number" placeholder="Enter australian business number" />
                                </div>
                                <span className="error_msg"></span>
                            </div>

                            <div className="form_field">
                                <button className="fill_btn">Next</button>
                            </div>
                        </form>
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

export default AlmostDone
