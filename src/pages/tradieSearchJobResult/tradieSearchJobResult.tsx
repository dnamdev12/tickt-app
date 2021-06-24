import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import BannerSearch from '../home/tradieHome/components/bannerSearch/index';
import TradieJobInfoBox from '../../common/tradieJobInfoBox';
import SearchResultFilters from '../searchResultFilters/index';
import RenderMap from './renderMap';

import mapIcon from '../../assets/images/map.png';
import noData from '../../assets/images/no-search-data.png';
import closeMap from '../../assets/images/close-white.png';

const TradieSearchJobResult = (props: any) => {
    const [searchResultData, setSearchResultData] = useState({
        page: 1,
        searchByFilter: false,
        cleanFiltersData: false
    })
    const [mapData, setMapData] = useState<any>({
        showMap: false
    })
    const [paramsData, setParamsData] = useState<any>({});
    const [isToggleModifySearch, setToggleModifySearch] = useState<boolean>(false);

    const location: any = useLocation();

    useEffect(() => {
        var queryParamsData = getQueryParamsData();

        if (queryParamsData.jobResults == 'viewNearByJob') {
            const data = {
                page: 1,
                long: queryParamsData.defaultLong,
                lat: queryParamsData.defaultLat
            }
            props.getViewNearByJob(data);
        } else {
            const data: any = {
                page: 1,
                ...(queryParamsData.sortBy === 2 ? { isFiltered: true } : { isFiltered: false }),
                ...(queryParamsData.tradeId?.length && { tradeId: queryParamsData.tradeId }),
                ...(queryParamsData.jobTypes?.length && { jobTypes: queryParamsData.jobTypes }),
                ...(queryParamsData.specializationId?.length && { specializationId: queryParamsData.specializationId }),
                ...(queryParamsData.from_date && { from_date: queryParamsData.from_date }),
                ...(queryParamsData.to_date && { to_date: queryParamsData.to_date }),
                ...(queryParamsData.max_budget && { pay_type: queryParamsData.pay_type }),
                ...(queryParamsData.max_budget && { max_budget: queryParamsData.max_budget }),
                ...(queryParamsData.sortBy && { sortBy: queryParamsData.sortBy }),
                ...((queryParamsData.address || queryParamsData.sortBy === 2) && {
                    location: {
                        coordinates: [queryParamsData.long ? queryParamsData.long : queryParamsData.defaultLong, queryParamsData.lat ? queryParamsData.lat : queryParamsData.defaultLat]
                    }
                }),
                // location: {
                //     coordinates: [queryParamsData.long ? queryParamsData.long : queryParamsData.defaultLong, queryParamsData.lat ? queryParamsData.lat : queryParamsData.defaultLat]
                // }
            }
            console.log(data, "data tradie search result");
            props.postHomeSearchData(data);
        }
        // else if (queryParamsData.jobResults == 'jobTypeList') {
        //     const data = {
        //         page: 1,
        //         isFiltered: false,
        //         jobTypes: queryParamsData.jobTypes,
        //         // location: {
        //         //     coordinates: [queryParamsData.defaultLong, queryParamsData.defaultLat]
        //         // }
        //     }
        //     props.postHomeSearchData(data);
        // } 
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
            isFilterOn: params.get('isFilterOn'),
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
            searchJob: params.get('searchJob')?.replaceAll("xxx", "&"),
            max_budget: Number(params.get('max_budget')),
            pay_type: params.get('pay_type'),
            sortBy: Number(params.get('sortBy'))
        }
        setParamsData(queryParamsData);
        return queryParamsData;
    }

    console.log(paramsData, "paramsData");


    const renderJobsData = () => {
        var jobsData: any;
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

    const searchByFilter = (allFiltersData: any) => {
        const newParamsData = getQueryParamsData();
        var headingType: string = '';
        console.log(allFiltersData, 'allFiltersData', newParamsData);

        if (newParamsData.tradeId?.length) {
            delete newParamsData.tradeId;
        }

        if (newParamsData.jobTypes?.length) {
            delete newParamsData.jobTypes;
        }

        if (newParamsData.specializationId?.length) {
            delete newParamsData.specializationId;
        }

        if (allFiltersData.jobTypes?.length && !allFiltersData.tradeId?.length) {
            headingType = props.jobTypeListData?.find((i: any) => i._id === allFiltersData.jobTypes[0])?.name;
            delete newParamsData.searchJob;
        }

        if (allFiltersData.tradeId?.length && !allFiltersData.specializationId?.length) {
            headingType = props.tradeListData?.find((i: any) => i._id === allFiltersData?.tradeId[0])?.trade_name;
            delete newParamsData.searchJob;
        }

        var data = {
            ...newParamsData,
            isFilterOn: "isFilterOn",
            jobResults: null,
            ...(allFiltersData.sortBy === 2 ? { isFiltered: true } : { isFiltered: false }),
            ...(allFiltersData.tradeId?.length && { tradeId: allFiltersData.tradeId }),
            ...(allFiltersData.jobTypes?.length && { jobTypes: allFiltersData.jobTypes }),
            ...((allFiltersData.jobTypes?.length && !allFiltersData.tradeId?.length) && { jobResults: 'jobTypeList' }),
            ...((allFiltersData.jobTypes?.length && !allFiltersData.tradeId?.length) && { heading: headingType }),
            ...((allFiltersData.tradeId?.length && !allFiltersData.specializationId?.length) && { jobResults: 'jobTypeList' }),
            ...((allFiltersData.tradeId?.length && !allFiltersData.specializationId?.length) && { heading: headingType }),
            ...(allFiltersData.specializationId?.length && { specializationId: allFiltersData.specializationId }),
            ...(allFiltersData.max_budget > 0 && { pay_type: allFiltersData.pay_type }),
            ...(allFiltersData.max_budget > 0 && { max_budget: allFiltersData.max_budget }),
            ...([1, 2, 3].includes(allFiltersData.sortBy) && { sortBy: allFiltersData.sortBy })
        }

        if (allFiltersData.sortBy === 400) {
            delete data.sortBy;
        }

        if (data.searchJob) {
            delete data.heading;
            delete data.jobResults;
        }

        // if (!allFiltersData.max_budget) {
        //     delete data.max_budget;
        // }

        // if (!newParamsData.searchJob && allFiltersData?.specializationId?.length && allFiltersData?.tradeId?.length && allFiltersData?.jobTypes?.length) {
        // if (allFiltersData?.specializationId?.length && allFiltersData?.tradeId?.length && allFiltersData?.jobTypes?.length) {
        if (allFiltersData?.specializationId?.length && allFiltersData?.tradeId?.length) {
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

        const newObjData = {
            ...(data.sortBy === 2 ? { isFiltered: true } : { isFiltered: false }),
            ...(data.sortBy && { sortBy: data.sortBy }),
            ...(data.page ? { page: data.page } : { page: searchResultData.page }),
            ...(data.tradeId && { tradeId: data.tradeId }),
            ...(data.specializationId && { specializationId: data.specializationId }),
            ...(data.from_date && { from_date: data.from_date }),
            ...(data.to_date && { to_date: data.to_date }),
            ...(data.jobTypes && { jobTypes: data.jobTypes }),
            ...(data.max_budget > 0 && { pay_type: data.pay_type }),
            ...(data.max_budget > 0 && { max_budget: data.max_budget }),
            ...((data.address || allFiltersData.sortBy === 2) && {
                location: {
                    coordinates: [data.long ? data.long : data.defaultLong, data.lat ? data.lat : data.defaultLat]
                }
            }),
            // location: {
            //     coordinates: [newParamsData.long ? newParamsData.long : newParamsData.defaultLong, newParamsData.lat ? newParamsData.lat : newParamsData.defaultLat]
            // },
            // ...(allFiltersData.tradeId?.length && { tradeId: allFiltersData.tradeId }),
            // ...(allFiltersData.jobTypes?.length && { jobTypes: allFiltersData.jobTypes }),
            // ...(allFiltersData.specializationId?.length && { specializationId: allFiltersData.specializationId }),
            // ...(allFiltersData.pay_type && { pay_type: allFiltersData.pay_type }),
            // ...(allFiltersData.max_budget && { max_budget: allFiltersData.max_budget }),
            // ...(allFiltersData.sortBy && { sortBy: allFiltersData.sortBy })
        }
        Object.keys(data).forEach(key => (data[key] === undefined || data[key] === null || data[key] === 0 || data[key] === "0") && delete data[key]);
        var url = 'search-job-results?';
        for (let [key, value] of Object.entries(data)) {
            console.log(key, value);
            url += `${key}=${value}&`
        }
        const newUrl = url.slice(0, url.length - 1);

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

    const refreshParams = () => {
        getQueryParamsData();
    }

    const handleChangeToggle = (value: boolean) => { setToggleModifySearch(value) }

    return (
        <div className="app_wrapper" >
            <div className={`top_search ${isToggleModifySearch ? 'active' : ''}`}>
                <BannerSearch
                    {...props}
                    handleChangeToggle={handleChangeToggle}
                    paramsData={paramsData}
                    cleanFiltersHandler={cleanFiltersHandler}
                    cleanFiltersData={searchResultData.cleanFiltersData}
                    refreshParams={refreshParams}
                />
            </div>
            <div className="search_result">
                <div className="section_wrapper">
                    <div className="custom_container">

                        <div className="flex_row mob_srch_option">
                            <div className="flex_col_sm_6"></div>
                            <div className="flex_col_sm_6 text-right">
                                <button onClick={() => { setToggleModifySearch(true) }} className="fill_grey_btn btn-effect">Modify Search</button>
                            </div>
                        </div>

                        <div className="result_heading">
                            <div className="flex_row">
                                <div className="flex_col_sm_8">
                                    {/* <span className="title">{paramsData.jobResults == 'viewNearByJob' ? 'All around me' : paramsData.jobResults == 'jobTypeList' ? paramsData.heading : paramsData.searchJob ? `${paramsData.searchJob}${paramsData.specializationId?.length == 2 ? ' + 1 other' : paramsData.specializationId?.length >= 3 ? ` + ${paramsData.specializationId?.length - 1} others` : ''}` : ''} */}
                                    <span className="title">{paramsData.jobResults == 'viewNearByJob' ? 'All around me' : paramsData.jobResults == 'jobTypeList' ? paramsData.heading : paramsData.searchJob ? `${paramsData.searchJob}${paramsData.specializationId?.length >= 2 ? ` +${paramsData.specializationId?.length - 1}` : ''}` : ''}
                                        <span className="count">{`${renderJobsData()?.length ? renderJobsData()?.length === 1 ? `${renderJobsData()?.length} result` : `${renderJobsData()?.length} results` : ''}`}</span>
                                    </span>
                                    <SearchResultFilters
                                        searchByFilter={searchByFilter}
                                        cleanFiltersData={searchResultData.cleanFiltersData}
                                        cleanFiltersHandler={cleanFiltersHandler}
                                        history={props?.history}
                                    />
                                </div>
                                {renderJobsData()?.length > 0 && !mapData.showMap && <div className="flex_col_sm_4 text-right">
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
                                        return <TradieJobInfoBox item={jobData} {...props} key={jobData.jobId} />
                                    })) :
                                    <div className="no_record">
                                        <figure className="no_img">
                                            <img src={noData} alt="data not found" />
                                            <span>No Data Found</span>
                                        </figure>
                                    </div>}
                            </div> : (renderJobsData()?.length > 0 || props.isLoading) ?
                                (renderJobsData()?.map((jobData: any) => {
                                    return <TradieJobInfoBox item={jobData} {...props} key={jobData.jobId} />
                                })) : <div className="no_record">
                                    <figure className="no_img">
                                        <img src={noData} alt="data not found" />
                                    </figure>
                                    <span>No Data Found</span>
                                </div>}
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
