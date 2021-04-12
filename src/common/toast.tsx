import {useEffect} from 'react';
import { connect } from 'react-redux';
import close from '../assets/images/cancel.png';
import {setShowToast} from '../redux/common/actions';

export const TYPES = {
    success: 'success',
    error: 'failed',
    warning: 'warning',
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
        <div className={`body-message active ${props.toastType}`}> 
            <span className="cross-icon" >
                <img src={close} alt="close"  onClick={hideToast}/>
            </span>
            <div className="wrapppr">
            <p className="commn_para">{props.toastMessage === "Failed to fetch" ? "Please check you internet connection" : props.toastMessage}</p>
            <button className="fill_btn"  onClick={hideToast}>Close</button>
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