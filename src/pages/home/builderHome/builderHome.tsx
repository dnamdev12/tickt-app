import React, { useState, useEffect, useCallback } from 'react';
import Banner from './components/banner';
// import Categories from './components/categories';
// import JobTypes from './components/jobTypes';
// import PopularTradies from './components/popularTradies';
// import RecommendedTradies from './components/recommendedTradies';
// import SavedJobs from './components/savedJobs';
// import SavedTradies from './components/savedTradies';
import Geocode from "react-geocode";
import { withRouter } from 'react-router'
import { setShowToast, setLoading } from '../../../redux/common/actions';
import { getBuilderHomeData } from '../../../redux/jobs/actions';
import TradieHome from '../../shared/tradieHome';
import JobTypes from './components/jobTypes';
import axios from 'axios';

import dummy from '../../../assets/images/u_placeholder.jpg';

import * as moment from 'moment';
import 'moment-timezone';

Geocode.setApiKey("AIzaSyDKFFrKp0D_5gBsA_oztQUhrrgpKnUpyPo");

const setKey = () => {
    localStorage.setItem('toastLocation', 'true');
}

const getKey = () => {
    return localStorage.getItem('toastLocation');
}
var responseElement: any = {};
const BuilderHome = (props: any) => {
    let { callTradeList, getRecentSearchList, setHomeBuilder, builderHome, tradeListData, tradieHomeData } = props;
    const [addressItem, setAddressItem] = useState();
    const [position, setPosition] = useState<any>({});
    const [stateData, setStateData] = useState({});

    const [force, forceUpdate] = useState({});


    const fetchItems = async (latitude: any, longitude: any) => {
        // Get address from latitude & longitude.
        try {
            let response = await Geocode.fromLatLng(latitude.toString(), longitude.toString())
            if (response) {
                const address = response.results[0].formatted_address;
                setAddressItem(address)
            }
        } catch (err) {
            console.log({ err });
        }
    }

    const checkPermission = async () => {
        const showPosition = async (position: any) => {
            let { latitude, longitude } = position.coords;
            // const jobType = { lat: latitude, long: longitude, jobType: '', tradie: true };
            localStorage.setItem('position', `[${longitude},${latitude}]`);
            setPosition({ lat: latitude, long: longitude });
            // console.log({ jobType }, '--------------!!!');
            console.log('fetch In If condition')
            await fetchByLatLong({ lat: latitude, long: longitude });

            // Get address from latitude & longitude.
            await fetchItems(latitude.toString(), longitude.toString());
        }

        const postionError = async (error: any) => {
            // const jobType = { lat: '-37.8136', long: '144.9631', jobType: '', tradie: true };
            console.log('fetch In Else condition')
            await fetchByLatLong({ lat: '-37.8136', long: '144.9631' });
            // setHomeBuilder(jobType);
            setPosition({ lat: '-37.8136', long: '144.9631' });
            localStorage.setItem('position', '[-37.8136, 144.9631]');
            // await fetchItems('-37.8136', '144.9631');
        }

        let permission: any = await navigator.permissions.query({ name: 'geolocation' });
        if (permission.state === 'denied') {
            if (getKey() !== "true") {
                setShowToast(true, 'Please enable the location permission from the settings so that Tickt app can access your location');
                setKey();
            }
        }
        navigator.geolocation.getCurrentPosition(showPosition, postionError)
    }

    // const UpdateForcefully = () => {
    //     if (Array.isArray(force)) {
    //         forceUpdate({})
    //     } else {
    //         forceUpdate([]);
    //     }
    // }

    useEffect(() => {
        getRecentSearchList();
        callTradeList();
        // let data = props.testBuilderHome || null;
        // console.log({ data }, 'Here! -->')
        // if (!data || !Object.keys(data)?.length || !data?.saved_tradespeople?.length) {
        checkPermission();
        // }
    }, []);


    // useEffect(() => {
    //     console.log('Here! -------------->')
    //     if (props?.testBuilderHome && Object.keys(props?.testBuilderHome).length && !Object.keys(stateData).length) {
    //         setStateData(props?.testBuilderHome);
    //     }
    // }, [props])

    // useEffect(() => {
    //     UpdateForcefully();
    // }, [stateData])

    const fetchByLatLong = async (data: any) => {
        console.log({ params: data })
        let url: string = `${process.env.REACT_APP_BASE_URL}/v1/home?lat=${data.lat}&long=${data.long}`
        let item: any = localStorage.getItem('jwtToken')
        try {
            let response = await axios({
                url,
                method: 'get',
                headers: {
                    Authorization: JSON.parse(item),
                    timezone: moment.tz.guess(),
                }
            })

            if (response?.status === 200) {
                let data: any = response?.data;
                console.log({ data });
                responseElement = data?.result;
                // setStateData((prev: any) => ({ ...prev, ...data?.result }));

            }
        } catch (err) {
            console.log({ err });
        }
    }

    let home_data: any = responseElement;
    return (
        <div className="app_wrapper" >

            <Banner
                {...props}
                current_address={addressItem}
                position={position}
            />

            <JobTypes
                {...props}
            />

            <TradieHome
                {...props}
                data={home_data?.saved_tradespeople}
                title={"Saved tradespeople"}
                length={3} // redirectPath={"/saved-trade-people"}
            />

            <div className="section_wrapper bg_gray">
                <div className="custom_container">
                    <span className="title">
                        {'Popular tradespeople'}
                    </span>
                    <ul className="popular_tradies">
                        {home_data?.popular_tradespeople?.length ?
                            home_data?.popular_tradespeople?.map((item: any, index: number) => {
                                return (
                                    <li key={`${item.userName}item${index}`} data-aos="flip-right" data-aos-delay="200" data-aos-duration="1000">
                                        <figure className="tradies_img">
                                            <img src={item.userImage || dummy} alt="tradies-img" />
                                        </figure>
                                        <span className="name">{item.userName}</span>
                                        <span className="post">{item.trade}</span>
                                    </li>)
                            }) :
                            <span>
                                {'No Data Found'}
                            </span>
                        }
                    </ul>
                    <button
                        className="fill_grey_btn full_btn m-tb40 view_more"
                        onClick={() => { setShowToast(true, 'Under development'); }}
                    >
                        {'View all'}
                    </button>
                </div>
            </div>

            <TradieHome
                {...props}
                data={home_data?.recomended_tradespeople}
                title={"Recommended tradespeople"} // redirectPath={'/recommended-trade-people'}
                length={9}
            />

            <TradieHome
                {...props}
                data={home_data?.mostViewed_tradespeople}
                title={"Most Viewed tradespeople"} // redirectPath={'/recommended-trade-people'}
                length={9}
            />
        </div>
    )
}

export default withRouter(BuilderHome);
