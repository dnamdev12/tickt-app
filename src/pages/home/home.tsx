import React from 'react';
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import storageService from '../../utils/storageService';

import colorLogo from '../../assets/images/ic-logo-yellow.png';
import menu from '../../assets/images/menu-line-white.svg';
import bell from '../../assets/images/ic-notification.png';
import dummy from '../../assets/images/u_placeholder.jpg';
import profile from '../../assets/images/ic-profile.png';
import uc from '../../assets/images/uc.png';
import Searchicon from "../../assets/images/main-search.png";
import search from "../../assets/images/ic-search.png";
import Location from "../../assets/images/ic-location.png";
import bannerimg from '../../assets/images/home-banner.png'


const Home = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logoutHandler = () => {
        storageService.removeItem("jwtToken")
    }

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
                                <a className="active">Discover</a>
                            </li>
                            <li>
                                <a >Jobs</a>
                            </li>
                            <li>
                                <a >Post</a>
                            </li>
                            <li>
                                <a >Chat</a>
                            </li>
                        </ul>


                        <ul className="side_nav">
                            <li className="mob_nav">
                                <img src={menu} alt="menu" />
                            </li>
                            <div className="profile_notification">
                                {storageService.getItem("jwtToken") && <div className="notification_bell">
                                    <figure className="bell">
                                        <span className="badge">4 </span>
                                        <img src={bell} alt="notify" />
                                    </figure>
                                </div>}
                                <div className="user_profile">
                                    {storageService.getItem("jwtToken") &&
                                        <figure aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                            <img src={dummy} alt="profile-img" />
                                        </figure>}
                                    <Menu className="sub_menu"
                                        id="simple-menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        <span className="sub_title">John Oldman</span>
                                        <MenuItem onClick={handleClose}>
                                            <span className="setting_icon">
                                                <img src={profile} />
                                            My Profile
                                        </span>
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <span className="setting_icon logout" onClick={logoutHandler}>Logout</span>
                                        </MenuItem>
                                    </Menu>
                                </div>
                            </div>
                            {!storageService.getItem("jwtToken") && <li> <Link to="/login" className="active">Log in</Link></li>}
                        </ul>
                    </div>

                </div>
            </header>
            {/* Header close */}


            {/* Under construction */}
            {/* <div className="custom_container">
                <div className="under_construction_wrap">
                    <figure className="constrction_img">
                        <img src={uc} alt="coming soon" />
                    </figure>
                    <h2>This Page is under construction. Please come back later.</h2>
                </div>
            </div> */}
            {/* Under construction */}


            {/* Banner */}
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
                                            <input type="text" placeholder="Who are you searching for?" />
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
                        </div>
                        <div className="text-center">
                            <h1 className="heading text_effect">Your local network</h1>
                            <p className="commn_para">Connect with Tradies in your area</p>
                            <a className="fill_btn view-btn">View More</a>
                        </div>
                    </div>
                </figure>
            </div>
            {/* Banner close */}


            {/* Categories */}
            <div className="section_wrapper">
                <div className="custom_container">
                    <ul className="categories">
                        <li>
                            <a href="javascript:void(0)" className="categ_card">
                                <figure className="categ_img">
                                    <img src={colorLogo} alt="icon" />
                                </figure>
                                <span className="categ_name">Electrician</span>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0)" className="categ_card">
                                <figure className="categ_img">
                                    <img src={colorLogo} alt="icon" />
                                </figure>
                                <span className="categ_name">Electrician </span>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0)" className="categ_card">
                                <figure className="categ_img">
                                    <img src={colorLogo} alt="icon" />
                                </figure>
                                <span className="categ_name">Electrician</span>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0)" className="categ_card">
                                <figure className="categ_img">
                                    <img src={colorLogo} alt="icon" />
                                </figure>
                                <span className="categ_name">Electrician </span>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0)" className="categ_card">
                                <figure className="categ_img">
                                    <img src={colorLogo} alt="icon" />
                                </figure>
                                <span className="categ_name">Electrician</span>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0)" className="categ_card">
                                <figure className="categ_img">
                                    <img src={colorLogo} alt="icon" />
                                </figure>
                                <span className="categ_name">Electrician </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            {/* Categories close*/}


            {/* Saved Tradies */}
            <div className="section_wrapper bg_gray">
                <div className="custom_container">
                    <span className="title">Saved tradies</span>
                    <div className="flex_row">
                        <div className="flex_col_sm_4">
                            <div className="tradie_card">
                                <a href="javascript:void(0)" className="more_detail"></a>
                                <div className="user_wrap">
                                    <figure className="u_img">
                                        <img src={dummy} alt="traide-img" />
                                    </figure>
                                    <div className="details">
                                        <span className="name">John Oldman</span>
                                        <span className="rating">4.9, 36 reviews </span>
                                    </div>
                                </div>
                                <div className="tags_wrap">
                                    <ul>
                                        <li className="main">
                                            <img src={Location} alt="icon" />Plumber
                                    </li>
                                        <li className="main">
                                            <img src={Location} alt="icon" />Electrician
                                    </li>
                                        <li>Electrical Instrumentation</li>
                                        <li>Security and Fire Alarm Installation</li>
                                        <li>Electrical Instrumentation</li>
                                        <li>Security and Fire Alarm Installation</li>
                                        <li>More</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="flex_col_sm_4">
                            <div className="tradie_card">
                                <a href="javascript:void(0)" className="more_detail"></a>
                                <div className="user_wrap">
                                    <figure className="u_img">
                                        <img src={dummy} alt="traide-img" />
                                    </figure>
                                    <div className="details">
                                        <span className="name">John Oldman</span>
                                        <span className="rating">4.9, 36 reviews </span>
                                    </div>
                                </div>
                                <div className="tags_wrap">
                                    <ul>
                                        <li className="main">
                                            <img src={Location} alt="icon" />Plumber
                                    </li>
                                        <li className="main">
                                            <img src={Location} alt="icon" />Electrician
                                    </li>
                                        <li>Electrical Instrumentation</li>
                                        <li>Security and Fire Alarm Installation</li>
                                        <li>Electrical Instrumentation</li>
                                        <li>Security and Fire Alarm Installation</li>
                                        <li>More</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="flex_col_sm_4">
                            <div className="tradie_card">
                                <a href="javascript:void(0)" className="more_detail"></a>
                                <div className="user_wrap">
                                    <figure className="u_img">
                                        <img src={dummy} alt="traide-img" />
                                    </figure>
                                    <div className="details">
                                        <span className="name">John Oldman</span>
                                        <span className="rating">4.9, 36 reviews </span>
                                    </div>
                                </div>
                                <div className="tags_wrap">
                                    <ul>
                                        <li className="main">
                                            <img src={Location} alt="icon" />Plumber
                                    </li>
                                        <li className="main">
                                            <img src={Location} alt="icon" />Electrician
                                    </li>
                                        <li>Electrical Instrumentation</li>
                                        <li>Security and Fire Alarm Installation</li>
                                        <li>Electrical Instrumentation</li>
                                        <li>Security and Fire Alarm Installation</li>
                                        <li>More</li>
                                    </ul>
                                </div>
                            </div>
                        </div>


                    </div>
                    <button className="fill_grey_btn full_btn">View all</button>
                </div>
            </div>
            {/* Saved Tradies close*/}


            {/* Popular Tradies */}
            <div className="section_wrapper">
                <div className="custom_container">
                    <span className="title">Popular tradies</span>
                    <ul className="popular_tradies">
                        <li>
                            <figure className="tradies_img">
                                <img src={dummy} alt="tradies-img" />
                            </figure>
                            <span className="name">John Oldman</span>
                            <span className="post">Electrician</span>
                        </li>
                        <li>
                            <figure className="tradies_img">
                                <img src={dummy} alt="tradies-img" />
                            </figure>
                            <span className="name">John Oldman</span>
                            <span className="post">Electrician</span>
                        </li>
                        <li>
                            <figure className="tradies_img">
                                <img src={dummy} alt="tradies-img" />
                            </figure>
                            <span className="name">John Oldman</span>
                            <span className="post">Electrician</span>
                        </li>
                        <li>
                            <figure className="tradies_img">
                                <img src={dummy} alt="tradies-img" />
                            </figure>
                            <span className="name">John Oldman</span>
                            <span className="post">Electrician</span>
                        </li>
                        <li>
                            <figure className="tradies_img">
                                <img src={dummy} alt="tradies-img" />
                            </figure>
                            <span className="name">John Oldman</span>
                            <span className="post">Electrician</span>
                        </li>
                        <li>
                            <figure className="tradies_img">
                                <img src={dummy} alt="tradies-img" />
                            </figure>
                            <span className="name">John Oldman</span>
                            <span className="post">Electrician</span>
                        </li>
                    </ul>
                    <button className="fill_grey_btn full_btn">View all</button>
                </div>
            </div>
            {/* Popular Tradies close*/}


            {/* Reccomended tradies */}
            <div className="section_wrapper bg_gray">
                <div className="custom_container">
                    <span className="title">Reccomended tradies</span>
                    <div className="flex_row">
                        <div className="flex_col_sm_4">
                            <div className="tradie_card">
                                <a href="javascript:void(0)" className="more_detail"></a>
                                <div className="user_wrap">
                                    <figure className="u_img">
                                        <img src={dummy} alt="traide-img" />
                                    </figure>
                                    <div className="details">
                                        <span className="name">John Oldman</span>
                                        <span className="rating">4.9, 36 reviews </span>
                                    </div>
                                </div>
                                <div className="tags_wrap">
                                    <ul>
                                        <li className="main">
                                            <img src={Location} alt="icon" />Plumber
                                    </li>
                                        <li className="main">
                                            <img src={Location} alt="icon" />Electrician
                                    </li>
                                        <li>Electrical Instrumentation</li>
                                        <li>Security and Fire Alarm Installation</li>
                                        <li>Electrical Instrumentation</li>
                                        <li>Security and Fire Alarm Installation</li>
                                        <li>More</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="flex_col_sm_4">
                            <div className="tradie_card">
                                <a href="javascript:void(0)" className="more_detail"></a>
                                <div className="user_wrap">
                                    <figure className="u_img">
                                        <img src={dummy} alt="traide-img" />
                                    </figure>
                                    <div className="details">
                                        <span className="name">John Oldman</span>
                                        <span className="rating">4.9, 36 reviews </span>
                                    </div>
                                </div>
                                <div className="tags_wrap">
                                    <ul>
                                        <li className="main">
                                            <img src={Location} alt="icon" />Plumber
                                    </li>
                                        <li className="main">
                                            <img src={Location} alt="icon" />Electrician
                                    </li>
                                        <li>Electrical Instrumentation</li>
                                        <li>Security and Fire Alarm Installation</li>
                                        <li>Electrical Instrumentation</li>
                                        <li>Security and Fire Alarm Installation</li>
                                        <li>More</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="flex_col_sm_4">
                            <div className="tradie_card">
                                <a href="javascript:void(0)" className="more_detail"></a>
                                <div className="user_wrap">
                                    <figure className="u_img">
                                        <img src={dummy} alt="traide-img" />
                                    </figure>
                                    <div className="details">
                                        <span className="name">John Oldman</span>
                                        <span className="rating">4.9, 36 reviews </span>
                                    </div>
                                </div>
                                <div className="tags_wrap">
                                    <ul>
                                        <li className="main">
                                            <img src={Location} alt="icon" />Plumber
                                    </li>
                                        <li className="main">
                                            <img src={Location} alt="icon" />Electrician
                                    </li>
                                        <li>Electrical Instrumentation</li>
                                        <li>Security and Fire Alarm Installation</li>
                                        <li>Electrical Instrumentation</li>
                                        <li>Security and Fire Alarm Installation</li>
                                        <li>More</li>
                                    </ul>
                                </div>
                            </div>
                        </div>


                    </div>
                    <button className="fill_grey_btn full_btn">View all</button>
                </div>
            </div>
            {/* Reccomended tradies close*/}


        </div>
    )
}

export default Home
