import React, { useState, useEffect } from 'react';
import BannerSearch from './components/bannerSearch';
import JobTypeList from './components/jobTypeList';
import RecommendedJobs from './components/recommendedJobs';

const TradieHome = (props: any) => {
    return (
        <div className="app_wrapper" >
            <BannerSearch {...props} />
            <JobTypeList {...props} />
            {/* saved jobs */}
            {/* popular builders yet to implement*/}
            <RecommendedJobs {...props} />
        </div>
    )
}

export default TradieHome;
