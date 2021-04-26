import { useState, useEffect } from 'react';
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow
} from '@react-google-maps/api';
import BannerSearch from '../home/tradieHome/components/bannerSearch/index';
import TradieJobInfoBox from '../../common/tradieJobInfoBox';
import SearchResultFilters from '../searchResultFilters/index';
import RenderMap from './renderMap';

import filterUnselected from '../../assets/images/ic-filter-unselected.png';
import filterSelected from '../../assets/images/ic-filter-selected.png';
import mapIcon from '../../assets/images/map.png';

const libraries: any = ["places", "geometry"];
const center = {
    lat: -37.840935,
    lng: 144.946457
}
const mapContainerStyle = {
    width: "100vw",
    height: "100vh"
}

const queryParams = new URLSearchParams(window.location.search).get('type');

const TradieSearchJobResult = (props: any) => {
    const [mapData, setMapData] = useState<any>({
        showMap: false,
    })

    // useEffect(() => {
    //     // if(queryParams == 'viewNearByJob'){
    //     //     const data = {
    //     //     lat: props.bannerData.location.coordinates[1],
    //     //     long: props.bannerData.location.coordinates[0],
    //     //     page : 1
    //     // }
    //     // props.getViewNearByJob(data);
    //     }
    // }, [])
    
    console.log(queryParams, "queryParam",)

    
    const renderJobsData = () => {
        const jobsData = props.jobDataWithJobTypeLatLong?.most_viewed_jobs;
        return jobsData;
        // var jobsData;
        // if(queryParams == 'viewNearByJob'){
        //     jobsData = props.viewNearByJobData
        //     return jobsData;
        // }
        // return null;
    }

    return (
        <div className="app_wrapper" >
            <div className="top_search">
                <BannerSearch {...props} />
            </div>
            <div className="search_result">
                <div className="section_wrapper bg_gray">
                    <div className="custom_container">
                        <div className="result_heading">
                            <div className="flex_row">
                                <div className="flex_col_sm_8">
                                    <span className="title"> Search result heading
                                        <span className="count">45 results</span>
                                    </span>
                                    <SearchResultFilters />
                                </div>
                                <div className="flex_col_sm_4 text-right">
                                    <a className="map_btn" onClick={() => setMapData((prevData: any) => ({ ...prevData, showMap: !prevData.showMap }))}>
                                        <img src={mapIcon} alt="map" /> Map
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="flex_row tradies_row">
                            {/* If the map does not come, then this div not only class (card_col) will be hidden */}
                            {mapData.showMap ? <div className="card_loc">
                                {renderJobsData()?.length > 0 ?
                                    (renderJobsData()?.map((jobData: any) => {
                                        return <TradieJobInfoBox item={jobData} />
                                    })) : <span>No data Found</span>}
                            </div> : renderJobsData()?.length > 0 ?
                                (renderJobsData()?.map((jobData: any) => {
                                    return <TradieJobInfoBox item={jobData} />
                                })) : <span>No data Found</span>}
                        </div>
                        {mapData.showMap && <div className="map_col">
                            <div className="map_stick">
                                <RenderMap />
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TradieSearchJobResult;
