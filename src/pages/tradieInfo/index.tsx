import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import {
    getBuilderProfile,
    tradieReviewReply,
    tradieUpdateReviewReply,
    tradieRemoveReviewReply,
    getTradieReviewListOnBuilder,
    getAcceptDeclineTradie,
    reviewReply,
    updateReviewReply,
    removeReviewReply,
    getTradeReviews,
    getTradeProfile,
    HomeTradieProfile,
    CancelInviteForJob,
} from '../../redux/jobs/actions';
import {
    getTradieProfile,
    getTradieProfileView
} from '../../redux/profile/actions';
import { setShowToast } from '../../redux/common/actions';
import { SaveTradie } from '../../redux/jobs/actions';
import storageService from '../../utils/storageService';
import { portfolio, portfolioModal } from '../builderInfo/builderInfo'
import VoucherDetail from './voucherDetail';
import TradieJobInfoBox from '../../common/tradieJobInfoBox';
import Modal from '@material-ui/core/Modal';
import ReviewInfoBox from '../../common/reviewInfoBox';

import profilePlaceholder from '../../assets/images/ic-placeholder-detail.png';
import dummy from '../../assets/images/u_placeholder.jpg';
import portfolioPlaceholder from '../../assets/images/portfolio-placeholder.jpg';
import noData from '../../assets/images/no-search-data.png';
import menu from '../../assets/images/menu-line-blue.png';
import cancel from "../../assets/images/ic-cancel.png";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import Skeleton from 'react-loading-skeleton';

import vouch from '../../assets/images/ic-template.png';
import _ from 'lodash';

const USER_TYPE = storageService.getItem('userType');
interface Props {
    tradieInfo: any,
    tradieId: any,
    jobId: any,
    tradieReviews: any,
    userType: number,
    tradieProfileViewData: any,
    getTradieProfile: (data: any) => void,
    getTradieReviewListOnBuilder: (data: any) => void,
    getAcceptDeclineTradie: (data: any) => void,
    getTradieProfileView: () => void,
}

interface State {
    tradieInfo: any,
    tradieReviews: any,
    profileData: any,
    portfolioData: {
        portfolioImageClicked: boolean,
        portfolioDetails: {
            portfolioImage: any,
            portfolioId: any,
            jobDescription: any
        },
    },
    reviewsData: {
        reviewReplyClicked: boolean,
        showAllReviewsClicked: boolean,
        submitReviewsClicked: boolean,
        deleteReviewsClicked: boolean,
        updateReviewsClicked: boolean,
        reviewsClickedType: any,
        confirmationClicked: boolean,
        showReviewReplyButton: boolean,
        reviewId: any,
        reviewData: any,
        showReviewReply: boolean,
        replyShownHideList: any
    },
    toggleVoucher: {
        item: string,
        isTrue: boolean
    }
}

class TradieInfo extends Component<Props, State> {
    state = {
        tradieInfo: null,
        tradieReviews: null,
        profileData: {},
        portfolioData: {
            portfolioImageClicked: false,
            portfolioDetails: {
                portfolioImage: [],
                portfolioId: '',
                jobDescription: ''
            },
        },
        reviewsData: {
            reviewReplyClicked: false,
            showAllReviewsClicked: false,
            submitReviewsClicked: false,
            deleteReviewsClicked: false,
            updateReviewsClicked: false,
            reviewsClickedType: '',
            confirmationClicked: false,
            showReviewReplyButton: true,
            reviewId: '',
            reviewData: '',
            showReviewReply: false,
            replyShownHideList: []
        },
        tradieReviewList: [],
        toggleVoucher: { item: '', isTrue: false }
    };


    componentWillUnmount() {
        this.setState({
            tradieInfo: null,
            tradieReviews: null,
            profileData: {},
            portfolioData: {
                portfolioImageClicked: false,
                portfolioDetails: {
                    portfolioImage: [],
                    portfolioId: '',
                    jobDescription: ''
                },
            },
            reviewsData: {
                reviewReplyClicked: false,
                showAllReviewsClicked: false,
                submitReviewsClicked: false,
                deleteReviewsClicked: false,
                updateReviewsClicked: false,
                reviewsClickedType: '',
                confirmationClicked: false,
                showReviewReplyButton: true,
                reviewId: '',
                reviewData: '',
                showReviewReply: false,
                replyShownHideList: []
            }
        });
    }

