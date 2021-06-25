import React, { useState } from 'react'
import media from '../../../assets/images/portfolio-placeholder.jpg';
import DeclineMilestone from './declineMilestone';
import { milestoneAcceptOrDecline } from '../../../redux/homeSearch/actions'

import FixedRate from './confirmAndPay/fixedRate';
import { withRouter } from 'react-router-dom';

// interface Props {
//     backToScreen: any,
//     data: any,
//     resetStateLocal: any
// }

const MilestoneApprove = (props: any) => {
    const { backToScreen, data, resetStateLocal } = props;
    const [isToggle, setToggle] = useState(false);
    const [IsToggleAccept, setToggleAccept] = useState(false);
    console.log({ data });

    if (data) {
        let {
            selectedMilestoneIndex: { index },
            itemDetails: { milestones },
            selectedMile: { description, hoursWorked, images },
            selectedItem: { jobName, jobId }
        } = data;

        let item: any = milestones[index];

        const onSubmitAccept = async () => {
            let data = {
                "status": 1,
                "jobId": jobId,
                "milestoneId": item?.milestoneId,
                // "reason": "Not approved",
                // "url":[]
            }

            let response: any = await milestoneAcceptOrDecline(data);
            if (response?.success) {
                resetStateLocal();
                props.history.push('/need-approval-success');
            }
        }

        const toggleBack = () => {
            setToggle(false);
            setToggleAccept(false);
        }

        if (IsToggleAccept) {
            return (
                <FixedRate
                    data={props.data}
                    toggleBack={toggleBack}
                    onSubmitAccept={onSubmitAccept}
                />
            )
        }


        if (isToggle) {
            return (
                <DeclineMilestone
                    milestoneAcceptOrDecline={milestoneAcceptOrDecline}
                    jobId={jobId}
                    jobName={jobName}
                    toggleBack={toggleBack}
                    resetStateLocal={resetStateLocal}
                    milestoneId={item?.milestoneId}
                />)
        }
        return (
            <div className="flex_row">
                <div className="flex_col_sm_8">
                    <div className="relate">
                        <button onClick={() => { backToScreen() }} className="back"></button>
                        <span className="xs_sub_title">
                            {jobName}
                        </span>
                    </div>
                    <span className="sub_title">Milestone details</span>
                    <span className="xs_sub_title">{item?.milestoneName} complete</span>
                    {console.log({ images })}
                    {images && Array.isArray(images) && images?.length ?
                        <div className="upload_img_video">
                            {images.map((media_item: any) => (
                                <figure className="img_video">
                                    {media_item?.mediaType == 1 && (
                                        <img src={media_item?.link} alt="media" />
                                    )}

                                    {media_item?.mediaType == 2 && ( 
                                        <video src={media_item?.link} />
                                    )}

                                    {/* <img src={close} alt="remove" className="remove" /> */}
                                </figure>
                            ))}
                        </div>
                        : null}

                    <div className="form_field">
                        <span className="xs_sub_title">Description</span>
                        <p className="commn_para">{description || ''}</p>
                    </div>

                    <div className="form_field">
                        <span className="xs_sub_title">Hours worked in this milestone</span>
                        <span className="show_label">{`${hoursWorked || 0} hours`}</span>
                    </div>
                    <div className="form_field">
                        {/* onSubmitAccept */}
                        <button
                            onClick={() => {
                                setToggleAccept(true)
                            }}
                            className="fill_btn full_btn">Approve</button>
                    </div>
                    <div className="form_field">
                        <button
                            onClick={() => { setToggle(true) }}
                            className="fill_grey_btn full_btn btn-effect mt-15">
                            {'Decline'}
                        </button>
                    </div>
                </div>
            </div>
        )
    }
    return null;
}

export default withRouter(MilestoneApprove);