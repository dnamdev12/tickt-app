import React, { Component, useEffect, useState } from 'react';
import moment from 'moment';
import { values } from 'lodash';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { renderTimeWithCustomFormat } from '../../../utils/common';

// Please add a unique date
interface Props {
    data: any;
    stepCompleted: Boolean;
    handleStepComplete: (data: any) => void;
    handleStepForward: (data: any) => void;
    newMileStoneScreen: (data: any) => void;
    handleStepMileStone: (data: any, index: any) => void;
    handleStepBack: () => void;
    updateMileStoneIndex: (data: any) => void;
    removeMilestoneByIndex: (data: any) => void;
    milestones: any;
}
interface State {
    isToggleOpen: boolean,
    milestone_name: string,
    isPhotoevidence: boolean,
    from_date: string,
    to_date: string,
    recommended_hours: any
    errors: any;
}

const defaultStates = {
    isToggleOpen: false,
    milestone_name: '',
    isPhotoevidence: false,
    from_date: '',
    to_date: '',
    recommended_hours: '',
}

// for error messages
const label: { [index: string]: string } = {
    milestone_name: 'Milestone Name',
    from_date: 'From Date',
    recommended_hours: 'Recommended Hours',
}

const pattern = "^([0-9]?[0-9]?[0-9]?[0-9]?[0-9]):[0-5][0-9]$";
export default class AddMilestone extends Component<Props, State> {
    constructor(props: any) {
        super(props)
        this.state = {
            isToggleOpen: false,
            milestone_name: '',
            isPhotoevidence: false,
            from_date: '',
            to_date: '',
            recommended_hours: '',
            errors: {
                milestone_name: '',
                from_date: '',
                recommended_hours: '',
                pattern_error: ''
            }
        }
    }

    toggleOpen = () => { this.setState({ isToggleOpen: !this.state.isToggleOpen }) }

