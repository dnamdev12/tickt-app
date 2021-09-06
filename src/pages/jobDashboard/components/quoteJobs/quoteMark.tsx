import React, { useState, useEffect } from 'react';
import deleteQuote from '../../../../assets/images/ic-delete.png';

const QuoteMark = (props: any) => {
    const [Items, setItems] = useState<any>([]);
    const [isEdit, setEdit] = useState<any>(1);

    useEffect(() => {
        setItems([
            {
                id: 1,
                description: 'Lorem ipsum',
                price: 300,
                quantity: 5,
                total: 1500
            },
            {
                id: 2,
                description: 'Lorem ipsum',
                price: 300,
                quantity: 1,
                total: 1500
            }
        ])
    }, []);

    const handleSubmit = () => {
        props.history.push('/quote-job-success');
    }

    let isEditTrue = isEdit ? true : false;
    let itemNumber = '';
    let itemDescription = '';
    let itemPrice = '';
    let itemQnt = '';
    let itemTotal = '';

    if (isEditTrue) {
        itemNumber = Items[isEdit]?.id;
        itemDescription = Items[isEdit]?.description;
        itemPrice = Items[isEdit]?.price;
        itemQnt = Items[isEdit]?.quantity;
        itemTotal = Items[isEdit]?.total;
    }

    return (
        <div className="flex_col_sm_6">
            {/* Quote */}
            <div className="relate form_field">
                <button
                    className="back"></button>
            </div>
            <span className="sub_title">
                {'Quote for this job'}
            </span>
            <>
                {Items.map((item: any, index: number) => (
                    <div className="change_req">
                        <div className="edit_delete">
                            <span
                                onClick={() => {
                                    setEdit(index);
                                }}
                                className="editdark"></span>
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
                                        {item.description}
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
                ))}
            </>
            <div className="change_req">
                {isEditTrue && (
                    <span className="delete_quote">Delete
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
                            value={itemNumber}
                            onChange={(e: any) => {
                                Items[isEdit] = e.target.value;
                                setEdit(Items);
                            }}
                        />
                    </div>
                </div>
                <div className="form_field">
                    <label className="form_label">Description</label>
                    <div className="text_field">
                        <textarea></textarea>
                    </div>
                </div>
                <div className="form_field">
                    <div className="flex_row">
                        <div className="flex_col_sm_5">
                            <label className="form_label">Price</label>
                            <div className="text_field">
                                <input type="number" />
                            </div>
                        </div>
                        <div className="flex_col_sm_2">
                            <label className="form_label">Qty</label>
                            <div className="text_field">
                                <input type="number" />
                            </div>
                        </div>
                        <div className="flex_col_sm_5">
                            <label className="form_label">Total</label>
                            <div className="text_field">
                                <input type="number" />
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    className="fill_btn w100per">
                    {`${isEditTrue ? 'Edit' : 'Add'} Item`}
                </button>
                <div className="pt-10">
                    <button
                        className="fill_grey_btn quote_btn w100per">
                        {'Cancel'}
                    </button>
                </div>
            </div>
            <div className="total_quote">
                <span className="fill_grey_btn">Total Quote: $1,000</span>
            </div>
            <button
                onClick={handleSubmit}
                className="fill_grey_btn quote_btn">
                {'Submit Quote'}
            </button>
            {/* Quote close */}
        </div>
    )
}

export default QuoteMark;