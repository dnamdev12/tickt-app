import React, { useState } from 'react'
import TradieBox from '../../shared/tradieBox';
import Menu from '@material-ui/core/Menu';
import cancel from "../../../assets/images/ic-cancel.png";
import noDataFound from '../../../assets/images/no-data.png';
interface Props {
    items: any,
    jobid: any,
    setJobLabel: any,
    activeType: any,
    history: any,
    specializationId: any,
    isLoading: any,
}

const ApplicantsList = ({ items, jobid, specializationId, setJobLabel, isLoading, activeType }: Props) => {
    const [sortBySorting, setSortBySorting] = useState<any>({
        sortBySorting: false,
        sortBy: 1
    });
    const [filterAnchorEl, setFilterAnchorEl] = useState(null);
    const [sortingAnchorEl, setSortingAnchorEl] = useState(null);

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
        setJobLabel('applicantList', jobid, num)
    }
    console.log({ activeType })
    return (
        <div className="section_wrapper">
            <div className="custom_container">
                <div className="form_field">
                    <div className="flex_row center_flex">
                        <div className="flex_col_sm_6">
                            <React.Fragment>
                                <div className="relate">
                                    <button
                                        className="back"
                                        onClick={() => { setJobLabel(activeType) }}
                                    >
                                    </button>
                                    <span className="title">
                                        {'New applicants'}
                                    </span>
                                </div>
                                {/* { */}
                                <p className="commn_para">
                                    {activeType === 'applicant' &&
                                        <button onClick={sortBySortingClick} className="common-btn ">
                                            {'Sort by'}
                                        </button>
                                    }

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
                                        <span className="sub_title">Sort by</span>
                                        <div className="radio_wrap agree_check">
                                            <input
                                                className="filter-type filled-in"
                                                type="radio"
                                                id="highestRated"
                                                value="Highest rated"
                                                checked={sortBySorting.sortBy === 1}
                                                onChange={() => sortByButtonClicked(1)} />
                                            <label htmlFor="highestRated">Highest rated</label>
                                        </div>
                                        <div className="radio_wrap agree_check">
                                            <input
                                                className="filter-type filled-in"
                                                type="radio"
                                                id="closest"
                                                value="Closest to me"
                                                checked={sortBySorting.sortBy === 2}
                                                onChange={() => sortByButtonClicked(2)}
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
                                                onChange={() => sortByButtonClicked(3)}
                                            />
                                            <label htmlFor="mostJob">Most jobs completed</label>
                                        </div>
                                    </Menu>
                                </p>
                            </React.Fragment>
                        </div>
                    </div>
                </div>

                <div className="flex_row applicatns_row">
                    {console.log({ items }, '------------>')}
                    {items?.length ?
                        items.map((item: any, index: any) => (
                            <TradieBox
                                item={item}
                                index={index}
                                specializationId={specializationId}
                                jobId={jobid}
                            />
                        ))
                        :
                        !isLoading && (
                            <div className="no_record">
                                <figure className="no_img">
                                    <img src={noDataFound} alt="data not found" />
                                </figure>
                            </div>
                        )}
                </div>
            </div>
        </div>
    )
}

export default ApplicantsList;
