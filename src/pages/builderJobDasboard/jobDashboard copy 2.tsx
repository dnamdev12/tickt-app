/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom';
import menu from '../../assets/images/menu-line-blue.png';
import close from '../../assets/images/ic-cancel-blue.png';
import media from '../../assets/images/portfolio-placeholder.jpg';
import approved from '../../assets/images/approved.png';
import tradieListData from '../shared/tradieListData';
import rateStar from '../../assets/images/ic-star-fill.png';
import moment from 'moment';

import ActiveJobsComponent from './components/activeJobs';
import OpenJobsComponent from './components/openJobs';
import PastJobsComponent from './components/pastJobs';
import NewApplicantComponent from './components/newApplicants';

import MarkMilestones from './components/markMilestones';
import DeclineMilestone from './components/declineMilestone';
import DeclineMilestoneSuccess from './components/declineMilestoneSuccess';

interface Props {
    getActiveJobsBuilder: (page: number) => void,
    getPastJobsBuilder: (page: number) => void,
    getNewApplicantsBuilder: (page: number) => void,
    getOpenJobsBuilder: (page: number) => void,
    getnewJobApplicationListBuilder: (item: any) => void,
    activeJobs: any,
    pastJobs: any,
    openJobs: any
    applicantJobs: any,
    approvalJobs: any,
    applicantsListJobs: any
}

const ApplicantsList: any = [
    {
        "tradieId": "605c2593dcf5842c9061811e",
        "tradieImage": "",
        "tradieName": "abc",
        "reviews": 1,
        "ratings": 4,
        "status": "AWAITING",
        "tradeData": [
            {
                "tradeId": "60486a7d1abc8a08073cf0e5",
                "tradeSelectedUrl": "https://appinventiv-development.s3.amazonaws.com/1618218684352.png",
                "tradeName": "Demolition"
            }
        ],
        "specializationData": [
            {
                "specializationId": "605200a30289795c7a667e11",
                "specializationName": "Water supply"
            },
            {
                "specializationId": "6059d9e30b0c3f7406950945",
                "specializationName": "test1"
            }
        ]
    },
    {
        "tradieId": "60a35096de60d01d99d3ae56",
        "tradieImage": "",
        "tradieName": "Test Tradie",
        "reviews": 0,
        "ratings": 0,
        "status": "AWAITING",
        "tradeData": [
            {
                "tradeId": "605c8bccb777553e6b057b8a",
                "tradeSelectedUrl": "https://appinventiv-development.s3.amazonaws.com/1619674591945.png",
                "tradeName": "Plumber"
            }
        ],
        "specializationData": [
            {
                "specializationId": "605c8bccb777553e6b057b8b",
                "specializationName": "Two Two Two"
            },
            {
                "specializationId": "6066fca0cc682b18cd57a4c6",
                "specializationName": "Security and Fire Alarm Installation"
            },
            {
                "specializationId": "6066fca0cc682b18cd57a4c9",
                "specializationName": "Powerhouse and Substation Technician"
            },
            {
                "specializationId": "6066fca0cc682b18cd57a4ca",
                "specializationName": "Electrotechnical Panel Building"
            }
        ]
    }
]

const JobDashboard = ({
    getActiveJobsBuilder,
    getPastJobsBuilder,
    getnewJobApplicationListBuilder,
    getOpenJobsBuilder,
    getNewApplicantsBuilder,
    activeJobs,
    openJobs,
    pastJobs,
    applicantJobs,
    approvalJobs,
    applicantsListJobs
}: Props) => {
    const [openSidebar, setOpenSidebar] = useState(false);
    const [jobType, setJobtype] = useState('active');
    const [currentPage, setCurrentPage] = useState(1);
    const [jobId, setJobId] = useState(null);
    const [dataItems, setDataItems] = useState({ activeJobs: {}, openJobs: {}, pastJobs: {}, applicantJobs: {}, approvalJobs: {}, applicantsListJobs: [] });
    const [resetItem, setResetItem] = useState(false);
    const [count, setCount] = useState({ name: 'Here!' });
    useEffect(() => {
        setDataItems((prev) => ({ ...prev, activeJobs, openJobs, pastJobs, applicantJobs, approvalJobs, applicantsListJobs: ApplicantsList }));
    }, [activeJobs, openJobs, pastJobs, applicantJobs, approvalJobs, applicantsListJobs])

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

        if (jobType === 'applicantList') {
            if (getnewJobApplicationListBuilder) {
                console.log({ page, jobId });
                let requestItem = { page, jobId, sortBy: 1 };
                getnewJobApplicationListBuilder(requestItem);
            }
        }

        if (jobType === 'approval') {
            // approval
        }

        setResetItem(false);
    }

    useEffect(() => {
        fetchActive(currentPage);
    }, [])

    useEffect(() => {
        setResetItem(true);
        fetchActive(currentPage);
    }, [jobType]);

    useEffect(() => {
        console.log({ resetItem });
    }, [resetItem])


    const setJobLabel = (item: any) => {
        if (item?.jobId) {
            setJobId(item.jobId);
        }
        setJobtype(item.title);
    }


    let data_item: any = dataItems;
    let currentItem = data_item[`${jobType}Jobs`]
    let needApprovalCount: any = 0;
    let newApplicantsCount: any = 0;
    if (currentItem && Object.keys(currentItem)?.length) {
        needApprovalCount = currentItem.needApprovalCount;
        newApplicantsCount = currentItem.newApplicantsCount;
    }
    console.log({ applicantsListJobs, resetItem });
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
                            <span onClick={() => {
                                setCount((prev: any) => ({ ...prev, name: 'sam' }));
                                console.log({ count });
                            }} className="title">Job Dashboard</span>
                            <ul className="dashboard_menu">
                                <li>
                                    <span className={`icon star ${jobType === "active" ? 'active' : ''}`}>
                                        <span
                                            onClick={() => {
                                                console.log('Here!!!!')
                                                setResetItem(true);
                                                setJobtype('active')
                                            }}
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
                        {/* {jobType === 'active' && (
                            <ActiveJobsComponent
                                dataItems={dataItems}
                                jobType={jobType}
                                resetItem={resetItem}
                                setJobLabel={setJobLabel}
                            />)}
                        {jobType === 'open' && (
                            <OpenJobsComponent
                                dataItems={dataItems}
                                jobType={jobType}
                                applicantsList={applicantsListJobs}
                                setJobLabel={setJobLabel}
                            />)}
                        {jobType === 'past' && (
                            <PastJobsComponent
                                dataItems={dataItems}
                                jobType={jobType}
                            />)}
                        {jobType === "applicant" && (
                            <NewApplicantComponent
                                dataItems={dataItems}
                                applicantsList={applicantsListJobs}
                                jobType={jobType}
                                setJobLabel={setJobLabel}
                            />)} */}
                        {/* <DeclineMilestone /> */}
                        {/* <DeclineMilestoneSuccess /> */}
                    </div>
                </div>
            </div>
        </div >
    );
}


export default JobDashboard;