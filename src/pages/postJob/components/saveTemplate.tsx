import { te } from 'date-fns/locale';
import React, { useEffect, useState } from 'react';
import { useStore } from 'react-redux';
import { addTemplate } from '../../../redux/jobs/actions'
interface Proptypes {
    data: any;
    milestones: any;
    stepCompleted: Boolean;
    handleStepComplete: (data: any) => void;
    handleStepForward: (data: any) => void;
    handleCombineMileStones: (data: any) => void;
    handleStepBack: () => void;
}
//  ({ data, stepCompleted, handleStepComplete, handleStepBack }: Proptypes) => {

const SaveTemplate = ({ data, milestones, stepCompleted, handleCombineMileStones, handleStepForward, handleStepComplete, handleStepBack }: Proptypes) => {
    const [templateName, setTemplateName] = useState('' as any);
    const [error, setError] = useState('' as any);

    const checkError = () => {
        if(!error?.length && templateName?.length){
            return false;
        }
        return true;
    }

    const handleContinue = async () => {

        if (!templateName?.length) {
            setError('please enter template name.');
            return
        }
        let filter_milestone = milestones.filter((item: any) => {
            if (Object.keys(item).length) {
                if (!item?.to_date?.length) {
                    delete item.to_date;
                }
                return item
            }
        })

        let { success, data } = await addTemplate({
            template_name: templateName,
            milestones: filter_milestone
        })
        if (success) {
            handleCombineMileStones([]);
            handleStepForward(11);
        }
    }

    const handleChange = (value: any) => {
         if (templateName?.length && templateName?.length > 50) {
            setError('limit exceed to 50 characters.');
        } else {
            setError('');
        }
        setTemplateName(value)
    }

    console.log({error})
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
                                    <input
                                        onChange={(e) => {
                                            handleChange(e.target.value);
                                        }}
                                        value={templateName}
                                        type="text" placeholder="This job..." name="name" />
                                </div>
                                <span className="error_msg">{error}</span>
                            </div>
                            <div className="form_field">
                                <button
                                    onClick={handleContinue}
                                    className={`fill_btn full_btn ${checkError() ? 'disable_btn' : ''}`}>
                                    {'Save'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SaveTemplate
