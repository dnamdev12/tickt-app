import { useState, useEffect } from 'react';
import Constants from '../../utils/constants';
import { setShowToast } from '../../redux/common/actions';
import { getSearchParamsData } from '../../utils/common';
import Menu from '@material-ui/core/Menu';
import Modal from '@material-ui/core/Modal';

import filterUnselected from '../../assets/images/ic-filter-unselected.png';
import filterSelected from '../../assets/images/ic-filter-selected.png';
import cancel from "../../assets/images/ic-cancel.png";
import spherePlaceholder from '../../assets/images/ic_categories_placeholder.svg';

const SearchResultFilters = (props: any) => {
    const [errors, setErrors] = useState<any>({});
    const [priceAnchorEl, setPriceAnchorEl] = useState(null);
    const [sortingAnchorEl, setSortingAnchorEl] = useState(null);
    const [stateData, setStateData] = useState({
        page: 1,
        paramData: ''
    })

    const [sortByFilter, setSortByFilter] = useState<any>({
        sortByFilterClicked: false,
        showResultsButtonClicked: false,
        tradeId: [],
        jobTypes: [],
        specializationId: [],
        allSpecializationClicked: false,
    });

    const [sortByPrice, setSortByPrice] = useState<any>({
        priceFilterClicked: false,
        payTypeClicked: false,
        pay_type: "Fixed price",
        max_budget: null,
    });

    const [sortBySorting, setSortBySorting] = useState<any>({
        sortBySorting: false,
        sortBy: 0,
    });


    useEffect(() => {
        props.getJobTypeList();
        props.callTradeList();
        const paramsList = getSearchParamsData(props?.history?.location);
        if (paramsList) {
            if (paramsList.specializationId?.length && paramsList.tradeId?.length && paramsList.jobTypes?.length) {
                setSortByFilter((prevData: any) => ({ ...prevData, tradeId: paramsList.tradeId, jobTypes: paramsList.jobTypes, specializationId: paramsList.specializationId, showResultsButtonClicked: true }));
            }
            if (paramsList.max_budget && paramsList.pay_type) {
                setSortByPrice((prevData: any) => ({ ...prevData, pay_type: paramsList.pay_type, max_budget: paramsList.max_budget }));
            }
            if (paramsList.sortBy) {
                setSortBySorting((prevData: any) => ({ ...prevData, sortBy: paramsList.sortBy }));
            }
        }
    }, []);


    useEffect(() => {
        if (props.cleanFiltersData) {
            setSortByFilter((prevData: any) => ({ ...prevData, tradeId: [], jobTypes: [], specializationId: [], allSpecializationClicked: false, showResultsButtonClicked: false, sortByFilterClicked: false }));
            setSortByPrice((prevData: any) => ({ ...prevData, pay_type: 'Fixed price', max_budget: null, payTypeClicked: false }));
            setSortBySorting((prevData: any) => ({ ...prevData, sortBy: 0 }));
        }
    }, [props.cleanFiltersData]);

    const sortByPriceClick = (event: any) => {
        setPriceAnchorEl(event.currentTarget);
        setSortByPrice((prevData: any) => ({ ...prevData, priceFilterClicked: true }))
    };

    const sortByPriceClose = () => {
        setPriceAnchorEl(null);
        setSortByPrice((prevData: any) => ({ ...prevData, priceFilterClicked: false }));
        delete errors.maxBudget;
    };

    const sortByFilterClick = () => {
        setSortByFilter((prevData: any) => ({ ...prevData, sortByFilterClicked: true }))
    };

    const sortByFilterClose = () => {
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

    const maxBudgetHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputVal = e.target.value;
        const val = inputVal.split('.');
        if (val.length > 2) return;
        if (inputVal.includes('.') && val[1].length > 2) return;
        const key = inputVal.charCodeAt(inputVal.length - 1);
        if ((key == NaN || inputVal == "") && sortByPrice.max_budget?.length === 1) {
            setSortByPrice((prevData: any) => ({ ...prevData, max_budget: null }))
            return;
        }
        if ((key > 47 && key < 58) || (key === 8 || key === 46)) {
            setSortByPrice((prevData: any) => ({ ...prevData, max_budget: e.target.value }))
        }
    }

    const validateForm = () => {
        const newErrors: any = {};
        if (!sortByPrice.max_budget) {
            newErrors.maxBudget = Constants.errorStrings.maxBudgetEmpty;
        }
        setErrors(newErrors);
        return !Object.keys(newErrors).length;
    }

    const showResultsByAllFilter = (item?: any) => {
        const data = {
            ...(sortByFilter.tradeId?.length && { tradeId: sortByFilter.tradeId }),
            ...(sortByFilter.jobTypes?.length && { jobTypes: sortByFilter.jobTypes }),
            ...(sortByFilter.specializationId?.length && { specializationId: sortByFilter.specializationId }),
            ...(sortByPrice.max_budget && { pay_type: sortByPrice.pay_type }),
            ...(sortByPrice.max_budget && { max_budget: Number(sortByPrice.max_budget) }),
            ...(item?.sortBy && { sortBy: Number(item?.sortBy) }),
        }
        props.showBudgetFilterResults(data);
    }

    const showResultsByFilter1 = () => {
        if (sortByFilter.jobTypes.length && sortByFilter.specializationId.length && sortByFilter.tradeId.length) {
            sortByFilterClose();
            setSortByFilter((prevData: any) => ({ ...prevData, showResultsButtonClicked: true }));
            showResultsByAllFilter();
        } else {
            setShowToast(true, "Please select all required fields");
        }
    }

    const showResultsByBudget = (e: any) => {
        e.preventDefault();
        if (validateForm()) {
            sortByPriceClose();
            showResultsByAllFilter();
        }
    }

    const sortByButtonClicked = (num: number) => {
        const item = {
            sortBy: num
        }
        setSortBySorting((prevData: any) => ({ ...prevData, sortBy: num }));
        sortBySortingClose();
        showResultsByAllFilter(item);
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
                var newData = [...prevData.specializationId];
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
            setSortByFilter((prevData: any) => ({ ...prevData, allSpecializationClicked: false, tradeId: [], jobTypes: [], specializationId: [] }))
        }
    }

    const specializationList = props.tradeListData.find(({ _id }: { _id: string }) => _id === sortByFilter.tradeId[0])?.specialisations;

    console.log('tradiefilters----------', sortByFilter, sortByPrice, sortBySorting)
    return (
        <div className="filters_wrapr">
            <ul className="filters_row">
                <li>
                    <a onClick={sortByFilterClick} className={sortByFilter.showResultsButtonClicked ? 'active' : ''}>
                        <img src={sortByFilter.showResultsButtonClicked ? filterSelected : filterUnselected} alt="filter" />Filter
                    </a>
                </li>
                <li>
                    <a className={sortByPrice.max_budget ? "active" : ''} onClick={sortByPriceClick}>Price</a>
                </li>
                <li>
                    <a className={sortBySorting.sortBy ? "active" : ''} onClick={sortBySortingClick}>Sorting</a>
                </li>
            </ul>
            {/* filter 1 modal box */}
            {sortByFilter.sortByFilterClicked &&
                <Modal
                    className="custom_modal"
                    open={sortByFilter.sortByFilterClicked}
                    onClose={sortByFilterClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div className="custom_wh filter_modal" data-aos="zoom-in" data-aos-delay="30" data-aos-duration="1000">
                        <div className="heading">
                            <span className="sub_title">Filter</span>
                            <button className="close_btn" onClick={sortByFilterClose}>
                                <img src={cancel} alt="cancel" />
                            </button>
                        </div>

                        <div className="inner_wrap">
                            <div className="form_field">
                                <span className="xs_sub_title">Categories</span>
                            </div>
                            <div className="select_sphere">
                                <ul>
                                    {props.tradeListData?.map(({ _id, trade_name, selected_url, specialisations }: { _id: string, trade_name: string, selected_url: string, specialisations: [] }) => {
                                        const active = sortByFilter.tradeId[0] === _id;
                                        return (
                                            <li key={_id} className={active ? 'active' : ''} onClick={() => filterChangeHandler(_id, 'categories')}>
                                                <figure>
                                                    <img src={selected_url ? selected_url : spherePlaceholder} />
                                                </figure>
                                                <span className="name">{trade_name}</span>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                            <div className="form_field">
                                <span className="xs_sub_title">Job types</span>
                            </div>
                            <ul className="job_categories">
                                {props.jobTypeListData?.map(({ _id, name, image }: { _id: string, name: string, image: string }) => {
                                    const active = sortByFilter.jobTypes[0] == _id;
                                    return (
                                        <li className={`draw ${active ? 'active' : ''}`} key={_id} onClick={() => filterChangeHandler(_id, 'jobTypes')}>
                                            <figure className="type_icon">
                                                <img src={image} alt="" />
                                            </figure>
                                            <span className="name">{name}</span>
                                        </li>
                                    )
                                })}
                            </ul>
                            <div className="form_field">
                                <span className="xs_sub_title">Specialisation</span>
                            </div>
                            <div className="tags_wrap">
                                <ul>
                                    {specializationList?.length > 0 &&
                                        <li className={sortByFilter.allSpecializationClicked ? 'selected' : ''}
                                            onClick={() => filterChangeHandler(specializationList, 'All Clicked')}>All</li>}
                                    {specializationList?.map(({ _id, name }: { _id: string, name: string }) => {
                                        const active = sortByFilter.specializationId?.indexOf(_id) >= 0;
                                        return (
                                            <li key={_id} className={active && !sortByFilter.allSpecializationClicked ? 'selected' : ''} onClick={() => filterChangeHandler(_id, 'specializationId')}>{name}</li>)
                                    }
                                    )
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="filter_btn">
                            <a className="link" onClick={() => filterChangeHandler('Clear All', 'Clear All')}>Clear All</a>
                            <button className="fill_btn full_btn btn-effect" onClick={showResultsByFilter1}>Show Results</button>
                        </div>
                    </div>
                </Modal>
            }
            {/* price filter box */}
            {sortByPrice.priceFilterClicked &&
                <Menu className="fsp_modal range"
                    id="simple-menu"
                    anchorEl={priceAnchorEl}
                    keepMounted
                    open={Boolean(priceAnchorEl)}
                    onClose={sortByPriceClose}
                >
                    <span className="close_btn" onClick={sortByPriceClose}>
                        <img src={cancel} alt="cancel" />
                    </span>
                    <span className="sub_title">Maximum budget</span>

                    <div className="form_field">
                        <div className="text_field">
                            <input type="text" placeholder="0" value={sortByPrice.max_budget} onChange={maxBudgetHandler} maxLength={9} className="detect_input_ltr" />
                            <span className="detect_icon_ltr">$</span>
                        </div>
                        {!!errors.maxBudget && <span className="error_msg">{errors.maxBudget}</span>}
                    </div>

                    <div className="f_spacebw">
                        <span className={sortByPrice.payTypeClicked ? "price up" : 'price down'} onClick={() => setSortByPrice((prevData: any) => ({ ...prevData, payTypeClicked: !prevData.payTypeClicked }))}>
                            {sortByPrice.pay_type == "Fixed price" ? "Fixed price" : sortByPrice.pay_type == "Per hour" ? "Per hour" : ""}
                        </span>
                        <a className="link" onClick={showResultsByBudget}>Show results</a>
                    </div>
                    {sortByPrice.payTypeClicked &&
                        <div>
                            <div onClick={() => setSortByPrice((prevData: any) => ({ ...prevData, pay_type: "Per hour", payTypeClicked: !prevData.payTypeClicked }))}>
                                <span className="per_day">Per hour</span>
                            </div>
                            <div onClick={() => setSortByPrice((prevData: any) => ({ ...prevData, pay_type: "Fixed price", payTypeClicked: !prevData.payTypeClicked }))}>
                                <span className="per_day">Fixed price</span>
                            </div>
                        </div>
                    }

                </Menu>}
            {/* sorting filter box */}
            {sortBySorting.sortBySorting &&
                <Menu
                    className="fsp_modal range"
                    anchorEl={sortingAnchorEl}
                    keepMounted
                    open={Boolean(sortingAnchorEl)}
                    onClose={sortBySortingClose}
                >
                    <span className="close_btn" onClick={sortBySortingClose}>
                        <img src={cancel} alt="cancel" />
                    </span>
                    <span className="sub_title">Sort by</span>
                    <div className="radio_wrap agree_check">
                        <input className="filter-type filled-in" type="radio" id="highestRated"
                            value="Highest rated" checked={sortBySorting.sortBy === 1} onChange={() => sortByButtonClicked(1)} />
                        <label htmlFor="highestRated">Highest rated</label>
                    </div>
                    <div className="radio_wrap agree_check">
                        <input className="filter-type filled-in" type="radio" id="closest"
                            value="Closest to me" checked={sortBySorting.sortBy === 2} onChange={() => sortByButtonClicked(2)} />
                        <label htmlFor="closest">Closest to me</label>
                    </div>
                    <div className="radio_wrap agree_check">
                        <input className="filter-type filled-in" type="radio" id="mostJob"
                            value="Most jobs completed" checked={sortBySorting.sortBy === 3} onChange={() => sortByButtonClicked(3)} />
                        <label htmlFor="mostJob">Most jobs completed</label>
                    </div>
                </Menu>}
        </div >
    )
}

export default SearchResultFilters;
