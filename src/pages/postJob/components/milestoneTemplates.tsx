import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Constants from '../../../utils/constants';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { profileTemplateList, getMileStoneByTempId } from '../../../redux/postJob/actions';
import moment from 'moment';


interface Proptypes {
    data: any;
    stepCompleted: Boolean;
    handleStepComplete: (data: any) => void;
    handleStepForward: (data: any) => void;
    handleCombineMileStones: (data: any) => void;
    handleStepBack: () => void;
}

const MileStoneTemplates = ({ data, stepCompleted, handleCombineMileStones, handleStepForward, handleStepComplete, handleStepBack }: Proptypes) => {
    const [list, setList] = useState([]);

    const preFetch = async () => {
        let { success, data } = await profileTemplateList();
        if (success && data?.length) {
            setList(data)
        }
    }

    const handleContinue = async (id: any) => {
        let { success, data } = await getMileStoneByTempId(id);
        if (success && data) {
            let filter_milestones = data?.milestones?.map((item: any) => ({
                from_date: moment(item?.fromDate).format('MM-DD-YYYY'),
                to_date: item?.toDate?.length ? moment(item?.toDate).format('MM-DD-YYYY') : '',
                milestone_name: item?.milestoneName,
                recommended_hours: item?.recommendedHours
            }))
            handleCombineMileStones(filter_milestones);
            handleStepForward(6);
        }
    }

    useEffect(() => {
        preFetch();
    }, []);

    return (
        <div className="app_wrapper">
            <div className="section_wrapper">
                <div className="custom_container">
                    <div className="form_field">
                        <div className="flex_row">
                            <div className="flex_col_sm_5">
                                <div className="relate">
                                    <button className="back" onClick={() => { handleStepForward(6) }}></button>
                                    <span className="title">{'Milestone Templates'}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex_row">
                            <div className="flex_col_sm_6">
                                <ul className="milestone_templates">
                                    {list?.length ?
                                        list.map(({ templateId, templateName, milestoneCount }: any) => (
                                            <li
                                                onClick={() => { handleContinue(templateId) }}
                                                className="cursor-pointer">
                                                <span className="name">{templateName} </span>
                                                <div className="count">{milestoneCount}
                                                    <span>milestones</span>
                                                </div>
                                            </li>
                                        ))
                                        : null}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MileStoneTemplates;