import React, { useEffect, useState } from 'react'
import ConfirmPay from './confirmAndPay';

const FixedRate = (props: any) => {
    const [toggle, setToggle] = useState(false);

    const backToScreen = () => {
        setToggle(false);
    }

    useEffect(() => {

    }, [toggle])

    if (toggle) {
        return (
            <ConfirmPay
                backToScreen={backToScreen}
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
                            props.toggleBack()
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
                <div className="payment_details">
                    <span className="inner_title">Milestone payment details</span>
                    <div className="f_spacebw">
                        <span className="form_label">Hours worked</span>
                        <span className="form_label">5</span>
                    </div>
                    <div className="f_spacebw">
                        <span className="form_label">Hours rate</span>
                        <span className="form_label">$5</span>
                    </div>
                    <div className="f_spacebw">
                        <span className="form_label">Subtotal</span>
                        <span className="form_label">$150</span>
                    </div>
                    <div className="f_spacebw">
                        <span className="form_label">Tax GST (10%)</span>
                        <span className="show_label">$190.0</span>
                    </div>
                    <div className="f_spacebw">
                        <span className="show_label">Total</span>
                        <span className="show_label">$190.0</span>
                    </div>
                </div>
                <div className="bank_detail view_more">
                    <span className="xs_head">Bank Details</span>
                    <span className="show_label">Credit card </span>
                </div>
                <button
                    onClick={() => {
                        console.log('Here!!!')
                        setToggle(true);
                    }}
                    className="fill_btn full_btn btn-effect">
                    {'Pay'}
                </button>
            </div>
        </div>

    )
}

export default FixedRate;