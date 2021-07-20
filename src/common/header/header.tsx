/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react';
import { useLocation, withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import storageService from '../../utils/storageService';
import AuthModal from '../auth/authModal';

import colorLogo from '../../assets/images/ic-logo-yellow.png';
import menu from '../../assets/images/menu-line-white.svg';
import bell from '../../assets/images/ic-notification.png';
import dummy from '../../assets/images/u_placeholder.jpg';
import profile from '../../assets/images/ic-profile.png';
import revenue from '../../assets/images/ic-revenue.png';
import guide from '../../assets/images/ic-tutorial.png';
import savedJobs from '../../assets/images/ic-job.png';


import { useDispatch } from 'react-redux'
import { setShowNotification } from '../../redux/common/actions';
import { auth, messaging } from '../../services/firebase';

const DISABLE_HEADER = [
    '/signup',
    '/login',
    '/reset-password',
    '/404',
    '/email-updated-successfully',
    '/change-password-success'
];

const Header = (props: any) => {
    let type = storageService.getItem('userType');

    const [userType, setUserType] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElNotif, setAnchorElNotif] = useState(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showHeader, setShowHeader] = useState<boolean>(false);
    const [toggleMenu, setToggleMenu] = useState(false);
    const [activeLink, setActiveLink] = useState('discover');
    const [latestNotifData, setLatestNotifData] = useState<any>('');
    const [notificationData, setNotificationData] = useState<any>('');
    const [notificationPgNo, setNotificationPgNo] = useState<number>(1);
    const [notificationCount, setNotificationCount] = useState<number | null>(null);
    console.log('latestNotifData: ', latestNotifData);

    const dispatch = useDispatch();

    let { pathname } = useLocation();
    let history = useHistory();

    const onMessageListner = () => {
        messaging.onMessage((payload: any) => {
            console.log('firebase notification received inside header : ', payload);

            // var notifications = new Notification(title, options);
            // notifications.onclick = function (event) {
            //     event.preventDefault(); // prevent the browser from focusing the Notification's tab
            //     window.open('http://localhost:3000/active-jobs', '_self');
            // }

            // custom notification
            setShowNotification(true, payload);
            setLatestNotifData(payload);
        })
    }

    useEffect(() => {
        props.getNotificationList(notificationPgNo);
        onMessageListner();
        setActiveLink('discover');
    }, []);

    useEffect(() => {
        if (props.notificationList) {
            setNotificationData(props.notificationList?.list);
            setNotificationCount(props.notificationList?.count);
        }
    }, [props.notificationList]);

    useEffect(() => {
        if (pathname === '/') {
            setActiveLink('discover');
        }

        if ([
            '/jobs',
            '/active-jobs',
            '/applied-jobs',
            '/past-jobs',
            '/new-jobs',
            '/approved-milestones',
            '/mark-milestone',
            '/review-builder'
        ].includes(pathname)) {
            setActiveLink('jobs');
        }

        if (pathname === '/post-new-job') {
            setActiveLink('post');
        }

        if (pathname === '/chat') {
            setActiveLink('chat');
        }

    }, [pathname]);

    useEffect(() => {
        if (type) {
            if (type === 1) {
                props.callTradieProfileData();
            }
            if (type === 2) {
                props.getProfileBuilder();
            }
        }

        if (DISABLE_HEADER.includes(pathname)) {
            setShowHeader(false)
        } else {
            setShowHeader(true)
        }
        setUserType(storageService.getItem('userType'))
    }, [pathname, storageService.getItem('userType')])

    const handleClick = (event: any, type: string) => {
        if (type === 'notification') {
            setAnchorElNotif(event.currentTarget);
        } else {
            setAnchorEl(event.currentTarget);
        }
    };

    const handleClose = (type: string) => {
        if (type === 'notification') {
            setAnchorElNotif(null);
        } else {
            setAnchorEl(null);
        }
    };

    const logoutHandler = async () => {
        dispatch({ type: 'USER_LOGGED_OUT' });
        storageService.clearAll();
        await auth.signOut();
        history.push('/login');
    }

    const postClicked = () => {
        setToggleMenu(false);
        setActiveLink('post');
        history.push('/post-new-job')
    }

    const chatClicked = () => {
        setToggleMenu(false);
        setActiveLink('chat');
        history.push('/chat')
    }

    const jobClick = () => {
        setToggleMenu(false);
        if (userType === 1) {
            setActiveLink('jobs');
            history.push('/active-jobs');
        } else if (userType === 2) {
            setActiveLink('jobs');
            history.push('/jobs')
        }
    }

    const renderByType = ({ name }: any) => {
        if (type === 2) {
            return props?.builderProfile[name];
        }
        if (type === 1) {
            return props?.tradieProfileData[name];
        }
    }

    return (
        <>
            {showHeader && <header id="header">
                <div className="custom_container">
                    <div className="flex_headrow">
                        <div className="brand_wrap">
                            <figure>
                                <img
                                    onClick={() => {
                                        if (pathname === '/') {
                                            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                                            return;
                                        }
                                        setActiveLink('discover');
                                        setToggleMenu(false);
                                        props.history.push('/');
                                    }}
                                    src={colorLogo}
                                    alt="logo" />
                            </figure>
                        </div>
                        <ul className={`center_nav ${toggleMenu ? 'active' : ''}`}>
                            <li>
                                <a
                                    onClick={() => {
                                        setActiveLink('discover');
                                        history.push('/');
                                    }}
                                    className={activeLink === 'discover' ? 'active' : ''}>
                                    {'Discover'}
                                </a>
                            </li>
                            <li>
                                <a className={activeLink === 'jobs' ? 'active' : ''} onClick={jobClick}>
                                    {'Jobs'}
                                </a>
                            </li>
                            {userType === 2 &&
                                <li>
                                    <a className={activeLink === 'post' ? 'active' : ''} onClick={postClicked}>
                                        {'Post'}
                                    </a>
                                </li>}
                            <li>
                                <a className={activeLink === 'chat' ? 'active' : ''} onClick={chatClicked}>
                                    {'Chat'}
                                </a>
                            </li>
                        </ul>
                        <ul className="side_nav">
                            <li className="mob_nav">
                                <img
                                    src={menu}
                                    alt="menu"
                                    onClick={() => { setToggleMenu(!toggleMenu) }} />
                            </li>
                            <div className="profile_notification">
                                {storageService.getItem("jwtToken") &&
                                    <div className="notification_bell" onClick={(event) => handleClick(event, 'notification')}>
                                        <figure className="bell">
                                            <span className="badge">4 </span>
                                            <img src={bell} alt="notify" />
                                        </figure>
                                    </div>}
                                <div className="user_profile">
                                    {storageService.getItem("jwtToken") &&
                                        <figure aria-controls="simple-menu" aria-haspopup="true" onClick={(event) => handleClick(event, 'profile')}>
                                            <img src={renderByType({ name: 'userImage' }) || dummy} alt="profile-img" />
                                        </figure>}


                                    <Menu className="sub_menu"
                                        id="simple-menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={() => handleClose('profile')}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                    >
                                        <span className="sub_title">
                                            {renderByType({ name: 'userName' })}
                                        </span>
                                        <MenuItem onClick={() => { handleClose('pofile'); history.push(`/${props.userType === 1 ? 'tradie' : 'builder'}-info?${props.userType === 1 ? 'trade' : 'builder'}Id=${renderByType({ name: 'userId' })}&type=${props.userType}`); }}>
                                            <span className="setting_icon">
                                                <img src={profile} alt="profile" />
                                                {'My Profile'}
                                            </span>
                                        </MenuItem>
                                        {[1, 2].includes(props.userType) && (
                                            <MenuItem onClick={() => { handleClose('profile'); history.push(props.userType === 1 ? '/my-revenue' : '/transaction-history'); }}>
                                                <span className="setting_icon">
                                                    <img src={revenue} alt="revenue" />
                                                    {props.userType === 1 ? 'My revenue' : 'Transaction history'}
                                                </span>
                                            </MenuItem>
                                        )}
                                        {[1, 2].includes(props.userType) && (
                                            <MenuItem onClick={() => { handleClose('profile'); history.push(props.userType === 1 ? '/saved-jobs' : '/saved-tradespeople') }}>
                                                <span className="setting_icon">
                                                    <img src={savedJobs} alt="savedJobs" />
                                                    {`Saved ${props.userType === 1 ? 'jobs' : 'tradespeople'}`}
                                                </span>
                                            </MenuItem>
                                        )}
                                        {[1, 2].includes(props.userType) && (
                                            <MenuItem onClick={() => { handleClose('profile'); }}>
                                                <span className="setting_icon">
                                                    <img src={guide} alt="guide" />
                                                    {'App Guide'}
                                                </span>
                                            </MenuItem>
                                        )}
                                        <MenuItem onClick={() => { handleClose('profile'); logoutHandler(); }}>
                                            <span className="setting_icon logout">Logout</span>
                                        </MenuItem>
                                    </Menu>


                                    {/* Notification */}
                                    <Menu className="sub_menu notifications"
                                        id="simple-menu"
                                        anchorEl={anchorElNotif}
                                        keepMounted
                                        open={Boolean(anchorElNotif)}
                                        onClose={() => handleClose('notification')}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                    >
                                        <span className="sub_title">Notifications</span>
                                        <a href="javascript:void(0)" className="link mark_all">Mark all as read</a>

                                        <MenuItem className="unread">
                                            <div className="notif">
                                                <figure className="not_img">
                                                    <img src={dummy} alt="img" />
                                                    <span className="dot"></span>
                                                </figure>
                                                <div className="info">
                                                    <span className="who line-1">Wire up circuit box</span>
                                                    <span className="line-1">1 new message from builder</span>
                                                    <span className="see">See the message</span>
                                                </div>
                                                <span className="time">St 12:30 AM</span>
                                            </div>
                                        </MenuItem>
                                        <MenuItem className="unread">
                                            <div className="notif">
                                                <figure className="not_img">
                                                    <img src={dummy} alt="img" />
                                                    <span className="dot"></span>
                                                </figure>
                                                <div className="info">
                                                    <span className="who">John Oldman</span>
                                                    <span>Work was approved </span>
                                                    <span className="see">See a rating</span>
                                                </div>
                                                <span className="time">St 12:30 AM</span>
                                            </div>
                                        </MenuItem>
                                        <MenuItem>
                                            <div className="notif">
                                                <figure className="not_img">
                                                    <img src={dummy} alt="img" />
                                                </figure>
                                                <div className="info">
                                                    <span className="who">John Oldman</span>
                                                    <span>reviewed you!</span>
                                                    <span>Read review</span>
                                                </div>
                                                <span className="time">St 12:30 AM</span>
                                            </div>
                                        </MenuItem>
                                        <MenuItem>
                                            <div className="notif">
                                                <figure className="not_img">
                                                    <img src={dummy} alt="img" />
                                                </figure>
                                                <div className="info">
                                                    <span className="who">John Oldman</span>
                                                    <span>reviewed you!</span>
                                                    <span>Read review</span>
                                                </div>
                                                <span className="time">St 12:30 AM</span>
                                            </div>
                                        </MenuItem>
                                    </Menu>
                                    {/* Notification close */}

                                </div>
                            </div>
                            {!storageService.getItem("jwtToken") &&
                                <li>
                                    <a className="active" onClick={() => setShowModal(!showModal)}>
                                        {'Log in'}
                                    </a>
                                </li>}
                            <AuthModal
                                showModal={showModal}
                                setShowModal={setShowModal}
                                history={props.history}
                                firstTimePopup>
                                {props.children}
                            </AuthModal>
                        </ul>
                    </div>
                </div>
            </header>}
        </>
    )
}

export default withRouter(Header);
