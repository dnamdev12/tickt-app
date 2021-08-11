import { useEffect } from 'react';
import { connect } from 'react-redux';
import { setShowNotification } from '../redux/common/actions';
import { formatNotificationTime } from '../utils/common';

import dummy from '../assets/images/u_placeholder.jpg';
import close from '../assets/images/icon-close-1.png';

import { onNotificationClick } from '../utils/common';

const NOTIFICATION_TIMEOUT = 5000;

const CustomNotification = (props: any) => {
    const notification = props.notificationData?.data;
    console.log('notification: ', notification);

    useEffect(() => {
        if (props?.showNotification) {
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
                window.open(onNotificationClick(notification), '_self');
            }}>
                <div className="notif">
                    <figure className="not_img">
                        <img src={notification?.image || dummy} alt="img" />
                    </figure>
                    <div className="info">
                        <span className="who line-1">{notification?.title}</span>
                        <span className="line-1">{notification?.notificationText}</span>
                    </div>
                    <span className="time">{formatNotificationTime(notification?.updatedAt, 'day')}</span>
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
