import { useEffect } from 'react';
import { connect } from 'react-redux';
import { setShowNotification } from '../redux/common/actions';

import dummy from '../assets/images/u_placeholder.jpg';
import close from '../assets/images/icon-close-1.png';

const NOTIFICATION_TIMEOUT = 5000;


const CustomNotification = (props: any) => {

    // const title: string = payload.notification.title;
    // const options: any = {
    //     body: payload.notification.body,
    //     data: {
    //         time: new Date(Date.now()).toString(),
    //         click_action: payload.data.click_action
    //     }
    // };

    useEffect(() => {
        if (props.showNotification) {
            setTimeout(() => setShowNotification(false), NOTIFICATION_TIMEOUT);
        }

        return () => clearTimeout();
    }, [props.showNotification]);

    return !!props.showNotification ? (
        <div className="body-message active">
            <span className="cross-icon" onClick={() => setShowNotification(false)}>
                <img src={close} alt="img" />
            </span>
            <div className="wrapppr" onClick={() => {
                setShowNotification(false);
                window.open('http://localhost:3000/active-jobs', '_self');
            }}>
                <div className="notif">
                    <figure className="not_img">
                        <img src={dummy} alt="img" />
                    </figure>
                    <div className="info">
                        <span className="who line-1">John Oldman</span>
                        <span className="line-1">Work was approved</span>
                    </div>
                    <span className="time">St 12:30 AM</span>
                </div>
            </div>
        </div>
    ) : null;
}

const mapStateToProps = (state: any) => {
    return {
        showNotification: state.common.showNotification,
        notificationData: state.common.notificationData,
    }
}

export default connect(mapStateToProps)(CustomNotification);
