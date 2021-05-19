import React, { useEffect, useState } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom';
import menu from '../../assets/images/menu-line-blue.png';
import close from '../../assets/images/ic-cancel-blue.png';
import dummy from '../../assets/images/u_placeholder.jpg';
import approved from '../../assets/images/approved.png';
import tradieListData from '../shared/tradieListData';
import rateStar from '../../assets/images/ic-star-fill.png';
import moment from 'moment';
interface Props {
    getActiveJobsBuilder: (page: number) => void,
    getPastJobsBuilder: (page: number) => void,
    getNewApplicantsBuilder: (page: number) => void,
    getOpenJobsBuilder: (page: number) => void,
    activeJobs: any,
    pastJobs: any,
    openJobs: any
    applicantJobs: any,
    approvalJobs: any
}

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
    tradieData: any,
}

interface Applicant {
    amount: any,
    builderId: any,
    builderImage: any,
    durations: any,
    fromDate: any,
    jobDescription: any,
    jobId: any,
    specializationName: any,
    timeLeft: any,
    toDate: any,
    total: any,
    tradeName: any,
    tradeSelectedUrl: any,
}

const JobDashboard = ({ getActiveJobsBuilder, getPastJobsBuilder, getOpenJobsBuilder, getNewApplicantsBuilder, activeJobs, openJobs, pastJobs, applicantJobs, approvalJobs }: Props) => {
    const [openSidebar, setOpenSidebar] = useState(false);
    const [jobType, setJobtype] = useState('active');
    const [currentPage, setCurrentPage] = useState(1);
    const [dataItems, setDataItems] = useState({ activeJobs: {}, openJobs: {}, pastJobs: {}, applicantJobs: {}, approvalJobs: {} });

    // let activeJobList: any = [];
    let appliedJobList: any = [];

    useEffect(() => {
        setDataItems((prev) => ({ ...prev, activeJobs, openJobs, pastJobs, applicantJobs, approvalJobs }));
    }, [activeJobs, openJobs, pastJobs, applicantJobs, approvalJobs])

    const fetchActive = (page: any) => {
        if (jobType === 'active') {
            if (getActiveJobsBuilder) {
                getActiveJobsBuilder(page);
            }
        }

        if (jobType === 'past') {
            if (getPastJobsBuilder) {
                getPastJobsBuilder(page);
            }
        }

        if (jobType === 'open') {
            if (getOpenJobsBuilder) {
                getOpenJobsBuilder(page);
            }
        }

        if (jobType === 'applicant') {
            if (getNewApplicantsBuilder) {
                getNewApplicantsBuilder(page);
            }
        }

        if (jobType === 'approval') {
            // approval
        }
    }

    useEffect(() => {
        fetchActive(currentPage);
    }, [])

    useEffect(() => {
        fetchActive(currentPage);
    }, [jobType])

    const ActiveJobs = () => {
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
                                <div className="tradie_card">
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

    const PastJobs = () => {
        let data_item: any = dataItems;
        let listData: any = data_item[`${jobType}Jobs`][`${jobType}`];
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
                            tradieData,
                        }: Post) => (
                            <div className="flex_col_sm_6">
                                <div className="tradie_card">
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
                                            <li className="icon clock">{`${0} minutes ago`}</li>
                                            <li className="icon dollar">{amount}</li>
                                            <li className="icon location line-1">{locationName}</li>
                                            <li className="icon calendar">{'0 days'}</li>
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

    const OpenJobs = () => {
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
                                <div className="tradie_card">
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

    const Applicant = () => {
        let data_item: any = dataItems;
        let listData: any = data_item[`${jobType}Jobs`]
        console.log({ listData, jobType, data_item })
        return (
            <React.Fragment>
                <span className="sub_title">New Applicants</span>
                <div className="flex_row tradies_row">
                    {listData?.length ?
                        listData.map(({
                            amount,
                            builderId,
                            builderImage,
                            durations,
                            fromDate,
                            jobDescription,
                            jobId,
                            specializationName,
                            timeLeft,
                            toDate,
                            total,
                            tradeName,
                            tradeSelectedUrl,
                        }: Applicant) => (
                            <div className="flex_col_sm_6">
                                <div className="tradie_card">
                                    <span className="more_detail circle">
                                    </span>
                                    <div className="user_wrap">
                                        <figure className="u_img">
                                            <img src={dummy} alt="traide-img" />
                                        </figure>
                                        <div className="details">
                                            <span className="name">{tradeName}</span>
                                            <p className="commn_para">{jobDescription}</p>
                                        </div>
                                    </div>
                                    <div className="job_info">
                                        <ul>
                                            <li className="icon clock">{`${timeLeft} minutes ago`}</li>
                                            <li className="icon dollar">{amount}</li>
                                            <li className="icon location line-1">{'.'}</li>
                                            <li className="icon calendar">{`${durations} days`}</li>
                                        </ul>
                                    </div>
                                    <button className="fill_grey_btn full_btn">
                                        {'Applications'}
                                    </button>

                                </div>
                            </div>
                        )) : null}
                </div>
            </React.Fragment>
        )
    }

    console.log({ activeJobs, openJobs, pastJobs });
    let data_item: any = dataItems;
    let currentItem = data_item[`${jobType}Jobs`]
    let needApprovalCount: any = 0;
    let newApplicantsCount: any = 0;
    if (currentItem && Object.keys(currentItem)?.length) {
        needApprovalCount = currentItem.needApprovalCount;
        newApplicantsCount = currentItem.newApplicantsCount;
    }
    return (
        <div className="app_wrapper">
            <div className="custom_container">
                <span
                    className="mob_side_nav"
                    onClick={() => setOpenSidebar(!openSidebar)}
                >
                    <img src={menu} alt="mob-side-nav" />
                </span>
                <div className="f_row">
                    <div className={`side_nav_col${openSidebar ? ' active' : ''}`}>
                        <button className="close_nav" onClick={() => setOpenSidebar(false)}>
                            <img src={close} alt="close" />
                        </button>
                        <div className="stick">
                            <span className="title">Job Dashboard</span>
                            <ul className="dashboard_menu">
                                <li>
                                    <span className={`icon star ${jobType === "active" ? 'active' : ''}`}>
                                        <span
                                            onClick={() => { setJobtype('active') }}
                                            className="menu_txt">Active Jobs</span>
                                    </span>
                                </li>
                                <li>
                                    <span className={`icon applied ${jobType === "open" ? 'active' : ''}`}>
                                        <span
                                            onClick={() => { setJobtype('open') }}
                                            className="menu_txt">Open jobs</span>
                                    </span>
                                </li>
                                <li>
                                    <span className={`icon past ${jobType === "past" ? 'active' : ''}`}>
                                        <span
                                            onClick={() => { setJobtype('past') }}
                                            className="menu_txt">Past jobs</span>
                                    </span>
                                </li>
                                <hr></hr>
                                <li>
                                    <span className="icon new">
                                        <span
                                            onClick={() => { setJobtype('applicant') }}
                                            className="menu_txt">
                                            {'New applicants'}
                                            {!!needApprovalCount && (
                                                <span className="badge_count">
                                                    {needApprovalCount > 9 ? '9+' : needApprovalCount}
                                                </span>
                                            )}
                                        </span>
                                    </span>
                                </li>
                                <li>
                                    <span className="icon approved">
                                        <span
                                            onClick={() => { setJobtype('approval') }}
                                            className="menu_txt">
                                            {'Need approval'}
                                            {!!newApplicantsCount && (
                                                <span className="badge_count">
                                                    {newApplicantsCount > 9 ? '9+' : newApplicantsCount}
                                                </span>
                                            )}
                                        </span>
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="detail_col">
                        {jobType === 'active' && <ActiveJobs />}
                        {jobType === 'open' && <OpenJobs />}
                        {jobType === 'past' && <PastJobs />}
                        {jobType === "applicant" && <Applicant />}
                    </div>
                    {/* <div className="detail_col">
                        <Switch>
                            <Route
                                path="/active-jobs"
                                render={(props) => (
                                    <ActiveJobs />
                                )}
                            />
                            <Route
                                path="/applied-jobs"
                                render={(props) => (
                                    <ActiveJobs />
                                )}
                            />
                            <Route
                                path="/past-jobs"
                                render={(props) => (
                                    <ActiveJobs />
                                )}
                            />
                            <Route
                                path="/new-jobs"
                                render={(props) => (
                                    <ActiveJobs />
                                )}
                            />
                            <Route
                                path="/approved-milestones"
                                render={(props) => (
                                    <ActiveJobs />
                                )}
                            />
                            <Route
                                path="/mark-milestone"
                                render={(props) => (
                                    <ActiveJobs />
                                )}
                            />
                        </Switch>
                    </div> */}
                </div>
            </div>
        </div>
    );
}


export default JobDashboard;