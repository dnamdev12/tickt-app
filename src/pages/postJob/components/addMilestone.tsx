import React, { Component, useEffect, useState } from 'react';
import moment from 'moment';


interface Props {
    data: any;
    stepCompleted: Boolean;
    handleStepComplete: (data: any) => void;
    handleStepForward: (data: any) => void;
    newMileStoneScreen: (data: any) => void;
    handleStepMileStone: (data: any, index: any) => void;
    handleStepBack: () => void;
    milestones: any;
}
interface State {
    milestone_name: string,
    isPhotoevidence: boolean,
    from_date: string,
    to_date: string,
    recommended_hours: any
    errors: any;
}

const defaultData = {
    milestone_name: '',
    isPhotoevidence: true,
    from_date: '',
    to_date: '',
    recommended_hours: ''
}
export default class AddMilestone extends Component<Props, State> {
    constructor(props: any) {
        super(props)
        this.state = {
            milestone_name: '',
            isPhotoevidence: true,
            from_date: '',
            to_date: '',
            recommended_hours: '',
            errors: {
                milestone_name: '',
                from_date: '',
                recommended_hours: ''
            }
        }
    }


    componentDidUpdate(prevProps: any) {
        let nextProps = this.props;

        let { milestone_name, isPhotoevidence, from_date, to_date, recommended_hours } = this.state;
        if (nextProps.milestones.length) {
            let milestones_items = nextProps.milestones;
            let item = milestones_items[milestones_items.length - 1];
            console.log({ item }, 'Here!');

            if ('milestone_name' in item) {
                this.setLocalValueByCompare(item?.milestone_name, milestone_name, 'milestone_name');
            } else {
                if (milestone_name?.length) {
                    this.setState({ milestone_name: '' })
                }
            }
            if ('isPhotoevidence' in item) {
                this.setLocalValueByCompare(item?.isPhotoevidence, isPhotoevidence, 'isPhotoevidence');
            } else {
                if (isPhotoevidence) {
                    this.setState({ isPhotoevidence: false })
                }
            }
            if ('from_date' in item) {
                this.setLocalValueByCompare(item?.from_date, from_date, 'from_date');
            } else {
                if (from_date?.length) {
                    this.setState({ from_date: '' })
                }
            }
            if ('to_date' in item) {
                this.setLocalValueByCompare(item?.to_date, to_date, 'to_date');
            } else {
                if (to_date?.length) {
                    this.setState({ to_date: '' })
                }
            }
            if ('recommended_hours' in item) {
                this.setLocalValueByCompare(item?.recommended_hours, recommended_hours, 'recommended_hours');
            } else {
                if (recommended_hours?.length) {
                    this.setState({ recommended_hours: '' })
                }
            }
        }
    }

    setLocalValueByCompare = (prop: any, state: any, name: any) => {
        if (prop?.length !== state?.length) {
            this.setState({ ...this.state, [name]: prop });
        }
    }

    componentDidMount() {
        const { newMileStoneScreen, milestones } = this.props;
        let milestone_index = !milestones?.length ? milestones?.length : 0;
        newMileStoneScreen(milestone_index);
    }

    handleChange = (name: string, value: any) => {
        this.setState({ ...this.state, [name]: value }, () => {
            this.setItems();
        });
    }

    addAnotherMilestone = (e: any) => {
        e.preventDefault();
        const { milestones, newMileStoneScreen } = this.props;
        let milestone_index = milestones.length ? milestones.length - 1 : 0;
        if (!this.checkErrors()) {
            this.setItems();
            newMileStoneScreen(milestone_index + 1);
        }
    }

    isInvalid = (name: string, value: string) => {
        switch (name) {
            case 'milestone_name':
                return !value.length ? `please enter ${name}` : '';
            case 'from_date':
                return !value.length ? `please enter ${name}` : '';
            case 'recommended_hours':
                return !value.length ? `please enter ${name}` : '';
        }
    }


    checkErrors = () => {
        const { milestones } = this.props;
        let milestone_index = milestones.length ? milestones.length - 1 : 0;
        let from_date = milestones[milestone_index]?.from_date || '';
        let { milestone_name, isPhotoevidence, recommended_hours } = this.state;
        if (milestone_name?.length && recommended_hours?.length) {
            let error_1 = this.isInvalid('milestone_name', milestone_name);
            let error_2 = this.isInvalid('from_date', from_date);
            let error_3 = this.isInvalid('recommended_hours', recommended_hours);
            if (!error_1?.length && !error_2?.length && !error_3?.length) {
                return false;
            }
        }
        return true;
    }

    setItems = () => {
        const { milestones, handleStepMileStone, newMileStoneScreen } = this.props;
        let { milestone_name, isPhotoevidence, recommended_hours, errors } = this.state;
        let milestone_index = milestones.length ? milestones.length - 1 : 0;
        handleStepMileStone({
            "milestone_name": milestone_name,
            "isPhotoevidence": isPhotoevidence,
            "from_date": milestones[milestone_index]?.from_date || '',
            "to_date": milestones[milestone_index]?.to_date || '',
            "recommended_hours": recommended_hours
        }, milestone_index);
    }

