import React, { useState, useEffect } from 'react'
import dummy from '../../assets/images/u_placeholder.jpg';
import vouch from '../../assets/images/ic-template.png';
import cancel from '../../assets/images/ic-cancel.png';
import remove from "../../assets/images/icon-close-1.png";
import addMedia from "../../assets/images/add-image.png";
import Modal from '@material-ui/core/Modal';
import { withRouter } from 'react-router-dom';

import {ChooseJob} from '../../redux/jobs/actions'

import Select from 'react-select';

const AddVoucher = () => {
    const [toggle, setToggle] = useState(false);
    const [jobsList, setJobsList] = useState([]);
    const [reactSelect, setReactSelect] = useState({});
    const [jobDescription, setJobDesciption] = useState('');

    useEffect(() => {
        prefetch();
    }, [])

    const prefetch = async () => {
        let res_jobs: any = await ChooseJob({ page: 1 });

        if (res_jobs?.success) {
            let list_data: any = res_jobs.data;
            if (list_data?.length) {
                let item = list_data[0];
                setReactSelect({ label: item.jobName, value: item?.jobId })
            }
            setJobsList(list_data)
        }
    }

    return (
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
                            <label className="form_label">Job</label>
                            <div className="text_field">
                                <Select
                                    className="select_menu"
                                    value={reactSelect}
                                    options={jobsList.map((item: any) => ({ label: item?.jobName, value: item?.jobId }))}
                                    onChange={(item: any) => {
                                        setReactSelect(item);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="form_field">

                            <label className="form_label">
                                {'Job Description'}
                            </label>
                            <div className="text_field">
                                <textarea
                                    onChange={(e) => { setJobDesciption((e.target.value).trimLeft()) }}
                                    value={jobDescription}
                                    placeholder="Enter Description...">
                                </textarea>
                            </div>
                            <span className="error_msg"></span>
                        </div>
                        <div className="upload_img_video">
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

    )
}

export default AddVoucher;