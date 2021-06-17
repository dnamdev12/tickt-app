import React, { useState, useEffect } from 'react'
import dummy from '../../assets/images/u_placeholder.jpg';
import vouch from '../../assets/images/ic-template.png';
import cancel from '../../assets/images/ic-cancel.png';
import remove from "../../assets/images/icon-close-1.png";
import addMedia from "../../assets/images/add-image.png";
import Modal from '@material-ui/core/Modal';
import { withRouter } from 'react-router-dom';

import Select from 'react-select';

const VoucherDetail = () => {

    const [toggleRecommendation, setToggleRecommendation] = useState(false);

    
    return (
        <Modal
            className="custom_modal"
            open={toggleRecommendation}
            onClose={() => {
                setToggleRecommendation((prev: any) => !prev)
            }}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div className="custom_wh vouch_modal" data-aos="zoom-in" data-aos-delay="30" data-aos-duration="1000">
                <div className="heading">
                    <span className="sub_title">
                        {'Recommendation about work'}
                    </span>
                    <button className="close_btn">
                        <img src={cancel} alt="cancel" />
                    </button>
                </div>
                <div className="inner_wrap descr">
                    <div className="inner_wrappr">
                        <div className="form_field">
                            <span className="show_label"><b>Job position:</b> Write up circuit box</span>
                            <span className="show_label"><b>Trader:</b> John Oldman</span>
                        </div>
                        <p className="commn_para">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium, quisquam eius accusamus ab commodi facere. Cupiditate exercitationem necessitatibus deleniti consequuntur quod amet debitis. Placeat dolore sapiente, quia fuga error quidem?
                    </p>
                        <p className="commn_para">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium, quisquam eius accusamus ab commodi facere. Cupiditate exercitationem necessitatibus deleniti consequuntur quod amet debitis. Placeat dolore sapiente, quia fuga error quidem?
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium, quisquam eius accusamus ab commodi facere. Cupiditate exercitationem necessitatibus deleniti consequuntur quod amet debitis. Placeat dolore sapiente, quia fuga error quidem?
                    </p>
                        <p className="commn_para">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium, quisquam eius accusamus ab commodi facere. Cupiditate exercitationem necessitatibus deleniti consequuntur quod amet debitis. Placeat dolore sapiente, quia fuga error quidem?
                    </p>
                        <p className="commn_para">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium, quisquam eius accusamus ab commodi facere. Cupiditate exercitationem necessitatibus deleniti consequuntur quod amet debitis. Placeat dolore sapiente, quia fuga error quidem?
                    </p>
                        <p className="commn_para">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium, quisquam eius accusamus ab commodi facere. Cupiditate exercitationem necessitatibus deleniti consequuntur quod amet debitis. Placeat dolore sapiente, quia fuga error quidem?
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium, quisquam eius accusamus ab commodi facere. Cupiditate exercitationem necessitatibus deleniti consequuntur quod amet debitis. Placeat dolore sapiente, quia fuga error quidem?
                    </p>
                        <p className="commn_para">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium, quisquam eius accusamus ab commodi facere. Cupiditate exercitationem necessitatibus deleniti consequuntur quod amet debitis. Placeat dolore sapiente, quia fuga error quidem?
                    </p>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default VoucherDetail;