    // setItems = () => {
    //     const { milestones, handleStepMileStone, newMileStoneScreen } = this.props;
    // let { dataItem } = this.state;
    // let milestone_index = milestones.length ? milestones.length - 1 : 0;
    // console.log({ dataItem, milestone_index });
    // handleStepMileStone({
    //     "milestone_name": dataItem?.milestone_name,
    //     "isPhotoevidence": dataItem?.isPhotoevidence,
    //     "from_date": milestones[milestone_index]?.from_date || '',
    //     "to_date": milestones[milestone_index]?.to_date || '',
    //     "recommended_hours": dataItem?.recommended_hours
    // }, milestone_index);
    // newMileStoneScreen(milestone_index + 1);
    // }

    render() {
        const { handleStepForward, handleStepBack, milestones } = this.props;
        let { milestone_name, isPhotoevidence, recommended_hours, errors } = this.state;
        // let { dataItem, dataItem: { milestone_name, isPhotoevidence, recommended_hours }, errors } = this.state;

        let from_date_format = '';
        let to_date_format = '';
        if (milestones.length) {
            let date_from_moment = milestones[milestones.length - 1].from_date;
            let date_to_moment = milestones[milestones.length - 1].to_date;
            console.log({ milestones, date_from_moment, date_to_moment })
            if (date_from_moment?.length) {
                from_date_format = moment(date_from_moment).format('MMM DD');
            }

            if (date_to_moment?.length) {
                to_date_format = moment(date_to_moment).format('DD');
            }
        }
        let check_errors = this.checkErrors();
        console.log({ milestone_name, isPhotoevidence, recommended_hours, check_errors }, 'in--render');
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
                                            {`Milestone ${milestones?.length}`}
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
                                            onChange={(e) => { this.handleChange('milestone_name', e.target.value) }}
                                            value={milestone_name}
                                            name="milestone_name" />
                                    </div>
                                    <span className="error_msg">{errors?.milestone_name}</span>
                                </div>
                                <div className="form_field">

                                    <div className="checkbox_wrap agree_check">
                                        <input
                                            onChange={() => { this.handleChange('isPhotoevidence', !isPhotoevidence) }}
                                            checked={isPhotoevidence}
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
                                            onChange={(e) => { this.handleChange('recommended_hours', e.target.value) }}
                                            value={recommended_hours}
                                            type="number"
                                            placeholder="Enter Recommended hours"
                                            name="recommended_hours" />
                                    </div>
                                    <span className="error_msg">{errors.recommended_hours}</span>
                                </div>

                                <div className="form_field">
                                    <button
                                        onClick={this.addAnotherMilestone}
                                        // className={`fill_btn fill_grey_btn full_btn`}>
                                        className={`fill_btn fill_grey_btn full_btn ${check_errors ? 'disable_btn' : ''}`}>
                                        {'Add milestone'}
                                    </button>
                                </div>
                                <div className="form_field">
                                    <button
                                        // className="fill_btn full_btn">
                                        className={`fill_btn full_btn ${check_errors ? 'disable_btn' : ''}`}>
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
}



/*
interface Proptypes {
    data: any;
    stepCompleted: Boolean;
    handleStepComplete: (data: any) => void;
    handleStepForward: (data: any) => void;
    newMileStoneScreen:(data: any) => void;
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


const AddMilestone = ({ data, stepCompleted, newMileStoneScreen, handleStepForward, handleStepComplete, milestones, handleStepMileStone, handleStepBack }: Proptypes) => {
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

        console.log('before', { milestones: milestones?.length, localChanges })
        if (milestones?.length) {
            let get_items = milestones[milestones.length - 1];
            console.log({ get_items })
            if (get_items) {
                setDataItem(get_items);
            }
        }
        // if (milestones?.length && !localChanges) {
        //     let get_items = milestones[milestones.length - 1]
        //     setDataItem(get_items);
        //     setLocalChanges(true);
        //     console.log('in-side')
        // }
        console.log({ milestones }, '---- add-mile. -- use-effect');

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
        console.log({ dataItem, milestones }, '------------- before-set item')
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

    console.log({ dataItem });

    let from_date_format = '';
    let to_date_format = '';
    if (milestones.length) {
        let date_from_moment = milestones[milestones.length - 1].from_date;
        let date_to_moment = milestones[milestones.length - 1].to_date;
        console.log({ milestones, date_from_moment, date_to_moment })
        if (date_from_moment?.length) {
            from_date_format = moment(date_from_moment).format('MMM DD');
        }

        if (date_to_moment?.length) {
            to_date_format = moment(date_to_moment).format('DD');
        }
    }
    console.log({ from_date_format, to_date_format, errors, dataItem })
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
                                        {`Milestone ${milestones?.length}`}
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
*/