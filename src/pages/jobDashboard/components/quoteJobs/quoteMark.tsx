import React, { useState, useEffect } from 'react';
import { postHomeApplyJob } from '../../../../redux/homeSearch/actions';
import {
    addQuote,
    addItem,
    updateItem,
    deleteItem,
    quoteByJobId
} from '../../../../redux/quotes/actions';
import NumberFormat from 'react-number-format';

import deleteQuote from '../../../../assets/images/ic-delete.png';
import storageService from '../../../../utils/storageService';

const QuoteMark = (props: any) => {
    const [Items, setItems] = useState<Array<any>>([]);
    const [isEdit, setEdit] = useState<any>(null);
    const [totalItemsAmt, setTotalItemsAmt] = useState<number>(0);
    const [quoteId, setQuoteId] = useState<string>('');
    const [localQuote, setLocalQuote] = useState({
        item_number: 1,
        description: '',
        price: 0,
        quantity: 0,
        totalAmount: 0
    });

    useEffect(() => {
        preFetch();
    }, []);

    console.log('props: ', props);
    console.log('Items: ', Items);
    const preFetch = async () => {
        const isItemsEditable = props.location?.state?.redirect_from === 'appliedJobs' ? true : false;
        if (isItemsEditable) {
            const data: any = {
                jobId: props.location?.state?.res?.jobId,
                tradieId: storageService.getItem('userInfo')?._id
            }
            const res = await quoteByJobId(data);
            if (res.success && res.data?.resultData[0]?.quote_item?.length) {
                console.log('resultData: ', res.data?.resultData);
                setItems(res.data?.resultData[0]?.quote_item);
                setQuoteId(res.data?.resultData[0]?._id);
                props.dataFetched(true);
            } else {
                props.dataFetched(false);
            }
        } else {
            props.dataFetched(false);
        }
    }


    const deleteItem_ = async (item: any) => {
        const data = {
            itemId: item?._id,
        }
        const res = await deleteItem(data);
        if (res.success) {
            console.log("update item res", res.data);
        }
    }

    const addItem_ = async (item: any) => {
        const data = {
            itemId: item?._id,
        }
        const res = await addItem(data);
        if (res.success) {
            console.log("update item res", res.data);
        }
    }

    const updateItem_ = async (index: number, items: any) => {
        const newAmount: number = totalItemsAmount(items);
        const item = items[index];
        const data = {
            itemId: item?._id,
            item_number: item?.item_number,
            description: item?.description,
            price: item?.price,
            quantity: item?.quantity,
            totalAmount: item?.totalAmount,
            quoteId: quoteId,
            amount: newAmount
        }
        const res = await updateItem(data);
        if (res.success) {
            return true;
        } else {
            return false;
        }
    }

    const applyJobClicked = async () => {
        const jobDetailsData: any = props.location?.state?.data;

        const data = {
            jobId: jobDetailsData?.jobId,
            builderId: jobDetailsData?.postedBy?.builderId,
            tradeId: jobDetailsData?.tradeId,
            specializationId: jobDetailsData?.specializationId
        }
        const res = await postHomeApplyJob(data);
        if (res.success) {
            props.history.push('/quote-job-success');
        }
    }

    const handleSubmit = async () => {
        console.log('Items: ', Items);
        // add Quote (api call);
        const jobId: string = props.location?.state?.data?.jobId;
        // const jobId: string = new URLSearchParams(props.location.search)?.get('jobId') || '';
        const data: any = {
            jobId: jobId,
            userId: storageService.getItem('userInfo')?._id,
            amount: totalItemsAmt,
            quote_item: Items
        }
        const res: any = await addQuote(data);
        if (res.success) {
            applyJobClicked();
        }
    }

    const handleChange = (name: any, value: any) => {
        setLocalQuote((prev: any) => ({
            ...prev,
            [name]: name === 'description' ? value : + value
        }));
    }

    const totalItemsAmount = (items: any) => {
        let totalAmount = items.slice(1, items.length).reduce((a: any, b: any) => {
            return a + b.totalAmount
        }, Items[0].totalAmount);
        return totalAmount;
    }

    const calculateTotal = () => {
        if (Items?.length) {
            let totalAmt_ = totalItemsAmount(Items);
            if (totalAmt_ && totalAmt_ !== totalItemsAmt) {
                setTotalItemsAmt(totalAmt_);
            }
            const total = (
                <NumberFormat
                    value={totalAmt_}
                    decimalScale={2}
                    displayType={'text'}
                    thousandSeparator={true}
                    isNumericString={true}
                />
            )
            return total;
        }
        return `$0`;
    }

    let item_number = localQuote.item_number;
    let description = localQuote.description;
    let price: any = localQuote.price;
    let qty: any = localQuote.quantity;
    let total_cal = (+qty * +price);
    let total = total_cal === 0 ? '' : total_cal;
    let isEditTrue = isEdit !== null && isEdit > -1 ? true : false;


    const quoteValidate = () => {
        if (description?.length === 0 || qty === 0 || price === 0) {
            return true
        }
        return false;
    }

    return (
        <div className="flex_col_sm_6">
            <div className="relate form_field">
                <button
                    onClick={() => {
                        if (isEditTrue) {
                            setEdit(null);
                            setLocalQuote({
                                item_number: Items?.length + 1,
                                description: '',
                                price: 0,
                                quantity: 0,
                                totalAmount: 0
                            });
                        } else {
                            if (props.location?.state?.redirect_from === 'jobDetailPage') {
                                const jobDetailsData: any = props.location?.state?.data;
                                props.history.push(`/job-details-page?jobId=${jobDetailsData?.jobId}&tradeId=${jobDetailsData?.tradeId}&specializationId=${jobDetailsData?.specializationId}`);
                            }
                            if (props.location?.state?.redirect_from === 'appliedJobs') {
                                props.history.push('applied-jobs');
                            }
                        }
                    }}
                    className="back">
                </button>
            </div>
            <span className="sub_title">
                {'Quote for this job'}
            </span>
            <>
                {Items?.length > 0 && !isEditTrue ?
                    Items.map((item: any, index: number) => (
                        <div className="change_req">
                            <div className="edit_delete">
                                <span
                                    onClick={() => {
                                        setEdit(index);
                                        setLocalQuote(item)
                                    }}
                                    className="editdark">
                                </span>
                            </div>
                            <div className="flex_row">
                                <div className="flex_col_sm_2">
                                    <label className="form_label">Item</label>
                                </div>
                                <div className="flex_col_sm_6">
                                    <label className="form_label">Description</label>
                                </div>
                                <div className="flex_col_sm_4">
                                    <label className="form_label">Price</label>
                                </div>
                                <>
                                    <div className="flex_col_sm_2">
                                        <span className="show_label">{item.item_number}</span>
                                    </div>
                                    <div className="flex_col_sm_6">
                                        <span className="show_label line-1">
                                            {item.description}
                                        </span>
                                    </div>
                                    <div className="flex_col_sm_4">
                                        <span className="show_label">
                                            <NumberFormat
                                                value={item.totalAmount}
                                                displayType={'text'}
                                                prefix={'$ '}
                                                thousandSeparator={true}
                                                isNumericString={true}
                                            />
                                        </span>
                                    </div>
                                </>
                            </div>
                        </div>
                    )) : null}
            </>

            {props.isDataFetched && <div className="change_req">
                {isEditTrue && (
                    <span
                        onClick={() => {
                            let index = isEdit;
                            let items_ = Items;
                            let filtered = items_.filter((item: any, index: any) => index !== isEdit);
                            setItems(filtered);
                            setEdit(null);
                            let length = filtered[filtered?.length - 1]?.item_number;
                            let id = length > 0 ? length + 1 : 1;
                            setLocalQuote({
                                item_number: id,
                                description: '',
                                price: 0,
                                quantity: 0,
                                totalAmount: 0
                            });
                            if (quoteId) {
                                alert('are you sure');
                                deleteItem_(items_[index]);
                            }
                        }}
                        className="delete_quote">
                        {'Delete'}
                        <img src={deleteQuote} alt="delete" />
                    </span>
                )}
                <span className="inner_title">{`${isEditTrue ? 'Edit' : 'Add'} Item`}</span>
                <div className="form_field">
                    <label className="form_label">
                        {'Item Number'}
                    </label>
                    <div className="text_field">
                        <input
                            type="number"
                            value={Items[Items?.length - 1]?.item_number + 1}
                        // onChange={(e) => handleChange('item_number', e.target.value)}
                        />
                    </div>
                </div>
                <div className="form_field">
                    <label className="form_label">Description</label>
                    <div className="text_field">
                        <textarea
                            value={description}
                            onChange={(e) => handleChange('description', e.target.value)}
                        ></textarea>
                    </div>
                </div>
                <div className="form_field">
                    <div className="flex_row">
                        <div className="flex_col_sm_4">
                            <label className="form_label">Price</label>
                            <div className="text_field">
                                <NumberFormat
                                    value={price || ''}
                                    decimalScale={2}
                                    allowNegative={false}
                                    className="foo"
                                    placeholder="$100"
                                    displayType={'input'}
                                    thousandSeparator={true}
                                    isNumericString={true}
                                    prefix={'$'}
                                    onValueChange={(values) => {
                                        const { formattedValue, value } = values;
                                        handleChange('price', value);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex_col_sm_4">
                            <label className="form_label">Qty</label>
                            <div className="text_field">
                                <NumberFormat
                                    value={qty || ''}
                                    className="foo"
                                    placeholder="10"
                                    displayType={'input'}
                                    thousandSeparator={true}
                                    isNumericString={true}
                                    onValueChange={(values) => {
                                        const { formattedValue, value } = values;
                                        handleChange('quantity', value);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex_col_sm_4">
                            <label className="form_label">Total</label>
                            <div className="text_field">
                                <NumberFormat
                                    readOnly
                                    value={total || ''}
                                    decimalScale={2}
                                    allowNegative={false}
                                    className="foo"
                                    placeholder="$1000"
                                    displayType={'input'}
                                    thousandSeparator={true}
                                    isNumericString={true}
                                    prefix={'$'}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    onClick={async () => {
                        if (isEditTrue) {
                            let index = isEdit;
                            let items_ = Items;
                            let item: any = localQuote;
                            item['totalAmount'] = (+item.quantity * +item.price);
                            items_[isEdit] = (item);
                            const isSuccess = await updateItem_(index, items_);
                            if (isSuccess) {
                                setItems(items_);
                                setEdit(null);
                                setLocalQuote({
                                    item_number: Items?.length + 1,
                                    description: '',
                                    price: 0,
                                    quantity: 0,
                                    totalAmount: 0
                                });
                            }
                            return;
                        } else if (props.location?.state?.redirect_from === 'appliedJobs') {
                            // call add new item api
                            // addItem_();
                        } else {
                            let items_ = Items;
                            let item: any = localQuote;
                            item['totalAmount'] = (+item.quantity * +item.price);
                            items_.push(item)

                            setItems(items_);
                            setLocalQuote({
                                item_number: Items?.length + 1,
                                description: '',
                                price: 0,
                                quantity: 0,
                                totalAmount: 0
                            });
                        }
                    }}
                    className={`fill_btn w100per ${quoteValidate() ? 'disable_btn' : ''}`}>
                    {`${isEditTrue ? 'Save' : 'Add'} Item`}
                </button>
            </div>}

            {(Items?.length > 0 && !isEditTrue) && (
                <div className="total_quote">
                    <span className="fill_grey_btn">
                        {`Total Quote: $`}
                        {calculateTotal()}
                    </span>
                </div>
            )}

            {/* {isEditTrue ? (
                <button
                    onClick={() => {
                        setEdit(null);
                        setLocalQuote({
                            item_number: Items?.length + 1,
                            description: '',
                            price: 0,
                            quantity: 0,
                            totalAmount: 0
                        });
                    }}
                    className="fill_grey_btn quote_btn">
                    {'Continue'}
                </button>
            ) :  */}
            {(quoteId || !props.isDataFetched) ? null : (
                <button
                    onClick={handleSubmit}
                    className={`fill_grey_btn quote_btn ${Items?.length === 0 ? 'disable_btn' : ''}`}>
                    {'Submit Quote'}
                </button>
            )}
        </div>
    )
}

export default QuoteMark;