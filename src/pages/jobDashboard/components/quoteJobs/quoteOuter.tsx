import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { format } from 'date-fns';
import { setShowToast } from '../../../../redux/common/actions';
import UploadMedia from '../../../postJob/components/uploadMedia';
import { renderTime } from '../../../../utils/common';
import LodgeDispute from '../lodgeDispute/lodgeDispute';
import CancelJobs from '../cancelJobs/cancelJob'

import QuoteMark from '../quoteJobs/quoteMark';

import {
    getHomeJobDetails
} from '../../../../redux/homeSearch/actions';

//@ts-ignore
import FsLightbox from 'fslightbox-react';

import dummy from '../../../../assets/images/u_placeholder.jpg';
import editIconBlue from '../../../../assets/images/ic-edit-blue.png';
import removeIconBlue from '../../../../assets/images/ic-cancel-blue.png';
import more from '../../../../assets/images/icon-direction-right.png';
import check from '../../../../assets/images/checked-2.png';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import deleteQuote from '../../../../assets/images/ic-delete.png';
import pendingIcon from '../../../../assets/images/exclamation-icon.png'

import storageService from '../../../../utils/storageService';

const MarkMilestone = (props: any) => {
    const [dataItems, setDataItems] = useState<any>({});

    var data = props?.location?.state?.data
    const params = new URLSearchParams(props.location?.search);
    let jobId = params.get('jobId');
    let tradeId = params.get('tradeId');
    let specializationId = params.get('specializationId');
    useEffect(() => {
        if (!data) {
            preFetch();
        }
    }, [data])

    const preFetch = async () => {
        let data: any = {};
        data.jobId = jobId;
        data.tradeId = tradeId;
        data.specializationId = specializationId;
        let result: any = await getHomeJobDetails(data);
        if (result.success) {
            setDataItems(result?.data)
        }
    }

    const postedBy: any = dataItems?.postedBy || data?.postedBy || {}
    const {
        builderId,
        builderImage,
        builderName,
        jobName,
        ratings,
        reviews
    } = postedBy;

    return (
        <div className="detail_col">
            <div className="flex_row">

                <QuoteMark
                    {...props}
                    jobId={jobId}
                />

                <div className="flex_col_sm_6 col_ruler">
                    <span className="sub_title">Posted by</span>
                    <div className="tradie_card posted_by view_more ">
                        <span
                            className="chat circle"
                            onClick={(e) => {
                                e.preventDefault();
                                props.history.push({
                                    pathname: `/chat`,
                                    state: {
                                        tradieId: storageService.getItem('userInfo')?._id,
                                        builderId: builderId,
                                        jobId: jobId,
                                        jobName: jobName
                                    }
                                })
                            }
                            } />
                        <div
                            className="user_wrap"
                            onClick={() => {
                                props.history.push(`/builder-info?builderId=${builderId}`)
                            }}>
                            <figure className="u_img">
                                <img
                                    src={builderImage || dummy}
                                    alt="traide-img"
                                    onError={(e: any) => {
                                        if (e?.target?.onerror) {
                                            e.target.onerror = null;
                                        }
                                        if (e?.target?.src) {
                                            e.target.src = dummy;
                                        }
                                    }}
                                />
                            </figure>
                            <div className="details">
                                <span className="name">{builderName}</span>
                                <span className="rating">{ratings} , {reviews} reviews</span>
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
                            onClick={() =>
                                props.history.push(`/job-details-page?jobId=${jobId}&redirect_from=jobs`)}>
                            <img src={more} alt="more" />
                        </span>
                    </div>
                </div>

            </div>
        </div>
    )
};

export default MarkMilestone;
