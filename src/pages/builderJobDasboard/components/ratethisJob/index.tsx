import { useState } from 'react';
import moment from 'moment';
// @ts-ignore
import ReactStars from "react-rating-stars-component";
import { ratingTradieProfile } from '../../../../redux/jobs/actions';
import { setShowToast } from '../../../../redux/common/actions';

import dummy from '../../../../assets/images/u_placeholder.jpg';
import more from '../../../../assets/images/icon-direction-right.png';

interface Proptypes {
    history: any,
    location: any,
    data: any,
    backToScreen: () => void,
}
const RateThisJob = (props: Proptypes) => {
    const [reviewBuilderData, setReviewBuilderData] = useState({
        startDate: '',
        endDate: '',
        rating: 0,
        review: '',
    });

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
        if (reviewBuilderData.rating === 0) {
            setShowToast(true, 'Star rating is required');
            return;
        }
        if (reviewBuilderData.review.trim().length < 1) {
            setShowToast(true, 'Review text is required');
            return;
        }
        if (reviewBuilderData.review.trim().length > 1 && reviewBuilderData.rating > 0) {
            const data = {
                jobId: item?.jobId,
                tradieId: '',//item?.builderData?.builderId,
                rating: reviewBuilderData.rating,
                review: reviewBuilderData.review.trim()
            }
            const response = await ratingTradieProfile(data);
            if (response?.success) {
                props?.history?.push('/rate-success')
            }
        }
    }

    const jobClickHandler = () => {
        // props.history.push(`/job-details-page?jobId=${item?.jobId}&tradeId=${item?.tradeId}&specializationId=${item?.specializationId}`);
    }

    const builderClicked = () => {
        // props.history.push(`/builder-info?builderId=${item?.builderData?.builderId}`);
    }

    const renderTime = ({ fromDate, toDate }: any) => {
        if (moment(fromDate).isValid() && !moment(toDate).isValid()) {
            return `${moment(fromDate).format('DD MMM')}`
        }

        if (moment(fromDate).isValid() && moment(toDate).isValid()) {
            let yearEnd = moment().endOf("year").toISOString();
            let monthEnd = moment(fromDate).endOf("month").toISOString();

            let item: any = moment(toDate).diff(moment(fromDate), 'months', true);
            let item_year: any = moment(toDate).diff(moment(fromDate), 'years', true);

            let monthDiff = parseInt(item.toString());
            let yearDiff = parseInt(item_year.toString());

            if (yearDiff > 0 || moment(toDate).isAfter(yearEnd) || moment(toDate).isAfter(yearEnd)) {
                return `${moment(fromDate).format('DD MMM YY')} - ${moment(toDate).format('DD MMM YY')}`
            }
            if (monthDiff > 0 || moment(toDate).isAfter(monthEnd)) {
                return `${moment(fromDate).format('DD MMM')} - ${moment(toDate).format('DD MMM')}`
            }
            return `${moment(fromDate).format('DD MMM')} - ${moment(toDate).format('DD')}`
        }
    }

    let data: any = props?.data;
    console.log({ data });
    return (
        <div className="flex_row">
            <div className="flex_col_sm_6">
                <div className="form_field relate">
                    <button className="back" onClick={() => { props?.backToScreen() }}></button>
                    {/* <span className="xs_sub_title">{item?.jobName}</span> */}
                    <span className="xs_sub_title">Review the tradesperson</span>
                </div>
                {/* <div className="form_field">
                    <span className="sub_title">
                        {'Review the tradesperson '}
                    </span>
                </div> */}
                <span className="inner_title">
                    {'Rate this tradie'}
                </span>
                <div className="form_field">
                    <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={55}
                        isHalf={true}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        activeColor="#fee600"
                    />
                </div>
                <div className="form_field">
                    <label className="form_label">Comment</label>
                    <div className="text_field">
                        <input
                            type="text"
                            placeholder="Thanks.."
                            maxLength={250}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="form_field">
                    <button
                        className="fill_btn full_btn btn-effect"
                        onClick={submitReviewClicked}>
                        {'Leave review'}
                    </button>
                </div>
            </div>
            <div className="flex_col_sm_6 col_ruler">
                <>
                    <div className="relate">
                        <span className="sub_title">
                            {'Job details'}
                        </span>
                        <span className="edit_icon" title="More" onClick={jobClickHandler}>
                            <img src={more} alt="more" />
                        </span>
                    </div>
                    <div className="tradie_card posted_by view_more ">
                        <div className="user_wrap">
                            <figure className="u_img">
                                <img
                                    src={data?.jobData?.tradeSelectedUrl || dummy}
                                    alt="traide-img"
                                />
                            </figure>
                            <div className="details" onClick={() => builderClicked()}>
                                <span className="name">{data?.jobData?.tradeName}</span>
                                <span className="prof">{data?.jobName || 'Job Name'}</span>
                                <span className="prof">
                                    {renderTime({
                                        fromDate: data?.jobData?.fromDate,
                                        toDate: data?.jobData?.toDate
                                    })}
                                </span>
                            </div>
                        </div>
                    </div>
                </>

                <>
                    <div className="relate">
                        <span className="sub_title">Tradie</span>
                        <span className="edit_icon" title="More" onClick={jobClickHandler}>
                            <img src={more} alt="more" />
                        </span>
                    </div>
                    <div className="tradie_card posted_by view_more ">
                        <div className="user_wrap">
                            <figure className="u_img">
                                <img src={data?.tradieData?.tradieImage || dummy} alt="traide-img" />
                            </figure>
                            <div className="details" onClick={() => builderClicked()}>
                                <span className="name">{data?.tradieData?.tradieName}</span>
                                <span className="prof">{}</span>
                            </div>
                        </div>
                    </div>
                </>

            </div>
        </div>
    )
}

export default RateThisJob;
