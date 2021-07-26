import React, { useState, useEffect } from 'react';

import notFound from '../../assets/images/not-found.png';
import dummy from '../../assets/images/u_placeholder.jpg';
// import search from '../../assets/images/main-search.png';
import chatSearch from '../../assets/images/search-chat.png';
// import more from '../../assets/images/icon-direction-right.png';
import viewMore from '../../assets/images/icon-direction-blue.png';
import menu from '../../assets/images/menu-line-blue.png';
import close from '../../assets/images/ic-cancel-blue.png';
import sendMedia from '../../assets/images/ic-media.png';
import sendBtn from '../../assets/images/ic-send.png';
import loader from "../../assets/images/page-loader.gif";

import { auth, db } from '../../services/firebase';
import { setShowToast } from '../../redux/common/actions';
import { inboxFormatDateTime } from '../../utils/common';
import { format, formatRelative, lightFormat } from 'date-fns';
import {
    firebaseSignUpWithEmailPassword,
    createRoom,
    checkRoomExist,
    createJob,
    getFirebaseInboxData,
    stopListeningOfRoom,
    resetUnreadCounter,
} from '../../services/firebase';

import UserMessages from './userMessages';

interface PropTypes {
    builderProfile: any,
    tradieProfileData: any,
    isLoading: boolean,
    history: any,
}

let selectedRoomID = '';

