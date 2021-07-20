import React, { useEffect, useState, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Constants from '../../../../utils/constants';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { profileTemplateList, getMileStoneByTempId } from '../../../../redux/jobs/actions';
import moment from 'moment';
import noData from '../../../../assets/images/no-search-data.png';

import JobMilestones from './jobMilestones';

interface Proptypes {
    data: any;
    isLoading: any,
    stepCompleted: Boolean;
    handleStepComplete: (data: any) => void;
    handleStepForward: (data: any) => void;
    handleCombineMileStones: (data: any) => void;
    handleStepBack: () => void;
}

const MileStoneTemplates = (props: Proptypes) => {
    const { data, isLoading, stepCompleted, handleCombineMileStones, handleStepForward, } = props;
    const [list, setList] = useState([]);
    const [localFetch, setLocalFetch] = useState(false);
    const [toggleJobMilestone, setToggleJobMilestone] = useState({ toggle: false, ItemId: '' });

    const preFetch = async () => {
        let { success, data } = await profileTemplateList();
        if (success && data?.length) {
            setList(data)
            setLocalFetch(true)
        }
    }

    const formatMilestones = ({ items }: any) => {
        let miles: any = items?.milestones;
        if (miles?.length) {
            return miles.map((item: any) => {
                if (item?.fromDate) {
                    item['fromDate'] = moment(item?.fromDate).format('MM-DD-YYYY');
                }

                if (item?.toDate) {
                    item['toDate'] = moment(item?.toDate).format('MM-DD-YYYY');
                }

                return item;
            })
        }
    }

    const handleContinue = async (id: any) => {
        let { success, data } = await getMileStoneByTempId(id);

        if (success && data) {
            let { to_date, from_date } = props?.data;
            let selected_milestone: any = formatMilestones({ items: data });

            let filter_milestones = data?.milestones?.map((item: any) => ({
                from_date: moment(item?.fromDate).format('MM-DD-YYYY'),
                to_date: item?.toDate?.length ? moment(item?.toDate).format('MM-DD-YYYY') : '',
                milestone_name: item?.milestoneName,
                recommended_hours: item?.recommendedHours,
                isPhotoevidence: item?.isPhotoevidence || false,
            }))
            handleCombineMileStones(filter_milestones);
            handleStepForward(6);
        }
    }

    useEffect(() => {
        preFetch();
    }, []);

    const backToScreen = () => {
        setToggleJobMilestone((prev: any) => ({ ...prev, toggle: false, ItemId: '' }));
    }

    if (toggleJobMilestone?.toggle) {
        return (
            <JobMilestones
                id={toggleJobMilestone?.ItemId}
                backToScreen={backToScreen}
            />
        )
    }
    console.log({ toggleJobMilestone })
    return (
        <div className="custom_container">
            <div className="form_field">
                <div className="flex_row">
                    <div className="flex_col_sm_12">
                        <div className="">
                            <span className="title">{'Milestone Templates'}</span>
                        </div>
                    </div>
                </div>
                <div className="flex_row">
                    <div className="flex_col_sm_8">
                        <ul className="milestone_templates">
                            {list?.length ?
                                list.map(({ templateId, templateName, milestoneCount }: any) => (
                                    <li onClick={() => {
                                        setToggleJobMilestone({ toggle: true, ItemId: templateId });
                                    }}>
                                        <span className="name">{templateName} </span>
                                        <div className="count">{milestoneCount}
                                            <span>milestones</span>
                                        </div>
                                    </li>
                                )) : null}
                        </ul>
                    </div>

                    {!isLoading && !list?.length ? (
                        <div className="no_record">
                            <figure className="no_img">
                                <img src={noData} alt="data not found" />
                            </figure>
                            <span>{'No Data Found'}</span>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>

    )
}

export default MileStoneTemplates;