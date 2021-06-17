import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import close from '../assets/images/cancel.png';
import { setShowToast } from '../redux/common/actions';

export const TYPES = {
    success: 'success',
    error: 'failed',
    warning: 'warning',
    info: 'info'
}

// handles the auto hiding of toast
const TOAST_TIMEOUT = 3000;

const Toast = (props: any) => {
    const [isOnline, setNetwork] = useState(window.navigator.onLine);
    const [restrictNoInternetToast, setRestrictNoInternetToast] = useState(1);

    useEffect(() => {
        window.addEventListener("offline", handleConnectionChange);
        window.addEventListener("online", handleConnectionChange);
        return () => {
            window.removeEventListener("offline", handleConnectionChange);
            window.removeEventListener("online", handleConnectionChange);
        };
    }, []);

    useEffect(() => {
        setTimeout(() => hideToast(), TOAST_TIMEOUT);
    }, [props.showToast]);

    useEffect(() => {
        if (isOnline) {
            setRestrictNoInternetToast(1);
        }
    }, [isOnline]);

    const handleConnectionChange = () => {
        const condition = navigator.onLine ? 'online' : 'offline';
        if (condition === 'online') {
            const webPing = setInterval(
                () => {
                    fetch('//google.com', {
                        mode: 'no-cors',
                    })
                        .then(() => {
                            setNetwork(true);
                            (() => {
                                return clearInterval(webPing)
                            })();
                        }).catch(() => setNetwork(false))
                }, 2000);
            return;
        }
        // setShowToast(true, "Please check you internet connection");
        return setNetwork(false);
    }

    const hideToast = () => {
        setShowToast(false);
    }

    const renderToast = () => {
        if (!isOnline) {
            setTimeout(() => {
                setRestrictNoInternetToast((prevValue: any) => prevValue.restrictNoInternetToast + 1);
            }, 3000);
            return "Please check you internet connection";
        }
        return props.toastMessage;
    }

    return !!props.showToast ? (
        <div className={`body-message active ${props.toastType}`}>
            {/* <span className="cross-icon" >
                <img src={close} alt="close" onClick={hideToast} />
            </span> */}
            <div className="wrapppr">
                <p className="commn_para">{renderToast()}</p>
                {/* <button className="fill_btn btn-effect" onClick={hideToast}>Close</button> */}
            </div>
        </div>
    ) : (!isOnline && restrictNoInternetToast === 1) ? (
        <div className={`body-message active ${props.toastType}`}>
            <div className="wrapppr">
                <p className="commn_para">{renderToast()}</p>
            </div>
        </div>
    ) : null;
}

Toast.defaultProps = {
    toastType: TYPES.error,
    toastMessage: 'Something Went Wrong'
}

const mapStateToProps = (state: any) => {
    return {
        showToast: state.common.showToast,
        toastType: state.common.toastType,
        toastMessage: state.common.toastMessage,
    }
}

export default connect(mapStateToProps)(Toast);