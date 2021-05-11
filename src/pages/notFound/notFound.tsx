import notFound from '../../assets/images/not-found.png';
import { Link } from 'react-router-dom';

import menu from '../../assets/images/ic-filter-unselected.png';
import remove from '../../assets/images/close 1.png';
import dummy from '../../assets/images/u_placeholder.jpg';
import approved from '../../assets/images/approved.png';
import waiting from '../../assets/images/exclamation.png';
import rateStar from '../../assets/images/ic-star-fill.png';



export default function NotFound() {
    return (
        // <div className="error_page_wrap">
        //     <figure className="no_img">
        //         <img src={notFound} alt="not-found" />
        //     </figure>
        //     <div className="content">
        //         <h1>Page Not Found</h1>
        //         <Link to="/" className="fill_btn" title=" Home">Back To Home</Link>
        //     </div>
        // </div>


        <div className="custom_container">
            <span className="mob_side_nav">
                <img src={menu} alt="mob-side-nav" />
            </span>
            <div className="f_row">
                <div className="side_nav_col">
                    <button className="close_nav">
                        <img alt="close" />
                    </button>
                    <div className="stick">
                        <span className="title">Job Dashboard</span>
                        <ul className="dashboard_menu">
                            <li>
                                <a className="icon star active">Active Jobs</a>
                            </li>
                            <li>
                                <a className="icon applied">Applied jobs
                                    <span className="badge_count">5</span>
                                </a>
                            </li>
                            <li>
                                <a className="icon past">Past jobs</a>
                            </li>
                            <hr></hr>
                            <li>
                                <a className="icon new">New jobs</a>
                            </li>
                            <li>
                                <a className="icon approved">Approved milestones</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="detail_col">

                    {/* Active Jobs */}
                    <span className="sub_title">Active Jobs</span>
                    <div className="flex_row tradies_row">
                        <div className="flex_col_sm_6">
                            <div className="tradie_card">
                                <a href="javascript:void(0)" className="more_detail circle"></a>
                                <div className="user_wrap">
                                    <figure className="u_img">
                                        <img src={dummy} alt="traide-img" />
                                    </figure>
                                    <div className="details">
                                        <span className="name">Wire up circuit box</span>
                                    </div>
                                </div>
                                <div className="job_info">
                                    <ul>
                                        <li className="icon clock">32 minutes ago</li>
                                        <li className="icon dollar">$250 p/h</li>
                                        <li className="icon location">Melbourne CBD</li>
                                        <li className="icon calendar">4 days </li>
                                    </ul>
                                </div>
                                <div className="job_progress_wrap" id="scroll-progress-bar">
                                    <div className="progress_wrapper">
                                        <span className="completed-digit" id="digit-progress"><b>Job Milestones 2</b> of 5</span>
                                        <span className="approval_info">
                                            <img src={approved} alt="icon" />Approved </span>
                                        <span className="progress_bar">
                                            <input className="done_progress" id="progress-bar" type="range" min="0" />
                                        </span>
                                    </div>
                                </div>
                                <button className="fill_grey_btn full_btn">Approve</button>
                            </div>
                        </div>
                        <div className="flex_col_sm_6">
                            <div className="tradie_card">
                                <a href="javascript:void(0)" className="more_detail circle"></a>
                                <div className="user_wrap">
                                    <figure className="u_img">
                                        <img src={dummy} alt="traide-img" />
                                    </figure>
                                    <div className="details">
                                        <span className="name">Wire up circuit box</span>
                                    </div>
                                </div>
                                <div className="job_info">
                                    <ul>
                                        <li className="icon clock">32 minutes ago</li>
                                        <li className="icon dollar">$250 p/h</li>
                                        <li className="icon location">Melbourne CBD</li>
                                        <li className="icon calendar">4 days </li>
                                    </ul>
                                </div>
                                <div className="job_progress_wrap" id="scroll-progress-bar">
                                    <div className="progress_wrapper">
                                        <span className="completed-digit" id="digit-progress"><b>Job Milestones 2</b> of 5</span>
                                        <span className="approval_info">Awating </span>
                                        <span className="progress_bar">
                                            <input className="done_progress" id="progress-bar" type="range" min="0" />
                                        </span>
                                    </div>
                                </div>
                                <button className="fill_grey_btn full_btn">Approve</button>
                            </div>
                        </div>
                        <div className="flex_col_sm_6">
                            <div className="tradie_card">
                                <a href="javascript:void(0)" className="more_detail circle"></a>
                                <div className="user_wrap">
                                    <figure className="u_img">
                                        <img src={dummy} alt="traide-img" />
                                    </figure>
                                    <div className="details">
                                        <span className="name">Wire up circuit box</span>
                                    </div>
                                </div>
                                <div className="job_info">
                                    <ul>
                                        <li className="icon clock">32 minutes ago</li>
                                        <li className="icon dollar">$250 p/h</li>
                                        <li className="icon location">Melbourne CBD</li>
                                        <li className="icon calendar">4 days </li>
                                    </ul>
                                </div>
                                <div className="job_progress_wrap" id="scroll-progress-bar">
                                    <div className="progress_wrapper">
                                        <span className="completed-digit" id="digit-progress"><b>Job Milestones 2</b> of 5</span>
                                        <span className="approval_info">
                                            {/* <img src={approved} alt="icon" />Approved */}
                                            <img src={waiting} alt="icon" />Need approval
                                        </span>

                                        <span className="progress_bar">
                                            <input className="done_progress" id="progress-bar" type="range" min="0" />
                                        </span>
                                    </div>
                                </div>
                                <button className="fill_grey_btn full_btn">Approve</button>
                            </div>
                        </div>

                    </div>
                    {/* Active Jobs close */}

                    {/* Applied Jobs */}
                    <span className="sub_title">Applied Jobs</span>
                    <div className="flex_row tradies_row">
                        <div className="flex_col_sm_6">
                            <div className="tradie_card">
                                <a href="javascript:void(0)" className="more_detail circle"></a>
                                <div className="user_wrap">
                                    <figure className="u_img">
                                        <img src={dummy} alt="traide-img" />
                                    </figure>
                                    <div className="details">
                                        <span className="name">Wire up circuit box</span>
                                    </div>
                                </div>
                                <div className="job_info">
                                    <ul>
                                        <li className="icon clock">32 minutes ago</li>
                                        <li className="icon dollar">$250 p/h</li>
                                        <li className="icon location">Melbourne CBD</li>
                                        <li className="icon calendar">4 days </li>
                                    </ul>
                                </div>
                                <p className="commn_para line-2">Sparky wanted for a quick job to hook up two floodlights on the exterior of an apartment building...</p>
                                <ul className="count_wrap">
                                    <li className="icon view">127</li>
                                    <li className="icon comment">8</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* Applied Jobs close */}

                    {/* Past Jobs */}
                    <span className="sub_title">Past Jobs</span>
                    <div className="flex_row tradies_row">
                        <div className="flex_col_sm_6">
                            <div className="tradie_card">
                                <a href="javascript:void(0)" className="more_detail circle"></a>
                                <div className="user_wrap">
                                    <figure className="u_img">
                                        <img src={dummy} alt="traide-img" />
                                    </figure>
                                    <div className="details">
                                        <span className="name">Wire up circuit box</span>
                                    </div>
                                </div>
                                <div className="job_info">
                                    <ul>
                                        <li className="icon clock">32 minutes ago</li>
                                        <li className="icon dollar">$250 p/h</li>
                                        <li className="icon location">Melbourne CBD</li>
                                        <li className="icon calendar">4 days </li>
                                    </ul>
                                </div>
                                <button className="fill_grey_btn full_btn">
                                    <img src={rateStar} alt="rating-star" /> Rate this job
                                </button>
                            </div>
                        </div>
                        <div className="flex_col_sm_6">
                            <div className="tradie_card">
                                <a href="javascript:void(0)" className="more_detail circle"></a>
                                <div className="user_wrap">
                                    <figure className="u_img">
                                        <img src={dummy} alt="traide-img" />
                                    </figure>
                                    <div className="details">
                                        <span className="name">Wire up circuit box</span>
                                    </div>
                                </div>
                                <div className="job_info">
                                    <ul>
                                        <li className="icon clock">32 minutes ago</li>
                                        <li className="icon dollar">$250 p/h</li>
                                        <li className="icon location">Melbourne CBD</li>
                                        <li className="icon calendar">4 days </li>
                                    </ul>
                                </div>
                                <p className="commn_para line-3">Sparky wanted for a quick job to hook up two floodlights on the exterior of an apartment building to the main electrical grid.</p>
                            </div>
                        </div>
                    </div>
                    {/* Applied Jobs close */}

                </div>
            </div>
        </div >
    )
}
