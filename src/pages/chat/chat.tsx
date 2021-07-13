import React, { useEffect, useState } from 'react';

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


import { auth } from '../../App';

const Chat = () => {
    const [toggle, setToggle] = useState(false);



    const signup = ({ email, password, fullName }: any) => {
        let promise = new Promise(function (resolve, reject) {
            auth.createUserWithEmailAndPassword(email, password)
                .then((ref: any) => {
                    ref.user.updateProfile({
                        displayName: fullName,
                    });
                    resolve(ref);
                })
                .catch((error) => reject(error));
        });
        return promise;
    };


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
                            <span className="title">Login</span>
                            <span
                                onClick={() => {
                                    signup({
                                        email: 'john-builder@gmail.com',
                                        password: 'John@123',
                                        fullName: 'John'
                                    })
                                }}
                                className="title">Sign up</span>
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
                                <li>
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
                                </li>
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
                                    <div className="date_time">
                                        <span>Today</span>
                                        <span>09.08.2020</span>
                                    </div>
                                    <div className="message">
                                        <figure className="media">
                                            <img src={notFound} alt="media" />
                                            <span className="time">10:32</span>
                                        </figure>
                                    </div>
                                    <div className="message">
                                        <p className="mark">Completed  job milestone. Switches for lighting are all along the top row, appliances in the bottom row
                                            <span className="time">10:32</span>
                                        </p>
                                    </div>
                                    <div className="message">
                                        <p>Circuit board wiring milestone completed
                                            <span className="time">10:32</span>
                                        </p>
                                    </div>
                                    <div className="message recive_msg">
                                        <p>Great Thanks !
                                            <span className="time">10:32</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="send_msg">
                                    <div className="text_field">
                                        <span className="detect_icon_ltr">
                                            <img src={sendMedia} alt="media" />
                                        </span>
                                        <textarea placeholder="Message.."></textarea>
                                        <span className="detect_icon">
                                            <img src={sendBtn} alt="send" />
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
        </div>
    )
}

export default Chat;