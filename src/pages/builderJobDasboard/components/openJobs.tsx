import React, { Component } from 'react'
import dummy from '../../../assets/images/u_placeholder.jpg';
import approved from '../../../assets/images/approved.png';
import ApplicantsList from './applicantsList';
import { withRouter } from 'react-router-dom'
import noDataFound from '../../../assets/images/no-search-data.png';
import jobTypePlaceholder from '../../../assets/images/job-type-placeholder.png';
import moment from 'moment';
import { renderTime } from '../../../utils/common';
import ListQuotes from './quoteJobs/ListQuotes';
import ViewQuote from './quoteJobs/viewQuote';

import { quoteByJobId } from '../../../redux/quotes/actions';

interface Active {
    amount: any,
    durations: any,
    jobId: any,
    jobName: any,
    fromDate: any,
    toDate: any,
    milestoneNumber: any,
    specializationId: any,
    specializationName: any,
    status: any,
    timeLeft: any,
    total: any,
    totalmem: any,
    location: any,
    locationName: any,
    totalMilestones: any,
    tradieListData: any,
    quoteCount: any,
    quoteJob: any,
    tradeName: any,
    tradieId: any,
    tradeSelectedUrl: any,
    tradieImage: any,
}
interface State {
    isToggleApplicants: boolean,
    quotesData: any,
    toggleQuoteSort: boolean,
}

interface Props {
    setJobLabel: any,
    dataItems: any,
    applicantsList?: any,
    jobType: any,
    history?: any,
    isLoading: any,
    activeType?: any
}

class OpenJobs extends Component<Props, State> {
    constructor(props: any) {
        super(props)
        this.state = {
            isToggleApplicants: false,
            quotesData: [],
            toggleQuoteSort: true
        }
    }

    redirectToInfo = ({ jobId, status }: any) => {
        let props: any = this.props;
        if (jobId?.length && status?.length) {
            // let urlEncode: any = window.btoa(`?jobId=${jobId}&status=${status}&activeType=${props?.activeType}`)
            let urlEncode: any = `?jobId=${jobId}&status=${status}&activeType=${props?.activeType}`
            this.props.history.push(`/job-detail?${urlEncode}`);
        } else {
            // let urlEncode: any = window.btoa(`?jobId=${jobId}&status=${'open'}&activeType=${props?.activeType}`)
            let urlEncode: any = `?jobId=${jobId}&status=${'open'}&activeType=${props?.activeType}`
            this.props.history.push(`/job-detail?${urlEncode}`);
        }
    }

    componentDidMount() {
        // this.preFetchForQuotes();
    }

    // preFetchForQuotes = () => {
    //     const props: any = this.props;
    //     const params = new URLSearchParams(props?.history?.location?.search);
    //     const quotes_param: any = params.get('quotes');
    //     const viewQuotesParam: any = params.get('viewQuotes');
    //     const jobId: any = params.get('jobId');

    //     const { toggleQuoteSort } = this.state;
    //     if (jobId?.length) {
    //         if (quotes_param === "true") {
    //             this.fetchQuotesById(jobId, 1)
    //         } else {
    //             this.fetchQuotesById(jobId, 1)
    //         }
    //     }
    // }

    // fetchQuotesById = async (jobId: String, sortBy: Number) => {
    //     let result = await quoteByJobId({ jobId, sortBy });
    //     console.log({ result });
    //     if (result?.success) {
    //         let data = result?.data?.resultData;
    //         if (data) {
    //             this.setState({ quotesData: data })
    //         }
    //     }
    // }

    setToggle = () => this.setState({ isToggleApplicants: !this.state.isToggleApplicants });

    // setToggleSort = () => {
    //     this.setState({
    //         toggleQuoteSort: !this.state.toggleQuoteSort
    //     });
    // }

