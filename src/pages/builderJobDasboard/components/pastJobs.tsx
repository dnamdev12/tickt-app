import React, { ReactElement, useState, useEffect } from 'react'
import dummy from '../../../assets/images/u_placeholder.jpg';
import approved from '../../../assets/images/approved.png';
import rateStar from '../../../assets/images/ic-star-fill.png';
import noDataFound from '../../../assets/images/no-search-data.png';
import jobTypePlaceholder from '../../../assets/images/job-type-placeholder.png';
import moment from 'moment';
import RateThisJob from './ratethisJob/index';

import { renderTime } from '../../../utils/common';
interface Post {
    amount: any,
    fromDate: any,
    jobData: any,
    jobId: any,
    isRated: any,
    jobName: any,
    locationName: any,
    milestoneNumber: any,
    specializationId: any,
    specializationName: any,
    status: any,
    toDate: any,
    totalMilestones: any,
    tradeId: any,
    tradieId: any,
    tradeName: any,
    tradeSelectedUrl: any,
    isLoading: any,
    tradieData: any,
}


export default function PastJobs(props: any): ReactElement {
    const { dataItems, jobType, isLoading } = props;
    let listData: any = dataItems;
    const [enableRateJob, setRateJob] = useState({ data: {}, isTrue: false }); // toggle-rate-job
    const [currentPage, setCurrentPage] = useState(1);
    let [isEnable, setEnable] = useState<any>(false);

    const redirectToInfo = ({ jobId, status }: any) => {
        if (jobId?.length && status?.length) {
            let urlEncode: any = window.btoa(`?jobId=${jobId}&status=${status}&job=past&activeType=${props?.activeType}`)
            props.history.push(`/job-detail?${urlEncode}`);
        }
    }

    const backToScreen = () => {
        setRateJob((prev: any) => ({
            data: {},
            isTrue: !prev.isTrue
        }));
    }

    useEffect(() => {
        let window_: any = window;
        let document_: any = document;
        function handleScroll() {
            var c = [
                document_.scrollingElement.scrollHeight,
                document_.body.scrollHeight,
                document_.body.offsetHeight].sort((a, b) => { return b - a }) // select longest candidate for scrollable length
            let calculatedItems = (window_.innerHeight + window_.scrollY + 4 >= c[0]);

            if (calculatedItems && !isEnable) {
                // setEnable((prev: any) => !isEnable);
                // console.log({
                //     isEnable,
                //     calculatedItems
                // });
                // setCurrentPage(currentPage + 1);
                // props.getPastJobsBuilder(currentPage + 1);
            }
            return calculatedItems; // compare with scroll position + some give
        }

        window_.addEventListener('scroll', handleScroll, { passive: true });
    }, [])

    if (enableRateJob?.isTrue) {
        return (
            <RateThisJob
                backToScreen={backToScreen}
                data={enableRateJob.data}
                history={null}
                location={null}
            />
        )
    }


    if (isLoading) {
        return (
            <React.Fragment>
                {''}
            </React.Fragment>
        );
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
                        isRated,
                        jobName,
                        locationName,
                        milestoneNumber,
                        specializationId,
                        specializationName,
                        status,
                        toDate,
                        totalMilestones,
                        tradeId,
                        tradieId,
                        tradeName,
                        tradeSelectedUrl,
                        tradieData,
                    }: Post) => (
                        <div className="flex_col_sm_6">
                            <div className="tradie_card" data-aos="fade-in" data-aos-delay="250" data-aos-duration="1000">
                                <span
                                    onClick={() => {
                                        redirectToInfo({ jobId, status })
                                    }}
                                    className="more_detail circle">
                                </span>
                                <div className="user_wrap">
                                    <figure className="u_img">
                                        <img
                                            src={jobData?.tradeSelectedUrl || jobTypePlaceholder}
                                            alt="traide-img" />
                                    </figure>
                                    <div className="details">
                                        <span className="name">{tradeName}</span>
                                        <p className="commn_para">{jobName}</p>
                                    </div>
                                </div>
                                <div className="job_info">
                                    <ul>
                                        <li className="icon calendar">{renderTime(fromDate, toDate)}</li>
                                        <li className="icon dollar">{amount}</li>
                                        <li className="icon location line-1">{locationName}</li>
                                        <li className="job_status">{status}</li>

                                        {/* <li className="icon clock">{renderTime({fromDate,toDate})}</li>
                                        <li className="icon dollar">{amount}</li>
                                        <li className="icon location line-1">{locationName}</li>
                                        <li className="job_status">{status}</li> */}
                                    </ul>
                                </div>
                                <div className="job_progress_wrap" id="scroll-progress-bar">
                                    <div className="progress_wrapper">
                                        <span className="completed-digit" id="digit-progress">
                                            <b>{`Job Milestones ${milestoneNumber} `}</b>{`of ${totalMilestones}`}
                                        </span>
                                        {/* <span className="approval_info">
                                            {status === "Approved" && <img src={approved} alt="icon" />}
                                            {status}
                                        </span> */}
                                        {/* {'Approved'} */} {/* Awaiting */}
                                        {/* <img src={waiting} alt="icon" /> */}
                                        {/* Need approval */}
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
                                    {status === "COMPLETED" ?
                                        !isRated && (<button
                                            onClick={() => {
                                                setRateJob((prev: any) => ({
                                                    data: {
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
                                                        tradieId,
                                                        tradeName,
                                                        tradeSelectedUrl,
                                                        tradieData,
                                                    },
                                                    isTrue: !prev.isTrue
                                                }));
                                            }}
                                            className="fill_grey_btn full_btn">
                                            <React.Fragment>
                                                <img src={rateStar} alt="rating-star" />
                                                {'Rate this tradie'}
                                            </React.Fragment>
                                        </button>
                                        )
                                        : status === "EXPIRED" && (
                                            <button
                                                className="fill_grey_btn full_btn"
                                                onClick={() => redirectToInfo({ jobId, status })}>
                                                {"Publish again"}
                                            </button>
                                        )}
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
