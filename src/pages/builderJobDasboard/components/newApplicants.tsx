import React, { ReactElement } from 'react'
import dummy from '../../../assets/images/u_placeholder.jpg';
import approved from '../../../assets/images/approved.png';
import { withRouter } from 'react-router';
import noDataFound from '../../../assets/images/no-data-found.png';
import noData from '../../../assets/images/no-data.png';
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
    tradeId: any,
    LocationName: any,
    specializationId: any,
    tradeName: any,
    tradeSelectedUrl: any,
}

const NewApplicants = (props: any) => {
    const { dataItems, jobType, setJobLabel, isLoading } = props;
    let listData: any = dataItems;
    console.log({ dataItems })


    const redirectToInfo = ({ jobId, tradeId, specializationId }: any) => {
        console.log({ jobId, tradeId, specializationId });
        const props_: any = props;
        props_.history.push(`/job-details-page?jobId=${jobId}&tradeId=${tradeId}&specializationId=${specializationId}`);
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
                        jobDescription,
                        jobId,
                        LocationName,
                        specializationName,
                        specializationId,
                        timeLeft,
                        toDate,
                        total,
                        tradeId,
                        tradeName,
                        tradeSelectedUrl,
                    }: Applicant) => (
                        <div className="flex_col_sm_6">
                            <div className="tradie_card" data-aos="fade-in" data-aos-delay="250" data-aos-duration="1000">
                                <span
                                    onClick={() => { redirectToInfo({ jobId, tradeId, specializationId }) }}
                                    className="more_detail circle">
                                </span>
                                <div className="user_wrap">
                                    <figure className="u_img">
                                        <img src={builderImage || dummy} alt="traide-img" />
                                    </figure>
                                    <div className="details">
                                        <span className="name">{tradeName}</span>
                                    </div>
                                </div>
                                <p className="commn_para line-2">{jobDescription}</p>
                                <div className="job_info">
                                    <ul>
                                        <li className="icon clock">{timeLeft}</li>
                                        <li className="icon dollar">{amount}</li>
                                        <li className="icon location line-1">{LocationName}</li>
                                        <li className="icon calendar">{`${durations} days`}</li>
                                    </ul>
                                </div>
                                <button
                                    onClick={() => {
                                        setJobLabel('applicantList', jobId, 1, specializationId)
                                    }}
                                    className="fill_grey_btn full_btn btn-effect">
                                    {'Applications'}
                                </button>

                            </div>
                        </div>
                    )) :
                    !isLoading && (
                        <div className="no_record">
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