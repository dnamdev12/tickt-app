import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

// import TradieJobInfoBox from '../../common/tradieJobInfoBox';
import SearchResultFilters from './searchFilters';
// import RenderMap from './renderMap';

// import filterUnselected from '../../assets/images/ic-filter-unselected.png';
// import filterSelected from '../../assets/images/ic-filter-selected.png';
// import mapIcon from '../../assets/images/map.png';
// import noData from '../../assets/images/no-data.png';
import closeMap from '../../assets/images/close-white.png';

import BannerSearch from '../shared/bannerSearch'
import TradieBox from '../shared/tradieBox'

const SearchResultTradie = (props: any) => {
    const location: any = useLocation();
    const { data, searchText, selectedAddress, selectedTrade, exta } = location?.state;
    const [filterState, setFilterState] = useState({
        page: 1,
        filterByPrice: false,
    });
    const [selectedItem, setSelectedItem] = useState(location?.state);

    // <img src={noData} alt="data not found" />

    useEffect(() => {
        if (location?.state?.queryParam === 'viewNearByJob') {
            const data = {
                page: 1,
                lat: props.location?.state?.bannerData?.location?.coordinates[1],
                long: props.location?.state?.bannerData?.location?.coordinates[0]
            }
            if (props?.getViewNearByJob) {
                props.getViewNearByJob(data);
            }
        }

        if (location?.state?.queryParam === 'jobTypeList') {
            const data = {
                page: 1,
                isFiltered: false,
                jobTypes: location?.state?.jobTypes,
            }
            props.postHomeSearchData(data);
        }
    }, [])

    console.log(props, location);


    const renderJobsData = () => {
        // const jobsData = props.viewNearByJobData;
        // return jobsData;
        console.log(props.homeSearchJobData, "homeSearchJobData response")
        var jobsData;
        if (filterState.filterByPrice) {
            jobsData = props.homeSearchJobData;
            // setFilterState((prevData: any) => ({ ...prevData, filterByPrice: !prevData.filterByPrice }));
            return jobsData;
        }
        if (location?.state?.queryParam == 'viewNearByJob') {
            jobsData = props.viewNearByJobData;
            return jobsData;
        } else {
            jobsData = props.homeSearchJobData;
            return jobsData;
        }
        // if (location?.state?.queryParam == 'jobTypeList') {
        //     jobsData = props.homeSearchJobData;
        //     return jobsData;
        // }
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
        setFilterState((prevData: any) => ({ ...prevData, filterByPrice: true }))
    }

    let filteredItems = renderJobsData();
    let homeSearchJobData = props.homeSearchJobData;
    console.log({
        homeSearchJobData: props.homeSearchJobData
    })
    return (
        <div className="app_wrapper" >
            <div className="top_search">
                <BannerSearch {...props} selectedItem={selectedItem} />
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
                                    <span className="title">
                                        {/* {location?.state?.queryParam == 'viewNearByJob' ? location?.state?.heading : location?.state?.queryParam == 'jobTypeList' ? location?.state?.heading : ""} */}
                                        <span className="count">
                                            {`${homeSearchJobData?.length} results`}
                                        </span>
                                    </span>
                                    <SearchResultFilters showBudgetFilterResults={showBudgetFilterResults} />
                                </div>
                            </div>
                        </div>
                        <div className="flex_row tradies_row">
                            {homeSearchJobData?.length ?
                                homeSearchJobData.map((item: any, index: number) => (
                                    <TradieBox item={item} index={index} />
                                ))
                                : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchResultTradie