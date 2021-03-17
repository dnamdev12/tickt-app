import React from 'react';
import colorLogo from '../../../assets/images/ic-logo-yellow.png';


const LetsGo = () => {
    return (
        <div className="img_text_wrap">
            <figure className="logo">
                <img src={colorLogo} alt="Tickt-logo" />
            </figure>
            <div className="content">
                <h1 className="title">Congratulations!</h1>
                <span className="show_label msg">Your account has created. You are one step closer to growing your business.</span>
                <button className="fill_btn full_btn">Let’s go</button>
            </div>
        </div>
    )
}

export default LetsGo
