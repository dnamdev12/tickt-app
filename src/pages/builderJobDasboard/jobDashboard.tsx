import React, { Component } from 'react'
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
import NeedApproval from './components/needApproval';
import ApplicantsList from './components/applicantsList';


import MarkMilestones from './components/markMilestones';
import DeclineMilestone from './components/declineMilestone';
import DeclineMilestoneSuccess from './components/declineMilestoneSuccess';
import { getNewApprovalList } from '../../redux/jobs/actions';
import { setShowToast } from '../../redux/common/actions';

import FixedConfirm from './components/confirmAndPay/fixedRate';
import ConfirmAndPay from './components/confirmAndPay/confirmAndPay';
import FixedRate from './components/confirmAndPay/fixedRate';

import InfiniteScroll from "react-infinite-scroll-component";


interface Props {
    getActiveJobsBuilder: (page: number) => void,
    getPastJobsBuilder: (page: number) => void,
    getNewApplicantsBuilder: (page: number) => void,
    getOpenJobsBuilder: (page: number) => void,
    getnewJobApplicationListBuilder: (item: any) => void,
    getNewApprovalList: (page: number) => void,
    activeJobs: any,
    pastJobs: any,
    openJobs: any
    applicantJobs: any,
    approvalJobs: any,
    applicantsListJobs: any,
    history: any,
    isLoading: any
}
interface State {
    isToggleSidebar: any,
    selectedItem: any,
    count: any,
    currentPage: any,
    activeType: any,
    activeJobs: any,
    pastJobs: any,
    openJobs: any
    applicantJobs: any,
    approvalJobs: any,
    applicantsListJobs: any,
    enableEditMilestone: any,
    enableLodgeDispute: any,
    enableCancelJob: any,
    globalJobId: string,
    hasLoad: boolean
}
class JobDashboard extends Component<Props, State> {
    constructor(props: any) {
        super(props)
        this.state = {
            currentPage: 1,
            isToggleSidebar: false,
            activeType: 'active',
            selectedItem: { jobtype: 'active', jobid: null, sortby: 1, specializationId: '' },
            count: { applicantCount: 0, approveCount: 0 },
            activeJobs: [],
            pastJobs: [],
            openJobs: [],
            applicantJobs: [],
            approvalJobs: [],
            applicantsListJobs: [],
            enableEditMilestone: false,
            enableLodgeDispute: false,
            enableCancelJob: false,
            globalJobId: '',
            hasLoad: true
        }
    }

    componentDidMount() {
        this.props.getActiveJobsBuilder(1);
    }

