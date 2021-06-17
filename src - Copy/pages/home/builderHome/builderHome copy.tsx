import React, { useState, useEffect } from 'react';
import Banner from './components/banner';
import Categories from './components/categories';
import JobTypes from './components/jobTypes';
import PopularTradies from './components/popularTradies';
import RecommendedTradies from './components/recommendedTradies';
import SavedJobs from './components/savedJobs';
import SavedTradies from './components/savedTradies';
import Geocode from "react-geocode";
import { withRouter } from 'react-router'

import TradieHome from '../../shared/tradieHome';

const BuilderHome = (props: any) => {
    const { callTradeList, jobDataWithJobTypeLatLong, getRecentSearchList, getJobWithJobTypeLatLong, tradeListData } = props;
    const [localCoods, setLocalCoods] = useState<any>({});

    const getCurrentLocation = async () => {
        let permission_web = await navigator.permissions.query({ name: 'geolocation' });
        console.log({ permission_web }, '56')
        if (permission_web.state !== 'denied') {
            //   setLoading(true)
            console.log({ state: permission_web.state }, 'if')
            const position: any = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });
            console.log({ position, coods: position?.coords, lat: position?.coords?.latitude }, '62')
            if (position?.coords?.latitude) {
                let { latitude, longitude } = position.coords;
                console.log({ latitude, longitude }, '-------------');

                const jobData = {
                    // lat: '21.17021',
                    // long: '72.831062',
                    lat: latitude,
                    long: longitude,
                    jobType: '',
                }
                setLocalCoods(jobData);
                getJobWithJobTypeLatLong(jobData);

                // let response: any = await Geocode.fromLatLng(longitude.toString(), latitude.toString());
                // console.log({ response }, '65')
                // if (response) {
                //     const address = response.results[0].formatted_address;
                //     let coordinates_values = [latitude, longitude];
                //     console.log('before set', { coordinates_values, address })
                //     // setLocation({ coordinates: coordinates_values, address: address })
                //     // setLoading(false);
                // }
            }

        } else {
            console.log('Please enable the location permission from the settings so that Tickt app can access your location');
            //   setError('Please enable the location permission from the settings so that Tickt app can access your location');
        }
    }

    useEffect(() => {
        console.log({
            jobDataWithJobTypeLatLong
        })
        if(!Object.keys(jobDataWithJobTypeLatLong).length){
            getCurrentLocation();
            getRecentSearchList();
            callTradeList();
        }
        console.log({ props, home: props.jobDataWithJobTypeLatLong, localCoods })
    }, []);

    let home_data: any = jobDataWithJobTypeLatLong;
    let { recomended_tradespeople, saved_tradespeople } = home_data;
    console.log({
        recomended_tradespeople,
        saved_tradespeople
    })
    return (
        <div className="app_wrapper" >
            <Banner {...props} />
            {/* Banner close */}

            {/* Categories */}
            {/* <Categories {...props} /> */}
            {/* Categories close*/}

            {/* Job types */}
            {/* <JobTypes {...props} /> */}
            {/* Job types close*/}

            {/* Saved jobs */}
            {/* <SavedJobs {...props} /> */}
            {/* Saved jobs close*/}

            {/* Saved Tradies */}
            <TradieHome
                {...props}
                data={saved_tradespeople}
                title={"Saved tradespeople"}
                length={3}
                // redirectPath={"/saved-trade-people"}
            />
            {/* <SavedTradies
                {...props}
                data={saved_tradespeople}
                tradeList={tradeListData}
            /> */}
            {/* Saved Tradies close*/}

            {/* Popular Tradies */}
            {/* <PopularTradies {...props} /> */}
            {/* Popular Tradies close*/}

            {/* Reccomended tradies */}
            <TradieHome
                {...props}
                data={recomended_tradespeople}
                title={"Recommended tradespeople"}
                // redirectPath={'/recommended-trade-people'}
                length={9}
            />
            {/* <RecommendedTradies
                {...props}
                data={recomended_tradespeople}
                tradeList={tradeListData}
            /> */}
            {/* Reccomended tradies close*/}
        </div>
    )
}

export default withRouter(BuilderHome);


/* Under construction */
    // return (
    //     <div className="app_wrapper" >
    //         <div className="custom_container">
    //             <div className="under_construction_wrap">
    //                 <figure className="constrction_img">
    //                     <img src={uc} alt="coming soon" />
    //                 </figure>
    //                 <h2>This Page is under construction. Please come back later.</h2>
    //             </div>
    //         </div>
    //     </div>
    // )
/* Under construction */