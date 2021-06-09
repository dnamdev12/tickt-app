import React, { ReactElement } from 'react'
import dummy from '../../../assets/images/u_placeholder.jpg';
import approved from '../../../assets/images/approved.png';
import waiting from '../../../assets/images/exclamation.png';
import close from '../../../assets/images/icon-close-1.png';
import addMedia from "../../../assets/images/add-image.png";
import noDataFound from "../../../assets/images/no-search-data.png";

interface Props {

}

export default function lodgeDispute({ }: Props): ReactElement {
    return (
        <div className="flex_row">
            <div className="flex_col_sm_8">
                <div className="relate">
                    <button className="back"></button>
                    <span className="xs_sub_title">Wire up circuit box</span>
                </div>
                <span className="sub_title">Lodge dispute</span>
                <p className="commn_para">Enter reason text</p>

                <div className="reason_wrap">
                    <div className="f_spacebw">
                        <div className="checkbox_wrap agree_check">
                            <input name="Reason" className="filter-type filled-in" type="checkbox" id="reason1" />
                            <label htmlFor="reason1">Reason</label>
                        </div>
                        <div className="checkbox_wrap agree_check">
                            <input name="Reason" className="filter-type filled-in" type="checkbox" id="reason2" />
                            <label htmlFor="reason2">Reason</label>
                        </div>
                    </div>

                    <div className="f_spacebw">
                        <div className="checkbox_wrap agree_check">
                            <input name="Reason" className="filter-type filled-in" type="checkbox" id="reason3" />
                            <label htmlFor="reason3">Reason</label>
                        </div>
                        <div className="checkbox_wrap agree_check">
                            <input name="Reason" className="filter-type filled-in" type="checkbox" id="reason4" />
                            <label htmlFor="reason4">Reason</label>
                        </div>
                    </div>
                </div>

            </div>

            <div className="flex_col_sm_9">
                <div className="form_field">
                    <label className="form_label">Details</label>
                    <div className="text_field">
                        <textarea placeholder="It’s really bad work, because..."></textarea>
                    </div>
                    <span className="error_msg"></span>
                </div>
                <div className="upload_img_video">
                    <label className="upload_media" htmlFor="upload_img_video">
                        <img src={addMedia} alt="add-media" />
                    </label>
                    <input
                        type="file"
                        accept="image/png,image/jpg,image/jpeg,.pdf, .doc, video/mp4, video/wmv, video/avi"
                        style={{ display: "none" }}
                        id="upload_img_video"
                    />
                </div>
                <button className="fill_btn full_btn btn-effect">Send</button>
            </div>
        </div>
    )
}


{/* <div className="app_wrapper">
<div className="section_wrapper">
    <div className="custom_container"> */}