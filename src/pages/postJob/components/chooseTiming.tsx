import React, { useState, useEffect } from 'react';
// import colorLogo from '../../../assets/images/ic-logo-yellow.png';
// import menu from '../../../assets/images/menu-line-white.svg';
// import bell from '../../../assets/images/ic-notification.png';
// import dummy from '../../../assets/images/u_placeholder.jpg';
// @ts-ignore
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import moment from 'moment';
import { setShowToast } from '../../../redux/common/actions';
import { stat } from 'node:fs';
interface Proptypes {
    data: any;
    milestones: any,
    stepCompleted: Boolean;
    handleStepComplete: (data: any) => void;
    handleStepBack: () => void;
}

const default_format = 'YYYY-MM-DD';
const ChooseTiming = ({ data, milestones, stepCompleted, handleStepComplete, handleStepBack }: Proptypes) => {
    const [range, setRange] = useState<{ [index: string]: any }>({
        startDate: '',//new Date(), // ''
        endDate: '',// new Date(),
        key: 'selection',
    });
    const [formattedDates, setFormattedDates] = useState({});
    const [error, setError] = useState('');
    const [localChanges, setLocalChanges] = useState(false);


    useEffect(() => {
        if (stepCompleted) {
            setRange({
                startDate: data.from_date ? moment(data.from_date).toDate() : new Date(),
                endDate: data.to_date ? moment(data.to_date).toDate() : '',
                key: 'selection',
            });
            setLocalChanges(true);
        }
    }, [data, stepCompleted])

    const handleChange = (item: any) => {
        let mile: any = milestones;
        // console.log({ mile, item });
        if (mile?.length) {
            let start_selection: any = moment(item.selection.startDate).format('MM-DD-YYYY');
            let end_selection: any = moment(item.selection.endDate).isValid() ? moment(item.selection.endDate).format('MM-DD-YYYY') : null;
            let item_find: any = false;
            
            mile.forEach((item_date: any) => {
                let start: any = item_date.from_date;
                let end: any = moment(item_date.to_date).isValid() ? item_date.to_date : null;

                if (start && end) {
                    console.log({ start_selection, end_selection, start, end })
                    if (moment(start_selection).isAfter(start) || moment(end_selection).isBefore(end)) {
                        item_find = true
                    } 
                }

                if (start && !end) {
                    if (moment(start_selection).isAfter(start)) {
                        item_find = true; // true;
                    }
                }

                if (start_selection && end_selection && !end) {
                    if (moment(start).isSameOrAfter(start_selection) && moment(start).isSameOrBefore(end_selection)) {
                        item_find = false;
                    } else {
                        item_find = true
                    }
                }

            });
            if (item_find) {
                setShowToast(true, 'Please check the milestone dates.');
                return;
            }
        }
        setRange(item.selection);
        handleCheck(item.selection);
    };

    const handleCheck = (item: any) => {
        let from_date = moment(item.startDate).format(default_format);
        let to_date = moment(item.endDate).format(default_format);
        setFormattedDates({ from_date, to_date });
        if (moment(from_date, default_format).isAfter(moment(to_date, default_format))) { // isAfter
            setError('finish date is greater then the start date.');
        } else {
            setError('');
        }
    }

    const handleContinue = () => {
        handleStepComplete(formattedDates);
    }

    const checkDisable = () => {
        if (range?.startDate && range?.startDate !== 'Invalid date') {
            return false;
        }
        return true;
    }

    return (
        <div className="app_wrapper">
            <div className="section_wrapper">
                <div className="custom_container">
                    <div className="form_field">
                        <div className="flex_row">
                            <div className="flex_col_sm_5">
                                <div className="relate">
                                    <button className="back" onClick={handleStepBack}></button>
                                    <span className="title">Timing</span>
                                </div>
                                <p className="commn_para">Choose the start and finish day of your job</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex_row">
                        <div className="flex_col_sm_8">
                            <div className="form_field">
                                <DateRangePicker
                                    ranges={[range]}
                                    onChange={handleChange}
                                    months={2}
                                    direction="horizontal"
                                    moveRangeOnFirstSelection={false}
                                    rangeColors={["#fee600", "#b5b5b5"]}
                                    showDateDisplay={false}
                                    showSelectionPreview={true}
                                    showPreview={true}
                                    minDate={new Date()}
                                    maxDate={moment().add(2, 'years').toDate()}
                                    fixedHeight={true}
                                />
                            </div>
                            <span className="error_msg mtb-15">{error}</span>
                            <div className="form_field">
                                <button
                                    className={`fill_btn full_btn ${checkDisable() ? 'disable_btn' : ''}`}
                                    onClick={handleContinue}>
                                    {'Continue'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ChooseTiming
