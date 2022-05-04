import React, { useState } from 'react';

interface Proptypes {
    data: any;
    history: any
    editDetailPage: any;
    templateImage: any;
    stepCompleted: Boolean;
    handleStepComplete: (data: any) => void;
    handleStepForward: (data: any) => void;
    handleStepBack: () => void;
}
//  ({ data, stepCompleted, handleStepComplete, handleStepBack }: Proptypes) => {

const JobPostedSuccess = ({ history, data, stepCompleted, handleStepForward, templateImage, handleStepComplete, handleStepBack }: Proptypes) => {
    const [isLoad, setImageLoad] = useState(false);

    const redirectToSuccess = () => {
        history.push('/post-job-success');
    }

    return (
        <>
            {redirectToSuccess()}
        </>
    )
}

export default JobPostedSuccess;
