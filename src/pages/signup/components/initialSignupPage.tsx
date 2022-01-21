import React, { useEffect } from 'react';
import storageService from '../../../utils/storageService';
//@ts-ignore
import Intercom from 'intercom-client';


interface Propstype {
    updateSteps: (num: number, data: any) => void,
    step: number,
    history: any,
    showModal: boolean,
    modalUpdateSteps: (data: any) => void,
    callTradeList: () => void,
}

const InitialSignupPage = (props: Propstype) => {
    let window_: any = window;

    useEffect(() => {
        // prefetch();
    }, [])

    useEffect(() => {
        if (window_?.Intercom) {
            window_?.Intercom('update', {
                "hide_default_launcher": true
            });
        }
    }, [window_])

    const nextPageHandler = (userType: string) => {
        var user_type = 1
        if (userType === 'builder') {
            user_type = 2
        }
        props.updateSteps(props.step + 1, { user_type });
        if (user_type === 1) {
            props.callTradeList();
        }
    }

    const guestLoginClicked = (e: any) => {
        e.preventDefault();
        window.location.href = 'http://ticktwp.appskeeper.in/';
        return;
        var today = new Date();
        var date = today.getFullYear() + ":" + today.getMonth() + ":" + today.getDate() + ":" + today.getMinutes() + ":" + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
        storageService.setItem("guestToken", date)
        storageService.setItem("userType", 0)
        props.history.push('/guest-user');
    }

    const phoneViewHandler = (e: any) => {
        e.preventDefault();
        if (props.showModal) {
            props.modalUpdateSteps(0)
            return;
        }
        props.history.push('/login')
    }

    return (
        <div className="form_wrapper">
            <div className="form_field"><button className="fill_btn btn-effect" onClick={() => nextPageHandler('builder')}>I’m a builder</button></div>
            <div className="form_field text-center"><span className="show_label text-center">or</span></div>
            <div className="form_field"><button className="fill_grey_btn btn-effect" onClick={() => nextPageHandler('tradie')}>I’m a tradesperson</button></div>
            {!props.showModal && <div className="form_field text-center"><a className="link" onClick={guestLoginClicked}>Login as Guest</a></div>}

            <div className="form_field hide text-center">
                <span className="reg">Have an account? <a className="link" onClick={phoneViewHandler}>Login</a></span>
            </div>
        </div>
    )
}

export default InitialSignupPage
