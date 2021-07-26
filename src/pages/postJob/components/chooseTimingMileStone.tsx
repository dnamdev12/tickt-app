import React, { useState, useEffect } from 'react';
// import colorLogo from '../../../assets/images/ic-logo-yellow.png';
// import menu from '../../../assets/images/menu-line-white.svg';
// import bell from '../../../assets/images/ic-notification.png';
// import dummy from '../../../assets/images/u_placeholder.jpg';
// @ts-ignore
// import { DateRangePicker } from 'react-date-range';
// import 'react-date-range/dist/styles.css'; // main style file
// import 'react-date-range/dist/theme/default.css'; // theme css file



// @ts-ignore
import { DateRangePicker } from '../../../plugins/react-date-range/dist/index';
import '../../../plugins/react-date-range/dist/styles.css';
import '../../../plugins/react-date-range/dist/theme/default.css';
import moment from 'moment';


interface Proptypes {
    data: any;
    stepCompleted: Boolean;
    milestones: any,
    randomColors: any,
    editMilestoneTiming: any;
    editMileStone: any;
    handleStepForward: (data: any) => void;
    handleStepComplete: (data: any) => void;
    handleStepMileStone: (data: any, index: any) => void;
    handleStepBack: () => void;
    addTimeToMileStone: (time: any, index: number, skip?: any) => void;
    updateMileStoneTimings: (data: any) => void;
}

const default_format = 'YYYY-MM-DD';
const ChooseTimingMileStone = ({
    data,
    stepCompleted,
    randomColors,
    handleStepForward,
    updateMileStoneTimings,
    editMileStone,
    addTimeToMileStone,
    milestones,
    handleStepComplete,
    handleStepMileStone,
    handleStepBack }: Proptypes) => {
    const [range, setRange] = useState<{ [index: string]: string | Date }>({
        startDate: '', //new Date(),
        endDate: '',//new Date(),
        key: 'selection',
    });
    const [formattedDates, setFormattedDates] = useState({});
    const [error, setError] = useState('');
    const [localChanges, setLocalChanges] = useState(false);

    const onMountCallable = () => {
        let filteredItems = milestones.filter((item: any) => {
            if (Object.keys(item).length && item?.from_date) {
                return item;
            }
        })
        let count_from_to = 0;
        let count_from = 0;
        if (filteredItems?.length) {
            filteredItems.forEach((item: any, index: any) => {
                let to_date = item?.to_date;
                let from_date = item?.from_date;

                if (!to_date && from_date) {
                    count_from++;
                    let leftSpace = '5px';

                    if (count_from == 2) {
                        leftSpace = '20px';
                    }

                    if (count_from == 3) {
                        leftSpace = '35px';
                    }

                    if (count_from == 4) {
                        leftSpace = '50px';
                    }

                    let from_element: any = document.getElementsByClassName(`color_${count_from}_${from_date}`)[1];
                    if (from_element) {
                        from_element.setAttribute("style", `background-color: ${randomColors[index]}; padding: 5px; position: absolute; bottom: 0; border-radius: 5px; left: ${leftSpace};`);
                    }
                }

                if (to_date && from_date) {
                    count_from_to++;
                    let leftSpace = '5px';

                    if (count_from_to == 2) {
                        leftSpace = '20px';
                    }

                    if (count_from_to == 3) {
                        leftSpace = '35px';
                    }

                    if (count_from_to == 4) {
                        leftSpace = '50px';
                    }

                    let from_element: any = document.getElementsByClassName(`color_${count_from_to}_${from_date}`);
                    if (from_element) {
                        let element_from = from_element[0];
                        if (from_element?.length > 1) {
                            element_from = from_element[1];
                        }

                        if(element_from){
                            element_from.setAttribute("style", `background-color: ${randomColors[index]}; padding: 5px; position: absolute; bottom: 0; border-radius: 5px; left: ${leftSpace};`);
                        }
                    }

                    let to_element: any = document.getElementsByClassName(`color_${count_from_to}_${to_date}`);
                    if (to_element) {
                        let element_to = to_element[0];
                        if (to_element?.length > 1) {
                            element_to = to_element[1];
                        }
                        if(element_to){
                            element_to.setAttribute("style", `background-color: ${randomColors[index]}; padding: 5px; position: absolute; bottom: 0; border-radius: 5px; left: ${leftSpace};`);
                        }
                    }

                    console.log({
                        from_element,
                        to_element,
                        count_from_to,
                        from_date,
                        to_date
                    })
                }
            })
        }
        console.log({
            randomColors,
            filteredItems
        })
    }

    useEffect(() => {
        onMountCallable()
    }, [])

    const handleChange = (item: any) => {
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
        let moment_start = moment(range.startDate).format('MM-DD-YYYY')
        let moment_end = moment(range.endDate).format('MM-DD-YYYY')
        let timings = {
            from_date: range.startDate !== '' ? moment_start : '',
            to_date: (moment_start === moment_end || range.endDate === '') ? '' : moment_end
        }

        let item_index = null;
        item_index = milestones.length ? milestones.length - 1 : 0;

        if (editMileStone == null) {
            addTimeToMileStone(timings, item_index);
            handleStepBack();
        } else {
            updateMileStoneTimings(timings);
            addTimeToMileStone(timings, editMileStone);
            handleStepForward(15);
        }
        // handleStepComplete(formattedDates);
    }

    const checkDisable = () => {
        // let from_date = moment(range.startDate).format(default_format);
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
                                <p className="commn_para">
                                    {'Select a start and end date, or a due date.'}
                                    {/* {"if you tab the back arrow, you lose the `draft`. Can we save it ?"} */}
                                    {/* {'Choose the start and finish day of your job'} */}
                                </p>
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
                                    minDate={data?.from_date?.length ? moment(data?.from_date, 'YYYY-MM-DD').toDate() : new Date()}
                                    maxDate={data?.to_date?.length && data?.from_date !== data?.to_date ? moment(data?.to_date, 'YYYY-MM-DD').toDate() : moment().add(2, 'years').toDate()}
                                    fixedHeight={true}
                                />
                            </div>
                            <span className="error_msg mtb-15">{error}</span>
                            <div className="form_field">
                                <button
                                    className={`fill_btn full_btn btn-effect ${checkDisable() ? 'disable_btn' : ''}`}
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

export default ChooseTimingMileStone
