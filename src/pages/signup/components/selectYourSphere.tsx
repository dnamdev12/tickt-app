import React, { useState, useEffect } from 'react';

import colorLogo from '../../../assets/images/ic-logo-yellow.png';
import sphere from '../../../assets/images/sphere.png';
import SliderComponent from '../../../common/slider-component';

interface Propstype {
    updateSteps: (num: number) => void
    step: number
    signupStepFive: (data: any, step: number) => void,
}

const SelectCategories = (props: Propstype) => {
    const [errors, setErrors] = useState<any>({});
    const [trade, setTrade] = useState<Array<any>>([])

    useEffect(() => {
        const prevUserSignupData: any = JSON.parse(sessionStorage.getItem('userSignupData')!)
        if (prevUserSignupData) {
            setTrade(prevUserSignupData.trade)
        }
    }, [])

    const backButtonHandler = () => {
        props.updateSteps(props.step - 1)
    }

    const changeHandler = (e: any) => {
        setTrade((prevData: any) => ({ ...prevData, [e.target.name]: e.target.value }))
    }

    const onSubmit = async (e: any) => {
        e.preventDefault();
        props.signupStepFive('sphere', props.step + 1)

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
                        <h1>What is your sphere?</h1>
                        <ul className="custom_steppr">
                            <li className="active"></li>
                            <li className="active"></li>
                            <li className="active"></li>
                            <li className="active"></li>
                            <li className="active"></li>
                            <li></li>
                            <li></li>
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
                                <span className="name"> Carpenter </span>
                            </li>
                        </ul>
                        <button className="fill_btn" onClick={onSubmit}>Next</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SelectCategories
