import React, { useState, useEffect } from 'react';

import notFound from '../../assets/images/not-found.png';
// import { Link } from 'react-router-dom';

import dummy from '../../assets/images/u_placeholder.jpg';
// import search from '../../assets/images/main-search.png';
import chatSearch from '../../assets/images/search-chat.png';
// import more from '../../assets/images/icon-direction-right.png';
import viewMore from '../../assets/images/icon-direction-blue.png';
import menu from '../../assets/images/menu-line-blue.png';
import close from '../../assets/images/ic-cancel-blue.png';
import sendMedia from '../../assets/images/ic-media.png';
import sendBtn from '../../assets/images/ic-send.png';
import moment from 'moment';
import { format, formatRelative, lightFormat } from 'date-fns';

import { auth, db, firebase } from '../../services/firebase';
import { setShowToast } from '../../redux/common/actions';
import sessionStorage from '../../utils/storageService';

interface PropTypes {
    builderProfile: any,
    tradieProfileData: any,
    isLoading: boolean,
    history: any,
}

const Chat = (props: PropTypes) => {
    const [toggle, setToggle] = useState(false);
    const [initializing, setInitializing] = useState(true);
    // firebase authenticated user details
    const [user, setUser] = useState<any>(() => auth.currentUser);
    // tickt logged in user id
    const [userId, setUserId] = useState<string>('');
    const [chats, setChats] = useState([]);
    const [newChat, setNewChat] = useState('');
    const [chatDocumentId, setChatDocumentId] = useState<string>('60f575ba18562930191ff6fa-60f56f6395672856a5aebdd33');
    const [isChatAlreadyExist, setIsChatAlreadyExist] = useState<boolean>(false);
    const [tradieCloudInfo, setTradieCloudInfo] = useState<any>('');
    const [builderCloudInfo, setBuilderCloudInfo] = useState<any>('');
    const [oneToOneChatList, setOneToOneChatList] = useState<any>(null);

    const { tradieId, builderId, jobName, jobId } = props.history?.location?.state;

    // const { uid, displayName, photoURL, text } = user;

    const chatsRef = db.collection('chats');
    const usersRef = db.collection('users');
    const query = chatsRef.doc(chatDocumentId).collection('messages').orderBy('createdAt').limit(25);

    const setTradieInfo = () => {
        usersRef.doc('60f575ba18562930191ff6fa').get().then(doc => {
            if (doc.exists) {
                const data: any = doc.data();
                setTradieCloudInfo(data);
            } else {
                setTradieCloudInfo('');
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

    const setBuilderInfo = () => {
        usersRef.doc('60f56f6395672856a5aebdd3').get().then(doc => {
            if (doc.exists) {
                const data: any = doc.data();
                setBuilderCloudInfo(data);
            } else {
                setBuilderCloudInfo('');
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

    useEffect(() => {
        setTradieInfo();
        setBuilderInfo();
        let unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setUser(user);
                chatsRef.doc(chatDocumentId).get().then(doc => {
                    if (doc.exists) {
                        setIsChatAlreadyExist(true);
                    }
                }).catch((error) => {
                    console.log("Error getting document:", error);
                });
            } else {
                setUser(false);
            }
            if (initializing) {
                setInitializing(false);
            }
        });

        return unsubscribe;
    }, [initializing]);

    useEffect(() => {
        if (sessionStorage.getItem('userType') === 1 && props.tradieProfileData?.userId) {
            setUserId(props.tradieProfileData?.userId);
            setChatDocumentId(props.tradieProfileData?.userId + '-' + builderId + '-' + jobId);
        } else if (sessionStorage.getItem('userType') === 2 && props.builderProfile?.userId) {
            setUserId(props.builderProfile?.userId);
            setChatDocumentId(props.builderProfile?.userId + '-' + tradieId + '-' + jobId);
        }

        let unsubscribe;
        if (userId) {
            unsubscribe = usersRef.doc(userId).onSnapshot(doc => {
                const data: any = doc.data();
                setOneToOneChatList(data.ongoingChatIds);
            });
        }

        return unsubscribe;
    }, [userId, props.tradieProfileData, props.builderProfile]);

    useEffect(() => {
        const unsubscribe = query.onSnapshot(querySnapshot => {
            const data: any = querySnapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id,
            }));
            setChats(data);
        });

        return unsubscribe;

        // this.setState({ readError: null });
        // try {
        //     chatsRef.on("value", (snapshot: any) => {
        //         let chats: any = [];
        //         snapshot.forEach((snap: any) => {
        //             chats.push(snap.val());
        //         });
        //         this.setState({ chats });
        //     });
        // } catch (error) {
        // }
    }, []);

    const handleOnChange = (e: any) => {
        setNewChat(e.target.value);
    };

    const formatDateTime = (seconds: any, type: string) => {
        const date = new Date(seconds);
        let formattedDate = '';
        if (type === 'day') {
            formattedDate = format(date, 'd MMM yyyy');
        } else if (type === 'time') {
            formattedDate = lightFormat(date, 'HH:mm');
        }
        return formattedDate;
    };

    console.log(tradieCloudInfo, 'tradieCloudInfo', chats, "chats", props.history, "history");

    // builderId: '60f56f6395672856a5aebdd3'
    // tradieId: '60f575ba18562930191ff6fa'

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            if (isChatAlreadyExist) {
                await chatsRef.doc(chatDocumentId).collection('messages').add({
                    text: newChat,
                    createdAt: moment().toDate(),
                    uid: user?.uid,
                    // photoURL
                });
                setNewChat('');
            } else {
                await chatsRef.doc(chatDocumentId).set({
                    jobId: jobId,
                    jobName: jobName,
                    createdAt: moment().toDate(),
                });
                await chatsRef.doc(chatDocumentId).collection('messages').add({
                    text: newChat,
                    createdAt: moment().toDate(),
                    uid: user?.uid
                });
                setIsChatAlreadyExist(true);
                setNewChat('');
                await usersRef.doc('60f575ba18562930191ff6fa').update({
                    // oneToOneChatIds: [...tradieCloudInfo.ongoingChatIds, chatDocumentId]
                });
                await usersRef.doc('60f56f6395672856a5aebdd3').update({
                    // oneToOneChatIds: [...builderCloudInfo.ongoingChatIds, chatDocumentId]
                });
            }
        } catch (error) {
        }
    }

    return (
        <div className="app_wrapper">
            <div className="custom_container">
                <span className="mob_side_nav">
                    <img src={menu} alt="mob-side-nav" />
                </span>
                <div className="f_row chat_wrapr">
                    <div className="side_nav_col">
                        <button className="close_nav">
                            <img src={close} alt="close" />
                        </button>
                        <div className="stick">
                            <span className="title">Chat</span>
                            <div className="search_bar">
                                <input type="text" placeholder="Search" />
                                <span className="detect_icon_ltr">
                                    <img src={chatSearch} alt="search" />
                                </span>
                            </div>
                            <ul className="chat_list">
                                <li>
                                    <a href="javascript:void(0)" className="chat active">
                                        <figure className="u_img">
                                            <img src={dummy} alt="img" />
                                        </figure>
                                        <div className="detail">
                                            <span className="inner_title line-1">John Oldman</span>
                                            <span className="inner_title job line-1">Wire up circuit box</span>
                                            <p className="commn_para line-1">Hi, thanks for request, hope you..</p>
                                            <span className="date_time">Aug 20</span>
                                            <span className="count">2</span>
                                        </div>
                                    </a>
                                </li>
                                {/* <li>
                                    <a href="javascript:void(0)" className="chat">
                                        <figure className="u_img">
                                            <img src={dummy} alt="img" />
                                        </figure>
                                        <div className="detail">
                                            <span className="inner_title line-1">John Oldman</span>
                                            <span className="inner_title job line-1">Wire up circuit box</span>
                                            <p className="commn_para line-1">Hi, thanks for request, hope you..</p>
                                            <span className="date_time">Aug 20</span>
                                            <span className="count grey">2</span>
                                        </div>
                                    </a>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                    <div className="detail_col">
                        <div className="flex_row">
                            <div className={`chat_col ${toggle ? 'active' : ''}`}>
                                <div className="chat_user">
                                    <figure className="u_img">
                                        <img src={dummy} alt="user-img" />
                                    </figure>
                                    <span className="name">John Oldman</span>
                                    <span
                                        onClick={() => {
                                            setToggle(true);
                                        }}
                                        className="view_detail">View Job Details
                                        <img src={viewMore} alt="view-more" />
                                    </span>
                                </div>
                                <div className="message_wrapr">
                                    {chats.length > 0 && chats.map((msg: any) => {
                                        console.log(msg.uid, "zz", user.uid, "xx", msg)
                                        const messageClass = msg.uid === user.uid ? 'message' : 'message recive_msg';
                                        return (
                                            <React.Fragment>
                                                <div className="date_time">
                                                    <span>Today</span>
                                                    {/* <span>09.08.2020</span> */}
                                                </div>
                                                {/* <div className="message">
                                                    <figure className="media">
                                                        <img src={notFound} alt="media" />
                                                        <span className="time">10:32</span>
                                                    </figure>
                                                </div> */}
                                                <div className={`${messageClass}`}>
                                                    <p className="mark">{msg.text}
                                                        <span className="time">{formatDateTime(msg?.createdAt?.seconds * 1000, "time")}</span>
                                                    </p>
                                                </div>
                                                {/* <div className="message recive_msg">
                                                        <p>Great Thanks !
                                                            <span className="time">10:32</span>
                                                        </p>
                                                    </div> */}
                                            </React.Fragment>
                                        )
                                    })}
                                </div>
                                <div className="send_msg">
                                    <div className="text_field">
                                        <span className="detect_icon_ltr">
                                            <img src={sendMedia} alt="media" />
                                        </span>
                                        <textarea placeholder="Message.." value={newChat} onChange={handleOnChange} />
                                        <span className="detect_icon">
                                            <img src={sendBtn} alt="send" onClick={handleSubmit} />
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {toggle && (
                                <div className="view_detail_col">
                                    <div className="f_spacebw relative">
                                        <span className="title line-2 pr-20">Wire up circuit box</span>
                                        <span
                                            onClick={() => {
                                                setToggle((prev) => !prev)
                                            }}
                                            className="close">
                                            <img src={close} alt="close" />
                                        </span>
                                    </div>


                                    <div className="job_info">
                                        <ul>
                                            <li className="icon clock">32 minutes ago</li>
                                            <li className="icon dollar">$250 p/h</li>
                                            <li className="icon location line-1">Melbourne CBD</li>
                                            <li className="icon calendar">5 days</li>
                                        </ul>
                                    </div>
                                    <p className="commn_para">
                                        Sparky wanted for a quick job to hook up two new floors of an apartment building. Sparky wanted for a quick job to hook up two new floors of an apartment building. Sparky wanted for a quick job to hook up two new floors of an apartment building. Sparky wanted for a quick job to hook up two new floors of an apartment building.
                                    </p>
                                    <button className="fill_btn full_btn btn-effect">View Job details</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Chat;