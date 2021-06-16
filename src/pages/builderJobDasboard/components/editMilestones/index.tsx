import React, { useState, useEffect } from 'react'
// @ts-ignore
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { renderTime } from '../../../../utils/common';
import milestonesPlaceholder from '../../../../assets/images/Job milestones-preview.png';
import moment from 'moment';
import { setShowToast } from '../../../../redux/common/actions';

import AddEditMile from './addEditMile';

const EditMilestone = (props: any) => {
    const { item, item: { jobId, jobName }, details: { milestones }, history } = props;

    const [stateData, setStateData] = useState<any>([]);
    const [editItem, setEditItems] = useState<{ [index: string]: any }>({});
    const [open, setOpen] = React.useState(false);
    const [deleteItem, setDeleteItem] = React.useState(null);

    const [itemData, setItemData] = useState({ add: false, edit: false, editId: '' });

    const [sortedItems, setSortedItems] = React.useState([]);

    useEffect(() => {
        if (!stateData?.length) {
            setStateData(milestones);
        }
    }, [props])

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

        // if (source.droppableId === destination.droppableId) {
        const reOrderItems = reorder(
            stateData,
            source.index,
            destination.index
        );
        setStateData(reOrderItems)
    };

    const checkIfValidDates = (item: any) => {
        let isfilter = stateData.filter((item_: any) => {
            if (item_.hasOwnProperty('from_date')) {
                if (item_?.from_date !== "Invalid date" || !item_?.from_date?.length) {
                    return item_;
                }
            }
        });
        if (!isfilter?.length) {
            return true;
        } else {
            const newarr: any = isfilter.slice().sort((a: any, b: any) => {
                return moment(a.from_date, 'MM-DD-YYYY').diff(moment(b.from_date, 'MM-DD-YYYY'));
            });
            let filteredItem: any = item.filter((item_reorder: any) => {
                if (item_reorder.hasOwnProperty('from_date')) {
                    if (item_reorder?.from_date !== "Invalid date" || !item_reorder?.from_date?.length) {
                        return item_reorder;
                    }
                }
            });
            setSortedItems(newarr);
            console.log({
                newarr,
                filteredItem
            })
            return JSON.stringify(newarr) === JSON.stringify(filteredItem);
        }
    }


    const checkIfDatesValid = () => {
        let data = item;
        let start_selection: any = moment(data?.from_date, 'YYYY-MM-DD').format('MM-DD-YYYY');
        let end_selection: any = null;
        if (moment(data?.to_date, 'YYYY-MM-DD').isValid()) {
            if (!moment(data?.to_date, 'YYYY-MM-DD').isSame(moment(data?.from_date, 'YYYY-MM-DD'))) {
                end_selection = moment(data?.to_date, 'YYYY-MM-DD').format('MM-DD-YYYY');
            }
        }

        let item_find: any = false;
        let filteredItem = stateData.filter((item: any) => {
            if (item.hasOwnProperty('from_date')) {
                if (!item?.from_date?.length || item?.from_date !== "Invalid date") {
                    return item;
                }
            }
        });

        if (filteredItem?.length) {
            filteredItem.forEach((item_date: any) => {
                let start: any = moment(item_date.from_date, 'MM-DD-YYYY').isValid() ? item_date.from_date : null;
                let end: any = moment(item_date.to_date, 'MM-DD-YYYY').isValid() ? item_date.to_date : null;

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

    const checkOnClick = (e: any, index: any) => {
        let edit_item_clone: any = editItem;
        edit_item_clone[index] = e.target.checked;
        setEditItems((prev) => ({ ...prev, ...edit_item_clone }));
    }
    const resetItems = () => {
        setItemData({ add: false, edit: false, editId: '' })
    }

    if (itemData?.add || itemData?.edit) {
        return <AddEditMile resetItems={resetItems}/>
    }


    return (
        <React.Fragment>
            <div className="flex_row">
                <div className="flex_col_sm_8">
                    <div className="relate">
                        <button
                            onClick={() => { props.backTab('edit') }}
                            className="back"></button>
                        <span className="xs_sub_title">
                            {jobName || ''}
                        </span>
                    </div>
                    <span className="sub_title">
                        {'Change Request'}
                    </span>
                    <p className="commn_para">
                        {'You can  add/remove/change a milestones here. The changes will be sent to the tradesperson to accept befiore being implemented'}
                    </p>
                </div>
            </div>

            <div className="flex_row">
                <div className="flex_col_sm_7">
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="milestones">
                            {(provided, snapshot) => (
                                <ul ref={provided.innerRef}
                                    className={`milestones${snapshot.isDraggingOver ? ' dragging-over' : ''}`}>
                                    {stateData?.length > 0 &&
                                        stateData.map(({
                                            milestoneName,
                                            isPhotoevidence,
                                            recommendedHours,
                                            fromDate,
                                            toDate
                                        }: {
                                            milestoneName: string,
                                            isPhotoevidence: boolean,
                                            fromDate: string,
                                            toDate: string,
                                            recommendedHours: any
                                        }, index: any) => (
                                            <Draggable
                                                key={`${index}-${milestoneName}`}
                                                draggableId={`${milestoneName}-${index}`}
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
                                                                        // e.stopPropagation();
                                                                        // handleStepForward(15);
                                                                        // updateMileStoneIndex(index);
                                                                    }}
                                                                    className="edit">
                                                                </span>
                                                                <span
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        // handleClickOpen(index);
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
                                                            <label htmlFor={`milestone${index}`}>{`${index + 1}. ${milestoneName}`}</label>
                                                            <div className="info">
                                                                {isPhotoevidence ?
                                                                    <span>{'Photo evidence required'}</span>
                                                                    : <span></span>}
                                                                <span>
                                                                    {renderTime(
                                                                        fromDate,
                                                                        toDate
                                                                    )}
                                                                </span>
                                                                <span>
                                                                    {recommendedHours}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </li>
                                                )}
                                            </Draggable>
                                        ))}
                                    {provided.placeholder}
                                    {stateData?.length === 0 && (
                                        <figure className="placeholder_img">
                                            <img
                                                src={milestonesPlaceholder}
                                                alt="milestones-placeholder"
                                            />
                                        </figure>
                                    )}
                                </ul>
                            )}
                        </Droppable>
                    </DragDropContext>
                    {!stateData?.length ? (
                        <>
                            <div className="form_field">
                                <button
                                    className="fill_btn full_btn btn-effect"
                                    onClick={() => {
                                        setItemData({ add: true, editId: '', edit: false });
                                        // handleStepComplete({})
                                    }}>
                                    {'+ Add milestone'}
                                </button>
                            </div>
                        </>
                    ) : (
                        <React.Fragment>
                            <div className="form_field">
                                <button className="fill_btn full_btn btn-effect"
                                    onClick={() => {
                                        setItemData({ add: true, editId: '', edit: false });
                                        // handleStepComplete({})
                                    }}>
                                    {'+ Add milestone'}
                                </button>
                            </div>

                            <div className="form_field">
                                <button
                                    onClick={() => {
                                        let checkIfItem: boolean = checkIfDatesValid();
                                        if (!checkIfItem) {
                                            let check: boolean = checkIfValidDates(stateData);
                                            if (check) {
                                                // handleCombineMileStones(stateData);
                                                // if (editDetailPage?.currentScreen) {
                                                //     handleStepForward(14)
                                                // } else {
                                                //     handleStepForward(13)
                                                // }
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
        </React.Fragment >

    )
}

export default EditMilestone;