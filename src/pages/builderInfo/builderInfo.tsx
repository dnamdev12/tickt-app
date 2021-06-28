import { useState, useEffect, Fragment } from 'react';
import Constants from '../../utils/constants';
import {
    getBuilderProfile,
    getTradieReviewList,
    updateReviewBuilder,
    deleteReviewBuilder,
    tradieReviewReply,
    tradieUpdateReviewReply,
    tradieRemoveReviewReply
} from '../../redux/jobs/actions';
import TradieJobInfoBox from '../../common/tradieJobInfoBox';
import Modal from '@material-ui/core/Modal';
import ReviewInfoBox from '../../common/reviewInfoBox';
// @ts-ignore
import ReactStars from "react-rating-stars-component";

import profilePlaceholder from '../../assets/images/ic-placeholder-detail.png';
import dummy from '../../assets/images/u_placeholder.jpg';
import portfolioPlaceholder from '../../assets/images/portfolio-placeholder.jpg';
import noDataFound from '../../assets/images/no-search-data.png';
import cancel from "../../assets/images/ic-cancel.png";
import menu from '../../assets/images/menu-line-blue.png';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import storageService from '../../utils/storageService';

import Skeleton from 'react-loading-skeleton';

interface PropsType {
    location: any,
    history: any,
    tradieProfileViewData: any,
    getTradieProfileView: () => void,
    isLoading: boolean,
    isSkeletonLoading: boolean,
    userType: number,
    builderProfileViewData: any,
    getBuilderProfileView: () => void,
    tradeListData: any,
    callTradeList: () => void,
}

const portfolio = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
        slidesToSlide: 1, // optional, default to 1.
        paritialVisibilityGutter: 30
    },
    tablet: {
        breakpoint: { max: 1200, min: 768 },
        items: 2,
        paritialVisibilityGutter: 50
    },
    mobile: {
        breakpoint: { max: 650, min: 0 },
        items: 1,
        paritialVisibilityGutter: 45
    }
};

const portfolioModal = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
        slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1200, min: 768 },
        items: 1,
    },
    mobile: {
        breakpoint: { max: 650, min: 0 },
        items: 1,
    }
};



