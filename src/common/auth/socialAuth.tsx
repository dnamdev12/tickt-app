import Constants from '../../utils/constants';
import gmail from '../../assets/images/ic-google.png';
import linkedin from '../../assets/images/ic-linkedin.png';
import apple from '../../assets/images/ic-apple.png';
import { checkSocialId, getLinkedinProfile, socialSignupLogin } from '../../redux/auth/actions';
import NetworkOps, { FetchResponse } from '../../network/NetworkOps';
// @ts-ignore
import { GoogleLogin } from 'react-google-login';
// @ts-ignore
import { LinkedIn } from 'react-linkedin-login-oauth2';
// @ts-ignore
//import AppleLogin from 'react-apple-login'

interface Propstype {
    onNewAccount: Function,
    history: any,
    userType?: number,
    showModal?: boolean,
    modalUpdateSteps: (data: any) => void,
    setShowModal: (data: any) => void,
}

const linkedInData = {
    REDIRECT_URI: `${window.location.origin}/linkedin`,
    CLIENT_ID: '77vhhfg24hx1s2',
    CLIENT_SECRET: '83ODjX9bN2GIjCoj',
}

const SocialAuth = (props: Propstype) => {

    const onFailure = (error: any) => {
        console.log(error);
    };

    const googleResponse = async (response: any) => {
        console.log(response, "g-oauth response");
        const res = await checkSocialId({socialId: response.googleId, email: response.profileObj.email})
        if (res.success) {
            if (res.isProfileCompleted) {
                //in case of existing social account
                const data: any = {
                    //firstName: profileData.name,
                    authType: "login",
                    email: response.profileObj.email,
                    socialId: response.profileObj.googleId,
                    deviceToken: "323245356tergdfgrtuy68u566452354dfwe",
                    accountType: "google",
                    ...(props.userType && { user_type: props.userType })
                }
                const res = await socialSignupLogin(data)
                if (res.success) {
                    if (props.showModal) {
                        props.setShowModal(!props.showModal)
                        return
                    }
                    props.history.push('/')
                }
            } else {
                //in case of new social account
                props.onNewAccount(response.profileObj, 'google');
            }
        }
    };

    const linkedInResponse = async (response: any) => {
        const resSocial = await getLinkedinProfile({ code: response.code, redirect_uri: linkedInData.REDIRECT_URI })
        const resCheckId = await checkSocialId({socialId: resSocial.result.id, email: resSocial.result.email})
        if (resCheckId.success) {
            if (resCheckId.isProfileCompleted) {
                //in case of existing social account
                const data: any = {
                    //firstName: profileData.name,
                    authType: "login",
                    email: resSocial.result.email,
                    deviceToken: "323245356tergdfgrtuy68u566452354dfwe",
                    accountType: "linkedIn",
                    socialId: resSocial.result.id,
                    ...(props.userType && { user_type: props.userType })
                }
                const resAuth = await socialSignupLogin(data)
                if (resAuth.success) {
                    if (props.showModal) {
                        props.setShowModal(!props.showModal)
                        return
                    }
                    props.history.push('/')
                }
            } else {
                //in case of new social account
                props.onNewAccount({ name: resSocial.result.firstName, email: resSocial.result.email, socialId: resSocial.result.id }, 'linkedIn');
            }
        }
    }

    return (
        <div className="continue_with">
            <GoogleLogin
                clientId={Constants.SocialAuth.GOOGLE_CLIENT_ID}
                onSuccess={googleResponse}
                onFailure={onFailure}
                render={(renderProps: any) => (<a onClick={renderProps.onClick}>
                    <img src={gmail} alt="google" />
                </a>)}
            />
            <LinkedIn
                clientId={linkedInData.CLIENT_ID}
                onSuccess={linkedInResponse}
                onFailure={onFailure}
                scope="r_liteprofile r_emailaddress"
                state="gjhcbf355ESDE"
                redirectUri={linkedInData.REDIRECT_URI}
                renderElement={(renderProps: any) => (<a onClick={renderProps.onClick} >
                    <img src={linkedin} alt="linkedin" />
                </a>
                )}
            />
            {/* <AppleLogin
                clientId="com.react.apple.login"
                redirectURI="https://redirectUrl.com"
            /> */}
            {/* <a href="javascript:void(0)" >
                <img src={linkedin} alt="linkedin" />
            </a> */}
            {/* <a href="javascript:void(0)">
                <img src={apple} alt="apple" />
            </a> */}
        </div>
    )
}

export default SocialAuth
