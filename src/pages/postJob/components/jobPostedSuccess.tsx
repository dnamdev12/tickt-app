import React from 'react';
import templateImage from '../../../assets/images/job-posted-bg.jpg';


interface Proptypes {
    data: any;
    editDetailPage:any;
    stepCompleted: Boolean;
    handleStepComplete: (data: any) => void;
    handleStepBack: () => void;
}
//  ({ data, stepCompleted, handleStepComplete, handleStepBack }: Proptypes) => {

const JobPostedSuccess = ({ data, stepCompleted, handleStepComplete, handleStepBack }: Proptypes) => {
    return (
        <div className="img_text_wrap">
        <figure className="full_image">
            <img src={templateImage} alt="template-image" />

            <div className="short_info">
                <div className="content">
                    <h1 className="title">Job posted!</h1>
                    <span className="show_label">Your job will be sent to the most suitable candidates in your area.</span>
                    <button className="fill_btn full_btn">OK</button>
                </div>
            </div>
        </figure>
    </div>
    )
}

export default JobPostedSuccess
