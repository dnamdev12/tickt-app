/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react';
import { useLocation, withRouter, useHistory } from "react-router-dom";
import Joyride from 'react-joyride';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import storageService from '../../utils/storageService';
import AuthModal from '../auth/authModal';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

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

    const [tourDialog, setTourDialog] = useState(false);
    const [userType, setUserType] = useState(null)
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
    const [isHide, setIsHide] = useState(false);
    const [startTour, setStartTour] = useState(false);

    let window_: any = window;
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

        const firstLogin = storageService.getItem('firstLogin');
        if (firstLogin === 'true') {
            setTourDialog(true);
        }
    }, []);


    const setHidden = () => {
        let data: any = {}
        if (props?.builderProfile && Object.keys(props?.builderProfile).length) {
            data = {
                email: props?.builderProfile?.email || localStorage.getItem('email'),
                userId: props?.builderProfile?.userId,
                name: props?.builderProfile?.userName
            }
        }

        if (props?.tradieProfileData && Object.keys(props?.tradieProfileData).length) {
            data = {
                email: props?.tradieProfileData?.email || localStorage.getItem('email'),
                userId: props?.tradieProfileData?.userId,
                name: props?.tradieProfileData?.userName
            }
        }


        if (!Object.values(data).includes([''])) {
            console.log({ data }, 'data')
            // window_.Intercom('shutdown');
            window_.intercomSettings = {
                app_id: "tvbm4bhr",
                name: data.name,
                email: data.email,
                user_id: data.userId
            };

            if (window_?.Intercom) {
                window_?.Intercom('update', {
                    "hide_default_launcher": false
                });
            }
            // window_.Intercom('boot');
            // window_.Intercom('show');
        }
    }

    useEffect(() => {
        if (props.notificationList) {
            setNotificationData(props.notificationList);
        }
    }, [props.notificationList]);

    useEffect(() => {
        console.log({
            pathname
        })
        if (pathname === '/login') {
            window_.Intercom('hide');
        }

        if (pathname === '/') {
            setActiveLink('discover');
            setHidden();
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
            setHidden();
        }

        if (pathname === '/post-new-job') {
            setActiveLink('post');
            setHidden();
        }

        if (pathname === '/chat') {
            setActiveLink('chat')
            setHidden();
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

    useEffect(() => {
        if (startTour) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [startTour]);

    const handleFirstLogin = () => {
        const firstLogin = storageService.getItem('firstLogin');
        if (firstLogin === 'true') {
            storageService.setItem('firstLogin', 'false');
        }
    }

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

    const handleCallback = (state: any) => {
        const { action, step: { target } } = state;
        const width = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;

        if (action === 'reset') {
            setStartTour(false);
        } else if (action === 'start' && width <= 650) {
            setToggleMenu(true);
        }

        if (target === '.tour-profile' && toggleMenu) {
            setToggleMenu(false);
        }
    }

    const tradieTour = [
        {
            target: '.tour-discover a',
            content: `Hi ${renderByType({ name: 'userName' })}, here is your go-to for finding new jobs.`,
            disableBeacon: true
        },
        {
            target: '.tour-jobs a',
            content: 'Here you can find all your active jobs and keep on top of milestones!',
        },
        {
            target: '.tour-chat a',
            content: 'Chat with builders about job requirements',
        },
        {
            target: '.tour-profile',
            content: 'Manage your profile and settings',
        },
        {
            target: '.tour-notifications',
            content: 'Check notifications and stay on the front foot',
        },
    ];

    const builderTour = [
        {
            target: '.tour-discover a',
            content: `Hi ${renderByType({ name: 'userName' })}, here is your go-to for finding tradespeople.`,
            disableBeacon: true
        },
        {
            target: '.tour-jobs a',
            content: 'Here you can find all your active jobs and keep on top of milestones!',
        },
        {
            target: '.tour-post a',
            content: 'Here you can post a new job',
        },
        {
            target: '.tour-chat a',
            content: 'Your chats for job and tradespeople are here',
        },
        {
            target: '.tour-profile',
            content: 'Manage your profile and settings',
        },
        {
            target: '.tour-notifications',
            content: 'Check notifications and stay on the front foot',
        },
    ]

    return (
        <>
            <Joyride
                run={startTour}
                showProgress
                continuous
                showSkipButton
                scrollToFirstStep
                spotlightPadding={0}
                disableOverlayClose
                disableCloseOnEsc
                steps={userType === 1 ? tradieTour : builderTour}
                styles={{
                    options: {
                        zIndex: 2000,
                    },
                }}
                floaterProps={{
                    hideArrow: true,
                }}
                callback={handleCallback}
            />
            <Dialog
                open={tourDialog}
                onClose={handleClose}
                className="tour-dialog"
            >
                <DialogTitle id="alert-dialog-title">
                    {"First time?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={() => { setStartTour(true); setTourDialog(false); handleFirstLogin(); }} color="primary" autoFocus>
                        {'Yes'}
                    </Button>
                    <Button onClick={() => { setTourDialog(false); handleFirstLogin(); }} color="primary">
                        {'No'}
                    </Button>
                </DialogActions>
            </Dialog>
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
                            <li className="tour-discover">
                                <a
                                    onClick={() => {
                                        setActiveLink('discover');
                                        history.push('/');
                                        setStartTour(true);
                                    }}
                                    className={activeLink === 'discover' ? 'active' : ''}>
                                    {'Discover'}
                                </a>
                            </li>
                            <li className="tour-jobs">
                                <a className={activeLink === 'jobs' ? 'active' : ''} onClick={jobClick}>
                                    {'Jobs'}
                                </a>
                            </li>
                            {userType === 2 &&
                                <li className="tour-post">
                                    <a className={activeLink === 'post' ? 'active' : ''} onClick={postClicked}>
                                        {'Post'}
                                    </a>
                                </li>}
                            <li className="tour-chat">
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
                                    onClick={() => { setToggleMenu(!toggleMenu); }} />
                            </li>
                            <div className="profile_notification">
                                {storageService.getItem("jwtToken") &&
                                    <div className="notification_bell" onClick={(event) => handleClick(event, 'notification')}>
                                        <figure className="bell tour-notifications">
                                            <span className="badge">{notificationData.unreadCount}</span>
                                            <img src={bell} alt="notify" />
                                        </figure>
                                    </div>}
                                <div className="user_profile">
                                    {storageService.getItem("jwtToken") &&
                                        <figure className="tour-profile" aria-controls="simple-menu" aria-haspopup="true" onClick={(event) => handleClick(event, 'profile')}>
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
                                            <MenuItem onClick={() => { handleClose('profile'); setStartTour(true); }}>
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

                                        {notificationData.list?.length > 0 &&
                                            notificationData.list.map((item: any) =>
                                                <MenuItem className={`${item.read ? '' : 'unread'}`}>
                                                    <div className="notif">
                                                        <figure className="not_img">
                                                            <img src={item?.image || dummy} alt="img" />
                                                            {/* <span className="dot"></span> */}
                                                            <span className={`${item.read ? '' : 'dot'}`}></span>
                                                        </figure>
                                                        <div className="info">
                                                            <span className="who line-1">{item.title}</span>
                                                            <span className="line-1">{item.notificationText}</span>
                                                            {/* <span className="see">See the message</span> */}
                                                        </div>
                                                        <span className="time">St 12:30 AM</span>
                                                    </div>
                                                </MenuItem>
                                            )}
                                        {/* <MenuItem>
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
                                        </MenuItem> */}
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