    // milestone dates should be lie betwwn job details
    componentDidUpdate(prevProps: any) {
        let nextProps: any = this.props;
        let { activeJobs, pastJobs, openJobs, applicantsListJobs, applicantJobs, approvalJobs } = nextProps;
        let { activeType, selectedItem: { jobtype }, currentPage, hasLoad } = this.state;
        let state_: any = this.state;

        let urlParams = new URLSearchParams(nextProps?.location?.search);
        let activeType_ = urlParams.get('active');
        let jobId_ = urlParams.get('jobId');
        let editMilestone_ = urlParams.get('editMilestone');
        let lodgeDispute_ = urlParams.get('lodgeDispute');
        let cancelJob_ = urlParams.get('cancelJob');

        if (activeType_) {
            if (activeType_ !== activeType) {
                this.setState({
                    activeType: activeType_,
                    selectedItem: {
                        jobtype: activeType_,
                        jobid: null,
                        sortby: 1,
                        specializationId: '',
                    },
                }, () => {
                    this.setAfterItems({
                        jobtype: activeType_,
                        currentPage: 1,
                        dataItemsAddons: { page: 1, jobId: null, sortBy: 1 }
                    })
                })
            }
        }

        // if (
        //     jobtype === 'active' &&
        //     JSON.stringify(activeJobs?.active) !== JSON.stringify(this.state?.activeJobs) &&
        //     (this.state?.activeJobs?.length < currentPage * 10)
        // ) {

        //     let { active, needApprovalCount, newApplicantsCount } = activeJobs;
        //     let page_get = 0;
        //     let prevValues = [];

        //     if (Array.isArray(active) && active?.length) {
        //         page_get = active[0]?.page;
        //     }

        //     if (Array.isArray(this.state?.activeJobs) && this.state?.activeJobs?.length) {
        //         prevValues = this.state?.activeJobs;
        //     };


        //     if (hasLoad && !active?.length && page_get === 0 && this.state?.activeJobs?.length !== 0) {
        //         if (this.state.hasLoad !== false) {
        //             this.setState({ hasLoad: false });
        //         }
        //     } else {
        //         if (hasLoad && active?.length && page_get === currentPage) {
        //             this.setState({
        //                 globalJobId: jobId_ && jobId_?.length ? jobId_ : '',
        //                 enableEditMilestone: editMilestone_ === "true" ? true : false,
        //                 enableLodgeDispute: lodgeDispute_ === "true" ? true : false,
        //                 enableCancelJob: cancelJob_ === "true" ? true : false,
        //                 activeJobs: page_get > 0 && page_get === currentPage ? [...prevValues, ...active] : active,
        //                 count: {
        //                     approveCount: needApprovalCount,
        //                     applicantCount: newApplicantsCount
        //                 }
        //             }, () => {
        //                 console.log({
        //                     activeJobs: this.state?.activeJobs,
        //                     currentPage,
        //                     page_get,
        //                     active_length: active?.length
        //                 }, 'inside')
        //             });
        //         }
        //     }
        // }


        if (jobtype === 'active' && JSON.stringify(activeJobs?.active) !== JSON.stringify(this.state?.activeJobs)) {

            let { active, needApprovalCount, newApplicantsCount } = activeJobs;
            this.setState({
                globalJobId: jobId_ && jobId_?.length ? jobId_ : '',
                enableEditMilestone: editMilestone_ === "true" ? true : false,
                enableLodgeDispute: lodgeDispute_ === "true" ? true : false,
                enableCancelJob: cancelJob_ === "true" ? true : false,
                activeJobs: active,
                count: {
                    approveCount: needApprovalCount,
                    applicantCount: newApplicantsCount
                }
            })
        }

        if (jobtype === 'past' && JSON.stringify(pastJobs?.past) !== JSON.stringify(this.state.pastJobs)) {
            let { past, needApprovalCount, newApplicantsCount } = pastJobs;
            this.setState({
                pastJobs: past,
                count: {
                    approveCount: needApprovalCount,
                    applicantCount: newApplicantsCount
                }
            });
        }

        if (jobtype === 'open' && JSON.stringify(openJobs?.open) !== JSON.stringify(this.state.openJobs)) {
            let { open, needApprovalCount, newApplicantsCount } = openJobs;
            console.log({ open, needApprovalCount, newApplicantsCount })
            this.setState({
                openJobs: open,
                count: {
                    approveCount: needApprovalCount,
                    applicantCount: newApplicantsCount
                }
            });
        }

        if (jobtype === 'applicantList' && JSON.stringify(applicantsListJobs) !== JSON.stringify(this.state.applicantsListJobs)) {
            this.setState({
                applicantsListJobs
            });
        }

        if (jobtype === 'applicant' && JSON.stringify(applicantJobs) !== JSON.stringify(this.state.applicantJobs)) {
            this.setState({ applicantJobs })
        }

        if (jobtype === 'approval' && JSON.stringify(approvalJobs) !== JSON.stringify(this.state.approvalJobs)) {
            this.setState({ approvalJobs })
        }
    }


