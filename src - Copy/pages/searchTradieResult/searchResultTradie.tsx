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

const SearchResultTradie = (props: any) => {
    const location: any = useLocation();
    const [stateData, setStateData] = useState(location.state);
    const [isToggle, setToggleSearch] = useState(false);
    const [localInfo, setLocalInfo] = useState({}); // localInfo
    const [loading, setLoading] = useState(false);
    const [localData, setLocalData] = useState([]);

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
            doingLocalChanges:false,

        })
        props.postHomeSearchData(data);
    }, []);

    const getTitleInfo = (info: any) => {
        setLocalInfo(info)
    }

    useEffect(() => {
        let home: any = props.homeSearchJobData?.length ? true : false;
        if (home) {
            setLocalData(props.homeSearchJobData)
        } else {
            setLocalData([])
        }
    }, [props])

    const handleChangeToggle = (value: any) => { setToggleSearch(value) }

    let homeSearchJobData: any = props.homeSearchJobData;
    let local_info: any = localInfo;
    let isLoading: any = props.isLoading;
    
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
                                            {`${homeSearchJobData?.length} results`}
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
                        <div className="flex_row tradies_row">
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
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchResultTradie