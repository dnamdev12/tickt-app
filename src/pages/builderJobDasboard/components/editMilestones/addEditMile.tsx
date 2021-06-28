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
import { setShowToast } from '../../../../redux/common/actions';

// @ts-ignore
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

// for error messages
const label: { [index: string]: string } = {
    name: 'Milestone Name',
    duration: 'From Date',
    recommended: 'Recommended Hours',
}

const pattern = "^([0-9]?[0-9]?[0-9]?[0-9]?[0-9]):[0-5][0-9]$";

const AddEditMile = (props: any) => {
    const { resetItems, item } = props;
    const [isToggle, setToggle] = useState(false);
    const [stateData, setStateData] = useState({ name: '', isPhoto: false, duration: '', recommended: '' });
    const [errors, setErrors] = useState<any>({ name: '', duration: '', hours: '', pattern_error: '' });
    const [toggleCalender, setToggleCalender] = useState(false);

    const [toggleItem, setToggleItem] = useState(false);

    const [calenderItems, setCalender] = useState<any>({
        startDate: '', //new Date(),
        endDate: '',//new Date(),
        key: 'selection',
    });

    const toggleCal = () => {
        setToggleCalender((prev: any) => !prev);
    }

    const checkHoursVal = (value: any, lable: any, name: any) => {
        if (value?.length) {
            if (value.match(pattern) !== null) {
                return '';
            } else {
                return 'Please enter a valid pattern like : 04:03'
            }
        }
        return `${label[name]} is required.`
    }

    const isInvalid = (name: string, value: string) => {
        switch (name) {
            case 'name':
                return !value.length ? `${label[name]} is required.` : value.length > 50 ? 'Maximum 50 characters are allowed.' : '';
            case 'duration':
                return !value.length ? `${label[name]} is required.` : '';
            case 'recommended':
                return checkHoursVal(value, label, name);
        }
    }


    const handleChange = (name: any, value: any) => {
        let error_clone: any = {};

        if (name === "name") {
            value = (value).trimLeft().replace(/[^a-zA-Z|0-9 ]/g, "")
        }

        if (name === "recommended") {
            value = (value).trimLeft();
        }

        if (['name', 'duration', 'recommended'].includes(name)) {
            error_clone[name] = isInvalid(name, value)
        }

        setStateData((prev: any) => ({
            ...prev,
            [name]: value
        }));
        setErrors(error_clone);
    }

    useEffect(() => {
        const { milestones, editMile } = props;
        if (editMile > -1) {
            let editItem: any = milestones[editMile];
            console.log({ editItem })
            if (editItem) {
                setStateData({
                    name: editItem.milestoneName,
                    isPhoto: editItem.isPhotoevidence,
                    duration: renderTimeWithCustomFormat(editItem.fromDate, editItem.toDate, '', ['DD MMM', 'DD MMM YY']),
                    recommended: editItem?.recommendedHours
                });

                setCalender({
                    startDate: moment(editItem?.fromDate).isValid() ? moment(editItem?.fromDate).toDate() : '',
                    endDate: moment(editItem?.toDate).isValid() ? moment(editItem?.toDate).toDate() : '',
                    key: 'selection',
                })
            }
        }
    }, []);


    const checkIfChange = () => {

        let renderDuration: any = renderTimeWithCustomFormat(
            calenderItems.startDate,
            calenderItems.endDate,
            '',
            ['DD MMM', 'DD MMM YY'],
            'Choose'
        );

        if (!stateData?.name?.length && !stateData?.isPhoto && renderDuration === 'Choose' && !stateData?.recommended?.length) {
            return false;
        }
        return true;
    }

    const handleCalender = (date: any) => {
        let time = {
            fromDate: date.selection.startDate,
            toDate: date.selection.endDate
        };
        console.log({ selection: date.selection })
        let index = props?.milestones?.length;
        addTimeToMileStone(time, index);
        // setCalender(date.selection);
    }

    const addTimeToMileStone = (time: any, index: any, skip?: any) => {
        let milestone_clone: any = props?.milestones;
        let checkIsValid: any = true;

        if (!skip && milestone_clone?.length) {

            let filter_milestone: any = milestone_clone.filter((item_mile: any, index_mile: any) => index_mile !== index);

            if (filter_milestone?.length) {
                filter_milestone.forEach((mile: any) => {
                    let msw = moment(mile.fromDate).isValid();
                    let mew = moment(mile.toDate).isValid();

                    let tsw = moment(time.fromDate).isValid();
                    let tew = moment(time.toDate).isValid();

                    let mile_start = mile.fromDate;
                    let mile_end = mile.toDate;

                    let time_start = time.fromDate;
                    let time_end = time.toDate;

                    if (msw && mew) {
                        if (tsw && tew) {
                            let checkIfSame = moment(time_start).isSame(moment(mile_start)) && moment(time_end).isSame(moment(mile_end));

                            if (checkIfSame) {
                                checkIsValid = true;
                            }

                            if (!checkIfSame) {
                                if (
                                    moment(time_start).isSameOrAfter(moment(mile_start)) &&
                                    moment(time_start).isSameOrBefore(moment(mile_end))
                                ) {
                                    checkIsValid = false;
                                }

                                if (
                                    moment(time_end).isSameOrAfter(moment(mile_start)) &&
                                    moment(time_end).isSameOrBefore(moment(mile_end))
                                ) {
                                    checkIsValid = false;
                                }
                            }
                        }

                        if (!tew) {
                            if (moment(time_start).isSameOrAfter(moment(mile_start)) && moment(time_start).isSameOrBefore(moment(mile_start))) {
                                checkIsValid = false;
                            }
                        }
                    }

                    // here conditions
                })
            }
        }
        console.log({ checkIsValid });
        if (!checkIsValid) {
            setShowToast(true, 'Please add unique date.');
            return;
        }

        setCalender({
            startDate: moment(time.fromDate).toDate(),
            endDate: moment(time.toDate).toDate(),
            key: "selection"
        })
        // milestone_clone[index]['fromDate'] = time.fromDate;
        // milestone_clone[index]['to_date'] = time.to_date;
        // setMileStones(milestone_clone);
        // Array.isArray(forceupdate) ? setForceUpdate({}) : setForceUpdate([]);
    }

    // before render check
    const { name, isPhoto, recommended, duration } = stateData;
    let check_errors = false;
    let renderDuration: any = renderTimeWithCustomFormat(
        calenderItems.startDate,
        calenderItems.endDate,
        '',
        ['DD MMM', 'DD MMM YY', true],
        'Choose'
    );

    if (!name?.length || !recommended?.length || renderDuration === 'Choose') {
        check_errors = true;
    }

    let ItemCal: any = calenderItems;
    if (!moment(calenderItems?.startDate).isValid()) {
        ItemCal = { startDate: new Date(), endDate: '', key: 'selection' }
    }
    return (
        <div className="flex_row">
            <div className="flex_col_sm_12">


                <Dialog
                    open={toggleItem}
                    // onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {'If you click the back arrow, you lose the data, do you want to save it ?'}
                    </DialogTitle>
                    <DialogActions>
                        <Button
                            onClick={() => {
                                setToggleItem((prev: any) => !prev);
                            }}
                            color="primary">
                            {'Yes'}
                        </Button>
                        <Button
                            onClick={() => {
                                setToggleItem((prev: any) => !prev);
                                resetItems();
                            }}
                            color="primary" autoFocus>
                            {'No'}
                        </Button>
                    </DialogActions>
                </Dialog>

                <Modal
                    className="custom_modal "
                    open={toggleCalender}
                    onClose={() => { toggleCal() }}
                    aria-labelledby="calender-active-modal-title"
                    aria-describedby="calender-active-modal-title"
                >
                    <div
                        style={{
                            padding: '12px 20px 0px'
                        }}
                        className="item-modal-ctm custom_wh portfolio_preview ">
                        <DateRangePicker
                            ranges={[ItemCal]}
                            onChange={(date: any) => { handleCalender(date) }}
                            months={2}
                            direction="horizontal"
                            moveRangeOnFirstSelection={false}
                            rangeColors={["#fee600", "#b5b5b5"]}
                            showDateDisplay={false}
                            showSelectionPreview={true}
                            showPreview={true}
                            minDate={moment(item?.fromDate).isValid() ? moment(item?.fromDate).toDate() : new Date()}
                            maxDate={moment(item?.toDate).isValid() && !moment(item?.fromDate).isSame(item?.toDate) ? moment(item?.toDate).toDate() : moment().add(2, 'years').toDate()}
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
                                        if (checkIfChange()) {
                                            setToggleItem((prev: any) => !prev);
                                            return
                                        }
                                        resetItems();
                                    }}
                                    className="back">
                                </button>
                                <span className="title">
                                    {item?.jobName || ''}
                                </span>
                            </div>
                            <p className="sub_title">
                                {`${props.editMile !== '' ? 'Edit' : ''} Milestone ${props.editMile !== '' ? (props.editMile + 1) : (props.milestones?.length + 1)}`}
                            </p>
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
                                    onChange={(e: any) => { handleChange('name', e.target.value) }}
                                    value={name}
                                    name="milestone_name" />
                            </div>
                            <span className="error_msg">{errors?.name}</span>
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
                                <label className="form_label">
                                    {'Duration of milestone'}
                                </label>
                                <button
                                    onClick={() => { toggleCal() }}
                                    className="fill_btn fill_grey_btn choose_btn">
                                    {renderDuration}
                                </button>
                            </div>
                        </div>
                        <div className="form_field">
                            <label className="form_label">
                                {'Recommended Hours'}
                            </label>
                            <div className="text_field">
                                <input
                                    onChange={(e) => { handleChange('recommended', e.target.value) }}
                                    autoComplete='off'
                                    value={recommended}
                                    type="text"
                                    placeholder="Enter Recommended Hours"
                                    name="recommended_hours" />
                            </div>
                            <span className="error_msg">{errors.recommended}</span>
                            {/* <span className="error_msg">{errors.pattern_error}</span> */}
                        </div>


                        <div className="form_field">
                            <button
                                onClick={() => {
                                    console.log({ stateData, props })
                                    if (props.editMile !== '') {
                                        // edit
                                        if (props?.addNewMile) {
                                            props?.addNewMile({
                                                milestoneName: stateData.name,
                                                isPhotoevidence: stateData.isPhoto,
                                                recommendedHours: stateData.recommended,
                                                fromDate: calenderItems.startDate,
                                                toDate: calenderItems.endDate,
                                            })
                                        }
                                    } else {
                                        // add
                                        if (props?.addNewMile) {
                                            props?.addNewMile({
                                                milestoneName: stateData.name,
                                                isPhotoevidence: stateData.isPhoto,
                                                recommendedHours: stateData.recommended,
                                                fromDate: calenderItems.startDate,
                                                toDate: calenderItems.endDate,
                                            })
                                        }
                                    }
                                    props.resetItems();
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