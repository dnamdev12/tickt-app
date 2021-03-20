import React from 'react';
import colorLogo from '../assets/images/ic-logo-yellow.png';

const ForgetPassword = () => {
    return (
        <div className="onboard_wrapper">
            <div className="f_row">
                <div className="left_col">
                </div>
                <div className="right_col">
                    <figure className="mob_logo hide">
                        <img src={colorLogo} alt="Tickt-logo" />
                    </figure>
                    <div className="onboarding_head">
                        <button className="back_btn"></button>
                        <h1>Forget password </h1>
                    </div>
                    <div className="form_wrapper">
                        <form>
                            <div className="form_field">
                                <label className="form_label">Phone number</label>
                                <div className="text_field">
                                    <input type="text" placeholder="Enter your Phone number" />
                                </div>
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

export default ForgetPassword
