import { useState } from 'react';
import Constants from '../../utils/constants';
import gmail from '../../assets/images/ic-google.png';
import linkedin from '../../assets/images/ic-linkedin.png';
import apple from '../../assets/images/ic-apple.png';
import { checkSocialId, callSocialLinkedin } from '../../redux/auth/actions';
import NetworkOps, { FetchResponse } from '../../network/NetworkOps';
// @ts-ignore
import { GoogleLogin } from 'react-google-login';
// @ts-ignore
import { LinkedIn } from 'react-linkedin-login-oauth2';
// @ts-ignore
//import AppleLogin from 'react-apple-login'

interface Propstype {
    onSuccess: Function
}

const linkedinData = {
    //url: "https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=",
    //url: "https://www.linkedin.com/oauth/v2/authorization?response_type=code&state=789878909&scope=r_liteprofile&client_id=77vhhfg24hx1s2&redirect_uri=https://www.google.com/",
    authorizationCode: '',
    REDIRECT_URI: `${window.location.origin}/linkedin`,
    CLIENT_ID: '77vhhfg24hx1s2',
    CLIENT_SECRET: '83ODjX9bN2GIjCoj',
    //1.
    //https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id=77vhhfg24hx1s2&scope=r_emailaddress&state=gjhcbf355ESDE&redirect_uri=http://localhost:3000/
    //https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77vhhfg24hx1s2&scope=r_emailaddress&state=gjhcbf355ESDE&redirect_uri=http://localhost:3000/

    //2
    //https://www.linkedin.com/uas/oauth2/accessToken?grant_type=authorization_code&redirect_uri=http://localhost:3000/&client_id=77vhhfg24hx1s2&client_secret=83ODjX9bN2GIjCoj&code=AQSdeaJsO1qXWgna4dYRAZawQs4MCiB9foRUKqtmiuR2egEsWYXFP7M6iaRXSOO13GaOnQS8t5sAHJgCE1Gd63Bt0HNthIP0yDW4nbDsRTOKdHBHe72ayfH2MtDvFx77nSOwQMaN7zzeqaRxbGRqivyK10FHpY4wX5AZ2tmsDT-KYXgDXOtigV7HRhEwdm4I_OzbqenhxatGVN7rMVk&state=gjhcbf355ESDE
    //https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&redirect_uri=http://localhost:3000/&client_id=77vhhfg24hx1s2&client_secret=83ODjX9bN2GIjCoj&code=AQSmVVpQz0hq65r5aD2Tv2IkpM75IqCkLLKR2cpgv_zWUfSKClhpATa_4UVVkxivWAs6qgzIPwdfZLix5zVWIEw_v_Hiz0C1hZcq3uaj8GweTz_yXU8c2fP_PWFriV-264VjPk_Qfy7s-WJ0x6a9w-zanbaZ-SKcJN_ic4BD74fUVoNoxHHeH2Zrt84TFp5wRBApR9ER_EmkPnLR1QU&state=abhj57rfyged2
}

const SocialAuth = (props: Propstype) => {
    // const [userDetails, setUserDetails] = useState({
    //     isAuthenticated: false,
    //     user: null,
    //     token: ''
    // })
    const [userDetails, setUserDetails] = useState('')

    const onFailure = (error: any) => {
        console.log(error);
        console.log(error.errorMessage)
    };

    const googleResponse = async (response: any) => {
        console.log(response, "g-oauth response");
        const res = await checkSocialId(response.googleId)
        if (res.success ) {
            props.onSuccess(response.profileObj, 'google', res.isProfileCompleted)
        }
    };

    const linkedinResponse = async (response: any) => {
        console.log(response, "linkedin-oauth response")
        console.log(response.code, "linkedin-oauth code")
        //linkedinData.authorizationCode = response.code
        //const url = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${linkedinData.CLIENT_ID}&scope=r_emailaddress&state=gjhcbf355ESDE&redirect_uri=http://localhost:3000/`
        //const res = await callSocialLinkedin(url)
        if (response.code) {
            const url = `https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&redirect_uri=http://localhost:3000/linkedin&client_id=${linkedinData.CLIENT_ID}&client_secret=${linkedinData.CLIENT_SECRET}&code=${response.code}`
            //const res = await callSocialLinkedin(url)
            console.log(url, 'okk')
            var tempToken = ''
            fetch(url)
                .then(res => res.json())
                .then((data) => {
                    console.log(data);
                    console.log(data.access_token);
                    setUserDetails(data.access_token)
                })
                .catch(err => { throw err });
        }
    }

    const appleClicked = async () => {
        console.log(userDetails)
        const res2 = await fetch('https://api.linkedin.com/v2/me', {
            headers: { Authorization: `Bearer ${userDetails}` }
        })
        const response2 = res2.json()
        console.log(response2)
    }

    return (
        <div className="continue_with">
            <GoogleLogin
                clientId={Constants.SocialAuth.GOOGLE_CLIENT_ID}
                onSuccess={googleResponse}
                onFailure={onFailure}
                render={(renderProps: any) => (<a href="javascript:void(0)" onClick={renderProps.onClick}>
                    <img src={gmail} alt="google" />
                </a>)}
            />
            <LinkedIn
                clientId="77vhhfg24hx1s2"
                onSuccess={linkedinResponse}
                onFailure={onFailure}
                scope="r_liteprofile r_emailaddress"
                state="34232423"
                redirectUri={`${window.location.origin}/linkedin`}
                renderElement={(renderProps: any) => (<a href="javascript:void(0)" onClick={renderProps.onClick} >
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
            <a href="javascript:void(0)" onClick={appleClicked}>
                <img src={apple} alt="apple" />
            </a>
        </div>
    )
}

export default SocialAuth
