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
import referal from '../../assets/images/ic-referal.png';
import terms from '../../assets/images/ic-terms.png';
import support from '../../assets/images/ic-support.png';
import tutorials from '../../assets/images/ic-tutorial.png';

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
                            <div className="notification_bell">
                                <figure className="bell">
                                    <span className="badge">4 </span>
                                    <img src={bell} alt="notify" />
                                </figure>
                            </div>
                            <div className="user_profile">
                                {storageService.getItem("jwtToken") ?
                                    (<figure aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                        <img src={dummy} alt="profile-img" />
                                    </figure>) :
                                    (<li> <Link to="/login" className="active">Log in</Link></li>)}
                                <Menu className="sub_menu"
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleClose}>
                                        <span className="setting_icon">
                                            <img src={profile} />
                                            My Profile
                                        </span>
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        <span className="setting_icon" onClick={logoutHandler}>Logout</span>
                                    </MenuItem>
                                </Menu>


                                {/* <div className="sub_menu">
                                    <span className="setting_icon">
                                        <img src={profile} />
                          My Profile
                          </span>
                                    <span className="setting_icon">
                                        <img src={referal} />
                          Referral Program
                          </span>
                                    <span className="setting_icon">
                                        <img src={terms} />
                          Terms & Conditions
                          </span>
                                    <span className="setting_icon">
                                        <img src={support} />
                          Support Chat
                          </span>
                                    <span className="setting_icon">
                                        <img src={tutorials} />
                          Tutorial
                          </span>

                                    <span className="setting_icon">Logout</span>

                                </div> */}
                            </div>
                        </div>


                        {/* <li>
                            <a className="active">Log in</a>
                        </li> */}
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Home
