import React, { useEffect, useState } from 'react'
import ConfirmPay from './confirmAndPay';
import { lastUsedCard } from '../../../../redux/jobs/actions';

const FixedRate = (props: any) => {
    console.log({ props });
    const indexMile: any = props?.data?.selectedMilestoneIndex?.index;
    const milestones: any = props?.data?.itemDetails?.milestones;
    const selectedItems: any = milestones[indexMile];
    const [toggle, setToggle] = useState(false);
    const [lastCard, setLastCard] = useState<any>({});
    const [toggleDetails, setToggleDetails] = useState<any>({ toggle: false, data: null })

    const backToScreen = () => {
        setToggle(false);
        setToggleDetails({ toggle: false, data: null });
        fetchLastCard();
    }

    const fetchLastCard = async () => {
        let response = await lastUsedCard();
        if (response?.success) {
            setLastCard(response.data);
        }
    }

    useEffect(() => {
        fetchLastCard();
    }, [])

    useEffect(() => {
    }, [toggle])

    if (toggle) {
        return (
            <ConfirmPay
                toggleDetails={toggleDetails}
                jobName={props?.jobName}
                dataItem={props?.data}
                backToScreen={backToScreen}
                total={selectedItems?.total}
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
                        {props?.jobName}
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
                        title: 'Milestone amount',
                        value: selectedItems?.milestoneAmount
                    })}

                    {renderItem({
                        title: 'GST',
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
                {!lastCard?.last4 ? (
                    <React.Fragment>
                        {''}
                    </React.Fragment>
                ) : (
                    <div
                        onClick={() => {
                            setToggle(true);
                            setToggleDetails({
                                toggle: true,
                                data: lastCard
                            })
                        }}
                        style={{ cursor: 'pointer' }}
                        className="bank_detail view_more">
                        <span className="xs_head">{`${lastCard?.funding} card`}</span>
                        <span className="show_label">{`xxxx ${lastCard?.last4}`}</span>

                    </div>
                )}
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
