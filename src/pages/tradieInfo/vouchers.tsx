import React, { useState } from 'react'
import dummy from '../../assets/images/u_placeholder.jpg';
import vouch from '../../assets/images/ic-template.png';
import cancel from '../../assets/images/ic-cancel.png';
import remove from "../../assets/images/icon-close-1.png";
import addMedia from "../../assets/images/add-image.png";
import Modal from '@material-ui/core/Modal';
import { withRouter } from 'react-router-dom';

const Vouchers = (props: any) => {
    const [toggle, setToggle] = useState(false);
    const [stateData, setStateData] = useState({});

    console.log({ props });

    return (
        <div className="app_wrapper">
            <div className="section_wrapper">
                <div className="custom_container">
                    <div className="flex_row">
                        <div className="flex_col_sm_6">
                            <div className="relate">
                                <button
                                    onClick={() => {
                                        let path: any = props.location.state.path;
                                        props.history.push(`tradie-info${path}`);
                                    }}
                                    className="back"></button>
                                <span className="title">
                                    {'2 Vouchers'}
                                </span>
                            </div>
                        </div>
                        <div className="flex_col_sm_6 text-right">
                            <button
                                onClick={() => { setToggle((prev: any) => !prev) }}
                                className="fill_btn btn-effect add_vouch">
                                {'+ Leave a voucher'}
                            </button>
                        </div>
                        <Modal
                            className="custom_modal"
                            open={toggle}
                            onClose={() => {
                                setToggle((prev: any) => !prev)
                            }}
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                        >
                            <div className="custom_wh profile_modal vouch_modal" data-aos="zoom-in" data-aos-delay="30" data-aos-duration="1000">
                                <div className="heading">
                                    <span className="sub_title">Leave a voucher</span>
                                    <span className="info_note">Upload the vouch and write the description.</span>
                                    <button className="close_btn">
                                        <img src={cancel} alt="cancel" />
                                    </button>
                                </div>
                                <div className="inner_wrap">
                                    <div className="inner_wrappr">
                                        <div className="form_field">
                                            <label className="form_label">Job Description</label>
                                            <div className="text_field">
                                                <textarea placeholder="Enter Description..."></textarea>
                                            </div>
                                            <span className="error_msg"></span>
                                        </div>
                                        <div className="upload_img_video">
                                            <figure className="img_video">
                                                <img src={dummy} alt="img" />
                                                <img src={remove} alt="remove" className="remove" />
                                            </figure>
                                            <figure className="img_video">
                                                <img src={dummy} alt="img" />
                                                <img src={remove} alt="remove" className="remove" />
                                            </figure>
                                            <figure className="img_video">
                                                <img src={dummy} alt="img" />
                                                <img src={remove} alt="remove" className="remove" />
                                            </figure>
                                            <figure className="img_video">
                                                <img src={dummy} alt="img" />
                                                <img src={remove} alt="remove" className="remove" />
                                            </figure>
                                            <figure className="img_video">
                                                <img src={dummy} alt="img" />
                                                <img src={remove} alt="remove" className="remove" />
                                            </figure>
                                            <label className="upload_media" htmlFor="upload_img_video">
                                                <img src={addMedia} alt="add" />
                                            </label>
                                            <input
                                                type="file"
                                                accept="image/png,image/jpg,image/jpeg,.pdf, .doc, video/mp4, video/wmv, video/avi"
                                                style={{ display: "none" }}
                                                id="upload_img_video"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="bottom_btn custom_btn">
                                    <button className="fill_btn full_btn btn-effect">Save changes</button>
                                </div>
                            </div>

                        </Modal>
                    </div>

                    <div className="flex_row">
                        <div className="flex_col_sm_3">
                            <div className="review_card vouchers">
                                <div className="pic_shot_dtl">
                                    <figure className="u_img">
                                        <img src={dummy} alt="user-img" />
                                    </figure>
                                    <div className="name_wrap">
                                        <span className="user_name" title="Mark Spencerman">Mark Spencerman</span>
                                        <span className="date">November 2020</span>
                                    </div>
                                </div>
                                <p className="commn_para" title="">I give a guarantee for the work of this builder. This is a vouch from our company.</p>
                                <div className="vouch">
                                    <figure className="vouch_icon">
                                        <img src={vouch} alt="vouch" />
                                    </figure>
                                    <a className="link">Vouch for John Oldman</a>
                                </div>
                            </div>
                        </div>
                        <div className="flex_col_sm_3">
                            <div className="review_card vouchers">
                                <div className="pic_shot_dtl">
                                    <figure className="u_img">
                                        <img src={dummy} alt="user-img" />
                                    </figure>
                                    <div className="name_wrap">
                                        <span className="user_name" title="Mark Spencerman">Mark Spencerman</span>
                                        <span className="date">November 2020</span>
                                    </div>
                                </div>
                                <p className="commn_para" title="">I give a guarantee for the work of this builder. This is a vouch from our company.</p>
                                <div className="vouch">
                                    <figure className="vouch_icon">
                                        <img src={vouch} alt="vouch" />
                                    </figure>
                                    <a className="link">Vouch for John Oldman</a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default withRouter(Vouchers);