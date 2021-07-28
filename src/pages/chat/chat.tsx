import React, { useState, useEffect } from 'react';

import notFound from '../../assets/images/not-found.png';
import dummy from '../../assets/images/u_placeholder.jpg';
// import search from '../../assets/images/main-search.png';
import chatSearch from '../../assets/images/search-chat.png';
// import more from '../../assets/images/icon-direction-right.png';
import viewMore from '../../assets/images/icon-direction-blue.png';
import menu from '../../assets/images/menu-line-blue.png';
import close from '../../assets/images/ic-cancel-blue.png';

import { auth, db } from '../../services/firebase';
import { setShowToast, setLoading } from '../../redux/common/actions';
import { formatDateTime } from '../../utils/common';
import { format, formatRelative, lightFormat } from 'date-fns';
import {
    firebaseSignUpWithEmailPassword,
    createRoom,
    checkRoomExist,
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
    // const [initializing, setInitializing] = useState<boolean>(true);
    // firebase authenticated user details
    // const [user, setUser] = useState<any>(() => auth.currentUser);
    const [inBoxData, setInBoxData] = useState<any>([]);
    const [filterInBoxData, setFilterInBoxData] = useState<any>([]);
    const [isNoRecords, setIsNoRecords] = useState<boolean>(false);
    const [roomData, setRoomData] = useState<any>({});
    const [roomId, setRoomId] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchActive, setSearchActive] = useState(false);
    const [isInitialLoader, setIsInitialLoader] = useState(true);

    const { tradieId, builderId, jobName, jobId } = props.history?.location?.state ? props.history?.location?.state : { tradieId: '', builderId: '', jobName: '', jobId: '' };

    useEffect(() => {
        console.log("Calling Did Mount");
        console.log("roomId:: from didmout", selectedRoomID);
        (async () => {
            setLoading(true);
            if (tradieId && builderId && jobName && jobId) {
                await setInitialItems();
            }
            await getFirebaseInboxData(onUpdateofInbox);
            // debugger;
        })();

        return () => {
            // debugger;
            stopListeningOfRoom(selectedRoomID);
            selectedRoomID = '';
        }
    }, []);

    const setInitialItems = async () => {
        const roomID: string = `${jobId}_${tradieId}_${builderId}`;
        selectedRoomID = roomID;
        if (await checkRoomExist(roomID)) {
            return;
        } else {
            await createRoom(jobId, tradieId, builderId, jobName);
        }
    }

    const onUpdateofInbox = async (res: any) => {
        console.log("resources::", res);
        console.log("roomId::", selectedRoomID);
        if (res.length === 0) {
            setIsNoRecords(true);
            if (isInitialLoader) {
                setIsInitialLoader(false);
                setLoading(false);
            }
            return;
        }
        setIsNoRecords(false);

        setInBoxData(res);
        if (res.length > 0 && selectedRoomID === '') {
            selectedRoomID = res[0].roomId;
            setRoomId(res[0].roomId);
            if (res[0] && res[0]?.unreadMessages > 0) {
                res[0].unreadMessages = 0;
                resetUnreadCounter(res[0].roomId);
            }
            setRoomData(res[0]);
            return;
            // fetchJobDetail(res[0].item?.jobId);
        }

        if (res.length > 0) {
            let itemObj = res.find((x: any) => x.roomId == selectedRoomID);

            if (itemObj && itemObj?.unreadMessages > 0) {
                itemObj.unreadMessages = 0;
                resetUnreadCounter(itemObj.roomId);
            }
            setRoomData(itemObj);
        }
    }

    // useEffect(() => {
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

    const getRoomDetails = async (item: any) => {
        console.log("Get Selected Item", item.itemId);
        stopListeningOfRoom(selectedRoomID);
        selectedRoomID = item.roomId;
        setRoomId(item.roomId);
        setRoomData(item);
        // fetchEquipmentDetail(item.itemId);
        resetUnreadCounter(item.roomId);
    }

    useEffect(() => {
        if (searchQuery) {
            let filteredVal = inBoxData.filter((item: any) => item.oppUserInfo?.name?.toLowerCase()?.includes(searchQuery.toLowerCase()));
            console.log('filteredVal: ', filteredVal, "searchQuery", searchQuery);
            setFilterInBoxData(filteredVal);
        }
        if (inBoxData.length && isInitialLoader) {
            setLoading(false);
            setIsInitialLoader(false);
        }
    }, [searchQuery, inBoxData]);

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
                            <div className={`search_bar ${searchActive ? 'active' : ''}`} onClick={() => { setSearchActive(true) }}>
                                <input type="text" placeholder="Search" value={searchQuery} onChange={(e: any) => setSearchQuery(e.target.value.trimLeft())} />
                                <span className="detect_icon_ltr">
                                    <img src={chatSearch} alt="search" />
                                </span>
                            </div>
                            <ul className="chat_list">
                                {searchQuery ? filterInBoxData.length === 0 ? (
                                    <li>
                                        <a href="javascript:void(0)" className="chat">
                                            <div className="detail">
                                                <span className="inner_title line-1">No Record Found</span>
                                            </div>
                                        </a>
                                    </li>
                                ) : filterInBoxData.map((item: any) => {
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
                                                    {item.lastMsg?.messageTimestamp && <span className="date_time">{formatDateTime(item.lastMsg?.messageTimestamp, 'inboxTime')}</span>}
                                                    {(selectedRoomID === item.roomId) ? null : item.unreadMessages === 0 ? null : <span className="count">{item.unreadMessages}</span>}
                                                </div>
                                            </a>
                                        </li>
                                    )
                                }) : inBoxData.length > 0 ? inBoxData.map((item: any) => {
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
                                                    {item.lastMsg?.messageTimestamp && <span className="date_time">{formatDateTime(item.lastMsg?.messageTimestamp, 'inboxTime')}</span>}
                                                    {(selectedRoomID === item.roomId) ? null : item.unreadMessages === 0 ? null : <span className="count">{item.unreadMessages}</span>}
                                                </div>
                                            </a>
                                        </li>
                                    )
                                }) : props.isLoading ? null : (
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
                    {isInitialLoader ? null : <UserMessages roomId={selectedRoomID} roomData={roomData} isNoRecords={isNoRecords} history={props.history} isLoading={props.isLoading} />}
                </div>
            </div>
        </div >
    )
}

export default Chat;