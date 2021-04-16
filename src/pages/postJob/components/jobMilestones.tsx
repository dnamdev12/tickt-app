import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import colorLogo from '../../../assets/images/ic-logo-yellow.png';
import menu from '../../../assets/images/menu-line-white.svg';
import bell from '../../../assets/images/ic-notification.png';
import dummy from '../../../assets/images/u_placeholder.jpg';
import thumb from '../../../assets/images/job-posted-bg.jpg';
import question from '../../../assets/images/ic-question.png';

import { callMilestones } from '../../../redux/postJob/actions';

interface Proptypes {
    data: any;
    stepCompleted: Boolean;
    handleStepComplete: (data: any) => void;
    handleStepBack: () => void;
}

const JobMilestones = ({ data, stepCompleted, handleStepComplete, handleStepBack }: Proptypes) => {
    const [milestones, setMilestones] = useState<Array<any>>([]);

    const getMilestones = async () => {
        const { success, milestones } = await callMilestones();

        if (success) {
            setMilestones(milestones);
        } else {
            setMilestones([{ _id: '1', name: 'A' }, { _id: '2', name: 'B' }]);
        }
    }

    useEffect(() => {
        getMilestones();
    }, []);

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

            setMilestones(reOrderedMilestones);
        }
    };

    return (
        <div className="app_wrapper">

            {/* Header */}
            <header id="header">
                <div className="custom_container">
                    <div className="flex_headrow">
                        <div className="brand_wrap">
                            <figure>
                                <img src={colorLogo}
                                    alt="logo-white" />
                            </figure>
                        </div>
                        <ul className="center_nav">
                            <li>
                                <a>Discover</a>
                            </li>
                            <li>
                                <a>Jobs</a>
                            </li>
                            <li>
                                <a className="active">Post</a>
                            </li>
                            <li>
                                <a>Chat</a>
                            </li>
                        </ul>


                        <ul className="side_nav">
                            <li className="mob_nav">
                                <img src={menu} alt="menu" />
                            </li>
                            <div className="profile_notification">
                                <div className="notification_bell">
                                    <figure className="bell">
                                        <span className="badge">4 </span>
                                        <img src={bell} alt="notify" />
                                    </figure>
                                </div>
                                <div className="user_profile">
                                    <figure aria-controls="simple-menu" aria-haspopup="true">
                                        <img src={dummy} alt="profile-img" />
                                    </figure>
                                </div>
                            </div>
                        </ul>
                    </div>

                </div>
            </header>
            {/* Header close */}

            <div className="section_wrapper">
                <div className="custom_container">
                    <div className="form_field">
                        <div className="flex_row f_reverse">
                            <div className="flex_col_sm_5">
                                <div className="relate">
                                    <button className="back" onClick={handleStepBack}></button>
                                    <span className="title">Job milestones</span>
                                </div>
                            </div>
                            <div className="flex_col_sm_7 text-right">
                                <a href="javascript:void(0)" className="link">Save as template</a>
                                </div>
                        </div>
                    </div>
                    <div className="flex_row">
                        <div className="flex_col_sm_5">
                            <DragDropContext onDragEnd={onDragEnd}>
                                <Droppable droppableId="milestones">
                                    {(provided, snapshot) => (
                                        <ul
                                          ref={provided.innerRef}
                                          className={`milestones${snapshot.isDraggingOver ? ' dragging-over' : ''}`}
                                        >
                                            {milestones.map(({ _id, name }: { _id: string, name: string }, index) => (
                                                <Draggable
                                                    key={_id}
                                                    draggableId={_id}
                                                    index={index}
                                                >
                                                    {(provided, snapshot) => (
                                                        <li
                                                          key={_id}
                                                          ref={provided.innerRef}
                                                          {...provided.draggableProps}
                                                          {...provided.dragHandleProps}
                                                          style={{
                                                            ...provided.draggableProps.style,
                                                          }}
                                                        >
                                                            <div className="edit_delete">
                                                                <span className="edit"></span>
                                                                <span className="delete"></span>
                                                            </div>
                                                            <div className="checkbox_wrap agree_check">
                                                                <input className="filter-type filled-in" type="checkbox" id={`milestone${_id}`} />
                                                                <label htmlFor={`milestone${_id}`}>{name}</label>
                                                                <div className="info">
                                                                    <span>Photo evidence required</span>
                                                                    <span>May 24 - 26</span>
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
                            <div className="form_field">
                                <button className="fill_btn fill_grey_btn full_btn">+ Add milestone</button>
                            </div>
                            <div className="form_field">
                                <button className="fill_btn full_btn" onClick={() => handleStepComplete({})}>Continue</button>
                            </div>
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

export default JobMilestones
