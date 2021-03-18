import React from 'react';
import colorLogo from '../../../assets/images/ic-logo-yellow.png';


const SuccessPage = () => {
    return (
        <div className="img_text_wrap success">
            <figure className="logo">
                <img src={colorLogo} alt="Tickt-logo" />
            </figure>
            <div className="content">
                <h1 className="title">Thanks!</h1>
                <span className="show_label msg">You have created new password for your account.</span>
                <button className="fill_btn full_btn">Login</button>
            </div>
        </div>
    )
}

export default SuccessPage
