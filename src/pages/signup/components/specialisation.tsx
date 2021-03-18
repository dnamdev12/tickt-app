import React from 'react';
import colorLogo from '../../../assets/images/ic-logo-yellow.png';
import SliderComponent from '../../../common/slider-component';

const Specialisation = () => {
    return (
        <div className="onboard_wrapper">
            <div className="f_row">
                <div className="left_col">
                    <SliderComponent></SliderComponent>
                </div>
                <div className="right_col">
                    <figure className="mob_logo hide">
                        <img src={colorLogo} alt="Tickt-logo" />
                    </figure>
                    <div className="onboarding_head">
                        <button className="back_btn"></button>
                        <h1>What Specialisation?</h1>
                        <ul className="custom_steppr">
                            <li className="active"></li>
                            <li className="active"></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                    <div className="form_wrapper tags_wrap">
                        <form>
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
