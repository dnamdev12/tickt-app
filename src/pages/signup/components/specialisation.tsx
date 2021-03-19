import React, {useState, useEffect } from 'react';
import colorLogo from '../../../assets/images/ic-logo-yellow.png';
import SliderComponent from '../../../common/slider-component';

interface Propstype {
    updateSteps: (num: number) => void
    step: number
    signupStepSix: (data: any, step: number) => void,
    tradeListData: Array<any>,
    trade: string
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

    const specialisationList = props.tradeListData.find(i => i._id === props.trade)?.specialisations;

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
                            {
                                Array.from(Array(8).keys()).map((i) => {
                                    return(
                                        <li className={ i < props.step ? 'active': ''} />
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className="form_wrapper tags_wrap">
                        <form onSubmit={onSubmit}>
                            <ul>
                                {specialisationList?.map((item: any) => {
                                    return(
                                        <li className="active">{item.name}</li>
                                    )
                                })}
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
