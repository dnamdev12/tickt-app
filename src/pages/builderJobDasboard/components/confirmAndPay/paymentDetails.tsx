import React, { useEffect, useState } from 'react'
import deleteIcon from '../../../../assets/images/ic-bin.png'
import cardValidator, { cardholderName } from "card-validator";
import moment from 'moment';


// import DateFnsUtils from '@date-io/date-fns';
// import {
//   KeyboardDatePicker,
// } from '@material-ui/pickers';

const defaultValues = {
    number: '',
    cardholderName: '',
    date: '',
    cvv: ''
}

const PaymentDetails = (props: any) => {
    const { editItem } = props;
    const [stateData, setStateData] = useState(defaultValues);
    const [errors, setErrors] = useState({
        number: '',
        cardholderName: '',
        date: '',
        cvv: ''
    });


    useEffect(() => {
        if (editItem) {
            setStateData(editItem);
        }
    }, [editItem])


    const handleCheck = () => {
        if (
            !stateData?.number?.length ||
            !stateData?.date?.length ||
            !stateData?.cardholderName.length ||
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


    // useEffect(() => {
    //     if (JSON.stringify(stateData) !== JSON.stringify(defaultValues)) {
    //         setErrors((prev: any) => ({
    //             name: stateData?.name?.length > 50 ? 'Maximum 50 characters are allowed.' : '',
    //             number: !stateData?.number?.length ? 'Account Number is required' : stateData?.number?.length && !cardValidator.number(stateData?.number).isValid ? 'Please enter a valid Account Number' : '',
    //             cardholderName: '',
    //             date: !stateData?.date?.length ? 'Expiration Date is required' : stateData?.date?.length && !checkValidExpiration(stateData?.date) ? `Please add a valid pattern like ${moment().format('MM/YY')}` : '',
    //             cvv: stateData?.cvv?.length > 3 ? 'Maximum 3 characters are allowed' : ''
    //         }))
    //     }
    // }, [stateData]);


    const checkIsValid = ({ name, value }: any) => {
        if (name === 'name') {
            if (!value.length) {
                return 'Account Name is required';
            } else {
                if (value.length > 50) {
                    return 'Maximum 50 characters are allowed';
                }
            }
        }

        if (name === 'cardholderName') {
            if (!value.length) {
                return 'Cardholder Name is required';
            } else {
                if (value.length > 50) {
                    return 'Maximum 50 characters are allowed';
                }
            }
        }

        if (name === 'date') {
            if (!value.length) {
                return 'Expiration Date is required';
            } else {
                console.log({
                    check: checkValidExpiration(value),
                    value
                })
                if (!checkValidExpiration(value)) {
                    return `Please add a valid Expiration Date`;
                }
            }
        }

        if (name === 'number') {
            console.log({
                name,
                value,
                isValid:cardValidator.number(value).isValid
            })
            if (!value.length) {
                return 'Card Number is required';
            } else {
                if (!cardValidator.number(value).isValid) {
                    return 'Please enter a valid Card Number'
                }
            }
        }

        if (name === 'cvv') {
            if (!value.length) {
                return 'CVV/CVC is required';
            } else {
                if (value?.length > 3) {
                    return 'Maximum 3 characters are allowed';
                }
            }
        }

        return ''

    }

    const setErrorsOnChange = ({ name, value }: any) => {
        setErrors((prev: any) => ({
            ...prev,
            [name]: checkIsValid({ name, value }) //value.length > 50 ? 'Maximum 50 characters are allowed.' : '',
        }));
    }


    const checkValidExpiration = (date: any) => {
        let currentDate = moment().format('MM/YY');
        if ((date).match('^(0[1-9]|1[0-2])\/?([0-9]{2})$')) {
            if (moment(date, 'MM/YY').isSameOrAfter(moment(currentDate, 'MM/YY'))) {
                return true;
            }
        }
        return false;
    }

    let isTrue = Object.values(stateData).includes('');
    let isErrors:any = false;
    let isError = handleCheck();

    let errorValues = Object.values(errors);
    if(errorValues?.length){
        let isHave = errorValues.find((item:any ) => item !== '');
        if(isHave){
            isErrors = true;
        }
    }

    return (
        <div className="flex_row">
            <div className="flex_col_sm_8">
                <div className="relate">
                    <button className="back" onClick={() => { props.backToScreen() }}></button>
                    <span className="xs_sub_title">{'Wire up circuit'}</span>
                    <>
                        <div className="edit_delete">
                            {/* <span className="edit" title="Edit" onClick={() => { }}></span> */}
                            {/* <span onClick={() => { }}>
                                <img src={deleteIcon} alt='dlt-icon' />
                            </span> */}
                        </div>
                    </>



                </div>
                <span className="sub_title">Payment Details</span>
                <p className="commn_para">Enter your bank account details</p>
                {/* 
                <div className="form_field">
                    <label className="form_label">
                        {'Account Name'}
                    </label>
                    <div className="text_field">
                        <input
                            type="text"
                            placeholder="Enter Account Name"
                            name="account_name"
                            value={stateData?.name}
                            onChange={(e: any) => {
                                setStateData((prev: any) => ({ ...prev, name: e.target.value }));
                                setErrorsOnChange({ name: 'name', value: e.target.value });
                            }}
                            // maxLength={50}
                            readOnly={false}
                        />
                    </div>
                    <span className="error_msg">{errors.name}</span>
                </div> */}
                <div className="form_field">
                    <label className="form_label">
                        {'Card Number'}
                    </label>
                    <div className="text_field">
                        <input
                            type="number"
                            placeholder="Enter Card Number"
                            name="account_number"
                            value={stateData?.number}
                            onChange={(e: any) => {
                                setStateData((prev: any) => ({ ...prev, number: e.target.value }));
                                setErrorsOnChange({ name: 'number', value: e.target.value });
                            }}
                            maxLength={10}
                            readOnly={false}
                        />
                    </div>
                    <span className="error_msg">{errors.number}</span>
                </div>

                <div className="form_field">
                    <label className="form_label">
                        {'Cardholder Name'}
                    </label>
                    <div className="text_field">
                        <input
                            type="text"
                            placeholder="Enter Cardholder Name"
                            name="cardholder_name"
                            value={stateData?.cardholderName}
                            onChange={(e: any) => {
                                setStateData((prev: any) => ({ ...prev, cardholderName: e.target.value }));
                                setErrorsOnChange({ name: 'cardholderName', value: e.target.value });
                            }}
                            // maxLength={50}
                            readOnly={false}
                        />
                    </div>
                    <span className="error_msg">
                        {errors.cardholderName}
                    </span>
                </div>

                <div className="flex_row">
                    <div className="flex_col_sm_4">
                        <div className="form_field">
                            <label className="form_label">
                                {'Expiration Date'}
                            </label>
                            <div className="text_field">
                                <input
                                    type="text"
                                    placeholder="Enter Expiration Date"
                                    name="bsb_number"
                                    value={stateData?.date}
                                    onChange={(e: any) => {
                                        setStateData((prev: any) => ({ ...prev, date: e.target.value }))
                                        setErrorsOnChange({ name: 'date', value: e.target.value });
                                    }}
                                    maxLength={7}
                                    readOnly={false}
                                />
                            </div>
                            <span className="error_msg">
                                {errors.date}
                            </span>
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
                                    onChange={(e: any) => {
                                        setStateData((prev: any) => ({ ...prev, cvv: e.target.value }));
                                        setErrorsOnChange({ name: 'cvv', value: e.target.value });
                                    }}
                                    maxLength={3}
                                    readOnly={false}
                                />
                            </div>
                            <span className="error_msg">{errors.cvv}</span>
                        </div>
                    </div>
                </div>
                {/* {console.log({
                    isTrue,
                    isError,
                    isErrors,
                    stateData,
                    errors
                })}  */}
                <button
                    onClick={() => {
                        handleContinue()
                    }}
                    className={`fill_btn full_btn btn-effect ${!isTrue && !isError && !isErrors ? '' : 'disable_btn'}`}>
                    {'Continue'}
                </button>
            </div>
        </div>
    )
}

export default PaymentDetails;