const BuilderInfo = (props: PropsType) => {
    const [errors, setErrors] = useState<any>({});
    const [profileData, setProfileData] = useState<any>('');
    const [reviewList, setReviewList] = useState<Array<any>>([]);
    const [reviewListPageNo, setReviewListPageNo] = useState<number>(1);
    const [portfolioData, setPortfolioData] = useState<any>({
        portfolioImageClicked: false,
        portfolioDetails: '',
    });
    const [reviewsData, setReviewsData] = useState<any>({
        reviewReplyClicked: false, // reply modal opened
        showAllReviewsClicked: false,
        submitReviewsClicked: false,
        rating: null, // review star rating
        deleteParentReviews: false, // delete revParentiew - rta
        updateParentReviews: false, // update review - reviewData
        deleteReviewsClicked: false, // delete reply - replyData
        updateReviewsClicked: false, // update reply - replyData
        reviewsClickedType: '',
        confirmationClicked: false, // confirmation modal opened
        showReviewReplyButton: true,
        reviewId: '',
        reviewData: '',
        showReviewReply: false,
        replyShownHideList: []
    })
    console.log(reviewsData, "reviewData", reviewList, "reviewList", profileData, "profileData", reviewListPageNo, "reviewListPageNo");

    useEffect(() => {
        setItems();
        props.callTradeList();
        // (async () => {
        //     const builderId: any = new URLSearchParams(props.location?.search).get('builderId');
        //     const res1 = await getBuilderProfile(builderId);
        //     if (res1?.success) {
        //         setProfileData(res1.data);
        //         const data = {
        //             builderId: res1.data?.builderId,
        //             page: 1
        //         }
        //         const res2 = await getTradieReviewList(data);
        //         if (res2.success) {
        //             setReviewList(res2.data);
        //         }
        //     }
        // })();
    }, []);

    useEffect(() => {
        if (props.builderProfileViewData) {
            setProfileData(props.builderProfileViewData);
        }
    }, [props.builderProfileViewData]);

    const getItemsFromLocation = () => {
        const urlParams = new URLSearchParams(props.location.search);
        // let jobId = urlParams.get('jobId')
        // let specializationId = urlParams.get('specializationId')
        let builderId: any = urlParams.get('builderId');
        let user_type = urlParams.get('type');
        return { builderId, user_type };
    }

    const setItems = async () => {
        const { builderId, user_type }: { builderId: any, user_type: any } = getItemsFromLocation();

        if (user_type == '2' || props.userType == 2) {
            console.log(user_type, "user_type", props.userType, "this.props.userType");
            props.getBuilderProfileView();
        } else {
            const res1 = await getBuilderProfile(builderId);
            if (res1?.success) {
                setProfileData(res1.data);
            }
        }

        const data = {
            builderId: builderId,
            page: 1
        }
        const res2 = await getTradieReviewList(data);
        if (res2.success) {
            setReviewList(res2.data);
        }
    }

    const portfolioImageHandler = (data: any) => {
        setPortfolioData((prevData: any) => ({ ...prevData, portfolioImageClicked: true, portfolioDetails: data }));
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>, type: string) => {
        if (e.target.value.trim().length <= 250) {
            setReviewsData((prevData: any) => ({ ...prevData, [type]: e.target.value }))
        }
    }

    const modalCloseHandler = (modalType: string) => {
        setReviewsData((prevData: any) => ({ ...prevData, [modalType]: false, deleteReviewsClicked: false, reviewData: '' }));
        setErrors({});
    }

    const loadMoreReviewHandler = async () => {
        const data: any = {
            builderId: profileData?.builderId,
            page: reviewListPageNo + 1
        }
        const res = await getTradieReviewList(data);
        if (res.success) {
            setReviewList((prevData: any) => ([...prevData, ...res.data]));
            setReviewListPageNo(data.page);
        }
    }

    const validateForm = (type: string) => {
        if (type === 'removeReviewReply' || type === 'removeReviewBuilder') return true;
        const newErrors: any = {};
        if (!reviewsData.reviewData.trim()?.length) {
            newErrors.reviewData = type === 'updateReviewBuilder' ? Constants.errorStrings.askReview : Constants.errorStrings.askReply;
        }
        setErrors(newErrors);
        return !Object.keys(newErrors).length;
    }

    const submitReviewHandler = async (type: string) => {
        if (['reviewReply', 'updateReviewReply', 'removeReviewReply', 'removeReviewBuilder', 'updateReviewBuilder'].includes(type)) {
            if (!validateForm(type)) {
                return;
            }
            var response: any;
            var data: any;
            var newData: any = reviewsData.replyShownHideList;
            if (type == 'reviewReply') {
                data = {
                    reviewId: reviewsData.reviewId,
                    reply: reviewsData.reviewData.trim()
                }
                response = await tradieReviewReply(data);
            }
            if (type == 'updateReviewReply') {
                data = {
                    reviewId: reviewsData.reviewId,
                    replyId: reviewsData.replyId,
                    reply: reviewsData.reviewData.trim()
                }
                response = await tradieUpdateReviewReply(data);
            }
            if (type == 'removeReviewReply') {
                data = {
                    reviewId: reviewsData.reviewId,
                    replyId: reviewsData.replyId
                }
                response = await tradieRemoveReviewReply(data);
            }
            if (type == 'updateReviewBuilder') {
                data = {
                    reviewId: reviewsData.reviewId,
                    rating: reviewsData.rating,
                    review: reviewsData.reviewData.trim()
                }
                response = await updateReviewBuilder(data);
            }
            if (type == 'removeReviewBuilder') {
                const reviewId = reviewsData.reviewId;
                response = await deleteReviewBuilder(reviewId);
            }
            if (response?.success) {
                const listData: any = {
                    builderId: profileData?.builderId,
                    page: 1
                }
                const res = await getTradieReviewList(listData);
                setReviewList(res.data);
                // newData = [...reviewsData.replyShownHideList].filter(id => id !== reviewsData.replyId);
                setReviewListPageNo(1);
            }
            setReviewsData((prevData: any) => ({
                ...prevData,
                submitReviewsClicked: false,
                reviewReplyClicked: false,
                showAllReviewsClicked: true,
                confirmationClicked: false,
                reviewsClickedType: '',
                rating: null,
                deleteParentReviews: false,
                updateParentReviews: false,
                deleteReviewsClicked: false,
                updateReviewsClicked: false,
                reviewId: '',
                reviewData: '',
                replyShownHideList: newData
            }))
        }
    }

    const reviewHandler = (type: string, reviewId?: string, replyId?: string, userText?: string, rating?: number) => {
        if (type == 'reviewReplyClicked') {
            setReviewsData((prevData: any) => ({
                ...prevData,
                reviewReplyClicked: true,
                showAllReviewsClicked: false,
                reviewsClickedType: 'reviewReply',
                reviewId: reviewId,
            }));
        } else if (type == 'reviewReply' && validateForm(type)) {
            setReviewsData((prevData: any) => ({
                ...prevData,
                submitReviewsClicked: true,
                reviewsClickedType: type,
                confirmationClicked: true
            }));
        } else if (type == 'removeReviewReply') {
            setReviewsData((prevData: any) => ({
                ...prevData,
                confirmationClicked: true,
                deleteReviewsClicked: true,
                reviewId: reviewId,
                replyId: replyId,
                reviewsClickedType: type
            }));
        } else if (type == 'updateReviewReply') {
            setReviewsData((prevData: any) => ({
                ...prevData,
                reviewReplyClicked: true,
                reviewId: reviewId,
                replyId: replyId,
                reviewsClickedType: type,
                showAllReviewsClicked: false,
                updateReviewsClicked: true,
                reviewData: userText //reply text
            }));
        } else if (type == 'replyCancelBtnClicked') {
            setReviewsData((prevData: any) => ({
                ...prevData,
                reviewReplyClicked: false,
                updateReviewsClicked: false,
                deleteReviewsClicked: false,
                showAllReviewsClicked: true,
                reviewData: '',
                reviewsClickedType: '',
                reviewId: '',
            }));
            setErrors({});
        } else if (type == 'hideReviewClicked') {
            const newData = [...reviewsData.replyShownHideList].filter(id => id !== replyId);
            setReviewsData((prevData: any) => ({ ...prevData, replyShownHideList: newData }));
        } else if (type == 'showReviewClicked') {
            const newData = [...reviewsData.replyShownHideList];
            newData.push(replyId);
            setReviewsData((prevData: any) => ({ ...prevData, replyShownHideList: newData }));
        } else if (type == 'removeReviewBuilder') {
            setReviewsData((prevData: any) => ({
                ...prevData,
                confirmationClicked: true,
                deleteParentReviews: true,
                reviewId: reviewId,
                reviewsClickedType: type
            }));
        } else if (type == 'updateReviewBuilder') {
            setReviewsData((prevData: any) => ({
                ...prevData,
                reviewReplyClicked: true,
                updateParentReviews: true,
                reviewsClickedType: type,
                showAllReviewsClicked: false,
                rating: rating,
                reviewId: reviewId,
                reviewData: userText //review text
            }));
        }
    }

    const builderAllJobsClicked = () => {
        props.history?.push(`/builder-posted-jobs?bId=${profileData?.builderId}&jobCount=${profileData?.totalJobPostedCount}`);
    }

    const { user_type } = getItemsFromLocation();
    let userType: number = Number(user_type);

    const addedTradeList = profileData?.areasOfSpecialization?.tradeData?.map(({ tradeId }: { tradeId: string }) => tradeId) || [];
    const addedSpecializationList = profileData?.areasOfSpecialization?.specializationData?.map(({ specializationId }: { specializationId: string }) => specializationId) || [];
    const addedTradeData = props.tradeListData.filter(({ _id }: { _id: string }) => addedTradeList.includes(_id));
    addedTradeData.forEach(({ specialisations }: any, index: number) => {
      addedTradeData[index].specialisations = specialisations.filter(({ _id }: { _id: string }) => addedSpecializationList.includes(_id));
    });

    return (
        <div className="app_wrapper">
            <div className="section_wrapper">
                <div className="custom_container">
                    <div className="vid_img_wrapper pt-20">
                        <div className="flex_row">
                            <div className="flex_col_sm_8 relative">
                                <button className="back" onClick={() => props.history?.goBack()}></button>
                            </div>
                        </div>
                        <div className="flex_row">
                            <div className="flex_col_sm_8">
                                <figure className="vid_img_thumb">
                                    {props.isSkeletonLoading ? <Skeleton style={{ lineHeight: 2, height: 400 }} /> : <img src={profileData?.builderImage || profilePlaceholder} alt="profile-pic" />}
                                </figure>
                            </div>
                            <div className="flex_col_sm_4 relative">
                                <div className="detail_card">
                                    {props.isSkeletonLoading ? <Skeleton count={5} height={25} /> :
                                        <>
                                            <span className="title">{profileData?.builderName || ''}</span>
                                            <span className="tagg">{profileData?.position || ''}</span>
                                            <span className="xs_sub_title">{profileData?.companyName || ''}</span>
                                            <ul className="review_job">
                                                <li>
                                                    <span className="icon reviews">{profileData?.ratings || '0'}</span>
                                                    <span className="review_count">{`${profileData?.reviewsCount || '0'} reviews`}</span>
                                                </li>
                                                <li>
                                                    <span className="icon job">{profileData?.jobCompletedCount || '0'}</span>
                                                    <span className="review_count"> jobs completed</span>
                                                </li>
                                            </ul>
                                            {userType === 2 ?
                                                <button className="fill_btn full_btn btn-effect" onClick={() => props.history.push('/update-user-info')}>Edit</button>
                                                :
                                                <button className="fill_btn full_btn btn-effect">Write a message</button>}
                                        </>}
                                </div>
                            </div>
                        </div>
                        <div className="flex_row description">
                            <div className="flex_col_sm_8">
                                {props.isSkeletonLoading ? <Skeleton count={2} /> : <div>
                                    <span className="sub_title">About</span>
                                    <p className="commn_para">{profileData?.aboutCompany || ''}</p>
                                </div>}
                            </div>
                            <div className="flex_col_sm_4">
                                <span className="sub_title">{props.isSkeletonLoading ? <Skeleton /> : 'Areas of specialisation'}</span>
                                <div className="tags_wrap">
                                    {props.isSkeletonLoading ? <Skeleton count={3} /> : userType === 2 ? (
                                        <ul>
                                            {addedTradeData?.map(({ _id, trade_name, selected_url, specialisations }: any) => (
                                              <Fragment key={_id}>
                                                <li className="main">
                                                    <img src={selected_url || menu} alt="" />{trade_name}
                                                </li>
                                                {specialisations?.map(({ _id, name }: { _id: string, name: string }) => {
                                                  return <li key={_id}>{name}</li>
                                                })}
                                              </Fragment>
                                            ))}
                                        </ul>) : (
                                        <ul>
                                            {profileData?.tradeName && <li className="main">
                                                <img src={profileData?.tradeSelectedUrl || menu} alt="" />{profileData?.tradeName || ''}
                                            </li>}
                                            {profileData?.areasOfjobs?.map((item: any) => {
                                                return <li key={item.specializationId}>{item.specializationName || ''}</li>
                                            })}
                                        </ul>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="section_wrapper">
                <div className="custom_container">
                    <span className="sub_title">{props.isSkeletonLoading ? <Skeleton /> : 'Portfolio'}</span>
                    <Carousel
                        responsive={portfolio}
                        showDots={false}
                        arrows={true}
                        infinite={true}
                        className="portfolio_wrappr"
                        partialVisbile
                    >
                        {props.isSkeletonLoading ? <Skeleton height={256} /> : profileData?.portfolio?.length ? profileData?.portfolio?.map((item: any) => {
                            return (
                                <div className="media" key={item.portfolioId} onClick={() => portfolioImageHandler(item)}>
                                    <figure className="portfolio_img">
                                        <img src={item.portfolioImage?.length ? item.portfolioImage[0] : portfolioPlaceholder} alt="portfolio-images" />
                                        <span className="xs_sub_title">
                                            <p className="line-3" title={item.jobName || ''}>{item.jobName || ''}</p>
                                        </span>
                                    </figure>
                                </div>
                            )
                        }) :
                            <div className="media">
                                <figure className="portfolio_img">
                                    <img src={portfolioPlaceholder} alt="portfolio-images" />
                                </figure>
                            </div>}
                    </Carousel>
                </div>
            </div>

            <Modal
                className="custom_modal"
                open={portfolioData.portfolioImageClicked}
                onClose={() => setPortfolioData((prevData: any) => ({ ...prevData, portfolioImageClicked: false }))}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div className="custom_wh portfolio_preview" data-aos="zoom-in" data-aos-delay="30" data-aos-duration="1000">
                    <div className="heading">
                        <button className="close_btn" onClick={() => setPortfolioData((prevData: any) => ({ ...prevData, portfolioImageClicked: false }))}>
                            <img src={cancel} alt="cancel" />
                        </button>
                    </div>
                    <div className="flex_row">
                        <div className="flex_col_sm_6">
                            <Carousel
                                responsive={portfolioModal}
                                showDots={true}
                                infinite={true}
                                autoPlay={true}
                                arrows={false}
                                className="portfolio_wrappr"
                            >
                                {portfolioData?.portfolioDetails ? portfolioData?.portfolioDetails?.portfolioImage?.map((image: string) => {
                                    return (
                                        <div className="media" key={portfolioData?.portfolioDetails?.portfolioId}>
                                            <figure className="portfolio_img">
                                                <img src={image ? image : portfolioPlaceholder} alt="portfolio-images" />
                                            </figure>
                                        </div>
                                    )
                                }) : <img alt="" src={portfolioPlaceholder} />}
                            </Carousel>
                        </div>
                        <div className="flex_col_sm_6">
                            <span className="xs_sub_title">Job Description</span>
                            <div className="job_content">
                                {/* <p>Sparky wanted for a quick job to hook up two floodlights on the exterior of an apartment building to the main electrical grid. Current sparky away due to illness so need a quick replacement, walls are all prepped and just need lights wired. Can also provide free lunch on site and a bit of witty banter on request.
                                    Sparky wanted for a quick job to hook up two floodlights on the exterior of an apartment building to the main electrical grid. Current sparky away due to illness so need a quick replacement, walls are all prepped and just need lights wired. Can also provide free lunch on site and a bit of witty banter on request.
                                    Sparky wanted for a quick job to hook up two floodlights on the exterior of an apartment building to the main electrical grid. Current sparky away due to illness so need a quick replacement, walls are all prepped and just need lights wired. Can also provide free lunch on site and a bit of witty banter on request.</p> */}
                                <p>{portfolioData?.portfolioDetails?.jobDescription}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>

            <div className="section_wrapper">
                <div className="custom_container">
                    <span className="sub_title">{props.isSkeletonLoading ? <Skeleton count={2} /> : 'Job posted'}</span>
                    {props.isSkeletonLoading ? <Skeleton height={250} /> : <div className="flex_row tradies_row">
                        {(props.isSkeletonLoading || props.isLoading || profileData?.jobPostedData?.length > 0) ?
                            (profileData?.jobPostedData?.slice(0, 4)?.map((jobData: any) => {
                                return <TradieJobInfoBox item={jobData} {...props} key={jobData.jobId} />
                            })) :
                            <div className="no_record">
                                <figure className="no_data_img">
                                    <img src={noDataFound} alt="data not found" />
                                </figure>
                                <span>No Data Found</span>
                            </div>}
                    </div>}
                    {props.isSkeletonLoading ? <Skeleton /> : <button
                        className={`fill_grey_btn full_btn m-tb40 view_more ${profileData?.totalJobPostedCount === 0 ? 'disable_btn' : ''}`}
                        disabled={profileData?.totalJobPostedCount === 0}
                        onClick={builderAllJobsClicked}
                    >
                        {`View ${profileData?.totalJobPostedCount ? `${profileData?.totalJobPostedCount === 1 ? `${profileData?.totalJobPostedCount} job` : `all ${profileData?.totalJobPostedCount} jobs`}` : ''}`}
                    </button>}
                </div>
            </div >

            <div className="section_wrapper">
                <div className="custom_container">
                    <span className="sub_title">{props.isSkeletonLoading ? <Skeleton count={2} /> : 'Reviews'}</span>
                    {props.isSkeletonLoading ? <Skeleton height={200} /> : <div className="flex_row review_parent">
                        {(props.isSkeletonLoading || props.isLoading || profileData?.reviewData?.length > 0) ?
                            (profileData?.reviewData?.slice(0, 8)?.map((jobData: any) => {
                                return <ReviewInfoBox item={jobData} {...props} />
                            })) :
                            <div className="no_record">
                                <figure className="no_data_img">
                                    <img src={noDataFound} alt="data not found" />
                                </figure>
                                <span>No Data Found</span>
                            </div>}
                    </div>}
                    {props.isSkeletonLoading ? <Skeleton /> : <button
                        className={`fill_grey_btn full_btn view_more ${profileData?.reviewsCount === 0 ? 'disable_btn' : ''}`}
                        disabled={profileData?.reviewsCount === 0}
                        onClick={() => setReviewsData((prevData: any) => ({ ...prevData, showAllReviewsClicked: true }))}
                    >
                        {`View ${profileData?.reviewsCount ? `${profileData?.reviewsCount === 1 ? `${profileData?.reviewsCount} review` : `all ${profileData?.reviewsCount} reviews`}` : ''}`}
                    </button>}
                </div>
            </div>

            {/* view All reviews  */}
            {reviewsData.showAllReviewsClicked && reviewList?.length > 0 &&
                <Modal
                    className="ques_ans_modal"
                    open={reviewsData.showAllReviewsClicked}
                    onClose={() => modalCloseHandler('showAllReviewsClicked')}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div className="custom_wh" data-aos="zoom-in" data-aos-delay="30" data-aos-duration="1000">
                        <div className="heading">
                            <span className="sub_title">{`${profileData?.reviewsCount ? `${profileData?.reviewsCount === 1 ? `${profileData?.reviewsCount} review` : `${profileData?.reviewsCount} reviews`}` : ''}`}</span>
                            <button className="close_btn" onClick={() => modalCloseHandler('showAllReviewsClicked')}>
                                <img src={cancel} alt="cancel" />
                            </button>
                        </div>
                        <div className="inner_wrap">
                            {reviewList?.map((item: any) => {
                                const { reviewData } = item;
                                return (
                                    // <div key={reviewsData.reviewId}>
                                    <div>
                                        <div className="question_ans_card">
                                            <div className="user_detail">
                                                <figure className="user_img">
                                                    <img src={reviewData?.userImage || dummy} alt="user-img" />
                                                </figure>
                                                <div className="details">
                                                    <span className="user_name">{reviewData?.userName || ''}</span>
                                                    <span className="date">{reviewData?.date || ''}</span>
                                                </div>
                                                <div className="rating_star">
                                                    <ReactStars
                                                        count={5}
                                                        value={reviewData.rating}
                                                        size={20}
                                                        edit={false}
                                                        isHalf={true}
                                                        emptyIcon={<i className="far fa-star"></i>}
                                                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                                                        fullIcon={<i className="fa fa-star"></i>}
                                                        activeColor="#ffd700"
                                                    />
                                                </div>
                                            </div>
                                            <p>{reviewData?.review || ''}</p>
                                            {Object.keys(reviewData?.replyData).length > 0 && !(reviewsData.replyShownHideList.includes(reviewData?.replyData?.replyId)) &&
                                                <span className="show_hide_ans link"
                                                    onClick={() => reviewHandler('showReviewClicked', '', reviewData?.replyData?.replyId)}>Show reply</span>}
                                            {reviewsData.replyShownHideList.includes(reviewData?.replyData?.replyId) && <span className="show_hide_ans link" onClick={() => reviewHandler('hideReviewClicked', '', reviewData?.replyData?.replyId)}>Hide reply</span>}
                                            {!reviewData?.isModifiable && Object.keys(reviewData?.replyData).length === 0 && <span className="action link" onClick={() => reviewHandler('reviewReplyClicked', reviewData.reviewId)}>Reply</span>}
                                            {reviewData?.isModifiable && Object.keys(reviewData?.replyData).length === 0 && <span className="action link" onClick={() => reviewHandler('updateReviewBuilder', reviewData?.reviewId, '', reviewData?.review, reviewData?.rating)}>Edit</span>}
                                            {reviewData?.isModifiable && Object.keys(reviewData?.replyData).length === 0 && <span className="action link" onClick={() => reviewHandler('removeReviewBuilder', reviewData?.reviewId)}>Delete</span>}
                                        </div>
                                        {reviewData?.replyData?.reply && reviewsData.replyShownHideList.includes(reviewData?.replyData?.replyId) &&
                                            <div className="question_ans_card answer">
                                                <div className="user_detail">
                                                    <figure className="user_img">
                                                        <img src={reviewData?.replyData?.userImage || dummy} alt="user-img" />
                                                    </figure>
                                                    <div className="details">
                                                        <span className="user_name">{reviewData?.replyData?.userName || ''}</span>
                                                        <span className="date">{reviewData?.replyData?.date || ''}</span>
                                                    </div>
                                                </div>
                                                <p>{reviewData?.replyData?.reply}</p>
                                                {reviewData?.replyData?.isModifiable && <span className="action link" onClick={() => reviewHandler('updateReviewReply', reviewData?.replyData?.reviewId, reviewData?.replyData?.replyId, reviewData?.replyData?.reply)}>Edit</span>}
                                                {reviewData?.replyData?.isModifiable && <span className="action link" onClick={() => reviewHandler('removeReviewReply', reviewData?.replyData?.reviewId, reviewData?.replyData?.replyId)}>Delete</span>}
                                            </div>}
                                    </div>
                                )
                            })}
                            {profileData?.reviewsCount > reviewList.length && <div className="text-center">
                                <button className="fill_grey_btn load_more" onClick={loadMoreReviewHandler}>Load more</button>
                            </div>}
                        </div>
                    </div>
                </Modal>
            }
            {/* review reply modal */}
            <Modal
                className="ques_ans_modal"
                open={reviewsData.reviewReplyClicked}
                onClose={() => modalCloseHandler('reviewReplyClicked')}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div className="custom_wh ask_ques" data-aos="zoom-in" data-aos-delay="30" data-aos-duration="1000">
                    <div className="heading">
                        <span className="sub_title">{`${reviewsData.updateReviewsClicked ? 'Edit reply' : reviewsData.updateParentReviews ? 'Edit Review' : 'Reply'}`}</span>
                        <button className="close_btn" onClick={() => modalCloseHandler('reviewReplyClicked')}>
                            <img src={cancel} alt="cancel" />
                        </button>
                    </div>
                    <div className="form_field">
                        <label className="form_label">{`Your ${reviewsData.updateParentReviews ? 'review' : 'reply'}`}</label>
                        <div className="text_field">
                            <textarea placeholder="Text" maxLength={250} value={reviewsData.reviewData} onChange={(e) => handleChange(e, 'reviewData')}></textarea>
                            <span className="char_count">{`${reviewsData.reviewData?.length || '0'}/250`}</span>
                        </div>
                        {!!errors.reviewData && <span className="error_msg">{errors.reviewData}</span>}
                    </div>
                    <div className="bottom_btn custom_btn">
                        {(reviewsData.updateReviewsClicked || reviewsData.updateParentReviews) ?
                            <button className="fill_btn full_btn btn-effect" onClick={() => submitReviewHandler(reviewsData.reviewsClickedType)}>Save</button>
                            : <button className="fill_btn full_btn btn-effect" onClick={() => reviewHandler(reviewsData.reviewsClickedType)}>Send</button>}
                        <button className="fill_grey_btn btn-effect" onClick={() => reviewHandler('replyCancelBtnClicked')}>Cancel</button>
                    </div>
                </div>
            </Modal>
            {/* send confirmation modal */}

            <Modal
                className="custom_modal"
                open={reviewsData.confirmationClicked}
                onClose={() => modalCloseHandler('confirmationClicked')}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div className="custom_wh confirmation" data-aos="zoom-in" data-aos-delay="30" data-aos-duration="1000">
                    <div className="heading">
                        <span className="xs_sub_title">{`${(reviewsData.deleteReviewsClicked || reviewsData.deleteParentReviews) ? 'Delete' : 'Reply'} Confirmation`}</span>
                        <button className="close_btn" onClick={() => modalCloseHandler('confirmationClicked')}>
                            <img src={cancel} alt="cancel" />
                        </button>
                    </div>
                    <div className="modal_message">
                        <p>{`Are you sure you want to ${reviewsData.deleteReviewsClicked ? 'delete ' : ''}${reviewsData.deleteParentReviews ? 'delete review' : 'reply'}?`}</p>
                    </div>
                    <div className="dialog_actions">
                        <button className="fill_btn btn-effect" onClick={() => submitReviewHandler(reviewsData.reviewsClickedType)}>Yes</button>
                        <button className="fill_grey_btn btn-effect" onClick={() => modalCloseHandler('confirmationClicked')}>No</button>
                    </div>
                </div>
            </Modal>

        </div >
    )
}
export { portfolio, portfolioModal };
export default BuilderInfo;