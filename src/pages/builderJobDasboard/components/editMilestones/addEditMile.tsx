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
// import { DateRangePicker } from '../../../../plugins/react-date-range/dist/index';
// import '../../../../plugins/react-date-range/dist/styles.css'
// import '../../../../plugins/react-date-range/dist/theme/default.css'
import { randomColors as getRandomColors } from '../../../../utils/common'

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

const pattern = "^([0-9][0-9]?[0-9]?[0-9]?[0-9]):[0-5][0-9]$";

const AddEditMile = (props: any) => {
    const { resetItems, item } = props;
    const [isToggle, setToggle] = useState(false);
    const [stateData, setStateData] = useState({ name: '', isPhoto: false, duration: '', recommended: '', status: -1, order: -1 });
    const [errors, setErrors] = useState<any>({ name: '', duration: '', hours: '', pattern_error: '' });
    const [toggleCalender, setToggleCalender] = useState(false);

    const [changesFor, setChangesFor] = useState({
        name: false,
        isPhoto: false,
        duration: false,
        recommended: false
    })

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
                if (!((+value.split(':')[1]) % 5 === 0)) {
                    return 'Time should be in mutiples of 5 like 10:05, 10:10';
                }
                return '';
            } else {
                return 'Please enter a valid pattern like : 10:05'
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



    const onMountCallable = () => {
        let count_times: any = {};
        let randomColors = getRandomColors();
        let milestones = props.milestones;
        let filteredItems = milestones.filter((item: any) => {
            let toDate = item?.toDate;
            let fromDate = item?.fromDate;
            console.log({
                fromDate,
                toDate
            })
            if (fromDate) {
                let from_format = moment(fromDate).format('MM-DD-YYYY')
                item['from_date'] = from_format;
                count_times[from_format] = 0;
            }

            if (toDate) {
                let to_format = moment(toDate).format('MM-DD-YYYY');
                item['to_date'] = to_format;
                count_times[to_format] = 0;
            }

            if (Object.keys(item).length) {
                return item;
            }
        });

        console.log({ filteredItems, count_times })

        if (filteredItems?.length) {
            filteredItems.forEach((item: any, index: any) => {
                let to_date = item?.to_date;
                let from_date = item?.from_date;
                let leftSpace: any = '0px';

                if (!to_date && from_date) {
                    if (count_times[from_date] > -1) {
                        count_times[from_date]++;
                    }

                    let from_element: any = document.getElementsByClassName(`color_${count_times[from_date]}_${from_date}`)[1];
                    if (from_element) {
                        from_element.setAttribute("style", `background-color: ${randomColors[index]}; padding: 5px; position: absolute; bottom: 0; border-radius: 5px; left: ${count_times[from_date] == 1 ? '10px' : count_times[from_date] == 2 ? '20px' : count_times[from_date] == 3 ? '30px' : '40px'};`);
                    }
                }

                if (to_date && from_date) {
                    if (count_times[from_date] > -1) {
                        count_times[from_date]++;
                    }

                    if (count_times[to_date] > -1) {
                        count_times[to_date]++;
                    }

                    let colorbyIndex = randomColors[index];
                    // console.log({ count_times },'----->',{class:`color_${count_times[from_date]}_${from_date}`})
                    let from_element: any = document.getElementsByClassName(`color_${count_times[from_date]}_${from_date}`);
                    // console.log({ from_element, length:from_element?.length, })
                    if (from_element) {
                        let element_from = from_element[0];
                        if (from_element?.length > 1) {
                            element_from = from_element[1];
                        }
                        console.log({ element_from })
                        if (element_from) {
                            element_from.setAttribute("style", `background-color: ${colorbyIndex}; padding: 5px; position: absolute; bottom: 0; border-radius: 5px; left: ${count_times[from_date] == 1 ? '10px' : count_times[from_date] == 2 ? '20px' : count_times[from_date] == 3 ? '30px' : '40px'}; from:${from_date}`);
                        }
                    }

                    let to_element: any = document.getElementsByClassName(`color_${count_times[to_date]}_${to_date}`);
                    console.log({ to_element })
                    if (to_element) {
                        let element_to = to_element[0];
                        if (to_element?.length > 1) {
                            element_to = to_element[1];
                        }
                        console.log({ element_to })
                        if (element_to) {
                            element_to.setAttribute("style", `background-color: ${colorbyIndex}; padding: 5px; position: absolute; bottom: 0; border-radius: 5px; left: ${count_times[to_date] == 1 ? '10px' : count_times[to_date] == 2 ? '20px' : count_times[to_date] == 3 ? '30px' : '40px'}; to:${to_date}`);
                        }
                    }
                }
            })
        }
    }


    useEffect(() => {
        const { milestones, editMile } = props;
        if (editMile > -1) {
            let editItem: any = milestones[editMile];
            if (editItem) {
                setStateData((prev: any) => ({
                    order: editItem?.order ? editItem?.order : -1,
                    name: editItem.milestoneName,
                    isPhoto: editItem.isPhotoevidence,
                    duration: renderTimeWithCustomFormat(editItem.fromDate, editItem.toDate, '', ['DD MMM', 'DD MMM YY']),
                    recommended: editItem?.recommendedHours,
                    status: editItem?.status
                }));

                setCalender({
                    startDate: moment(editItem?.fromDate).isValid() ? moment(editItem?.fromDate).toDate() : '',
                    endDate: moment(editItem?.toDate).isValid() ? moment(editItem?.toDate).toDate() : '',
                    key: 'selection',
                })
            }
        }
        // onMountCallable();
    }, []);


    useEffect(() => {
        console.log({ toggleCalender });
        onMountCallable();

        setTimeout(() => {
            console.log('Callable------>')
            onMountCallable();
        },1000);
    }, [toggleCalender])


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

    const checkBeforeExist = (time: any, milestones_?:any) => {
        let count_times: any = {};
        let catch_boolean: boolean = true;
        let milestoneItems:any = props?.milestones;

        milestoneItems.forEach((mile: any) => {

            let mile_start = mile.from_date;
            let mile_end = mile.to_date;

            let time_start = time.from_date;
            let time_end = time.to_date;


            if (count_times[mile_start] == undefined) {
                count_times[mile_start] = 1
            } else {
                count_times[mile_start] = count_times[mile_start] + 1;
            }


            if (count_times[mile_end] == undefined) {
                count_times[mile_end] = 1
            } else {
                count_times[mile_end] = count_times[mile_end] + 1;
            }

            if (count_times[mile_start] === 4) {
                if (mile_start == time_start || mile_start == time_end) {
                    setShowToast(true, 'Selected start data is fully engage');
                    catch_boolean = false;
                }
            } else {
                if (count_times[time_start] === 4) {
                    setShowToast(true, 'Selected start data is fully engage');
                    catch_boolean = false;
                }
            }

            if (count_times[mile_end] === 4) {
                if (mile_end == time_start || mile_end == time_end) {
                    setShowToast(true, 'Selected end data is fully engage');
                    catch_boolean = false;
                }
            } else {
                if (count_times[time_end] === 4) {
                    setShowToast(true, 'Selected start data is fully engage');
                    catch_boolean = false;
                }
            }


        });

        return catch_boolean;
    }

    const handleCalender = (date: any) => {
        let time = {
            fromDate: date.selection.startDate,
            toDate: date.selection.endDate
        };
        console.log({ selection: date.selection })
        let index = props?.milestones?.length;

        let isChecked = checkBeforeExist(time);
        if(isChecked){
            addTimeToMileStone(time, index);
        }
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

                            // if (checkIfSame) {
                            //     checkIsValid = true;
                            // }

                            // if (!checkIfSame) {
                            //     if (
                            //         moment(time_start).isSameOrAfter(moment(mile_start)) &&
                            //         moment(time_start).isSameOrBefore(moment(mile_end))
                            //     ) {
                            //         checkIsValid = false;
                            //     }

                            //     if (
                            //         moment(time_end).isSameOrAfter(moment(mile_start)) &&
                            //         moment(time_end).isSameOrBefore(moment(mile_end))
                            //     ) {
                            //         checkIsValid = false;
                            //     }
                            // }
                        }

                        // if (!tew) {
                        //     if (moment(time_start).isSameOrAfter(moment(mile_start)) && moment(time_start).isSameOrBefore(moment(mile_start))) {
                        //         checkIsValid = false;
                        //     }
                        // }
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
                            onChange={(date: any) => {
                                handleCalender(date)
                                setChangesFor((prev: any) => ({ ...prev, duration: true }))
                            }}
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
                                    onChange={(e: any) => {
                                        handleChange('name', e.target.value)
                                        setChangesFor((prev: any) => ({ ...prev, name: true }))
                                    }}
                                    value={name}
                                    name="milestone_name" />
                            </div>
                            <span className="error_msg">{errors?.name}</span>
                        </div>
                        <div className="form_field">

                            <div className="checkbox_wrap agree_check">
                                <input
                                    onChange={() => {
                                        setStateData((prev: any) => ({ ...prev, isPhoto: !prev.isPhoto }))
                                        setChangesFor((prev: any) => ({ ...prev, isPhoto: true }))
                                    }}
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
                                    onChange={(e) => {
                                        handleChange('recommended', e.target.value)
                                        setChangesFor((prev: any) => ({ ...prev, recommended: true }))
                                    }}
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
                                    let description: any = '';
                                    if (Object.values(changesFor).includes(true)) {
                                        // description = `This job has Milestones change request with changes in ${changesFor?.name ? 'Milestone Name, ' : ''}${changesFor?.isPhoto ? 'Photo evidence required, ' : ''}${changesFor?.duration ? 'Duration of Milestone, ' : ''}${changesFor?.recommended ? 'Recommended Hours ' : ''}.`;
                                        description = `${stateData.name} details are updated.`;
                                    }

                                    if (props.editMile !== '') {
                                        // edit
                                        if (props?.addNewMile) {
                                            props?.addNewMile({
                                                milestoneName: stateData.name,
                                                isPhotoevidence: stateData.isPhoto,
                                                order: stateData.order,
                                                status: stateData.status,
                                                recommendedHours: stateData.recommended,
                                                fromDate: calenderItems.startDate,
                                                toDate: calenderItems.endDate,
                                                description: description,
                                            })
                                        }
                                    } else {
                                        // add
                                        if (props?.addNewMile) {
                                            props?.addNewMile({
                                                milestoneName: stateData.name,
                                                isPhotoevidence: stateData.isPhoto,
                                                status: -1,
                                                order: (props?.milestones?.length + 1),
                                                recommendedHours: stateData.recommended,
                                                fromDate: calenderItems.startDate,
                                                toDate: calenderItems.endDate,
                                                description: description
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