import { useState } from 'react';
import Constants from '../../utils/constants';
import gmail from '../../assets/images/ic-google.png';
import linkedin from '../../assets/images/ic-linkedin.png';
import apple from '../../assets/images/ic-apple.png';
import { checkSocialId } from '../../redux/auth/actions';
import { GoogleLogin } from 'react-google-login';
// @ts-ignore
import { LinkedIn } from 'react-linkedin-login-oauth2';
import AppleLogin from 'react-apple-login'

interface Propstype {
    onSuccess: Function
}

const SocialAuth = (props: Propstype) => {
    const [userDetails, setUserDetails] = useState({
        isAuthenticated: false,
        user: null,
        token: ''
    })

    const onFailure = (error: any) => {
        console.log(error);
    };

    const googleResponse = (response: any) => {
        console.log(response, "g-oauth response");
        if (checkSocialId(response.googleId)) {
            props.onSuccess(response.profileObj, 'google')
        }
    };

    const linkedinResponse = (response: any) => {
        console.log(response, "linkedin-oauth response")
    }

    return (
        <div className="continue_with">
            <GoogleLogin
                clientId={Constants.SocialAuth.GOOGLE_CLIENT_ID}
                onSuccess={googleResponse}
                onFailure={onFailure}
                render={(renderProps) => (<a href="javascript:void(0)" onClick={renderProps.onClick}>
                    <img src={gmail} alt="google" />
                </a>)}
            />
            {/* <LinkedIn
                clientId="81lx5we2omq9xh"
                onFailure={linkedinResponse}
                onSuccess={onFailure}
                redirectUri="http://localhost:3000/linkedin"
            />
            <AppleLogin
                clientId="com.react.apple.login"
                redirectURI="https://redirectUrl.com"
            /> */}
            <a href="javascript:void(0)" >
                <img src={linkedin} alt="linkedin" />
            </a>
            <a href="javascript:void(0)" >
                <img src={apple} alt="apple" />
            </a>
        </div>
    )
}

export default SocialAuth
