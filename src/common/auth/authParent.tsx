import colorLogo from '../../assets/images/ic-logo-yellow.png';
import AuthSlider from './authSlider';

interface Props {
    backButtonHandler?: () => void;
    steps?: number | undefined;
    header: any;
    children: any,
    sliderType: string,
    hideProgres?: boolean
}

const AuthParent = (props: Props) => {
    return (
        <div className="onboard_wrapper">
            <div className="f_row">
                <div className="left_col">
                    <AuthSlider type={props.sliderType} />
                </div>
                <div className="right_col">
                    <figure className="mob_logo hide">
                        <img src={colorLogo} alt="Tickt-logo" />
                    </figure>
                    <div className="onboarding_head">
                        {(!!props.steps || props.sliderType === 'signup') && <button className="back_btn" onClick={props.backButtonHandler} />}
                        <h1>{props.header.title}</h1>
                        {props.header.subTitle && <span className="show_label">{props.header.subTitle}</span>}
                        {!!props.steps && !props.hideProgres && <ul className="custom_steppr">
                            {
                                Array.from(Array(8).keys()).map((i) => {
                                    return <li key={i} className={props.steps !== undefined && i < props.steps ? 'active' : ''} />
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
