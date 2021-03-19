import React from 'react';
import colorLogo from '../../../assets/images/ic-logo-yellow.png';
import SliderComponent from '../../../common/slider-component';

interface Propstype {
    updateSteps: (num: number) => void
    step: number
    signupStepSix: (data: any, step: number) => void,
}

const Specialisation = (props: Propstype) => {

    const backButtonHandler = () => {
        props.updateSteps(props.step - 1)
    }

    const changeHandler = (e: any) => {
        //setTrade((prevData: any) => ({ ...prevData, [e.target.name]: e.target.value }))
    }

    const onSubmit = async (e: any) => {
        e.preventDefault();
        props.signupStepSix('specialization', props.step + 1)

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
                        <h1>What Specialisation?</h1>
                        <ul className="custom_steppr">
                            <li className="active"></li>
                            <li className="active"></li>
                            <li className="active"></li>
                            <li className="active"></li>
                            <li className="active"></li>
                            <li className="active"></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                    <div className="form_wrapper tags_wrap">
                        <form onSubmit={onSubmit}>
                            <ul>
                                <li>Machine Maintenance</li>
                                <li>Circuit Board Wiring</li>
                                <li>Electrical Instrumentation</li>
                                <li>Machine Maintenance</li>
                                <li>Circuit Board Wiring</li>
                                <li>Electrical Instrumentation</li>
                            </ul>
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

export default Specialisation