    getItemsFromLocation = () => {
        let props: any = this.props;
        const urlParams = new URLSearchParams(props.location.search)
        let jobId = urlParams.get('jobId')
        let specializationId = urlParams.get('specializationId')
        let tradeId = urlParams.get('tradeId')
        let user_type = urlParams.get('type')
        return { jobId, specializationId, tradeId, user_type };
    }

    componentDidMount() {
        this.setItems();
    }

    static getDerivedStateFromProps(nextProps: any, prevState: any) {
        if (nextProps.tradieProfileViewData && !_.isEqual(nextProps.tradieProfileViewData, prevState.tradieInfo)) {
            return {
                tradieInfo: nextProps.tradieProfileViewData
            }
        }
        return null;
    }

    componentDidUpdate() {
        let props: any = this.props;
        let tradeStatus: any = props.tradieRequestStatus;
        console.log({ tradeStatus })
        if (tradeStatus) {
            props.history.push('/jobs');
        }
    }

    portfolioImageHandler = (data: any) => {
        this.setState({ portfolioData: { portfolioImageClicked: true, portfolioDetails: data } });
    }

    modalCloseHandler = (modalType: string) => {
        this.setState((prev: any) => ({ reviewsData: { ...prev.reviewsData, [modalType]: false, deleteReviewsClicked: false } }))
    }

    reviewHandler = (type: any, reviewId?: any, replyId?: any, reply?: any) => {
        console.log({ type, reviewId })
        if (type === 'reviewReplyClicked') {
            this.setState((prevData: any) => ({
                reviewsData: {
                    ...prevData.reviewsData,
                    reviewReplyClicked: true,
                    showAllReviewsClicked: false,
                    // reviewsClickedType: type,
                    reviewId: reviewId,
                }
            }));
        } else if (type === 'reviewReply') {
            this.setState((prevData: any) => ({
                reviewsData: {
                    ...prevData.reviewsData,
                    submitReviewsClicked: true,
                    reviewsClickedType: type,
                    confirmationClicked: true
                }
            }));
        } else if (type === 'removeReviewReply') {
            this.setState((prevData: any) => ({
                reviewsData: {
                    ...prevData.reviewsData,
                    confirmationClicked: true,
                    deleteReviewsClicked: true,
                    reviewId: reviewId,
                    replyId: replyId,
                    reviewsClickedType: type
                }
            }));
        } else if (type === 'updateReviewReply') {
            this.setState((prevData: any) => ({
                reviewsData: {
                    ...prevData.reviewsData,
                    reviewReplyClicked: true,
                    updateReviewsClicked: true,
                    reviewId: reviewId,
                    replyId: replyId,
                    reviewsClickedType: type,
                    showAllReviewsClicked: false,
                    reviewData: reply
                }
            }));
        } else if (type === 'replyCancelBtnClicked') {
            this.setState((prevData: any) => ({
                reviewsData: {
                    ...prevData.reviewsData,
                    reviewReplyClicked: false,
                    updateReviewsClicked: false,
                    deleteReviewsClicked: false,
                    showAllReviewsClicked: true,
                    reviewData: '',
                    reviewsClickedType: '',
                    reviewId: '',
                }
            }));
        } else if (type === 'hideReviewClicked') {
            let item_: any = {};
            let reply_id: any = replyId;
            item_ = this.state.reviewsData?.replyShownHideList;
            if (item_[reply_id] === undefined) {
                item_[reply_id] = true;
            } else {
                item_[reply_id] = !item_[reply_id];
            }

            this.setState((prevData: any) => ({ reviewsData: { ...prevData.reviewsData, replyShownHideList: item_ } }));

            // let reviewsData = this.state.reviewsData;
            // const newData = [...reviewsData.replyShownHideList].filter(id => id !== replyId);
            // this.setState((prevData: any) => ({ reviewsData: { ...prevData.reviewsData, replyShownHideList: newData } }));
        } else if (type === 'showReviewClicked') {
            let item_: any = {};
            let reply_id: any = replyId;
            item_ = this.state.reviewsData?.replyShownHideList;
            if (item_[reply_id] === undefined) {
                item_[reply_id] = true;
            } else {
                item_[reply_id] = !item_[reply_id];
            }

            this.setState((prevData: any) => ({ reviewsData: { ...prevData.reviewsData, replyShownHideList: item_ } }));
            // let reviewsData = this.state.reviewsData;
            // const newData: any = [...reviewsData.replyShownHideList];
            // newData.push(replyId);
            // this.setState((prevData: any) => ({ reviewsData: { ...prevData.reviewsData, replyShownHideList: newData } }));
        }
    }

    handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>, type: string) => {
        if (e.target.value.trim().length <= 250) {
            this.setState((prevData: any) => ({ reviewsData: { ...prevData.reviewsData, [type]: e.target.value } }))
        }
    }

    submitReviewHandler = async (type: any) => {
        let reviewsData: any = this.state.reviewsData;
        let profileData: any = this.state.profileData;
        if (['reviewReply', 'updateReviewReply', 'removeReviewReply'].includes(type)) {
            var response;

            if (type === 'reviewReply') {
                const data = {
                    reviewId: reviewsData.reviewId,
                    reply: reviewsData.reviewData
                }
                // need to send reply id in response
                response = await reviewReply(data);
            }
            if (type === 'updateReviewReply') {
                const data = {
                    reviewId: reviewsData.reviewId,
                    replyId: reviewsData?.replyId,
                    reply: reviewsData.reviewData
                }
                response = await updateReviewReply(data);
            }
            if (type === 'removeReviewReply') {
                const data = {
                    reviewId: reviewsData.reviewId,
                    replyId: reviewsData.replyId
                }
                response = await removeReviewReply(data);
            }

            if (response?.success) {
                this.setItems();
            }

            this.setState((prevData: any) => ({
                reviewsData: {
                    ...prevData.reviewsData,
                    submitReviewsClicked: false,
                    reviewReplyClicked: false,
                    showAllReviewsClicked: true,
                    confirmationClicked: false,
                    reviewsClickedType: '',
                    deleteReviewsClicked: false,
                    updateReviewsClicked: false,
                    reviewId: '',
                    reviewData: '',
                    replyShownHideList: []
                }
            }))
        }
    }

    setItems = async () => {
        const { jobId, tradeId, user_type } = this.getItemsFromLocation();

        if (user_type == '1' || this.props.userType == 1) {
            console.log(USER_TYPE, "USER_TYPE", user_type, "user_type", this.props.userType, "this.props.userType");
            this.props.getTradieProfileView();
        } else if (jobId) {
            let res_profile: any = await getTradeProfile({ tradieId: tradeId, jobId: jobId });
            console.log({ res_profile })
            if (res_profile.success) {
                this.setState({ tradieInfo: res_profile.data })
            }
        } else {
            let res_profile: any = await HomeTradieProfile({ tradieId: tradeId });
            console.log({ res_profile })
            if (res_profile?.success) {
                this.setState({ tradieInfo: res_profile.data })
            }
        }

        let res_trade: any = await getTradeReviews({ tradieId: tradeId, page: 1 });
        console.log({ res_trade })
        if (res_trade?.success) {
            this.setState({ tradieReviews: res_trade.data })
        }
    }

    submitAcceptDeclineRequest = (status: any) => {
        let props: any = this.props;
        const { getAcceptDeclineTradie } = props;
        const { jobId, tradeId } = this.getItemsFromLocation();
        let data = {
            "jobId": jobId,
            "tradieId": tradeId,
            "status": status
        };
        getAcceptDeclineTradie(data);
    }

    savedTradie = async ({ tradieInfo }: any) => {
        let data = {
            tradieId: tradieInfo?._id || tradieInfo?.tradieId,
            isSave: tradieInfo?.isSaved ? false : true
        }
        let response = await SaveTradie(data);
        if (response.success) {
            await this.setItems()
        }
    }

    cancelInvite = async () => {
        let data = {

        };
        let response: any = CancelInviteForJob(data);
        if (response.success) {
            await this.setItems()
        }
    }

    closeToggle = () => {
        this.setState({
            toggleVoucher: { item: '', isTrue: false }
        })
    }

    renderBtn = ({ hideInvite }: any) => {
        if (hideInvite) {

        }
    }

    render() {
        let props: any = this.props;
        // let tradieInfo: any = props.tradieInfo;
        const { user_type } = this.getItemsFromLocation();
        let { portfolioData, toggleVoucher } = this.state;
        let reviewsData: any = this.state.reviewsData;
        let tradieInfo: any = this.state.tradieInfo;
        let userType: number = Number(user_type);
        let tradieReviews: any = this.state.tradieReviews;
        let isSkeletonLoading: boolean = props.isSkeletonLoading;

        console.log(tradieInfo, "tradieInfo", userType, "userType");

        let profileData: any = tradieInfo;
        let { portfolioImageHandler, modalCloseHandler, reviewHandler, submitReviewHandler, handleChange, submitAcceptDeclineRequest } = this;

        const urlParams = new URLSearchParams(props.location.search)
        let hideInvite: any = false;
        let haveJobId: any = false;

        if (urlParams.get('hideInvite')) {
            hideInvite = urlParams.get('hideInvite') === "false" ? false : true;
        }

        haveJobId = urlParams.get('jobId') == null ? false : true;

        return (
            <div className="app_wrapper">
                <div className="section_wrapper">
                    <div className="custom_container">


                        <VoucherDetail
                            toggleProps={toggleVoucher.isTrue}
                            item={toggleVoucher.item}
                            id={tradieInfo?.tradeId}
                            closeToggle={this.closeToggle}
                        />

                        <div className="vid_img_wrapper pt-20">
                            <div className="flex_row">
                                <div className="flex_col_sm_8 relative">
                                    <button className="back" onClick={() => {
                                        props.history.goBack();
                                    }}></button>
                                </div>
                            </div>
                            <div className="flex_row">
                                <div className="flex_col_sm_8">
                                    <figure className="vid_img_thumb">
                                        {isSkeletonLoading ? <Skeleton style={{ lineHeight: 2, height: 400 }} /> : <img
                                            src={userType === 1 ? tradieInfo?.userImage : tradieInfo?.tradieImage ? tradieInfo?.tradieImage : profilePlaceholder}
                                            alt="profile-pic"
                                        />}
                                    </figure>
                                </div>
                                <div className="flex_col_sm_4 relative">
                                    <div className="detail_card">
                                        {props.isSkeletonLoading ? <Skeleton count={5} height={25} /> :
                                            <>
                                                <span className="title line-3" title="">{userType === 1 ? tradieInfo?.userName : tradieInfo?.tradieName ? tradieInfo?.tradieName : ''}</span>
                                                <span className="tagg  mb30">{userType === 1 ? 'Tradesperson' : tradieInfo?.position ? tradieInfo?.position : ''}</span>
                                                <ul className="review_job">
                                                    <li>
                                                        <span className="icon reviews">{tradieInfo?.ratings || '0'}</span>
                                                        <span className="review_count">{`${tradieInfo?.reviewsCount || '0'} reviews`}</span>
                                                    </li>
                                                    <li>
                                                        <span className="icon job">{tradieInfo?.jobCompletedCount || '0'}</span>
                                                        <span className="review_count"> jobs completed</span>
                                                    </li>
                                                </ul>

                                                {userType === 1 ? (
                                                    <button className="fill_btn full_btn btn-effect" onClick={() => props.history.push('/update-user-info')}>Edit</button>
                                                ) : (!tradieInfo?.isRequested && !hideInvite ? (
                                                    <div className="form_field">
                                                        {tradieInfo?.isInvited ? (
                                                            <div className="bottom_btn">
                                                                <span
                                                                    onClick={() => {
                                                                        this.savedTradie({ tradieInfo })
                                                                    }}
                                                                    className={`bookmark_icon ${tradieInfo?.isSaved ? 'active' : ''}`}></span>
                                                                <button className="fill_btn full_btn btn-effect">
                                                                    {'Cancel Invite'}
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <div className="bottom_btn">
                                                                <span
                                                                    onClick={() => {
                                                                        this.savedTradie({ tradieInfo })
                                                                    }}
                                                                    className={`bookmark_icon ${tradieInfo?.isSaved ? 'active' : ''}`}></span>
                                                                <button
                                                                    onClick={() => {
                                                                        console.log({ tradieInfo })
                                                                        props.history.push({
                                                                            pathname: '/choose-the-job',
                                                                            state: {
                                                                                tradieId: tradieInfo?._id || tradieInfo?.tradieId,
                                                                                path: props.location.search,
                                                                            }
                                                                        })
                                                                    }}
                                                                    className="fill_btn full_btn btn-effect">
                                                                    {'Invite for job'}
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : haveJobId ? (
                                                    <>
                                                        <div className="form_field">
                                                            <button
                                                                onClick={() => { submitAcceptDeclineRequest(1) }}
                                                                className="fill_btn full_btn btn-effect">Accept</button>
                                                        </div>
                                                        <div className="form_field">
                                                            <button
                                                                onClick={() => { submitAcceptDeclineRequest(2) }}
                                                                className="fill_grey_btn full_btn btn-effect">Decline</button>
                                                        </div>
                                                    </>
                                                ) : null)}
                                            </>}
                                    </div>
                                </div>
                            </div>
                            <div className="flex_row description">
                                <div className="flex_col_sm_8">
                                    {props.isSkeletonLoading ? <Skeleton count={2} /> : tradieInfo?.about?.length > 0 ? (
                                        <div>
                                            <span className="sub_title">About</span>
                                            <p className="commn_para">{tradieInfo?.about}</p>
                                        </div>
                                    ) :
                                        <div>
                                            <span className="sub_title">About</span>
                                            <p className="commn_para">You have not added your information yet, Please go to edit and add.</p>
                                        </div>}
                                </div>
                                <div className="flex_col_sm_4">
                                    {props.isSkeletonLoading ? <Skeleton count={3} /> : userType === 1 ? (
                                        <>
                                            <span className="sub_title">Areas of specialisation</span>
                                            <div className="tags_wrap">
                                                <ul>
                                                    <li className="main">
                                                        <img src={tradieInfo?.areasOfSpecialization?.tradeData[0]?.tradeSelectedUrl || menu} alt="" />{tradieInfo?.areasOfSpecialization?.tradeData[0]?.tradeName || ''}
                                                    </li>
                                                    {tradieInfo?.areasOfSpecialization?.specializationData?.map((item: any) => {
                                                        return <li key={item.specializationId}>{item.specializationName || ''}</li>
                                                    })}
                                                </ul>
                                            </div>
                                        </>
                                    ) : (tradieInfo?.areasOfSpecialization?.length > 0 ? (
                                        <>
                                            <span className="sub_title">Areas of specialisation</span>
                                            <div className="tags_wrap">
                                                <ul>
                                                    {tradieInfo?.tradeName && <li className="main">
                                                        <img src={tradieInfo?.tradeSelectedUrl || menu} alt="" />{tradieInfo?.tradeName || ''}
                                                    </li>}
                                                    {tradieInfo?.areasOfSpecialization?.map((item: any) => {
                                                        return <li key={item.specializationId}>{item.specializationName}</li>
                                                    })}
                                                </ul>
                                            </div>
                                        </>
                                    ) : null)}
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
                            {props.isSkeletonLoading ? <Skeleton height={256} /> : tradieInfo?.portfolio?.length ? tradieInfo?.portfolio?.map((item: any) => {
                                return (
                                    <div className="media" key={item.portfolioId} onClick={() => portfolioImageHandler(item)}>
                                        <figure className="portfolio_img">
                                            <img src={item.portfolioImage?.length ? item.portfolioImage[0] : portfolioPlaceholder} alt="portfolio-images" />
                                            <span className="xs_sub_title">
                                                <p className="line-3" title={item.jobName}>{item.jobName}</p>
                                            </span>
                                        </figure>
                                    </div>
                                )
                            }) : <img alt="" src={portfolioPlaceholder} />}
                        </Carousel>
                    </div>
                </div>

                {/* portfolio Image modal desc */}
                {portfolioData?.portfolioImageClicked &&
                    <Modal
                        className="custom_modal"
                        open={portfolioData.portfolioImageClicked}
                        onClose={() => {
                            this.setState((prev: any) => ({ portfolioData: { ...prev.portfolioData, portfolioImageClicked: false } }))
                        }}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        <div className="custom_wh portfolio_preview">
                            <div className="heading">
                                <button
                                    onClick={() => {
                                        this.setState((prev: any) => ({ portfolioData: { ...prev.portfolioData, portfolioImageClicked: false } }))
                                    }}
                                    className="close_btn">
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
                                        {portfolioData?.portfolioDetails &&
                                            portfolioData?.portfolioDetails?.portfolioImage &&
                                            portfolioData?.portfolioDetails?.portfolioImage?.length ?
                                            portfolioData?.portfolioDetails?.portfolioImage?.map((image: string) => {
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
                                        <p>{portfolioData?.portfolioDetails?.jobDescription}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal>}

                <div className="section_wrapper">
                    <div className="custom_container">
                        <span className="sub_title">{props.isSkeletonLoading ? <Skeleton /> : 'Reviews'}</span>
                        {props.isSkeletonLoading ? <Skeleton height={200} /> : <div className="flex_row review_parent">
                            {tradieInfo?.reviewData?.length > 0 ?
                                (tradieInfo?.reviewData?.slice(0, 8)?.map((jobData: any) => {
                                    return <ReviewInfoBox item={jobData} {...props} />
                                })) :
                                <div className="no_record">
                                    <figure className="no_data_img">
                                        <img src={noData} alt="data not found" />
                                    </figure>
                                    <span>No Data Found</span>
                                </div>}
                        </div>}
                        {props.isSkeletonLoading ? <Skeleton height={25} /> : <button
                            className="fill_grey_btn full_btn view_more"
                            onClick={() => {
                                this.setState((prevData: any) => ({
                                    reviewsData: {
                                        ...prevData.reviewsData, showAllReviewsClicked: true
                                    }
                                }))
                            }}>
                            {`View all ${tradieInfo?.reviewsCount || 0} ${tradieInfo?.reviewsCount === 1 ? 'review' : 'reviews'} `}</button>}
                    </div>
                </div>

                {tradieInfo?.vouchesData?.length ?
                    <div className="section_wrapper">
                        <div className="custom_container">
                            <span className="sub_title">Vouches</span>
                            <div className="flex_row">

                                {tradieInfo?.vouchesData.map((item: any) => (
                                    <div className="flex_col_sm_3">
                                        <div className="review_card vouchers">
                                            <div className="pic_shot_dtl">
                                                <figure className="u_img">
                                                    <img src={item?.userImage || dummy} alt="user-img" />
                                                </figure>
                                                <div className="name_wrap">
                                                    <span className="user_name" title={item?.builderName || ''}>
                                                        {item?.builderName || ''}
                                                    </span>
                                                    <span className="date">
                                                        {item?.date}
                                                    </span>
                                                </div>
                                            </div>

                                            <span className="xs_head">
                                                {item?.jobName}
                                            </span>

                                            <p className="commn_para" title="">
                                                {item?.vouchDescription || ''}
                                            </p>
                                            <div className="vouch">
                                                <figure className="vouch_icon">
                                                    <img src={vouch} alt="vouch" />
                                                </figure>
                                                <span
                                                    onClick={() => {
                                                        this.setState({
                                                            toggleVoucher: { item: item, isTrue: true }
                                                        })
                                                    }}
                                                    className="link">
                                                    {`Vouch for ${item?.tradieName}`}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {console.log({ tradieInfo })}
                            <button
                                className="fill_grey_btn full_btn view_more"
                                onClick={() => {
                                    props.history.push({
                                        pathname: '/tradie-vouchers',
                                        state: {
                                            path: props.location.search,
                                            id: tradieInfo.tradieId
                                        }
                                    });
                                }}>
                                {`View all ${tradieInfo?.vouchesData?.length} vouches`}</button>
                        </div>
                    </div>
                    : null}

                {
                    reviewsData.showAllReviewsClicked && tradieReviews?.length &&
                    <Modal
                        className="ques_ans_modal"
                        open={reviewsData.showAllReviewsClicked}
                        onClose={() => modalCloseHandler('showAllReviewsClicked')}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        <div className="custom_wh">
                            <div className="heading">
                                <span className="sub_title">{`${tradieInfo.reviewsCount} ${tradieInfo?.reviewsCount === 1 ? 'review' : 'reviews'}`}</span>
                                <button className="close_btn"
                                    onClick={() => modalCloseHandler('showAllReviewsClicked')}
                                >
                                    <img src={cancel} alt="cancel" />
                                </button>
                            </div>
                            <div className="inner_wrap">
                                {tradieReviews?.map((item: any) => {
                                    let reviewData: any = item.reviewData;
                                    let replyData: any = reviewData.replyData;
                                    let replyId: any = replyData.replyId;
                                    return (
                                        <>
                                            <div className="question_ans_card" key={reviewData.reviewId}>
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
                                                {console.log({ item })}
                                                {Object.keys(reviewsData.replyShownHideList).length &&
                                                    reviewsData.replyShownHideList[item?.reviewData?.reviewId] ? (
                                                    <span
                                                        className="action link"
                                                        onClick={() => {
                                                            reviewHandler('hideReviewClicked', '', item?.reviewData?.reviewId)
                                                        }}>
                                                        {'Hide Review'}
                                                    </span>
                                                ) : Object.keys(item?.reviewData?.replyData).length ? (
                                                    <span
                                                        className="show_hide_ans link"
                                                        onClick={() => { reviewHandler('showReviewClicked', '', item?.reviewData?.reviewId) }}>
                                                        {'Show review'}
                                                    </span>
                                                ) : (
                                                    <span className="action link">
                                                        {/* onClick={() => {
                                                            reviewHandler('reviewReplyClicked', item?.reviewData?.reviewId)
                                                        }}> */}
                                                        {/* {'Reply'} */}
                                                    </span>
                                                )}
                                                {/* {Object.keys(replyData).length > 0 &&
                                                    !(reviewsData?.replyShownHideList.includes(replyId) ||
                                                        reviewsData.replyShownHideList.includes(replyId)) &&
                                                    <span
                                                        className="show_hide_ans link"
                                                        onClick={() => { reviewHandler('showReviewClicked', '', reviewData?.replyData?.replyId) }}>
                                                        {'Show review'}
                                                    </span>}
                                                {reviewData?.isModifiable && Object.keys(item?.reviewData?.replyData).length ? (
                                                    <span
                                                        className="action link"
                                                        onClick={() => {
                                                            reviewHandler('reviewReplyClicked', reviewData.reviewId)
                                                        }}>
                                                        {'Reply'}
                                                    </span>) : null} */}
                                            </div>
                                            {/* {reviewData?.replyData?.reply && (reviewsData.replyShownHideList.includes(reviewData?.replyData?.reviewId) || reviewsData.replyShownHideList.includes(reviewData?.replyData?.replyId)) && */}
                                            {Object.keys(reviewsData.replyShownHideList).length &&
                                                reviewsData.replyShownHideList[item?.reviewData?.reviewId] ? (
                                                <div className="question_ans_card answer">
                                                    <div className="user_detail">
                                                        <figure className="user_img">
                                                            <img src={reviewData?.replyData?.userImage || dummy} alt="user-img" />
                                                        </figure>
                                                        <div className="details">
                                                            <span className="user_name">{reviewData?.replyData?.userName}</span>
                                                            <span className="date">{reviewData?.replyData?.date}</span>
                                                        </div>
                                                    </div>
                                                    <p>{reviewData?.replyData?.reply}</p>
                                                    {reviewData?.replyData?.isModifiable && (
                                                        <span
                                                            className="action link"
                                                            onClick={() => {
                                                                reviewHandler(
                                                                    'updateReviewReply',
                                                                    item?.reviewData?.reviewId,
                                                                    item?.reviewData?.replyData?.replyId,
                                                                    reviewData?.replyData?.reply
                                                                )
                                                            }}>
                                                            {'Edit'}
                                                        </span>)}
                                                    {reviewData?.replyData?.isModifiable &&
                                                        <span
                                                            className="action link"
                                                            onClick={() => {
                                                                reviewHandler('removeReviewReply', item?.reviewData?.reviewId, item?.reviewData?.replyData?.replyId)
                                                            }}>
                                                            {'Delete'}
                                                        </span>}
                                                </div>

                                            ) : null}
                                        </>
                                    )
                                })}
                            </div>
                        </div>
                    </Modal>
                }
                {/* post reply modal */}
                {
                    reviewsData.reviewReplyClicked &&
                    <Modal
                        className="ques_ans_modal"
                        open={reviewsData.reviewReplyClicked}
                        onClose={() => { modalCloseHandler('reviewReplyClicked') }}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        <>
                            <div className="custom_wh ask_ques">
                                <div className="heading">
                                    <span className="sub_title">{`${reviewsData?.updateReviewsClicked ? 'Edit reply' : 'Reply'}`}</span>
                                    <button className="close_btn" onClick={() => { modalCloseHandler('reviewReplyClicked') }}>
                                        <img src={cancel} alt="cancel" />
                                    </button>
                                </div>
                                <div className="form_field">
                                    <label className="form_label">Your reply</label>
                                    <div className="text_field">
                                        <textarea
                                            placeholder="Text"
                                            value={reviewsData.reviewData}
                                            onChange={(e) => {
                                                handleChange(e, 'reviewData')
                                            }}>
                                        </textarea>
                                        <span className="char_count">{`${reviewsData.reviewData?.length || '0'}/250`}</span>
                                    </div>
                                </div>
                                <div className="bottom_btn custom_btn">
                                    {reviewsData.updateReviewsClicked ?
                                        <button
                                            className="fill_btn full_btn btn-effect"
                                            onClick={() => { submitReviewHandler('updateReviewReply') }}>
                                            {'Save'}
                                        </button>
                                        : <button
                                            className="fill_btn full_btn btn-effect"
                                            onClick={() => { reviewHandler('reviewReply') }}>
                                            {'Send'}
                                        </button>}
                                    <button
                                        className="fill_grey_btn btn-effect"
                                        onClick={() => { reviewHandler('replyCancelBtnClicked') }}>
                                        {'Cancel'}
                                    </button>
                                </div>
                            </div>
                        </>
                    </Modal>
                }
                {/* send confirmation yes/no modal */}
                {
                    (reviewsData.confirmationClicked) &&
                    <Modal
                        className="custom_modal"
                        open={reviewsData.confirmationClicked}
                        onClose={() => modalCloseHandler('confirmationClicked')}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        <>
                            <div className="custom_wh confirmation">
                                <div className="heading">
                                    <span className="xs_sub_title">{`${reviewsData.deleteReviewsClicked ? 'Delete' : reviewsData.updateReviewsClicked ? 'Update' : ''} Reply Confirmation`}</span>
                                    <button className="close_btn" onClick={() => modalCloseHandler('confirmationClicked')}>
                                        <img src={cancel} alt="cancel" />
                                    </button>
                                </div>
                                <div className="modal_message">
                                    <p>{`Are you sure you want to ${reviewsData.deleteReviewsClicked ? 'delete ' : ''}reply?`}</p>
                                </div>
                                <div className="dialog_actions">
                                    <button className="fill_btn btn-effect" onClick={() => submitReviewHandler(reviewsData.reviewsClickedType)}>Yes</button>
                                    <button className="fill_grey_btn btn-effect" onClick={() => modalCloseHandler('confirmationClicked')}>No</button>
                                </div>
                            </div>
                        </>
                    </Modal>
                }
            </div >
        )
    }

}

const mapState = (state: any) => ({
    tradieInfo: state.profile.tradieInfo,
    userType: state.profile.userType,
    tradieReviews: state.jobs.tradieReviews,
    tradieRequestStatus: state.jobs.tradieRequestStatus,
    tradieProfileViewData: state.profile.tradieProfileViewData,
    isSkeletonLoading: state.common.isSkeletonLoading
});

const mapProps = (dispatch: any) => {
    return bindActionCreators({
        getTradieProfile,
        getTradieReviewListOnBuilder,
        getAcceptDeclineTradie,
        getTradieProfileView
    }, dispatch);
};

export default connect(mapState, mapProps)(TradieInfo)