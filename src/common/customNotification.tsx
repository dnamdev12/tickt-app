import React from 'react';
import dummy from '../assets/images/u_placeholder.jpg';
import close from '../assets/images/icon-close-1.png';

const CustomNotification = () => {
    return (
        <div className="body-message active">
            <span className="cross-icon">
                <img src={close} alt="img" />
            </span>
            <div className="wrapppr">
                <div className="notif">
                    <figure className="not_img">
                        <img src={dummy} alt="img" />
                    </figure>
                    <div className="info">
                        <span className="who line-1">Wire up circuit box</span>
                        <span className="line-1">1 new message from builder</span>
                    </div>
                    <span className="time">St 12:30 AM</span>
                </div>
            </div>
        </div>
    )
}

export default CustomNotification
