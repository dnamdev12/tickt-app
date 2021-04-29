import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import BannerSearch from '../home/tradieHome/components/bannerSearch/index';
import TradieJobInfoBox from '../../common/tradieJobInfoBox';
import SearchResultFilters from '../searchResultFilters/index';
import RenderMap from './renderMap';

import filterUnselected from '../../assets/images/ic-filter-unselected.png';
import filterSelected from '../../assets/images/ic-filter-selected.png';
import mapIcon from '../../assets/images/map.png';
import noData from '../../assets/images/no-data.png';
import closeMap from '../../assets/images/close-white.png';


const TradieSearchJobResult = (props: any) => {
    const [filterState, setFilterState] = useState({
        page: 1,
    })
    const [mapData, setMapData] = useState<any>({
        showMap: false,
    })

    const location: any = useLocation();

    // <img src={noData} alt="data not found" />

    useEffect(() => {
        if (location?.state?.queryParam == 'viewNearByJob') {
            const data = {
                page: 1,
                // lat: props.location?.state?.bannerData?.location?.coordinates[1],
                // long: props.location?.state?.bannerData?.location?.coordinates[0]
                lat: 21.17021,
                long: 72.831062
            }
            props.getViewNearByJob(data);
        }

        if (location?.state?.queryParam == 'jobTypeList') {
            const data = {
                page: 1,
                isFiltered: false,
                tradeId: location?.state?.tradeId
            }
            props.postHomeSearchData(data);
        }
    }, [])

    console.log(props, location);


    const renderJobsData = () => {
        // const jobsData = props.viewNearByJobData;
        // return jobsData;
        var jobsData;
        if (location?.state?.queryParam == 'viewNearByJob') {
            jobsData = props.viewNearByJobData
            return jobsData;
        }
        if (location?.state?.queryParam == 'jobTypeList') {
            jobsData = props.homeSearchJobData
            return jobsData;
        }
        return null;
    }

    const showBudgetFilterResults = (budgetFilterData: any) => {
        const data = {
            page: filterState.page,
            isFiltered: true,
            tradeId: location?.state?.tradeId,
            pay_type: budgetFilterData.pay_type,
            max_budget: budgetFilterData.max_budget,
            // location: stateData?.bannerLocation ? stateData?.bannerLocation : stateData?.location,
            // specializationId: stateData?.specializationId,
            // from_date: stateData?.from_date,
            // to_date: stateData?.to_date,
            // sortBy: 2,
        }
        props.postHomeSearchData(data);
    }

    return (
        <div className="app_wrapper" >
            <div className="top_search">
                <BannerSearch {...props} />
            </div>
            <div className="search_result">
                <div className="section_wrapper bg_gray">
                    <div className="custom_container">

                        <div className="flex_row mob_srch_option">
                            <div className="flex_col_sm_6"></div>
                            <div className="flex_col_sm_6 text-right">
                                <button className="fill_grey_btn">Modify Search</button>
                            </div>
                        </div>

                        <div className="result_heading">
                            <div className="flex_row">
                                <div className="flex_col_sm_8">
                                    <span className="title">{location?.state?.queryParam == 'viewNearByJob' ? location?.state?.heading : location?.state?.queryParam == 'jobTypeList' ? location?.state?.heading : ""}
                                        <span className="count">45 results</span>
                                    </span>
                                    <SearchResultFilters showBudgetFilterResults={showBudgetFilterResults} />
                                </div>
                                {renderJobsData()?.length > 0 && <div className="flex_col_sm_4 text-right">
                                    <a className="map_btn" onClick={() => setMapData((prevData: any) => ({ ...prevData, showMap: !prevData.showMap }))}>
                                        <img src={mapIcon} alt="map" /> Map
                                    </a>
                                </div>}
                            </div>
                        </div>
                        <div className="flex_row tradies_row">
                            {/* If the map does not come, then this div not only class (card_col) will be hidden */}
                            {mapData.showMap ? <div className="card_col">
                                {renderJobsData()?.length > 0 ?
                                    (renderJobsData()?.map((jobData: any) => {
                                        return <TradieJobInfoBox item={jobData} />
                                    })) : <span>No data Found</span>}
                            </div> : renderJobsData()?.length > 0 ?
                                (renderJobsData()?.map((jobData: any) => {
                                    return <TradieJobInfoBox item={jobData} />
                                })) : <span>No data Found</span>}
                            {mapData.showMap && <div className="map_col">
                                <div className="map_stick">
                                    <span className="close_map" onClick={() => setMapData((prevData: any) => ({ ...prevData, showMap: !prevData.showMap }))}>
                                        <img src={closeMap} alt="close-map" />
                                    </span>
                                    <RenderMap {...props} />
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TradieSearchJobResult;
