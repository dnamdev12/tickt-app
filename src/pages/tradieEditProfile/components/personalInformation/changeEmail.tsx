import React, { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import NewEmail from './components/newEmail';
import VerifyNewEmail from './components/verifyNewEmail';
import SuccessPage from './components/successPage';

import cancel from "../../../../assets/images/ic-cancel.png";


interface Propstype {
    // history: any,
    isChangeEmailModalClicked: boolean,
    currentEmail: string,
    changeEmailModalCloseHandler: () => void,
}


const ChangeEmailModal = (props: Propstype) => {
    const [steps, setSteps] = useState(1);
    const [stateData, setStateData] = useState({
        newEmail: '',
        currentPassword: ''
    })

    const updateSteps = (step: number, newData?: any) => {
        setSteps(step);
        if (newData) {
            setStateData((prevData: any) => ({ ...prevData, ...newData }))
        }
    }

    const backButtonHandler = () => {
        let minStep = 1;
        if (steps === 1) {
            if (props.isChangeEmailModalClicked) {
                props.changeEmailModalCloseHandler();
                return;
            }
        }
        setSteps(steps - minStep);
    }

    const renderPages = () => {
        switch (steps) {
            case 1:
                return <NewEmail
                    backButtonHandler={backButtonHandler}
                    currentEmail={props.currentEmail}
                    updateSteps={updateSteps}
                    newEmail={stateData.newEmail}
                    currentPassword={stateData.currentPassword}

                />
            case 2:
                return <VerifyNewEmail
                    backButtonHandler={backButtonHandler}
                    currentEmail={props.currentEmail}
                    updateSteps={updateSteps}
                    newEmail={stateData.newEmail}
                    currentPassword={stateData.currentPassword}
                />
            // case 3:
            // return <SuccessPage history={props.history} showModal={props.showModal} setShowModal={props.setShowModal} modalUpdateSteps={props.modalUpdateSteps} />
            default: return null
        }
    }

    const closeModalHandler = () => {
        setSteps(1);
        props.changeEmailModalCloseHandler();
    }


    return (
        <Modal
            className="custom_modal"
            open={props.isChangeEmailModalClicked}
            onClose={closeModalHandler}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div className="custom_wh profile_modal" data-aos="zoom-in" data-aos-delay="30" data-aos-duration="1000">
                <button className="close_btn" onClick={closeModalHandler}>
                    <img src={cancel} alt="cancel" />
                </button>
                {renderPages()}
            </div >
        </Modal >
    )
}

export default ChangeEmailModal;