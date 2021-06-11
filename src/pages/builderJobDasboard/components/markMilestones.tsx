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

interface Props {

}
interface Mile {
    milestoneId: any,
    milestoneName: any,
    isPhotoevidence: any,
    status: any,
    fromDate: any,
    toDate: any,
}

const MarkMilestones = (props: any) => {
    const { resetStateLocal, listData, selectedIndex } = props;
    const [enableApprove, setEnableApprove] = useState(false);
    const [itemDetails, setDetails] = useState(null);
    const [selectedMilestoneIndex, setMilestoneIndex] = useState<any>(null);
    const [selectedMile, setMilestone] = useState(null);

    const backToScreen = () => {
        preFetch();
        setEnableApprove(false);
    }

    const selectedItem: any = listData[selectedIndex];


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
                    setEnableApprove(true);
                }
            }
        }
    }

    useEffect(() => {
        console.log({ props })
        preFetch();
    }, []);

    const preFetch = async () => {
        let { jobId } = selectedItem;
        if (getMilestoneList) {
            const res: any = await getMilestoneList(jobId);
            if (res.success) {
                setDetails(res.data);
            }
        }
    }


    const redirectToInfo = ({ jobId, status }: any) => {
        console.log({ jobId });
        let props_: any = props;
        let urlEncode: any = window.btoa(`?jobId=${jobId}&status=${status}`)
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
                    <span className="xs_sub_title">{'Title'}</span>
                    {/* <span className="edit_icon" title="Edit">
                        <img src={editIconBlue} alt="edit" />
                    </span> */}
                </div>
                <span className="sub_title">Job Milestones</span>
                <p className="commn_para">
                    {"Your job point of contact has indicated they want to be notified when you reach the following milestones. Tap the milestone and Submit when a milestone is completed"}
                </p>

                <ul className="milestones_check">
                    {item_details?.milestones?.map(({
                        milestoneId,
                        milestoneName,
                        isPhotoevidence,
                        status,
                        fromDate,
                        toDate,
                    }: Mile,
                        index: number
                    ) => {
                        // const prevMilestoneStatus = item_details?.milestones[index - 1]?.status;
                        // const isActive =
                        //     status === 0 &&
                        //     (prevMilestoneStatus === 1 ||
                        //         prevMilestoneStatus === undefined);
                        const isActive = status;
                        return (
                            <li
                                key={milestoneId}
                                className={
                                    status === 1
                                        ? `check`
                                        : isActive
                                            ? 'active'
                                            : 'disabled'
                                }>
                                <div className="circle_stepper">
                                    <span></span>
                                </div>
                                <div className="info">
                                    <label>{milestoneName}</label>
                                    {isPhotoevidence && (
                                        <span>Photo evidence required</span>
                                    )}
                                    <span>
                                        {renderTime(fromDate, toDate)}
                                    </span>
                                </div>
                                {isActive === 1 ? (
                                        <button
                                            className="fill_btn full_btn btn-effect"
                                            onClick={() => {
                                                // setShowToast(true, 'under development.')
                                                setMilestoneIndex({
                                                    index,
                                                    milestoneId,
                                                    jobId: item_details?.jobId
                                                });

                                                if (index === item_details?.milestones?.length - 1) {
                                                    // setIsLastMilestone(true);
                                                }

                                                if (isPhotoevidence) {
                                                    // setStep(2);
                                                } else {
                                                    // setStep(3);
                                                }
                                            }}
                                        >
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
                <div className="tradie_card posted_by view_more ">
                    <a href="javascript:void(0)" className="chat circle"></a>
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
                    <span className="sub_title">Job details</span>
                    <span
                        className="edit_icon"
                        title="More"
                        onClick={() => {
                            let { jobId, tradeId, specializationId, status } = selectedItem;
                            redirectToInfo({ jobId, status })
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