    toggleSidebar = () => this.setState({ isToggleSidebar: !this.state.isToggleSidebar });
    setSelected = (jobtype: any, jobid?: any, sortby?: any, specializationId?: any) => {
        const { getActiveJobsBuilder, getPastJobsBuilder, getOpenJobsBuilder, getNewApplicantsBuilder, getnewJobApplicationListBuilder, getNewApprovalList } = this.props;
        let { currentPage } = this.state;
        let item_position: any = localStorage.getItem('position');
        let locationLocal: any = JSON.parse(item_position);

        let dataItemsAddons: any = { page: currentPage, jobId: jobid, sortBy: sortby };
        if (sortby === 2) {
            dataItemsAddons['location'] = {
                "type": "Point",
                "coordinates": [
                    locationLocal[1],
                    locationLocal[0]
                ]
            };
        }

        if (['active', 'past', 'open', 'applicant', 'approval'].includes(jobtype)) {
            this.setState({ activeType: jobtype }, () => {
                // this.props.history.replace('/jobs')
                console.log({
                    props: this.props
                }, '----???>>>');
                this.props.history.push(`/jobs?active=${jobtype}`);
            })
        }
        this.setState({
            selectedItem: { jobtype, jobid, sortby, specializationId }, applicantsListJobs: []
        }, () => {
            this.setAfterItems({ jobtype, currentPage, dataItemsAddons });
        });
    }

    setAfterItems = ({ jobtype, currentPage, dataItemsAddons }: any) => {
        const { getActiveJobsBuilder, getPastJobsBuilder, getOpenJobsBuilder, getNewApplicantsBuilder, getnewJobApplicationListBuilder, getNewApprovalList } = this.props;

        if (jobtype === 'active') { getActiveJobsBuilder(currentPage); }
        if (jobtype === 'past') { getPastJobsBuilder(currentPage); }
        if (jobtype === 'open') { getOpenJobsBuilder(currentPage); }
        if (jobtype === 'applicant') { getNewApplicantsBuilder(currentPage); }
        if (jobtype === 'approval') { getNewApprovalList(currentPage); }
        if (jobtype === 'applicantList') { getnewJobApplicationListBuilder(dataItemsAddons); }
    }

