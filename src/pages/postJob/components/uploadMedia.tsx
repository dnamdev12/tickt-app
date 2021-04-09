import React from 'react';
import colorLogo from '../../../assets/images/ic-logo-yellow.png';
import menu from '../../../assets/images/menu-line-white.svg';
import bell from '../../../assets/images/ic-notification.png';
import dummy from '../../../assets/images/u_placeholder.jpg';
import remove from "../../../assets/images/icon-close-1.png";
import addMedia from "../../../assets/images/add-image.png";

const UploadMedia = () => {
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
                            <div className="flex_col_sm_6">
                                <div className="relate">
                                    <button className="back"></button>
                                    <span className="title">Video upload or add photos</span>
                                </div>
                                <p className="commn_para">Record a short video or add photos to demonstrate your job and any unique requirements. </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex_row">
                        <div className="flex_col_sm_6">

                            <div className="upload_img_video">
                                <figure className="img_video">
                                    <img src={dummy} alt="media" />
                                    <img src={remove} alt="remove" className="remove" />
                                </figure>
                                <label className="upload_media" htmlFor="upload_img_video">
                                    <img src={addMedia} />
                                </label>
                                <input type="file" style={{ display: "none" }} id="upload_img_video" />
                            </div>

                            <div className="form_field">
                                <button className="fill_btn full_btn disable_btn">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default UploadMedia
