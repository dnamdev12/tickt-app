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

import ApplicantsList from './components/applicantsList';


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
    applicantsListJobs: any
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
            applicantsListJobs: []

        }
    }

    componentDidMount() {
        this.props.getActiveJobsBuilder(1);
    }

    componentDidUpdate(prevProps: any) {
        let nextProps: any = this.props;
        let { activeJobs, pastJobs, openJobs, applicantsListJobs, applicantJobs } = nextProps;
        let { selectedItem: { jobtype } } = this.state;
        if (jobtype === 'active' && activeJobs?.active?.length && activeJobs?.active?.length !== this.state.activeJobs.length) {
            let { active, needApprovalCount, newApplicantsCount } = activeJobs;
            this.setState({
                activeJobs: active,
                count: {
                    approveCount: needApprovalCount,
                    applicantCount: newApplicantsCount
                }
            });
        }

        if (jobtype === 'past' && pastJobs?.past?.length && pastJobs?.past?.length !== this.state.pastJobs.length) {
            let { past, needApprovalCount, newApplicantsCount } = pastJobs;
            this.setState({
                pastJobs: past,
                count: {
                    approveCount: needApprovalCount,
                    applicantCount: newApplicantsCount
                }
            });
        }

        if (jobtype === 'open' && openJobs?.open?.length && openJobs?.open?.length !== this.state.openJobs.length) {
            let { open, needApprovalCount, newApplicantsCount } = openJobs;
            this.setState({
                openJobs: open,
                count: {
                    approveCount: needApprovalCount,
                    applicantCount: newApplicantsCount
                }
            });
        }

        if (jobtype === 'applicantList' && applicantsListJobs?.length && applicantsListJobs?.length !== this.state.applicantsListJobs?.length) {
            this.setState({
                applicantsListJobs
            });
        }

        if (jobtype === 'applicant' && applicantJobs?.length && applicantJobs?.length !== this.state.applicantJobs?.length) {
            this.setState({ applicantJobs })
        }

        console.log({ nextProps, jobtype, applicantJobs: this.state.applicantJobs })
    }


    toggleSidebar = () => this.setState({ isToggleSidebar: !this.state.isToggleSidebar });
    setSelected = (jobtype: any, jobid?: any, sortby?: any, specializationId?: any) => {
        const { getActiveJobsBuilder, getPastJobsBuilder, getOpenJobsBuilder, getNewApplicantsBuilder, getnewJobApplicationListBuilder, } = this.props;
        let { currentPage } = this.state;
        let item_position: any = localStorage.getItem('position');
        let locationLocal: any = JSON.parse(item_position);

        let dataItemsAddons: any = { page: currentPage, jobId: jobid, sortBy: sortby };
        if (sortby === 2) {
            dataItemsAddons['location'] = {
                "type": "Point",
                "coordinates": [
                    locationLocal[0],
                    locationLocal[1]
                ]
            };
        }

        if (['active', 'past', 'open', 'applicant'].includes(jobtype)) {
            this.setState({ activeType: jobtype })
        }
        this.setState({
            selectedItem: { jobtype, jobid, sortby, specializationId }, applicantsListJobs: [],
            count: {
                approveCount: 0,
                applicantCount: 0
            }
        }, () => {
            if (jobtype === 'active') { getActiveJobsBuilder(currentPage); }
            if (jobtype === 'past') { getPastJobsBuilder(currentPage); }
            if (jobtype === 'open') { getOpenJobsBuilder(currentPage); }
            if (jobtype === 'applicant') { getNewApplicantsBuilder(currentPage); }
            if (jobtype === 'applicantList') { getnewJobApplicationListBuilder(dataItemsAddons); }
        });
    }

    render() {
        let {
            isToggleSidebar,
            activeType,
            selectedItem: { jobtype, jobid, specializationId },
            count: { applicantCount, approveCount },
            activeJobs, pastJobs, openJobs, applicantJobs, applicantsListJobs,
        } = this.state;
        const { toggleSidebar, setSelected } = this;
        let props: any = this.props;
        let isLoading: any = props.isLoading;
        console.log({ activeJobs, pastJobs, openJobs, applicantJobs, jobtype, history: props.history })
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
                                                className="menu_txt">Active Jobs</span>
                                        </span>
                                    </li>
                                    <li>
                                        <span className={`icon open ${activeType === "open" ? 'active' : ''}`}>
                                            <span
                                                onClick={() => { setSelected('open') }}
                                                className="menu_txt">Open jobs</span>
                                        </span>
                                    </li>
                                    <li>
                                        <span className={`icon past ${activeType === "past" ? 'active' : ''}`}>
                                            <span
                                                onClick={() => { setSelected('past') }}
                                                className="menu_txt">Past jobs</span>
                                        </span>
                                    </li>
                                    <hr></hr>
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
                                        <span className="icon approved">
                                            <span
                                                onClick={() => { setSelected('approval') }}
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
                        <div className="detail_col">
                            {jobtype === 'past' && <PastJobsComponent isLoading={isLoading} dataItems={pastJobs} jobType={jobtype} history={props.history} />}
                            {jobtype === 'active' && <ActiveJobsComponent isLoading={isLoading} dataItems={activeJobs} jobType={jobtype} setJobLabel={setSelected} history={props.history} />}
                            {jobtype === 'open' && <OpenJobsComponent isLoading={isLoading} dataItems={openJobs} jobType={jobtype} setJobLabel={setSelected} history={props.history} />}
                            {jobtype === 'applicant' && <NewApplicantComponent isLoading={isLoading} dataItems={applicantJobs} jobType={jobtype} setJobLabel={setSelected} history={props.history} />}
                            {jobtype === 'applicantList' && <ApplicantsList isLoading={isLoading} items={applicantsListJobs} jobid={jobid} specializationId={specializationId} setJobLabel={setSelected} activeType={activeType} history={props.history} />}
                            {/* <DeclineMilestone /> */}
                            {/* <DeclineMilestoneSuccess /> */}
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default JobDashboard;