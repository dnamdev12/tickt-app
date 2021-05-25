import React, { useState } from 'react';
import media from '../../../assets/images/portfolio-placeholder.jpg';
import close from '../../../assets/images/icon-close-1.png';
import addMedia from "../../../assets/images/add-image.png";

interface Props {

}

const DeclineMilestone = (props: Props) => {
    return (
        <div className="flex_row">
            <div className="flex_col_sm_7">
                <div className="relate">
                    <button className="back"></button>
                    <span className="xs_sub_title">Job name</span>
                </div>
                <span className="sub_title">Decline milestone</span>
                <p className="commn_para">Please write your reason for declining the milestone</p>
                <div className="form_field">
                    <label className="form_label">Your reason</label>
                    <div className="text_field">
                        <textarea placeholder="Your reason..."></textarea>
                    </div>
                    {/* <span className="char_count"></span> */}
                </div>
                <div className="upload_img_video">
                    <figure className="img_video">
                        <img src={media} alt="media" />
                        <img src={close} alt="remove" className="remove" />
                    </figure>
                    <figure className="img_video">
                        <img src={media} alt="media" />
                    </figure>
                    <label className="upload_media" htmlFor="upload_img_video">
                        <img src={addMedia} alt="" />
                    </label>
                    <input
                        type="file"
                        accept="image/png,image/jpg,image/jpeg,.pdf, .doc, video/mp4, video/wmv, video/avi"
                        style={{ display: "none" }}
                        id="upload_img_video"
                    />
                </div>
                <button className="fill_btn full_btn">Send</button>
            </div>
        </div>
    )
}

export default DeclineMilestone;