    render() {
        let {
            hasLoad,
            currentPage,
            enableEditMilestone,
            enableLodgeDispute,
            enableCancelJob,
            globalJobId,
            isToggleSidebar,
            activeType,
            selectedItem: { jobtype, jobid, specializationId },
            count: { applicantCount, approveCount },
            activeJobs, pastJobs, openJobs, applicantJobs, applicantsListJobs, approvalJobs
        } = this.state;
        const { toggleSidebar, setSelected } = this;
        let props: any = this.props;
        let isLoading: any = props.isLoading;

        console.log({
            activeJobs,
            currentPage,
            hasLoad
        }, 'inside')
        // console.log({ approvalJobs }, '------------------------------->')
        return (
            <div className="app_wrapper">
                <div className="custom_container">
                    <span
                        className="mob_side_nav"
                        onClick={() => { toggleSidebar() }}
                    >
                        <img src={menu} alt="mob-side-nav" />
                    </span>
                    <div className="f_row">
                        <div className={`side_nav_col${isToggleSidebar ? ' active' : ''}`}>
                            <button className="close_nav" onClick={() => { toggleSidebar() }}>
                                <img src={close} alt="close" />
                            </button>
                            <div className="stick">
                                <span className="title">Job Dashboard</span>
                                <ul className="dashboard_menu">
                                    <li>
                                        <span className={`icon star ${activeType === "active" ? 'active' : ''}`}>
                                            <span
                                                onClick={() => {
                                                    console.log('Here!!!!')
                                                    // setResetItem(true);
                                                    setSelected('active')
                                                }}
                                                className="menu_txt">Active</span>
                                        </span>
                                    </li>
                                    <li>
                                        <span className={`icon open ${activeType === "open" ? 'active' : ''}`}>
                                            <span
                                                onClick={() => { setSelected('open') }}
                                                className="menu_txt">Open</span>
                                        </span>
                                    </li>
                                    <li>
                                        <span className={`icon past ${activeType === "past" ? 'active' : ''}`}>
                                            <span
                                                onClick={() => { setSelected('past') }}
                                                className="menu_txt">Past</span>
                                        </span>
                                    </li>
                                    {/* <hr></hr> */}
                                    <li>
                                        <span className={`icon applicants ${activeType === "applicant" ? 'active' : ''}`}>
                                            <span
                                                onClick={() => { setSelected('applicant') }}
                                                className="menu_txt">
                                                {'New applicants'}
                                                {!!applicantCount && (
                                                    <span className="badge_count">
                                                        {applicantCount > 9 ? '9+' : applicantCount}
                                                    </span>
                                                )}
                                            </span>
                                        </span>
                                    </li>
                                    <li>
                                        {/* <span className="icon approved"> */}
                                        <span className={`icon approved ${activeType === "approval" ? 'active' : ''}`}>
                                            <span
                                                onClick={() => {
                                                    setSelected('approval')
                                                }}
                                                className="menu_txt">
                                                {'Need approval'}
                                                {!!approveCount && (
                                                    <span className="badge_count">
                                                        {approveCount > 9 ? '9+' : approveCount}
                                                    </span>
                                                )}
                                            </span>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* <InfiniteScroll
                            dataLength={activeJobs?.length}
                            next={() => {
                                console.log('callable - Here!', { cp: this.state.currentPage });
                                this.setState({ currentPage: this.state.currentPage + 1 }, () => {
                                    console.log('callable - Inside', { cp: this.state.currentPage });
                                    this.props.getActiveJobsBuilder(this.state.currentPage);
                                });
                            }}
                            hasMore={hasLoad}
                            loader={<></>} */}
                        <div className="detail_col element-side-scroll">

                            {jobtype === 'past' && (
                                <PastJobsComponent
                                    isLoading={isLoading}
                                    dataItems={pastJobs}
                                    jobType={jobtype}
                                    activeType={activeType}
                                    history={props.history}
                                    getPastJobsBuilder={props?.getPastJobsBuilder}
                                />)}
                            {jobtype === 'active' && (
                                <ActiveJobsComponent
                                    isLoading={isLoading}
                                    dataItems={activeJobs}
                                    jobType={jobtype}
                                    activeType={activeType}
                                    setJobLabel={setSelected}
                                    history={props.history}
                                    globalJobId={globalJobId}
                                    enableEditMilestone={enableEditMilestone}
                                    enableLodgeDispute={enableLodgeDispute}
                                    enableCancelJob={enableCancelJob}
                                />)}
                            {jobtype === 'open' && (
                                <OpenJobsComponent
                                    isLoading={isLoading}
                                    dataItems={openJobs}
                                    jobType={jobtype}
                                    setJobLabel={setSelected}
                                    activeType={activeType}
                                    history={props.history}
                                />)}
                            {jobtype === 'applicant' && (
                                <NewApplicantComponent
                                    isLoading={isLoading}
                                    dataItems={applicantJobs}
                                    jobType={jobtype}
                                    setJobLabel={setSelected}
                                    history={props.history}
                                />)}
                            {jobtype === 'approval' && (
                                <NeedApproval
                                    isLoading={isLoading}
                                    dataItems={approvalJobs}
                                    jobType={jobtype}
                                    setJobLabel={setSelected}
                                    activeType={activeType}
                                    history={props.history}
                                />
                            )}
                            {jobtype === 'applicantList' && (
                                <ApplicantsList
                                    isLoading={isLoading}
                                    items={applicantsListJobs}
                                    jobid={jobid}
                                    specializationId={specializationId}
                                    setJobLabel={setSelected}
                                    activeType={activeType}
                                    history={props.history}
                                />)}
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default JobDashboard;