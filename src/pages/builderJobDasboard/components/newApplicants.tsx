import React, { ReactElement } from 'react'
import dummy from '../../../assets/images/u_placeholder.jpg';
import approved from '../../../assets/images/approved.png';

interface Applicant {
    amount: any,
    builderId: any,
    builderImage: any,
    durations: any,
    fromDate: any,
    jobDescription: any,
    jobId: any,
    specializationName: any,
    timeLeft: any,
    toDate: any,
    total: any,
    tradeName: any,
    tradeSelectedUrl: any,
}

export default function NewApplicants({ dataItems, jobType, setJobLabel }: any): ReactElement {
    let listData: any = dataItems; 
    console.log({dataItems})
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
                        jobDescription,
                        jobId,
                        specializationName,
                        timeLeft,
                        toDate,
                        total,
                        tradeName,
                        tradeSelectedUrl,
                    }: Applicant) => (
                        <div className="flex_col_sm_6">
                            <div className="tradie_card">
                                <span className="more_detail circle">
                                </span>
                                <div className="user_wrap">
                                    <figure className="u_img">
                                        <img src={dummy} alt="traide-img" />
                                    </figure>
                                    <div className="details">
                                        <span className="name">{tradeName}</span>
                                        <p className="commn_para">{jobDescription}</p>
                                    </div>
                                </div>
                                <div className="job_info">
                                    <ul>
                                        <li className="icon clock">{`${timeLeft} minutes ago`}</li>
                                        <li className="icon dollar">{amount}</li>
                                        <li className="icon location line-1">{'.'}</li>
                                        <li className="icon calendar">{`${durations} days`}</li>
                                    </ul>
                                </div>
                                <button
                                    onClick={() => {
                                        setJobLabel('applicantList', jobId, 1)
                                    }}
                                    className="fill_grey_btn full_btn">
                                    {'Applications'}
                                </button>

                            </div>
                        </div>
                    )) : null}
            </div>
        </React.Fragment>
    )
}
