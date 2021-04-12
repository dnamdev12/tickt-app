import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';

import colorLogo from '../../../assets/images/ic-logo-yellow.png';
import dummy from '../../../assets/images/u_placeholder.jpg';
import Searchicon from "../../../../assets/images/main-search.png";
import search from "../../../../assets/images/ic-search.png";
import Location from "../../../../assets/images/ic-location.png";
import cross from "../../../../assets/images/close-black.png";
import bannerimg from '../../../../assets/images/home-banner.png';
import residential from "../../../assets/images/ic-residential.png";
import industrial from "../../../assets/images/ic-money.png";
import contracted from "../../../assets/images/ic-contracted.png";
import commercial from "../../../assets/images/ic-commercial.png";
import hourlyRate from "../../../assets/images/ic-clock.png";

const BannerSearch = () => {
    const [searchJob, setSearchJob] = useState<string>('');

    return (
        <div className="home_banner">
            <figure className="banner_img">
                <img src={bannerimg} alt="bannerimg" />
                <div className="banner_container">
                    <div className="home_search">
                        <button className="modal_srch_close">
                            <img src="assets/images/close 1.png" alt="close" />
                        </button>
                        <form className="search_wrapr">
                            <ul>
                                <li className="categ_box">
                                    <div className="text_field">
                                        <input type="text" placeholder="What jobs are you after?" />
                                        <div className="border_eff"></div>
                                        <span className="detect_icon"> </span>
                                        <span className="detect_icon_ltr">
                                            <img src={Searchicon} alt="search" />
                                        </span>
                                    </div>
                                </li>
                                <li className="loc_box">
                                    <div className="text_field">
                                        <div>
                                            <input type="text" placeholder="Where?" className="line-1" />
                                            <span className="detect_icon_ltr">
                                                <img src={Location} alt="location" />
                                            </span>
                                            <span className="detect_icon" >
                                                <img src={cross} alt="cross" />
                                            </span>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="custom_date_range">
                                        <div className="text_field">
                                            <span className="detect_icon_ltr calendar"></span>
                                            <input type="text" placeholder="When?" />
                                        </div>
                                    </div>
                                </li>
                                <div className="search_btn">
                                    <button type="button" className="fill_btn">
                                        <img src={search} alt="search" />
                                    </button>
                                </div>
                            </ul>
                        </form>

                        {/* Category recent search */}
                        {/* <div className="custom_autosuggestion">
                                <span className="sub_title">Recent searches</span>

                                <div className="flex_row recent_search">
                                    <div className="flex_col_sm_4">
                                        <div className="autosuggestion_icon card history">
                                            <span>Campervans</span>
                                            <span className="name">Vehicles</span>
                                        </div>
                                    </div>

                                    <div className="flex_col_sm_4">
                                        <div className="autosuggestion_icon card history">
                                            <span>sparknotes1</span>
                                            <span className="name">sparknotes</span>
                                        </div>
                                    </div>

                                    <div className="flex_col_sm_4">
                                        <div className="autosuggestion_icon card history">
                                            <span>Cabins</span>
                                            <span className="name">Accomodation</span>
                                        </div>
                                    </div>
                                </div>
                                <span className="sub_title">Categories</span>
                                <div className="searched_categories">
                                    <ul className="categories">
                                        <li>
                                            <a className="categ_card">
                                                <figure className="categ_img">
                                                    <img alt="categories" src={colorLogo} />
                                                </figure>
                                                <span className="categ_name"> Fishing </span>
                                            </a>
                                        </li>

                                        <li>
                                            <a className="categ_card">
                                                <figure className="categ_img">
                                                    <img alt="categories" src={colorLogo} />
                                                </figure>
                                                <span className="categ_name"> Fishing </span></a>
                                        </li>
                                        <li>
                                            <a className="categ_card">
                                                <figure className="categ_img">
                                                    <img alt="categories" src={colorLogo} />
                                                </figure>
                                                <span className="categ_name"> Fishing </span></a>
                                        </li>
                                        <li>
                                            <a className="categ_card">
                                                <figure className="categ_img">
                                                    <img alt="categories" src={colorLogo} />
                                                </figure>
                                                <span className="categ_name"> Fishing </span></a>
                                        </li>
                                        <li>
                                            <a className="categ_card">
                                                <figure className="categ_img">
                                                    <img alt="categories" src={colorLogo} />
                                                </figure>
                                                <span className="categ_name"> Fishing </span></a>
                                        </li>
                                        <li>
                                            <a className="categ_card">
                                                <figure className="categ_img">
                                                    <img alt="categories" src={colorLogo} />
                                                </figure>
                                                <span className="categ_name"> Fishing </span></a>
                                        </li>
                                    </ul>

                                </div>
                            </div> */}
                        {/* Category recent search close*/}

                        {/* Location recent search */}
                        {/* <div className="custom_autosuggestion location">
                                <button className="location-btn">
                                    <span className="gps_icon">
                                        <img src={icgps} />
                                    </span> Use my current location
                                </button>
                                <span className="sub_title ">Recent searches</span>
                                 <span className="blocked_note">
                              You have blocked your location.
                              To use this, change your location settings in browser.
                              </span> 
                                <div className="flex_row recent_search auto_loc">
                                    <div className="flex_col_sm_4">
                                        <div className="autosuggestion_icon card loc">
                                            <span >Dummy location</span>
                                            <span className="name">Noida, Uttar Pradesh, India</span></div></div>

                                    <div className="flex_col_sm_4">
                                        <div className="autosuggestion_icon card loc">
                                            <span >Unnamed Road</span>
                                            <span className="name"> Bichua, Madhya Pradesh 487001, India</span>
                                        </div>
                                    </div>
                                    <div className="flex_col_sm_4">
                                        <div className="autosuggestion_icon card loc">
                                            <span >4 shantanu banlows rajpath club ni same</span>
                                            <span className="name"> Narolgam, Ellisbridge, Ahmedabad, Gujarat 380006, India</span>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        {/* Location recent search close*/}

                    </div>
                    <div className="text-center">
                        <h1 className="heading text_effect">See all around me</h1>
                        <p className="commn_para">Get the job in your area</p>
                        <a className="fill_btn view-btn">View More</a>
                    </div>
                </div>
            </figure>
        </div>
    )
}

export default BannerSearch
