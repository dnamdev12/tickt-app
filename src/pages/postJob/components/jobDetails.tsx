import React, { useEffect, useState } from 'react';
import dummy from '../../../assets/images/u_placeholder.jpg';
import thumb from '../../../assets/images/job-posted-bg.jpg';
import question from '../../../assets/images/ic-question.png';

interface Proptypes {
    data: any;
    stepCompleted: Boolean;
    handleStepComplete: (data: any) => void;
    handleStepForward: (data: any) => void;
    handleStepBack: () => void;
}

const JobDetails = ({ data, stepCompleted, handleStepForward, handleStepComplete, handleStepBack }: Proptypes) => {
    return (
        <div className="app_wrapper">
            <div className="section_wrapper">
                <div className="custom_container">
                    <div className="form_field">
                        <div className="flex_row">
                            <div className="section_wrapper top_wrap">
                                <div className="custom_container">
                                    <div className="vid_img_wrapper">
                                        <div className="flex_row">
                                            <div className="flex_col_sm_8 relative">
                                                <button
                                                    onClick={handleStepBack}
                                                    className="back"></button>
                                            </div>
                                        </div>
                                        <div className="flex_row">
                                            <div className="flex_col_sm_8">
                                                <figure className="vid_img_thumb">
                                                    <img src={thumb} alt="" />
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
                                                    <button
                                                        onClick={() => { handleStepForward(12) }}
                                                        className="fill_btn full_btn">Post job</button>
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
                                                    {'0 questions'}
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    // return (
    //     <div className="app_wrapper">
    //         <div className="section_wrapper">
    //             <div className="custom_container">
    //                 <div className="form_field">
    //                     <div className="flex_row">
    //                         <div className="flex_col_sm_5">
    //                             <div className="relate">
    //                                 <button className="back" onClick={handleStepBack}></button>
    //                                 {/* <span className="title">Milestone Templates</span> */}
    //                             </div>
    //                             {/* <p className="commn_para">How mach will you pay for a job</p> */}
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // )
}

export default JobDetails;