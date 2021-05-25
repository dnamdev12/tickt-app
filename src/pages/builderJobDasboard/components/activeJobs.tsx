import React, { ReactElement } from 'react'
import dummy from '../../../assets/images/u_placeholder.jpg';
import approved from '../../../assets/images/approved.png';

interface Active {
    amount: any,
    durations: any,
    jobId: any,
    jobName: any,
    milestoneNumber: any,
    specializationId: any,
    specializationName: any,
    status: any,
    timeLeft: any,
    totalmem: any,
    totalMilestones: any,
    tradieListData: any,
    tradeName: any,
    tradieId: any,
    tradieImage: any,
}

export default function ActiveJobs({ dataItems, jobType, }: any): ReactElement {
    let data_item: any = dataItems;
    let listData: any = data_item[`${jobType}Jobs`][`${jobType}`];
    return (
        <React.Fragment>
            <span className="sub_title">{jobType.charAt(0).toUpperCase() + jobType.slice(1)} Jobs</span>
            <div className="flex_row tradies_row">
                {listData?.length ?
                    listData.map(({
                        amount,
                        durations,
                        jobId,
                        jobName,
                        milestoneNumber,
                        specializationId,
                        specializationName,
                        status,
                        timeLeft,
                        totalmem,
                        totalMilestones,
                        tradieListData,
                        tradeName,
                        tradieId,
                        tradieImage,
                    }: Active) => (
                        <div className="flex_col_sm_6">
                            <div className="tradie_card" data-aos="fade-in" data-aos-delay="250" data-aos-duration="1000">
                                <span className="more_detail circle">
                                </span>
                                <div className="user_wrap">
                                    <figure className="u_img">
                                        <img src={dummy} alt="traide-img" />
                                    </figure>
                                    <div className="details">
                                        <span className="name">{tradeName}</span>
                                        <p className="commn_para">{jobName}</p>
                                    </div>
                                </div>
                                <div className="job_info">
                                    <ul>
                                        <li className="icon clock">{`${timeLeft} minutes ago`}</li>
                                        <li className="icon dollar">{amount}</li>
                                        <li className="icon location line-1">{''}</li>
                                        <li className="icon calendar">{`${durations} days`}</li>
                                    </ul>
                                </div>
                                <div className="job_progress_wrap" id="scroll-progress-bar">
                                    <div className="progress_wrapper">
                                        <span className="completed-digit" id="digit-progress">
                                            <b>{`Job Milestones ${milestoneNumber} `}</b>{`of ${totalMilestones}`}
                                        </span>
                                        <span className="approval_info">
                                            {status === "Approved" && <img src={approved} alt="icon" />}
                                            {status}
                                            {/* {'Approved'} */} {/* Awating */}
                                            {/* <img src={waiting} alt="icon" /> */}
                                            {/* Need approval */}
                                        </span>
                                        <span className="progress_bar">
                                            <input
                                                className="done_progress"
                                                id="progress-bar"
                                                type="range"
                                                min="0"
                                                value={milestoneNumber / totalMilestones * 100}
                                            />
                                        </span>
                                    </div>
                                    <button className="fill_grey_btn full_btn">
                                        {'Applications'}
                                        {/* <img src={rateStar} alt="rating-star" />
                                        {'Rate this job'} */}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )) : null}
            </div>
        </React.Fragment>
    )
}
