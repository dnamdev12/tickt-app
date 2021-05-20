import { useState, useEffect } from 'react';
import { getBuilderProfile } from '../../redux/jobs/actions';
import TradieJobInfoBox from '../../common/tradieJobInfoBox';
import Modal from '@material-ui/core/Modal';
import ReviewInfoBox from '../../common/reviewInfoBox';

import profilePlaceholder from '../../assets/images/ic-placeholder-detail.png';
import dummy from '../../assets/images/u_placeholder.jpg';
import portfolioPlaceholder from '../../assets/images/portfolio-placeholder.jpg';
import noData from '../../assets/images/no-data.png';
import cancel from "../../assets/images/ic-cancel.png";

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

interface PropsType {
    location: any,
    history: any,
    getTradieReviewList: (data: any) => void,
    tradieReviewList: Array<object>,
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
    const [profileData, setProfileData] = useState<any>('');
    const [portfolioData, setPortfolioData] = useState<any>({
        portfolioImageClicked: false,
        portfolioDetails: '',
    });

    const [reviewsData, setReviewsData] = useState<any>({
        reviewReplyClicked: false,
        showAllReviewsClicked: false,
        submitReviewsClicked: false,
        deleteReviewsClicked: false,
        updateReviewsClicked: false,
        questionsClickedType: '',
        confirmationClicked: false,
        showReviewAnswerButton: true,
        questionId: '',
        questionData: ''
    })
    console.log(reviewsData, "reviewData");

    console.log(portfolioData, "portfolioData", props.tradieReviewList, "eded");

    useEffect(() => {
        (async () => {
            const builderId: any = new URLSearchParams(props.location?.search).get('builderId');
            const res = await getBuilderProfile(builderId);
            if (res?.success) {
                setProfileData(res.data);
                const data = {
                    builderId: res.data?.builderId,
                    page: 1
                }
                props.getTradieReviewList(data);
            }
        })();
    }, [])

    const portfolioImageHandler = (data: any) => {
        setPortfolioData((prevData: any) => ({ ...prevData, portfolioImageClicked: true, portfolioDetails: data }));
    }

    const modalCloseHandler = (modalType: string) => {
        setReviewsData((prevData: any) => ({ ...prevData, [modalType]: false, deleteReviewsClicked: false, showAnswerButton: true, showQuestionAnswer: false }))
    }

