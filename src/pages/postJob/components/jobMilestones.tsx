import React, { useEffect, useState } from 'react';
// @ts-ignore
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { callMilestones, profileTemplateList } from '../../../redux/jobs/actions';
import moment from 'moment';
import { setShowToast } from '../../../redux/common/actions';

import milestonesPlaceholder from '../../../assets/images/Job milestones-preview.png';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// please arrange milestone date wise.
// milestone start date should be doffent from another can not be.
interface Proptypes {
    data: any;
    milestones: any;
    editMileStone: any;
    editDetailPage: any;
    editMilestoneTiming: any;
    stepCompleted: Boolean;
    newMileStoneScreen: (data: any) => void;
    handleStepComplete: (data: any) => void;
    handleStepJustUpdate: (data: any, goto?: any) => void;
    handleStepForward: (data: any, index?: number) => void;
    handleStepBack: () => void;
    updateMileStoneIndex: (data: any) => void;
    handleCombineMileStones: (data: any) => void;
    updateMileStoneTimings: (data: any) => void;
    removeMilestoneByIndex: (data: any) => void;
}

const JobMilestones = ({ data, stepCompleted, newMileStoneScreen, editDetailPage, editMileStone, editMilestoneTiming, handleStepJustUpdate, handleCombineMileStones, removeMilestoneByIndex, handleStepForward, updateMileStoneIndex, updateMileStoneTimings, milestones, handleStepComplete, handleStepBack }: Proptypes) => {
    const [localMilestones, setLocalMilestones] = useState<Array<any>>([]);
    const [editItem, setEditItems] = useState<{ [index: string]: any }>({});
    const [open, setOpen] = React.useState(false);
    const [deleteItem, setDeleteItem] = React.useState(null);
    const [sortedItems, setSortedItems] = React.useState([]);

    const handleClickOpen = (id: any) => {
        setOpen(true)
        setDeleteItem(id);
    };
    const handleClose = () => {
        setOpen(false)
        setDeleteItem(null);
    };

    const handleYes = () => {
        removeMilestoneByIndex(deleteItem);
        setOpen(false);
        setDeleteItem(null);
    }

    useEffect(() => {
        if (!localMilestones?.length !== milestones?.length) {
            let filter_milestones = milestones.filter((item: any) => Object.keys(item).length && item);
            setLocalMilestones(filter_milestones); // set milestoner here!
            updateMileStoneIndex(null);
            updateMileStoneTimings(null);
        }
    }, [milestones, removeMilestoneByIndex]);

    useEffect(() => {
        console.log({ localMilestones }, '---->')
    }, [localMilestones])

    const reorder = (list: Array<any>, startIndex: number, endIndex: number) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const checkIfValidDates = (item: any) => {
        let isfilter = localMilestones.filter((item_: any) => {
            if (item_.hasOwnProperty('from_date')) {
                if (item_?.from_date !== "Invalid date" || !item_?.from_date?.length) {
                    return item_;
                }
            }
        });
        if (!isfilter?.length) {
            return true;
        } else {
            const newarr: any = isfilter.slice().sort((a, b) => {
                return moment(a.from_date).diff(b.from_date);
            });
            let filteredItem: any = item.filter((item_reorder: any) => {
                if (item_reorder.hasOwnProperty('from_date')) {
                    if (item_reorder?.from_date !== "Invalid date" || !item_reorder?.from_date?.length) {
                        return item_reorder;
                    }
                }
            });
            setSortedItems(newarr);
            return JSON.stringify(newarr) === JSON.stringify(filteredItem);
        }
    }

    const checkIfDatesValid = () => {
        let start_selection: any = moment(data?.from_date).format('MM-DD-YYYY');
        let end_selection: any = null;
        if (moment(data?.to_date).isValid()) {
            if (!moment(data?.to_date).isSame(data?.from_date)) {
                end_selection = moment(data?.to_date).format('MM-DD-YYYY');
            }
        }

        let item_find: any = false;
        let filteredItem = localMilestones.filter((item: any) => {
            if (item.hasOwnProperty('from_date')) {
                if (!item?.from_date?.length || item?.from_date !== "Invalid date") {
                    return item;
                }
            }
        });

        if (filteredItem?.length) {
            filteredItem.forEach((item_date: any) => {
                let start: any = moment(item_date.from_date).isValid() ? item_date.from_date : null;
                let end: any = moment(item_date.to_date).isValid() ? item_date.to_date : null;

                if (start && end) {
                    if (start_selection && end_selection) {
                        if (moment(start_selection, 'MM-DD-YYYY').isAfter(moment(start, 'MM-DD-YYYY')) || moment(end_selection, 'MM-DD-YYYY').isBefore(moment(end, 'MM-DD-YYYY'))) {
                            item_find = true
                        }
                    }
                }

                if (start && !end) {
                    if (moment(start_selection, 'MM-DD-YYYY').isAfter(moment(start, 'MM-DD-YYYY'))) {
                        item_find = true; // true;
                    }
                }

                if (start_selection && end_selection && !end) {
                    if (moment(start, 'MM-DD-YYYY').isSameOrAfter(moment(start_selection, 'MM-DD-YYYY')) && moment(start, 'MM-DD-YYYY').isSameOrBefore(moment(end_selection, 'MM-DD-YYYY'))) {
                        item_find = false;
                    } else {
                        item_find = true
                    }
                }
            });
        }

        if (item_find) {
            setShowToast(true, 'Please check the milestone dates.');
            return item_find;
        }

        return item_find;
    }

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        // dropped outside the list
        if (!destination) {
            return;
        }

        // if (source.droppableId === destination.droppableId) {
        const reOrderedMilestones = reorder(
            localMilestones,
            source.index,
            destination.index
        );
        setLocalMilestones(reOrderedMilestones);
        checkIfDatesValid();
        checkIfValidDates(reOrderedMilestones);
    };

    const checkOnClick = (e: any, index: any) => {
        let edit_item_clone: any = editItem;
        edit_item_clone[index] = e.target.checked;
        setEditItems((prev) => ({ ...prev, ...edit_item_clone }));
    }


    // const renderTimeItem = ({ from_date, to_date }: any) => {
    //     console.log({ from_date, to_date })
    //     if (from_date?.length && from_date !== 'Invalid date' && (!to_date?.length || to_date !== 'Invalid date')) {
    //         return `${moment(from_date, 'MM-DD-YYYY').format('MMM DD')}`
    //     }

    //     if (from_date?.length && from_date !== 'Invalid date' && to_date?.length && to_date !== 'Invalid date') {
    //         return `${moment(from_date, 'MM-DD-YYYY').format('MMM DD')}-${moment(to_date, 'MM-DD-YYYY').format('DD')}`
    //     }
    // }

    const renderTimeItem = ({ fromDate, toDate }: any) => {

        const default_format = 'MM-DD-YYYY';
        if (moment(fromDate, default_format).isValid() && !moment(toDate, default_format).isValid()) {
            return `${moment(fromDate, default_format).format('DD MMM')}`
        }

        if (moment(fromDate, default_format).isValid() && moment(toDate, default_format).isValid()) {
            let yearEnd = moment().endOf("year").toISOString();
            let monthEnd = moment(fromDate, default_format).endOf("month").toISOString();

            let item: any = moment(toDate, default_format).diff(moment(fromDate, default_format), 'months', true);
            let item_year: any = moment(toDate, default_format).diff(moment(fromDate, default_format), 'years', true);

            let monthDiff = parseInt(item.toString());
            let yearDiff = parseInt(item_year.toString());

            if (yearDiff > 0 || moment(toDate, default_format).isAfter(yearEnd) || moment(toDate, default_format).isAfter(yearEnd)) {
                return `${moment(fromDate, default_format).format('DD MMM YY')} - ${moment(toDate, default_format).format('DD MMM YY')}`
            }
            if (monthDiff > 0 || moment(toDate, default_format).isAfter(monthEnd)) {
                return `${moment(fromDate, default_format).format('DD MMM')} - ${moment(toDate, default_format).format('DD MMM')}`
            }
            return `${moment(fromDate, default_format).format('DD MMM')} - ${moment(toDate, default_format).format('DD')}`
        }
    }

    return (
        <div className="app_wrapper">
            <div className="section_wrapper">
                <div className="custom_container">
                    <div>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                {"Are you sure you want to delete the milestone ?"}
                            </DialogTitle>
                            <DialogActions>
                                <Button onClick={handleYes} color="primary" autoFocus>
                                    {'Yes'}
                                </Button>
                                <Button onClick={handleClose} color="primary">
                                    {'No'}
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>


                    <div className="form_field">
                        <div className="flex_row f_reverse">
                            <div className="flex_col_sm_7">
                                {editDetailPage?.currentScreen ? (
                                    <div className="relate">
                                        <button className="back" onClick={() => { handleStepForward(14) }}></button>
                                        <span className="title">Job milestones</span>
                                    </div>
                                ) : (
                                    <div className="relate">
                                        <button className="back" onClick={handleStepBack}></button>
                                        <span className="title">Job milestones</span>
                                    </div>
                                )}
                                <p className="commn_para">
                                    {'Put the milestones in so you can be notified when the tradersperson completes them '}
                                </p>
                            </div>
                            {localMilestones?.length ? (
                                <div
                                    onClick={() => {
                                        let checkIfItem: boolean = checkIfDatesValid();
                                        if (!checkIfItem) {
                                            let check: boolean = checkIfValidDates(localMilestones);
                                            if (check) {
                                                handleCombineMileStones(localMilestones);
                                                handleStepForward(10)
                                            } else {
                                                setShowToast(true, "Please arrange milestonea date wise.")
                                            }
                                        }
                                    }}
                                    className="flex_col_sm_5 text-right">
                                    <span className="link">Save as template</span>
                                </div>
                            ) : null}
                        </div>
                    </div>
                    <div className="flex_row">
                        <div className="flex_col_sm_5">
                            <DragDropContext onDragEnd={onDragEnd}>
                                <Droppable droppableId="milestones">
                                    {(provided, snapshot) => (
                                        <ul ref={provided.innerRef}
                                            className={`milestones${snapshot.isDraggingOver ? ' dragging-over' : ''}`}>
                                            {localMilestones?.length > 0 &&
                                                localMilestones.map(({
                                                    milestone_name,
                                                    isPhotoevidence,
                                                    recommended_hours,
                                                    from_date,
                                                    to_date
                                                }: {
                                                    milestone_name: string,
                                                    isPhotoevidence: boolean,
                                                    from_date: string,
                                                    to_date: string,
                                                    recommended_hours: any
                                                }, index) => (
                                                    <Draggable
                                                        key={`${index}-${milestone_name}`}
                                                        draggableId={`${milestone_name}-${index}`}
                                                        index={index}
                                                    >
                                                        {(provided: any, snapshot: any) => (
                                                            <li
                                                                key={index}
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                style={{
                                                                    ...provided.draggableProps.style,
                                                                }}>
                                                                {editItem[index] ? (
                                                                    <div className="edit_delete">
                                                                        <span
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                handleStepForward(15);
                                                                                updateMileStoneIndex(index);
                                                                            }}
                                                                            className="edit">
                                                                        </span>
                                                                        <span
                                                                            onClick={(e) => {
                                                                                e.preventDefault();
                                                                                handleClickOpen(index);
                                                                                // removeMilestoneByIndex(index);

                                                                                // setEditItems({}); // too old comment
                                                                            }}
                                                                            className="delete"></span>
                                                                    </div>
                                                                ) : ''}
                                                                <div className="checkbox_wrap agree_check">
                                                                    <input
                                                                        checked={editItem[index]}
                                                                        onChange={(e: any) => { checkOnClick(e, index) }}
                                                                        className="filter-type filled-in"
                                                                        type="checkbox"
                                                                        id={`milestone${index}`} />
                                                                    <label htmlFor={`milestone${index}`}>{`${index + 1}. ${milestone_name}`}</label>
                                                                    <div className="info">
                                                                        {isPhotoevidence ?
                                                                            <span>{'Photo evidence required'}</span>
                                                                            : <span></span>}
                                                                        <span>
                                                                            {renderTimeItem({
                                                                                fromDate: from_date,
                                                                                toDate: to_date
                                                                            })}
                                                                        </span>
                                                                        <span>
                                                                            {recommended_hours}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        )}
                                                    </Draggable>
                                                ))}
                                            {provided.placeholder}
                                            {localMilestones?.length === 0 && (
                                                <figure className="placeholder_img">
                                                    <img src={milestonesPlaceholder} alt="milestones-placeholder" />
                                                </figure>
                                            )}
                                        </ul>
                                    )}
                                </Droppable>
                            </DragDropContext>
                            {!localMilestones?.length ? (
                                <React.Fragment>
                                    <div className="form_field">
                                        <button onClick={() => { handleStepForward(9) }} className="fill_btn fill_grey_btn full_btn btn-effect">
                                            {'Use template'}
                                        </button>
                                    </div>
                                    <div className="form_field">
                                        <button className="fill_btn full_btn btn-effect" onClick={() => handleStepComplete({})}>
                                            {'+ Add milestone'}
                                        </button>
                                    </div>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <div className="form_field">
                                        <button className="fill_btn full_btn btn-effect"
                                            onClick={() => {
                                                if (milestones?.length === 1) {
                                                    newMileStoneScreen(1);
                                                } else {
                                                    let item = milestones[milestones?.length - 1];
                                                    if (Object.keys(item).length) {
                                                        if (!item?.milestone_name?.length && !item?.recommended_hours?.length && !item?.date_from?.length) {
                                                            console.log('Already have!')
                                                        } else {
                                                            newMileStoneScreen(milestones?.length);
                                                        }
                                                    }
                                                }
                                                handleStepComplete({})
                                            }}>
                                            {'+ Add milestone'}
                                        </button>
                                    </div>
                                    <div className="form_field">
                                        <button
                                            onClick={() => {
                                                let checkIfItem: boolean = checkIfDatesValid();
                                                if (!checkIfItem) {
                                                    let check: boolean = checkIfValidDates(localMilestones);
                                                    if (check) {
                                                        handleCombineMileStones(localMilestones);
                                                        if (editDetailPage?.currentScreen) {
                                                            handleStepForward(14)
                                                        } else {
                                                            handleStepForward(13)
                                                        }
                                                    } else {
                                                        setShowToast(true, "Please arrange milestonea date wise.")
                                                    }
                                                }
                                            }}
                                            className="fill_btn fill_grey_btn full_btn btn-effect">
                                            {'Continue'}
                                        </button>
                                    </div>
                                </React.Fragment>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobMilestones;
