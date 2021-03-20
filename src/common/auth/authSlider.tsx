import { Component } from 'react';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import logoyellow from '../../assets/images/ic-logo-yellow.png';
import bannerimage1 from '../../assets/images/onboarding-banner-1.jpg';
import bannerimage2 from '../../assets/images/onboarding-banner-2.jpg';
import bannerimage3 from '../../assets/images/onboarding-banner-3.jpg';

interface Props {
    type: string
}

const DATA: any = {
    login: {
        title: 'Have an account? ',
        button: 'Log In',
        nav: 'login',
    },
    signup: {
        title: 'Don’t have an account?',
        button: 'Sign up',
        nav: 'signup',
    }
}

const SLIDER_DATA = [
    {
        image: bannerimage1,
    },
    {
        image: bannerimage2,
    },
    {
        image: bannerimage3,
    }
]

class AuthSlider extends Component<Props> {
    render() {
        const responsive = {
            desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 1,
                slidesToSlide: 1, // optional, default to 1.
            },
        };
        const data = DATA[this.props.type];
        return (
            <Carousel responsive={responsive} autoPlay={true} showDots={true} arrows={false}>
                {SLIDER_DATA.map((item) => {
                    return (<div>
                        <figure className="banner_img">
                            <figure className="logo">
                                <img src={logoyellow} alt="logo" />
                            </figure>
                            <img src={item.image} alt="banner-img" />
                            <div className="slider_txt">
                                <span>Make yourself on what you do best</span>
                            </div>
                            <div className="bottom_txt">
                                <span className="reg">{data.title}
                                    <Link to={data.nav} className="link"> {data.button}</Link>
                                </span>
                            </div>

                        </figure>
                    </div>)
                })}
            </Carousel>
        )
    }
}

export default AuthSlider;