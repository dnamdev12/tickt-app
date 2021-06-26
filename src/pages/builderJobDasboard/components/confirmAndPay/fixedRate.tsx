import React, { useEffect, useState } from 'react'
import ConfirmPay from './confirmAndPay';

const FixedRate = (props: any) => {
    console.log({ props });
    const indexMile: any = props?.data?.selectedMilestoneIndex?.index;
    const milestones: any = props?.data?.itemDetails?.milestones;
    const selectedItems: any = milestones[indexMile];
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

    const renderItem = ({ title, value, bold }: any) => {
        if (value) {
            return (
                <div className="f_spacebw">
                    <span className="form_label">
                        {bold ? (
                            <b>{title}</b>
                        ) : title}
                    </span>
                    <span className="form_label">
                        {bold ? <b>{value}</b> : value}
                    </span>
                </div>
            )
        }
        return null;
    }

    console.log({ selectedItems });
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


                    {renderItem({
                        title: 'Hours worked',
                        value: selectedItems?.hoursWorked
                    })}

                    {renderItem({
                        title: 'Hours rate',
                        value: selectedItems?.hourlyRate
                    })}

                    {renderItem({
                        title: 'Milestone Amount',
                        value: selectedItems?.milestoneAmount
                    })}

                    {renderItem({
                        title: 'Taxes',
                        value: selectedItems?.taxes
                    })}

                    {renderItem({
                        title: 'Platform fees',
                        value: selectedItems?.platformFees
                    })}

                    {renderItem({
                        title: 'Total',
                        value: selectedItems?.total,
                        bold: true
                    })}

                </div>
                <div 
                onClick={() => {
                    setToggle(true);
                }}
                className="bank_detail view_more">
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