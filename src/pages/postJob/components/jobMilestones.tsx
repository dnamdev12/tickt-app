import React, { useEffect, useState } from 'react';
// @ts-ignore
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { callMilestones, profileTemplateList } from '../../../redux/postJob/actions';
import moment from 'moment';
import { setShowToast } from '../../../redux/common/actions';

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

    useEffect(() => {
        if (!localMilestones?.length !== milestones?.length) {
            let filter_milestones = milestones.filter((item: any) => Object.keys(item).length && item);
            setLocalMilestones(filter_milestones); // set milestoner here!
            updateMileStoneIndex(null);
            updateMileStoneTimings(null);
        }
    }, [milestones, removeMilestoneByIndex, editItem]);

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
            let from = localMilestones[source.index].from_date;
            let end = localMilestones[destination.index].from_date;
            let default_format = 'MM-DD-YYYY';
            let diff = moment(end, default_format).diff(moment(from, default_format), 'days')
            if (diff > 0) {
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
                                                from_date,
                                                to_date
                                            }: {
                                                milestone_name: string,
                                                isPhotoevidence: boolean,
                                                from_date: string,
                                                to_date: string
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
                                                                            removeMilestoneByIndex(index);
                                                                            // setEditItems({});
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
                                                                <label htmlFor={`milestone${index}`}>{milestone_name}</label>
                                                                <div className="info">
                                                                    {isPhotoevidence ?
                                                                        <span>{'Photo evidence required'}</span>
                                                                        : <span></span>}
                                                                    <span>
                                                                        {from_date?.length && !to_date?.length ? `${moment(from_date, 'MM-DD-YYYY').format('MMM DD')}`
                                                                            : from_date?.length && to_date?.length ?
                                                                                `${moment(from_date, 'MM-DD-YYYY').format('MMM DD')}-${moment(to_date, 'MM-DD-YYYY').format('DD')}` : ''}
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
                                                if(milestones?.length === 1){
                                                    newMileStoneScreen(1); 
                                                } else {
                                                    let item = milestones[milestones?.length - 1];
                                                    if(Object.keys(item).length){
                                                        if(!item?.milestone_name?.length && !item?.recommended_hours?.length && !item?.date_from?.length){
                                                            console.log({item})
                                                            console.log('Already have!')
                                                        } else {
                                                            newMileStoneScreen(milestones?.length);
                                                        }
                                                    }
                                                }

                                                console.log({milestones},'----')
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
