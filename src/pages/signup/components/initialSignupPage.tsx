import React from 'react'
import colorLogo from '../../../assets/images/ic-logo-yellow.png';
import SliderComponent from '../../../common/slider-component';

interface Propstype {
    updateSteps: (num: number) => void
    step: number
    history:any
}

const InitialSignupPage = (props: Propstype) => {

    const nextPageHandler = () => {
        //sessionStorage.clear()
        props.updateSteps(props.step + 1)
    }

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
                        <h1>Welcome to Tickt</h1>
                        <span className="show_label">Australia's fastest growing network for builders and tradesmen</span>
                    </div>
                    <div className="form_wrapper">
                        <div className="form_field"><button className="fill_btn" onClick={nextPageHandler}>I’m builder</button></div>
                        <div className="form_field text-center"><span className="show_label text-center">or</span></div>
                        <div className="form_field"><button className="fill_grey_btn">I’m tradie</button></div>
                        {/* <div className="text-center"><a className="link">Login as Guest</a></div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InitialSignupPage

// export interface Props {
//     requestApiData: any
//     userData: any
// }

// export interface State {
//     userData: Array<any>
// }

// export {}
