import React, { useState, useEffect } from 'react';
import Constants from '../../utils/constants';
import {
    getHomeJobDetails,
    getHomeSaveJob,
    jobDetailsBuilder,
    postHomeApplyJob
} from '../../redux/homeSearch/actions';
import { closeOpenedJob } from '../../redux/jobs/actions';
import {
    getQuestionsList,
    answerQuestion,
    updateAnswer,
    deleteAnswer,
    handleCancelReply
} from '../../redux/jobs/actions';
import Modal from '@material-ui/core/Modal';

import cancel from "../../assets/images/ic-cancel.png";
import dummy from '../../assets/images/u_placeholder.jpg';
import jobDummyImage from '../../assets/images/ic-placeholder-detail.png';
import question from '../../assets/images/ic-question.png';
import leftIcon from '../../assets/images/ic-back-arrow-line.png'
import rightIcon from '../../assets/images/ic-next-arrow-line.png'
import pendingIcon from '../../assets/images/exclamation-icon.png'

import noDataFound from '../../assets/images/no-search-data.png';

import approved from '../../assets/images/approved.png';
import waiting from '../../assets/images/exclamation.png';

import { renderTime } from '../../utils/common';

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import editIconBlue from '../../assets/images/ic-edit-blue.png';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import { deleteOpenJob } from '../../redux/jobs/actions';

//@ts-ignore
import FsLightbox from 'fslightbox-react';
// import { setShowToast } from '../../redux/common/actions';
import { JobCancelReasons } from '../../utils/common';
import docThumbnail from '../../assets/images/add-document.png'
interface PropsType {
    history: any,
    location: any,
}

const options = {
    items: 1,
    nav: true,
    navText: [`<div class='nav-btn prev-slide'> <img src="${leftIcon}"> </div>`, `<div class='nav-btn next-slide'> <img src="${rightIcon}"> </div>`],
    rewind: true,
    autoplay: false,
    slideBy: 1,
    dots: true,
    dotsEach: true,
    dotData: true,
    responsive: {
        0: {
            items: 1,
        },
        600: {
            items: 1,
        },
        1000: {
            items: 1,
        },
    },
};


const defaultQuestionValues = {
    askQuestionsClicked: false,
    showAllQuestionsClicked: false,
    submitQuestionsClicked: false,
    deleteQuestionsClicked: false,
    updateQuestionsClicked: false,
    questionsClickedType: '',
    confirmationClicked: false,
    showAnswerButton: true,
    questionId: '',
    answerId: '',
    questionData: '',
    answerShownHideList: [],
    showHideAnswer: {},
    questionIndex: null
}

