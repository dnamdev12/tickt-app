/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react';
import { useLocation, withRouter, useHistory } from "react-router-dom";
import Joyride from 'react-joyride';
import Modal from '@material-ui/core/Modal';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import storageService from '../../utils/storageService';
import AuthModal from '../auth/authModal';

import { useDispatch } from 'react-redux'
import { setShowNotification } from '../../redux/common/actions';
import { auth, messaging } from '../../services/firebase';
import { onNotificationClick, formatNotificationTime } from '../../utils/common';
import { getNotificationList } from '../../redux/homeSearch/actions';

import colorLogo from '../../assets/images/ic-logo-yellow.png';
import menu from '../../assets/images/menu-line-white.svg';
import bell from '../../assets/images/ic-notification.png';
import cancel from "../../assets/images/ic-cancel.png";
import dummy from '../../assets/images/u_placeholder.jpg';
import profile from '../../assets/images/ic-profile.png';
import revenue from '../../assets/images/ic-revenue.png';
import guide from '../../assets/images/ic-tutorial.png';
import savedJobs from '../../assets/images/ic-job.png';
import noNotification from '../../assets/images/no-notifications.png';
import _ from 'lodash';

import skipBtn from '../../assets/images/skip.png';
import backBtn from '../../assets/images/back.png';
import nextBtn from '../../assets/images/next.png';
import doneBtn from '../../assets/images/check-mark.png';




const DISABLE_HEADER = [
    '/signup',
    '/login',
    '/reset-password',
    '/404',
    '/email-updated-successfully',
    '/change-password-success'
];

