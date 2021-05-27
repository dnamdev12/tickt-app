import React, { ReactElement } from 'react'
import dummy from '../../../assets/images/u_placeholder.jpg';
import approved from '../../../assets/images/approved.png';
import rateStar from '../../../assets/images/ic-star-fill.png';
import noDataFound from '../../../assets/images/no-search-data.png';

interface Post {
    amount: any,
    fromDate: any,
    jobData: any,
    jobId: any,
    jobName: any,
    locationName: any,
    milestoneNumber: any,
    specializationId: any,
    specializationName: any,
    status: any,
    toDate: any,
    totalMilestones: any,
    tradeId: any,
    tradeName: any,
    tradeImage: any,
    isLoading:any,
    tradieData: any,
}


export default function PastJobs(props: any): ReactElement {
    const { dataItems, jobType , isLoading} = props;
    let listData: any = dataItems;

    const redirectToInfo = ({ jobId, tradeId, specializationId, status }: any) => {
        props.history.push(`/job-detail?jobId=${jobId}&tradeId=${tradeId}&specializationId=${specializationId}&status=${status}`);
    }

    return (
        <React.Fragment>
            <span className="sub_title">{jobType.charAt(0).toUpperCase() + jobType.slice(1)} Jobs</span>
            <div className="flex_row tradies_row">
                {listData?.length ?
                    listData.map(({
                        amount,
                        fromDate,
                        jobData,
                        jobId,
                        jobName,
                        locationName,
                        milestoneNumber,
                        specializationId,
                        specializationName,
                        status,
                        toDate,
                        totalMilestones,
                        tradeId,
                        tradeName,
                        tradeImage,
                        tradieData,
                    }: Post) => (
                        <div className="flex_col_sm_6">
                            <div className="tradie_card" data-aos="fade-in" data-aos-delay="250" data-aos-duration="1000">
                                <span
                                    onClick={() => {
                                        redirectToInfo({ jobId, tradeId, specializationId, status })
                                    }}
                                    className="more_detail circle">
                                </span>
                                <div className="user_wrap">
                                    <figure className="u_img">
                                        <img src={tradeImage|| dummy} alt="traide-img" />
                                    </figure>
                                    <div className="details">
                                        <span className="name">{tradeName}</span>
                                        <p className="commn_para">{jobName}</p>
                                    </div>
                                </div>
                                <div className="job_info">
                                    <ul>
                                        <li className="icon clock">{`${0} minutes ago`}</li>
                                        <li className="icon dollar">{amount}</li>
                                        <li className="icon location line-1">{locationName}</li>
                                        {/* <li className="icon calendar">{'0 days'}</li> */}
                                        <li className="job_status">{status}</li>
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
                                                value={(milestoneNumber / totalMilestones) > 0 ? milestoneNumber / totalMilestones * 100 : 0}
                                            />
                                        </span>
                                    </div>
                                    <button className="fill_grey_btn full_btn">
                                        {status === "COMPLETED" ? (
                                            <React.Fragment>
                                                <img src={rateStar} alt="rating-star" />
                                                {'Rate this job'}
                                            </React.Fragment>
                                        ) : 'Publish again'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )) : !isLoading && (
                        <div className="no_record">
                            <figure className="no_img">
                                <img src={noDataFound} alt="data not found" />
                            </figure>
                        </div>
                    )}
            </div>
        </React.Fragment>
    )
}
