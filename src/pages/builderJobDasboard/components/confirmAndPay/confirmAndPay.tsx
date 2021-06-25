import React, { useState } from 'react';
import cardIcon from '../../../../assets/images/ic-credit.png';
import check from '../../../../assets/images/checked-2.png';

import PaymentDetails from './paymentDetails';
import Success from './suceess';
import { withRouter } from 'react-router-dom';

const ConfirmAndPay = (props: any) => {
    const [toggle, setToggle] = useState(false);
    const [selected, setSelected] = useState('');
    const [paymentDetail, setPaymentDetail] = useState<any>([
        {
            name: 'Credit Card',
            number: '4034',
            cardholderName:'',
            cvv: '515',
            date: '06/22'
        }
    ]);

    const backToScreen = () => {
        setToggle(false);
    }

    const setDetials = (data: any) => {
        setPaymentDetail((prev: any) => ([...prev, data]))
    }

    if (toggle) {
        return (
            <PaymentDetails
                backToScreen={backToScreen}
                setDetials={setDetials}
                onSubmitAccept={props.onSubmitAccept}
            />
        )
    }

    return (
        <div className="flex_row">
            <div className="flex_col_sm_8">
                <div className="relate">
                    <button
                        onClick={() => {
                            props.backToScreen()
                        }}
                        className="back"></button>
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
                    {paymentDetail?.length ?
                        paymentDetail.map((item: any, index: any) => (
                            <button
                                onClick={() => {
                                    setSelected(index);
                                }}
                                className="card_btn full_btn">
                                <img src={cardIcon} alt="card-icon" className="card" />
                                {item?.name} <span className="show_label">
                                    XXXX {(item?.number).substring(0, 4)}
                                </span>
                                {selected == index ? (
                                    <img src={check} alt="check" className="check" />
                                ) : null}
                            </button>
                        ))
                        : null}
                    {/* <button className="card_btn full_btn">
                        <img src={cardIcon} alt="card-icon" className="card" />
                        Credit Card <span className="show_label"> XXXX 4034</span>
                        <img src={check} alt="check" className="check" />
                    </button> */}
                    <button
                        onClick={() => {
                            setToggle(true);
                        }}
                        className="fill_grey_btn full_btn btn-effect">Add another card</button>
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
                <button
                    onClick={() => {
                        // this will submit the accept request.
                        props.onSubmitAccept();
                    }}
                    className="fill_btn full_btn btn-effect">Continue</button>
            </div>
        </div>
    )
}

export default withRouter(ConfirmAndPay);