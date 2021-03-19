import React from 'react';
import colorLogo from '../../../assets/images/ic-logo-yellow.png';
import SliderComponent from '../../../common/slider-component';

interface Propstype {
    updateSteps: (num: number) => void
    step: number
    signupStepSeven: (data: any, step: number) => void,
}

const ChooseQualification = (props: Propstype) => {

    const backButtonHandler = () => {
        props.updateSteps(props.step - 1)
    }

    const changeHandler = (e: any) => {
        //setTrade((prevData: any) => ({ ...prevData, [e.target.name]: e.target.value }))
    }

    const onSubmit = async (e: any) => {
        e.preventDefault();
        props.signupStepSeven('specialization', props.step + 1)

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
                        <h1>Choose qualification</h1>
                        <ul className="custom_steppr">
                            <li className="active"></li>
                            <li className="active"></li>
                            <li className="active"></li>
                            <li className="active"></li>
                            <li className="active"></li>
                            <li className="active"></li>
                            <li className="active"></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                    <div className="form_wrapper">
                        <form onSubmit={onSubmit}>
                            <div className="choose_qf">
                                <div className="checkbox_wrap agree_check">
                                    <input className="filter-type filled-in" type="checkbox" name="qualification" id="qf1" />
                                    <label htmlFor="qf1">White Card</label>
                                </div>
                                <div className="checkbox_wrap agree_check">
                                    <input className="filter-type filled-in" type="checkbox" name="qualification" id="qf2" />
                                    <label htmlFor="qf2">First Aid</label>
                                </div>
                                <div className="checkbox_wrap agree_check">
                                    <input className="filter-type filled-in" type="checkbox" name="qualification" id="qf3" />
                                    <label htmlFor="qf3">VBA Licence Number</label>
                                </div>
                            </div>

                            <div className="form_field">
                                <button className="fill_btn">Next</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChooseQualification



