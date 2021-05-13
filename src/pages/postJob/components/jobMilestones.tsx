import React, { useEffect, useState } from 'react';
// @ts-ignore
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { callMilestones, profileTemplateList } from '../../../redux/jobs/actions';
import moment from 'moment';
import { setShowToast } from '../../../redux/common/actions';

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
            console.log('Inside------------>')
            let filter_milestones = milestones.filter((item: any) => Object.keys(item).length && item);
            setLocalMilestones(filter_milestones); // set milestoner here!
            updateMileStoneIndex(null);
            updateMileStoneTimings(null);
        }
    }, [milestones, removeMilestoneByIndex]);

    const reorder = (list: Array<any>, startIndex: number, endIndex: number) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            let source_item = localMilestones[source.index];
            let destination_item = localMilestones[destination.index];
            let filteredItem = localMilestones.filter((mil: any) => mil.milestone_name !== source_item.milestone_name);

            let checkIsValid: any = true;
            filteredItem.forEach((mile: any) => {
                let validStart = moment(mile.from_date).isValid();

                let validStartInput =  moment(source_item.from_date).isValid();

                if(validStart && validStartInput){
                    console.log({
                        source_item:source_item.from_date,
                        mile:mile.from_date,
                        is:moment(source_item.from_date).isAfter(mile.from_date) 
                    })
                    if(moment(source_item.from_date).isAfter(mile.from_date)){
                        checkIsValid = true;
                    } else {
                        checkIsValid = false;
                    }
                }
            })
            console.log({
                checkIsValid,
                isCheck:moment(source_item.from_date).isBefore(destination_item.from_date)
            })
            if (!checkIsValid) {
                const reOrderedMilestones = reorder(
                    localMilestones,
                    source.index,
                    destination.index
                );
                setLocalMilestones(reOrderedMilestones);
            } else {
                setShowToast(true, "please arrange milestone date wise.")
            }
        }
    };

    const checkOnClick = (e: any, index: any) => {
        let edit_item_clone: any = editItem;
        edit_item_clone[index] = e.target.checked;
        setEditItems((prev) => ({ ...prev, ...edit_item_clone }));
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
                                    onClick={() => { handleStepForward(10) }}
                                    className="flex_col_sm_5 text-right">
                                    <a href="javascript:void(0)" className="link">Save as template</a>
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
                                            {localMilestones.map(({
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
                                                                        {from_date?.length && !to_date?.length ? `${moment(from_date, 'MM-DD-YYYY').format('MMM DD')}`
                                                                            : from_date?.length && to_date?.length ?
                                                                                `${moment(from_date, 'MM-DD-YYYY').format('MMM DD')}-${moment(to_date, 'MM-DD-YYYY').format('DD')}` : ''}
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
                                        </ul>
                                    )}
                                </Droppable>
                            </DragDropContext>
                            {!localMilestones?.length ? (
                                <React.Fragment>
                                    <div className="form_field">
                                        <button onClick={() => { handleStepForward(9) }} className="fill_btn fill_grey_btn full_btn">
                                            {'Use template'}
                                        </button>
                                    </div>
                                    <div className="form_field">
                                        <button className="fill_btn full_btn" onClick={() => handleStepComplete({})}>
                                            {'+ Add milestone'}
                                        </button>
                                    </div>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <div className="form_field">
                                        <button className="fill_btn full_btn"
                                            onClick={() => {
                                                if (milestones?.length === 1) {
                                                    newMileStoneScreen(1);
                                                } else {
                                                    let item = milestones[milestones?.length - 1];
                                                    if (Object.keys(item).length) {
                                                        if (!item?.milestone_name?.length && !item?.recommended_hours?.length && !item?.date_from?.length) {
                                                            console.log({ item })
                                                            console.log('Already have!')
                                                        } else {
                                                            newMileStoneScreen(milestones?.length);
                                                        }
                                                    }
                                                }

                                                console.log({ milestones }, '----')
                                                handleStepComplete({})
                                            }}>
                                            {'+ Add milestone'}
                                        </button>
                                    </div>
                                    <div className="form_field">
                                        <button
                                            onClick={() => {
                                                if (milestones?.length && localMilestones?.length) {
                                                    if (milestones[0]?.milestone_name !== localMilestones[0]?.milestone_name) {
                                                        handleCombineMileStones(localMilestones);
                                                    }
                                                }

                                                if (editDetailPage?.currentScreen) {
                                                    handleStepForward(14)
                                                } else {
                                                    handleStepForward(13)
                                                }
                                            }}
                                            className="fill_btn fill_grey_btn full_btn">
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
