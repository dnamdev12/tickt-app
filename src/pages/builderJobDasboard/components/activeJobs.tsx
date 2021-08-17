import React, { ReactElement, useState, useEffect } from 'react'
import dummy from "../../../assets/images/u_placeholder.jpg";
import approved from '../../../assets/images/approved.png';
import waiting from '../../../assets/images/exclamation.png';
import MarkMilestones from './markMilestones';
import { withRouter } from 'react-router-dom';
import noDataFound from '../../../assets/images/no-search-data.png';
import jobTypePlaceholder from '../../../assets/images/job-type-placeholder.png';
import LodgeDispute from './lodgeDispute/lodgeDispute';
import CancelJobs from './cancelJobs/cancelJob';
import { renderTime } from '../../../utils/common';
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
    locationName: any,
    total: any,
    totalmem: any,
    totalMilestones: any,
    tradieListData: any,
    tradeName: any,
    location: any,
    tradieId: any,
    tradieImage: any,
    tradeSelectedUrl: any,
    activeType: any,
    setJobLabel: (item: any) => void,
    enableEditMilestone: boolean,
    enableLodgeDispute: boolean,
    enableCancelJob: boolean
    globalJobId: string,
    mathrandom?: any
}

const ActiveJobs = ({
    setJobLabel,
    activeType,
    history,
    dataItems,
    jobType,
    isLoading,
    enableEditMilestone,
    enableLodgeDispute,
    enableMakMilestone,
    enableCancelJob,
    globalJobId
}: any) => {
    let listData: any = dataItems;
    const [selectedIndex, setSelectedIndex] = useState<any>(null);
    const [localState, setLocalState] = useState(false);

    const resetStateLocal = (isTrue: boolean) => {
        setJobLabel(activeType);
        setLocalState(false)
        if (isTrue) {
            history.push('/decline-milestone-success');
        }
    }

    useEffect(() => {
        console.log('here!')
    }, [jobType]);


    useEffect(() => {
        let filteredItem: any = {};
        listData.forEach((item_: any, index: any) => {
            if (item_.jobId === globalJobId) {
                filteredItem = {
                    ...item_,
                    index
                }
            }
        })

        if (Object.keys(filteredItem)?.length) {
            setSelectedIndex(filteredItem?.index);
            setLocalState(true);
        }
    }, [enableEditMilestone, enableLodgeDispute, enableCancelJob, enableMakMilestone]);

    // const redirectToInfo = ({ jobId, status }: any) => {
    //     if (jobId?.length && status?.length) {
    //         let urlEncode: any = window.btoa(`?jobId=${jobId}&status=${status}&edit=true`)
    //         history.push(`/job-detail?${urlEncode}`);
    //     }
    // }

    if (localState && selectedIndex !== null) {
        console.log({ localState, selectedIndex, listData })
        return (
            <MarkMilestones
                resetStateLocal={resetStateLocal}
                selectedIndex={selectedIndex}
                listData={listData}
                enableEditMilestone={enableEditMilestone}
                enableLodgeDispute={enableLodgeDispute}
                enableCancelJob={enableCancelJob}
            />)
    }

    if (isLoading || listData == undefined) {
        return null;
    }

    console.log({ listData, isLoading })
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
                        status,
                        timeLeft,
                        location,
                        locationName,
                        total,
                        totalmem,
                        totalMilestones,
                        tradieListData,
                        tradeName,
                        tradieId,
                        tradeSelectedUrl,
                        tradieImage,
                        mathrandom,
                    }: Active, index: number) => (
                        <div className="flex_col_sm_6">
                            <div className="tradie_card"
                                data-aos="fade-in"
                                data-aos-delay="250"
                                data-aos-duration="1000"
                            >
                                <span className="more_detail circle"
                                    onClick={() => {
                                        setLocalState(true);
                                        setSelectedIndex(index);
                                        // redirectToInfo({ jobId, tradieId, specializationId, status });
                                    }}>
                                </span>
                                <div className="user_wrap">
                                    <figure className="u_img">
                                        <img
                                            src={tradeSelectedUrl || jobTypePlaceholder}
                                            alt="traide-img" />
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
                                            {/* {durations} */}
                                            {renderTime(fromDate, toDate)}
                                        </li>
                                        <li className="">
                                            <span>
                                                {timeLeft}
                                            </span>
                                        </li>

                                        {/* <li className="icon clock">{durations}</li>
                                        <li className="icon dollar">{amount}</li>
                                        <li className="icon location line-1">{location}</li>
                                        <li className="icon calendar">{timeLeft}</li> */}
                                    </ul>
                                </div>
                                <div className="job_progress_wrap" id="scroll-progress-bar">
                                    <div className="progress_wrapper">
                                        <span className="completed-digit" id="digit-progress">
                                            <b>{`Job Milestones ${milestoneNumber} `}</b>{`of ${totalMilestones}`}
                                        </span>
                                        <span className="approval_info">
                                            {(status).toUpperCase() === "APPROVED" && <img src={approved} alt="icon" />}
                                            {((status).toUpperCase() === "NEEDS APPROVAL" || (status).toUpperCase() === "NEED APPROVAL") && (
                                                <img src={waiting} alt="icon" />
                                            )}
                                            {status}
                                            {/* {(status).toUpperCase() === "ACCEPTED CHANGE REQUEST"
                                                ? "ACCEPTED C.R "
                                                : (status).toUpperCase()  === 'PENDING CHANGE REQUEST'
                                                    ? 'PENDING C.R'
                                                    : status}
                                                    {console.log({
                                                        status
                                                    })} */}
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
                                    {(status === "NEEDS APPROVAL" || status === "NEED APPROVAL" || status === "need approval") && (
                                        <button
                                            onClick={() => {
                                                setLocalState(true);
                                                setSelectedIndex(index);
                                            }}
                                            className="fill_grey_btn full_btn btn-effect">
                                            {'Approve'}
                                            {/* <img src={rateStar} alt="rating-star" />
                                        {'Rate this job'} */}
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
                        </div>)}
            </div>
        </React.Fragment>
    )
}


export default withRouter(ActiveJobs);