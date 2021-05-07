import { useState, useEffect } from 'react';
import { getHomeJobDetails, getHomeSaveJob, postHomeApplyJob } from '../../redux/homeSearch/actions';
import Modal from '@material-ui/core/Modal';

import cancel from "../../assets/images/ic-cancel.png";
import dummy from '../../assets/images/u_placeholder.jpg';
import thumb from '../../../assets/images/job-posted-bg.jpg';
import question from '../../assets/images/ic-question.png';
import locations from '../../../assets/images/ic-location.png';
import editIconBlue from '../../assets/images/ic-edit-blue.png';
import leftIcon from '../../assets/images/ic-back-arrow-line.png'
import rightIcon from '../../assets/images/ic-next-arrow-line.png'
import moment from 'moment';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

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

const JobDetailsPage = (props: any) => {
    const [jobDetailsData, setJobDetailsData] = useState<any>('')
    const [questionsData, setQuestionsData] = useState<any>({
        askQuestionsClicked: false,
        showAllQuestionsClicked: false,
        submitQuestionsClicked: false,
    })
    console.log(props, "props")

    useEffect(() => {
        (async () => {
            const params = new URLSearchParams(props.location?.search);
            const jobId: any = params.get('jobId')
            const res = await getHomeJobDetails(jobId);
            if (res.success) {
                setJobDetailsData(res.data);
            }
        })();
    }, [])


    const applyJobClicked = async () => {
        const data = {
            jobId: jobDetailsData?.jobId,
            builderId: jobDetailsData?.postedBy?.builderId
        }
        const res = await postHomeApplyJob(data);
        if (res.success) {
            setJobDetailsData((prevData: any) => ({ ...prevData, appliedStatus: 'APPLIED' }))
        }
    }

    const saveJobClicked = () => {
        const data = {
            jobId: jobDetailsData?.jobId,
            isSave: !jobDetailsData?.isSaved
        }
        getHomeSaveJob(data);
        setJobDetailsData((prevData: any) => ({ ...prevData, isSaved: !prevData.isSaved }))
    }

    const viewAskQuestionsClicked = (questionsCount: number) => {
        if (questionsCount == 0) {
            setQuestionsData((prevData: any) => ({ ...prevData, askQuestionsClicked: true }))
        } else if (questionsCount > 0) {
            setQuestionsData((prevData: any) => ({ ...prevData, showAllQuestionsClicked: true }))
        }
    }

    const modalCloseHandler = (modalType: string) => {
        setQuestionsData((prevData: any) => ({ ...prevData, [modalType]: false }))
    }

    const submitQuestionHandler = () => {
        setQuestionsData((prevData: any) => ({ ...prevData, submitQuestionsClicked: true }))
    }

    const askNewQuestion = () => {
        setQuestionsData((prevData: any) => ({ ...prevData, askQuestionsClicked: true }))
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
                                    <OwlCarousel className='owl-theme' {...options}>
                                        {jobDetailsData && jobDetailsData?.photos?.map((image: string) => {
                                            return (
                                                <img alt="" src={image} style={{ height: '400px' }} />
                                            )
                                        })}
                                    </OwlCarousel>
                                </figure>
                            </div>
                            <div className="flex_col_sm_4 relative">
                                <div className="detail_card">
                                    <span className="title line-3" title={jobDetailsData.jobName}>{jobDetailsData.jobName}</span>
                                    <span className="tagg">Job details</span>
                                    <div className="job_info">
                                        <ul>
                                            <li className="icon clock">{jobDetailsData.time}</li>
                                            <li className="icon dollar">{jobDetailsData.amount}</li>
                                            <li className="icon location line-1">{jobDetailsData.locationName}</li>
                                            <li className="icon calendar">{jobDetailsData.duration}</li>
                                        </ul>
                                    </div>
                                    <div className="bottom_btn">
                                        <span className={`bookmark_icon ${jobDetailsData?.isSaved ? 'active' : ''}`} onClick={saveJobClicked}></span>
                                        <button className="fill_btn full_btn" disabled={jobDetailsData?.appliedStatus == 'APPLIED'} onClick={applyJobClicked}>{jobDetailsData?.appliedStatus}</button>
                                    </div>
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
                                <span className="sub_title">Job milestones</span>
                                <ul className="job_milestone">
                                    {jobDetailsData && jobDetailsData?.jobMilestonesData?.map((item: any, index: number) => {
                                        return (
                                            <li>
                                                <span>{`${index + 1}. ${item?.milestoneName}`}</span>
                                                <span>{item?.fromDate?.length && !item?.toDate?.length ?
                                                    `${moment(item?.fromDate).format('MMM DD')}` :
                                                    item?.fromDate?.length && item?.toDate?.length ?
                                                        `${moment(item?.fromDate).format('MMM DD ')}-${moment(item?.toDate).format(' DD')}` : ''
                                                }</span>
                                            </li>
                                        )
                                    })}
                                </ul>
                                <button className="fill_grey_btn ques_btn" onClick={() => viewAskQuestionsClicked(2)}>
                                    <img src={question} alt="question" />
                                    {`${jobDetailsData?.questionsCount ? jobDetailsData?.questionsCount : '0'} questions`}
                                </button>
                            </div>
                            {questionsData.showAllQuestionsClicked &&
                                <Modal
                                    className="ques_ans_modal"
                                    open={questionsData.showAllQuestionsClicked}
                                    onClose={() => modalCloseHandler('showAllQuestionsClicked')}
                                    aria-labelledby="simple-modal-title"
                                    aria-describedby="simple-modal-description"
                                >
                                    <>
                                        <div className="custom_wh">
                                            <div className="heading">
                                                <span className="sub_title">10 question</span>
                                                <button className="close_btn" onClick={() => modalCloseHandler('showAllQuestionsClicked')}>
                                                    <img src={cancel} alt="cancel" />
                                                </button>
                                            </div>
                                            <div className="inner_wrap">
                                                <div className="question_ans_card">
                                                    <div className="user_detail">
                                                        <figure className="user_img">
                                                            <img src={dummy} alt="user-img" />
                                                        </figure>
                                                        <div className="details">
                                                            <span className="user_name">Cheryl</span>
                                                            <span className="date">12 Aug 2020</span>
                                                        </div>
                                                    </div>
                                                    <p>Don’t usually go for Global Industries boards but my go to longboard was in the shop being repaired. Compared to my usual this one isn’t as grippy but the weight and speed really made up for it.</p>
                                                    <span className="show_hide_ans link">Show answer</span>
                                                </div>

                                                <div className="question_ans_card answer">
                                                    <div className="user_detail">
                                                        <figure className="user_img">
                                                            <img src={dummy} alt="user-img" />
                                                        </figure>
                                                        <div className="details">
                                                            <span className="user_name">Cheryl</span>
                                                            <span className="date">12 Aug 2020</span>
                                                        </div>
                                                    </div>
                                                    <p>Don’t usually go for Global Industries boards but my go to longboard was in the shop being repaired. Compared to my usual this one isn’t as grippy but the weight and speed really made up for it.</p>
                                                    <span className="action link">Edit</span>
                                                    <span className="action link">Delete</span>
                                                </div>

                                                <div className="question_ans_card">
                                                    <div className="user_detail">
                                                        <figure className="user_img">
                                                            <img src={dummy} alt="user-img" />
                                                        </figure>
                                                        <div className="details">
                                                            <span className="user_name">Cheryl</span>
                                                            <span className="date">12 Aug 2020</span>
                                                        </div>
                                                    </div>
                                                    <p>Don’t usually go for Global Industries boards but my go to longboard was in the shop being repaired. Compared to my usual this one isn’t as grippy but the weight and speed really made up for it.</p>
                                                    <span className="action link">Answer</span>
                                                </div>

                                                <div className="text-center">
                                                    <button className="fill_grey_btn load_more">Load more</button>
                                                </div>
                                            </div>
                                            <div className="btn_wrap">
                                                <div className="bottom_btn">
                                                    <button className="fill_grey_btn full_btn" onClick={askNewQuestion}>Ask question</button>
                                                </div>
                                            </div>

                                        </div>
                                    </>
                                </Modal>
                            }
                            {questionsData.askQuestionsClicked &&
                                <Modal
                                    className="ques_ans_modal"
                                    open={questionsData.askQuestionsClicked}
                                    onClose={() => modalCloseHandler('askQuestionsClicked')}
                                    aria-labelledby="simple-modal-title"
                                    aria-describedby="simple-modal-description"
                                >
                                    <>
                                        <div className="custom_wh ask_ques">
                                            <div className="heading">
                                                <span className="sub_title">{`Ask ${jobDetailsData?.postedBy?.builderName} a question`}</span>
                                                <button className="close_btn" onClick={() => modalCloseHandler('askQuestionsClicked')}>
                                                    <img src={cancel} alt="cancel" />
                                                </button>
                                            </div>
                                            <div className="inner_wrap">
                                                <div className="form_field">
                                                    <label className="form_label">Your question</label>
                                                    <div className="text_field">
                                                        <textarea placeholder="Write here.."></textarea>
                                                    </div>
                                                    <span className="char_count">0/500</span>
                                                </div>
                                            </div>
                                            <div className="bottom_btn custom_btn">
                                                <button className="fill_btn full_btn" onClick={submitQuestionHandler}>Send</button>
                                                <button className="fill_grey_btn" onClick={() => modalCloseHandler('askQuestionsClicked')}>Cancel</button>
                                            </div>
                                        </div>
                                    </>
                                </Modal>
                            }
                            {questionsData.submitQuestionsClicked &&
                                <Modal
                                    className="custom_modal"
                                    open={questionsData.submitQuestionsClicked}
                                    onClose={() => modalCloseHandler('submitQuestionsClicked')}
                                    aria-labelledby="simple-modal-title"
                                    aria-describedby="simple-modal-description"
                                >
                                    <>
                                        <div className="custom_wh confirmation">
                                            <div className="heading">
                                                <span className="sub_title">Ask Question Confirmation</span>
                                                <button className="close_btn" onClick={() => modalCloseHandler('submitQuestionsClicked')}>
                                                    <img src={cancel} alt="cancel" />
                                                </button>
                                            </div>
                                            <div className="modal_message">
                                                <p>Are you sure you want to ask a question?</p>
                                            </div>
                                            <div className="dialog_actions">
                                                <button className="fill_btn" >Yes</button>
                                                <button className="fill_grey_btn" onClick={() => modalCloseHandler('submitQuestionsClicked')}>No</button>
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
                                            <li className="draw">
                                                <figure className="type_icon">
                                                    <img alt="icon" src={jobDetailsData?.jobType?.jobTypeImage} />
                                                </figure>
                                                <span className="name">{jobDetailsData?.jobType?.jobTypeName}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="flex_row">
                                    <div className="flex_col_sm_12">
                                        <span className="sub_title">Specialisations needed
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
                                                <img src={jobDetailsData?.postedBy?.builderImage ? jobDetailsData?.postedBy?.builderImage : dummy} alt="traide-img" />
                                            </figure>
                                            <div className="details">
                                                <span className="name">{jobDetailsData?.postedBy?.builderName}</span>
                                                {/* <span className="prof">Project Manager</span> */}
                                                <span className="rating">{`${jobDetailsData?.postedBy?.ratings ? jobDetailsData?.postedBy?.ratings : '0'}, ${jobDetailsData?.postedBy?.reviews ? jobDetailsData?.postedBy?.reviews : '0'} reviews`}</span>
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
