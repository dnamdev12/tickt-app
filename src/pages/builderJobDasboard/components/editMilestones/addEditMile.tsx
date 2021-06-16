import React, { Component, useEffect, useState } from 'react';
import moment from 'moment';
import { values } from 'lodash';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Modal from '@material-ui/core/Modal';

import { renderTimeWithCustomFormat } from '../../../../utils/common';

// @ts-ignore
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const AddEditMile = (props: any) => {
    const { resetItems } = props;
    const [isToggle, setToggle] = useState(false);
    const [stateData, setStateData] = useState({ name: '', isPhoto: false, recommended: '' });
    const [errors, setErrors] = useState<any>({});

    const [calenderItems, setCalender] = useState({
        startDate: '', //new Date(),
        endDate: '',//new Date(),
        key: 'selection',
    });

    const { name, isPhoto, recommended } = stateData;
    let check_errors = false;
    console.log({startDate:calenderItems.startDate});
    return (
        <div className="flex_row">
            <div className="flex_col_sm_12">

                <Modal
                    className="custom_modal "
                    open={false}
                    onClose={() => { }}
                    aria-labelledby="calender-active-modal-title"
                    aria-describedby="calender-active-modal-title"
                >
                    <div
                        style={{
                            width: "50%",
                            position: "absolute",
                            top: "30%",
                            left: "21%"
                        }}
                        className="item-modal-ctm">
                        <DateRangePicker
                            ranges={!calenderItems?.startDate?.length ? [{ startDate: new Date(), endDate: '', key: 'selection' }] : [calenderItems]}
                            onChange={(data: any) => { setCalender(data.selection) }}
                            months={2}
                            direction="horizontal"
                            moveRangeOnFirstSelection={false}
                            rangeColors={["#fee600", "#b5b5b5"]}
                            showDateDisplay={false}
                            showSelectionPreview={true}
                            showPreview={true}
                            // minDate={data?.from_date?.length ? moment(data?.from_date, 'YYYY-MM-DD').toDate() : new Date()}
                            // maxDate={data?.to_date?.length && data?.from_date !== data?.to_date ? moment(data?.to_date, 'YYYY-MM-DD').toDate() : moment().add(2, 'years').toDate()}
                            fixedHeight={true}
                        />
                    </div>
                </Modal>


                <div className="form_field">
                    <div className="flex_row">
                        <div className="flex_col_sm_7">
                            <div className="relate">
                                <button
                                    onClick={() => {
                                        console.log({
                                            props
                                        })
                                        resetItems();
                                    }}
                                    className="back">
                                </button>
                                <span className="title">
                                    {`Milestone 1`}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex_row">
                    <div className="flex_col_sm_7">
                        <div className="form_field">
                            <label className="form_label">
                                {'Milestone Name'}
                            </label>
                            <div className="text_field">
                                <input
                                    type="text"
                                    placeholder="Enter Milestone Name"
                                    onChange={(e) => { setStateData((prev: any) => ({ ...prev, name: e.target.value })) }}
                                    value={name}
                                    name="milestone_name" />
                            </div>
                            <span className="error_msg">{errors?.milestone_name}</span>
                        </div>
                        <div className="form_field">

                            <div className="checkbox_wrap agree_check">
                                <input
                                    onChange={() => { setStateData((prev: any) => ({ ...prev, isPhoto: !prev.isPhoto })) }}
                                    checked={isPhoto}
                                    className="filter-type filled-in"
                                    type="checkbox"
                                    id="milestone1" />
                                <label htmlFor="milestone1">
                                    {'Photo evidence required'}
                                </label>
                            </div>
                        </div>
                        <div className="form_field">
                            <div className="f_spacebw">
                                <label className="form_label">Duration of milestone</label>
                                <button
                                    onClick={() => { }}
                                    className="fill_btn fill_grey_btn choose_btn">
                                    {'Choose'}
                                </button>
                            </div>
                        </div>
                        <div className="form_field">
                            <label className="form_label">Recommended Hours</label>
                            <div className="text_field">
                                <input
                                    onChange={(e) => { setStateData((prev: any) => ({ ...prev, recommended: e.target.value })) }}
                                    autoComplete='off'
                                    value={recommended}
                                    type="text"
                                    placeholder="Enter Recommended Hours"
                                    name="recommended_hours" />
                            </div>
                            <span className="error_msg">{errors.recommended_hours}</span>
                            <span className="error_msg">{errors.pattern_error}</span>
                        </div>

                        <div className="form_field">
                            <button
                                onClick={() => { }}
                                className={`fill_grey_btn full_btn btn-effect ${check_errors ? 'disable_btn' : ''}`}>
                                {'Add milestone'}
                            </button>
                        </div>
                        <div className="form_field">
                            <button
                                onClick={() => {
                                    // newMileStoneScreen(milestone_index + 1);
                                    // handleStepForward(6)
                                }}
                                className={`fill_btn full_btn btn-effect ${check_errors ? 'disable_btn' : ''}`}>
                                {'Continue'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default AddEditMile;