    componentDidUpdate(prevProps: any) {
        let nextProps = this.props;

        let { milestone_name, isPhotoevidence, from_date, to_date, recommended_hours } = this.state;
        if (nextProps.milestones.length) {

            let milestones_items = nextProps.milestones;
            let item = milestones_items[milestones_items.length - 1];

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
        if (name === "isPhotoevidence") {
            if (prop !== state) {
                this.setState({ ...this.state, [name]: prop });
            }
        } else {
            if (prop?.length !== state?.length) {
                this.setState({ ...this.state, [name]: prop });
            }
        }

    }

    componentDidMount() {
        const { updateMileStoneIndex, newMileStoneScreen, milestones } = this.props;
        let milestone_index = !milestones?.length ? milestones?.length : 0;
        newMileStoneScreen(milestone_index);
        updateMileStoneIndex(null);
    }

    handleChange = (name: string, value: any) => {

        let error_clone: any = this.state.errors;

        if (name === "milestone_name") {
            value = (value).trimLeft().replace(/[^a-zA-Z|0-9 ]/g, "")
        }

        if (name === "recommended_hours") {
            value = (value).trimLeft();
        }

        if (['milestone_name', 'from_date', 'recommended_hours'].includes(name)) {
            error_clone[name] = this.isInvalid(name, value)
        }

        this.setState({
            ...this.state,
            [name]: value,
            errors: error_clone
        }, () => {
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

    checkHoursVal = (value: any, lable: any, name: any) => {
        if (value?.length) {
            if (value.match(pattern) !== null) {
                return '';
            } else {
                return 'Please enter a valid pattern like : 04:03'
            }
        }
        return `${label[name]} is required.`
    }

    isInvalid = (name: string, value: string) => {
        switch (name) {
            case 'milestone_name':
                return !value.length ? `${label[name]} is required.` : value.length > 50 ? 'Maximum 50 characters are allowed.' : '';
            case 'from_date':
                return !value.length ? `${label[name]} is required.` : '';
            case 'recommended_hours':
                return this.checkHoursVal(value, label, name);
        }
    }


    checkErrors = (isTrue?: boolean) => {
        const { milestones } = this.props;
        let milestone_index = milestones.length ? milestones.length - 1 : 0;
        let from_date = milestones[milestone_index]?.from_date || '';
        let { milestone_name, recommended_hours, errors: { pattern_error } } = this.state;
        if (milestone_name?.length) {
            let errorItems: any = {};
            let error_1 = this.isInvalid('milestone_name', milestone_name);
            let error_2 = this.isInvalid('from_date', from_date);
            let error_3 = this.isInvalid('recommended_hours', recommended_hours);

            if (milestone_name?.length) {
                errorItems['milestone_name'] = error_1;
            }


            if (recommended_hours?.length && error_3?.length) {
                errorItems['recommended_hours'] = error_3;
            }

            if (JSON.stringify(this.state.errors) !== JSON.stringify(errorItems)) {
                this.setState({ errors: errorItems })
            }

            // if (recommended_hours?.length && error_3 && !pattern_error?.length) {
            // if (!error_1?.length && !error_3?.length && !pattern_error?.length) {
            if (!error_1?.length && !error_2?.length && !error_3?.length && !pattern_error?.length) {
                return false;
            }
        }
        return true;
    }

    setItems = (is_remove?: boolean) => {
        const { milestones, handleStepMileStone, newMileStoneScreen, removeMilestoneByIndex } = this.props;
        let { milestone_name, isPhotoevidence, recommended_hours, errors } = this.state;
        let milestone_index = milestones.length ? milestones.length - 1 : 0;

        if (is_remove) {
            removeMilestoneByIndex(milestone_index);
            return
        } else {
            handleStepMileStone({
                "milestone_name": milestone_name,
                "isPhotoevidence": isPhotoevidence,
                "from_date": milestones[milestone_index]?.from_date || '',
                "to_date": milestones[milestone_index]?.to_date || '',
                "recommended_hours": recommended_hours
            }, milestone_index);
        }
    }

    render() {
        const { newMileStoneScreen, handleStepForward, handleStepBack, milestones } = this.props;
        let { milestone_name, isPhotoevidence, recommended_hours, errors, isToggleOpen } = this.state;
        let milestone_index = milestones.length ? milestones.length - 1 : 0;

        let from_date_format = '';
        let to_date_format = '';
        if (milestones.length) {
            let date_from_moment = milestones[milestones.length - 1].from_date;
            let date_to_moment = milestones[milestones.length - 1].to_date;
            if (date_from_moment?.length) {
                from_date_format = date_from_moment //moment(date_from_moment, 'MM-DD-YYYY').format('MMM DD');
            }

            if (date_to_moment?.length) {
                to_date_format = date_to_moment //moment(date_to_moment, 'MM-DD-YYYY').format('MMM DD');
            }
        }
        console.log({props:this.props})
        let check_errors = this.checkErrors();
        return (
            <div className="app_wrapper">
                <div className="section_wrapper">
                    <div className="custom_container">
                        <Dialog
                            open={isToggleOpen}
                            // onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                {'If you click the back arrow, you lose the data, do you want to save it?'}
                                {/* {"if you tab the back arrow, you lose the `draft`."} */}
                                {/* <br />
                                {'Can we save it ?'} */}
                                {/* {"Unsaved data will be lost. Do you want to continue?"} */}
                            </DialogTitle>
                            <DialogActions>
                                <Button
                                    onClick={() => { this.toggleOpen() }}
                                    color="primary">
                                    {'Yes'}
                                </Button>
                                <Button
                                    onClick={() => {
                                        if (check_errors) {
                                            this.setState(defaultStates, () => {
                                                this.setItems(true);
                                                handleStepBack();
                                            });
                                        }
                                    }}
                                    color="primary" autoFocus>
                                    {'No'}
                                </Button>
                            </DialogActions>
                        </Dialog>

                        <div className="form_field">
                            <div className="flex_row">
                                <div className="flex_col_sm_5">
                                    <div className="relate">
                                        <button
                                            className="back"
                                            onClick={() => {
                                                if (check_errors) {
                                                    if (milestone_name?.length || isPhotoevidence == true || recommended_hours?.length || from_date_format?.length) {
                                                        // this.setItems(true);
                                                        this.toggleOpen()
                                                    } else {
                                                        // this.setItems(true);
                                                        handleStepBack();
                                                    }
                                                } else {
                                                    if (milestone_name?.length || isPhotoevidence == true || recommended_hours?.length || from_date_format?.length) {
                                                        this.toggleOpen()
                                                    } else {
                                                        handleStepBack()
                                                    }
                                                }
                                            }}>
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
                                    <label className="form_label">
                                        {'Milestone Name'}
                                    </label>
                                    <div className="text_field">
                                        <input
                                            type="text"
                                            placeholder="Enter Milestone Name"
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
                                                {console.log({from_date_format,to_date_format})}
                                            {renderTimeWithCustomFormat(
                                                from_date_format,
                                                to_date_format,
                                                'MM-DD-YYYY',
                                                ['MMM DD', 'MMM DD YYYY']
                                            )}
                                            {/* {!to_date_format.length && from_date_format.length
                                                ? `${from_date_format}` : to_date_format.length
                                                    ? `${from_date_format} - ${to_date_format}`
                                                    : 'Choose'} */}
                                        </button>
                                    </div>
                                </div>
                                <div className="form_field">
                                    <label className="form_label">Recommended Hours</label>
                                    <div className="text_field">
                                        <input
                                            onChange={(e) => {
                                                this.setState({ recommended_hours: (e.target.value).trimLeft() }, () => {
                                                    this.setItems();
                                                    let rh_value = this.state.recommended_hours;
                                                    let error_item = this.state.errors;
                                                    // "^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$";

                                                    if (!rh_value?.length || rh_value.match(pattern) !== null) {
                                                        error_item['pattern_error'] = '';
                                                    } else {
                                                        error_item['pattern_error'] = 'Please enter a valid pattern like : 04:03';
                                                    }
                                                    this.setState({ errors: error_item });
                                                });
                                            }}
                                            autoComplete='off'
                                            value={recommended_hours}
                                            type="text"
                                            placeholder="Enter Recommended Hours"
                                            name="recommended_hours" />
                                    </div>
                                    <span className="error_msg">{errors.recommended_hours}</span>
                                    <span className="error_msg">{errors.pattern_error}</span>
                                </div>

                                <div className="form_field">
                                    <button
                                        onClick={this.addAnotherMilestone}
                                        className={`fill_grey_btn full_btn btn-effect ${check_errors ? 'disable_btn' : ''}`}>
                                        {'Add milestone'}
                                    </button>
                                </div>
                                <div className="form_field">
                                    <button
                                        onClick={() => {
                                            // newMileStoneScreen(milestone_index + 1);
                                            handleStepForward(6)
                                        }}
                                        className={`fill_btn full_btn btn-effect ${check_errors ? 'disable_btn' : ''}`}>
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