import React, { useState, useEffect } from 'react';
// import colorLogo from '../../../assets/images/ic-logo-yellow.png';
// import menu from '../../../assets/images/menu-line-white.svg';
// import bell from '../../../assets/images/ic-notification.png';
// import dummy from '../../../assets/images/u_placeholder.jpg';
// @ts-ignore
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import CommonHeader from './commonHeader';
import moment from 'moment';
interface Proptypes {
    data: any;
    stepCompleted: Boolean;
    handleStepComplete: (data: any) => void;
    handleStepBack: () => void;
}

const default_format = 'YYYY-MM-DD';
const ChooseTiming = ({ data, stepCompleted, handleStepComplete, handleStepBack }: Proptypes) => {
    const [range, setRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });
    const [formattedDates, setFormattedDates] = useState({});
    const [error, setError] = useState('');

    const handleChange = (item: any) => {
        console.log({ item }, '---in-change')
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
        // let from_date = moment(range.startDate).format(default_format);
        let to_date = moment(range.endDate).format(default_format);
        let current_date = moment().format(default_format);
        if (moment(to_date, default_format).isAfter(moment(current_date, default_format))) {
            return false; // changes
        } else {
            return true; // still same
        }
    }

    return (
        <div className="app_wrapper">
            <CommonHeader />
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
                        <div className="flex_col_sm_5">
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
                            <span className="error_msg mtb-10">{error}</span>
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
