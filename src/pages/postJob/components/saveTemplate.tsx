import React from 'react';
interface Proptypes {
    data: any;
    stepCompleted: Boolean;
    handleStepComplete: (data: any) => void;
    handleStepForward: (data: any) => void;
    handleStepBack: () => void;
}
//  ({ data, stepCompleted, handleStepComplete, handleStepBack }: Proptypes) => {

const SaveTemplate = ({ data, stepCompleted, handleStepForward, handleStepComplete, handleStepBack }: Proptypes) => {
    return (
        <div className="app_wrapper">

            <div className="section_wrapper">
                <div className="custom_container">
                    <div className="form_field">
                        <div className="flex_row">
                            <div className="flex_col_sm_5">
                                <div className="relate">
                                    <button onClick={() => { handleStepForward(6) }} className="back"></button>
                                    <span className="title">Save as template</span>
                                </div>
                                <p className="commn_para">Add template name. It will be stored in your profile</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex_row">
                        <div className="flex_col_sm_5">
                            <div className="form_field">
                                <label className="form_label">Template name</label>
                                <div className="text_field">
                                    <input type="text" placeholder="This job..." name="name" />
                                </div>
                                <span className="error_msg"></span>
                            </div>
                            <div className="form_field">
                                <button 
                                onClick={() => { handleStepForward(11) }}
                                className="fill_btn full_btn">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SaveTemplate
