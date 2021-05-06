import { useEffect } from 'react';
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
    console.log(props, "props")
    useEffect(() => {
        const params = new URLSearchParams(props.location?.search);
        const jobId = params.get('jobId')
        console.log(jobId);
        props.getHomeJobDetails(jobId);
        // props.getHomeJobDetails("608ffeb4b8703c34986d0434");
    }, [])

    const JobDetailsData = props.homeJobDetailsData;

    return (
        <div className="app_wrapper">
            <div className="section_wrapper">
                <div className="custom_container">
                    <div className="vid_img_wrapper">
                        <div className="flex_row">
                            <div className="flex_col_sm_8 relative">
                                <button className="back"></button>
                            </div>
                        </div>
                        <div className="flex_row">
                            <div className="flex_col_sm_8">
                                <figure className="vid_img_thumb">
                                    <OwlCarousel className='owl-theme' {...options}>
                                        {JobDetailsData && JobDetailsData?.photos?.map((image: string) => {
                                            return (
                                                <img alt="" src={image} style={{ height: '400px' }} />
                                            )
                                        })}
                                    </OwlCarousel>
                                </figure>
                            </div>
                            <div className="flex_col_sm_4 relative">
                                <div className="detail_card">
                                    <span className="title">{JobDetailsData.jobName}</span>
                                    <div className="job_info">
                                        <ul>
                                            <li className="icon clock">{JobDetailsData.time}</li>
                                            <li className="icon dollar">{JobDetailsData.amount}</li>
                                            <li className="icon location line-1">{JobDetailsData.locationName}</li>
                                            <li className="icon calendar">{JobDetailsData.duration}</li>
                                        </ul>
                                    </div>
                                    <button className="fill_btn full_btn">Apply</button>
                                </div>
                            </div>
                        </div>
                        <div className="flex_row">
                            <div className="flex_col_sm_8">
                                <div className="description">
                                    <span className="sub_title">Details</span>
                                    <p className="commn_para">{JobDetailsData.details}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex_row">
                            <div className="flex_col_sm_4">
                                <span className="sub_title">Job milestones</span>
                                <ul className="job_milestone">
                                    {JobDetailsData && JobDetailsData?.jobMilestonesData?.map((item: any, index: number) => {
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
                                <button className="fill_grey_btn ques_btn">
                                    <img src={question} alt="question" />
                                    {`${JobDetailsData?.questionsCount} questions`}
                                </button>
                            </div>

                            <div className="flex_col_sm_8">
                                <div className="flex_row">
                                    <div className="flex_col_sm_12">
                                        <span className="sub_title">Job type</span>
                                        <ul className="job_categories">
                                            <li className="draw">
                                                <figure className="type_icon">
                                                    <img alt="icon" src={JobDetailsData?.jobType?.jobTypeImage} />
                                                </figure>
                                                <span className="name">{JobDetailsData?.jobType?.jobTypeName}</span>
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
                                                {JobDetailsData?.specializationData?.map((item: any) => {
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
                                                <img src={JobDetailsData?.postedBy?.builderImage ? JobDetailsData?.postedBy?.builderImage : dummy} alt="traide-img" />
                                            </figure>
                                            <div className="details">
                                                <span className="name">{JobDetailsData?.postedBy?.builderName}</span>
                                                {/* <span className="prof">Project Manager</span> */}
                                                <span className="prof">{`${JobDetailsData?.postedBy?.ratings ? JobDetailsData?.postedBy?.ratings : '0'},${JobDetailsData?.postedBy?.reviews ? JobDetailsData?.postedBy?.reviews : '0'} reviews`}</span>
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
