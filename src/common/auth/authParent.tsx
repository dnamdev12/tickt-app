import colorLogo from '../../assets/images/ic-logo-yellow.png';
import AuthSlider from './authSlider';

interface Props {
    backButtonHandler?: () => void;
    steps?: number | undefined;
    header: any;
    children: any,
    sliderType?: string,
    hideProgres?: boolean
    userType?: number
    showModal?: boolean,
    history?: any;
    setShowModal: (data: any) => void,
    modalUpdateSteps: (data: any) => void,
    setSocialData: (data: any) => void,
    modalLoginBackBtn?: string,
    socialId?: string,
}

const AuthParent = (props: any) => {
    const tradieStepsLength = 8;
    const builderStepsLength = props?.socialId ? 5 : 5;

    return (
        <div className="onboard_wrapper">
            <div className="f_row">
                <div className="left_col">
                    <AuthSlider
                        type={props.sliderType}
                        history={props.history}
                        showModal={props.showModal}
                        setShowModal={props.setShowModal}
                        modalUpdateSteps={props.modalUpdateSteps}
                        setSocialData={props.setSocialData} />
                </div>
                <div className="right_col">
                    <figure className="mob_logo hide">
                        <img src={colorLogo} alt="Tickt-logo" />
                    </figure>
                    <div className="onboarding_head">
                        {(!!props.steps || props.sliderType === 'signup') && !props.modalLoginBackBtn && <button className="back_btn" onClick={props.backButtonHandler} />}
                        <h1>{props.userType === 1 && props.header.tradieTitle ? props.header.tradieTitle : props.header.title}</h1>
                        {props.header.subTitle &&
                            <span className="show_label">
                                {props.header.subTitle}
                            </span>}
                        {!!props.steps &&
                            props.steps > 1 &&
                            !props.hideProgres &&
                            <ul className="custom_steppr">
                                {Array.from(Array(props.userType === 1 ?
                                    tradieStepsLength :
                                    builderStepsLength).keys()).map((i) => {
                                        return (
                                            <li
                                                key={i}
                                                className={props.steps !== undefined && i + 1 < props.steps ? 'active' : ''}
                                            />)
                                    })
                                }
                            </ul>}
                    </div>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default AuthParent;