const Header = (props: any) => {
    let window_: any = window;
    const dispatch = useDispatch();
    let { pathname } = useLocation();
    let history = useHistory();
    let type = storageService.getItem('userType');

    const [userType, setUserType] = useState(null)
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElNotif, setAnchorElNotif] = useState(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showHeader, setShowHeader] = useState<boolean>(false);
    const [toggleMenu, setToggleMenu] = useState(false);
    const [activeLink, setActiveLink] = useState('discover');
    const [notificationData, setNotificationData] = useState<any>({
        count: 0,
        list: [],
        unreadCount: 0
    });
    const [notificationPgNo, setNotificationPgNo] = useState<number>(1);
    const [hasMoreNotif, setHasMoreNotif] = useState<boolean>(true);
    const [isIntercom, setIntercom] = useState(false);
    const [startTour, setStartTour] = useState(false);
    const [isFalse, setIsFalse] = useState(false);
    const forceUpdate = useForceUpdate();
    const [activeTarget, setActiveTarget] = useState('');
    const [logoutClicked, setLogoutClicked] = useState(false);
    const [profileData, setProfileData] = useState('');

    function useForceUpdate() {
        const [value, setValue] = useState(0); // integer state
        return () => setValue(value => value + Math.random()); // update the state to force render
    }

    const onMessageListner = () => {
        messaging.onMessage((payload: any) => {
            console.log('firebase notification received inside header : ', payload);
            // const title = payload.data.title;
            // const options = {
            //     body: payload.data.notificationText
            // }
            // var notifications = new Notification(title, options);
            // notifications.onclick = function (event) {
            //     console.log('event: ', event);
            //     event.preventDefault(); // prevent the browser from focusing the Notification's tab
            //     window.open('http://localhost:3000/active-jobs', '_self');
            // }

            setShowNotification(true, payload);
            setNotificationData((prevData: any) => {
                let newPushList = [...prevData.list];
                newPushList.unshift(payload.data);
                console.log('newPushList: ', newPushList);
                return {
                    ...prevData,
                    count: prevData.count + 1,
                    list: newPushList
                }
            });
        })
    }

    const callNotificationList = async (resetUnreadNotif?: boolean, isInit?: boolean) => {
        if (notificationData.list?.length > 0 && notificationData.list?.length >= notificationData?.count) {
            setHasMoreNotif(false);
            return;
        }
        const res1 = await getNotificationList(resetUnreadNotif ? 1 : notificationPgNo, (resetUnreadNotif && isInit) ? false : resetUnreadNotif ? true : false);
        if (res1.success) {
            const result = res1.data?.result;
            if (result?.list?.length < 10) {
                setHasMoreNotif(false);
            }
            const notifList: any = [...notificationData.list, ...result?.list];

            setNotificationData((prevData: any) => ({
                ...prevData,
                count: result?.count,
                list: notifList,
                unreadCount: result?.unreadCount
            }));
            if (resetUnreadNotif) {
                handleClose('notification');
                setNotificationPgNo(2);
            } else {
                setNotificationPgNo(notificationPgNo + 1);
            }
        }
    }

    console.log('notificationData: ', notificationData);

    useEffect(() => {
        onMessageListner();
        setActiveLink('discover');

        const firstLogin = storageService.getItem('firstLogin');
        if (firstLogin === 'true') {
            // setTourDialog(true);
        }
        setUserType(storageService.getItem('userType'))
        callOnPathChange();
    }, []);


    const callOnPathChange = () => {
        console.log('Inside --- callOnPathChange user_id')
        if (userType) {
            (notificationData.list?.length === 0 || pathname === '/') && callNotificationList(true, true);
            if (userType === 1) {
                if (!profileData || (profileData && !_.isEqual(props.tradieProfileData, profileData))) {
                    props.callTradieProfileData();
                }
            } else if (userType === 2) {
                if (!profileData || (profileData && !_.isEqual(props.builderProfile, profileData))) {
                    props.getProfileBuilder();
                }
            }
        }
        if (DISABLE_HEADER.includes(pathname)) {
            setShowHeader(false);
        } else {
            setShowHeader(true);
        }
        setUserType(storageService.getItem('userType'))
    }

    useEffect(() => {
        if (props.tradieProfileData && Object.keys(props.tradieProfileData)?.length) {
            setProfileData(props.tradieProfileData);
        }
        if (props.builderProfile && Object.keys(props.builderProfile)?.length) {
            setProfileData(props.builderProfile);
        }
    }, [props.tradieProfileData, props.builderProfile])

    useEffect(() => {
        if (props?.builderProfile && Object.keys(props?.builderProfile).length && !isIntercom) {
            setIntercom(true)
            setHidden();
        }
        if (props?.tradieProfileData && Object.keys(props?.tradieProfileData).length && !isIntercom) {
            setIntercom(true)
            setHidden();
        }
    }, [props])


    const setHidden = () => {
        let data: any = storageService.getItem('userInfo');
        if (data) {
            if (!Object.values(data).includes([''])) {
                if (window_.Intercom) {
                    // window_.Intercom('shutdown');
                    window_.Intercom('update', {
                        app_id: 'tvbm4bhr',
                        name: data.userName,
                        email: data.email,
                        user_id: data._id,
                    });
                }
            } else {
                forceUpdate();
                setIsFalse(true);
                callOnPathChange();
                console.log({ type }, 'user_id')
            }
        }
    }

    useEffect(() => {
        if (pathname === '/login') {
            // window_.Intercom('hide');
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
        if (['/builder-info', '/saved-tradespeople', '/search-tradie-results'].includes(pathname)) {
            setHidden();
        }

    }, [pathname]);

    useEffect(() => {
        callOnPathChange();
    }, [pathname, userType, isFalse])

    useEffect(() => {
        if (startTour) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [startTour]);

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
        setLogoutClicked(false);
        storageService.clearAll();
        auth.signOut();
        history.push('/login');
        window.location.reload();
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
        if (userType === 1 || userType === 2) {
            return profileData?.[name];
        }
    }

    const handleCallback = (state: any) => {
        const { action, step: { target } } = state;
        const width = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;

        setActiveTarget(target);

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
                spotlightPadding={activeTarget === '.tour-notifications' ? 12 : 0}
                disableOverlayClose
                disableCloseOnEsc
                steps={userType === 1 ? tradieTour : builderTour}
                styles={{
                    options: {
                        zIndex: 2000,
                    },
                    overlay: {
                        // background: 'linear-gradient(180deg, rgba(22, 29, 74, 0.80) 20%, rgba(22, 29, 74, 0.5) 30%)',
                        background: '#00000099',
                    }
                }}
                floaterProps={{
                    hideArrow: true,
                }}
                tooltipComponent={({
                    continuous,
                    index,
                    step,
                    backProps,
                    skipProps,
                    primaryProps,
                    tooltipProps,
                    isLastStep,
                    size,
                }) => (
                    <div className="tour-tooltip" {...tooltipProps}>
                        <div className="tour-tooltip-content">{step.content}</div>
                        <div className="tour-tooltip-footer">
                            <button className="" {...skipProps} title="Skip">
                                <img src={skipBtn} alt="skip" className="skip" />
                            </button>
                            {index > 0 && (
                                <button className="" {...backProps} title="Back">
                                    <img src={backBtn} alt="back" />
                                </button>
                            )}
                            {continuous && (
                                // <button className="" {...primaryProps} title={isLastStep ? 'Done' : 'Next'}>
                                //     {isLastStep ? 'Done' : 'Next'} {step.showProgress && `(${index + 1}/${size})`}
                                // </button>

                                <button className="" {...primaryProps} title={isLastStep ? 'Done' : 'Next'}>
                                    {isLastStep ? <img src={doneBtn} alt="done" /> : <img src={nextBtn} alt="next" />} 
                                    <span>{step.showProgress && `(${index + 1}/${size})`}</span>
                                </button>
                            )}
                        </div>
                    </div>
                )}
                callback={handleCallback}
            />
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
                                    }}
                                    className={startTour ? activeTarget === '.tour-discover a' ? 'active' : '' : activeLink === 'discover' ? 'active' : ''}>
                                    {'Discover'}
                                </a>
                            </li>
                            <li className="tour-jobs">
                                <a className={startTour ? activeTarget === '.tour-jobs a' ? 'active' : '' : activeLink === 'jobs' ? 'active' : ''} onClick={jobClick}>
                                    {'Jobs'}
                                </a>
                            </li>

                            {userType === 2 &&
                                <li className="tour-post">
                                    <a className={startTour ? activeTarget === '.tour-post a' ? 'active' : '' : activeLink === 'post' ? 'active' : ''} onClick={postClicked}>
                                        {'Post'}
                                    </a>
                                </li>}
                            <li className="tour-chat">
                                <a className={startTour ? activeTarget === '.tour-chat a' ? 'active' : '' : activeLink === 'chat' ? 'active' : ''} onClick={chatClicked}>
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
                                            <span className={`${notificationData.unreadCount ? 'badge' : ''}`}>{notificationData.unreadCount || ''}</span>
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
                                        elevation={0}
                                        getContentAnchorEl={null}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'center',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                    >
                                        <span className="sub_title">
                                            {renderByType({ name: 'userName' })}
                                        </span>


                                        <MenuItem onClick={() => {
                                            handleClose('pofile');
                                            history.push(`/${props.userType === 1 ? 'tradie' : 'builder'}-info?${props.userType === 1 ? 'trade' : 'builder'}Id=${renderByType({ name: 'userId' })}&type=${props.userType}`);
                                        }}>
                                            <span className="setting_icon">
                                                <img src={profile} alt="profile" />
                                                {'My Profile'}
                                            </span>
                                        </MenuItem>
                                        {[1, 2].includes(props.userType) && (
                                            <MenuItem onClick={() => { handleClose('profile'); history.push('/payment-history'); }}>
                                                <span className="setting_icon">
                                                    <img src={revenue} alt="revenue" />
                                                    {props.userType === 1 ? 'Payment history' : 'Transaction history'}
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
                                        <MenuItem onClick={() => {
                                            handleClose('profile');
                                            setLogoutClicked(true);
                                        }}>
                                            <span className="setting_icon logout">Logout</span>
                                        </MenuItem>
                                    </Menu>

                                    {/* logout popup */}
                                    <Modal
                                        className="custom_modal"
                                        open={logoutClicked}
                                        onClose={() => setLogoutClicked(false)}
                                        aria-labelledby="simple-modal-title"
                                        aria-describedby="simple-modal-description"
                                    >
                                        <div className="custom_wh confirmation" data-aos="zoom-in" data-aos-delay="30" data-aos-duration="1000">
                                            <div className="heading">
                                                <span className="xs_sub_title">{`Logout Confirmation`}</span>
                                                <button className="close_btn" onClick={() => setLogoutClicked(false)}>
                                                    <img src={cancel} alt="cancel" />
                                                </button>
                                            </div>
                                            <div className="modal_message">
                                                <p>{`Are you sure you want to logout?`}</p>
                                            </div>
                                            <div className="dialog_actions">
                                                <button className="fill_btn btn-effect" onClick={logoutHandler}>Yes</button>
                                                <button className="fill_grey_btn btn-effect" onClick={() => setLogoutClicked(false)}>No</button>
                                            </div>
                                        </div>
                                    </Modal>

                                    {/* Notification */}
                                    <Menu className="sub_menu notifications"
                                        id="simple-menu"
                                        anchorEl={anchorElNotif}
                                        keepMounted
                                        open={Boolean(anchorElNotif)}
                                        onClose={() => handleClose('notification')}
                                        elevation={0}
                                        getContentAnchorEl={null}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'center',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                    >
                                        <div>
                                            <span className="sub_title">Notifications</span>
                                            <a href="javascript:void(0)" className="link mark_all"
                                                onClick={() => {
                                                    if (notificationData.unreadCount === 0) {
                                                        handleClose('notification');
                                                        return;
                                                    }
                                                    callNotificationList(true)
                                                }}
                                            >Mark all as read</a>
                                        </div>

                                        {notificationData.list?.length > 0 &&
                                            notificationData.list.map((item: any) =>
                                                <MenuItem className={`${item.read ? '' : 'unread'}`} onClick={() => {
                                                    handleClose('notification');
                                                    props.history.push(onNotificationClick(item));
                                                }}
                                                >
                                                    <div className="notif">
                                                        <figure className="not_img">
                                                            <img src={item?.image || dummy} alt="img" />
                                                            {/* <span className="dot"></span> */}
                                                            <span className={`${item.read ? '' : 'dot'}`}></span>
                                                        </figure>
                                                        <div className="info">
                                                            {/* <span className="who line-1">{item.title}</span> */}
                                                            <span className="who line-1">{item.title}</span>
                                                            <span className="line-1">{item.notificationText}</span>
                                                            {/* <span className="see">See the message</span> */}
                                                        </div>
                                                        <span className="time">{formatNotificationTime(item?.updatedAt, 'day')}</span>
                                                    </div>
                                                </MenuItem>
                                            )}
                                        {hasMoreNotif && notificationData.list?.length > 0 && <div className="more_notif" onClick={() => callNotificationList()}>
                                            <a className="link">View more</a>
                                        </div>}

                                        {notificationData?.list?.length === 0 && <div className="no_notification">
                                            <figure>
                                                <img src={noNotification} alt="no-notifications" />
                                            </figure>
                                            <span>No Notifications</span>
                                        </div>}

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
