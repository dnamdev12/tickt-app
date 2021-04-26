import { useState } from 'react';
import BannerSearch from './bannerSearch/index';

import bannerimg from '../../../../assets/images/home-banner.png';

interface PropsType {
    history: any,
    bannerData: any,
    setBannerData: (data: any) => void,
    getViewNearByJob: (data: any) => void,
}

const HomeBanner = (props: PropsType) => {

    const viewMoreClicked = () => {
        // const data = {
        //     lat: props.bannerData.location.coordinates[1],
        //     long: props.bannerData.location.coordinates[0],
        //     page : 1
        // }
        // props.getViewNearByJob(data);
        props.history.push({
            pathname: '/search-job-results',
            search: '?type=viewNearByJob'
        })
    }


    return (
        <div className="home_banner">
            <figure className="banner_img">
                <img src={bannerimg} alt="bannerimg" />
                <div className="banner_container">
                    <BannerSearch {...props}/>
                    <div className="text-center">
                        <h1 className="heading text_effect">See all around me</h1>
                        <p className="commn_para">Get the job in your area</p>
                        <button className="fill_btn view-btn" onClick={viewMoreClicked}>View More</button>
                    </div>
                </div>
            </figure>
        </div >
    )
}

export default HomeBanner;
