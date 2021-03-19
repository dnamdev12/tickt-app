import React from 'react';
import colorLogo from '../../../assets/images/ic-logo-yellow.png';
import doc from '../../../assets/images/add-document.png';
import SliderComponent from '../../../common/slider-component';

interface Propstype {
    updateSteps: (num: number) => void
    step: number
    signupStepEight: (data: any, step: number) => void,
}

const AddQualification = (props: Propstype) => {

    const backButtonHandler = () => {
        props.updateSteps(props.step - 1)
    }

    const changeHandler = (e: any) => {
        //setTrade((prevData: any) => ({ ...prevData, [e.target.name]: e.target.value }))
    }

    const onSubmit = async (e: any) => {
        e.preventDefault();
        props.signupStepEight('addQualification', props.step + 1)

    }

    return (
        <div className="onboard_wrapper">
            <div className="f_row">
                <div className="left_col">
                    <SliderComponent />
                </div>
                <div className="right_col">
                    <figure className="mob_logo hide">
                        <img src={colorLogo} alt="Tickt-logo" />
                    </figure>
                    <div className="onboarding_head">
                        <button className="back_btn" onClick={backButtonHandler}/>
                        <h1>Add qualification</h1>
                        <ul className="custom_steppr">
                            <li className="active"></li>
                            <li className="active"></li>
                            <li className="active"></li>
                            <li className="active"></li>
                            <li className="active"></li>
                            <li className="active"></li>
                            <li className="active"></li>
                            <li className="active"></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                    <div className="form_wrapper">
                        <form onSubmit={onSubmit}>
                            <div className="add_qf_doc">
                                <figure className="upload_doc">
                                    <img src={doc} alt="doc" />
                                </figure>
                                <span className="show_label">Upload your qualification document. Don’t worry, nobody will see your ID. This is for verification only!</span>
                            </div>

                            <div className="form_field">
                                <button className="fill_btn">Upload</button>
                            </div>
                            <div className="form_field">
                                <button className="fill_grey_btn">Add later</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddQualification
