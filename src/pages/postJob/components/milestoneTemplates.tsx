import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Constants from '../../../utils/constants';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { profileTemplateList } from '../../../redux/postJob/actions'

interface Proptypes {
    data: any;
    stepCompleted: Boolean;
    handleStepComplete: (data: any) => void;
    handleStepForward: (data: any) => void;
    handleStepBack: () => void;
}

const MileStoneTemplates = ({ data, stepCompleted, handleStepForward, handleStepComplete, handleStepBack }: Proptypes) => {
    const [list, setList] = useState([]);

    const preFetch = async () => {
        let { success, data } = await profileTemplateList();
        if (success && data?.length) {
            setList(data)
        }
    }

    useEffect(() => {
        preFetch();
    }, [data, list])

    return (
        <div className="app_wrapper">
            <div className="section_wrapper">
                <div className="custom_container">
                    <div className="form_field">
                        <div className="flex_row">
                            <div className="flex_col_sm_5">
                                <div className="relate">
                                    <button className="back" onClick={() => { handleStepForward(6) }}></button>
                                    <span className="title">Milestone Templates</span>
                                </div>
                                {/* <p className="commn_para">How mach will you pay for a job</p> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MileStoneTemplates;