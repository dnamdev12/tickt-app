import React, { useEffect, useState } from 'react';
// @ts-ignore
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { callMilestones, profileTemplateList } from '../../../redux/postJob/actions';
import moment from 'moment';


interface Proptypes {
    data: any;
    milestones: any;
    stepCompleted: Boolean;
    handleStepComplete: (data: any) => void;
    handleStepForward: (data: any, index?: number) => void;
    handleStepBack: () => void;
    updateMileStoneIndex: (data: number) => void;
}

const JobMilestones = ({ data, stepCompleted, handleStepForward, updateMileStoneIndex, milestones, handleStepComplete, handleStepBack }: Proptypes) => {
    const [localMilestones, setLocalMilestones] = useState<Array<any>>([]);
    const [editItem, setEditItems] = useState({});

    useEffect(() => {
        if (!localMilestones?.length) {
            let filter_milestones = milestones.filter((item: any) => Object.keys(item).length && item);
            console.log({ filter_milestones });
            setLocalMilestones(filter_milestones);
        }
        console.log({ milestones })
    }, [milestones, localMilestones]);

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
            const reOrderedMilestones = reorder(
                milestones,
                source.index,
                destination.index
            );

            setLocalMilestones(reOrderedMilestones);
        }
    };

    return (
        <div className="app_wrapper">

            <div className="section_wrapper">
                <div className="custom_container">
                    <div className="form_field">
                        <div className="flex_row f_reverse">
                            <div className="flex_col_sm_7">
                                <div className="relate">
                                    <button className="back" onClick={handleStepBack}></button>
                                    <span className="title">Job milestones</span>
                                </div>
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
                                                    key={milestone_name}
                                                    draggableId={milestone_name}
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
                                                            }}
                                                        >
                                                            <div className="edit_delete">
                                                                <span
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleStepForward(15);
                                                                        updateMileStoneIndex(index);
                                                                        console.log({ index, });
                                                                    }}
                                                                    className="edit">
                                                                </span>
                                                                <span className="delete"></span>
                                                            </div>
                                                            <div className="checkbox_wrap agree_check">
                                                                <input
                                                                    // checked={isPhotoevidence}
                                                                    className="filter-type filled-in"
                                                                    type="checkbox"
                                                                    id={`milestone${index}`} />
                                                                <label htmlFor={`milestone${index}`}>{milestone_name}</label>
                                                                <div className="info">
                                                                    <span>Photo evidence required</span>
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
                                        <button className="fill_btn full_btn" onClick={() => handleStepComplete({})}>
                                            {'+ Add milestone'}
                                        </button>
                                    </div>
                                    <div className="form_field">
                                        <button
                                            onClick={() => { handleStepForward(13) }}
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

            {/* Job detail */}
            {/* <div className="section_wrapper top_wrap">
                <div className="custom_container">
                    <div className="vid_img_wrapper">
                        <div className="flex_row">
                            <div className="flex_col_sm_8 relative">
                                <span className="back"></span>
                            </div>
                        </div>
                        <div className="flex_row">
                            <div className="flex_col_sm_8">
                                <figure className="vid_img_thumb">
                                    <img src={thumb} alt="image" />
                                </figure>
                            </div>
                            <div className="flex_col_sm_4 relative">
                                <div className="detail_card">
                                    <span className="title">Wire up circuit box</span>
                                    <div className="job_info">
                                        <ul>
                                            <li className="icon clock">32 minutes ago</li>
                                            <li className="icon dollar">$250 p/h</li>
                                            <li className="icon location">Melbourne CBD</li>
                                            <li className="icon calendar">4 days </li>
                                        </ul>
                                    </div>
                                    <button className="fill_btn full_btn">Post job</button>
                                </div>
                            </div>
                        </div>
                        <div className="flex_row">
                            <div className="flex_col_sm_8">
                                <div className="description">
                                    <span className="sub_title">Details</span>
                                    <p className="commn_para">Sparky wanted for a quick job to hook up two floodlights on the exterior of an apartment building to the main electrical grid. Current sparky away due to illness so need a quick replacement, walls are all prepped and just need lights wired. Can also provide free lunch on site and a bit of witty banter on request. Sparky wanted for a quick job to hook up two floodlights on the exterior of an apartment building to the main electrical grid. Current sparky away due to illness so need a quick replacement, walls are all prepped and just need lights wired. Can also provide free lunch on site and a bit of witty banter on request.</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex_row">
                            <div className="flex_col_sm_4">
                                <span className="sub_title">Job milestones</span>
                                <ul className="job_milestone">
                                    <li>
                                        <span>1. Arrival on site</span>
                                        <span>May 23 - 25 </span>
                                    </li>
                                    <li>
                                        <span>2. Arrival on site</span>
                                        <span>May 23 - 25 </span>
                                    </li>
                                    <li>
                                        <span>3. Arrival on site</span>
                                        <span>May 23 - 25 </span>
                                    </li>

                                </ul>
                                <button className="fill_grey_btn ques_btn">
                                    <img src={question} alt="question" />
                                0 questions
                                </button>
                            </div>
                            <div className="flex_col_sm_8">
                                <span className="sub_title">Specialisations needed</span>
                                <div className="tags_wrap">
                                    <ul>
                                        <li>Circuit Board Wiring</li>
                                        <li>Circuit Board Wiring</li>
                                        <li>Circuit Board Wiring</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="section_wrapper">
                            <span className="sub_title">Posted by</span>
                            <div className="flex_row">
                                <div className="flex_col_sm_3">
                                    <div className="tradie_card posted_by view_more ">
                                        <a href="javascript:void(0)" className="chat circle"></a>
                                        <div className="user_wrap">
                                            <figure className="u_img">
                                                <img src={dummy} alt="traide-img" />
                                            </figure>
                                            <div className="details">
                                                <span className="name">John</span>
                                                <span className="prof">Project Manager</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex_col_sm_3">
                                    <div className="tradie_card posted_by view_more ">
                                        <a href="javascript:void(0)" className="chat circle"></a>
                                        <div className="user_wrap">
                                            <figure className="u_img">
                                                <img src={dummy} alt="traide-img" />
                                            </figure>
                                            <div className="details">
                                                <span className="name">John</span>
                                                <span className="prof">Project Manager</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            {/* Job detail close*/}

        </div>
    )
}

export default JobMilestones;