    render() {
        // props defined & render by params
        const props: any = this.props;
        const params = new URLSearchParams(props?.history?.location?.search);
        const quotes_param: any = params.get('quotes');
        const viewQuotesParam: any = params.get('viewQuotes');
        const jobId: any = params.get('jobId');

        const { setJobLabel, dataItems, applicantsList, jobType, isLoading } = this.props;
        let listData: any = dataItems
        let { isToggleApplicants, quotesData, toggleQuoteSort } = this.state;


        if (isLoading) {
            return null;
        }

        // if (quotes_param === 'true') {
        //     return (
        //         <ListQuotes
        //             {...this.props}
        //             jobId={jobId}
        //             history={this.props.history}
        //             quotes_param={quotes_param}
        //             // quotesData={quotesData}
        //             // setToggleSort={this.setToggleSort}
        //             // toggleQuoteSort={toggleQuoteSort}
        //         />
        //     )
        // }

        // if (viewQuotesParam === 'true') {
        //     return (
        //         <ViewQuote
        //             {...this.props}
        //             history={this.props.history}
        //             // quotes_param={viewQuotesParam}
        //             // quotesData={quotesData}
        //         />
        //     )
        // }

        return (
            <React.Fragment>
                <span className="sub_title">{jobType.charAt(0).toUpperCase() + jobType.slice(1)} Jobs
                    {/* {listData?.length} */}
                </span>
                <div className="flex_row tradies_row">
                    {listData?.length ?
                        listData.map(({
                            amount,
                            durations,
                            jobId,
                            jobName,
                            fromDate,
                            toDate,
                            milestoneNumber,
                            specializationId,
                            specializationName,
                            locationName,
                            status,
                            timeLeft,
                            total,
                            totalmem,
                            totalMilestones,
                            tradieListData,
                            tradeName,
                            quoteCount,
                            quoteJob,
                            tradieId,
                            location,
                            tradeSelectedUrl,
                            tradieImage,
                        }: Active) => (
                            <div className="flex_col_sm_6">
                                <div className="tradie_card" data-aos="fade-in" data-aos-delay="250" data-aos-duration="1000">
                                    <span
                                        onClick={() => {
                                            this.redirectToInfo({ jobId, status })
                                        }}
                                        className="more_detail circle">
                                    </span>
                                    <div className="user_wrap">
                                        <figure className="u_img">
                                            <img
                                                src={tradeSelectedUrl || jobTypePlaceholder}
                                                alt="traide-img"
                                                onError={(e: any) => {
                                                    if (e?.target?.onerror) {
                                                        e.target.onerror = null;
                                                    }
                                                    if (e?.target?.src) {
                                                        e.target.src = jobTypePlaceholder;
                                                    }
                                                }}
                                            />
                                        </figure>
                                        <div className="details">
                                            <span className="name">{tradeName || '0'}</span>
                                            <p className="commn_para">{jobName}</p>
                                        </div>
                                    </div>
                                    <div className="job_info">
                                        {quoteJob ? (
                                            <ul>
                                                <li className="icon dollar">{'for quoting'}</li>
                                                <li className="">
                                                </li>
                                                <li className="icon calendar">
                                                    {renderTime(fromDate, toDate)}
                                                </li>
                                                <li>
                                                    <span>
                                                        {timeLeft}
                                                    </span>
                                                </li>
                                            </ul>
                                        ) : (
                                            <ul>
                                                <li className="icon dollar">{amount}</li>
                                                <li className="">
                                                    <span>
                                                        {total}
                                                    </span>
                                                </li>
                                                <li className="icon calendar">
                                                    {renderTime(fromDate, toDate)}
                                                </li>
                                                <li>
                                                    <span>
                                                        {timeLeft}
                                                    </span>
                                                </li>
                                            </ul>
                                        )}

                                    </div>
                                    <div className="job_progress_wrap" id="scroll-progress-bar">
                                        <div className="progress_wrapper">
                                            <span className="completed-digit" id="digit-progress">
                                                <b>{`Job Milestones ${milestoneNumber} `}</b>{`of ${totalMilestones}`}
                                            </span>
                                            <span className="approval_info">
                                                {status === "Approved" && <img src={approved} alt="icon" />}
                                                {status}
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

                                        {quoteJob ? (
                                            <button
                                                onClick={() => {
                                                    if (quoteCount?.length || quoteCount) {
                                                        this.props.setJobLabel('listQuote');
                                                        this.props.history.replace(`/jobs?active=open&quote=true&jobId=${jobId}`)
                                                    }
                                                }}
                                                className="fill_grey_btn full_btn btn-effect">
                                                {`${quoteCount} Quotes`}
                                            </button>
                                        ) : null}
                                        {!quoteJob && tradieId?.length ? (
                                            <button
                                                onClick={() => {
                                                    this.setToggle();
                                                    setJobLabel('applicantList', jobId, 1, specializationId);
                                                }}
                                                className="fill_grey_btn full_btn btn-effect">
                                                {'Applications'}
                                            </button>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        )) : !isLoading && (
                            <div className="no_record  m-t-vh">
                                <figure className="no_img">
                                    <img src={noDataFound} alt="data not found" />
                                </figure>
                                <span>{'No Data Found'}</span>
                            </div>
                        )}
                </div>
            </React.Fragment>
        )
    }
}

export default OpenJobs;