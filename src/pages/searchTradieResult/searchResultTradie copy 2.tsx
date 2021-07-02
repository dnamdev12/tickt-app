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

import InfiniteScroll from 'react-infinite-scroll-component';


// import BannerSearch from '../shared/bannerSearch'
import BannerSearchProps from '../shared/bannerSearchProps'
import TradieBox from '../shared/tradieBox'
import moment, { localeData } from 'moment';
import { searchTradies } from '../../redux/homeSearch/actions'

// name
// tradeId
// specializations
// location
// calender

const SearchResultTradie = (props: any) => {
    const location: any = useLocation();
    const [stateData, setStateData] = useState(location.state);
    const [isToggle, setToggleSearch] = useState(false);
    const [localInfo, setLocalInfo] = useState({}); // localInfo
    const [loading, setLoading] = useState(false);
    const [localData, setLocalData] = useState<any>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);


    const prefetchItems = async (page?: number) => {
        props.getRecentSearchList();

        let data: any = {
            page: page ? page : 1,
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

        if (stateData?.location) {

            data['location'] = stateData?.location;
        }
        if (stateData?.calender?.startDate) {
            data['from_date'] = moment(stateData?.calender?.startDate).format('YYYY-MM-DD')
        }
        if (stateData?.calender?.endDate) {
            data['to_date'] = moment(stateData?.calender?.endDate).format('YYYY-MM-DD')
        }
        let spec_count: any = stateData?.specializations?.length;
        setLocalInfo({
            name: stateData?.name,
            count: spec_count === 1 ? 0 : spec_count,
            tradeId: data.tradeId,
            specializationId: data.specializationId,
            doingLocalChanges: false,
        })

        let response = await searchTradies(data);
        if (response?.success) {
            let isHaveData: any = response?.data?.length ? true : false;
            if (isHaveData) {
                setLocalData((prev: any) => ([...prev, ...response?.data]));
            }
            if (!isHaveData) {
                setHasMore(false)
            }
        }
        // props.postHomeSearchData(data);
    }

    // useEffect(() => {
    //     // prefetchItems();
    // }, []);

    const getTitleInfo = (info: any) => {
        setLocalInfo(info)
    }

    // useEffect(() => {
    //     let data: any = props.homeSearchJobData;
    //     let home: any = props.homeSearchJobData?.length ? true : false;
    //     let itemsShouldBe = currentPage * 10;

    //     if (home && localeData?.length !== itemsShouldBe) {
    //         setLocalData((prev: any) => ([...prev, ...data]));
    //     }

    //     if (!home) {
    //         setHasMore(false)
    //     }
    // }, [props])


    useEffect(() => {
        prefetchItems(currentPage);
    }, [currentPage])

    const handleChangeToggle = (value: any) => { setToggleSearch(value) }

    let homeSearchJobData: any = props.homeSearchJobData;
    let local_info: any = localInfo;
    let isLoading: any = props.isLoading;
    console.log({ homeSearchJobData, currentPage, localData }, 'callable')
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
                                            {`${localData?.length} results`}
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
                        <div
                            // style={{ backgroundColor: 'red' }}
                            className="tradies_row"
                        >
                            <InfiniteScroll
                                dataLength={localData.length} //This is important field to render the next data
                                className="flex_row"
                                next={() => {
                                    setCurrentPage(currentPage + 1);
                                }}
                                hasMore={hasMore}
                                loader={
                                    <div
                                        style={{
                                            padding: '15px',
                                            textAlign: 'center',
                                            display: (!hasMore || !localData?.length) ? 'none' : ''
                                        }}>
                                        {'Loading...'}
                                    </div>
                                }
                            >
                                {localData?.length ?
                                    localData.map((item: any, index: number) => (
                                        <TradieBox
                                            item={item}
                                            index={index}
                                            hideAos={true}
                                        />
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
        </div>
    )
}

export default SearchResultTradie