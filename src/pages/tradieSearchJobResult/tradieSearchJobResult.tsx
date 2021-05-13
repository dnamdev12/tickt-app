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

// <img src={noData} alt="data not found" />

const TradieSearchJobResult = (props: any) => {
    const [searchResultData, setSearchResultData] = useState({
        page: 1,
        searchByFilter: false,
        cleanFiltersData: false
    })
    const [mapData, setMapData] = useState<any>({
        showMap: false
    })
    const [paramsData, setParamsData] = useState<any>({})

    const location: any = useLocation();

    useEffect(() => {
        var queryParamsData = getQueryParamsData();

        if (queryParamsData.jobResults == 'viewNearByJob') {
            const data = {
                page: 1,
                long: queryParamsData.defaultLong,
                lat: queryParamsData.defaultLat
                // long: 72.831062
                // lat: 21.17021,
            }
            props.getViewNearByJob(data);
        } else if (queryParamsData.jobResults == 'jobTypeList') {
            const data = {
                page: 1,
                isFiltered: false,
                jobTypes: queryParamsData.jobTypes,
                location: {
                    coordinates: [queryParamsData.defaultLong, queryParamsData.defaultLat]
                }
            }
            props.postHomeSearchData(data);
        } else if (!queryParamsData.isFiltered) {
            const data: any = {
                page: 1,
                isFiltered: queryParamsData.isFiltered,
                ...(queryParamsData.tradeId?.length && { tradeId: queryParamsData.tradeId }),
                ...(queryParamsData.jobTypes?.length && { jobTypes: queryParamsData.jobTypes }),
                ...(queryParamsData.specializationId?.length && { specializationId: queryParamsData.specializationId }),
                ...(queryParamsData.from_date && { from_date: queryParamsData.from_date }),
                ...(queryParamsData.to_date && { to_date: queryParamsData.to_date }),
                location: {
                    coordinates: [queryParamsData.long ? queryParamsData.long : queryParamsData.defaultLong, queryParamsData.lat ? queryParamsData.lat : queryParamsData.defaultLat]
                }
            }
            console.log(data, "data tradie search result");
            props.postHomeSearchData(data);
        }
    }, [])

    const getQueryParamsData = () => {
        const params = new URLSearchParams(props.history?.location?.search);
        const specializationString = params.get('specializationId')
        const specializationArray = specializationString?.split(',');
        const tradeIdArray = params.get('tradeId') ? [params.get('tradeId')] : null;
        const jobTypesArray = params.get('jobTypes') ? [params.get('jobTypes')] : null;
        const queryParamsData: any = {
            page: Number(params.get('page')),
            isFiltered: params.get('isFiltered') === "true",
            tradeId: tradeIdArray,
            specializationId: specializationArray,
            lat: Number(params.get('lat')),
            long: Number(params.get('long')),
            defaultLat: Number(params.get('defaultLat')),
            defaultLong: Number(params.get('defaultLong')),
            address: params.get('address'),
            from_date: params.get('from_date'),
            to_date: params.get('to_date'),
            jobResults: params.get('jobResults'),
            heading: params.get('heading'),
            jobTypes: jobTypesArray,
            searchJob: params.get('searchJob'),
            max_budget: Number(params.get('max_budget')),
            pay_type: params.get('pay_type'),
            sortBy: params.get('sortBy')
            //Array.isArray(params.get('jobTypes'))
        }
        setParamsData(queryParamsData);
        return queryParamsData;
    }

    console.log(paramsData, "paramsData");


    const renderJobsData = () => {
        var jobsData;
        const jobResultsParam = new URLSearchParams(props.location?.search).get('jobResults');
        if (searchResultData.searchByFilter) {
            jobsData = props.homeSearchJobData;
            return jobsData;
        }
        if (jobResultsParam == 'viewNearByJob') {
            jobsData = props.viewNearByJobData;
            return jobsData;
        } else {
            jobsData = props.homeSearchJobData;
            return jobsData;
        }
        return null;
    }

    const showBudgetFilterResults = (allFiltersData: any) => {
        if (allFiltersData == 'searchedBySearchBannerClicked') {
            return;
        }
        const newParamsData = getQueryParamsData();
        console.log(allFiltersData, 'allFiltersData', newParamsData);
        var data = {
            ...newParamsData,
            jobResults: null,
            // isFiltered: true,
            ...(allFiltersData.sortBy ? { isFiltered: true } : { isFiltered: false }),
            ...(allFiltersData.tradeId?.length && { tradeId: allFiltersData.tradeId }),
            ...(allFiltersData.jobTypes?.length && { jobTypes: allFiltersData.jobTypes }),
            ...(allFiltersData.specializationId?.length && { specializationId: allFiltersData.specializationId }),
            ...(allFiltersData.pay_type && { pay_type: allFiltersData.pay_type }),
            ...(allFiltersData.max_budget && { max_budget: allFiltersData.max_budget }),
            ...(allFiltersData.sortBy && { sortBy: allFiltersData.sortBy })
        }
        // if (!newParamsData.searchJob && allFiltersData?.specializationId?.length && allFiltersData?.tradeId?.length && allFiltersData?.jobTypes?.length) {
        if (allFiltersData?.specializationId?.length && allFiltersData?.tradeId?.length && allFiltersData?.jobTypes?.length) {
            const specializationList = props.tradeListData?.find((i: any) => i._id === allFiltersData?.tradeId[0])?.specialisations;
            const specializationName = specializationList?.find((i: any) => i._id === allFiltersData?.specializationId[0])?.name;
            if (specializationName) {
                data = {
                    ...data,
                    searchJob: specializationName
                }
            }
            console.log(specializationName, "specializationName");
        }
        Object.keys(data).forEach(key => (data[key] === undefined || data[key] === null) && delete data[key]);
        var url = 'search-job-results?';
        for (let [key, value] of Object.entries(data)) {
            console.log(key, value);
            url += `${key}=${value}&`
        }
        const newUrl = url.slice(0, url.length - 1);
        const newObjData = {
            // isFiltered: true,
            ...(allFiltersData.sortBy ? { isFiltered: true } : { isFiltered: false }),
            ...(newParamsData.page ? { page: newParamsData.page } : { page: searchResultData.page }),
            ...(newParamsData.tradeId && { tradeId: newParamsData.tradeId }),
            ...(newParamsData.specializationId && { specializationId: newParamsData.specializationId }),
            ...(newParamsData.from_date && { from_date: newParamsData.from_date }),
            ...(newParamsData.to_date && { to_date: newParamsData.to_date }),
            ...(newParamsData.jobTypes && { jobTypes: newParamsData.jobTypes }),
            location: {
                coordinates: [newParamsData.long ? newParamsData.long : newParamsData.defaultLong, newParamsData.lat ? newParamsData.lat : newParamsData.defaultLat]
            },
            ...(allFiltersData.tradeId?.length && { jobTypes: allFiltersData.tradeId }),
            ...(allFiltersData.jobTypes?.length && { jobTypes: allFiltersData.jobTypes }),
            ...(allFiltersData.specializationId?.length && { specializationId: allFiltersData.specializationId }),
            ...(allFiltersData.pay_type && { pay_type: allFiltersData.pay_type }),
            ...(allFiltersData.max_budget && { max_budget: allFiltersData.max_budget }),
            ...(allFiltersData.sortBy && { sortBy: allFiltersData.sortBy })
        }
        console.log(newUrl, "newUrl", data, "data", newObjData, "newObjData", newParamsData);
        props.postHomeSearchData(newObjData);
        props.history.replace(newUrl);
        setParamsData(data);
        setSearchResultData((prevData: any) => ({ ...prevData, searchByFilter: true }))
    }

    const cleanFiltersHandler = (isFiltersClean: boolean) => {
        setSearchResultData((prevData: any) => ({ ...prevData, cleanFiltersData: isFiltersClean }));
        if (isFiltersClean) {
            getQueryParamsData();
        }
    }

    return (
        <div className="app_wrapper" >
            <div className="top_search">
                <BannerSearch {...props} paramsData={paramsData} cleanFiltersHandler={cleanFiltersHandler} />
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
                                    <span className="title">{paramsData.jobResults == 'viewNearByJob' ? 'All around me' : paramsData.jobResults == 'jobTypeList' ? paramsData.heading : paramsData.searchJob ? `${paramsData.searchJob}${paramsData.specializationId?.length == 2 ? ' + 1 other' : paramsData.specializationId?.length >= 3 ? ` + ${paramsData.specializationId?.length - 1} others` : ''}` : ''}
                                        <span className="count">45 results</span>
                                    </span>
                                    <SearchResultFilters
                                        showBudgetFilterResults={showBudgetFilterResults}
                                        paramsData={paramsData}
                                        cleanFiltersData={searchResultData.cleanFiltersData}
                                        cleanFiltersHandler={cleanFiltersHandler}
                                    />
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
                                        return <TradieJobInfoBox item={jobData} {...props} />
                                    })) : <span>No data Found</span>}
                            </div> : renderJobsData()?.length > 0 ?
                                (renderJobsData()?.map((jobData: any) => {
                                    return <TradieJobInfoBox item={jobData} {...props} />
                                })) : <span>No data Found</span>}
                            {<div className="map_col" style={!mapData.showMap ? { display: "none" } : {}}>
                                <div className="map_stick">
                                    <span className="close_map" onClick={() => setMapData((prevData: any) => ({ ...prevData, showMap: !prevData.showMap }))}>
                                        <img src={closeMap} alt="close-map" />
                                    </span>
                                    <RenderMap {...props} searchByFilter={searchResultData.searchByFilter} />
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
