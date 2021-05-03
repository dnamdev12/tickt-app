import React, { useEffect, useState } from 'react';
import moment from 'moment';
// import colorLogo from '../../../assets/images/ic-logo-yellow.png';
// import menu from '../../../assets/images/menu-line-white.svg';
// import bell from '../../../assets/images/ic-notification.png';
// import dummy from '../../../assets/images/u_placeholder.jpg';
interface Proptypes {
    data: any;
    stepCompleted: Boolean;
    handleStepComplete: (data: any) => void;
    handleStepForward: (data: any) => void;
    handleStepMileStone: (data: any, index: any) => void;
    handleStepBack: () => void;
    milestones: any;
}

const defaultData = {
    "milestone_name": '',
    "isPhotoevidence": false,
    "from_date": "",
    "to_date": "",
    "recommended_hours": ''
}

const AddMilestone = ({ data, stepCompleted, handleStepForward, handleStepComplete, milestones, handleStepMileStone, handleStepBack }: Proptypes) => {
    const [localChanges, setLocalChanges] = useState(false);
    const [backToPage, setBackToPage] = useState(0);
    const [dataItem, setDataItem] = useState(defaultData);
    const [range, setRange] = useState<{ [index: string]: string | Date }>({
        startDate: '',
        endDate: '',
        key: 'selection',
    });
    const [errors, setErrors] = useState({
        milestone_name: '',
        from_date: '',
        recommended_hours: ''
    });

    const isInvalid = (name: string, value: string) => {
        switch (name) {
            case 'milestone_name':
                return !value.length ? `please enter ${name}` : '';
            case 'from_date':
                return !value.length ? `please enter ${name}` : '';
            case 'recommended_hours':
                return !value.length ? `please enter ${name}` : '';
        }
    }

    useEffect(() => {
        if (milestones?.length) {
            let get_items = milestones[milestones.length - 1];
            if (get_items) {
                setDataItem(get_items);
            }
        }
        return () => {
            console.log('Unmount Here!')
            if (localChanges)
                setLocalChanges(false);
        }
    }, [data, localChanges, milestones])


    const addAnotherMilestone = (e: any) => {
        e.preventDefault();

        if (!checkErrors()) {
            setItems();
            setDataItem(defaultData);
        }
    }

    const setItems = () => {
        let milestone_index = milestones.length ? milestones.length - 1 : 0;
        handleStepMileStone({
            "milestone_name": dataItem?.milestone_name,
            "isPhotoevidence": dataItem?.isPhotoevidence,
            "from_date": milestones[milestone_index]?.from_date || '',
            "to_date": milestones[milestone_index]?.to_date || '',
            "recommended_hours": dataItem?.recommended_hours
        }, milestone_index);
    }


    const checkErrors = () => {
        if (dataItem['milestone_name'] && dataItem['from_date'] && dataItem['recommended_hours']) {
            let error_1 = isInvalid('milestone_name', dataItem['milestone_name']);
            let error_2 = isInvalid('from_date', dataItem['from_date']);
            let error_3 = isInvalid('recommended_hours', dataItem['recommended_hours']);
            if (!error_1?.length && !error_2?.length && !error_3?.length) {
                return false;
            }
        }
        return true;
    }


    const handleChange = ({ target: { name, value } }: any) => {
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: isInvalid(name, value),
        }));

        setDataItem((prev) => ({
            ...prev,
            [name]: value
        }));
        setItems();
    }

    let from_date_format = '';
    let to_date_format = '';
    if (milestones.length) {
        let date_from_moment = milestones[milestones.length - 1].from_date;
        let date_to_moment = milestones[milestones.length - 1].to_date;
        if (date_from_moment?.length) {
            from_date_format = moment(date_from_moment).format('MMM DD');
        }

        if (date_to_moment?.length) {
            to_date_format = moment(date_to_moment).format('DD');
        }
    }
    
    return (
        <div className="app_wrapper">
            <div className="section_wrapper">
                <div className="custom_container">
                    <div className="form_field">
                        <div className="flex_row">
                            <div className="flex_col_sm_5">
                                <div className="relate">
                                    <button
                                        className="back"
                                        onClick={handleStepBack}>
                                    </button>
                                    <span className="title">
                                        {`Milestone ${!milestones?.length ? 1 : milestones?.length - 1}`}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex_row">
                        <div className="flex_col_sm_5">
                            <div className="form_field">
                                <label className="form_label">Milestone name</label>
                                <div className="text_field">
                                    <input
                                        type="text"
                                        placeholder="Enter Milestone name"
                                        onChange={handleChange}
                                        value={dataItem.milestone_name}
                                        name="milestone_name" />
                                </div>
                                <span className="error_msg">{errors.milestone_name}</span>
                            </div>
                            <div className="form_field">
                                {/* <div className="radio_wrap agree_check">
                                    <input name="isPhotoevidence" className="filter-type filled-in" type="radio" id="evidence" />
                                    <label htmlFor="evidence">Photo evidence required</label>
                                </div> */}

                                <div className="checkbox_wrap agree_check">
                                    <input
                                        onClick={() => {
                                            setDataItem((prev) => ({
                                                ...prev,
                                                ['isPhotoevidence']: !prev?.isPhotoevidence
                                            }));
                                        }}
                                        checked={dataItem.isPhotoevidence}
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
                                        onClick={() => { handleStepForward(8) }}
                                        className="fill_btn fill_grey_btn choose_btn">
                                        {!to_date_format.length && from_date_format.length
                                            ? `${from_date_format}` : to_date_format.length
                                                ? `${from_date_format}-${to_date_format}`
                                                : 'Choose'}
                                    </button>
                                </div>
                            </div>
                            <div className="form_field">
                                <label className="form_label">Recommended hours</label>
                                <div className="text_field">
                                    <input
                                        onChange={handleChange}
                                        value={dataItem.recommended_hours}
                                        type="number" placeholder="Enter Recommended hours" name="recommended_hours" />
                                </div>
                                <span className="error_msg">{errors.recommended_hours}</span>
                            </div>

                            <div className="form_field">
                                <button
                                    onClick={addAnotherMilestone}
                                    // className={`fill_btn fill_grey_btn full_btn`}>
                                    className={`fill_btn fill_grey_btn full_btn ${checkErrors() ? 'disable_btn' : ''}`}>
                                    {'Add milestone'}
                                </button>
                            </div>
                            <div className="form_field">
                                <button
                                    // className="fill_btn full_btn">
                                    className={`fill_btn full_btn disable_btn ${checkErrors() ? 'disable_btn' : ''}`}>
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

export default AddMilestone;
