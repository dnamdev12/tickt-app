import menu from '../../assets/images/menu-line-blue.png';
import close from '../../assets/images/ic-cancel-blue.png';
import dummy from '../../assets/images/u_placeholder.jpg';
// import cameraGradient from '../../assets/images/camera-gradient.png';
import editIconBlue from '../../assets/images/ic-edit-blue.png';
import profilePlaceholder from '../../assets/images/ic-placeholder-detail.png';

const BuilderProfile = () => {
  return (
   <>
   <div className="app_wrapper">
            <div className="custom_container">
                <span
                    className="mob_side_nav">
                    <img src={menu} alt="mob-side-nav" />
                </span>
                <div className="f_row">
                    <div className="side_nav_col">
                        <button className="close_nav">
                            <img src={close} alt="close" />
                        </button>
                        <div className="stick">
                            <span className="title">My Profile</span>
                            <ul className="dashboard_menu">
                                <li>
                                    <a className="icon applicants">
                                        <span className="menu_txt">Personal information</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="icon wallet">
                                        <span className="menu_txt">Banking details</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="icon settings">
                                        <span className="menu_txt">Settings</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="icon chat">
                                        <span className="menu_txt">Support chat</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="icon tnc">
                                        <span className="menu_txt">Privacy Policy</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="icon tnc">
                                        <span className="menu_txt">Terms of use</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="detail_col profile_info">
                        <div className="flex_row">
                            <div className="flex_col_sm_4">
                                <div className="upload_profile_pic">
                                    <figure className="user_img">
                                        <img src={dummy} alt="Profile-pic" />
                                    </figure>
                                    <label className="camera" htmlFor="upload_profile_pic">
                                        {/* <img src={cameraGradient} alt="camera" /> */}
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/png,image/jpg,image/jpeg,.pdf, .doc, video/mp4, video/wmv, video/avi"
                                        style={{ display: "none" }}
                                        id="upload_profile_pic"
                                    />
                                </div>
                            </div>
                            <div className="flex_col_sm_8">
                                <span className="title">John Oldman
                                    <span className="edit_icon" title="Edit">
                                        <img src={editIconBlue} alt="edit" />
                                    </span>
                                </span>
                                <span className="tagg">Tradie</span>
                                <ul className="review_job">
                                    <li>
                                        <span className="icon reviews">4.5</span>
                                        <span className="review_count">15 reviews</span>
                                    </li>
                                    <li>
                                        <span className="icon job">2</span>
                                        <span className="review_count"> jobs completed</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="section_wrapper">
                            <span className="sub_title">Areas of jobs
                            <span className="edit_icon" title="Edit">
                                    <img src={editIconBlue} alt="edit" />
                                </span>
                            </span>
                            <div className="tags_wrap">
                                <ul>
                                    <li className="main">
                                        <img src={menu} alt="icon" />Electrician
                                    </li>
                                    <li>Electrical Instrumentation</li>
                                    <li>Security and Fire Alarm Installation</li>
                                    <li>Electrical Instrumentation</li>
                                    <li>Security and Fire Alarm Installation</li>
                                    <li>More</li>
                                </ul>
                            </div>
                        </div>

                        <div className="section_wrapper">
                            <span className="sub_title">About
                                <span className="edit_icon" title="Edit">
                                    <img src={editIconBlue} alt="edit" />
                                </span>
                            </span>
                            <button className="fill_grey_btn full_btn">Add info about you</button>
                            <p className="commn_para">
                                ** Currently on holiday, back Jan 10! ** Just finished up my Electricians apprenticeship working on large project sites around Melbourne. I aim to finish all my work in a timely and affordable manner. If that sounds good to you, flick me a message and I’ll reply ASAP! Just finished up my Electricians apprenticeship working on large project sites around Melbourne. I aim to finish all my work in a timely and affordable manner. Just finished up my Electricians apprenticeship working on large project sites around Melbourne.
                            </p>
                        </div>

                        <div className="section_wrapper">
                            <span className="sub_title">Portfolio
                                <span className="edit_icon" title="Edit">
                                    <img src={editIconBlue} alt="edit" />
                                </span>
                            </span>
                            <button className="fill_grey_btn full_btn">Add portfolio</button>
                            <ul className="portfolio_wrappr">
                                <li className="media">
                                    <figure className="portfolio_img">
                                        <img src={profilePlaceholder} alt="portfolio-images" />
                                        <span className="xs_sub_title">Dummy text</span>
                                    </figure>
                                </li>
                                <li className="media">
                                    <figure className="portfolio_img">
                                        <img src={profilePlaceholder} alt="portfolio-images" />
                                        <span className="xs_sub_title">Dummy text</span>
                                    </figure>
                                </li>
                            </ul>
                        </div>

                        <button className="fill_btn full_btn">Save changes</button>

                    </div>
                </div>
            </div>
        </div>
   </>
  );
};

export default BuilderProfile;
