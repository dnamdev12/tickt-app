import { Component } from 'react'
import menu from '../../assets/images/menu-line-blue.png';
import close from '../../assets/images/ic-cancel-blue.png';

import ActiveJobsComponent from './components/activeJobs';
import OpenJobsComponent from './components/openJobs';
import PastJobsComponent from './components/pastJobs';
import NewApplicantComponent from './components/newApplicants';
import NeedApproval from './components/needApproval';
import ApplicantsList from './components/applicantsList';
//@ts-ignore
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
    hasLoad: boolean,
    actualLoad: boolean,
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
            hasLoad: true,
            actualLoad: false
        }
    }

    componentDidMount() {
        let { activeType, selectedItem: { jobtype }, currentPage, hasLoad } = this.state;
        let nextProps: any = this.props;
        if (nextProps?.location?.search) {

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
                } else {
                    this.props.getActiveJobsBuilder(1);
                }
            }
        } else {
            this.props.getActiveJobsBuilder(1);
        }
    }


    checkAndUpdateCount = ({
        needApprovalCount,
        newApplicantsCount
    }: any) => {
        let { approveCount, applicantCount } = this.state?.count
        if (needApprovalCount !== approveCount ||
            newApplicantsCount !== applicantCount) {
            this.setState({
                count: {
                    approveCount: needApprovalCount,
                    applicantCount: newApplicantsCount
                },
            })
        }
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

        console.log({
            activeJobs, pastJobs, openJobs, applicantsListJobs, applicantJobs, approvalJobs,
            1: jobtype === 'active',
            2: JSON.stringify(activeJobs?.active) !== JSON.stringify(this.state?.activeJobs),
            3: (this.state?.activeJobs?.length < currentPage * 10)
        })

        if (
            jobtype === 'active' &&
                !activeJobs?.active?.length ? true : JSON.stringify(activeJobs?.active) !== JSON.stringify(this.state?.activeJobs) &&
            (this.state?.activeJobs?.length < currentPage * 10)
        ) {
            if (activeJobs?.active) {

                let { active, needApprovalCount, newApplicantsCount } = activeJobs;
                let page_get = 0;
                let prevValues = [];

                if (Array.isArray(active) && active?.length) {
                    page_get = active[0]?.page;
                }

                if (Array.isArray(this.state?.activeJobs) && this.state?.activeJobs?.length) {
                    prevValues = this.state?.activeJobs;
                };

                if (hasLoad && !active?.length && page_get === 0 && this.state?.activeJobs?.length !== 0) {
                    if (this.state.hasLoad !== false) {
                        this.setState({ hasLoad: false });
                    }
                } else if (hasLoad && active?.length && page_get === currentPage) {
                    let result = [];
                    if (JSON.stringify(prevValues) === JSON.stringify(active) && page_get === currentPage) {
                        // same data items here!
                    } else {
                        let concatedItems: any = prevValues;
                        let firstItem: any = null;
                        if (Array.isArray(active) && active?.length) {
                            firstItem = active[0];
                        }
                        if (firstItem?.jobId) {
                            let ifMatch = prevValues.find((item: any) => item.jobId === firstItem?.jobId);
                            if (!ifMatch) {
                                concatedItems = [...prevValues, ...active]
                            }

                        }
                        result = page_get > 0 && page_get === currentPage ? concatedItems : active;
                    }

                    let globalJobId = jobId_ && jobId_?.length ? jobId_ : ''
                    let enableEditMilestone = editMilestone_ === "true" ? true : false;
                    let enableLodgeDispute = lodgeDispute_ === "true" ? true : false;
                    let enableCancelJob = cancelJob_ === "true" ? true : false;
                    let { approveCount, applicantCount } = this.state?.count

                    if (needApprovalCount !== approveCount ||
                        newApplicantsCount !== applicantCount ||
                        this.state.globalJobId !== globalJobId ||
                        this.state.enableEditMilestone !== enableEditMilestone ||
                        this.state.enableLodgeDispute !== enableLodgeDispute ||
                        this.state.enableCancelJob !== enableCancelJob ||
                        this.state.enableCancelJob !== enableCancelJob ||
                        this.state.activeJobs?.length !== result?.length
                    ) {
                        console.log({
                            1: needApprovalCount !== approveCount,
                            2: newApplicantsCount !== applicantCount,
                            3: this.state.globalJobId !== globalJobId,
                            4: this.state.enableEditMilestone !== enableEditMilestone,
                            5: this.state.enableLodgeDispute !== enableLodgeDispute,
                            6: this.state.enableCancelJob !== enableCancelJob,
                            7: this.state.enableCancelJob !== enableCancelJob,
                            8: this.state.activeJobs?.length !== result?.length,
                            9: this.state.activeJobs?.length,
                            10: result?.length
                        })
                        this.setState({
                            globalJobId: jobId_ && jobId_?.length ? jobId_ : '',
                            enableEditMilestone: editMilestone_ === "true" ? true : false,
                            enableLodgeDispute: lodgeDispute_ === "true" ? true : false,
                            enableCancelJob: cancelJob_ === "true" ? true : false,
                            activeJobs: result,
                            count: {
                                approveCount: needApprovalCount,
                                applicantCount: newApplicantsCount
                            },
                            actualLoad: true
                        });
                    }
                } else {
                    this.checkAndUpdateCount({
                        needApprovalCount,
                        newApplicantsCount
                    })
                }
            }
        }

        if (
            jobtype === 'open' &&
                !openJobs?.open?.length ? true : JSON.stringify(openJobs?.open) !== JSON.stringify(this.state?.openJobs) &&
            (this.state?.openJobs?.length < currentPage * 10)
        ) {
            if (openJobs?.open) {
                let { open, needApprovalCount, newApplicantsCount } = openJobs;
                let page_get = 0;
                let prevValues = [];

                if (Array.isArray(open) && open?.length) {
                    page_get = open[0]?.page;
                }

                if (Array.isArray(this.state?.openJobs) && this.state?.openJobs?.length) {
                    prevValues = this.state?.openJobs;
                };


                if (hasLoad && !open?.length && page_get === 0 && this.state?.openJobs?.length !== 0) {
                    if (this.state.hasLoad !== false) {
                        this.setState({ hasLoad: false });
                    }
                } else if (hasLoad && open?.length && page_get === currentPage) {
                    let result = [];
                    if (JSON.stringify(prevValues) === JSON.stringify(open) && page_get === currentPage) {
                        // same data items here!
                    } else {
                        result = page_get > 0 && page_get === currentPage ? [...prevValues, ...open] : open;
                    }
                    this.setState({
                        openJobs: result,
                        count: {
                            approveCount: needApprovalCount,
                            applicantCount: newApplicantsCount
                        },
                        actualLoad: true
                    });
                } else {
                    this.checkAndUpdateCount({
                        needApprovalCount,
                        newApplicantsCount
                    })
                }

            }
        }

        if (
            jobtype === 'past' &&
                !pastJobs?.past?.length ? true : JSON.stringify(pastJobs?.past) !== JSON.stringify(this.state?.pastJobs) &&
            (this.state?.pastJobs?.length < currentPage * 10)
        ) {
   
            if (pastJobs?.past) {

                let { past, needApprovalCount, newApplicantsCount } = pastJobs;
                let page_get = 0;
                let prevValues = [];

                if (Array.isArray(past) && past?.length) {
                    page_get = past[0]?.page;
                }

                if (Array.isArray(this.state?.pastJobs) && this.state?.pastJobs?.length) {
                    prevValues = this.state?.pastJobs;
                };


                if (hasLoad && !past?.length && page_get === 0 && this.state?.pastJobs?.length !== 0) {
                    if (this.state.hasLoad !== false) {
                        this.setState({ hasLoad: false });
                    }
                } else if (hasLoad && past?.length && page_get === currentPage) {
                    let result = [];
                    if (JSON.stringify(prevValues) === JSON.stringify(past) && page_get === currentPage) {
                        // same data items here!
                    } else {
                        result = page_get > 0 && page_get === currentPage ? [...prevValues, ...past] : past;
                    }
                    this.setState({
                        pastJobs: result,
                        count: {
                            approveCount: needApprovalCount,
                            applicantCount: newApplicantsCount
                        },
                        actualLoad: true
                    });
                } else {
                    this.checkAndUpdateCount({
                        needApprovalCount,
                        newApplicantsCount
                    })
                }
            }
        }

        if (jobtype === 'applicantList' && JSON.stringify(applicantsListJobs) !== JSON.stringify(this.state.applicantsListJobs)) {
            this.setState({ applicantsListJobs });
        }

        if (
            jobtype === 'applicant' &&
            JSON.stringify(applicantJobs) !== JSON.stringify(this.state?.applicantJobs) &&
            (this.state?.applicantJobs?.length < currentPage * 10)
        ) {
            let page_get = 0;
            let prevValues = [];

            if (Array.isArray(applicantJobs) && applicantJobs?.length) {
                page_get = applicantJobs[0]?.page;
            }

            if (Array.isArray(this.state?.applicantJobs) && this.state?.applicantJobs?.length) {
                prevValues = this.state?.applicantJobs;
            };


            if (hasLoad && !applicantJobs?.length && page_get === 0 && this.state?.applicantJobs?.length !== 0) {
                if (this.state.hasLoad !== false) {
                    this.setState({ hasLoad: false });
                }
            } else {
                if (hasLoad && applicantJobs?.length && page_get === currentPage) {
                    this.setState({
                        applicantJobs: page_get > 0 && page_get === currentPage ? [...prevValues, ...applicantJobs] : applicantJobs,
                        actualLoad: true
                    });
                }
            }
        }


        if (
            jobtype === 'approval' &&
            JSON.stringify(approvalJobs) !== JSON.stringify(this.state?.approvalJobs) &&
            (this.state?.approvalJobs?.length < currentPage * 10)
        ) {
            let page_get = 0;
            let prevValues = [];

            if (Array.isArray(approvalJobs) && approvalJobs?.length) {
                page_get = approvalJobs[0]?.page;
            }

            if (Array.isArray(this.state?.approvalJobs) && this.state?.approvalJobs?.length) {
                prevValues = this.state?.approvalJobs;
            };


            if (hasLoad && !approvalJobs?.length && page_get === 0 && this.state?.approvalJobs?.length !== 0) {
                if (this.state.hasLoad !== false) {
                    this.setState({ hasLoad: false });
                }
            } else {
                if (hasLoad && approvalJobs?.length && page_get === currentPage) {
                    this.setState({
                        approvalJobs: page_get > 0 && page_get === currentPage ? [...prevValues, ...approvalJobs] : approvalJobs,
                        actualLoad: true
                    });
                }
            }
        }
    }

    toggleSidebar = () => this.setState({ isToggleSidebar: !this.state.isToggleSidebar });
    setSelected = (jobtype: any, jobid?: any, sortby?: any, specializationId?: any) => {

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
            this.setState({
                activeType: jobtype,
                currentPage: 1,
                hasLoad: true,
                activeJobs: [],
                pastJobs: [],
                openJobs: [],
                applicantJobs: [],
                approvalJobs: [],
                applicantsListJobs: [],
                actualLoad: false,
                selectedItem: { jobtype, jobid, sortby, specializationId },
            }, () => {
                this.props.history.push(`/jobs?active=${jobtype}`);
                window.scrollTo(0, 0);
                this.setAfterItems({ jobtype, currentPage: this.state.currentPage, dataItemsAddons });
            })
        } else {
            this.setState({
                selectedItem: { jobtype, jobid, sortby, specializationId },
                applicantsListJobs: [],
            }, () => {
                this.setAfterItems({ jobtype, currentPage: this.state.currentPage, dataItemsAddons });
            });
        }
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
            actualLoad,
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
        let totalCount: any = 0;

        if (jobtype === 'active') {
            totalCount = activeJobs?.length;
        }

        if (jobtype === 'past') {
            totalCount = pastJobs?.length;
        }

        if (jobtype === 'open') {
            totalCount = openJobs?.length;
        }

        if (jobtype === 'applicant') {
            totalCount = applicantJobs?.length;
        }

        if (jobtype === 'approval') {
            totalCount = approvalJobs?.length;
        }

        if (jobtype === 'applicantList') {
            totalCount = applicantsListJobs?.length;
        }

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


                        <InfiniteScroll
                            dataLength={totalCount}
                            next={() => {
                                if (totalCount == this.state.currentPage * 10) {
                                    this.setState({ currentPage: this.state.currentPage + 1 }, () => {
                                        let cp: any = this.state.currentPage;

                                        if (jobtype === 'active') {
                                            this.props.getActiveJobsBuilder(cp);
                                        }

                                        if (jobtype === 'past') {
                                            this.props.getPastJobsBuilder(cp)
                                        }

                                        if (jobtype === 'open') {
                                            this.props.getOpenJobsBuilder(cp);
                                        }

                                        if (jobtype === 'applicant') {
                                            this.props.getNewApplicantsBuilder(cp);
                                        }

                                        if (jobtype === 'approval') {
                                            this.props.getNewApprovalList(cp);
                                        }

                                    });
                                } else {
                                    // this.setState({ hasLoad: false })
                                }
                            }}
                            hasMore={hasLoad}
                            loader={<></>}
                            style={{ overflowX: 'hidden' }}
                            className={`detail_col element-side-scroll hide_scroll`}>
                            {/* // className={`detail_col element-side-scroll hide_scroll`}> */}
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

                        </InfiniteScroll>



                        {/* <div className="detail_col element-side-scroll">

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
                        </div> */}
                    </div>
                </div>
            </div >
        )
    }
}

export default JobDashboard;