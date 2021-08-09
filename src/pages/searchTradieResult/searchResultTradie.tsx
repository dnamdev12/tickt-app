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
import { addListener } from 'process';

const SearchResultTradie = (props: any) => {
    const location: any = useLocation();
    const [stateData, setStateData] = useState(location.state);
    const [isToggle, setToggleSearch] = useState(false);
    const [localInfo, setLocalInfo] = useState({}); // localInfo
    const [loading, setLoading] = useState(false);
    const [localData, setLocalData] = useState<any>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const { homeSearchJobData } = props; // props here.

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

    /*
    useEffect(() => {
        let home: any = props.homeSearchJobData?.length ? true : false;
        if (home) {
            setLocalData(props.homeSearchJobData)
        } else {
            setLocalData([])
        }
    }, [props])
    */

    useEffect(() => {
        let newProps = homeSearchJobData;
        let propsPage = 0;
        let propsTradeId = '';
        let localTradeId = '';
        let local_info:any = localInfo;

        if (!hasMore) {
            setHasMore((prev: any) => !prev);
        }

        if (homeSearchJobData && Array.isArray(homeSearchJobData) && homeSearchJobData?.length) {
            propsTradeId = homeSearchJobData[0]?.tradeData[0]?.tradeId;
            propsPage = homeSearchJobData[0]?.page;
        }

        if (localData && Array.isArray(localData) && localData?.length) {
            localTradeId = localData[0]?.tradeData[0]?.tradeId;
        }

        let cp = currentPage * 10;

        console.log({
            cp,
            currentPage,
            propsPage,
            localData,
            homeSearchJobData,
            propsTradeId,
            localTradeId,
            local_info
        });


        if (homeSearchJobData?.length && localData?.length && propsTradeId !== localTradeId) {
            // alert('1')
            setLocalData(newProps);
            setCurrentPage(propsPage);
            return
        }

        if (!propsPage) {
            if (!homeSearchJobData?.length && !propsPage) {
                if (localData?.length && !local_info?.doingLocalChanges) {
                    // alert(`2 ${local_info?.doingLocalChanges}`)
                    setLocalData([]);
                    setCurrentPage(1);
                    return
                }

                setHasMore(false);
            } else {
                if (hasMore) {
                    // alert('3')
                    setHasMore(false);
                }
            }
            return;
        } else {
            if (currentPage == propsPage && localData?.length < cp) {
                if (currentPage == 1) {
                    setLocalData(newProps);
                } else {
                    setLocalData((prev: any) => [...prev, ...newProps]);
                }
            }
        }

    }, [homeSearchJobData]);

    const handleChangeToggle = (value: any) => { setToggleSearch(value) }

    // let homeSearchJobData: any = props.homeSearchJobData;
    let local_info: any = localInfo;
    let isLoading: any = props.isLoading;
    console.log({ localData, homeSearchJobData })
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
                                <button onClick={() => { setToggleSearch(true) }} className="fill_grey_btn btn-effect">Modify Search</button>
                            </div>
                        </div>

                        <div className="result_heading">
                            <div className="flex_row">
                                <div className="flex_col_sm_8">
                                    <span className="title">
                                        {`${local_info?.name || ''} ${local_info?.count > 1 ? `+${local_info?.count - 1}` : ''}`}
                                        <span className="count">
                                            {`${homeSearchJobData?.length} result(s) ${hasMore ? 'true' : 'false'}`}
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
                                console.log('callable');
                                let cp = currentPage + 1;
                                setCurrentPage((prev: any) => prev + 1);
                                let local_info: any = localInfo;

                                let data: any = {
                                    page: cp,
                                    isFiltered: false,
                                }

                                if (local_info?.location) {
                                    data['location'] = local_info?.location;
                                }

                                if (local_info?.tradeId?.length) {
                                    data['tradeId'] = local_info?.tradeId
                                }

                                if (local_info?.specializationId?.length) {
                                    data['specializationId'] = local_info?.specializationId;
                                }

                                if (props?.location?.state?.suggestionSelected && props?.location?.state?.suggestionSelected !== "{}") {
                                    data['address'] = JSON.stringify(props?.location?.state?.suggestionSelected);
                                }

                                if (local_info?.from_date) {
                                    data['from_date'] = local_info?.from_date;
                                }

                                if (local_info?.to_date) {
                                    data['to_date'] = local_info?.to_date;
                                }

                                // if (!data?.hasOwnProperty('tradeId') && !data?.hasOwnProperty('specializationId') && !data?.hasOwnProperty('location')) {
                                //     data['location'] = { coordinates: [144.9631, -37.8136] }
                                // }

                                if(!data?.hasOwnProperty('specializationId')){
                                    data['isFiltered'] = true;
                                }

                                console.log({
                                    local_info,
                                    data,
                                    cp
                                });
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
