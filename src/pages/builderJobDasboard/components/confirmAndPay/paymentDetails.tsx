import React, { useEffect, useState } from 'react'


const PaymentDetails = (props: any) => {
    const [stateData, setStateData] = useState({
        name: '',
        number: '',
        date: '',
        cvv: ''
    });
    const [errors, setErrors] = useState({
        name: '',
        number: '',
        date: '',
        cvv: ''
    });


    const handleCheck = () => {
        if (
            !stateData?.name?.length ||
            !stateData?.number?.length ||
            !stateData?.date?.length ||
            !stateData?.cvv?.length
        ) {
            return true
        }

        return false;
    }


    const handleContinue = () => {
        props.setDetials(stateData)
        props.backToScreen();
    }


    useEffect(() => {
        setErrors((prev: any) => ({
            name: stateData?.name?.length > 50 ? 'Maximum 50 characters are allowed.' : '',
            number: stateData?.number?.length > 10 ? 'Maximum 10 characters are allowed.' : '',
            date: stateData?.date?.length > 6 ? 'Maximum 6 characters are allowed.' : '',
            cvv: stateData?.cvv?.length > 3 ? 'Maximum 3 characters are allowed.' : ''
        }))
    }, [stateData]);

    let isTrue = Object.values(stateData).includes('');
    let isError = handleCheck();
    
    return (
        <div className="flex_row">
            <div className="flex_col_sm_8">
                <div className="relate">
                    <button className="back" onClick={() => { props.backToScreen() }}></button>
                    <span className="xs_sub_title">{'Wire up circuit'}</span>
                    <>
                        {/* <span className="edit_icon" title="Edit">
                  <img src={editIconBlue} alt="edit" onClick={() => setReadOnly(!readOnly)} />
                </span>
                <span className="edit_icon remove_icon" title="Remove" onClick={() => removeBankDetails()} >
                  <img src={removeIconBlue} alt="remove" />
                </span> */}
                        <div className="edit_delete">
                            <span className="edit" title="Edit" onClick={() => { }}></span>
                            <span className="delete" title="Remove" onClick={() => { }}></span>
                        </div>
                    </>
                </div>
                <span className="sub_title">Payment Details</span>
                <p className="commn_para">Enter your bank account details</p>

                <div className="form_field">
                    <label className="form_label">Account Name</label>
                    <div className="text_field">
                        <input
                            type="text"
                            placeholder="Enter Account Name"
                            name="account_name"
                            value={stateData?.name}
                            onChange={(e: any) => { setStateData((prev: any) => ({ ...prev, name: e.target.value })) }}
                            // maxLength={50}
                            readOnly={false}
                        />
                    </div>
                    <span className="error_msg">{errors.name}</span>
                </div>
                <div className="form_field">
                    <label className="form_label">Account Number</label>
                    <div className="text_field">
                        <input
                            type="number"
                            placeholder="Enter Account number"
                            name="account_number"
                            value={stateData?.number}
                            onChange={(e: any) => { setStateData((prev: any) => ({ ...prev, number: e.target.value })) }}
                            maxLength={10}
                            readOnly={false}
                        />
                    </div>
                    <span className="error_msg">{errors.number}</span>
                </div>

                <div className="flex_row">
                    <div className="flex_col_sm_4">
                        <div className="form_field">
                            <label className="form_label">
                                {'Expiration Date'}
                            </label>
                            <div className="text_field">
                                <input
                                    type="number"
                                    placeholder="Enter Expiration Date"
                                    name="bsb_number"
                                    value={stateData?.date}
                                    onChange={(e: any) => { setStateData((prev: any) => ({ ...prev, date: e.target.value })) }}
                                    maxLength={6}
                                    readOnly={false}
                                />
                            </div>
                            <span className="error_msg">{errors.date}</span>
                        </div>
                    </div>
                    <div className="flex_col_sm_4">
                        <div className="form_field">
                            <label className="form_label">
                                {'CVV/CVC'}
                            </label>
                            <div className="text_field">
                                <input
                                    type="number"
                                    placeholder="Enter CVV/CVC"
                                    name="bsb_number"
                                    value={stateData?.cvv}
                                    onChange={(e: any) => { setStateData((prev: any) => ({ ...prev, cvv: e.target.value })) }}
                                    maxLength={3}
                                    readOnly={false}
                                />
                            </div>
                            <span className="error_msg">{errors.cvv}</span>
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => {
                        handleContinue()
                    }}
                    className={`fill_btn full_btn btn-effect ${!isTrue && !isError ? '' : 'disable_btn'}`}>
                    {'Continue'}
                </button>
            </div>
        </div>
    )
}

export default PaymentDetails;