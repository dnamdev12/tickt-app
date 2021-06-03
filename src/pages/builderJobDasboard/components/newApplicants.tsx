import React, { ReactElement } from 'react'
import dummy from '../../../assets/images/u_placeholder.jpg';
import approved from '../../../assets/images/approved.png';
import { withRouter } from 'react-router';
import noDataFound from '../../../assets/images/no-search-data.png';
import noData from '../../../assets/images/no-search-data.png';
import moment from 'moment';
interface Applicant {
    amount: any,
    builderId: any,
    builderImage: any,
    durations: any,
    fromDate: any,
    jobName: any,
    jobDescription: any,
    jobId: any,
    specializationName: any,
    timeLeft: any,
    toDate: any,
    total: any,
    tradeId: any,
    location: any,
    location_name: any,
    specializationId: any,
    tradeName: any,
    tradieId: any,
    tradeSelectedUrl: any,
}

const NewApplicants = (props: any) => {
    const { dataItems, jobType, setJobLabel, isLoading } = props;
    let listData: any = dataItems;
    console.log({ dataItems })


    const redirectToInfo = ({ jobId }: any) => {
        console.log({ jobId });
        const props_: any = props;
        if (jobId?.length) {
            let urlEncode: any = window.btoa(`?jobId=${jobId}`)
            props_.history.push(`/job-detail?${urlEncode}`);
        }
    }

    const renderTime = ({ fromDate, toDate }: any) => {
        if (moment(fromDate).isValid() && !moment(toDate).isValid()) {
            return `${moment(fromDate).format('DD MMM')}`
        }

        if (moment(fromDate).isValid() && moment(toDate).isValid()) {
            let item: any = moment(toDate).diff(moment(fromDate), 'months', true);
            let item_year: any = moment(toDate).diff(moment(fromDate), 'years', true);
            let monthDiff = parseInt(item.toString());
            let yearDiff = parseInt(item_year.toString());
            if (yearDiff > 0) {
                return `${moment(fromDate).format('DD MMM YY')} - ${moment(toDate).format('DD MMM YY')}`
            }
            if (monthDiff > 0) {
                return `${moment(fromDate).format('DD MMM')} - ${moment(toDate).format('DD MMM')}`
            }
            return `${moment(fromDate).format('DD MMM')} - ${moment(toDate).format('DD')}`
        }
    }

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
                        jobName,
                        jobDescription,
                        jobId,
                        location,
                        location_name,
                        specializationName,
                        specializationId,
                        timeLeft,
                        toDate,
                        total,
                        tradeId,
                        tradieId,
                        tradeName,
                        tradeSelectedUrl,
                    }: Applicant) => (
                        <div className="flex_col_sm_6">
                            <div className="tradie_card" data-aos="fade-in" data-aos-delay="250" data-aos-duration="1000">
                                <span
                                    onClick={() => { redirectToInfo({ jobId }) }}
                                    className="more_detail circle">
                                </span>
                                <div className="user_wrap">
                                    <figure className="u_img">
                                        <img src={tradeSelectedUrl || dummy} alt="traide-img" />
                                    </figure>
                                    <div className="details">
                                        <span className="name">{tradeName}</span>
                                        <p className="commn_para">{jobName}</p>
                                    </div>
                                </div>
                                <p className="commn_para line-2">{jobDescription}</p>
                                <div className="job_info">
                                    <ul>
                                        <li className="icon dollar">{amount}</li>
                                        <li className="">
                                            <span>
                                                {total}
                                            </span>
                                        </li>
                                        <li className="icon calendar">
                                            {renderTime({ fromDate, toDate })}
                                        </li>
                                        <li className="">
                                            <span>
                                                {timeLeft}
                                            </span>
                                        </li>
                                        {/* <li className="icon clock">{renderTime({fromDate,toDate})}</li>
                                        <li className="icon dollar">{amount}</li>
                                        <li className="icon location line-1">{location_name }</li>
                                        <li className="icon calendar">{`${durations}`}</li> */}
                                    </ul>
                                </div>
                                {/* {tradieId?.length ? ( */}
                                <button
                                    onClick={() => {
                                        setJobLabel('applicantList', jobId, 1, specializationId)
                                    }}
                                    className="fill_grey_btn full_btn btn-effect">
                                    {'Applications'}
                                </button>
                                {/* ) : null} */}
                            </div>
                        </div>
                    )) :
                    !isLoading && (
                        <div className="no_record  m-t-vh">
                            <figure className="no_img">
                                <img src={noData} alt="data not found" />
                            </figure>
                        </div>
                    )}
            </div>
        </React.Fragment>
    )
}

export default withRouter(NewApplicants)