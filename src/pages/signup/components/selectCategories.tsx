import React from 'react';
import colorLogo from '../../../assets/images/ic-logo-yellow.png';
import sphere from '../../../assets/images/sphere.png';
import SliderComponent from '../../common/slider-component';


const SelectCategories = () => {
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
                        <h1>What is your sphere?</h1>
                        <ul className="custom_steppr">
                            <li className="active"></li>
                            <li className="active"></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                    <div className="select_sphere form_wrapper">
                        <ul>
                            <li className="active">
                                <figure>
                                    <img src={sphere} alt="sphere-icon" />
                                </figure>
                                <span className="name"> Plumber </span>
                            </li>
                            <li>
                                <figure>
                                    <img src={sphere} alt="sphere-icon" />
                                </figure>
                                <span className="name"> Carpenter </span>
                            </li>
                            <li>
                                <figure>
                                    <img src={sphere} alt="sphere-icon" />
                                </figure>
                                <span className="name"> Plumber </span>
                            </li>
                            <li>
                                <figure>
                                    <img src={sphere} alt="sphere-icon" />
                                </figure>
                                <span className="name"> Carpenter </span>
                            </li>
                            <li>
                                <figure>
                                    <img src={sphere} alt="sphere-icon" />
                                </figure>
                                <span className="name"> Plumber </span>
                            </li>
                            <li>
                                <figure>
                                    <img src={sphere} alt="sphere-icon" />
                                </figure>
                                <span className="name"> Carpenter </span>
                            </li>
                            <li>
                                <figure>
                                    <img src={sphere} alt="sphere-icon" />
                                </figure>
                                <span className="name"> Carpenter </span>
                            </li>
                        </ul>
                        <button className="fill_btn">Next</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SelectCategories
