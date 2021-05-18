import React, { useEffect, useState } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom';
import menu from '../../assets/images/menu-line-blue.png';
import close from '../../assets/images/ic-cancel-blue.png';
import dummy from '../../assets/images/u_placeholder.jpg';
import approved from '../../assets/images/approved.png';
interface Props {
    getActiveJobsBuilder: (page: number) => void,
    getPastJobsBuilder: (page: number) => void,
    getOpenJobsBuilder: (page: number) => void,
    activeJobs: any,
    pastJobs: any,
    openJobs: any
}

const JobDashboard = ({ getActiveJobsBuilder, getPastJobsBuilder, getOpenJobsBuilder, activeJobs, openJobs, pastJobs }: Props) => {
    const [openSidebar, setOpenSidebar] = useState(false);
    const [jobType, setJobtype] = useState('active');
    const [dataItems, setDataItems] = useState({ activeJobs: {}, openJobs: {}, pastJobs: {} });

    // let activeJobList: any = [];
    let appliedJobList: any = [];

    useEffect(() => {
        setDataItems({ activeJobs, openJobs, pastJobs });
    }, [activeJobs, openJobs, pastJobs])


    useEffect(() => {
        if (getActiveJobsBuilder) {
            getActiveJobsBuilder(1);
        }
        if (getPastJobsBuilder) {
            getPastJobsBuilder(1);
        }
        if (getOpenJobsBuilder) {
            getOpenJobsBuilder(1);
        }
    }, [])


    const AppliedJobs = () => {
        return (
            <React.Fragment>
                <span className="sub_title">{' Applied Jobs '}</span>
                <div className="flex_row tradies_row">
                    {appliedJobList?.length ?
                        appliedJobList.map(({
                            jobId,
                            tradeSelectedUrl,
                            tradeId,
                            specializationId,
                            jobName,
                            time,
                            amount,
                            locationName,
                            durations }: {
                                jobId: any,
                                tradeSelectedUrl: any,
                                tradeId: any,
                                specializationId: any,
                                jobName: any,
                                time: any,
                                amount: any,
                                locationName: any,
                                durations: any
                            }) => (
                            <div className="flex_col_sm_6">
                                <div className="tradie_card">
                                    <span className="more_detail circle"></span>
                                    <div className="user_wrap">
                                        <figure className="u_img">
                                            <img src={tradeSelectedUrl || dummy} alt="traide-img" />
                                        </figure>
                                        <div className="details">
                                            <span className="name">{jobName}</span>
                                        </div>
                                    </div>
                                    <div className="job_info">
                                        <ul>
                                            <li className="icon clock">{time}</li>
                                            <li className="icon dollar">{amount}</li>
                                            <li className="icon location line-1">{locationName}</li>
                                            <li className="icon calendar">{durations}</li>
                                        </ul>
                                    </div>
                                    <div className="job_progress_wrap" id="scroll-progress-bar">
                                        <div className="progress_wrapper">
                                            <span className="completed-digit" id="digit-progress">
                                                <b>Job Milestones 2</b>{' of 5'}
                                            </span>
                                            <span className="approval_info">
                                                <img src={approved} alt="icon" />
                                                {'Approved'}
                                                {/* Awating */}
                                                {/* <img src={waiting} alt="icon" /> */}
                                                {/* Need approval */}
                                            </span>
                                            <span className="progress_bar">
                                                <input
                                                    className="done_progress"
                                                    id="progress-bar"
                                                    type="range"
                                                    min="0"
                                                />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )) : null}
                </div>
            </React.Fragment>
        )
    }

    const ActiveJobs = () => {
        let data_item: any = dataItems;
        let activeJobList: any = data_item[`${jobType}Jobs`][`${jobType}`];
        // let activeJobList: any = data_item?.openJobs?.open;
        return (
            <React.Fragment>
                <span className="sub_title">{jobType.charAt(0).toUpperCase() + jobType.slice(1)} Jobs</span>
                <div className="flex_row tradies_row">
                    {activeJobList?.length ?
                        activeJobList.map(({
                            jobId,
                            tradeId,
                            specializationId,
                            tradeSelectedUrl,
                            jobName,
                            time,
                            amount,
                            locationName,
                            durations
                        }: {
                            jobId: any,
                            tradeId: any,
                            specializationId: any,
                            tradeSelectedUrl: any,
                            jobName: any,
                            time: any,
                            amount: any,
                            locationName: any,
                            durations: any
                        }) => (
                            <div className="flex_col_sm_6">
                                <div className="tradie_card">
                                    <span className="more_detail circle">
                                    </span>
                                    <div className="user_wrap">
                                        <figure className="u_img">
                                            <img src={tradeSelectedUrl || dummy} alt="traide-img" />
                                        </figure>
                                        <div className="details">
                                            <span className="name">{jobName}</span>
                                        </div>
                                    </div>
                                    <div className="job_info">
                                        <ul>
                                            <li className="icon clock">{time}</li>
                                            <li className="icon dollar">{amount}</li>
                                            <li className="icon location line-1">{locationName}</li>
                                            <li className="icon calendar">{durations}</li>
                                        </ul>
                                    </div>
                                    <div className="job_progress_wrap" id="scroll-progress-bar">
                                        <div className="progress_wrapper">
                                            <span className="completed-digit" id="digit-progress">
                                                <b>Job Milestones 2</b>{' of 5'}
                                            </span>
                                            <span className="approval_info">
                                                <img src={approved} alt="icon" />
                                                {'Approved'}
                                                {/* Awating */}
                                                {/* <img src={waiting} alt="icon" /> */}
                                                {/* Need approval */}
                                            </span>
                                            <span className="progress_bar">
                                                <input
                                                    className="done_progress"
                                                    id="progress-bar"
                                                    type="range"
                                                    min="0"
                                                />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )) : null}
                </div>
            </React.Fragment>
        )
    }

    console.log({ activeJobs, openJobs, pastJobs });
    let newJobsCount = false;
    let milestonesCount = false;
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
                                <li onClick={() => { setJobtype('active') }}>
                                    <span className={`icon star ${jobType === "active" ? 'active' : ''}`}>
                                        <span className="menu_txt">Active Jobs</span>
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
                                        <span className="menu_txt">
                                            {'New jobs'}
                                            {!!newJobsCount && (
                                                <span className="badge_count">
                                                    {newJobsCount > 9 ? '9+' : newJobsCount}
                                                </span>
                                            )}
                                        </span>
                                    </span>
                                </li>
                                <li>
                                    <span className="icon approved">
                                        <span className="menu_txt">
                                            {'Approved milestones'}
                                            {!!milestonesCount && (
                                                <span className="badge_count">
                                                    {milestonesCount > 9 ? '9+' : milestonesCount}
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
                        {jobType === 'open' && <ActiveJobs />}
                        {jobType === 'past' && <ActiveJobs />}
                    </div>
                </div>
            </div>
        </div>
    );
}


export default JobDashboard;