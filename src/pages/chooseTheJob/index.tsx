import React, { useState } from 'react'
import milestonesPlaceholder from '../../assets/images/Job milestones-preview.png';
import { renderTimeWithFormat } from '../../utils/common';
import CancelJobSuccess from './success';

const ChooseTheJob = () => {

    const [editItem, setEditItems] = useState<{ [index: string]: any }>({});
    const [stateData, setStateData] = useState([1,2,3,4]);

    const checkOnClick = (e: any, index: any) => {
        let edit_item_clone: any = editItem;
        edit_item_clone[index] = e.target.checked;
        setEditItems((prev) => ({ ...prev, ...edit_item_clone }));
    }

    return (
        <div className="app_wrapper">
            <div className="section_wrapper">
                <div className="custom_container">
                    <div className="form_field">
                        <div className="flex_row">
                            <div className="flex_col_sm_5">

                                <React.Fragment>
                                    <div className="relate">
                                        <button
                                            className="back"
                                            onClick={() => { }}
                                        >
                                        </button>
                                        <span className="title">
                                            {'Choose the job'}
                                        </span>
                                    </div>
                                </React.Fragment>
                            </div>
                        </div>
                    </div>

                    <div className="flex_row">
                        <div className="flex_col_sm_5">
                            <ul className={`milestones`}>
                                {stateData?.length > 0 ?
                                    stateData.map((item, index) => (
                                        <li key={index}>
                                            <div className="checkbox_wrap agree_check">
                                                <input
                                                    checked={editItem[index]}
                                                    onChange={(e: any) => { checkOnClick(e, index) }}
                                                    className="filter-type filled-in"
                                                    type="checkbox"
                                                    id={`milestone${index}`} />
                                                <label
                                                    htmlFor={`milestone${index}`}>
                                                    {`${'Job Name'}`}
                                                </label>
                                                <div className="info">
                                                    <span>{'To wire up circuit board'}</span>
                                                    <span>
                                                        {renderTimeWithFormat('06-12-2021', '23-12-2021', 'MM-DD-YYYY')}
                                                    </span>
                                                </div>
                                            </div>
                                        </li>
                                    )) : (
                                        <figure className="placeholder_img">
                                            <img
                                                src={milestonesPlaceholder}
                                                alt="milestones-placeholder"
                                            />
                                        </figure>
                                    )}


                                <div style={{marginTop:'50px'}} className="form_field">
                                    <button
                                        onClick={() => {}}
                                        className="fill_btn full_btn btn-effect">
                                        {'Invite for the job'}
                                    </button>
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ChooseTheJob;
