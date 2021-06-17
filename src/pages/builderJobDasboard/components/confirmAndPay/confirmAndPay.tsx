import React from 'react';
import cardIcon from '../../../../assets/images/ic-credit.png';
import check from '../../../../assets/images/checked-2.png';


const confirmAndPay = () => {
    return (
        <div className="flex_row">
            <div className="flex_col_sm_8">
                <div className="relate">
                    <button className="back"></button>
                    <span className="xs_sub_title">
                        {'Wire up circuit box'}
                    </span>
                </div>
                <div className="form_field">
                    <span className="sub_title">
                        {'Confirm and pay'}
                    </span>
                </div>
                <div className="mb130">
                    <button className="card_btn full_btn">
                        <img src={cardIcon} alt="card-icon" className="card" />
                        Credit Card <span className="show_label"> XXXX 4034</span>
                        <img src={check} alt="check" className="check" />
                    </button>
                    <button className="fill_grey_btn full_btn btn-effect">Add another card</button>
                </div>

                <div className="form_field">
                    <span className="payment_note">
                        Tickt does not store your payment information.
                    </span>
                    <p className="commn_para">
                        Tickt does not handle payment for jobs, we only facilitate
                        communication between tradies and builders. If you have problems
                        receiving your payment, please contact your builder.
                    </p>
                </div>
                <button className="fill_btn full_btn btn-effect">Continue</button>
            </div>
        </div>
    )
}

export default confirmAndPay;