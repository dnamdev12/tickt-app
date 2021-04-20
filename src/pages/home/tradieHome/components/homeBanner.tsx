import React, { useState, useEffect } from 'react';
import Constants from '../../../../utils/constants';
import regex from '../../../../utils/regex';
import BannerSearch from './bannerSearch';

import bannerimg from '../../../../assets/images/home-banner.png';

const HomeBanner = (props: any) => {

    const viewMoreClicked = () => {
        var jobData = {
            lat: '21.17021',
            long: '72.831062',
            jobType: '',
        }
        props.getJobWithJobTypeLatLong(jobData);
        props.history.push({
            pathname: '/search-results',
            state: { selectedMapLocation: "Gurgaon", location: { coordinates: [21.17021, 72.831062] } }
        })
    }

    return (
        <div className="home_banner">
            <figure className="banner_img">
                <img src={bannerimg} alt="bannerimg" />
                <div className="banner_container">
                    <BannerSearch {...props} />
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

export default HomeBanner
