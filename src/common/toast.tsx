import {useEffect} from 'react';
import { connect } from 'react-redux';
import close from '../assets/images/close-sm-yellow.svg';
import {setShowToast} from '../redux/common/actions';

export const TYPES = {
    error: 'error',
    warning: 'warining',
    info: 'info'
}

// handles the auto hinding of toast
const TOAST_TIMEOUT = 2000;

const Toast = (props: any) => {

    const hideToast = () => {
        setShowToast(false);
    }

    useEffect(() => {
        setTimeout(() => hideToast(), TOAST_TIMEOUT)
    }, [props.showToast]);

    return !!props.showToast ? (
        // Use success and failed class conditionally next to active class
        <div className={`body-message active ${props.toastType}`}>
            <span className="cross-icon" onClick={hideToast}>
                <img src={close} alt="close" />
            </span>
            <p className="commn_para">{props.toastMessage}</p>
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