import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import colorLogo from '../../../assets/images/ic-logo-yellow.png';
import menu from '../../../assets/images/menu-line-white.svg';
import bell from '../../../assets/images/ic-notification.png';
import dummy from '../../../assets/images/u_placeholder.jpg';
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

        </div>
    )
}

export default JobMilestones
