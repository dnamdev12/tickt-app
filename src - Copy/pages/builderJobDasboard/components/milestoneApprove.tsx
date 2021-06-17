import React, { useState } from 'react'
import media from '../../../assets/images/portfolio-placeholder.jpg';
import DeclineMilestone from './declineMilestone';
import { milestoneAcceptOrDecline } from '../../../redux/homeSearch/actions'

interface Props {
    backToScreen: any,
    data: any,
    resetStateLocal: any
}

const MilestoneApprove = ({ backToScreen, data, resetStateLocal }: Props) => {
    const [isToggle, setToggle] = useState(false);
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
            }
            let response: any = await milestoneAcceptOrDecline(data);
            if (response?.status) {
                resetStateLocal();
            }
        }

        const toggleBack = () => {
            setToggle(false);
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
                            {images.map((image: any) => (
                                <figure className="img_video">
                                    <img src={image} alt="media" />
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
                    <button onClick={onSubmitAccept} className="fill_btn full_btn">Approve</button>
                    <button onClick={() => { setToggle(true) }} className="fill_grey_btn full_btn btn-effect mt-15">Decline</button>
                </div>
            </div>
        )
    }
    return null;
}

export default MilestoneApprove;