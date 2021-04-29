import React, { Component, useEffect, useState } from 'react';
import moment from 'moment';

interface Props {
    data: any;
    stepCompleted: Boolean;
    editMileStone: any;
    editMilestoneTiming: any;
    handleStepComplete: (data: any) => void;
    addTimeToMileStone: (data: any, index: any) => void;
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

export default class EditMilestone extends Component<Props, State> {
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

    componentDidMount() {
        const { editMileStone, milestones, editMilestoneTiming } = this.props;
        console.log({ editMileStone, milestones, editMilestoneTiming }, '--------------- componentDidMount')
        let item = milestones[editMileStone];

        if (Object.keys(item).length) {
            let { milestone_name, isPhotoevidence, from_date, to_date, recommended_hours } = item;

            if (editMilestoneTiming && Object.keys(editMilestoneTiming).length) {
                if ('from_date' in editMilestoneTiming) {
                    from_date = editMilestoneTiming?.from_date;
                }
                if ('to_date' in editMilestoneTiming) {
                    to_date = editMilestoneTiming?.to_date;
                }
            }

            this.setState({
                from_date: from_date,
                isPhotoevidence: isPhotoevidence,
                milestone_name: milestone_name,
                recommended_hours: recommended_hours,
                to_date: to_date,
            }, () => {
                this.props.addTimeToMileStone({
                    from_date,
                    to_date
                }, editMileStone)
            })
        }
    }

    handleChange = (name: string, value: any) => {
        this.setState({ ...this.state, [name]: value });
    }

    handleContinue = () => {
        this.setItems();
        this.props.handleStepForward(6);
    }


    setItems = () => {
        const { milestones, handleStepMileStone, newMileStoneScreen, editMileStone } = this.props;
        let { milestone_name, from_date, to_date, isPhotoevidence, recommended_hours, errors } = this.state;
        let milestone_index = editMileStone;
        handleStepMileStone({
            "milestone_name": milestone_name,
            "isPhotoevidence": isPhotoevidence,
            "from_date": from_date,// milestones[milestone_index]?.from_date || '',
            "to_date": to_date,//milestones[milestone_index]?.to_date || '',
            "recommended_hours": recommended_hours
        }, milestone_index);
    }

    render() {
        const { handleStepForward, handleStepBack, milestones, editMileStone } = this.props;
        let { milestone_name, isPhotoevidence, recommended_hours, from_date, to_date, errors } = this.state;

        let from_date_format = from_date?.length ? moment(from_date, 'MM-DD-YYYYY').format('MMM DD') : '';
        let to_date_format = to_date?.length ? moment(to_date, 'MM-DD-YYYY').format('DD') : '';
        let check_errors = false;

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
                                            onClick={() => { handleStepForward(6) }}>
                                        </button>
                                        <span className="title">
                                            {`Edit Milestone ${editMileStone + 1}`}
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
                                        onClick={this.handleContinue}
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