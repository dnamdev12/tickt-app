import React, { useState, useEffect } from 'react';
import Constants from '../../../../utils/constants';
import regex from '../../../../utils/regex';
import BannerSearch from './bannerSearch';

import bannerimg from '../../../../assets/images/home-banner.png';
import residential from "../../../../assets/images/ic-residential.png";

const HomeBanner = (props: any) => {
    const [stateData, setStateData] = useState<any>({
        searchedJob: '',
        isSearchedJobSelected: false,
        tradeId: '',
        specializationId: '',
        searchedJobId: null,
        location: {
            coordinates: []
        },
        locationName: '',
        from_date: '',
        startDate: '',
        to_date: '',
        endDate: '',
    });

    const viewMoreClicked = () => {
        props.history.push({
            pathname: '/jobs-in-your-area',
            heading: "Jobs in your area",
            viewAllClicked: true,
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
