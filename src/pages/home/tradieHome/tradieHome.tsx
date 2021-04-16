import React, { useState, useEffect } from 'react';
import BannerSearch from './components/bannerSearch';

const TradieHome = (props: any) => {
    return (
        <div className="app_wrapper" >
            <BannerSearch {...props} />
        </div>
    )
}

export default TradieHome
