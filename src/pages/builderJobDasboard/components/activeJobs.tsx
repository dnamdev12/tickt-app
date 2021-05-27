import React, { ReactElement, useState, useEffect } from 'react'
import dummy from "../../../assets/images/u_placeholder.jpg";
import approved from '../../../assets/images/approved.png';
import MarkMilestones from './markMilestones';
import { withRouter } from 'react-router-dom';
import noDataFound from '../../../assets/images/no-data.png';

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
    locationName: any,
    totalmem: any,
    totalMilestones: any,
    tradieListData: any,
    tradeName: any,
    tradieId: any,
    tradieImage: any,
    tradeImage:any,
    setJobLabel: (item: any) => void
}


const ActiveJobs = ({ setJobLabel, history, dataItems, jobType, isLoading }: any) => {
    let listData: any = dataItems;
    const [selectedIndex, setSelectedIndex] = useState<any>(null);
    const [localState, setLocalState] = useState(false);

    const resetStateLocal = () => {
        setLocalState(false)
    }

    useEffect(() => {
        console.log('here!')
    }, [jobType])

    const redirectToInfo = ({ jobId, tradieId, specializationId, status }: any) => {
        console.log({ jobId, tradieId, specializationId });
        history.push(`/job-detail?jobId=${jobId}&tradeId=${tradieId}&specializationId=${specializationId}&status=${status}`);
    }

    if (localState && selectedIndex !== null) {
        return (
            <MarkMilestones
                resetStateLocal={resetStateLocal}
                selectedIndex={selectedIndex}
                listData={listData}
            />)
    }

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
                        locationName,
                        totalmem,
                        totalMilestones,
                        tradieListData,
                        tradeName,
                        tradieId,
                        tradeImage,
                        tradieImage,
                    }: Active, index: number) => (
                        <div className="flex_col_sm_6">
                            <div className="tradie_card" data-aos="fade-in" data-aos-delay="250" data-aos-duration="1000">
                                <span className="more_detail circle"
                                    onClick={() => {
                                        redirectToInfo({ jobId, tradieId, specializationId, status });
                                    }}>
                                </span>
                                <div className="user_wrap">
                                    <figure className="u_img">
                                        <img src={tradeImage || dummy} alt="traide-img" />
                                    </figure>
                                    <div className="details">
                                        <span className="name">{tradeName}</span>
                                        <p className="commn_para">{jobName}</p>
                                    </div>
                                </div>
                                <div className="job_info">
                                    <ul>
                                        <li className="icon clock">{timeLeft}</li>
                                        <li className="icon dollar">{amount}</li>
                                        <li className="icon location line-1">{locationName}</li>
                                        <li className="icon calendar">{durations}</li>
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
                                    <button
                                        onClick={() => {
                                            setLocalState(true);
                                            setSelectedIndex(index);
                                        }}
                                        className="fill_grey_btn full_btn">
                                        {'Approve'}
                                        {/* <img src={rateStar} alt="rating-star" />
                                        {'Rate this job'} */}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )) : !isLoading && (
                        <div className="no_record">
                            <figure className="no_img">
                                <img src={noDataFound} alt="data not found" />
                            </figure>
                        </div>)}
            </div>
        </React.Fragment>
    )
}


export default withRouter(ActiveJobs);