import React, { PureComponent } from 'react';
import 'react-multi-carousel/lib/styles.css';
import Carousel from 'react-multi-carousel';
import logoyellow from '../../assets/images/ic-logo-yellow.png';
import bannerimage1 from '../../assets/images/onboarding-banner-1.jpg';
import bannerimage2 from '../../assets/images/onboarding-banner-2.jpg';
import bannerimage3 from '../../assets/images/onboarding-banner-3.jpg';


interface Props {

}







class sliderComponent extends React.Component {


    render() {

        const responsive = {

            desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 1,
                slidesToSlide: 1, // optional, default to 1.
            },
        };

        return (

            <>
                <Carousel responsive={responsive} autoPlay={true} showDots={true} arrows={false}>
                    <div>
                        <figure className="banner_img">
                            <figure className="logo">
                                <img src={logoyellow} alt="logo" />
                            </figure>
                            <img src={bannerimage1} alt="banner-img" />
                            <div className="slider_txt">
                                <span>Make yourself on what you do best</span>
                            </div>
                            <div className="bottom_txt">
                                <span className="reg">Don’t have an account? 
                                    <a href="javascript:void(0)" className="link"> Sign up</a>
                                </span>
                            </div>

                        </figure>
                    </div>
                    <div>
                        <figure className="banner_img">
                            <figure className="logo">
                                <img src={logoyellow} alt="logo" />
                            </figure>
                            <img src={bannerimage2} alt="banner-img" />
                            <div className="slider_txt">
                                <span>Make yourself on what you do best</span>
                            </div>
                            <div className="bottom_txt">
                                <span className="reg">Don’t have an account? 
                                    <a href="javascript:void(0)" className="link"> Sign up</a>
                                </span>
                            </div>

                        </figure>
                    </div>
                    <div>
                        <figure className="banner_img">
                            <figure className="logo">
                                <img src={logoyellow} alt="logo" />
                            </figure>
                            <img src={bannerimage3} alt="banner-img" />
                            <div className="slider_txt">
                                <span>Make yourself on what you do best</span>
                            </div>
                            <div className="bottom_txt">
                                <span className="reg">Don’t have an account?  <a href="javascript:void(0)" className="link"> Sign up</a> </span>
                            </div>

                        </figure>
                    </div>

                </Carousel>
            </>




        )
    }
}


export default sliderComponent;