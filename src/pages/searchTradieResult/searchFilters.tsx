/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { callTradeList } from './../../redux/auth/actions';
import {
    getJobWithJobTypeLatLong,
    getJobTypeList
} from '../../redux/homeSearch/actions';

import { useState, useEffect } from 'react';
import Constants from '../../utils/constants';
import { setShowToast } from '../../redux/common/actions';
import regex from '../../utils/regex';
import Menu from '@material-ui/core/Menu';
import Modal from '@material-ui/core/Modal';
import MenuItem from '@material-ui/core/MenuItem';

import filterUnselected from '../../assets/images/ic-filter-unselected.png';
import filterSelected from '../../assets/images/ic-filter-selected.png';
import cancel from "../../assets/images/ic-cancel.png";
import spherePlaceholder from '../../assets/images/ic_categories_placeholder.svg';
import { moengage } from '../../services/analyticsTools';
import { MoEConstants } from '../../utils/constants';

const SearchFilter = (props: any) => {
    // const { data, searchText, selectedAddress, selectedTrade, exta } = props.selectedItem;
    const [errors, setErrors] = useState<any>({});
    const [priceAnchorEl, setPriceAnchorEl] = useState(null);
    const [filterAnchorEl, setFilterAnchorEl] = useState(null);
    const [sortingAnchorEl, setSortingAnchorEl] = useState(null);
    const [filterState, setFilterState] = useState({
        page: 1,
    });

    const [filterEnable, setFilterEnable] = useState(false);

    const [prevLocal, setPrevLocal] = useState(null);

    const [sortByPrice, setSortByPrice] = useState<any>({
        priceFilterClicked: false,
        payTypeClicked: false,
        pay_type: "Fixed price",
        max_budget: '',
    });

    const [sortByFilter, setSortByFilter] = useState<any>({
        sortByFilterClicked: false,
        tradeId: [],
        sortChanged: false,
        specializationId: [],
        allSpecializationClicked: false,
    })
    // jobTypes: [],

    const [sortBySorting, setSortBySorting] = useState<any>({
        sortBySorting: false,
        sortBy: 0,
    })
    console.log({ sortByFilter, sortBySorting, sortByPrice })
    useEffect(() => {
        if (props.jobTypeListData?.length === 0) props.getJobTypeList();
        if (props.tradeListData?.length === 0) props.callTradeList();
        setPrevLocal(props.localInfo);
    }, []);

    useEffect(() => {
        if (props?.localInfo?.tradeId?.length) {
            // setSortByFilter((prev: any) => ({
            //     ...prev,
            //     tradeId: props.localInfo.tradeId,
            //     specializationId: props.localInfo.specializationId
            // }));
        }
        console.log({ props })
    }, [props])

    const sortByPriceClick = (event: any) => {
        setPriceAnchorEl(event.currentTarget);
        setSortByPrice((prevData: any) => ({ ...prevData, priceFilterClicked: true }))
    };

    const sortByPriceClose = () => {
        setPriceAnchorEl(null);
        setSortByPrice((prevData: any) => ({ ...prevData, priceFilterClicked: false }))
    };

    const sortByFilterClick = (event: any) => {
        setFilterAnchorEl(event.currentTarget);
        setSortByFilter((prevData: any) => ({ ...prevData, sortByFilterClicked: true, sortChanged: true }))
    };

    const sortByFilterClose = () => {
        setFilterAnchorEl(null);
        setSortByFilter((prevData: any) => ({ ...prevData, sortByFilterClicked: false }))
    };

    const sortBySortingClick = (event: any) => {
        setSortingAnchorEl(event.currentTarget);
        setSortBySorting((prevData: any) => ({ ...prevData, sortBySorting: true }))
    };

    const sortBySortingClose = () => {
        setSortingAnchorEl(null);
        setSortBySorting((prevData: any) => ({ ...prevData, sortBySorting: false }))
    };

    const sortByButtonClicked = (num: number) => {
        setSortBySorting((prevData: any) => ({ ...prevData, sortBy: num }));
        sortBySortingClose();
        updateOnChange(num);
    }

    const setSameOnClick = () => {
        setSortBySorting((prevData: any) => ({ ...prevData, sortBy: 0 }));
        sortBySortingClose();
        updateOnChange(0);
    }

    const filterChangeHandler = (id: any, name: string) => {
        if (name === 'jobTypes') {
            if (sortByFilter.jobTypes[0] == id) {
                setSortByFilter((prevData: any) => ({ ...prevData, jobTypes: [] }))
            } else {
                setSortByFilter((prevData: any) => ({ ...prevData, jobTypes: [id] }))
            }
        } else if (name === 'specializationId') {
            setSortByFilter((prevData: any) => {
                var newData: any = []
                if (Array.isArray(prevData.specializationId) && prevData?.specializationId?.length) {
                    newData = [...prevData.specializationId];
                }
                if (sortByFilter.allSpecializationClicked) {
                    newData = []
                }
                const itemIndex = newData.indexOf(id);
                if (newData.indexOf(id) < 0) {
                    newData.push(id);
                } else {
                    newData.splice(itemIndex, 1);
                }
                return {
                    ...prevData,
                    specializationId: newData,
                    allSpecializationClicked: false
                }
            })
        } else if (name == 'categories') {

            if (sortByFilter.tradeId.length && sortByFilter.tradeId[0] == id) {
                setSortByFilter((prevData: any) => ({ ...prevData, tradeId: [], specializationId: [], allSpecializationClicked: false }))
            } else {
                setSortByFilter((prevData: any) => ({ ...prevData, tradeId: [id], specializationId: [], allSpecializationClicked: false }))
            }
        } else if (name == 'All Clicked') {
            if (sortByFilter.allSpecializationClicked) {
                setSortByFilter((prevData: any) => ({ ...prevData, allSpecializationClicked: false, specializationId: [] }))
            } else {
                const newSpecialization = id.map(({ _id }: { _id: string }) => {
                    return _id
                })
                setSortByFilter((prevData: any) => ({ ...prevData, allSpecializationClicked: true, specializationId: newSpecialization }))
            }
        } else if (name == 'Clear All') {
            setSortByFilter((prevData: any) => ({ ...prevData, allSpecializationClicked: false, jobTypes: [], specializationId: [], tradeId: [], }))
        }
    }

    const renderFilterButtons = () => (
        <ul className="filters_row">
            <li>
                <a className={filterEnable ? 'active' : ''} onClick={sortByFilterClick}>
                    <img
                        src={filterEnable ? filterSelected : filterUnselected}
                        alt="filter" />
                    {'Filter'}
                </a>
            </li>
            <li>
                <a className={sortBySorting.sortBy > 0 ? 'active' : ''} onClick={sortBySortingClick}>
                    {`Sorting`}
                </a>
            </li>
        </ul>
    )

    const showResultSearch = () => {
        if (!sortByFilter?.tradeId?.length) {
            updateOnChange(sortBySorting.sortBy);
            sortByFilterClose();
            setFilterEnable(false);
            return
        }

        updateOnChange(sortBySorting.sortBy);
        sortByFilterClose();
        setFilterEnable(true);
    }

    const updateOnChange = (sort?: any) => {
        let local_info: any = props.localInfo;
        let sort_: any = sort;

        console.log({ sort_, local_info }, '-------------------------->><<-------------- item_coord');
        const tradeInfo = props.tradeListData.find((item: any) => item._id === sortByFilter.tradeId[0]);
        const specializationList = props.tradeListData.find(({ _id }: { _id: string }) => _id === sortByFilter.tradeId[0])?.specialisations;
        const { specializationId, tradeId } = sortByFilter;
        console.log({ specializationId, sortByFilter, props })
        // if (specializationId?.length) {
        let filteredItem: any = []
        // let name = specializationList[0].name;
        if (specializationList?.length) {
            filteredItem = specializationList.filter((item: any) => {
                if (Array.isArray(specializationId) && specializationId?.length) {
                    if (specializationId.includes(item._id)) {
                        return item;
                    }
                }
            });
        }
        let name = '';

        if (Array.isArray(filteredItem) && filteredItem?.length && filteredItem[0].name) {
            name = filteredItem[0].name;
        }

        let data: any = {
            page: 1,
            isFiltered: true
        }

        if (sort_) {
            data['sortBy'] = sort_;
        }

        if ((Array.isArray(tradeId) && tradeId?.length) || (!Array.isArray(tradeId) && tradeId?.length)) {
            data['tradeId'] = Array.isArray(tradeId) ? tradeId : [tradeId]
        }

        if (Array.isArray(specializationId) && specializationId?.length) {
            data['specializationId'] = specializationId;
        }

        let get_position: any = localStorage.getItem('position');
        if (sort_ === 2) {
            let item_coord: any = !local_info?.location?.coordinates?.length ? JSON.parse(get_position).reverse() : local_info?.location?.coordinates;
            if (item_coord?.length) {
                data['location'] = {
                    "coordinates": item_coord,
                }
            }
        } else {
            if (local_info?.location) {
                data['location'] = local_info?.location;
            } else {
                delete data.location;
            }
        }

        if (local_info?.from_date) {
            data['from_date'] = local_info?.from_date;
        }

        if (local_info?.to_date) {
            data['to_date'] = local_info?.to_date;
        }


        if (local_info?.suggestionSelected) {
            data['address'] = JSON.stringify(local_info?.suggestionSelected);
            if (data?.address === '{}') {
                delete data.address;
            }
        }

        if (!data?.address || !data?.address?.length) {
            delete data?.address;
        }

        props.postHomeSearchData(data);

        moengage.moE_SendEvent(MoEConstants.SEARCHED_FOR_TRADIES, {
            timeStamp: moengage.getCurrentTimeStamp(),
            category: props?.tradeListData.find((i: any) => i._id === data?.tradeId[0])?.trade_name,
            ...(data.address && { location: `${JSON.parse(data.address)?.mainText} ${JSON.parse(data.address)?.secondaryText}` }),
            //'length of hire': '',
            ...(data?.from_date && { 'start date': data?.from_date }),
            ...(data?.to_date && { 'end date': data?.to_date }),
        });
        let trade_name: any = tradeInfo?.trade_name;
        let local_info_name: any = local_info?.name;
        let local_info_count: any = local_info?.count;
        let case_1 = name ? name : trade_name
        let case_2 = `${local_info_name} ${local_info_count > 1 ? `+${local_info_count - 1}` : ''}`
        let name_: any = case_1 ? trade_name : local_info_name ? case_2 : '';;
        props.getTitleInfo({
            name: name_,
            isTradeName: tradeInfo?.trade_name ? true : false,
            count: specializationId?.length || 0,
            tradeId: data.tradeId,
            specializationId: data.specializationId || [],
            sortBy: data.sortBy || 0,
            to_date: local_info?.to_date || '',
            from_date: local_info?.from_date || '',
            doingLocalChanges: false
        })
    }

    const specializationList = props.tradeListData.find(({ _id }: { _id: string }) => _id === sortByFilter.tradeId[0])?.specialisations;
    let checkIfAllSelected = false;
    if (specializationList) {
        checkIfAllSelected = sortByFilter.specializationId?.length === specializationList?.length;
    }

    const sortOnChange = (num: number) => {
        if (sortBySorting.sortBy !== num) {
            sortByButtonClicked(num)
        }
    }

    const sortOnClick = (num: number) => {
        if (sortBySorting.sortBy == num) {
            setSameOnClick();
        }
    }

    const checksForActive = ({ checkIfAllSelected, sortByFilter }: any) => {

        if (sortByFilter?.allSpecializationClicked) {
            return true
        }

        if (sortByFilter?.specializationId?.length) {
            return false;
        }

        if (checkIfAllSelected || sortByFilter?.tradeId?.length) {
            return true;
        }
    }

    return (
        <div className="filters_wrapr">
            {renderFilterButtons()}

            {sortByFilter.sortByFilterClicked &&
                <Modal
                    className="custom_modal"
                    open={sortByFilter.sortByFilterClicked}
                    onClose={sortByFilterClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description">
                    <>
                        <div className="custom_wh filter_modal" data-aos="zoom-in" data-aos-delay="30" data-aos-duration="1000">
                            <div className="heading">
                                <span className="sub_title">Filter</span>
                                <button className="close_btn" onClick={sortByFilterClose}>
                                    <img src={cancel} alt="cancel" />
                                </button>
                            </div>

                            <div className="inner_wrap">
                                <div className="form_field">
                                    <span className="xs_sub_title">
                                        {'Categories'}
                                    </span>
                                </div>
                                <div className="select_sphere">
                                    <ul>
                                        {props.tradeListData?.map((
                                            { _id,
                                                trade_name,
                                                selected_url,
                                                specialisations
                                            }: {
                                                _id: string,
                                                trade_name: string,
                                                selected_url: string,
                                                specialisations: []
                                            }) => {
                                            const active = sortByFilter.tradeId[0] === _id;
                                            return (
                                                <li
                                                    key={_id}
                                                    className={active ? 'active' : ''}
                                                    onClick={() => filterChangeHandler(_id, 'categories')}>
                                                    <figure>
                                                        <img
                                                            alt=""
                                                            src={selected_url ? selected_url : spherePlaceholder}
                                                        />
                                                    </figure>
                                                    <span className="name">{trade_name}</span>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                    {/* <span className="error_msg">{errors.categories}</span> */}
                                </div>

                                <div className="form_field">
                                    <span className="xs_sub_title">Specialisation</span>
                                </div>
                                <div className="tags_wrap">
                                    <ul>
                                        {console.log({
                                            specializationList,
                                            checkIfAllSelected,
                                            sortByFilter: sortByFilter.allSpecializationClicked
                                        })}
                                        {specializationList?.length > 0 &&
                                            <li
                                                className={checksForActive({ checkIfAllSelected, sortByFilter }) ? 'selected' : ''}
                                                // className={sortByFilter.allSpecializationClicked ? 'selected' : ''}
                                                onClick={() => {
                                                    let items: any = props.tradeListData.find((dt: any) => dt._id == sortByFilter.tradeId);
                                                    if (items) {
                                                        filterChangeHandler(items?.specialisations, 'All Clicked');
                                                    }
                                                }}>
                                                {'All'}
                                            </li>}
                                        {specializationList?.map(({ _id, name }: { _id: string, name: string }) => {
                                            // let active = sortByFilter.specializationId?.indexOf(_id) >= 0;
                                            let active = false;
                                            if (specializationList?.length !== sortByFilter.specializationId?.length) {
                                                active = false;
                                                if (Array.isArray(sortByFilter.specializationId) && sortByFilter.specializationId?.length) {
                                                    active = sortByFilter.specializationId.includes(_id);
                                                }
                                            }
                                            return (
                                                <li
                                                    key={_id}
                                                    className={active ? 'selected' : ''}
                                                    // className={active && !sortByFilter.allSpecializationClicked ? 'selected' : ''}
                                                    onClick={() => {
                                                        if (checkIfAllSelected) {
                                                            let sort_by_spec: any = sortByFilter;
                                                            sort_by_spec['specializationId'] = [];
                                                            setSortByFilter(sort_by_spec);
                                                        }
                                                        filterChangeHandler(_id, 'specializationId')
                                                    }}>
                                                    {name}
                                                </li>)
                                        })}
                                    </ul>
                                    {/* <span className="error_msg">{errors.specializationId}</span> */}

                                </div>
                            </div>
                            <div className="filter_btn">
                                <a className="link" onClick={() => filterChangeHandler('Clear All', 'Clear All')}>Clear All</a>
                                <button className="fill_btn full_btn btn-effect" onClick={showResultSearch}>Show Results</button>
                            </div>
                        </div>
                    </>
                </Modal>
            }


            {sortBySorting.sortBySorting &&
                <Menu
                    // id="simple-menu"
                    className="fsp_modal range"
                    anchorEl={sortingAnchorEl}
                    keepMounted
                    open={Boolean(sortingAnchorEl)}
                    onClose={sortBySortingClose}
                >
                    <span className="close_btn" onClick={sortBySortingClose}>
                        <img src={cancel} alt="cancel" />
                    </span>
                    <span className="sub_title">
                        {'Sort by'}
                    </span>

                    <div className="radio_wrap agree_check">
                        <input
                            className="filter-type filled-in"
                            type="radio"
                            id="highestRated"
                            value="Highest rated"
                            checked={sortBySorting.sortBy === 1}
                            onClick={() => { sortOnClick(1) }}
                            onChange={() => { sortOnChange(1) }}
                        />
                        <label htmlFor="highestRated">Highest rated</label>
                    </div>
                    <div className="radio_wrap agree_check">
                        <input
                            className="filter-type filled-in"
                            type="radio"
                            id="closest"
                            value="Closest to me"
                            checked={sortBySorting.sortBy === 2}
                            onClick={() => { sortOnClick(2) }}
                            onChange={() => { sortOnChange(2) }}
                        />
                        <label htmlFor="closest">Closest to me</label>
                    </div>
                    <div className="radio_wrap agree_check">
                        <input
                            className="filter-type filled-in"
                            type="radio"
                            id="mostJob"
                            value="Most jobs completed"
                            checked={sortBySorting.sortBy === 3}
                            onClick={() => { sortOnClick(3) }}
                            onChange={() => { sortOnChange(3) }}
                        />
                        <label htmlFor="mostJob">
                            {'Most jobs completed'}
                        </label>
                    </div>
                </Menu>}
        </div >
    )
}

const mapStateToProps = (state: any) => {
    return {
        jobDataWithJobTypeLatLong: state.homeSearch.jobDataWithJobTypeLatLong,
        jobTypeListData: state.homeSearch.jobTypeListData,
        tradeListData: state.auth.tradeListData,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        getJobWithJobTypeLatLong,
        getJobTypeList,
        callTradeList
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchFilter);
