import React, { useState, useEffect } from 'react';

import colorLogo from '../../../assets/images/ic-logo-yellow.png';
import SliderComponent from '../../../common/slider-component';

interface Propstype {
    updateSteps: (num: number) => void
    step: number
    signupStepFive: (data: any, step: number) => void,
    tradeListData: Array<any>,
    trade: string,
}

const SelectCategories = (props: Propstype) => {
    const [errors, setErrors] = useState<any>({});
    const [trade, setTrade] = useState(props.trade);

    const backButtonHandler = () => {
        props.updateSteps(props.step - 1)
    }

    const onClick = (item: string) => {
        setTrade(item)
    }

    // const validateForm = () => {
    //     const newErrors: any = {};
    //     if (!signupData.firstName) {
    //         newErrors.firstName = Messages.fullNameEmpty;
    //     } else {
    //         const nameRegex = new RegExp(regex.fullname);
    //         console.log(nameRegex, 'firstName regex', nameRegex.test(signupData.firstName))
    //         if(signupData.firstName.length < 3){
    //             newErrors.firstName = Messages.fullNameShortErr 
    //         } else if (!nameRegex.test(signupData.firstName)) {
    //             newErrors.firstName = Messages.fullNameErr
    //         }
    //     }
    //     if (!signupData.email) {
    //         newErrors.email = Messages.emailEmpty;
    //     } else {
    //         const emailRegex = new RegExp(regex.email);
    //         if (!emailRegex.test(signupData.email)) {
    //             newErrors.email = Messages.emailErr;
    //         }
    //     }
    //     if (!signupData.tnc) {
    //         newErrors.tnc = Messages.tncEmpty;
    //     }
    //     console.log(newErrors)
    //     setErrors(newErrors);
    //     return !Object.keys(newErrors).length;
    // }

    const onSubmit = async (e: any) => {
        e.preventDefault();
        //if (validateForm()) {
        props.signupStepFive(trade, props.step + 1)
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
                        <button className="back_btn" onClick={backButtonHandler} />
                        <h1>What is your sphere?</h1>
                        <ul className="custom_steppr">
                            <li className="active"></li>
                            <li className="active"></li>
                            <li className="active"></li>
                            <li className="active"></li>
                            <li className="active"></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                    <div className="select_sphere form_wrapper">
                        <ul>
                            {props.tradeListData.map((item) => {
                                const active = trade === item._id;
                                return (
                                    <li className={ active ? 'active' : ''} onClick={() => onClick(item._id)}>
                                        <figure>
                                            <img src={item[active ? 'selected_url' : 'unselected_url']} alt={item.trade_name} />
                                        </figure>
                                        <span className="name">{item.trade_name}</span>
                                    </li>
                                )
                            })}
                        </ul>
                        <button className="fill_btn" onClick={onSubmit}>Next</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SelectCategories
