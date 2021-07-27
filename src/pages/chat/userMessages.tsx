import React, { useState, useEffect, useRef } from 'react';
import { getJobDetails } from '../../redux/jobs/actions';
import storageService from '../../utils/storageService';

import notFound from '../../assets/images/not-found.png';
import dummy from '../../assets/images/u_placeholder.jpg';
import viewMore from '../../assets/images/icon-direction-blue.png';
import close from '../../assets/images/ic-cancel-blue.png';
import sendMedia from '../../assets/images/ic-media.png';
import sendBtn from '../../assets/images/ic-send.png';
import pageLoader from "../../assets/images/page-loader.gif";
import loader from '../../assets/images/loader.gif';

import moment from 'moment';
import { formatDateTime, renderTime } from '../../utils/common';
import { setShowToast, setLoading } from '../../redux/common/actions';
import { onFileUpload } from '../../redux/auth/actions';
import {
    getMessagesOfRoom,
    sendTextMessage,
    sendImageVideoMessage,
} from '../../services/firebase';

let lastDate = '';
const docTypes: Array<any> = ["jpeg", "jpg", "png", "mp4", "wmv", "avi"];

const UserMessages = (props: any) => {
    const divRref = useRef<HTMLDivElement>(null);
    const [userId] = useState<string>(storageService.getItem('userInfo')?._id);
    const [toggle, setToggle] = useState<boolean>(false);
    const [jobDetailLoader, setJobDetailLoader] = useState<boolean>(false);
    const [currentJobDetails, setCurrentJobDetails] = useState<any>(null);
    const [chats, setChats] = useState<Array<any>>([]);
    const [newChat, setNewChat] = useState<any>('');
    const [messageText, setMessageText] = useState<any>('');
    const [messages, setMessages] = useState<Array<any>>([]);
    const [isDocUploading, setIsDocUploading] = useState<boolean>(false);

    useEffect(() => {
        if (props.roomId !== '') { getMessagesOfRoom(props.roomId, onReceiveOfNewMsg); }
        setCurrentJobDetails(null);
        setToggle(false);
    }, [props.roomId, props.roomData]);

    useEffect(() => {
        scrollToBottom();
    });

    const scrollToBottom = () => {
        if (null !== divRref.current) {
            console.log("divRref.current", divRref.current)
            const scroll =
                divRref.current.scrollHeight -
                divRref.current.clientHeight;
            // divRref.current.scrollIntoView({ behavior: "smooth" })
            divRref.current.scrollTo(0, scroll);
        }
        // const scrollHeight = divRref.current.scrollHeight;
        // const height = divRref.current.clientHeight;
        // const maxScrollTop = scrollHeight - height;
        // divRref.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }

    const onReceiveOfNewMsg = (arrmsg: any) => {
        setMessages(arrmsg);
        // setIsLoading(false);
    }

    const sendMessage = async () => {
        //setIsLoading(true);
        if (messageText || messageText.trim() !== "") {
            sendTextMessage(props.roomId, messageText);
            setMessageText('');
            // await sendTextMessage(props.roomId, messageText); 
        }
    }

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            console.log('do validate');
            sendMessage();
        }
    }

    const sendImageVideoMsg = async (url: string, msgType: string) => {
        //setIsLoading(true);
        if (url && url !== '')
            await sendImageVideoMessage(props.roomId, url, msgType);
        setMessageText('');
    }


    const fetchJobDetail = async (jobId: any) => {
        setJobDetailLoader(true);
        const res = await getJobDetails(jobId);
        if (res.success) {
            const jobInfo = {
                jobDescription: res.data?.details || '',
                jobId: res.data?.jobId || '',
                jobName: res.data?.jobName || '',
                amount: res.data?.amount || '',
                locationName: res.data?.locationName || '',
                fromDate: res.data?.fromDate || '',
                toDate: res.data?.toDate || '',
                duration: res.data?.duration || '',
                status: res.data?.status || '',
            }
            setCurrentJobDetails(jobInfo);
            setJobDetailLoader(false);
        }
    }

    const singleMessage = (data: any) => {
        if (data.senderId == userId) {
            return (<div className="sender_message" key={data.messageId}>
                <p>{data.messageText}</p>
            </div>)
        } else {
            return (
                <div className="recive_message" key={data.messageId}>
                    <p>{data.messageText}</p>
                </div>
            )
        }
    }

    const renderTextMsg = (msg: any) => {
        // let curDate = moment(data.messageTimestamp).format('dd-mm-yyyy');
        let curDate = formatDateTime(msg.messageTimestamp, 'day');
        const messageClass = msg.senderId === userId ? 'message' : 'message recive_msg';
        if (lastDate === '' || lastDate !== curDate) {
            lastDate = curDate;
            return (
                <>
                    <div className="date_time">
                        {/* <span>Today</span> */}
                        <span>{curDate}</span>
                    </div>
                    <div className={`${messageClass}`}>
                        <p className={`${msg.senderId === userId ? 'mark' : ''}`}>{msg.messageText}
                            <span className="time">{formatDateTime(msg.messageTimestamp, "time")}</span>
                        </p>
                    </div>
                </>
            )
        } else
            return (
                <div className={`${messageClass}`}>
                    <p className={`${msg.senderId === userId ? 'mark' : ''}`}>{msg.messageText}
                        <span className="time">{formatDateTime(msg.messageTimestamp, "time")}</span>
                    </p>
                </div>
            )
    }

    const renderImageMsg = (msg: any) => {
        let curDate = formatDateTime(msg.messageTimestamp, 'day');
        const messageClass = msg.senderId === userId ? 'message' : 'message recive_msg';
        if (lastDate === '' || lastDate !== curDate) {
            lastDate = curDate;
            return (
                <>
                    <div className="date_time">
                        <span>{curDate}</span>
                    </div>
                    <div className={`${messageClass}`}>
                        <figure className="media">
                            <img src={msg.mediaUrl || notFound} alt="media" />
                            <span className="time">{formatDateTime(msg.messageTimestamp, "time")}</span>
                        </figure>
                    </div>
                </>
            )
        } else
            return (
                <div className={`${messageClass}`}>
                    <figure className="media">
                        <img src={msg.mediaUrl || notFound} alt="media" />
                        <span className="time">{formatDateTime(msg.messageTimestamp, "time")}</span>
                    </figure>
                </div>
            )
    }

    const renderVideoMsg = (msg: any) => {
        let curDate = formatDateTime(msg.messageTimestamp, 'day');
        const messageClass = msg.senderId === userId ? 'message' : 'message recive_msg';
        if (lastDate === '' || lastDate !== curDate) {
            lastDate = curDate;
            return (
                <>
                    <div className="date_time">
                        <span>{curDate}</span>
                    </div>
                    <div className={`${messageClass}`}>
                        <figure className="media">
                            <video src={msg.mediaUrl || notFound} />
                            <span className="time">{formatDateTime(msg.messageTimestamp, "time")}</span>
                        </figure>
                    </div>
                </>
            )
        } else
            return (
                <div className={`${messageClass}`}>
                    <figure className="media">
                        <video src={msg.mediaUrl || notFound} />
                        <span className="time">{formatDateTime(msg.messageTimestamp, "time")}</span>
                    </figure>
                </div>
            )
    }

    const displayMessages = (msg: any) => {
        switch (msg.messageType) {
            case "text":
                return renderTextMsg(msg);
            case "image":
                return renderImageMsg(msg);
            case "video":
                return renderVideoMsg(msg);
        }
    }

    const handleUpload = async (e: any) => {
        const formData = new FormData();
        const newFile = e.target.files[0];
        var fileType = (newFile?.type?.split('/')[1])?.toLowerCase();
        console.log('fileType: ', fileType);

        var selectedFileSize = newFile?.size / 1024 / 1024; // size in mib

        if (docTypes.indexOf(fileType) < 0 || (selectedFileSize > 10)) {
            setShowToast(true, "The file must be in proper format or size.")
            return;
        }
        // debugger;

        formData.append('file', newFile);
        setIsDocUploading(true);
        let check_type: any = ["jpeg", "jpg", "png"].includes(fileType) ? 1 : ["mp4", "wmv", "avi"].includes(fileType) ? 2 : null;
        const res = await onFileUpload(formData);
        if (res.success && res.imgUrl) {
            if (check_type === 1) {
                sendImageVideoMsg(res.imgUrl, "image");
            } else if (check_type === 2) {
                sendImageVideoMsg(res.imgUrl, "video");
            } else {
                setShowToast(true, "There is some technical issue");
            }
            setIsDocUploading(false);
            // setLocalFiles((prev: any) => ({ ...prev, [filesUrl?.length]: URL.createObjectURL(newFile) }));
        }
    }

    console.log(props.roomData, "props.roomData")

    return (props.isNoRecords ? (
        <div className="detail_col">
            <div className="flex_row">
                <div>No Record Found</div>
            </div>
        </div>
    ) : (<div className="detail_col">
        <div className="flex_row">
            <div className={`chat_col ${toggle ? 'active' : ''}`}>
                <div className="chat_user">
                    <figure className="u_img">
                        <img src={props.roomData?.oppUserInfo?.image || dummy} alt="user-img" />
                    </figure>
                    <span className="name"
                        onClick={() => {
                            if (storageService.getItem('userType') === 2) {
                                props.history.push(`/tradie-info?tradeId=${props.roomData?.oppUserInfo?.userId}&type=1`)
                            } else {
                                props.history.push(`/builder-info?builderId=${props.roomData?.oppUserInfo?.userId}&type=2`)
                            }
                        }}>{props.roomData?.oppUserInfo?.name}</span>
                    {!toggle && <span
                        onClick={() => {
                            setToggle(true);
                            if (currentJobDetails) return;
                            fetchJobDetail(props.roomData?.jobId);
                        }}
                        className="view_detail">View Job Details
                        <img src={viewMore} alt="view-more" />
                    </span>}
                </div>
                <div className="message_wrapr" ref={divRref}>
                    {messages.length > 0 && messages.map((msg: any) => {
                        return (
                            displayMessages(msg)
                        )
                    })}
                </div>

                <div className="send_msg">
                    <div className="text_field">
                        {/* <span className="detect_icon_ltr">
                            <img src={sendMedia} alt="media" />
                        </span> */}
                        <label className="upload_item" htmlFor="upload_item">
                            <span className="detect_icon_ltr">
                                <img src={sendMedia} alt="media" />
                            </span>
                        </label>
                        <input
                            id="upload_item"
                            className="hide"
                            type="file"
                            accept="image/png,image/jpg,image/jpeg, video/mp4, video/wmv, video/avi"
                            onChange={handleUpload}
                            disabled={isDocUploading}
                        />
                        <textarea placeholder="Message.."
                            onKeyDown={handleKeyDown}
                            value={messageText} onChange={(e) => setMessageText(e.target.value)} />
                        <span className="detect_icon">
                            <img src={sendBtn} alt="send" onClick={sendMessage} />
                        </span>
                    </div>
                </div>
            </div>

            {(toggle && jobDetailLoader) ? (
                <div className="view_detail_col">
                    <div className="no_record">
                        <figure>
                            <img src={loader} alt="loader" width="130px" />
                        </figure>
                    </div>
                </div>
            ) : toggle ? (
                <div className="view_detail_col">
                    <div className="f_spacebw relative">
                        <span className="title line-2 pr-20">{currentJobDetails?.jobName}</span>
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
                            <li className="icon clock">{renderTime(currentJobDetails?.fromDate, currentJobDetails?.toDate)}</li>
                            <li className="icon dollar">{currentJobDetails?.amount}</li>
                            <li className="icon location line-1">{currentJobDetails?.locationName}</li>
                            <li className="icon calendar">{currentJobDetails?.duration}</li>
                        </ul>
                    </div>

                    <p className="commn_para">
                        {currentJobDetails?.jobDescription}
                    </p>

                    <button className="fill_btn full_btn btn-effect"
                        onClick={() => {
                            if (storageService.getItem('userType') === 1) {
                                props.history.push(`/job-details-page?jobId=${currentJobDetails?.jobId}&redirect_from=jobs&isActive=on`);
                            } else {
                                let urlEncode: any = window.btoa(`?jobId=${currentJobDetails?.jobId}&status=${currentJobDetails?.status}&edit=true&activeType=active`)
                                props.history.push(`/job-detail?${urlEncode}`);
                            }
                        }}>View Job details</button>
                </div>
            ) : null}
        </div>
    </div >)
    )
}

export default UserMessages;
