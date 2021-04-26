import { useState } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import filterUnselected from '../../assets/images/ic-filter-unselected.png';
import filterSelected from '../../assets/images/ic-filter-selected.png';
import cancel from "../../assets/images/ic-cancel.png";

const SearchResultFilters = () => {
    const [priceAnchorEl, setPriceAnchorEl] = useState(null);

    const [sortByPrice, setSortByPrice] = useState<any>({
        priceFilterClicked: false,
        payTypeClicked: false,
        pay_type: "Fixed Price",
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
        // const inputLen = e.target.value.length;
        const inputVal = e.target.value;
        console.log(inputVal, "okok", e.target.value)
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
            {sortByPrice &&
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
                    <button onClick={() => setSortByPrice((prevData: any) => ({ ...prevData, payTypeClicked: !prevData.payTypeClicked }))}>
                        {sortByPrice.pay_type == "Fixed Price" ? "Fixed price" : sortByPrice.pay_type == "Per Hour" ? "Per hour" : "Fixed price"}
                    </button>
                    {sortByPrice.payTypeClicked &&
                        <div>
                            <div onClick={() => setSortByPrice((prevData: any) => ({ ...prevData, pay_type: "Per Hour", payTypeClicked: !prevData.payTypeClicked }))}>
                                <span>Per hour</span>
                            </div>
                            <div onClick={() => setSortByPrice((prevData: any) => ({ ...prevData, pay_type: "Fixed Price", payTypeClicked: !prevData.payTypeClicked }))}>
                                <span>Fixed price</span>
                            </div>
                        </div>}
                    <div>
                        <button>Show results</button>
                    </div>
                </Menu>}
        </div >
    )
}

export default SearchResultFilters
