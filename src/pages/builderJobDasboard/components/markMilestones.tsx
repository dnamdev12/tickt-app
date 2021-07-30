import React, { useState, useEffect } from 'react'
import UploadMedia from '../../postJob/components/uploadMedia';
import dummy from '../../../assets/images/u_placeholder.jpg';
import editIconBlue from '../../../assets/images/ic-edit-blue.png';
import more from '../../../assets/images/icon-direction-right.png';
import check from '../../../assets/images/checked-2.png';
import { format } from 'date-fns';
import MilestoneApprove from './milestoneApprove';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import {
    getHomeJobDetails,
    getMilestoneList,
    getMilestoneDetails
} from '../../../redux/homeSearch/actions';
import { setShowToast } from '../../../redux/common/actions';
import { renderTime } from '../../../utils/common';

import EditMilestones from './editMilestones/index';
import CancelJobs from './cancelJobs/cancelJob'
import LodgeDispute from './lodgeDispute/lodgeDispute';
import { CancelJob } from '../../../redux/jobs/actions';
import storageService from '../../../utils/storageService';

import SeeDetailsComponents from './seeDetails';

interface Mile {
    milestoneId: any,
    milestoneName: any,
    isPhotoevidence: any,
    status: any,
    fromDate: any,
    toDate: any,
    enableEditMilestone: boolean,
    enableLodgeDispute: boolean,
    enableCancelJob: boolean
}

