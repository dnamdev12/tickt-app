import React, {useState} from 'react'
import UploadMedia from '../../postJob/components/uploadMedia';
import dummy from '../../../assets/images/u_placeholder.jpg';
import editIconBlue from '../../../assets/images/ic-edit-blue.png';
import more from '../../../assets/images/icon-direction-right.png';
import check from '../../../assets/images/checked-2.png';
import { format } from 'date-fns';
import MilestoneApprove from './milestoneApprove';
interface Props {

}
const milestones = [{
    milestoneId: 1,
    milestoneName: 'mile-1',
    isPhotoevidence: true,
    status: 1,
    fromDate: '05-10-2021',
    toDate: '05-31-2021',
},
{
    milestoneId: 1,
    milestoneName: 'mile-2',
    isPhotoevidence: true,
    status: 0,
    fromDate: '05-10-2021',
    toDate: '05-31-2021',
},
{
    milestoneId: 1,
    milestoneName: 'mile-3',
    isPhotoevidence: true,
    status: 0,
    fromDate: '05-10-2021',
    toDate: '05-31-2021',
},
{
    milestoneId: 1,
    milestoneName: 'mile-4',
    isPhotoevidence: true,
    status: 0,
    fromDate: '05-10-2021',
    toDate: '05-31-2021',
}
];

const MarkMilestones = ({ resetStateLocal }: any) => {
    const [enableApprove, setEnableApprove] = useState(false);

    const backToScreen = () => {
        setEnableApprove(false);
    }

    if (enableApprove) {
        return <MilestoneApprove backToScreen={backToScreen} />
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
                    {milestones?.map(({
                        milestoneId,
                        milestoneName,
                        isPhotoevidence,
                        status,
                        fromDate,
                        toDate,
                    },
                        index
                    ) => {
                        const prevMilestoneStatus = milestones[index - 1]?.status;
                        const isActive =
                            status === 0 &&
                            (prevMilestoneStatus === 1 ||
                                prevMilestoneStatus === undefined);
                        fromDate = fromDate
                            ? format(new Date(fromDate), 'MMM dd')
                            : '';
                        toDate = toDate ? format(new Date(toDate), 'MMM dd') : '';

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
                                        {fromDate}
                                        {toDate &&
                                            ` - ${fromDate.startsWith(toDate.split(' ')[0])
                                                ? toDate.split(' ')[1]
                                                : toDate
                                            }`}
                                    </span>
                                    {isActive && (
                                        <button
                                            className="fill_btn full_btn"
                                            onClick={() => {
                                                setEnableApprove(true);
                                                // setMilestoneIndex(index);

                                                if (index === milestones?.length - 1) {
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
                                    )}
                                </div>
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
                            <img src={null || dummy} alt="traide-img" />
                        </figure>
                        <div className="details">
                            <span className="name">{'Builder name'}</span>
                            {/* <span className="prof">Project Manager</span> */}
                            <span className="rating">{0.5} reviews</span>
                        </div>
                    </div>
                </div>
                <div className="relate">
                    <span className="sub_title">Job details</span>
                    <span
                        className="edit_icon"
                        title="More"
                        onClick={() => { }}>
                        <img src={more} alt="more" />
                    </span>
                </div>
            </div>
        </div>

    )
}

export default MarkMilestones;