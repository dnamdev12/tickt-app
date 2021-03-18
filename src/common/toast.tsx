import React from 'react';
import close from '../assets/images/close-sm-yellow.svg';


const Toast = () => {
    return (
        <div className="body-message active">
            <span className="cross-icon">
                <img src={close} alt="close" />
            </span>
            <p className="commn_para">Account created successfull !</p>
        </div>
    )
}

export default Toast