    const questionHandler = (type: string, questionId?: string, question?: string) => {
        if (type == 'askUpdateQuestionCancelled') {
            setReviewsData((prevData: any) => ({
                ...prevData,
                reviewReplyClicked: false,
                updateQuestionsClicked: false,
                deleteReviewsClicked: false,
                showAllReviewsClicked: true,
                questionData: '',
                questionsClickedType: '',
                questionId: '',
            }));
        } else if (type == 'askQuestion') {
            setReviewsData((prevData: any) => ({
                ...prevData,
                reviewReplyClicked: true,
                showAllReviewsClicked: false,
                questionsClickedType: type,
            }));
        } else if (type == 'deleteQuestion') {
            setReviewsData((prevData: any) => ({ ...prevData, confirmationClicked: true, deleteQuestionsClicked: true, questionId: questionId, questionsClickedType: type }));
        } else if (type == 'updateQuestion') {
            setReviewsData((prevData: any) => ({
                ...prevData,
                reviewReplyClicked: true,
                updateQuestionsClicked: true,
                questionId: questionId,
                questionsClickedType: type,
                showAllReviewsClicked: false,
                questionData: question
            }));
        }
    }

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
                                    <img src={profilePlaceholder} alt="profile-pic" />
                                </figure>
                            </div>
                            <div className="flex_col_sm_4 relative">
                                <div className="detail_card">
                                    <span className="title">{profileData?.builderName}</span>
                                    <span className="tagg">{profileData?.position}</span>
                                    <span className="xs_sub_title">{profileData?.companyName}</span>
                                    <ul className="review_job">
                                        <li>
                                            <span className="icon reviews">{profileData?.ratings}</span>
                                            <span className="review_count">{`${profileData?.reviewsCount} reviews`}</span>
                                        </li>
                                        <li>
                                            <span className="icon job">{profileData?.jobCompletedCount}</span>
                                            <span className="review_count"> jobs completed</span>
                                        </li>
                                    </ul>
                                    <button className="fill_btn full_btn">Write a message</button>
                                </div>
                            </div>
                        </div>
                        <div className="flex_row description">
                            <div className="flex_col_sm_8">
                                <div>
                                    <span className="sub_title">About</span>
                                    <p className="commn_para">{profileData?.about}</p>
                                </div>
                            </div>
                            <div className="flex_col_sm_4">
                                <span className="sub_title">Areas of jobs</span>
                                <div className="tags_wrap">
                                    <ul>
                                        {profileData?.areasOfjobs?.map((item: any) => {
                                            return <li key={item.specializationId}>{item.specializationName}</li>
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="section_wrapper">
                <div className="custom_container">
                    <span className="sub_title">Portfolio</span>
                    {/* <ul className="portfolio_wrappr"> */}
                    <Carousel
                        responsive={portfolio}
                        showDots={false}
                        arrows={true}
                        infinite={true}
                        className="portfolio_wrappr"
                        partialVisbile
                    >
                        {profileData?.portfolio?.length ? profileData?.portfolio?.map((item: any) => {
                            return (
                                <div className="media" key={item.portfolioId} onClick={() => portfolioImageHandler(item)}>
                                    <figure className="portfolio_img">
                                        <img src={item.portfolioImage?.length ? item.portfolioImage[0] : portfolioPlaceholder} alt="portfolio-images" />
                                        <span className="xs_sub_title">{item.jobName}</span>
                                    </figure>
                                </div>
                            )
                        }) : <img alt="" src={portfolioPlaceholder} />}

                    </Carousel>
                    {/* </ul> */}
                </div>
            </div>
            {/* portfolio Image modal desc */}
            {portfolioData.portfolioImageClicked &&
                <Modal
                    className="ques_ans_modal"
                    open={portfolioData.portfolioImageClicked}
                    onClose={() => setPortfolioData((prevData: any) => ({ ...prevData, portfolioImageClicked: false }))}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div className="custom_wh">
                        <Carousel
                            responsive={portfolioModal}
                            showDots={true}
                            infinite={true}
                            autoPlay={true}
                            arrows={false}
                        // className="portfolio_wrappr"
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
                        <h5>job description</h5>
                        {/* <span className="xs_sub_title">{portfolioData?.portfolioDetails?.jobDescription}</span> */}
                        <p>Sparky wanted for a quick job to hook up two floodlights on the exterior of an apartment building to the main electrical grid. Current sparky away due to illness so need a quick replacement, walls are all prepped and just need lights wired. Can also provide free lunch on site and a bit of witty banter on request.</p>
                    </div>
                </Modal>}

            <div className="section_wrapper">
                <div className="custom_container">
                    <span className="sub_title">Job posted</span>
                    <div className="flex_row tradies_row">
                        {profileData?.jobPostedData?.length > 0 ?
                            (profileData?.jobPostedData?.slice(0, 4)?.map((jobData: any) => {
                                return <TradieJobInfoBox item={jobData} {...props} />
                            })) :
                            <div className="no_record">
                                <figure className="no_img">
                                    <img src={noData} alt="data not found" />
                                </figure>
                            </div>}
                    </div>
                    <button className="fill_grey_btn full_btn m-tb40 view_more" disabled={profileData?.jobPostedData?.length > 0}>{`View all ${profileData?.jobPostedData?.length ? `${profileData?.jobPostedData?.length} jobs` : ''}`}</button>
                </div>
            </div>

            <div className="section_wrapper">
                <div className="custom_container">
                    <span className="sub_title">Reviews</span>
                    <div className="flex_row review_parent">
                        {profileData?.reviewData?.length > 0 ?
                            (profileData?.reviewData?.slice(0, 8)?.map((jobData: any) => {
                                return <ReviewInfoBox item={jobData} {...props} />
                            })) :
                            <div className="no_record">
                                <figure className="no_img">
                                    <img src={noData} alt="data not found" />
                                </figure>
                            </div>}
                    </div>
                    <button className="fill_grey_btn full_btn view_more" onClick={() => setReviewsData((prevData: any) => ({ ...prevData, showAllReviewsClicked: true }))}>View all 10 reviews</button>
                </div>
            </div>
            {reviewsData.showAllReviewsClicked && props.tradieReviewList?.length > 0 &&
                <Modal
                    className="ques_ans_modal"
                    open={reviewsData.showAllReviewsClicked}
                    onClose={() => modalCloseHandler('showAllReviewsClicked')}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <>
                        <div className="custom_wh">
                            <div className="heading">
                                <span className="sub_title">{`${props.tradieReviewList?.length} questions`}</span>
                                <button className="close_btn" onClick={() => modalCloseHandler('showAllReviewsClicked')}>
                                    <img src={cancel} alt="cancel" />
                                </button>
                            </div>
                            <div className="inner_wrap">
                                {props.tradieReviewList?.map((item: any) => {
                                    const { reviewData } = item;
                                    console.log('review modalClicked', reviewData)
                                    return (
                                        <>
                                            <div className="question_ans_card">
                                                <div className="user_detail">
                                                    <figure className="user_img">
                                                        <img src={reviewData?.userImage || dummy} alt="user-img" />
                                                    </figure>
                                                    <div className="details">
                                                        <span className="user_name">{reviewData?.userName}</span>
                                                        <span className="date">{reviewData?.date}</span>
                                                    </div>
                                                </div>
                                                <p>{reviewData?.review}</p>
                                                {reviewData?.isModifiable && <span className="action link" onClick={() => questionHandler('updateQuestion')}>Reply</span>}
                                                {/* {reviewData?.isModifiable && <span className="action link" onClick={() => questionHandler('updateQuestion', reviewData?.questionId, reviewData?.question)}>Edit</span>} */}
                                                {/* {reviewData?.isModifiable && <span className="action link" onClick={() => questionHandler('deleteQuestion', reviewData?.questionId)}>Delete</span>} */}
                                                {(Object.keys(reviewData?.replyData).length > 0 && reviewsData?.showReviewAnswerButton) &&
                                                    <span className="show_hide_ans link"
                                                        onClick={() => setReviewsData((prevData: any) => ({ ...prevData, showQuestionAnswer: true, showReviewAnswerButton: false }))}>Show review</span>}
                                            </div>
                                            {/* {reviewData?.replyData?.answer && reviewsData.showQuestionAnswer &&
                                                <div className="question_ans_card answer">
                                                    <div className="user_detail">
                                                        <figure className="user_img">
                                                            <img src={dummy} alt="user-img" />
                                                        </figure>
                                                        <div className="details">
                                                            <span className="user_name">{reviewData?.replyData?.userName}</span>
                                                            <span className="date">{reviewData?.replyData?.date}</span>
                                                        </div>
                                                    </div>
                                                    <p>{reviewData?.replyData?.answer}</p>
                                                </div>} */}
                                            {/* {reviewData?.isModifiable && <span className="action link" onClick={() => questionHandler('updateQuestion', reviewData?.questionId, reviewData?.question)}>Edit</span>} */}
                                            {/* {reviewData?.isModifiable && <span className="action link" onClick={() => questionHandler('deleteQuestion', reviewData?.questionId)}>Delete</span>} */}
                                        </>
                                    )
                                })}
                            </div>
                        </div>
                    </>
                </Modal>
            }
        </div>
    )
}

export default BuilderInfo;

{/* <div className="text-center">
    <button className="fill_grey_btn load_more">Load more</button>
</div> */}