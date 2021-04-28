import { useState } from 'react';
import Constants from '../../utils/constants';
import regex from '../../utils/regex';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import filterUnselected from '../../assets/images/ic-filter-unselected.png';
import filterSelected from '../../assets/images/ic-filter-selected.png';
import cancel from "../../assets/images/ic-cancel.png";

const SearchResultFilters = (props: any) => {
    const [errors, setErrors] = useState<any>({});
    const [priceAnchorEl, setPriceAnchorEl] = useState(null);
    const [filterState, setFilterState] = useState({
        page: 1,
    })

    const [sortByPrice, setSortByPrice] = useState<any>({
        priceFilterClicked: false,
        payTypeClicked: false,
        pay_type: "Fixed price",
        max_budget: '',
    });

    const handleClick = (event: any) => {
        setPriceAnchorEl(event.currentTarget);
        setSortByPrice((prevData: any) => ({ ...prevData, priceFilterClicked: true }))
    };

    const handleClose = () => {
        setPriceAnchorEl(null);
        setSortByPrice((prevData: any) => ({ ...prevData, priceFilterClicked: false }))
    };

    const maxBudgetHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputVal = e.target.value;
        const key = inputVal.charCodeAt(inputVal.length - 1)
        if ((key == NaN || inputVal == "") && sortByPrice.max_budget?.length === 1) {
            setSortByPrice((prevData: any) => ({ ...prevData, max_budget: null }))
            return;
        }
        if ((key > 47 && key < 58) || key === 8) {
            e.preventDefault();
            setSortByPrice((prevData: any) => ({ ...prevData, max_budget: e.target.value }))
        }
    }

    const validateForm = () => {
        const newErrors: any = {};
        if (!sortByPrice.max_budget) {
            newErrors.maxBudget = Constants.errorStrings.priceFilterInput;
        }
        // } else {
        //     const searchJobRegex = new RegExp(regex.numeric);
        //     if (!searchJobRegex.test(sortByPrice.max_budget)) {
        //         newErrors.maxBudget = Constants.errorStrings.bannerSearchJob;
        //     }
        // }

        setErrors(newErrors);
        return !Object.keys(newErrors).length;
    }

    const showResultsByBudget = () => {
        if (validateForm()) {
            const data = {
                pay_type: sortByPrice.pay_type,
                max_budget: parseInt(sortByPrice.max_budget)
            }
            props.showBudgetFilterResults(data);
            handleClose();
        }
    }

    return (
        <div className="filters_wrapr">
            <ul className="filters_row">
                <li>
                    <a>
                        <img src={filterUnselected} alt="filter" />Filter
                       {/* <img src={filterSelected} alt="filter" />Filter */}
                    </a>
                </li>
                <li>
                    <a className={sortByPrice.priceFilterClicked ? "active" : ''} onClick={handleClick}>Price</a>
                </li>
                <li>
                    <a >Highest rated</a>
                </li>
            </ul>
            {sortByPrice.priceFilterClicked &&
                <Menu
                    id="simple-menu"
                    anchorEl={priceAnchorEl}
                    keepMounted
                    open={Boolean(priceAnchorEl)}
                    onClose={handleClose}
                >
                    <button className="close_btn" onClick={handleClose}>
                        <img src={cancel} alt="cancel" />
                    </button>
                    <span className="sub_title">Maximum budget</span>
                    <span>$<input type="text" placeholder="$0" value={sortByPrice.max_budget} onChange={maxBudgetHandler} maxLength={6} /></span>
                    {!!errors.maxBudget && <span className="error_msg">{errors.maxBudget}</span>}
                    <button onClick={() => setSortByPrice((prevData: any) => ({ ...prevData, payTypeClicked: !prevData.payTypeClicked }))}>
                        {sortByPrice.pay_type == "Fixed price" ? "Fixed price" : sortByPrice.pay_type == "Per hour" ? "Per hour" : ""}
                    </button>
                    {sortByPrice.payTypeClicked &&
                        <div>
                            <div onClick={() => setSortByPrice((prevData: any) => ({ ...prevData, pay_type: "Per hour", payTypeClicked: !prevData.payTypeClicked }))}>
                                <span>Per hour</span>
                            </div>
                            <div onClick={() => setSortByPrice((prevData: any) => ({ ...prevData, pay_type: "Fixed price", payTypeClicked: !prevData.payTypeClicked }))}>
                                <span>Fixed price</span>
                            </div>
                        </div>}
                    <div>
                        <button onClick={showResultsByBudget}>Show results</button>
                    </div>
                </Menu>}
        </div >
    )
}

export default SearchResultFilters