const MarkMilestones = (props: any) => {
    const { resetStateLocal, listData, selectedIndex, enableEditMilestone, enableLodgeDispute, enableCancelJob } = props;
    const [enableApprove, setEnableApprove] = useState(false);
    const [itemDetails, setDetails] = useState(null);
    const [selectedMilestoneIndex, setMilestoneIndex] = useState<any>(null);
    const [selectedMile, setMilestone] = useState(null);
    const [expandItem, setExpandItem] = useState<any>({});

    const [toggleSeeDetails, setSeeDetails] = useState(false);

    const [toggleItem, setToggleItem] = useState<{ [index: string]: boolean }>({ edit: false, cancel: false, lodge: false });

    const backToScreen = () => {
        preFetch();
        setEnableApprove(false);
        setSeeDetails(false);
    }

    let selectedItem: any = null;
    if (listData?.length) {
        selectedItem = listData[selectedIndex];

    }
    useEffect(() => {
        fetchMilestoneDetail();
    }, [selectedMilestoneIndex]);



    const fetchMilestoneDetail = async () => {
        if (selectedMilestoneIndex && Object.keys(selectedMilestoneIndex).length) {
            const { milestoneId, jobId } = selectedMilestoneIndex;
            if (milestoneId && jobId) {
                let response: any = await getMilestoneDetails({ milestoneId, jobId });
                if (response.success) {
                    setMilestone(response.data);
                    if (selectedMilestoneIndex?.type === "detail") {
                        setSeeDetails(true);
                    } else {
                        setEnableApprove(true);
                    }
                }
            }
        }
    }

    useEffect(() => {
        console.log({ props }, '-----??')
        preFetch();
    }, []);

    useEffect(() => {
        console.log({ expandItem })
        if (Object.keys(expandItem).length === 0) {
            preFetch();
        }
    }, [expandItem]);

    useEffect(() => {
        if (enableEditMilestone) {
            setToggleItem({
                edit: true, cancel: false, lodge: false
            })
        }

        if (enableLodgeDispute) {
            setToggleItem({
                edit: false, cancel: false, lodge: true
            })
        }

        if (enableCancelJob) {
            setToggleItem({
                edit: false, cancel: true, lodge: false
            })
        }
    }, [enableEditMilestone, enableLodgeDispute, enableCancelJob])


    const classChecks = (isActive: any, isPrevDone: any) => {
        if (isActive === 1 && isPrevDone === false) {
            return 'active';
        } else if (isActive === 2 && isPrevDone === false) {
            return 'check';
        } else if (isActive === 1 && isPrevDone === 2) {
            return 'active';
        } else if (isActive === 2 && isPrevDone === 2) {
            return 'check';
        } else {
            return 'disable'
        }
    }

    const preFetch = async () => {
        let { jobId } = selectedItem;
        if (getMilestoneList) {
            const res: any = await getMilestoneList(jobId);
            if (res.success) {
                console.log({ res }, '---->')
                if (res?.data?.milestones?.length) {
                    res?.data?.milestones?.forEach((item: any, index: any) => {
                        if (index === 0) {
                            const isActive = item?.status;
                            let isPrevDone: any = false;
                            isPrevDone = false;
                            let result = classChecks(isActive, isPrevDone);
                            console.log({ result }, '====>')
                            if (["check", "active"].includes(result)) {
                                setExpandItem({
                                    [item?.milestoneId]: true
                                });
                            }
                        }
                    })
                }
                setDetails(res.data);
            }
        }
    }

    const redirectToInfo = ({ jobId, status, tradieId }: any) => {
        console.log({ jobId });
        let props_: any = props;
        let urlEncode: any = window.btoa(`?jobId=${jobId}&status=${status}&tradieId=${tradieId}&edit=true&activeType=active`)
        props_.history.push(`/job-detail?${urlEncode}`);
    }

    let item_details: any = itemDetails;
    if (enableApprove) {
        return (
            <MilestoneApprove
                resetStateLocal={resetStateLocal}
                backToScreen={backToScreen}
                data={{ selectedMile, selectedMilestoneIndex, selectedItem, itemDetails }}
            />)
    }

    if (toggleSeeDetails) {
        return (
            <SeeDetailsComponents
                resetStateLocal={resetStateLocal}
                backToScreen={backToScreen}
                data={{ selectedMile, selectedMilestoneIndex, selectedItem, itemDetails }}
            />
        )
    }

    const backTab = (name: string) => {
        setToggleItem((prev: any) => ({ ...prev, [name]: false }));
        setExpandItem({});
    }



    if (toggleItem?.edit) {
        let details: any = itemDetails;
        if (details && Object.keys(details)?.length && Object.keys(selectedItem).length) {
            return (
                <EditMilestones
                    details={details}
                    item={selectedItem}
                    backTab={backTab}
                />
            )
        }
    }

    if (toggleItem?.lodge) {
        return (
            <LodgeDispute item={selectedItem} backTab={backTab} />
        )
    }

    if (toggleItem?.cancel) {
        return (
            <CancelJobs item={selectedItem} backTab={backTab} />
        )
    }

    let item_detail: any = itemDetails;
    let item_status = false;
    if (item_details?.milestones?.length) {
        let isExist = item_details?.milestones.find((item: any) => item.status === 1);
        if (isExist) {
            item_status = true;
        }
    }
    let dataItems: any = [];
    if (item_details?.milestones?.length) {
        dataItems = item_details?.milestones;
    }

    return (
        <div className="flex_row">
            <div className="flex_col_sm_6">
                <div className="relate">
                    <button
                        className="back"
                        onClick={() => {
                            // times
                            resetStateLocal();
                        }}
                    ></button>
                    <span className="xs_sub_title">
                        {item_detail && Object.keys(item_detail).length ? item_detail.jobName : ''}
                    </span>

                    <span className="dot_menu">
                        <img src={editIconBlue} alt="edit" />
                        <div className="edit_menu">
                            <ul>
                                {/* {item_status && ( )} */}
                                <li
                                    onClick={() => { setToggleItem({ edit: true, lodge: false, cancel: false }) }}
                                    className="icon edit_line">
                                    {'Edit Milestone'}
                                </li>

                                <li
                                    onClick={() => { setToggleItem((prev: any) => ({ ...prev, lodge: true })) }}
                                    className="icon lodge">
                                    {'Lodge dispute'}
                                </li>

                                <li
                                    onClick={() => { setToggleItem((prev: any) => ({ ...prev, cancel: true })) }}
                                    className="icon delete">Cancel job</li>
                            </ul>
                        </div>
                    </span>


                </div>
                <span className="sub_title">
                    {'Job Milestones'}
                </span>
                <p className="commn_para">
                    {"Your job point of contact has indicated they want to be notified when you reach the following milestones. Tap the milestone and Submit when a milestone is completed"}
                </p>

                <ul className="milestones_check">
                    {dataItems?.map(({
                        milestoneId,
                        milestoneName,
                        isPhotoevidence,
                        status,
                        fromDate,
                        toDate,
                    }: Mile,
                        index: number
                    ) => {
                        const isActive = status;
                        let isPrevDone: any = false;
                        if (index === 0) {
                            isPrevDone = false;
                        } else {
                            isPrevDone = dataItems[index - 1].status;
                        }
                        console.log({ isActive, isPrevDone, index, expandItem })
                        return (
                            <li
                                key={milestoneId}
                                className={classChecks(isActive, isPrevDone)}>
                                <div
                                    onClick={() => {
                                        setExpandItem((prev: any) => ({
                                            ...prev,
                                            [milestoneId]: prev[milestoneId] === undefined ? true : !prev[milestoneId]
                                        }));
                                    }}
                                    className="circle_stepper">
                                    <span></span>
                                </div>
                                <div className="info">
                                    <label>{milestoneName}</label>
                                    {isPhotoevidence && (
                                        <span>{'Photo evidence required'}</span>
                                    )}
                                    <span>
                                        {renderTime(fromDate, toDate)}
                                    </span>

                                    {["check"].includes(classChecks(isActive, isPrevDone)) && expandItem[milestoneId] ? (
                                        <button
                                            className="fill_btn full_btn btn-effect"
                                            style={{ backgroundColor: '#DFE5EF' }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setMilestoneIndex({
                                                    index,
                                                    milestoneId,
                                                    type: 'detail',
                                                    jobId: item_details?.jobId
                                                });
                                            }}>
                                            {'See Details'}
                                        </button>
                                    ) : null}
                                </div>

                                {["active"].includes(classChecks(isActive, isPrevDone)) && expandItem[milestoneId] ? (
                                    <button
                                        className="fill_btn full_btn btn-effect"
                                        onClick={() => {

                                            setMilestoneIndex({
                                                index,
                                                milestoneId,
                                                type: 'approve',
                                                jobId: item_details?.jobId
                                            });
                                        }}>
                                        {'Check and Approve'}
                                    </button>
                                ) : null}
                            </li>
                        );
                    }
                    )}
                </ul>
            </div>
            <div className="flex_col_sm_6 col_ruler">
                <span className="sub_title">Tradie</span>

                <div
                    onClick={() => {
                        console.log({ item_details })
                        props?.history?.push(`tradie-info?tradeId=${item_details?.tradieId}&hideInvite=true`);
                    }}
                    className="tradie_card posted_by view_more ">
                    <span
                        onClick={(e) => {
                            e.stopPropagation();
                            props.history.push({
                                pathname: `/chat`,
                                state: {
                                    tradieId: item_details?.tradieId,
                                    builderId: storageService.getItem('userInfo')?._id,
                                    jobId: item_details?.jobId,
                                    jobName: item_details?.jobName
                                }
                            })
                        }}
                        className="chat circle" />
                    <div className="user_wrap">
                        <figure className="u_img">
                            <img src={item_details?.tradie?.tradieImage || dummy} alt="traide-img" />
                        </figure>
                        <div className="details">
                            <span className="name">{item_details?.tradie?.tradieName || ''}</span>
                            {/* <span className="prof">Project Manager</span> */}
                            <span className="rating">{item_details?.tradie?.reviews || 0} reviews</span>
                        </div>
                    </div>
                </div>

                <div className="relate">
                    <span className="sub_title">
                        {'Job details'}
                    </span>
                    <span
                        className="edit_icon"
                        title="More"
                        onClick={() => {
                            let { jobId, tradeId, specializationId, tradieId, status } = selectedItem;
                            redirectToInfo({ jobId, status, tradieId })
                        }}>
                        <img src={more} alt="more" />
                    </span>
                </div>
            </div>
        </div>

    )
}

// const mapProps = (dispatch: any) => {
//     return bindActionCreators({
//         getHomeJobDetails
//     }, dispatch)
// }

// const mapState = () => ({

// })

// export default connect(mapState, mapProps)(withRouter(MarkMilestones));
export default withRouter(MarkMilestones)
