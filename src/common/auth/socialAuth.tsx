import { useState } from 'react';
import Constants from '../../utils/constants';
import gmail from '../../assets/images/ic-google.png';
import linkedin from '../../assets/images/ic-linkedin.png';
import apple from '../../assets/images/ic-apple.png';
import { checkSocialId, getLinkedinProfile, socialSignupLogin, checkEmailId } from '../../redux/auth/actions';
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
}

const linkedInData = {
    REDIRECT_URI: `${window.location.origin}/linkedin`,
    CLIENT_ID: '77vhhfg24hx1s2',
    CLIENT_SECRET: '83ODjX9bN2GIjCoj',
}

//1.
//https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77vhhfg24hx1s2&scope=r_liteprofile r_emailaddress&state=gjhcbf355ESDE&redirect_uri=http://localhost:3000/linkedin

//2
//https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&redirect_uri=http://localhost:3000/linkedin&client_id=77vhhfg24hx1s2&client_secret=83ODjX9bN2GIjCoj&code=AQSmVVpQz0hq65r5aD2Tv2IkpM75IqCkLLKR2cpgv_zWUfSKClhpATa_4UVVkxivWAs6qgzIPwdfZLix5zVWIEw_v_Hiz0C1hZcq3uaj8GweTz_yXU8c2fP_PWFriV-264VjPk_Qfy7s-WJ0x6a9w-zanbaZ-SKcJN_ic4BD74fUVoNoxHHeH2Zrt84TFp5wRBApR9ER_EmkPnLR1QU&state=abhj57rfyged2


const SocialAuth = (props: Propstype) => {
    // const [userDetails, setUserDetails] = useState({
    //     isAuthenticated: false,
    //     user: null,
    //     token: ''
    // })
    //const [userDetails, setUserDetails] = useState('')

    const onFailure = (error: any) => {
        console.log(error);
    };

    const googleResponse = async (response: any) => {
        console.log(response, "g-oauth response");
        const res = await checkSocialId(response.googleId)
        if (res.success) {
            if (res.isProfileCompleted) {
                //in case of existing social account
                const data: any = {
                    //firstName: profileData.name,
                    email: response.profileObj.email,
                    socialId: response.profileObj.googleId,
                    deviceToken: "323245356tergdfgrtuy68u566452354dfwe",
                    accountType: "google",
                    ...(props.userType && { user_type: props.userType })
                }
                const res = await socialSignupLogin(data)
                if (res.success) {
                    props.history.push('/')
                }
            } else {
                //in case of new social account
                props.onNewAccount(response.profileObj, 'google');
            }
        }
    };

    const linkedInResponse = async (response: any) => {
        console.log(response, "linkedin-oauth response")
        const resSocial = await getLinkedinProfile(response.code)
        if (resSocial.success) {
            const linkedInData = await checkEmailId(resSocial.result.email)
            if (linkedInData.isProfileCompleted) {
                //in case of existing social account
                const data: any = {
                    //firstName: profileData.name,
                    email: resSocial.result.email,
                    deviceToken: "323245356tergdfgrtuy68u566452354dfwe",
                    accountType: "linkedin",
                    ...(props.userType && { user_type: props.userType })
                }
                const resAuth = await socialSignupLogin(data)
                if (resAuth.success) {
                    props.history.push('/')
                }
            } else {
                //in case of new social account
                props.onNewAccount({ firstName: resSocial.result.firstName, email: resSocial.result.email }, 'linkedin');
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
                redirectUri= {linkedInData.REDIRECT_URI}
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