const JobDetailsPage = (props: PropsType) => {
    const [errors, setErrors] = useState<any>({});
    const [jobDetailsData, setJobDetailsData] = useState<any>('');
    const [questionList, setQuestionList] = useState<Array<any>>([]);
    const [questionListPageNo, setQuestionListPageNo] = useState<number>(1);
    const [questionsData, setQuestionsData] = useState<any>(defaultQuestionValues)

    const [toggler, setToggler] = useState(false);
    const [showEditBtn, setEditBtn] = useState(false);
    const [selectedSlide, setSelectSlide] = useState(1);
    const [tradieId, setTradieId] = useState<string>('');

    const [toggleDelete, setToggleDelete] = useState(false);

    const [jobAcceptModal, setJobAcceptModal] = useState(false);
    const [jobRejectModal, setJobRejectModal] = useState(false);

    const [pendingRequestClicked, setPendingRequestClicked] = useState(false);

    const [jobData, setJobData] = useState({});
    const [replyText, setReplyText] = useState('');
    const [fsSlideListner, setFsSlideListner] = useState<any>({});

    useEffect(() => {
        (async () => {
            await preFetch();
        })();
    }, [])

    useEffect(() => {
        let fsSlideObj: any = {};
        let slideCount = 1;

        if (jobDetailsData?.photos?.length) {
            jobDetailsData?.photos.forEach((item: any, index: number) => {
                if (item?.mediaType === 1 || item?.mediaType === 2) {
                    fsSlideObj[`${index}`] = slideCount++;
                }
            });
        }
        if (Object.keys(fsSlideObj)?.length > 0) setFsSlideListner(fsSlideObj);
    }, [jobDetailsData?.photos]);

    const preFetch = async () => {
        let location_search = (props?.history?.location?.search).substring(1) //window.atob()
        const params = new URLSearchParams(location_search);

        if (params.get('edit')) {
            setEditBtn((prev: any) => true);
        }

        if (params.get('jobId') && params.get('tradeId') && params.get('specializationId')) {
            const res1 = await getHomeJobDetails({
                jobId: params.get('jobId'),
                tradeId: params.get('tradeId'),
                specializationId: params.get('specializationId')
            });
            if (res1.success) {
                setJobDetailsData(res1.data);
            }
        } else {
            if (params.get('jobId')) {
                let res = await jobDetailsBuilder({ jobId: params.get('jobId') });
                console.log({ res }, '---->')
                if (res.success) {
                    setJobDetailsData(res.data);
                }
            }
        }
        if (params.get('tradieId')) {
            const id: string | null = params.get('tradieId');
            setTradieId(id ? id : '');
        }
        fetchQuestionsList();
    }


    const fetchQuestionsList = async (isTrue?: boolean) => {
        let location_search = (props?.location?.search).substring(1); //window.atob()
        const params = new URLSearchParams(location_search);
        const questionData: any = {
            jobId: params.get('jobId'),
            page: 1
        }
        const res2 = await getQuestionsList(questionData);
        if (res2.success) {
            if (params.get('openQList') === "true") {
                setQuestionsData((prevData: any) => ({ ...prevData, showAllQuestionsClicked: true }));
            }
            console.log({ res2 }, 'question-list')
            let data_elements = res2?.data?.list || res2?.data;
            setQuestionList(data_elements);
        }

        if (isTrue) {
            setQuestionsData((prevData: any) => ({
                ...prevData,
                submitQuestionsClicked: false,
                askQuestionsClicked: false,
                showAllQuestionsClicked: true,
                confirmationClicked: false,
                questionsClickedType: '',
                deleteQuestionsClicked: false,
                updateQuestionsClicked: false,
                questionId: '',
                answerId: '',
                questionData: '',
                showQuestionAnswer: false,
                questionIndex: null
            }));
        }
    }

    const applyJobClicked = async () => {
        const data = {
            jobId: jobDetailsData?.jobId,
            builderId: jobDetailsData?.postedBy?.builderId,
            tradeId: jobDetailsData?.tradeId,
            specializationId: jobDetailsData?.specializationId
        }
        const res = await postHomeApplyJob(data);
        if (res.success) {
            props.history.push('job-applied-successfully');
        }
    }

    const saveJobClicked = () => {
        const data = {
            jobId: jobDetailsData?.jobId,
            tradeId: jobDetailsData?.tradeId,
            specializationId: jobDetailsData?.specializationId,
            isSave: !jobDetailsData?.isSaved
        }
        getHomeSaveJob(data);
        setJobDetailsData((prevData: any) => ({ ...prevData, isSaved: !prevData.isSaved }))
    }

    const modalCloseHandler = (modalType: string) => {
        setQuestionsData((prevData: any) => ({ ...prevData, [modalType]: false, deleteQuestionsClicked: false, answerShownHideList: [] }));
        setErrors({});
    }

    const loadMoreQuestionHandler = async () => {
        // will handle the pagination later
        let location_search = (props?.location?.search).substring(1);// window.atob()
        const params = new URLSearchParams(location_search);
        const data: any = {
            jobId: params.get('jobId'),
            page: questionListPageNo + 1
        }
        const res = await getQuestionsList(data);
        if (res.success) {
            console.log({ res }, 'question-list')
            let data_elements = res?.data?.list || res?.data;
            setQuestionList((prevData: any) => ([...prevData, ...data_elements]));
            setQuestionListPageNo(data.page);
        }
    }

    const validateForm = (type: string) => {
        if (type == 'deleteQuestion') return true;
        const newErrors: any = {};
        if (!questionsData.questionData.trim()?.length) {
            newErrors.questionData = Constants.errorStrings.askQuestion;
        }
        setErrors(newErrors);
        return !Object.keys(newErrors).length;
    }

    const submitQuestionHandler = async (type: string) => {
        console.log('Here!------->', { questionsData })
        if (['askQuestion', 'deleteQuestion', 'updateQuestion'].includes(type)) {
            if (!validateForm(type)) {
                return;
            }
            var response: any;
            var data: any;
            if (type === 'askQuestion') {
                data = {
                    jobId: jobDetailsData?.jobId,
                    answer: questionsData.questionData,
                    questionId: questionsData.questionId,
                }
                response = await answerQuestion(data); // answer question
            } else if (type === 'deleteQuestion') {
                data = {
                    questionId: questionsData.questionId,
                    answerId: questionsData.answerId
                }
                response = await deleteAnswer(data); // delete answer
            } else if (type === 'updateQuestion') {
                data = {
                    questionId: questionsData.questionId,
                    answerId: questionsData.answerId,
                    answer: questionsData.questionData
                }
                response = await updateAnswer(data); // update answer
            }

            if (response.success) {
                fetchQuestionsList(true);
                if (type === 'deleteQuestion') {
                    questionHandler('showAnswerClicked', questionsData.questionId)
                }
            }

        }
    }

    const questionHandler = (type: string, questionId?: string, question?: string, questionIndex?: any, answerId?: any) => {

        if (type == 'submitAskQuestion' && validateForm('askQuestion')) {
            setQuestionsData((prevData: any) => ({
                ...prevData,
                submitQuestionsClicked: true,
                confirmationClicked: true,
            }));
        } else if (type == 'askQuestion') {
            setQuestionsData((prevData: any) => ({
                ...prevData,
                questionId: questionId,
                askQuestionsClicked: true,
                showAllQuestionsClicked: false,
                questionsClickedType: type,
                answerId: ''
            }));
        } else if (type == 'deleteQuestion') {
            setQuestionsData((prevData: any) => ({
                ...prevData,
                confirmationClicked: true,
                deleteQuestionsClicked: true,
                questionId: questionId,
                questionsClickedType: type,
                questionIndex: questionIndex,
                answerId: answerId
            }));
        } else if (type == 'updateQuestion') {
            setQuestionsData((prevData: any) => ({
                ...prevData,
                askQuestionsClicked: true,
                updateQuestionsClicked: true,
                questionId: questionId,
                answerId: answerId,
                questionsClickedType: type,
                showAllQuestionsClicked: false,
                questionData: question
            }));
        } else if (type == 'questionCancelBtnClicked') {
            setQuestionsData((prevData: any) => ({
                ...prevData,
                askQuestionsClicked: false,
                updateQuestionsClicked: false,
                deleteQuestionsClicked: false,
                showAllQuestionsClicked: true,
                questionData: '',
                questionsClickedType: '',
                questionId: '',
                answerId: ''
            }));
            setErrors({});
        } else if (type == 'hideAnswerClicked') {
            // const newData = [...questionsData.answerShownHideList].filter(id => id !== questionId);
            // setQuestionsData((prevData: any) => ({ ...prevData, answerShownHideList: newData }));

            let item_: any = {};
            let question_id: any = questionId;
            item_ = questionsData?.showHideAnswer;
            if (item_[question_id] === undefined) {
                item_[question_id] = true;
            } else {
                item_[question_id] = !item_[question_id];
            }

            setQuestionsData((prevData: any) => ({ ...prevData, showHideAnswer: item_ }));

        } else if (type == 'showAnswerClicked') {
            // const newData = [...questionsData.answerShownHideList];
            // newData.push(questionId);
            // setQuestionsData((prevData: any) => ({ ...prevData, answerShownHideList: newData }));

            let item_: any = {};
            let question_id: any = questionId;
            item_ = questionsData?.showHideAnswer;
            if (item_[question_id] === undefined) {
                item_[question_id] = !item_[question_id];
            } else {
                item_[question_id] = !item_[question_id];
            }

            setQuestionsData((prevData: any) => ({ ...prevData, showHideAnswer: item_ }));
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>, type: string) => {
        if (e.target.value.trim().length <= 250) {
            setQuestionsData((prevData: any) => ({ ...prevData, [type]: e.target.value }))
        }
    }


    const renderBuilderAvatar = (item: any) => {
        let postedBy: any = jobDetailsData?.postedBy;
        // console.log({ jobDetailsData })
        if (item === "image") {
            if (postedBy && Array.isArray(postedBy) && postedBy[0] && postedBy[0].builderImage) {
                return (
                    <img
                        src={postedBy[0].builderImage || dummy}
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
                )
            } else {
                return (
                    <img
                        src={dummy}
                        alt="traide-img"
                    />
                )
            }
        }
        if (item === "name") {
            if (postedBy && Array.isArray(postedBy) && postedBy[0] && postedBy[0].firstName) {
                return postedBy[0].firstName;
            }
        }
    }

    let paramStatus: any = '';
    let paramJobId: any = '';
    let activeType: any = '';
    let isPastJob: boolean = false;
    let hideDispute: any = null;
    if (props.location?.search) {
        let location_search = (props?.location?.search).substring(1); //window.atob()
        const params = new URLSearchParams(location_search);
        if (params.get('status')) {
            paramStatus = params.get('status');
        }
        if (params.get('jobId')) {
            paramJobId = params.get('jobId');
        }
        if (params.get('job')) {
            isPastJob = true;
        }
        if (params.get('activeType')) {
            activeType = params.get('activeType');
        }

        if (params.get('hide_dipute')) {
            hideDispute = params.get('hide_dipute');
        }
    }
    console.log({ activeType, hideDispute })

    console.log({ paramStatus })
    const renderByStatus = ({ status }: any) => {
        if (status) {
            return (
                <>
                    {status === "APPROVED" && <img src={approved} alt="icon" />}
                    {status === "NEEDS APPROVAL" && <img src={waiting} alt="icon" />}
                    {status}
                </>
            )
        } else {
            return (
                <>
                    {jobDetailsData?.status === "APPROVED" && <img src={approved} alt="icon" />}
                    {jobDetailsData?.status === "NEEDS APPROVAL" && <img src={waiting} alt="icon" />}
                    {jobDetailsData?.status}
                </>
            )
        }

    }

    const handleCancelJob = async (type: any, job_detail: any) => {
        if (type == 1) {
            setJobAcceptModal(true);
            setJobRejectModal(false);
        } else {
            setJobAcceptModal(false);
            setJobRejectModal(true);
        }

        setJobData({
            "jobId": job_detail?.jobId,
            "status": type,
            "note": type === 1 ? "this is accepted" : "this is rejected"
        });
    }

    const operationCancelJob = async () => {
        let data: any = jobData;
        if (data?.status) {
            data['note'] = replyText;
        }

        let response = await handleCancelReply(data);
        if (response?.success) {
            if (jobDetailsData?.quoteJob) {
                let quote: any = jobDetailsData?.quote;
                if (quote && Array.isArray(quote) && quote[0] && quote[0]?.tradieId) {
                    let quoteId: any = quote[0].tradieId;
                    props.history.push(`/quote-job-cancel?jobId=${jobDetailsData?.jobId}&tradieId=${quoteId}`);
                }
                return
            }

            if (data?.status === 1) {
                props.history.push('/request-monitored/ccr');
            } else {
                props.history.push('/request-monitored/cc/bb');
            }
            // await preFetch();
        }
    }


    const renderFilteredItems = (itemsMedia: any) => {
        let sources: any = [];
        let types: any = [];

        if (itemsMedia && Array.isArray(itemsMedia) && itemsMedia.length) {
            itemsMedia.forEach((item: any) => {
                if (item?.mediaType === 2) {
                    sources.push(item.link);
                    types.push('video');
                } else if (item?.mediaType === 1) {
                    sources.push(item.link);
                    types.push('image');
                }
            })
        }

        return { sources, types };
    }
    let itemsMedia: any = [];
    if (jobDetailsData?.photos?.length) {
        itemsMedia = jobDetailsData.photos;
        // itemsMedia = jobDetailsData?.photos?.filter((itemP: any) => itemP.mediaType !== 3 && itemP.mediaType !== 4);
    }
    const { sources, types } = renderFilteredItems(itemsMedia);


    const deleteJob = async (jobId: any) => {
        let response: any = await deleteOpenJob({ jobId });
        console.log({ response });
        props.history.push(`/jobs?active=${activeType}`)
    }

    let CASE_1 = jobDetailsData?.isCancelJobRequest;
    let CASE_2 = paramStatus === 'CANCELLED' && jobDetailsData?.reasonForCancelJobRequest > 0 ? jobDetailsData?.reasonForCancelJobRequest : false;
    let CASE_3 = jobDetailsData?.changeRequestDeclineReason?.length ? jobDetailsData?.changeRequestDeclineReason : false;

    let CASE_4 = activeType === "active" && jobDetailsData?.rejectReasonNoteForCancelJobRequest?.length ? jobDetailsData?.rejectReasonNoteForCancelJobRequest : false;


    const checkTrueCase = () => {
        let C1 = CASE_1 ? 1 : 0;
        let C2 = CASE_2 ? 1 : 0;
        let C3 = CASE_3 ? 1 : 0;

        let Count = C1 + C2 + C3;

        if (Count == 1) {
            return '1'
        }

        if (Count == 2) {
            return '2'
        }

        if (Count == 3) {
            return '3'
        }
    }

    const filterFileName = (link: any) => {
        if (link?.length) {
            let arrItems = link.split('/');
            return arrItems[arrItems?.length - 1];
        }
    }

    return (
        <div className="app_wrapper">
            <div className="section_wrapper">
                <div className="custom_container">
                    {['active', 'open'].includes(activeType) ? (
                        <span className="dot_menu r0">
                            {activeType === 'active' && <img src={editIconBlue} alt="edit" />}
                            {activeType === 'open' && !(jobDetailsData?.quoteCount > 0 || jobDetailsData?.isInvited || !jobDetailsData?.editJob) && <img src={editIconBlue} alt="edit" />}
                            <div className="edit_menu">
                                <ul>
                                    {activeType == "open" && (
                                        <React.Fragment>
                                            <li
                                                onClick={() => {
                                                    props.history.push(`/post-new-job?update=true&jobId=${paramJobId}`)
                                                }}
                                                className="icon edit_line">
                                                {'Edit'}
                                            </li>
                                            {activeType == "open" && !(jobDetailsData?.quoteCount > 0 || jobDetailsData?.isInvited) && (
                                                <li
                                                    onClick={() => {
                                                        setToggleDelete((prev: any) => !prev);
                                                    }}
                                                    className="icon delete">
                                                    {'Delete'}
                                                </li>
                                            )}
                                            {/* :
                                            <li
                                                onClick={() => {
                                                    setToggleDelete((prev: any) => !prev);
                                                }}
                                                className="icon delete">
                                                {'Delete'}
                                            </li> */}
                                        </React.Fragment>
                                    )}
                                    {activeType == "active" && (
                                        <React.Fragment>
                                            {!jobDetailsData?.quoteJob && (
                                                <li
                                                    onClick={() => {
                                                        props.history.push(`/jobs?active=${activeType}&jobId=${paramJobId}&editMilestone=true`)
                                                    }}
                                                    className="icon edit_line">
                                                    {'Edit Milestone'}
                                                </li>
                                            )}

                                            {hideDispute === "false" && (
                                                <li
                                                    onClick={() => {
                                                        props.history.push(`/jobs?active=${activeType}&jobId=${paramJobId}&lodgeDispute=true`)
                                                    }}
                                                    className="icon lodge">
                                                    {'Lodge dispute'}
                                                </li>
                                            )}
                                            <li
                                                onClick={() => {
                                                    props.history.push(`/jobs?active=${activeType}&jobId=${paramJobId}&cancelJob=true`)
                                                }}
                                                className="icon delete">
                                                {'Cancel job'}
                                            </li>
                                        </React.Fragment>
                                    )}
                                </ul>
                            </div>
                        </span>
                    ) : null}
                    <Dialog
                        open={toggleDelete}
                        onClose={() => {
                            setToggleDelete((prev: any) => !prev);
                        }}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">
                        <DialogTitle id="alert-dialog-title">
                            {activeType == "open" && jobDetailsData?.quoteJob ?
                                "Are you sure you want to delete the job ?" :
                                "Are you sure you want to delete the job ?"}
                        </DialogTitle>
                        <DialogActions>
                            <Button
                                onClick={async () => {
                                    // if (activeType == "open" && jobDetailsData?.quoteJob) {
                                    //     let response = await closeOpenedJob({ jobId: paramJobId });
                                    //     setToggleDelete((prev: any) => !prev);
                                    //     if (response?.success) {
                                    //         props.history.push('/jobs?active=past');
                                    //     }
                                    // } else {
                                    if (activeType == "open") deleteJob(paramJobId);
                                    // }
                                }}
                                color="primary"
                                autoFocus>
                                {'Yes'}
                            </Button>
                            <Button
                                onClick={() => {
                                    setToggleDelete((prev: any) => !prev);
                                }}
                                color="primary">
                                {'No'}
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <FsLightbox
                        toggler={toggler}
                        slide={selectedSlide}
                        sources={sources}
                        types={types}
                        key={sources?.length}
                        onClose={() => {
                            setSelectSlide(1)
                        }}
                    />

                    <div className="vid_img_wrapper pt-20">
                        <div className="flex_row">
                            <div className="flex_col_sm_8 relative">
                                <button
                                    className="back"
                                    onClick={() => {
                                        if (activeType) {
                                            props.history.push(`/jobs?active=${activeType}`)
                                        } else {
                                            props.history?.goBack()
                                        }
                                    }}>
                                </button>
                            </div>
                        </div>
                        <div className="flex_row">
                            <div className="flex_col_sm_8">
                                <figure className="vid_img_thumb">
                                    <OwlCarousel className='owl-theme' {...options}>
                                        {itemsMedia.length ?
                                            itemsMedia.map((image: any, index: number) => {
                                                console.log({
                                                    image,
                                                    mediaType: image?.mediaType
                                                }, '---?')
                                                return image?.mediaType === 1 ? (
                                                    <img
                                                        key={`${image}${index}`}
                                                        onClick={() => {
                                                            setToggler((prev: any) => !prev);
                                                            setSelectSlide(fsSlideListner[`${index}`]);
                                                        }}
                                                        title={filterFileName(image.link)}
                                                        alt=""
                                                        src={image?.link ? image?.link : jobDummyImage}
                                                    />) : image?.mediaType === 2 ? (
                                                        <video
                                                            key={`${image}${index}`}
                                                            onClick={() => {
                                                                setToggler((prev: any) => !prev);
                                                                setSelectSlide(fsSlideListner[`${index}`]);
                                                            }}
                                                            title={filterFileName(image.link)}
                                                            src={image?.link}
                                                            style={{ height: '400px', width: '800px' }}
                                                        />
                                                    ) : (
                                                    <img
                                                        key={`${image}${index}`}
                                                        onClick={() => {
                                                            let url = `/doc-view?url=${image.link}`//
                                                            window.open(url, '_blank');
                                                        }}
                                                        title={filterFileName(image.link)}
                                                        alt=""
                                                        src={docThumbnail}
                                                    />)
                                            }) : <img alt="" src={jobDummyImage} />}
                                    </OwlCarousel>
                                </figure>
                            </div>

                            <div className="flex_col_sm_4 relative">

                                <div className="detail_card">
                                    <span className="title line-3" title={jobDetailsData.jobName}>{jobDetailsData.jobName}</span>
                                    <span className="tagg">Job details</span>
                                    <div className="job_info">
                                        {jobDetailsData?.quoteCount?.length && jobDetailsData?.quoteJob ? ( // temporary check
                                            <ul>
                                                <li className="icon dollar">{jobDetailsData.amount}</li>
                                                <li className=""></li>
                                                <li className="icon location line-1" title={jobDetailsData.locationName}>{jobDetailsData.locationName}</li>
                                                <li className="icon calendar">
                                                    {jobDetailsData?.time ?
                                                        jobDetailsData.time :
                                                        renderTime(
                                                            jobDetailsData.fromDate,
                                                            jobDetailsData?.toDate
                                                        )
                                                    }
                                                </li>
                                            </ul>
                                        ) : !isPastJob ? (
                                            <ul>
                                                <li className="icon clock">{jobDetailsData.duration}</li>
                                                <li className="icon dollar">{jobDetailsData.amount}</li>
                                                <li className="icon location line-1" title={jobDetailsData.locationName}>{jobDetailsData.locationName}</li>
                                                <li className="icon calendar">
                                                    {jobDetailsData?.time ?
                                                        jobDetailsData.time :
                                                        renderTime(
                                                            jobDetailsData.fromDate,
                                                            jobDetailsData?.toDate
                                                        )
                                                    }
                                                </li>
                                            </ul>
                                        ) : (
                                            <ul>
                                                <li className="icon calendar">
                                                    {jobDetailsData?.time ?
                                                        jobDetailsData.time :
                                                        renderTime(
                                                            jobDetailsData.fromDate,
                                                            jobDetailsData?.toDate
                                                        )
                                                    }
                                                </li>
                                                <li className="icon dollar">{jobDetailsData.amount}</li>
                                                <li className="icon location line-1" title={jobDetailsData?.locationName}>{jobDetailsData?.locationName}</li>
                                                <li className="job_status">{paramStatus}</li>
                                                {/* <li className="job_status">{jobDetailsData?.status}</li> */}
                                            </ul>
                                        )}
                                    </div>
                                    {console.log({
                                        changeRequestDeclineReason: jobDetailsData.changeRequestDeclineReason,
                                        isCancelJobRequest: jobDetailsData.isCancelJobRequest,
                                        isChangeRequest: jobDetailsData.isChangeRequest,
                                        isPublishedAgain: jobDetailsData.isPublishedAgain,
                                        reasonForCancelJobRequest: jobDetailsData.reasonForCancelJobRequest,
                                        reasonNoteForCancelJobRequestjob: jobDetailsData.reasonNoteForCancelJobRequest,
                                        rejectReasonNoteForCancelJobRequest: jobDetailsData.rejectReasonNoteForCancelJobRequest
                                    })}

                                    {(CASE_1 || CASE_2 || CASE_3 || CASE_4) && (
                                        <button
                                            className="fill_grey_btn full_btn pending_info"
                                            onClick={() => {
                                                setPendingRequestClicked(true)
                                            }}>

                                            {(CASE_1 || CASE_2 || CASE_3 || CASE_4) && (
                                                <span>
                                                    <img src={pendingIcon} alt="icon" />
                                                    {/* {`${checkTrueCase()} pending request(s)`} */}
                                                    {`View all request(s)`}
                                                </span>
                                            )}
                                        </button>
                                    )}

                                    <Modal
                                        className="ques_ans_modal"
                                        open={pendingRequestClicked}
                                        onClose={() => setPendingRequestClicked(false)}
                                        aria-labelledby="simple-modal-title"
                                        aria-describedby="simple-modal-description"
                                    >
                                        <div
                                            className="custom_wh"
                                            data-aos="zoom-in"
                                            data-aos-delay="30"
                                            data-aos-duration="1000">
                                            <div className="heading">
                                                <span className="sub_title">
                                                    {CASE_1 && `Pending Request(s)`}
                                                </span>
                                                <button
                                                    className="close_btn"
                                                    onClick={() => setPendingRequestClicked(false)}>
                                                    <img src={cancel} alt="cancel" />
                                                </button>
                                            </div>
                                            {CASE_1 &&
                                                <div className="chang_req_card">
                                                    <span className="xs_sub_title">Job cancellation request</span>
                                                    <p className="commn_para line-2">
                                                        <li>
                                                            {JobCancelReasons(jobDetailsData?.reasonForCancelJobRequest)}
                                                        </li>
                                                        <li>
                                                            {jobDetailsData?.reasonNoteForCancelJobRequest}
                                                        </li>
                                                    </p>
                                                    <button
                                                        className="fill_btn btn-effect"
                                                        onClick={() => {
                                                            handleCancelJob(1, jobDetailsData);
                                                            // if (jobDetailsData?.quoteJob) {
                                                            //     let quote: any = jobDetailsData?.quote;
                                                            //     if (quote && Array.isArray(quote) && quote[0] && quote[0]?.tradieId) {
                                                            //         let quoteId: any = quote[0].tradieId;
                                                            //         props.history.push(`/quote-job-cancel?jobId=${jobDetailsData?.jobId}&tradieId=${quoteId}`);
                                                            //     }
                                                            // } else {
                                                            //     handleCancelJob(1, jobDetailsData) ;
                                                            // }
                                                        }}>
                                                        {'Accept'}
                                                    </button>
                                                    <button className="fill_grey_btn btn-effect"
                                                        onClick={() => {
                                                            handleCancelJob(2, jobDetailsData)
                                                        }}>
                                                        {'Reject'}
                                                    </button>
                                                </div>}

                                            {(CASE_2 || CASE_3 || CASE_4) && (
                                                <span className="sub_title">
                                                    {'Reason(s)'}
                                                </span>
                                            )}

                                            {CASE_2 &&
                                                <div className="chang_req_card">
                                                    <span className="xs_sub_title">
                                                        {`Job cancelled reason`}
                                                    </span>
                                                    <p className="commn_para line-2">
                                                        {JobCancelReasons(jobDetailsData?.reasonForCancelJobRequest)}
                                                    </p>
                                                    <p className="commn_para line-2">
                                                        {jobDetailsData?.reasonNoteForCancelJobRequest?.length ?
                                                            jobDetailsData?.reasonNoteForCancelJobRequest :
                                                            jobDetailsData?.rejectReasonNoteForCancelJobRequest}
                                                    </p>
                                                </div>}

                                            {CASE_3 &&
                                                <div className="chang_req_card">
                                                    <span className="xs_sub_title">
                                                        {'Change request reject reason'}
                                                    </span>
                                                    <p className="commn_para line-2">
                                                        {jobDetailsData?.changeRequestDeclineReason}
                                                    </p>
                                                </div>}

                                            {CASE_4 &&
                                                <div className="chang_req_card">
                                                    <span className="xs_sub_title">
                                                        {`Job cancelled rejected reason`}
                                                    </span>
                                                    <p className="commn_para line-2">
                                                        {jobDetailsData?.rejectReasonNoteForCancelJobRequest}
                                                    </p>
                                                </div>}

                                            {/* {} */}

                                        </div>
                                    </Modal>

                                    {((paramStatus === 'EXPIRED' || paramStatus === 'expired') && !jobDetailsData?.isPublishedAgain) && (
                                        <button
                                            className="fill_btn full_btn btn-effect mt-sm"
                                            onClick={() => props.history.push(`/post-new-job?jobId=${paramJobId}`)}>
                                            Publish again
                                        </button>
                                    )}

                                    {(jobDetailsData?.quote?.length > 0 && ['active', 'open'].includes(activeType)) && jobDetailsData.quoteJob && (
                                        <button
                                            className="fill_grey_btn full_btn btn-effect mt-sm"
                                            onClick={() => {
                                                if (activeType == "active") {
                                                    let quoteId = null;
                                                    if (jobDetailsData?.quote && Array.isArray(jobDetailsData?.quote) && jobDetailsData?.quote[0]?.quote && Array.isArray(jobDetailsData?.quote[0]?.quote) && jobDetailsData?.quote[0]?.quote[0]?._id) {
                                                        quoteId = jobDetailsData?.quote[0]?.quote[0]?._id;
                                                    }
                                                    if (quoteId) {
                                                        props.history.push(`/jobs?active=${activeType}&viewQuotes=true&jobId=${jobDetailsData?.jobId}&id=${quoteId}`);
                                                    }
                                                } else {
                                                    props.history.push(`/jobs?active=${activeType}&quotes=true&jobId=${jobDetailsData?.jobId}`);
                                                }
                                            }}>
                                            {activeType == "active" ? 'View quote' : `${jobDetailsData?.quote?.length} Quotes`}
                                        </button>
                                    )}

                                    <Modal
                                        className="custom_modal"
                                        open={jobRejectModal}
                                        onClose={() => {
                                            setJobRejectModal(false)
                                        }}
                                        aria-labelledby="simple-modal-title"
                                        aria-describedby="simple-modal-description"
                                    >
                                        <div className="custom_wh profile_modal" data-aos="zoom-in" data-aos-delay="30" data-aos-duration="1000">
                                            <div className="heading">
                                                <span className="sub_title">{`Your reply to job cancellation`}</span>
                                                <button
                                                    className="close_btn"
                                                    onClick={() => {
                                                        setJobRejectModal(false)
                                                    }}>
                                                    <img src={cancel} alt="cancel" />
                                                </button>
                                            </div>
                                            <div className="form_field">
                                                <label className="form_label">{`Let the tradesperson and Tickt know if you accept or reject cancelling for this job.`}</label>
                                                <div className="text_field">
                                                    <textarea
                                                        placeholder={`I disagree with this cancelling`}
                                                        maxLength={250}
                                                        value={replyText}
                                                        onChange={(e: any) => { setReplyText((e.target.value).trimLeft()) }}
                                                    />
                                                    <span className="char_count">{`${replyText?.length}/250`}</span>
                                                </div>
                                                {replyText?.length > 250 && <span className="error_msg">{errors.replyCancelReason}</span>}
                                            </div>
                                            <div className="bottom_btn custom_btn">
                                                <button
                                                    className="fill_btn full_btn btn-effect"
                                                    onClick={() => {
                                                        operationCancelJob();
                                                    }}>
                                                    {'Send'}
                                                </button>
                                                <button
                                                    className="fill_grey_btn btn-effect"
                                                    onClick={() => {
                                                        setJobRejectModal(false);
                                                        setJobData({});
                                                        setPendingRequestClicked(true);
                                                    }}>
                                                    {'Cancel'}
                                                </button>
                                            </div>
                                        </div>
                                    </Modal>

                                    <Modal
                                        className="custom_modal"
                                        open={jobAcceptModal}
                                        onClose={() => {
                                            setJobAcceptModal(false);
                                        }}
                                        aria-labelledby="simple-modal-title"
                                        aria-describedby="simple-modal-description"
                                    >
                                        <div className="custom_wh confirmation" data-aos="zoom-in" data-aos-delay="30" data-aos-duration="1000">
                                            <div className="heading">
                                                <span className="xs_sub_title">{`Accept Job Cancellation Request`}</span>
                                                <button
                                                    className="close_btn"
                                                    onClick={() => {
                                                        setJobAcceptModal(false);
                                                        setPendingRequestClicked(false)
                                                    }}>
                                                    <img src={cancel} alt="cancel" />
                                                </button>
                                            </div>
                                            <div className="modal_message">
                                                <p>Are you sure you still want to proceed?</p>
                                            </div>
                                            <div className="dialog_actions">
                                                <button
                                                    className="fill_btn btn-effect"
                                                    onClick={() => {
                                                        operationCancelJob();
                                                    }}>Yes</button>
                                                <button className="fill_grey_btn btn-effect"
                                                    onClick={() => {
                                                        setJobAcceptModal(false);
                                                        setJobData({});
                                                        setPendingRequestClicked(true)
                                                    }}>No</button>
                                            </div>
                                        </div>
                                    </Modal>
                                </div>
                            </div>
                        </div>
                        <div className="flex_row">
                            <div className="flex_col_sm_8">
                                <div className="description">
                                    <span className="sub_title">Details</span>
                                    <p className="commn_para">{jobDetailsData.details}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex_row">
                            <div className="flex_col_sm_4">
                                <span className="sub_title">Job Milestones
                                    {/* <b>{`Job Milestones ${jobDetailsData?.milestoneNumber} `}</b>{`of ${jobDetailsData?.totalMilestones}`} */}
                                    <b className="ft_normal"> {`${jobDetailsData?.milestoneNumber} `}{`of ${jobDetailsData?.totalMilestones || ''}`} </b>
                                </span>

                                <div className="job_progress_wrap" id="scroll-progress-bar">
                                    <div className="progress_wrapper">
                                        <span className="approval_info" id="digit-progress">
                                            {renderByStatus({ status: paramStatus })}
                                        </span>
                                        <span className="progress_bar">
                                            <input
                                                className="done_progress"
                                                id="progress-bar"
                                                type="range"
                                                min="0"
                                                value={jobDetailsData?.milestoneNumber > 0 ? jobDetailsData?.milestoneNumber / jobDetailsData?.totalMilestones * 100 : 0}
                                            />
                                        </span>
                                    </div>
                                </div>

                                <ul className="job_milestone">
                                    {jobDetailsData && jobDetailsData?.jobMilestonesData?.map((item: any, index: number) => {
                                        return (
                                            <li key={item.milestoneId}>
                                                <span>{`${index + 1}. ${item?.milestoneName}`}</span>
                                                {console.log({ item })}
                                                <span>{renderTime(item?.fromDate, item?.toDate)}</span>
                                            </li>
                                        )
                                    })}
                                </ul>
                                <button className="fill_grey_btn ques_btn" onClick={() => setQuestionsData((prevData: any) => ({ ...prevData, showAllQuestionsClicked: true }))}>
                                    <img src={question} alt="question" />
                                    {`${jobDetailsData?.questionsCount || '0'} ${jobDetailsData?.questionsCount === 1 ? 'question' : 'questions'}`}
                                </button>
                            </div>
                            {/* show all questions modal */}
                            {questionsData.showAllQuestionsClicked &&
                                <Modal
                                    className="ques_ans_modal"
                                    open={questionsData.showAllQuestionsClicked}
                                    onClose={() => {
                                        modalCloseHandler('showAllQuestionsClicked')
                                    }}
                                    aria-labelledby="simple-modal-title"
                                    aria-describedby="simple-modal-description"
                                >
                                    <>
                                        <div className="custom_wh" data-aos="zoom-in" data-aos-delay="30" data-aos-duration="1000">
                                            <div className="heading">
                                                <span
                                                    className="sub_title">
                                                    {jobDetailsData?.questionsCount ? `${jobDetailsData?.questionsCount} ${jobDetailsData?.questionsCount === 1 ? 'question' : 'questions'}` : ''}
                                                </span>
                                                <button className="close_btn" onClick={() => modalCloseHandler('showAllQuestionsClicked')}>
                                                    <img src={cancel} alt="cancel" />
                                                </button>
                                            </div>
                                            <div className="inner_wrap">
                                                {questionList?.length > 0 &&
                                                    questionList?.map((item: any, index: number) => {
                                                        const { questionData } = item;
                                                        return (
                                                            <div key={questionData?.questionId}>
                                                                <div className="question_ans_card">
                                                                    <div className="user_detail">
                                                                        <figure className="user_img">
                                                                            <img src={questionData?.userImage || dummy} alt="user-img" />
                                                                        </figure>
                                                                        <div className="details">
                                                                            <span className="user_name">{questionData?.userName}</span>
                                                                            <span className="date">{questionData?.date}</span>
                                                                        </div>
                                                                    </div>
                                                                    <p>{questionData?.question}</p>
                                                                    {Object.keys(questionsData?.showHideAnswer).length &&
                                                                        questionsData?.showHideAnswer[questionData?.questionId] ? (
                                                                        <span
                                                                            onClick={() => questionHandler('showAnswerClicked', item?.questionData?.questionId)}
                                                                            className="show_hide_ans link">
                                                                            {'Hide answer'}
                                                                        </span>
                                                                    ) : Object.keys(item?.questionData?.answerData).length ? (
                                                                        <span
                                                                            onClick={() => questionHandler('hideAnswerClicked', item?.questionData?.questionId)}
                                                                            className="show_hide_ans link">
                                                                            {'Show answer'}
                                                                        </span>
                                                                    ) : (
                                                                        <span
                                                                            onClick={() => questionHandler('askQuestion', item?.questionData?.questionId)}
                                                                            className="show_hide_ans link">
                                                                            {'Answer'}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                {Object.keys(questionsData?.showHideAnswer).length &&
                                                                    questionsData?.showHideAnswer[questionData?.questionId] &&
                                                                    Object.keys(item?.questionData?.answerData).length ?
                                                                    <div className="question_ans_card answer">
                                                                        <div className="user_detail">
                                                                            <figure className="user_img">
                                                                                <img
                                                                                    src={questionData?.answerData?.userImage || dummy}
                                                                                    alt="user-img"
                                                                                />
                                                                            </figure>
                                                                            <div className="details">
                                                                                <span className="user_name">{questionData?.answerData?.userName}</span>
                                                                                <span className="date">{questionData?.answerData?.date}</span>
                                                                            </div>
                                                                        </div>
                                                                        <p>{questionData?.answerData?.answer}</p>
                                                                        <span
                                                                            onClick={() => questionHandler('updateQuestion', item?.questionData?.questionId, item?.questionData?.answerData?.answer, null, item?.questionData?.answerData?.answerId)}
                                                                            className="show_hide_ans link">Edit</span>
                                                                        <span
                                                                            onClick={() => questionHandler('deleteQuestion', item?.questionData?.questionId, '', index, item?.questionData?.answerData?.answerId)}
                                                                            className="show_hide_ans link">Delete</span>
                                                                    </div> : ''}
                                                            </div>
                                                        )
                                                    })}
                                                {jobDetailsData?.questionsCount > questionList.length && <div className="text-center">
                                                    <button className="fill_grey_btn load_more" onClick={loadMoreQuestionHandler}>View more</button>
                                                </div>}
                                            </div>
                                            {questionList?.length === 0 &&
                                                <div className="no_record align_centr">
                                                    <figure className="no_img">
                                                        <img src={noDataFound} alt="data not found" />
                                                    </figure>
                                                    <span>No Questions Found</span>
                                                </div>
                                            }
                                        </div>
                                    </>
                                </Modal>
                            }
                            {/* show ask question modal */}
                            {questionsData.askQuestionsClicked &&
                                <Modal
                                    className="ques_ans_modal"
                                    open={questionsData.askQuestionsClicked}
                                    onClose={() => modalCloseHandler('askQuestionsClicked')}
                                    aria-labelledby="simple-modal-title"
                                    aria-describedby="simple-modal-description"
                                >
                                    <div
                                        className="custom_wh ask_ques"
                                        data-aos="zoom-in"
                                        data-aos-delay="30"
                                        data-aos-duration="1000">
                                        <div className="heading">
                                            <span className="sub_title">
                                                {questionsData.updateQuestionsClicked ? 'Edit Answer' : `Answer`}
                                            </span>
                                            <button
                                                className="close_btn"
                                                onClick={() => modalCloseHandler('askQuestionsClicked')}>
                                                <img src={cancel} alt="cancel" />
                                            </button>
                                        </div>
                                        <div className="form_field">
                                            <label className="form_label">Your answer</label>
                                            <div className="text_field">
                                                <textarea placeholder="Text" value={questionsData.questionData} onChange={(e) => handleChange(e, 'questionData')}></textarea>
                                                <span className="char_count">{`${questionsData.questionData.trim().length}/250`}</span>
                                            </div>
                                            {!!errors.questionData && <span className="error_msg">{errors.questionData}</span>}
                                        </div>
                                        <div className="bottom_btn custom_btn">
                                            {questionsData.updateQuestionsClicked ? <button className="fill_btn full_btn" onClick={() => submitQuestionHandler('updateQuestion')}>Save</button>
                                                : <button className="fill_btn full_btn" onClick={() => questionHandler('submitAskQuestion')}>Send</button>}
                                            <button className="fill_grey_btn" onClick={() => questionHandler('questionCancelBtnClicked')}>Cancel</button>
                                        </div>
                                    </div>
                                </Modal>
                            }
                            {/* send confirmation yes/no modal */}
                            {questionsData.confirmationClicked &&
                                <Modal
                                    className="custom_modal"
                                    open={questionsData.confirmationClicked}
                                    onClose={() => modalCloseHandler('confirmationClicked')}
                                    aria-labelledby="simple-modal-title"
                                    aria-describedby="simple-modal-description"
                                >
                                    <>
                                        <div className="custom_wh confirmation" data-aos="zoom-in" data-aos-delay="30" data-aos-duration="1000">
                                            <div className="heading">
                                                <span className="xs_sub_title">{`${questionsData.deleteQuestionsClicked ? 'Delete' : 'Post'} Answer Confirmation`}</span>
                                                <button className="close_btn" onClick={() => modalCloseHandler('confirmationClicked')}>
                                                    <img src={cancel} alt="cancel" />
                                                </button>
                                            </div>
                                            <div className="modal_message">
                                                <p>{`Are you sure you want to ${questionsData.deleteQuestionsClicked ? 'delete' : 'post'} a answer?`}</p>
                                            </div>
                                            <div className="dialog_actions">
                                                <button className="fill_btn" onClick={() => submitQuestionHandler(questionsData.questionsClickedType)}>Yes</button>
                                                <button className="fill_grey_btn" onClick={() => modalCloseHandler('confirmationClicked')}>No</button>
                                            </div>
                                        </div>
                                    </>
                                </Modal>
                            }
                            <div className="flex_col_sm_8">
                                <div className="flex_row">
                                    <div className="flex_col_sm_12">
                                        <span className="sub_title">Job type</span>
                                        <ul className="job_categories">
                                            <li>
                                                <figure className="type_icon">
                                                    <img alt="" src={jobDetailsData?.jobType?.jobTypeImage} />
                                                </figure>
                                                <span className="name">{jobDetailsData?.jobType?.jobTypeName}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="flex_row">
                                    <div className="flex_col_sm_12">
                                        <span className="sub_title">
                                            {'Specialisations needed'}
                                        </span>
                                        <div className="tags_wrap">
                                            <ul>
                                                {jobDetailsData?.specializationData?.map((item: any) => {
                                                    return <li key={item.specializationId}>{item.specializationName}</li>
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="section_wrapper">
                            <span className="sub_title">Posted by</span>
                            <div className="flex_row">
                                <div className="flex_col_sm_3">
                                    <div className={`tradie_card posted_by`}>
                                        <div className="user_wrap">
                                            <figure className={`u_img`}>
                                                {(jobDetailsData?.postedBy)?.hasOwnProperty('builderImage') ? (
                                                    <img
                                                        src={jobDetailsData?.postedBy?.builderImage || dummy}
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
                                                ) : Array.isArray(jobDetailsData?.postedBy) ? renderBuilderAvatar("image") : (
                                                    <img
                                                        src={dummy}
                                                        alt="traide-img"
                                                    />
                                                )}
                                            </figure>
                                            <div className='details'>
                                                <span
                                                    className="name"
                                                    onClick={() => {
                                                        if (jobDetailsData?.postedBy?.builderName) {
                                                            props?.history?.push(`/builder-info?builderId=${jobDetailsData?.postedBy?.builderId}`)
                                                        }
                                                    }}>
                                                    {jobDetailsData?.postedBy?.builderName || renderBuilderAvatar("name")}
                                                </span>

                                                <span className="rating">
                                                    {`${jobDetailsData?.postedBy?.ratings ? jobDetailsData?.postedBy?.ratings : '0'}, ${jobDetailsData?.postedBy?.reviews ? jobDetailsData?.postedBy?.reviews : '0'} reviews`}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default JobDetailsPage;
