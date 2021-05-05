import { useEffect } from 'react';
import dummy from '../../assets/images/u_placeholder.jpg';
import thumb from '../../../assets/images/job-posted-bg.jpg';
import question from '../../assets/images/ic-question.png';
import locations from '../../../assets/images/ic-location.png';
import editIconBlue from '../../assets/images/ic-edit-blue.png';
import leftIcon from '../../../assets/images/ic-back-arrow-line.png'
import rightIcon from '../../../assets/images/ic-next-arrow-line.png'
import moment from 'moment';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const JobDetailsPage = (props: any) => {
    console.log(props,"props")
    useEffect(() => {
        // props.getHomejobDetails("608ffeb4b8703c34986d0434");
    }, [])

    return (
        <div className="app_wrapper">
            <div className="section_wrapper">
                <div className="custom_container">
                    <div className="vid_img_wrapper">
                        <div className="flex_row">
                            <div className="flex_col_sm_8 relative">
                                <button
                                    className="back"></button>
                            </div>
                        </div>
                        <div className="flex_row">
                            <div className="flex_col_sm_8">
                                <figure className="vid_img_thumb">
                                    <OwlCarousel className='owl-theme'>
                                    </OwlCarousel>
                                </figure>
                            </div>
                            <div className="flex_col_sm_4 relative">
                                <div className="detail_card">
                                    <span className="title">Job 1
                                    </span>
                                    <div className="job_info">
                                    </div>
                                    <button
                                        className="fill_btn full_btn">Post job</button>
                                </div>
                            </div>
                        </div>
                        <div className="flex_row">
                            <div className="flex_col_sm_8">
                                <div className="description">
                                    <span className="sub_title">Details</span>
                                    <p className="commn_para">
                                        job description
                                </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex_row">
                            <div className="flex_col_sm_4">
                                <span className="sub_title">Job milestones</span>
                                <ul className="job_milestone">
                                </ul>
                                <button className="fill_grey_btn ques_btn">
                                    <img src={question} alt="question" />
                                    {'0 questions'}
                                </button>
                            </div>

                            <div className="flex_col_sm_8">
                                <div className="flex_row">
                                    <div className="flex_col_sm_12">
                                        <span className="sub_title">Job type</span>
                                        <ul className="job_categories">
                                            <li className="draw">
                                                <figure className="type_icon">
                                                    <img alt="icon" />
                                                </figure>
                                                <span className="name">ob_type name</span>
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
                                                <img src={dummy} alt="traide-img" />
                                            </figure>
                                            <div className="details">
                                                <span className="name">John</span>
                                                <span className="prof">Project Manager</span>
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
