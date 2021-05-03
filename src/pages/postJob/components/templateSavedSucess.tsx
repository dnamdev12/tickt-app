import React from 'react';
import templateImage from '../../../assets/images/teplate-saved-bg.jpg';

interface Proptypes {
    data: any;
    stepCompleted: Boolean;
    handleStepComplete: (data: any) => void;
    handleStepForward: (data: any) => void;
    handleStepBack: () => void;
}
//  ({ data, stepCompleted, handleStepComplete, handleStepBack }: Proptypes) => {

const TemplateSavedSuccess = ({ data, stepCompleted, handleStepForward, handleStepComplete, handleStepBack }: Proptypes) => {
    return (
        <div className="img_text_wrap">
            <figure className="full_image">
                <img src={templateImage} alt="template-img" />

                <div className="short_info">
                    <div className="content">
                        <h1 className="title">Templete is saved!</h1>
                        <span className="show_label">
                            {'Your template is saved in your Milestone templates. You can edit and chose it when you will post new jobs.'}
                        </span>
                        <button
                            onClick={() => { handleStepForward(6) }}
                            className="fill_btn full_btn">{'OK'}</button>
                    </div>
                </div>
            </figure>
        </div>
    )
}

export default TemplateSavedSuccess
