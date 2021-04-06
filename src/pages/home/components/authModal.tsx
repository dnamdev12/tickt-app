import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Login from '../../login/login';
import ForgetPassword from '../../forgetPassword/forgetPassword';
import Signup from '../../signup/index';

import cancel from "../../../assets/images/ic-cancel.png";


const AuthModal = (props: any) => {
    const [modalSteps, setModalSteps] = useState(0);

    const modalUpdateSteps = (step: any) => {
        setModalSteps(step);
    }

    const onCloseModal = () => {
        props.setShowModal(!props.showModal)
        setModalSteps(0)
    }

    console.log(props, "authModal props")

    const renderGuestPopup = () => {
        switch (modalSteps) {
            case 0:
                return <Login history={props.history} showModal={props.showModal} setShowModal={props.setShowModal} modalUpdateSteps={modalUpdateSteps} />
            case 1:
                return <ForgetPassword history={props.history} showModal={props.showModal} setShowModal={props.setShowModal} modalUpdateSteps={modalUpdateSteps} />
            case 2:
                return <Signup history={props.history} showModal={props.showModal} setShowModal={props.setShowModal} modalUpdateSteps={modalUpdateSteps} />
            default:
                return null;
        }
    }

    return (
        <React.Fragment>
            {props.showModal && <Modal className="custom_modal "
                open={props.showModal}
                onClose={onCloseModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div className="onboard_modal">
                    <button className="close" onClick={() => props.setShowModal(!props.showModal)}>
                        <img src={cancel} alt="cancel" />
                    </button>
                    {renderGuestPopup()}
                </div>
            </Modal>}
        </React.Fragment>
    )
}

export default AuthModal