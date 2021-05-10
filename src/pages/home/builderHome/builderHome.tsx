import React, { useState, useEffect, useCallback } from 'react';
import Banner from './components/banner';
// import Categories from './components/categories';
// import JobTypes from './components/jobTypes';
// import PopularTradies from './components/popularTradies';
// import RecommendedTradies from './components/recommendedTradies';
// import SavedJobs from './components/savedJobs';
// import SavedTradies from './components/savedTradies';
// import Geocode from "react-geocode";
import { withRouter } from 'react-router'
import { setShowToast, setLoading } from '../../../redux/common/actions';
import { getBuilderHomeData } from '../../../redux/jobs/actions';

import TradieHome from '../../shared/tradieHome';

const BuilderHome = (props: any) => {
    let { callTradeList, getRecentSearchList, setHomeBuilder, builderHome, tradeListData, tradieHomeData } = props;

    const getBuilderData = useCallback(async (data: any) => {
        // let { status, response } = await getBuilderHomeData(data);
        // if (status) {
        //     setHomeBuilder(response)
        // }

    }, [])

    const checkPermission = async () => {
        const showPosition = (position: any) => {
            let { latitude, longitude } = position.coords;
            const jobType = { lat: latitude, long: longitude, jobType: '', tradie: true };
            getBuilderData(jobType);
        }

        const postionError = (error: any) => {
            const jobType = { lat: '37.8136', long: '144.9631', jobType: '', tradie: true };
            getBuilderData(jobType);
        }

        let permission: any = await navigator.permissions.query({ name: 'geolocation' });
        if (permission.state === 'denied') {
            setShowToast(true, 'Please enable the location permission from the settings so that Tickt app can access your location');
        }
        navigator.geolocation.getCurrentPosition(showPosition, postionError)
    }

    useEffect(() => {
        getRecentSearchList();
        callTradeList();
        let data = builderHome || null;
        console.log({data},'-------------------------------->')
        // if (!data || !Object.keys(data)?.length) {
        //     checkPermission();
        // }
        const jobType = { lat: '37.8136', long: '144.9631', jobType: '', tradie: true };
        props.setHomeBuilder(jobType);
    }, []);

    console.log({ builderHome }, 'home_data', props.testBuilderHome)
    let home_data: any = builderHome || null;
    // let recomended_tradespeople: any = home_data?.recomended_tradespeople || [];
    // let saved_tradespeople: any = home_data?.saved_tradespeople || [];
    return (
        <div className="app_wrapper" >
            <Banner {...props} />

            <TradieHome
                {...props}
                data={builderHome?.saved_tradespeople}
                title={"Saved tradespeople"}
                length={3} // redirectPath={"/saved-trade-people"}
            />

            <TradieHome
                {...props}
                data={builderHome?.recomended_tradespeople}
                title={"Recommended tradespeople"} // redirectPath={'/recommended-trade-people'}
                length={9}
            />
        </div>
    )
}

export default withRouter(BuilderHome);
