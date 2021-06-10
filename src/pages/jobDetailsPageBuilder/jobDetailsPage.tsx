import { useState, useEffect } from 'react';
import Constants from '../../utils/constants';
import {
    getHomeJobDetails,
    getHomeSaveJob,
    jobDetailsBuilder,
    postHomeApplyJob
} from '../../redux/homeSearch/actions';
import { getTradieQuestionList } from '../../redux/jobs/actions';
import {
    // postAskQuestion,
    // deleteQuestion,
    // updateQuestion,
    getQuestionsList,
    answerQuestion,
    updateAnswer,
    deleteAnswer
} from '../../redux/jobs/actions';
import Modal from '@material-ui/core/Modal';

import cancel from "../../assets/images/ic-cancel.png";
import dummy from '../../assets/images/u_placeholder.jpg';
import jobDummyImage from '../../assets/images/ic-placeholder-detail.png';
import question from '../../assets/images/ic-question.png';
import leftIcon from '../../assets/images/ic-back-arrow-line.png'
import rightIcon from '../../assets/images/ic-next-arrow-line.png'
import moment from 'moment';
import approved from '../../assets/images/approved.png';
import waiting from '../../assets/images/exclamation.png';

import { renderTime } from '../../utils/common';

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

//@ts-ignore
import FsLightbox from 'fslightbox-react';
import { setShowToast } from '../../redux/common/actions';
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