const Chat = (props: PropTypes) => {
    const [initializing, setInitializing] = useState<boolean>(true);
    // firebase authenticated user details
    const [user, setUser] = useState<any>(() => auth.currentUser);
    const [inBoxData, setInBoxData] = useState<any>([]);
    const [isNoRecords, setIsNoRecords] = useState<boolean>(false);
    const [roomData, setRoomData] = useState<any>({});
    const [roomId, setRoomId] = useState<string>('');

    const { tradieId, builderId, jobName, jobId } = props.history?.location?.state ? props.history?.location?.state : { tradieId: '', builderId: '', jobName: '', jobId: '' };

    // const { uid, displayName, photoURL, text } = user;

    useEffect(() => {
        console.log("Calling Did Mount");
        console.log("roomId:: from didmout", selectedRoomID);

        if (tradieId && builderId && jobName && jobId) {
            setInitialItems();
        }

        getFirebaseInboxData(onUpdateofInbox);

        return () => {
            // debugger;
            stopListeningOfRoom(selectedRoomID);
        }
    }, []);

    const setInitialItems = async () => {
        const roomID: string = `${jobId}_${tradieId}_${builderId}`;
        selectedRoomID = roomId;
        if (await checkRoomExist(roomID)) {
            return;
        } else {
            //create room
            createRoom(jobId, tradieId, builderId, jobName);
        }
    }

    const onUpdateofInbox = (res: any) => {
        console.log("resources::", res);
        console.log("roomId::", selectedRoomID);
        if (res.length === 0) {
            setIsNoRecords(true);
            // setIsLoading(false);
            return;
        }
        setIsNoRecords(false);

        setInBoxData(res);
        // setForceupdate(!forceUpdate)
        if (res.length > 0 && selectedRoomID === '') {
            selectedRoomID = res[0].roomId;
            setRoomId(res[0].roomId);
            setRoomData(res[0]);
            // setRoomData(res[0].item);
            // fetchJobDetail(res[0].item?.jobId);
        }

        if (res.length > 0) {
            let itemObj = res.find((x: any) => x.roomId == selectedRoomID);

            if (itemObj && itemObj?.unreadMessages > 0) {
                itemObj.unreadMessages = 0;
                resetUnreadCounter(itemObj.roomId);
            }
        }
    }

    // useEffect(() => {
    // setTradieInfo();
    // setBuilderInfo();
    // let unsubscribe = auth.onAuthStateChanged(user => {
    //     if (user) {
    //         setUser(user);
    //         chatsRef.doc(chatDocumentId).get().then(doc => {
    //             if (doc.exists) {
    //                 setIsChatAlreadyExist(true);
    //             }
    //         }).catch((error) => {
    //             console.log("Error getting document:", error);
    //         });
    //     } else {
    //         setUser(false);
    //     }
    //     if (initializing) {
    //         setInitializing(false);
    //     }
    // });

    // return unsubscribe;
    // }, [initializing]);

    useEffect(() => {
        console.log("roomid useeefffect ::", selectedRoomID);

    }, [roomId]);

    console.log(props.history, "history", roomId, "roomId", roomData, "roomData", selectedRoomID, "selectedRoomID");

    // const handleSubmit = async (event: any) => {
    //     event.preventDefault();
    //     try {
    //         if (isChatAlreadyExist) {
    //             await chatsRef.doc(chatDocumentId).collection('messages').add({
    //                 text: newChat,
    //                 createdAt: moment().toDate(),
    //                 uid: user?.uid,
    //                 // photoURL
    //             });
    //             setNewChat('');
    //         } else {
    //             await chatsRef.doc(chatDocumentId).set({
    //                 // jobId: jobId,
    //                 // jobName: jobName,
    //                 createdAt: moment().toDate(),
    //             });
    //             await chatsRef.doc(chatDocumentId).collection('messages').add({
    //                 text: newChat,
    //                 createdAt: moment().toDate(),
    //                 uid: user?.uid
    //             });
    //             setIsChatAlreadyExist(true);
    //             setNewChat('');
    //             await usersRef.doc('60f575ba18562930191ff6fa').update({
    //                 // oneToOneChatIds: [...tradieCloudInfo.ongoingChatIds, chatDocumentId]
    //             });
    //             await usersRef.doc('60f56f6395672856a5aebdd3').update({
    //                 // oneToOneChatIds: [...builderCloudInfo.ongoingChatIds, chatDocumentId]
    //             });
    //         }
    //     } catch (error) {
    //     }
    // }

    const getRoomDetails = async (item: any) => {
        console.log("Get Selected Item", item.itemId);
        stopListeningOfRoom(selectedRoomID);
        selectedRoomID = item.roomId;
        setRoomId(item.roomId);
        setRoomData(item);
        // fetchEquipmentDetail(item.itemId);
        resetUnreadCounter(item.roomId);
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
                            {/* <span className="title" onClick={() => firebaseSignUpWithEmailPassword({
                                email: "test-tradie@yopmail.com",
                                password: 'R^4-3Wx?VTRufV=$B_pM9HP5GxqQF@',
                                id: "60a35096de60d01d99d3ae56",
                                fullName: "Test Tradie",
                                user_type: 1
                            })  }>Signup</span> */}
                            <div className="search_bar">
                                <input type="text" placeholder="Search" />
                                <span className="detect_icon_ltr">
                                    <img src={chatSearch} alt="search" />
                                </span>
                            </div>
                            <ul className="chat_list">
                                {inBoxData.length > 0 ? inBoxData.map((item: any) => {
                                    return (
                                        <li onClick={() => { getRoomDetails(item) }}>
                                            <a href="javascript:void(0)" className={`chat ${selectedRoomID === item.roomId ? 'active' : ''}`}>
                                                <figure className="u_img">
                                                    <img src={item.oppUserInfo?.image || dummy} alt="img" />
                                                </figure>
                                                <div className="detail">
                                                    <span className="inner_title line-1">{item.oppUserInfo?.name}</span>
                                                    <span className="inner_title job line-1">{item.jobName}</span>
                                                    <p className="commn_para line-1">{item.lastMsg?.messageText}</p>
                                                    <span className="date_time">{inboxFormatDateTime(item.lastMsg?.messageTimestamp, 'inboxTime')}</span>
                                                    {(selectedRoomID === item.roomId && item.unreadMessages == 0) ? null : <span className="count">{item.unreadMessages}</span>}
                                                </div>
                                            </a>
                                        </li>
                                    )
                                }) : (
                                    <li>
                                        <a href="javascript:void(0)" className="chat">
                                            <div className="detail">
                                                <span className="inner_title line-1">No Record Found</span>
                                            </div>
                                        </a>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                    <UserMessages roomId={selectedRoomID} roomData={roomData} isNoRecords={isNoRecords} />
                </div>
            </div>
        </div >
    )
}

export default Chat;