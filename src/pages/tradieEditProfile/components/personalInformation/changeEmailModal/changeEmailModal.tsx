import React, { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import NewEmail from './components/newEmail';
import VerifyNewEmail from './components/verifyNewEmail';
import SuccessPage from './components/successPage';



interface Propstype {
    history: any,
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

    const closeModalHandler = () => {
        setSteps(1);
        props.changeEmailModalCloseHandler();
    }

    const renderPages = () => {
        switch (steps) {
            case 1:
                return <NewEmail
                    backButtonHandler={backButtonHandler}
                    closeModalHandler={closeModalHandler}
                    currentEmail={props.currentEmail}
                    updateSteps={updateSteps}
                    newEmail={stateData.newEmail}
                    currentPassword={stateData.currentPassword}
                />
            case 2:
                return <VerifyNewEmail
                    history={props.history}
                    backButtonHandler={backButtonHandler}
                    closeModalHandler={closeModalHandler}
                    currentEmail={props.currentEmail}
                    updateSteps={updateSteps}
                    newEmail={stateData.newEmail}
                    currentPassword={stateData.currentPassword}
                />
            // case 3:
            // return <SuccessPage
            // history={props.history}
            // updateSteps={updateSteps}
            // closeModalHandler={closeModalHandler}
            // />
            default: return null
        }
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
                {/* <button className="close_btn" onClick={closeModalHandler}>
                    <img src={cancel} alt="cancel" />
                </button> */}
                {renderPages()}
            </div >
        </Modal >
    )
}

export default ChangeEmailModal;






{/* <Modal
                    className="custom_modal"
                    open={changeEmailModalClicked}
                    onClose={this.changeEmailModalCloseHandler}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div className="custom_wh profile_modal" data-aos="zoom-in" data-aos-delay="30" data-aos-duration="1000">
                        <div className="heading form_field">
                            <div className="relate">
                                <button className="back" onClick={this.changeEmailModalCloseHandler}></button>
                                <div className="md_heading">
                                    <span className="sub_title">Change email</span>
                                    <span className="">Enter your password too and we will send you message to verify new email</span>
                                </div>
                            </div>
                            <button className="close_btn" onClick={this.changeEmailModalCloseHandler}>
                                <img src={cancel} alt="cancel" />
                            </button>
                        </div>
                        <div className="inner_wrap">
                            <div className="inner_wrappr">
                                <div className="form_field">
                                    <label className="form_label">New Email</label>
                                    <div className="text_field">
                                        <input type="text" placeholder="Enter New Email" value={newEmail} name='newEmail' onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ newEmail: e.target.value })} />
                                    </div>
                                    {!!errors?.newEmail && <span className="error_msg">{errors?.newEmail}</span>}
                                </div>
                                <div className="form_field">
                                    <label className="form_label">Current Password</label>
                                    <div className="text_field">
                                        <input type={showPassword ? 'text' : 'password'} className="detect_input" placeholder="Enter Current Password" name='password' value={password} onChange={this.passwordHandler} />
                                        <span className="detect_icon" onClick={() => this.setState((prevState: any) => ({ showPassword: !prevState.showPassword }))}>
                                            <img src={showPassword ? eyeIconOpen : eyeIconClose} />
                                        </span>
                                    </div>
                                    {!!errors?.currentPassword && <span className="error_msg">{errors?.currentPassword}</span>}
                                </div>
                            </div>
                        </div>
                        <div className="bottom_btn custom_btn">
                            <button className="fill_btn full_btn btn-effect" onClick={this.changeEmailHandler}>Next</button>
                        </div>
                    </div >
                </Modal > */}


// portfolio edit button removed ==> modal html
{/* <Modal
                                    className="custom_modal"
                                    open={portfolioModalClicked}
                                    onClose={() => this.setState({ portfolioModalClicked: false })}
                                    aria-labelledby="simple-modal-title"
                                    aria-describedby="simple-modal-description"
                                >
                                    <div className="custom_wh profile_info" data-aos="zoom-in" data-aos-delay="30" data-aos-duration="1000">
                                        <div className="heading">
                                            <span className="sub_title">Portfolio</span>
                                            <button className="close_btn" onClick={() => this.setState({ portfolioModalClicked: false })}>
                                                <img src={cancel} alt="cancel" />
                                            </button>
                                        </div>
                                        <div className="inner_wrap">
                                            <ul className="portfolio_wrappr">
                                                <li className="media">
                                                    <figure className="portfolio_img" >
                                                        <img src={profilePlaceholder} alt="portfolio-images" onClick={() => this.setState({ portfolioModalClicked: false, portfolioJobClicked: true })} />
                                                        <span className="edit_icon" onClick={() => this.setState({ portfolioModalClicked: false, portfolioJobClicked: true })} >
                                                            <img src={editIconWhite} alt="edit" />
                                                        </span>
                                                        <span className="xs_sub_title">Dummy text</span>
                                                    </figure>
                                                </li>
                                                <li className="media">
                                                    <figure className="portfolio_img">
                                                        <img src={profilePlaceholder} alt="portfolio-images" />
                                                        <span className="edit_icon">
                                                            <img src={editIconWhite} alt="edit" />
                                                        </span>
                                                        <span className="xs_sub_title">Dummy text</span>
                                                    </figure>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="bottom_btn custom_btn">
                                            <button className="fill_btn full_btn btn-effect">Save changes</button>
                                        </div>
                                    </div>
                                </Modal> */}