const JobDetailsPage = (props: PropsType) => {
    const [errors, setErrors] = useState<any>({});
    const [jobDetailsData, setJobDetailsData] = useState<any>('');
    const [questionList, setQuestionList] = useState<Array<any>>([]);
    const [questionListPageNo, setQuestionListPageNo] = useState<number>(1);
    const [questionsData, setQuestionsData] = useState<any>({
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
    })

    const [toggler, setToggler] = useState(false);
    const [selectedSlide, setSelectSlide] = useState(1);


    // console.log(props, "props", questionsData, "questionsData", jobDetailsData, "jobDetailsData", questionList, 'questionList', questionListPageNo, 'questionListPageNo');

    useEffect(() => {
        (async () => {
            let location_search = window.atob((props.location?.search).substring(1))
            const params = new URLSearchParams(location_search);
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


            fetchQuestionsList();
        })();
    }, [])


    const fetchQuestionsList = async (isTrue?: boolean) => {
        let location_search = window.atob((props.location?.search).substring(1))
        const params = new URLSearchParams(location_search);
        const questionData: any = {
            jobId: params.get('jobId'),
            page: 1
        }
        const res2 = await getQuestionsList(questionData);
        if (res2.success) {
            setQuestionList(res2.data);
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
        let location_search = window.atob((props.location?.search).substring(1))
        const params = new URLSearchParams(location_search);
        const data: any = {
            jobId: params.get('jobId'),
            page: questionListPageNo + 1
        }
        const res = await getQuestionsList(data);
        if (res.success) {
            setQuestionList((prevData: any) => ([...prevData, ...res.data]));
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
        console.log('Here!------->')
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
                        src={postedBy[0].builderImage}
                        alt="traide-img"
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
    if (props.location?.search) {
        let location_search = window.atob((props.location?.search).substring(1))
        const params = new URLSearchParams(location_search);
        if (params.get('status')) {
            paramStatus = params.get('status');
        }
    }



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
                    { jobDetailsData?.status === "APPROVED" && <img src={approved} alt="icon" />}
                    { jobDetailsData?.status === "NEEDS APPROVAL" && <img src={waiting} alt="icon" />}
                    { jobDetailsData?.status}
                </>
            )
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
                }
                if (item?.mediaType === 1) {
                    sources.push(item.link);
                    types.push('image');
                }
            })
        }

        return { sources, types };
    }
    let itemsMedia: any = [];
    if (jobDetailsData?.photos?.length) {
        itemsMedia = jobDetailsData?.photos?.filter((itemP: any) => itemP.mediaType !== 3 && itemP.mediaType !== 4);
    }
    const { sources, types } = renderFilteredItems(itemsMedia);
    return (
        <div className="app_wrapper">
            <div className="section_wrapper">
                <div className="custom_container">

                    <FsLightbox
                        toggler={toggler}
                        slide={selectedSlide}
                        sources={sources}
                        types={types}
                    />

                    <div className="vid_img_wrapper pt-20">
                        <div className="flex_row">
                            <div className="flex_col_sm_8 relative">
                                <button className="back" onClick={() => props.history?.goBack()}></button>
                            </div>
                        </div>
                        <div className="flex_row">
                            <div className="flex_col_sm_8">
                                <figure className="vid_img_thumb">
                                    <OwlCarousel className='owl-theme' {...options}>
                                        {itemsMedia.length ?
                                            itemsMedia.map((image: any, index: number) => {
                                                console.log({ image }, '---?')
                                                return image?.mediaType === 1 ? (
                                                    <img
                                                        key={`${image}${index}`}
                                                        onClick={() => {
                                                            setToggler((prev: any) => !prev);
                                                            setSelectSlide(index + 1);
                                                        }}
                                                        alt=""
                                                        src={image?.link ? image?.link : jobDummyImage}
                                                    />) : (
                                                    <video
                                                        key={`${image}${index}`}
                                                        onClick={() => {
                                                            setToggler((prev: any) => !prev);
                                                            setSelectSlide(index + 1);
                                                        }}
                                                        src={image?.link}
                                                        style={{ height: '410px', width: '800px' }}
                                                    />
                                                )
                                            }) : <img alt="" src={jobDummyImage} />}
                                    </OwlCarousel>
                                </figure>
                            </div>
                            <div className="flex_col_sm_4 relative">
                                <div className="detail_card">
                                    <span className="title line-3" title={jobDetailsData.jobName}>{jobDetailsData.jobName}</span>
                                    <span className="tagg">Job details</span>
                                    <div className="job_info">
                                        <ul>
                                            <li className="icon calendar">
                                                {jobDetailsData?.time ? jobDetailsData.time : renderTime(jobDetailsData.fromDate, jobDetailsData?.toDate)}
                                            </li>
                                            <li className="icon dollar">{jobDetailsData.amount}</li>
                                            <li className="icon location line-3">{jobDetailsData.locationName}</li>
                                            <li className="icon clock">{jobDetailsData.duration}</li>
                                        </ul>
                                    </div>

                                    {/* {paramStatus ? (
                                        <button
                                            className="fill_btn full_btn btn-effect">
                                            {paramStatus}
                                        </button>
                                    ) : jobDetailsData?.status ? (
                                        <button
                                            className="fill_btn full_btn btn-effect">
                                            {jobDetailsData?.status}
                                        </button>
                                    ) : null} */}
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
                                    <b className="ft_normal"> {`${jobDetailsData?.milestoneNumber} `}{`of ${jobDetailsData?.totalMilestones}`} </b>
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
                                                <span>{renderTime(item?.fromDate, item?.toDate)}</span>
                                                {/* <span>{item?.fromDate?.length && !item?.toDate?.length ?
                                                    `${moment(item?.fromDate).format('MMM DD')}` :
                                                    item?.fromDate?.length && item?.toDate?.length ?
                                                        `${moment(item?.fromDate).format('MMM DD ')}-${moment(item?.toDate).format(' DD')}` : ''
                                                }</span> */}
                                            </li>
                                        )
                                    })}
                                </ul>
                                <button className="fill_grey_btn ques_btn" onClick={() => setQuestionsData((prevData: any) => ({ ...prevData, showAllQuestionsClicked: true }))}>
                                    <img src={question} alt="question" />
                                    {`${jobDetailsData?.questionsCount || '0'} questions`}
                                </button>
                            </div>
                            {/* show all questions modal */}
                            {questionsData.showAllQuestionsClicked &&
                                <Modal
                                    className="ques_ans_modal"
                                    open={questionsData.showAllQuestionsClicked}
                                    onClose={() => modalCloseHandler('1showAllQuestionsClicked')}
                                    aria-labelledby="simple-modal-title"
                                    aria-describedby="simple-modal-description"
                                >
                                    <>
                                        <div className="custom_wh" data-aos="zoom-in" data-aos-delay="30" data-aos-duration="1000">
                                            <div className="heading">
                                                <span className="sub_title">{`${jobDetailsData?.questionsCount || 0} questions`}</span>
                                                <button className="close_btn" onClick={() => modalCloseHandler('showAllQuestionsClicked')}>
                                                    <img src={cancel} alt="cancel" />
                                                </button>
                                            </div>
                                            <div className="inner_wrap">
                                                {questionList?.map((item: any, index: number) => {
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
                                                                {console.log({ questionList })}
                                                                {/* {Object.keys(questionData?.answerData).length > 0 &&
                                                                    !(questionsData.answerShownHideList.includes(questionData?.questionId)) ?
                                                                    <span
                                                                        className="show_hide_ans link"
                                                                        onClick={() => questionHandler('showAnswerClicked', questionData?.questionId)}>
                                                                        {'Show answer'}
                                                                    </span>: (
                                                                        <span
                                                                        className="show_hide_ans link">
                                                                            {'Answer'}
                                                                        </span>
                                                                    )} */}
                                                                {/* {questionData?.isModifiable &&
                                                                    <span
                                                                        className="action link"
                                                                        onClick={() => questionHandler('updateQuestion', questionData?.questionId, questionData?.question)}>
                                                                        {'Edit'}
                                                                    </span>}
                                                                {questionData?.isModifiable &&
                                                                    <span
                                                                        className="action link"
                                                                        onClick={() => questionHandler('deleteQuestion', questionData?.questionId, '', index)}>
                                                                        {'Delete'}
                                                                    </span>} */}
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
                                                    <button className="fill_grey_btn load_more" onClick={loadMoreQuestionHandler}>Load more</button>
                                                </div>}
                                            </div>
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
                                    <div className="custom_wh ask_ques" data-aos="zoom-in" data-aos-delay="30" data-aos-duration="1000">
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
                                                <span className="sub_title">{`${questionsData.deleteQuestionsClicked ? 'Delete' : 'Ask'} Answer Confirmation`}</span>
                                                <button className="close_btn" onClick={() => modalCloseHandler('confirmationClicked')}>
                                                    <img src={cancel} alt="cancel" />
                                                </button>
                                            </div>
                                            <div className="modal_message">
                                                <p>{`Are you sure you want to ${questionsData.deleteQuestionsClicked ? 'delete' : 'ask'} a answer?`}</p>
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
                                    <div className="tradie_card posted_by view_more ">
                                        <a href="javascript:void(0)" className="chat circle"></a>
                                        <div className="user_wrap">
                                            <figure className="u_img">
                                                {jobDetailsData?.postedBy?.builderImage ? (
                                                    <img src={jobDetailsData?.postedBy?.builderImage ? jobDetailsData?.postedBy?.builderImage : dummy} alt="traide-img" />
                                                ) : Array.isArray(jobDetailsData?.postedBy) ? renderBuilderAvatar("image") : null}
                                            </figure>
                                            <div className="details">
                                                <span
                                                    className="name"
                                                    onClick={() => {
                                                        setShowToast(true,'Under development');
                                                        // if (jobDetailsData?.postedBy?.builderName) {
                                                        //     props?.history?.push(`/builder-info?builderId=${jobDetailsData?.postedBy?.builderId}`)
                                                        // }
                                                    }}>
                                                    {jobDetailsData?.postedBy?.builderName || renderBuilderAvatar("name")}
                                                </span>
                                                {/* <span className="prof">Project Manager</span> */}
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
        </div>
    )
}

export default JobDetailsPage;
