import React from 'react';
import colorLogo from '../../../assets/images/ic-logo-yellow.png';
import menu from '../../../assets/images/menu-line-white.svg';
import bell from '../../../assets/images/ic-notification.png';
import dummy from '../../../assets/images/u_placeholder.jpg';
import profile from '../../../assets/images/ic-profile.png';
import spherePlaceholder from "../../../assets/images/ic_categories_placeholder.svg";
import residential from "../../../assets/images/ic-residential.png";
import industrial from "../../../assets/images/ic-money.png";
import contracted from "../../../assets/images/ic-contracted.png";
import commercial from "../../../assets/images/ic-commercial.png";
import hourlyRate from "../../../assets/images/ic-clock.png";

const JobType = () => {
    return (
        <div className="app_wrapper">

            {/* Header */}
            <header id="header">
                <div className="custom_container">
                    <div className="flex_headrow">
                        <div className="brand_wrap">
                            <figure>
                                <img src={colorLogo}
                                    alt="logo-white" />
                            </figure>
                        </div>
                        <ul className="center_nav">
                            <li>
                                <a>Discover</a>
                            </li>
                            <li>
                                <a>Jobs</a>
                            </li>
                            <li>
                                <a className="active">Post</a>
                            </li>
                            <li>
                                <a>Chat</a>
                            </li>
                        </ul>


                        <ul className="side_nav">
                            <li className="mob_nav">
                                <img src={menu} alt="menu" />
                            </li>
                            <div className="profile_notification">
                                <div className="notification_bell">
                                    <figure className="bell">
                                        <span className="badge">4 </span>
                                        <img src={bell} alt="notify" />
                                    </figure>
                                </div>
                                <div className="user_profile">
                                    <figure aria-controls="simple-menu" aria-haspopup="true">
                                        <img src={dummy} alt="profile-img" />
                                    </figure>
                                </div>
                            </div>
                        </ul>
                    </div>

                </div>
            </header>
            {/* Header close */}

            <div className="section_wrapper">
                <div className="custom_container">
                    <div className="form_field">
                        <div className="flex_row">
                            <div className="flex_col_sm_5">
                                <div className="relate">
                                    <button className="back"></button>
                                    <span className="title">Job type</span>
                                </div>
                                <p className="commn_para">Select the category and the specialisations required</p>
                            </div>
                        </div>
                    </div>
                    <div className="form_field">
                        <span className="xs_sub_title">Categories</span>
                    </div>
                    <div className="select_sphere">
                        <ul>
                            <li className="active">
                                <figure>
                                    <img src={spherePlaceholder} />
                                </figure>
                                <span className="name">Electrician</span>
                            </li>
                            <li>
                                <figure>
                                    <img src={spherePlaceholder} />
                                </figure>
                                <span className="name">Electrician</span>
                            </li>
                        </ul>

                    </div>
                    <div className="form_field">
                        <span className="xs_sub_title">Job types</span>
                    </div>
                    <ul className="job_categories">
                        <li className="draw active">
                            <figure className="type_icon">
                                <img src={residential} alt="icon" />
                            </figure>
                            <span className="name">Residential</span>
                        </li>
                        <li className="draw">
                            <figure className="type_icon">
                                <img src={commercial} alt="icon" />
                            </figure>
                            <span className="name">Commercial</span>
                        </li>
                        <li className="draw">
                            <figure className="type_icon">
                                <img src={industrial} alt="icon" />
                            </figure>
                            <span className="name">Industrial</span>
                        </li>
                        <li className="draw">
                            <figure className="type_icon">
                                <img src={hourlyRate} alt="icon" />
                            </figure>
                            <span className="name">Hourly Rate</span>
                        </li>
                        <li className="draw">
                            <figure className="type_icon">
                                <img src={contracted} alt="icon" />
                            </figure>
                            <span className="name">Contracted</span>
                        </li>
                    </ul>
                    <div className="form_field">
                        <span className="xs_sub_title">Specialisation</span>
                    </div>
                    <div className="tags_wrap">
                        <ul>
                            <li className="selected">Machine Maintenance</li>
                            <li>Machine Maintenance</li>
                            <li>Machine Maintenance</li>
                        </ul>
                    </div>
                    <div className="form_field">
                        <button className="fill_btn full_btn">Continue</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default JobType
