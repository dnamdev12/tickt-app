import React from 'react';
import colorLogo from '../../../assets/images/ic-logo-yellow.png';

interface Propstype {
    history: any,
    showModal?: boolean,
    setShowModal: (data: any) => void,
    modalUpdateSteps: (data: any) => void,
}

const SuccessPage = (props: Propstype) => {
    const goToLogin = () => {
        if (props.showModal) {
            props.modalUpdateSteps(0)
            //props.setShowModal(!props.showModal)
            return;
        }
        props.history.push('/login')
    }

    return (
        <div className="img_text_wrap success">
            <figure className="logo">
                <img src={colorLogo} alt="Tickt-logo" />
            </figure>
            <div className="content">
                <h1 className="title">Thanks!</h1>
                <span className="show_label msg">You have created new password for your account.</span>
                <button className="fill_btn full_btn" onClick={goToLogin}>Login</button>
            </div>
        </div>
    )
}

export default SuccessPage
