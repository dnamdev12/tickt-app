import React, { ReactElement, useState, useEffect } from 'react'
import dummy from '../../../assets/images/u_placeholder.jpg';
import approved from '../../../assets/images/approved.png';
import ApplicantsList from './applicantsList';
interface Active {
    amount: any,
    durations: any,
    jobId: any,
    jobName: any,
    milestoneNumber: any,
    specializationId: any,
    specializationName: any,
    status: any,
    timeLeft: any,
    totalmem: any,
    totalMilestones: any,
    tradieListData: any,
    tradeName: any,
    tradieId: any,
    tradieImage: any,
}


const results: any = [
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
    },
    {
        "tradieId": "608859be15c9ec2ff6fb7865",
        "tradieImage": "",
        "tradieName": "name",
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
                "specializationId": "6066fca0cc682b18cd57a4c2",
                "specializationName": "Machine Maintenance"
            },
            {
                "specializationId": "6066fca0cc682b18cd57a4c3",
                "specializationName": "Circuit Board Wiring"
            },
            {
                "specializationId": "6066fca0cc682b18cd57a4c4",
                "specializationName": "Telecomms Line Installation"
            },
            {
                "specializationId": "6066fca0cc682b18cd57a4c5",
                "specializationName": "Highway Systems"
            },
            {
                "specializationId": "6066fca0cc682b18cd57a4c6",
                "specializationName": "Security and Fire Alarm Installation"
            },
            {
                "specializationId": "6066fca0cc682b18cd57a4c7",
                "specializationName": "Electrical Instrumentation"
            },
            {
                "specializationId": "6066fca0cc682b18cd57a4c8",
                "specializationName": "Electrical Inspection"
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

export default function OpenJobs({ setJobLabel, dataItems, applicantsList, jobType, }: any): ReactElement {
    let data_item: any = dataItems;
    let listData: any = data_item[`${jobType}Jobs`][`${jobType}`];

    const [isToggleApplicants, setToggleApplicants] = useState(false);

    useEffect(() => {

    }, [isToggleApplicants])

    console.log({ isToggleApplicants, applicantsList, dataItems, jobType, })
    return (
        <React.Fragment>
            {isToggleApplicants ? (
                <ApplicantsList
                    setJobLabel={setJobLabel}
                    items={applicantsList}
                />
            ) : (
                <React.Fragment>

                    <span className="sub_title">{jobType.charAt(0).toUpperCase() + jobType.slice(1)} Jobs</span>
                    <div className="flex_row tradies_row">
                        {listData?.length ?
                            listData.map(({
                                amount,
                                durations,
                                jobId,
                                jobName,
                                milestoneNumber,
                                specializationId,
                                specializationName,
                                status,
                                timeLeft,
                                totalmem,
                                totalMilestones,
                                tradieListData,
                                tradeName,
                                tradieId,
                                tradieImage,
                            }: Active) => (
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
                                                <p className="commn_para">{jobName}</p>
                                            </div>
                                        </div>
                                        <div className="job_info">
                                            <ul>
                                                <li className="icon clock">{timeLeft}</li>
                                                <li className="icon dollar">{amount}</li>
                                                <li className="icon location line-1">{''}</li>
                                                <li className="icon calendar">{durations}</li>
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
                                                    {/* {'Approved'} */} {/* Awating */}
                                                    {/* <img src={waiting} alt="icon" /> */}
                                                    {/* Need approval */}
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
                                            <button
                                                onClick={() => {
                                                    setToggleApplicants(!isToggleApplicants);
                                                    setJobLabel({ title: 'applicantList', jobId: jobId });
                                                }}
                                                className="fill_grey_btn full_btn">
                                                {'Applications'}
                                                {/* <img src={rateStar} alt="rating-star" />
                                        {'Rate this job'} */}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )) : null}
                    </div>
                </React.Fragment>
            )}
        </React.Fragment>
    )
}
