import React, { Component } from 'react'
import dummy from '../../../assets/images/u_placeholder.jpg';
import approved from '../../../assets/images/approved.png';
import ApplicantsList from './applicantsList';
import { withRouter } from 'react-router-dom'
import noDataFound from '../../../assets/images/no-search-data.png';
import jobTypePlaceholder from '../../../assets/images/job-type-placeholder.png';
import moment from 'moment';
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
    tradeName: any,
    tradieId: any,
    tradeSelectedUrl: any,
    tradieImage: any,

}
interface State {
    isToggleApplicants: boolean
}

interface Props {
    setJobLabel: any,
    dataItems: any,
    applicantsList?: any,
    jobType: any,
    history?: any,
    isLoading: any
}

class NeedApproval extends Component<Props, State> {
    constructor(props: any) {
        super(props)
        this.state = {
            isToggleApplicants: false
        }
    }

    redirectToInfo = ({ jobId, status }: any) => {
        console.log({ jobId, status })
        if (jobId?.length && status?.length) {
            let urlEncode: any = window.btoa(`?jobId=${jobId}&status=${status}`)
            this.props.history.push(`/job-detail?${urlEncode}`);
        }
    }

    setToggle = () => this.setState({ isToggleApplicants: !this.state.isToggleApplicants });


    renderTime = ({ fromDate, toDate }: any) => {
        if (moment(fromDate).isValid() && !moment(toDate).isValid()) {
            return `${moment(fromDate).format('DD MMM')}`
        }

        if (moment(fromDate).isValid() && moment(toDate).isValid()) {
            let yearEnd = moment().endOf("year").toISOString();
            let monthEnd = moment(fromDate).endOf("month").toISOString();

            let item: any = moment(toDate).diff(moment(fromDate), 'months', true);
            let item_year: any = moment(toDate).diff(moment(fromDate), 'years', true);

            let monthDiff = parseInt(item.toString());
            let yearDiff = parseInt(item_year.toString());

            if (yearDiff > 0 || moment(toDate).isAfter(yearEnd) || moment(toDate).isAfter(yearEnd)) {
                return `${moment(fromDate).format('DD MMM YY')} - ${moment(toDate).format('DD MMM YY')}`
            }
            if (monthDiff > 0 || moment(toDate).isAfter(monthEnd)) {
                return `${moment(fromDate).format('DD MMM')} - ${moment(toDate).format('DD MMM')}`
            }
            return `${moment(fromDate).format('DD MMM')} - ${moment(toDate).format('DD')}`
        }
    }

    render() {
        const { setJobLabel, dataItems, applicantsList, jobType, isLoading } = this.props;
        let listData: any = dataItems
        let { isToggleApplicants } = this.state;
        console.log({ applicantsList, isToggleApplicants })
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
                            tradieId,
                            location,
                            tradeSelectedUrl,
                            tradieImage,
                        }: Active) => (
                            <div className="flex_col_sm_6">
                                <div className="tradie_card" data-aos="fade-in" data-aos-delay="250" data-aos-duration="1000">
                                    <span
                                        onClick={() => { this.redirectToInfo({ jobId, status }) }}
                                        className="more_detail circle">
                                    </span>
                                    <div className="user_wrap">
                                        <figure className="u_img">
                                            <img
                                                src={tradeSelectedUrl || jobTypePlaceholder}
                                                alt="traide-img"
                                            />
                                        </figure>
                                        <div className="details">
                                            <span className="name">{tradeName}</span>
                                            <p className="commn_para">{jobName}</p>
                                        </div>
                                    </div>
                                    <div className="job_info">
                                        <ul>
                                            <li className="icon dollar">{amount}</li>
                                            <li className="">
                                                <span>
                                                    {total}
                                                </span>
                                            </li>
                                            <li className="icon calendar">
                                                {this.renderTime({ fromDate, toDate })}
                                            </li>
                                            <li className="">
                                                <span>
                                                    {timeLeft}
                                                </span>
                                            </li>
                                            {/* <li className="icon clock">
                                                
                                            </li>
                                            <li className="icon dollar">{amount}</li>
                                            <li className="icon location line-1">{location}</li>
                                            <li className="icon calendar">{durations}</li> */}
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
                                        {tradieId?.length ? (
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

export default NeedApproval;