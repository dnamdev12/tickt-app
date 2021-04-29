import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';

import colorLogo from '../../assets/images/ic-logo-yellow.png';
import dummy from '../../assets/images/u_placeholder.jpg';
import Searchicon from "../../assets/images/main-search.png";
import search from "../../assets/images/ic-search.png";
import Location from "../../assets/images/ic-location.png";
import cross from "../../assets/images/close-black.png";
import uc from '../../assets/images/uc.png';
import icgps from "../../assets/images/ic-gps.png";
import bannerimg from '../../assets/images/home-banner.png'
import residential from "../../assets/images/ic-residential.png";
import industrial from "../../assets/images/ic-money.png";
import contracted from "../../assets/images/ic-contracted.png";
import commercial from "../../assets/images/ic-commercial.png";
import hourlyRate from "../../assets/images/ic-clock.png";
import close from "../../assets/images/icon-close-1.png";


const BuilderHome = (props: any) => {

    const categorieshome = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
            slidesToSlide: 1, // optional, default to 1.
        },
    };

    const categoriesjob = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
            slidesToSlide: 1, // optional, default to 1.
        },
    };

    return (
        <div className="app_wrapper" >
            {/* Under construction */}
            <div className="custom_container">
                <div className="under_construction_wrap">
                    <figure className="constrction_img">
                        <img src={uc} alt="coming soon" />
                    </figure>
                    <h2>This Page is under construction. Please come back later.</h2>
                </div>
            </div>
            {/* Under construction */}
        </div>
    )

    // return (
    //     <div className="app_wrapper" >
    //         <div className="home_banner">
    //             <figure className="banner_img">
    //                 <img src={bannerimg} alt="bannerimg" />
    //                 <div className="banner_container">
    //                     <div className="home_search">
    //                         <button className="modal_srch_close">
    //                             <img src={close} alt="close" />
    //                         </button>
    //                         <form className="search_wrapr">
    //                             <ul>
    //                                 <li className="categ_box">
    //                                     <div className="text_field">
    //                                         <input type="text" placeholder="Who are you searching for?" />
    //                                         <div className="border_eff"></div>
    //                                         <span className="detect_icon"> </span>
    //                                         <span className="detect_icon_ltr">
    //                                             <img src={Searchicon} alt="search" />
    //                                         </span>
    //                                     </div>
    //                                 </li>
    //                                 <li className="loc_box">
    //                                     <div className="text_field">
    //                                         <div>
    //                                             <input type="text" placeholder="Where?" className="line-1" />
    //                                             <span className="detect_icon_ltr">
    //                                                 <img src={Location} alt="location" />
    //                                             </span>
    //                                             <span className="detect_icon" >
    //                                                 <img src={cross} alt="cross" />
    //                                             </span>
    //                                         </div>
    //                                     </div>
    //                                     {<div className="custom_autosuggestion location">
    //                                         <button className="location-btn">
    //                                             <span className="gps_icon">
    //                                                 <img src={icgps} />
    //                                             </span> Use my current location
    //                                          </button>
    //                                         <span className="sub_title ">Recent searches</span>
    //                                         <span className="blocked_note">
    //                                             You have blocked your location.
    //                                             To use this, change your location settings in browser.
    //                                           </span>
    //                                         <div className="flex_row recent_search auto_loc">
    //                                             <div className="flex_col_sm_4">
    //                                                 <div className="autosuggestion_icon card loc">
    //                                                     <span >Dummy location</span>
    //                                                     <span className="name">Noida, Uttar Pradesh, India</span>
    //                                                 </div>
    //                                             </div>

    //                                             <div className="flex_col_sm_4">
    //                                                 <div className="autosuggestion_icon card loc">
    //                                                     <span >Unnamed Road</span>
    //                                                     <span className="name"> Bichua, Madhya Pradesh 487001, India</span>
    //                                                 </div>
    //                                             </div>
    //                                             <div className="flex_col_sm_4">
    //                                                 <div className="autosuggestion_icon card loc">
    //                                                     <span >4 shantanu banlows rajpath club ni same</span>
    //                                                     <span className="name"> Narolgam, Ellisbridge, Ahmedabad, Gujarat 380006, India</span>
    //                                                 </div>
    //                                             </div>
    //                                         </div>
    //                                     </div>}
    //                                 </li>
    //                                 <li>
    //                                     <div className="custom_date_range">
    //                                         <div className="text_field">
    //                                             <span className="detect_icon_ltr calendar"></span>
    //                                             <input type="text" placeholder="When?" />
    //                                         </div>
    //                                     </div>
    //                                 </li>
    //                                 <div className="search_btn">
    //                                     <button type="button" className="fill_btn">
    //                                         <img src={search} alt="search" />
    //                                     </button>
    //                                 </div>
    //                             </ul>
    //                         </form>

    //                         {/* Category recent search */}
    //                         {/* <div className="custom_autosuggestion">
    //                             <span className="sub_title">Recent searches</span>

    //                             <div className="flex_row recent_search">
    //                                 <div className="flex_col_sm_4">
    //                                     <div className="autosuggestion_icon card history">
    //                                         <span>Campervans</span>
    //                                         <span className="name">Vehicles</span>
    //                                     </div>
    //                                 </div>

    //                                 <div className="flex_col_sm_4">
    //                                     <div className="autosuggestion_icon card history">
    //                                         <span>sparknotes1</span>
    //                                         <span className="name">sparknotes</span>
    //                                     </div>
    //                                 </div>

    //                                 <div className="flex_col_sm_4">
    //                                     <div className="autosuggestion_icon card history">
    //                                         <span>Cabins</span>
    //                                         <span className="name">Accomodation</span>
    //                                     </div>
    //                                 </div>
    //                             </div>


    //                             <ul className="drop_data">
    //                                 <li>
    //                                     <figure className="category">
    //                                         <img src={industrial} alt="category" />
    //                                     </figure>
    //                                     <div className="details">
    //                                         <span className="name">Machine Maintenance</span>
    //                                         <span className="prof">Plumber</span>
    //                                     </div>
    //                                 </li>
    //                                 <li>
    //                                     <figure className="category">
    //                                         <img src={industrial} alt="category" />
    //                                     </figure>
    //                                     <div className="details">
    //                                         <span className="name">Machine Maintenance</span>
    //                                         <span className="prof">Plumber</span>
    //                                     </div>
    //                                 </li>
    //                             </ul>
    //                         </div> */}
    //                         {/* <span className="sub_title">Categories</span>
    //                             <div className="searched_categories">
    //                                 <ul className="categories">
    //                                     <li>
    //                                         <a className="categ_card">
    //                                             <figure className="categ_img">
    //                                                 <img alt="categories" src={colorLogo} />
    //                                             </figure>
    //                                             <span className="categ_name"> Fishing </span>
    //                                         </a>
    //                                     </li>

    //                                     <li>
    //                                         <a className="categ_card">
    //                                             <figure className="categ_img">
    //                                                 <img alt="categories" src={colorLogo} />
    //                                             </figure>
    //                                             <span className="categ_name"> Fishing </span></a>
    //                                     </li>
    //                                     <li>
    //                                         <a className="categ_card">
    //                                             <figure className="categ_img">
    //                                                 <img alt="categories" src={colorLogo} />
    //                                             </figure>
    //                                             <span className="categ_name"> Fishing </span></a>
    //                                     </li>
    //                                     <li>
    //                                         <a className="categ_card">
    //                                             <figure className="categ_img">
    //                                                 <img alt="categories" src={colorLogo} />
    //                                             </figure>
    //                                             <span className="categ_name"> Fishing </span></a>
    //                                     </li>
    //                                     <li>
    //                                         <a className="categ_card">
    //                                             <figure className="categ_img">
    //                                                 <img alt="categories" src={colorLogo} />
    //                                             </figure>
    //                                             <span className="categ_name"> Fishing </span></a>
    //                                     </li>
    //                                     <li>
    //                                         <a className="categ_card">
    //                                             <figure className="categ_img">
    //                                                 <img alt="categories" src={colorLogo} />
    //                                             </figure>
    //                                             <span className="categ_name"> Fishing </span></a>
    //                                     </li>
    //                                 </ul>

    //                             </div> */}
    //                         {/* Category recent search close*/}

    //                         {/* Location recent search */}
    //                         {/* <div className="custom_autosuggestion location">
    //                             <button className="location-btn">
    //                                 <span className="gps_icon">
    //                                     <img src={icgps} />
    //                                 </span> Use my current location
    //                             </button>
    //                             <span className="sub_title ">Recent searches</span>
    //                              <span className="blocked_note">
    //                           You have blocked your location.
    //                           To use this, change your location settings in browser.
    //                           </span> 
    //                             <div className="flex_row recent_search auto_loc">
    //                                 <div className="flex_col_sm_4">
    //                                     <div className="autosuggestion_icon card loc">
    //                                         <span >Dummy location</span>
    //                                         <span className="name">Noida, Uttar Pradesh, India</span></div></div>

    //                                 <div className="flex_col_sm_4">
    //                                     <div className="autosuggestion_icon card loc">
    //                                         <span >Unnamed Road</span>
    //                                         <span className="name"> Bichua, Madhya Pradesh 487001, India</span>
    //                                     </div>
    //                                 </div>
    //                                 <div className="flex_col_sm_4">
    //                                     <div className="autosuggestion_icon card loc">
    //                                         <span >4 shantanu banlows rajpath club ni same</span>
    //                                         <span className="name"> Narolgam, Ellisbridge, Ahmedabad, Gujarat 380006, India</span>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         </div> */}
    //                         {/* Location recent search close*/}

    //                     </div>
    //                     <div className="text-center">
    //                         <h1 className="heading text_effect">Your local network</h1>
    //                         <p className="commn_para">Connect with Tradies in your area</p>
    //                         <a className="fill_btn view-btn">View More</a>
    //                     </div>
    //                 </div>
    //             </figure>
    //         </div>
    //         {/* Banner close */}


    //         {/* Categories */}
    //         <div className="home_categories">
    //             <div className="custom_container">
    //                 <Carousel className="item_slider" responsive={categorieshome} autoPlay={false} arrows={false} showDots={true}>
    //                     <div>
    //                         <ul className="categories">
    //                             <li>
    //                                 <a href="javascript:void(0)" className="categ_card">
    //                                     <figure className="categ_img circle">
    //                                         <img src={colorLogo} alt="icon" />
    //                                     </figure>
    //                                     <span className="categ_name">Electrician</span>
    //                                 </a>
    //                             </li>
    //                             <li>
    //                                 <a href="javascript:void(0)" className="categ_card">
    //                                     <figure className="categ_img circle">
    //                                         <img src={colorLogo} alt="icon" />
    //                                     </figure>
    //                                     <span className="categ_name">Electrician </span>
    //                                 </a>
    //                             </li>
    //                             <li>
    //                                 <a href="javascript:void(0)" className="categ_card">
    //                                     <figure className="categ_img circle">
    //                                         <img src={colorLogo} alt="icon" />
    //                                     </figure>
    //                                     <span className="categ_name">Electrician</span>
    //                                 </a>
    //                             </li>
    //                             <li>
    //                                 <a href="javascript:void(0)" className="categ_card">
    //                                     <figure className="categ_img circle">
    //                                         <img src={colorLogo} alt="icon" />
    //                                     </figure>
    //                                     <span className="categ_name">Electrician </span>
    //                                 </a>
    //                             </li>
    //                             <li>
    //                                 <a href="javascript:void(0)" className="categ_card">
    //                                     <figure className="categ_img circle">
    //                                         <img src={colorLogo} alt="icon" />
    //                                     </figure>
    //                                     <span className="categ_name">Electrician</span>
    //                                 </a>
    //                             </li>
    //                             <li>
    //                                 <a href="javascript:void(0)" className="categ_card">
    //                                     <figure className="categ_img circle">
    //                                         <img src={colorLogo} alt="icon" />
    //                                     </figure>
    //                                     <span className="categ_name">Electrician </span>
    //                                 </a>
    //                             </li>
    //                             <li>
    //                                 <a href="javascript:void(0)" className="categ_card">
    //                                     <figure className="categ_img circle">
    //                                         <img src={colorLogo} alt="icon" />
    //                                     </figure>
    //                                     <span className="categ_name">Electrician </span>
    //                                 </a>
    //                             </li>
    //                         </ul>
    //                     </div>

    //                     <div>
    //                         <ul className="categories">
    //                             <li>
    //                                 <a href="javascript:void(0)" className="categ_card">
    //                                     <figure className="categ_img circle">
    //                                         <img src={colorLogo} alt="icon" />
    //                                     </figure>
    //                                     <span className="categ_name">Electrician</span>
    //                                 </a>
    //                             </li>
    //                             <li>
    //                                 <a href="javascript:void(0)" className="categ_card">
    //                                     <figure className="categ_img circle">
    //                                         <img src={colorLogo} alt="icon" />
    //                                     </figure>
    //                                     <span className="categ_name">Electrician </span>
    //                                 </a>
    //                             </li>
    //                             <li>
    //                                 <a href="javascript:void(0)" className="categ_card">
    //                                     <figure className="categ_img circle">
    //                                         <img src={colorLogo} alt="icon" />
    //                                     </figure>
    //                                     <span className="categ_name">Electrician</span>
    //                                 </a>
    //                             </li>
    //                             <li>
    //                                 <a href="javascript:void(0)" className="categ_card">
    //                                     <figure className="categ_img circle">
    //                                         <img src={colorLogo} alt="icon" />
    //                                     </figure>
    //                                     <span className="categ_name">Electrician </span>
    //                                 </a>
    //                             </li>
    //                             <li>
    //                                 <a href="javascript:void(0)" className="categ_card">
    //                                     <figure className="categ_img circle">
    //                                         <img src={colorLogo} alt="icon" />
    //                                     </figure>
    //                                     <span className="categ_name">Electrician</span>
    //                                 </a>
    //                             </li>
    //                             <li>
    //                                 <a href="javascript:void(0)" className="categ_card">
    //                                     <figure className="categ_img circle">
    //                                         <img src={colorLogo} alt="icon" />
    //                                     </figure>
    //                                     <span className="categ_name">Electrician </span>
    //                                 </a>
    //                             </li>
    //                             <li>
    //                                 <a href="javascript:void(0)" className="categ_card">
    //                                     <figure className="categ_img circle">
    //                                         <img src={colorLogo} alt="icon" />
    //                                     </figure>
    //                                     <span className="categ_name">Electrician </span>
    //                                 </a>
    //                             </li>
    //                         </ul>
    //                     </div>


    //                 </Carousel>
    //             </div>
    //         </div>
    //         {/* Categories close*/}


    //         {/* Job types */}
    //         <div className="home_job_categories">
    //             <div className="custom_container">
    //                 <Carousel className="item_slider" responsive={categoriesjob} autoPlay={true} arrows={false} showDots={true} infinite={false}>
    //                     <div>
    //                         <ul className="job_categories">
    //                             <li className="draw active">
    //                                 <figure className="type_icon">
    //                                     <img src={residential} alt="icon" />
    //                                 </figure>
    //                                 <span className="name">Residential</span>
    //                             </li>
    //                             <li className="draw">
    //                                 <figure className="type_icon">
    //                                     <img src={commercial} alt="icon" />
    //                                 </figure>
    //                                 <span className="name">Commercial</span>
    //                             </li>
    //                             <li className="draw">
    //                                 <figure className="type_icon">
    //                                     <img src={industrial} alt="icon" />
    //                                 </figure>
    //                                 <span className="name">Industrial</span>
    //                             </li>
    //                             <li className="draw">
    //                                 <figure className="type_icon">
    //                                     <img src={hourlyRate} alt="icon" />
    //                                 </figure>
    //                                 <span className="name">Hourly Rate</span>
    //                             </li>
    //                             <li className="draw">
    //                                 <figure className="type_icon">
    //                                     <img src={contracted} alt="icon" />
    //                                 </figure>
    //                                 <span className="name">Contracted</span>
    //                             </li>
    //                         </ul>
    //                     </div>



    //                 </Carousel>
    //             </div>
    //         </div>
    //         {/* Job types close*/}


    //         {/* Saved jobs */}
    //         <div className="section_wrapper bg_gray">
    //             <div className="custom_container">
    //                 <span className="title">Saved jobs</span>
    //                 <div className="flex_row tradies_row">
    //                     <div className="flex_col_sm_6">
    //                         <div className="tradie_card">
    //                             <a href="javascript:void(0)" className="more_detail circle"></a>
    //                             <div className="user_wrap">
    //                                 <figure className="u_img">
    //                                     <img src={dummy} alt="traide-img" />
    //                                 </figure>
    //                                 <div className="details">
    //                                     <span className="name">Wire up circuit box</span>
    //                                 </div>
    //                             </div>
    //                             <div className="job_info">
    //                                 <ul>
    //                                     <li className="icon clock">32 minutes ago</li>
    //                                     <li className="icon dollar">$250 p/h</li>
    //                                     <li className="icon location">Melbourne CBD</li>
    //                                     <li className="icon calendar">4 days </li>
    //                                 </ul>
    //                             </div>
    //                             <p className="commn_para">Sparky wanted for a quick job to hook up two floodlights on the exterior of an apartment building to the main electrical grid. Current sparky away due to illness. Sparky wanted for a quick job to hook up two floodlights...</p>
    //                             <ul className="count_wrap">
    //                                 <li className="icon view">127</li>
    //                                 <li className="icon comment">32</li>
    //                             </ul>
    //                         </div>
    //                     </div>
    //                     <div className="flex_col_sm_6">
    //                         <div className="tradie_card">
    //                             <a href="javascript:void(0)" className="more_detail circle"></a>
    //                             <div className="user_wrap">
    //                                 <figure className="u_img">
    //                                     <img src={dummy} alt="traide-img" />
    //                                 </figure>
    //                                 <div className="details">
    //                                     <span className="name">Wire up circuit box</span>
    //                                 </div>
    //                             </div>
    //                             <div className="job_info">
    //                                 <ul>
    //                                     <li className="icon clock">32 minutes ago</li>
    //                                     <li className="icon dollar">$250 p/h</li>
    //                                     <li className="icon location">Melbourne CBD</li>
    //                                     <li className="icon calendar">4 days </li>
    //                                 </ul>
    //                             </div>
    //                             <p className="commn_para">Sparky wanted for a quick job to hook up two floodlights on the exterior of an apartment building to the main electrical grid. Current sparky away due to illness. Sparky wanted for a quick job to hook up two floodlights...</p>
    //                             <ul className="count_wrap">
    //                                 <li className="icon view">127</li>
    //                                 <li className="icon comment">32</li>
    //                             </ul>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <button className="fill_grey_btn full_btn m-tb40 view_more">View all</button>
    //             </div>
    //         </div>
    //         {/* Saved jobs close*/}


    //         {/* Saved Tradies */}
    //         <div className="section_wrapper bg_gray">
    //             <div className="custom_container">
    //                 <span className="title">Saved tradies</span>
    //                 <div className="flex_row tradies_row">
    //                     <div className="flex_col_sm_4">
    //                         <div className="tradie_card">
    //                             <a href="javascript:void(0)" className="more_detail circle"></a>
    //                             <div className="user_wrap">
    //                                 <figure className="u_img">
    //                                     <img src={dummy} alt="traide-img" />
    //                                 </figure>
    //                                 <div className="details">
    //                                     <span className="name">John Oldman</span>
    //                                     <span className="rating">4.9, 36 reviews </span>
    //                                 </div>
    //                             </div>
    //                             <div className="tags_wrap">
    //                                 <ul>
    //                                     <li className="main">
    //                                         <img src={Location} alt="icon" />Plumber
    //                                 </li>
    //                                     <li className="main">
    //                                         <img src={Location} alt="icon" />Electrician
    //                                 </li>
    //                                     <li>Electrical Instrumentation</li>
    //                                     <li>Security and Fire Alarm Installation</li>
    //                                     <li>Electrical Instrumentation</li>
    //                                     <li>Security and Fire Alarm Installation</li>
    //                                     <li>More</li>
    //                                 </ul>
    //                             </div>
    //                         </div>
    //                     </div>

    //                     <div className="flex_col_sm_4">
    //                         <div className="tradie_card">
    //                             <a href="javascript:void(0)" className="more_detail circle"></a>
    //                             <div className="user_wrap">
    //                                 <figure className="u_img">
    //                                     <img src={dummy} alt="traide-img" />
    //                                 </figure>
    //                                 <div className="details">
    //                                     <span className="name">John Oldman</span>
    //                                     <span className="rating">4.9, 36 reviews </span>
    //                                 </div>
    //                             </div>
    //                             <div className="tags_wrap">
    //                                 <ul>
    //                                     <li className="main">
    //                                         <img src={Location} alt="icon" />Plumber
    //                                 </li>
    //                                     <li className="main">
    //                                         <img src={Location} alt="icon" />Electrician
    //                                 </li>
    //                                     <li>Electrical Instrumentation</li>
    //                                     <li>Security and Fire Alarm Installation</li>
    //                                     <li>Electrical Instrumentation</li>
    //                                     <li>Security and Fire Alarm Installation</li>
    //                                     <li>More</li>
    //                                 </ul>
    //                             </div>
    //                         </div>
    //                     </div>

    //                     <div className="flex_col_sm_4">
    //                         <div className="tradie_card">
    //                             <a href="javascript:void(0)" className="more_detail circle"></a>
    //                             <div className="user_wrap">
    //                                 <figure className="u_img">
    //                                     <img src={dummy} alt="traide-img" />
    //                                 </figure>
    //                                 <div className="details">
    //                                     <span className="name">John Oldman</span>
    //                                     <span className="rating">4.9, 36 reviews </span>
    //                                 </div>
    //                             </div>
    //                             <div className="tags_wrap">
    //                                 <ul>
    //                                     <li className="main">
    //                                         <img src={Location} alt="icon" />Plumber
    //                                 </li>
    //                                     <li className="main">
    //                                         <img src={Location} alt="icon" />Electrician
    //                                 </li>
    //                                     <li>Electrical Instrumentation</li>
    //                                     <li>Security and Fire Alarm Installation</li>
    //                                     <li>Electrical Instrumentation</li>
    //                                     <li>Security and Fire Alarm Installation</li>
    //                                     <li>More</li>
    //                                 </ul>
    //                             </div>
    //                         </div>
    //                     </div>


    //                 </div>
    //                 <button className="fill_grey_btn full_btn m-tb40 view_more">View all</button>
    //             </div>
    //         </div>
    //         {/* Saved Tradies close*/}


    //         {/* Popular Tradies */}
    //         <div className="section_wrapper">
    //             <div className="custom_container">
    //                 <span className="title">Popular tradies</span>
    //                 <ul className="popular_tradies">
    //                     <li>
    //                         <figure className="tradies_img">
    //                             <img src={dummy} alt="tradies-img" />
    //                         </figure>
    //                         <span className="name">John Oldman</span>
    //                         <span className="post">Electrician</span>
    //                     </li>
    //                     <li>
    //                         <figure className="tradies_img">
    //                             <img src={dummy} alt="tradies-img" />
    //                         </figure>
    //                         <span className="name">John Oldman</span>
    //                         <span className="post">Electrician</span>
    //                     </li>
    //                     <li>
    //                         <figure className="tradies_img">
    //                             <img src={dummy} alt="tradies-img" />
    //                         </figure>
    //                         <span className="name">John Oldman</span>
    //                         <span className="post">Electrician</span>
    //                     </li>
    //                     <li>
    //                         <figure className="tradies_img">
    //                             <img src={dummy} alt="tradies-img" />
    //                         </figure>
    //                         <span className="name">John Oldman</span>
    //                         <span className="post">Electrician</span>
    //                     </li>
    //                     <li>
    //                         <figure className="tradies_img">
    //                             <img src={dummy} alt="tradies-img" />
    //                         </figure>
    //                         <span className="name">John Oldman</span>
    //                         <span className="post">Electrician</span>
    //                     </li>
    //                     <li>
    //                         <figure className="tradies_img">
    //                             <img src={dummy} alt="tradies-img" />
    //                         </figure>
    //                         <span className="name">John Oldman</span>
    //                         <span className="post">Electrician</span>
    //                     </li>
    //                 </ul>
    //                 <button className="fill_grey_btn full_btn m-tb40 view_more">View all</button>
    //             </div>
    //         </div>
    //         {/* Popular Tradies close*/}


    //         {/* Reccomended tradies */}
    //         <div className="section_wrapper bg_gray">
    //             <div className="custom_container">
    //                 <span className="title">Reccomended tradies</span>
    //                 <div className="flex_row tradies_row">
    //                     <div className="flex_col_sm_4">
    //                         <div className="tradie_card">
    //                             <a href="javascript:void(0)" className="more_detail circle"></a>
    //                             <div className="user_wrap">
    //                                 <figure className="u_img">
    //                                     <img src={dummy} alt="traide-img" />
    //                                 </figure>
    //                                 <div className="details">
    //                                     <span className="name">John Oldman</span>
    //                                     <span className="rating">4.9, 36 reviews </span>
    //                                 </div>
    //                             </div>
    //                             <div className="tags_wrap">
    //                                 <ul>
    //                                     <li className="main">
    //                                         <img src={Location} alt="icon" />Plumber
    //                                 </li>
    //                                     <li className="main">
    //                                         <img src={Location} alt="icon" />Electrician
    //                                 </li>
    //                                     <li>Electrical Instrumentation</li>
    //                                     <li>Security and Fire Alarm Installation</li>
    //                                     <li>Electrical Instrumentation</li>
    //                                     <li>Security and Fire Alarm Installation</li>
    //                                     <li>More</li>
    //                                 </ul>
    //                             </div>
    //                         </div>
    //                     </div>

    //                     <div className="flex_col_sm_4">
    //                         <div className="tradie_card">
    //                             <a href="javascript:void(0)" className="more_detail circle"></a>
    //                             <div className="user_wrap">
    //                                 <figure className="u_img">
    //                                     <img src={dummy} alt="traide-img" />
    //                                 </figure>
    //                                 <div className="details">
    //                                     <span className="name">John Oldman</span>
    //                                     <span className="rating">4.9, 36 reviews </span>
    //                                 </div>
    //                             </div>
    //                             <div className="tags_wrap">
    //                                 <ul>
    //                                     <li className="main">
    //                                         <img src={Location} alt="icon" />Plumber
    //                                 </li>
    //                                     <li className="main">
    //                                         <img src={Location} alt="icon" />Electrician
    //                                 </li>
    //                                     <li>Electrical Instrumentation</li>
    //                                     <li>Security and Fire Alarm Installation</li>
    //                                     <li>Electrical Instrumentation</li>
    //                                     <li>Security and Fire Alarm Installation</li>
    //                                     <li>More</li>
    //                                 </ul>
    //                             </div>
    //                         </div>
    //                     </div>

    //                     <div className="flex_col_sm_4">
    //                         <div className="tradie_card">
    //                             <a href="javascript:void(0)" className="more_detail circle"></a>
    //                             <div className="user_wrap">
    //                                 <figure className="u_img">
    //                                     <img src={dummy} alt="traide-img" />
    //                                 </figure>
    //                                 <div className="details">
    //                                     <span className="name">John Oldman</span>
    //                                     <span className="rating">4.9, 36 reviews </span>
    //                                 </div>
    //                             </div>
    //                             <div className="tags_wrap">
    //                                 <ul>
    //                                     <li className="main">
    //                                         <img src={Location} alt="icon" />Plumber
    //                                 </li>
    //                                     <li className="main">
    //                                         <img src={Location} alt="icon" />Electrician
    //                                 </li>
    //                                     <li>Electrical Instrumentation</li>
    //                                     <li>Security and Fire Alarm Installation</li>
    //                                     <li>Electrical Instrumentation</li>
    //                                     <li>Security and Fire Alarm Installation</li>
    //                                     <li>More</li>
    //                                 </ul>
    //                             </div>
    //                         </div>
    //                     </div>


    //                 </div>
    //                 <button className="fill_grey_btn full_btn m-tb40 view_more">View all</button>
    //             </div>
    //         </div>
    //         {/* Reccomended tradies close*/}
    //     </div>
    // )
}

export default BuilderHome;
