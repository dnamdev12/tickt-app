import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

// import TradieJobInfoBox from '../../common/tradieJobInfoBox';
import SearchFilters from './searchFilters';
// import RenderMap from './renderMap';

// import filterUnselected from '../../assets/images/ic-filter-unselected.png';
// import filterSelected from '../../assets/images/ic-filter-selected.png';
// import mapIcon from '../../assets/images/map.png';
import noData from '../../assets/images/no-search-data.png';
import closeMap from '../../assets/images/close-white.png';

// import BannerSearch from '../shared/bannerSearch'
import BannerSearchProps from '../shared/bannerSearchProps'
import TradieBox from '../shared/tradieBox'
import moment from 'moment';
// name
// tradeId
// specializations
// location
// calender

import InfiniteScroll from "react-infinite-scroll-component";

const SearchResultTradie = (props: any) => {

    const location: any = useLocation();
    const [stateData, setStateData] = useState(location.state);
    const [isToggle, setToggleSearch] = useState(false);
    const [localInfo, setLocalInfo] = useState({}); // localInfo
    const [loading, setLoading] = useState(false);
    const [localData, setLocalData] = useState<any>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        props.getRecentSearchList();

        let data: any = {
            page: 1,
            isFiltered: false,
        }

        if (stateData?.tradeId) {
            data['tradeId'] = stateData?.tradeId
        }

        if (stateData?.specializations) {
            data['specializationId'] = stateData?.specializations;
        }
        // tradeId: stateData?.tradeId,
        // specializationId: stateData?.specializations,
        console.log({
            location: stateData?.location
        })
        if (stateData?.location) {
            data['location'] = stateData?.location;
        }

        if (props?.location?.state?.suggestionSelected) {
            data['address'] = JSON.stringify(props?.location?.state?.suggestionSelected);
        }

        if (stateData?.calender?.startDate) {
            data['from_date'] = moment(stateData?.calender?.startDate).format('YYYY-MM-DD')
        }
        if (stateData?.calender?.endDate) {
            data['to_date'] = moment(stateData?.calender?.endDate).format('YYYY-MM-DD')
        }
        let spec_count: any = stateData?.specializations?.length;

        if (!data?.address || !data?.address?.length) {
            delete data?.address;
        }

        // console.log({
        //     stateData,
        //     suggestionSelected: props?.location?.state?.suggestionSelected?.mainText,
        //     address: props?.location?.state?.address
        // })

        setLocalInfo({
            name: stateData?.name,
            count: spec_count === 1 ? 0 : spec_count,
            tradeId: data.tradeId,
            specializationId: data.specializationId,
            location: data.location,
            doingLocalChanges: false,
            suggestionSelected: stateData?.suggestionSelected
        });

        if (data?.address) {
            return
        }

        console.log({
            data
        }, '----------------->><<---------------')

        // if (!stateData?.suggestionSelected || (data?.location?.coordinates && Array.isArray(data?.location?.coordinates) && data?.location?.coordinates?.length)) {
        props.postHomeSearchData(data);
        // }

    }, []);

    const getTitleInfo = (info: any) => {
        setLocalInfo(info)
    }

    useEffect(() => {
        let newValue: any = props.homeSearchJobData;
        let local_info: any = localInfo;
        let location_state: any = location?.state;
        let length = localData?.length;
        let cp = currentPage * 10;

        let tradeId = '';
        let tradeInfo = '';
        
        if (Array.isArray(localData) && localData[0] && Array.isArray(localData[0]?.tradeData) && localData[0]?.tradeData[0]?.tradeId) {
            tradeId = localData[0]?.tradeData[0]?.tradeId;
        }

        if(Array.isArray(local_info?.tradeId) && local_info?.tradeId[0]){
            tradeInfo = local_info?.tradeId[0]
        }

        console.log({
            tradeId,
            tradeInfo,
            local_info
        })
        if (tradeId !== tradeInfo) {
            setCurrentPage(1);
            setLocalData(newValue);
            getTitleInfo({
                name: local_info?.name,
                count: local_info?.specializationId?.length === 1 ? 0 : local_info?.specializationId?.length,
                tradeId: local_info.tradeId,
                specializationId: local_info.specializationId,
                location: local_info.location,
                doingLocalChanges: true,
                suggestionSelected: local_info?.suggestionSelected
            })
            return;
        } else {
            if (localData?.length && currentPage > 1) {
                // alert(`Here! ${currentPage}`)
                if (length < cp && hasMore) {
                    if (!newValue?.length) {
                        setHasMore(false);
                        return
                    }
                    let data_ = [...localData, ...newValue];
                    setLocalData(data_)
                }
            } else {
                setCurrentPage(1);
                setLocalData(newValue)
            }
        }
    }, [props]);

    const handleChangeToggle = (value: any) => { setToggleSearch(value) }

    let homeSearchJobData: any = props.homeSearchJobData;
    let local_info: any = localInfo;
    let isLoading: any = props.isLoading;
    console.log({
        localData
    })

    let uniqeValues = {};

    return (
        <div className="app_wrapper" >
            <div className={`top_search ${isToggle ? 'active' : ''}`}>
                <BannerSearchProps
                    {...props}
                    getTitleInfo={getTitleInfo}
                    localInfo={localInfo}
                    handleChangeToggle={handleChangeToggle} />
            </div>
            <div className="search_result">
                <div className="section_wrapper">
                    <div className="custom_container">

                        <div className="flex_row mob_srch_option">
                            <div className="flex_col_sm_6"></div>
                            <div className="flex_col_sm_6 text-right">
                                <button
                                    onClick={() => { setToggleSearch(true) }}
                                    className="fill_grey_btn btn-effect">
                                    {'Modify Search'}
                                </button>
                            </div>
                        </div>

                        <div className="result_heading">
                            <div className="flex_row">
                                <div className="flex_col_sm_8">
                                    <span className="title">
                                        {`${local_info?.name || ''} ${local_info?.count > 1 ? `+${local_info?.count - 1}` : ''}`}
                                        <span className="count">
                                            {`${localData?.length} result(s)`}
                                        </span>
                                    </span>
                                    <SearchFilters
                                        {...props}
                                        localInfo={localInfo}
                                        getTitleInfo={getTitleInfo}
                                    />
                                </div>
                            </div>
                        </div>

                        <InfiniteScroll
                            dataLength={localData?.length}
                            next={() => {
                                let cp = currentPage;
                                setCurrentPage((prev: any) => prev + 1);
                                cp = cp + 1;

                                let location_state: any = local_info; //location?.state;

                                // if (JSON.stringify(location?.state?.tradeId) !== JSON.stringify(local_info?.tradeId)) {
                                //     location_state = local_info?.tradeId;
                                // }

                                let data: any = {
                                    page: cp,
                                    isFiltered: false,
                                }

                                if (location_state?.location) {
                                    data['location'] = location_state?.location;
                                }

                                if (location_state?.tradeId?.length) {
                                    data['tradeId'] = location_state?.tradeId
                                }

                                if (location_state?.specializationId?.length) {
                                    data['specializationId'] = location_state?.specializationId;
                                }
                                console.log({ data, location, location_state, local_info }, 'data------>');
                                props.postHomeSearchData(data);
                            }}
                            hasMore={hasMore}
                            loader={<></>}
                            className="flex_row tradies_row">
                            {localData?.length ?
                                localData.map((item: any, index: number) => (
                                    <TradieBox item={item} index={index} />
                                ))
                                :
                                !isLoading && !localData?.length ?
                                    <div className="no_record">
                                        <figure className="no_img">
                                            <img src={noData} alt="data not found" />
                                        </figure>
                                        <span>{'No Data Found'}</span>
                                    </div> : null}
                        </InfiniteScroll>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchResultTradie
