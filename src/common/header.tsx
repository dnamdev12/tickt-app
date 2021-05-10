import { useState, useEffect } from 'react';
import { useLocation, withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import storageService from '../utils//storageService';
import AuthModal from './auth/authModal';

import colorLogo from '../assets/images/ic-logo-yellow.png';
import menu from '../assets/images/menu-line-white.svg';
import bell from '../assets/images/ic-notification.png';
import dummy from '../assets/images/u_placeholder.jpg';
import profile from '../assets/images/ic-profile.png';

const DISABLE_HEADER = ['/signup', '/login', '/reset-password', '/404'];

const Header = (props: any) => {
    const [userType, setUserType] = useState(null)
    const [anchorEl, setAnchorEl] = useState(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showHeader, setShowHeader] = useState<boolean>(false);

    // const USER_TYPE = storageService.getItem('userType');

    let location = useLocation();
    let history = useHistory();

    useEffect(() => {
        if (DISABLE_HEADER.includes(location.pathname)) {
            setShowHeader(false)
        } else {
            setShowHeader(true)
        }
        setUserType(storageService.getItem('userType'))
    }, [location.pathname, storageService.getItem('userType')])

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logoutHandler = () => {
        storageService.removeItem("jwtToken")
        storageService.removeItem("guestToken")
        storageService.removeItem("userType")
        history.push('/login')
    }

    const postClicked = () => {
        history.push('/post-new-job')
    }

    return (
        <>
            {showHeader && <header id="header">
                <div className="custom_container">
                    <div className="flex_headrow">
                        <div className="brand_wrap">
                            <figure>
                                <img
                                    onClick={() => { props.history.push('/') }}
                                    src={colorLogo}
                                    alt="logo-white" />
                            </figure>
                        </div>
                        <ul className="center_nav">
                            <li><a className="active">Discover</a></li>
                            <li><a >Jobs</a></li>
                            {userType === 2 && <li><a onClick={postClicked}>Post</a></li>}
                            <li><a >Chat</a></li>
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
                            {!storageService.getItem("jwtToken") && <li> <a className="active" onClick={() => setShowModal(!showModal)}>Log in</a></li>}
                            <AuthModal showModal={showModal} setShowModal={setShowModal} history={props.history} firstTimePopup>{props.children}</AuthModal>
                        </ul>
                    </div>
                </div>
            </header>}
        </>
    )
}

export default withRouter(Header);
