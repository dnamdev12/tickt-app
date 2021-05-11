import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

// import TradieJobInfoBox from '../../common/tradieJobInfoBox';
import SearchResultFilters from './searchFilters';
// import RenderMap from './renderMap';

// import filterUnselected from '../../assets/images/ic-filter-unselected.png';
// import filterSelected from '../../assets/images/ic-filter-selected.png';
// import mapIcon from '../../assets/images/map.png';
import noData from '../../assets/images/no-data.png';
import closeMap from '../../assets/images/close-white.png';

import BannerSearch from '../shared/bannerSearch'
import TradieBox from '../shared/tradieBox'

const SearchResultTradie = (props: any) => {
    const location: any = useLocation();
    const { data, searchText, stateData, selectedAddress, selectedTrade, exta } = location?.state;
    const [filterState, setFilterState] = useState({
        page: 1,
        filterByPrice: false,
    });
    const [selectedItem, setSelectedItem] = useState(location?.state);
    const [forceupdate, setForceUpdate] = useState({});

    useEffect(() => {
        props.getRecentSearchList();
    }, []);

    // <img src={noData} alt="data not found" />

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

    const updateSearchName = (item: any) => {
        let seleted_item: any = selectedItem;
        if (item?.length) {
            let item_ids = item.map((it: any) => it._id);
            seleted_item['searchText'] = item[0].name;
            seleted_item['data']['specializationId'] = item_ids;
            seleted_item['data']['tradeId'] = item[0].tradeId;

            seleted_item['selectedTrade']['specialisations'] = item_ids;
            seleted_item['selectedTrade']['_id'] = item[0].tradeId;
            setSelectedItem(seleted_item);
            props.isHandleChanges(false);
            if (Array.isArray(forceupdate)) {
                setForceUpdate({});
            } else {
                setForceUpdate([]);
            }
        }
    }

    let homeSearchJobData = props.homeSearchJobData;
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
                                        <span className="count">
                                            {`${homeSearchJobData?.length} results`}
                                        </span>
                                    </span>
                                    <SearchResultFilters
                                        {...props}
                                        showBudgetFilterResults={showBudgetFilterResults}
                                        selectedItem={selectedItem}
                                        updateSearchName={updateSearchName}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex_row tradies_row">
                            {homeSearchJobData?.length ?
                                homeSearchJobData.map((item: any, index: number) => (
                                    <TradieBox item={item} index={index} />
                                ))
                                : <img src={noData} alt="data not found" />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchResultTradie