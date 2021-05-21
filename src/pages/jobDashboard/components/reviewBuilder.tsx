import { useState } from 'react';
import moment from 'moment';
// @ts-ignore
import ReactStars from "react-rating-stars-component";
import { reviewBuilder } from '../../../redux/jobs/actions';
import { setShowToast } from '../../../redux/common/actions';

import dummy from '../../../assets/images/u_placeholder.jpg';
import more from '../../../assets/images/icon-direction-right.png';

interface Proptypes {
    history: any,
    location: any,
}
const ReviewBuilder = (props: Proptypes) => {
    const [reviewBuilderData, setReviewBuilderData] = useState({
        startDate: '',
        endDate: '',
        rating: 0,
        review: '',
    });
    console.log(props, props.history, "props data")
    const item = props?.location?.state?.item;

    const ratingChanged = (newRating: number) => {
        console.log(newRating);
        setReviewBuilderData((prevdata: any) => ({ ...prevdata, rating: newRating }))
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.trim().length <= 250) {
            setReviewBuilderData((prevdata: any) => ({ ...prevdata, review: e.target.value }))
        }
    }

    const startDate = moment(item?.fromDate).format('MMM DD');
    const endDate = moment(item?.toDate).format('MMM DD');

    const submitReviewClicked = async () => {
        if(reviewBuilderData.rating === 0){
            setShowToast(true, 'Star rating is required');
            return;
        }
        if(reviewBuilderData.review.trim().length < 1){
            setShowToast(true, 'Review text is required');
            return;
        }
        if(reviewBuilderData.review.trim().length > 1 && reviewBuilderData.rating > 0){
            const data = {
                jobId: item?.jobId,
                builderId: item?.builderData?.builderId,
                rating: reviewBuilderData.rating,
                review: reviewBuilderData.review.trim()
            }
            const response = await reviewBuilder(data);
            if (response?.success) {
                props?.history?.push('/builder-review-submitted')
            }
        }
    }

    const jobClickHandler = () => {
        props.history.push(`/job-details-page?jobId=${item?.jobId}&tradeId=${item?.tradeId}&specializationId=${item?.specializationId}`);
    }

    return (
        <div className="flex_row">
            <div className="flex_col_sm_6">
                <div className="relate">
                    <button className="back" onClick={() => props?.history?.goBack()}></button>
                    <span className="xs_sub_title">{item?.jobName}</span>
                </div>
                <div className="form_field">
                    <span className="sub_title">Review completed job</span>
                </div>
                <span className="inner_title">Rate this builder</span>
                <div className="form_field">
                    <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={60}
                        isHalf={true}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        activeColor="#ffd700"
                    />
                </div>
                <div className="form_field">
                    <label className="form_label">Comment</label>
                    <div className="text_field">
                        <input type="text" placeholder="Thanks.." onChange={handleChange} />
                    </div>
                </div>
                <div className="form_field">
                    <button className="fill_btn full_btn" onClick={submitReviewClicked}>Leave review</button>
                </div>
            </div>
            <div className="flex_col_sm_6 col_ruler">
                <div className="relate">
                    <span className="sub_title">Job details</span>
                    <span className="edit_icon" title="More" onClick={jobClickHandler}>
                        <img src={more} alt="more" />
                    </span>
                </div>
                <div className="tradie_card posted_by view_more ">
                    <div className="user_wrap">
                        <figure className="u_img">
                            <img src={item.builderData?.builderImage ? item.builderData?.builderImage : dummy} alt="traide-img" />
                        </figure>
                        <div className="details">
                            <span className="name">{item?.tradeName}</span>
                            <span className="prof">{item?.jobName}</span>
                            <span className="prof">{`${startDate} - ${endDate}`}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewBuilder;
