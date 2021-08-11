import { useState, useEffect } from 'react';
import Constants from '../../utils/constants';
import { setShowToast } from '../../redux/common/actions';
import { getSearchParamsData } from '../../utils/common';
import Menu from '@material-ui/core/Menu';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import NumberFormat from 'react-number-format';

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
        pay_type: "Per hour",
        budget: [5000, 50000],
        showBudget: [5000, 50000],
        maxBudgetView: null,
        showResultClicked: false
    });
    // const [sliderValue, setSliderValue] = useState([200, 670]);

    const [sortBySorting, setSortBySorting] = useState<any>({
        sortBySorting: false,
        sortBy: 0,
    });


    useEffect(() => {
        props.getJobTypeList();
        props.callTradeList();
        const paramsList = getSearchParamsData(props?.history?.location);
        if (paramsList) {
            if (paramsList.isFilterOn === "isFilterOn" && (paramsList.tradeId?.length || paramsList.jobTypes?.length)) {
                setSortByFilter((prevData: any) => ({
                    ...prevData,
                    tradeId: paramsList.tradeId ? paramsList.tradeId : [],
                    jobTypes: paramsList.jobTypes ? paramsList.jobTypes : [],
                    specializationId: paramsList.specializationId ? paramsList.specializationId : [],
                    showResultsButtonClicked: true
                }));
            }
            if (paramsList.min_budget && paramsList.max_budget && paramsList.pay_type) {
                const newBudget = [paramsList.min_budget, paramsList.max_budget];
                setSortByPrice((prevData: any) => ({ ...prevData, pay_type: paramsList.pay_type, budget: newBudget, showResultClicked: true }));
            }
            if (paramsList.sortBy) {
                setSortBySorting((prevData: any) => ({ ...prevData, sortBy: paramsList.sortBy }));
            }
        }
    }, []);


    useEffect(() => {
        if (props.cleanFiltersData) {
            setSortByFilter((prevData: any) => ({ ...prevData, tradeId: [], jobTypes: [], specializationId: [], allSpecializationClicked: false, showResultsButtonClicked: false, sortByFilterClicked: false }));
            setSortByPrice((prevData: any) => ({ ...prevData, pay_type: 'Per hour', payTypeClicked: false, showResultClicked: false }));
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
        if (item === "callViewNearByJobApi") {
            props.searchByFilter("callViewNearByJobApi");
            return;
        }
        const data = {
            ...(sortByFilter.tradeId?.length && { tradeId: sortByFilter.tradeId }),
            ...(sortByFilter.jobTypes?.length && { jobTypes: sortByFilter.jobTypes }),
            ...(sortByFilter.specializationId?.length && { specializationId: sortByFilter.specializationId }),
            ...(sortByPrice.showResultClicked && sortByPrice.budget[0] >= 0 && sortByPrice.budget[1] > 0 && { pay_type: sortByPrice.pay_type }),
            ...(sortByPrice.showResultClicked && sortByPrice.budget[0] >= 0 && sortByPrice.budget[1] > 0 && { min_budget: Number(sortByPrice.budget[0]) }),
            ...(sortByPrice.showResultClicked && sortByPrice.budget[0] >= 0 && sortByPrice.budget[1] > 0 && { max_budget: Number(sortByPrice.budget[1]) }),
            ...(item?.sortBy && { sortBy: Number(item?.sortBy) }),
        }
        props.searchByFilter(data);
    }

    const showResultsByFilter1 = () => {
        if (sortByFilter.jobTypes.length || sortByFilter.tradeId.length) {
            sortByFilterClose();
            setSortByFilter((prevData: any) => ({ ...prevData, showResultsButtonClicked: true }));
            showResultsByAllFilter();
        } else {
            // setShowToast(true, "Please select atleast one field");
            sortByFilterClose();
            setSortByFilter((prevData: any) => ({ ...prevData, tradeId: [], jobTypes: [], specializationId: [], allSpecializationClicked: false, showResultsButtonClicked: false, sortByFilterClicked: false }));
            setSortByPrice((prevData: any) => ({ ...prevData, pay_type: 'Fixed price', max_budget: null, payTypeClicked: false }));
            setSortBySorting((prevData: any) => ({ ...prevData, sortBy: 0 }));
            showResultsByAllFilter("callViewNearByJobApi");
        }
    }

    const showResultsByBudget = (e: any) => {
        e.preventDefault();
        setSortByPrice((prevData: any) => ({ ...prevData, showResultClicked: true }));
        // if (validateForm()) {
        sortByPriceClose();
        showResultsByAllFilter();
        // }
    }

    const sortByButtonClicked = (num: number) => {
        const item = {
            sortBy: num
        }
        setSortBySorting((prevData: any) => ({ ...prevData, sortBy: num }));
        sortBySortingClose();
        showResultsByAllFilter(item);
    }

    const setSameOnClick = () => {
        const item = {
            sortBy: 400  //sending 400 e.g, to delete sortBy from query param ==> by passing to parent component
        }
        setSortBySorting((prevData: any) => ({ ...prevData, sortBy: 0 }));
        sortBySortingClose();
        showResultsByAllFilter(item);
    }

    const sortOnClick = (num: number) => {
        if (sortBySorting.sortBy == num) {
            setSameOnClick();
        }
    }

    const sortOnChange = (num: number) => {
        if (sortBySorting.sortBy !== num) {
            sortByButtonClicked(num);
        }
    }

    const handleSliderChange = (event: any, newValue: any) => {
        console.log('newValue: ', newValue);
        setSortByPrice((prevData: any) => ({ ...prevData, budget: newValue, showBudget: newValue }));
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

    useEffect(() => {
        if (specializationList?.length) {
            const newSpecialization = specializationList.map(({ _id }: { _id: string }) => {
                return _id;
            })
            setSortByFilter((prevData: any) => ({ ...prevData, specializationId: newSpecialization, allSpecializationClicked: true }));
        }
    }, [specializationList]);

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
                    <a className={sortByPrice.showResultClicked ? "active" : ''} onClick={sortByPriceClick}>Price</a>
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
                    {/* <span className="info_note">Middle price per day is $40</span> */}

                    {/* <div className="form_field">
                        <div className="text_field">
                                onValueChange={(values) => {
                                    const { formattedValue, value } = values;
                                    setSortByPrice((prevData: any) => ({ ...prevData, maxBudgetView: formattedValue, max_budget: value }));
                                }}
                            />
                    </div> */}


                    <div className="form_field">
                        <div className="radio_wrap agree_check">
                            <input className="filter-type filled-in" name="pay_type" type="radio" id="perHour" checked={sortByPrice.pay_type === 'Per hour' ? true : false}
                                onClick={() => setSortByPrice((prevData: any) => ({ ...prevData, pay_type: "Per hour" }))}
                            />
                            <label htmlFor="perHour">Per hour</label>
                        </div>
                        <div className="radio_wrap agree_check">
                            <input className="filter-type filled-in" name="pay_type" type="radio" id="fixed" checked={sortByPrice.pay_type === 'Fixed price' ? true : false}
                                onClick={() => setSortByPrice((prevData: any) => ({ ...prevData, pay_type: "Fixed price" }))}
                            />
                            <label htmlFor="fixed">Fixed price</label>
                        </div>
                    </div>
                    <div className="form_field">
                        <span className="per_day">{`$${sortByPrice.showBudget[0]} - $${sortByPrice.showBudget[1]}`}</span>
                        <Typography id="range-slider" gutterBottom></Typography>
                        <Slider
                            min={0}
                            max={99999}
                            value={sortByPrice.showBudget}
                            onChange={handleSliderChange}
                            // valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                        // getAriaValueText={valuetext}
                        />
                    </div>

                    {/* <div className="form_field">
                                <button className="fill_btn full_btn">Continue</button>
                            </div> */}

                    <div className="f_spacebw">
                        {/* <span className={sortByPrice.payTypeClicked ? "price up" : 'price down'} onClick={() => setSortByPrice((prevData: any) => ({ ...prevData, payTypeClicked: !prevData.payTypeClicked }))}>
                            {sortByPrice.pay_type == "Fixed price" ? "Fixed price" : sortByPrice.pay_type == "Per hour" ? "Per hour" : ""}
                        </span> */}
                        <a className="link" onClick={showResultsByBudget}>Show results</a>
                    </div>
                    {/* {sortByPrice.payTypeClicked &&
                        <div>
                            <div onClick={() => setSortByPrice((prevData: any) => ({ ...prevData, pay_type: "Per hour", payTypeClicked: !prevData.payTypeClicked }))}>
                                <span className="per_day">Per hour</span>
                            </div>
                            <div onClick={() => setSortByPrice((prevData: any) => ({ ...prevData, pay_type: "Fixed price", payTypeClicked: !prevData.payTypeClicked }))}>
                                <span className="per_day">Fixed price</span>
                            </div>
                        </div>
                    } */}

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
                        // onChange={() => sortByButtonClicked(2)}
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
                        <label htmlFor="mostJob">Most jobs completed</label>
                    </div>
                </Menu>}
        </div >
    )
}

export default SearchResultFilters;
