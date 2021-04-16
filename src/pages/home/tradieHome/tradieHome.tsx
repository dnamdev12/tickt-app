import React, { useState, useEffect } from 'react';
import BannerSearch from './components/bannerSearch';
import JobCategories from './components/jobCategories';

const TradieHome = (props: any) => {
    return (
        <div className="app_wrapper" >
            <BannerSearch {...props} />
            <JobCategories {...props} />
        </div>
    )
}

export default TradieHome
