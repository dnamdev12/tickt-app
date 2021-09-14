import React, { useState, useEffect } from 'react';
import deleteQuote from '../../../../assets/images/ic-delete.png';
import { addQuote, deleteItem, quoteByJobId } from '../../../../redux/quotes/actions';

const QuoteMark = (props: any) => {
    const [Items, setItems] = useState<any>([]);
    const [localQuote, setLocalQuote] = useState({
        id: '1',
        desc: '',
        price: 0,
        qty: 0,
        total: 0
    });
    const [isEdit, setEdit] = useState<any>(null);

    const handleSubmit = () => {
        // add Quote (api call);
        props.history.push('/quote-job-success');
    }

    const handleChange = (name: any, value: any) => {
        setLocalQuote((prev: any) => ({
            ...prev,
            [name]: value
        }));
    }

    const calculateTotal = () => {
        if (Items?.length) {
            let res = Items.reduce((a: any, b: any) => a.total + b.total);
            console.log({ res });
            return res?.total || res;
        }
        return 0;
    }

    let id = localQuote.id;
    let desc = localQuote.desc;
    let price: any = localQuote.price;
    let qty: any = localQuote.qty;
    let total_cal = (+qty * +price);
    let total = total_cal === 0 ? '' : total_cal;
    let isEditTrue = isEdit !== null && isEdit > -1 ? true : false;


    const quoteValidate = () => {
        if (desc?.length == 0 || qty == 0 || price == 0) {
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
                                id: Items?.length + 1,
                                desc: '',
                                price: 0,
                                qty: 0,
                                total: 0,
                            });
                        } else {
                            props.history.push(`/job-details-page${props.history.location.search}`);
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
                                        <span className="show_label">{index + 1}</span>
                                    </div>
                                    <div className="flex_col_sm_6">
                                        <span className="show_label line-1">
                                            {item.desc}
                                        </span>
                                    </div>
                                    <div className="flex_col_sm_4">
                                        <span className="show_label">
                                            {item.price}
                                        </span>
                                    </div>
                                </>
                            </div>
                        </div>
                    )) : null}
            </>
            <div className="change_req">
                {isEditTrue && (
                    <span
                        onClick={() => {
                            let items_ = Items;
                            let filtered = items_.filter((item: any, index: any) => index !== isEdit);
                            setItems(filtered);
                            setEdit(null);
                            let length = items_?.length;
                            let id = length > 0 ? (length).toString() : '1';
                            setLocalQuote({
                                id: id,
                                desc: '',
                                price: 0,
                                qty: 0,
                                total: 0,
                            });
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
                            value={id}
                        // onChange={(e) => handleChange('id', e.target.value)}
                        />
                    </div>
                </div>
                <div className="form_field">
                    <label className="form_label">Description</label>
                    <div className="text_field">
                        <textarea
                            value={desc}
                            onChange={(e) => handleChange('desc', e.target.value)}
                        ></textarea>
                    </div>
                </div>
                <div className="form_field">
                    <div className="flex_row">
                        <div className="flex_col_sm_4">
                            <label className="form_label">Price</label>
                            <div className="text_field">
                                <input
                                    type="number"
                                    value={price || ''}
                                    onChange={(e) => handleChange('price', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex_col_sm_4">
                            <label className="form_label">Qty</label>
                            <div className="text_field">
                                <input type="number"
                                    value={qty || ''}
                                    onChange={(e) => handleChange('qty', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex_col_sm_4">
                            <label className="form_label">Total</label>
                            <div className="text_field">
                                <input type="number"
                                    value={total}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => {
                        if (isEditTrue) {
                            let items_ = Items;
                            let item: any = localQuote;
                            item['total'] = (+item?.qty * +item?.price);
                            items_[isEdit] = (item)
                            setItems(items_);
                            setEdit(null);
                            setLocalQuote({
                                id: items_?.length + 1,
                                desc: '',
                                price: 0,
                                qty: 0,
                                total: 0,
                            });
                            return
                        }

                        let items_ = Items;
                        let item: any = localQuote;
                        item['total'] = (+item?.qty * +item?.price);
                        items_.push(item)

                        setItems(items_);
                        setLocalQuote({
                            id: items_?.length + 1,
                            desc: '',
                            price: 0,
                            qty: 0,
                            total: 0,
                        });
                    }}
                    className={`fill_btn w100per ${quoteValidate() ? 'disable_btn' : ''}`}>
                    {`${isEditTrue ? 'Save' : 'Add'} Item`}
                </button>
            </div>

            {(Items?.length > 0 && !isEditTrue) && (
                <div className="total_quote">
                    <span className="fill_grey_btn">
                        {`Total Quote: $${calculateTotal()}`}
                    </span>
                </div>
            )}

            {isEditTrue ? (
                <button
                    onClick={() => {
                        setEdit(null);
                        setLocalQuote({
                            id: Items?.length + 1,
                            desc: '',
                            price: 0,
                            qty: 0,
                            total: 0,
                        });
                    }}
                    className="fill_grey_btn quote_btn">
                    {'Continue'}
                </button>
            ) : (
                <button
                    onClick={handleSubmit}
                    className={`fill_grey_btn quote_btn ${Items.length == 0 ? 'disable_btn' : ''}`}>
                    {'Submit Quote'}
                </button>
            )}
        </div>
    )
}

export default QuoteMark;