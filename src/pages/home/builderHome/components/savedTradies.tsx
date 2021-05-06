import React, { Component, useState } from 'react'
import Location from "../../../../assets/images/ic-location.png";
import dummy from '../../../../assets/images/u_placeholder.jpg';

export default class SavedTradies extends Component {
    constructor(props: any) {
        super(props);
        this.state = {
            isItemSpec: {}
        }
    }

    toggleMoreSpec = (index: any) => {
        let this_state: any = this.state;
        let isItemSpec = this_state.isItemSpec;
        if (isItemSpec[index] === undefined) {
            isItemSpec[index] = true;
        } else {
            isItemSpec[index] = !isItemSpec[index];
        }
        this.setState({ isItemSpec });
    }

    render() {
        let data: any = [];
        let props: any = this.props;
        if (props?.data?.length) {
            data = props.data;
        }

        let this_state: any = this.state;
        let isItemSpec = this_state.isItemSpec;
        // console.log({ data })
        return (
            <div className="section_wrapper bg_gray">
                <div className="custom_container">
                    <span className="title">Saved tradies</span>
                    <div className="flex_row tradies_row">
                        {data?.length ?
                            data.map((item: any, index: number) => (
                                <div className="flex_col_sm_4">
                                    <div className="tradie_card">
                                        <a href="javascript:void(0)" className="more_detail circle"></a>
                                        <div className="user_wrap">
                                            <figure className="u_img">
                                                <img
                                                    src={item?.tradieImage}
                                                    onError={(e) => { 
                                                        let event:any = e;
                                                        event.target.src = dummy; 
                                                    }}
                                                    alt="traide-img" />
                                            </figure>
                                            <div className="details">
                                                <span className="name">{item?.tradieName}</span>
                                                <span className="rating">{item?.ratings}, {item?.reviews} reviews </span>
                                            </div>
                                        </div>
                                        <div className="tags_wrap">
                                            <ul>
                                                {item?.tradeData?.length ?
                                                    item?.tradeData?.map((item_trade: any) => (
                                                        <li className="main">
                                                            <img src={item_trade?.tradeSelectedUrl} alt="icon" />
                                                            {item_trade?.tradeName}
                                                        </li>
                                                    ))
                                                    : null}
                                            </ul>
                                        </div>
                                        {item?.specializationData?.length ? (
                                            <div className="tags_wrap">
                                                <ul>
                                                    {isItemSpec[index] ?
                                                        item?.specializationData?.map((item_spec: any, index_spec: any) => (
                                                            <li>{item_spec?.specializationName}</li>
                                                        ))
                                                        :
                                                        item?.specializationData?.slice(0, 4)?.map((item_spec: any, index_spec: any) => (
                                                            <li>{item_spec?.specializationName}</li>
                                                        ))}
                                                    {item?.specializationData?.length > 4 && !isItemSpec[index] ?
                                                        <li onClick={() => { this.toggleMoreSpec(index) }}>{'More'}</li>
                                                        : null}
                                                </ul>
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            ))
                            : null}
                    </div>
                    <button className="fill_grey_btn full_btn m-tb40 view_more">View all</button>
                </div>
            </div >

        )
    }
}


/*
const SavedTradies = (props: any) => {
    const { tradeList, data } = props;
    const [toggleSpec, setToggleSpec] = useState<any>({});
    console.log({ tradeList, data, toggleSpec });
    // specializationData
    // specializationName

    // const renderSpecs = (item:any, index:number) => {
    //     let limit = toggleSpec[index];
    //     console.log({limit})
    //     return item?.specializationData?.map((item_specialization: any, index_spec:number) => {
    //         if(!limit || limit === undefined){
    //             if(index_spec < 5){
    //                 return <li>{item_specialization?.specializationName}</li>
    //             }
    //         }
    //         return <li>{item_specialization?.specializationName}</li>
    //     });
    // }
    return (
        <div className="section_wrapper bg_gray">
            <div className="custom_container">
                <span className="title">Saved tradies</span>
                <div className="flex_row tradies_row">
                    {data?.length ?
                        data.map((item: any, index: number) => (
                            <div className="flex_col_sm_4">
                                <div className="tradie_card">
                                    <a href="javascript:void(0)" className="more_detail circle"></a>
                                    <div className="user_wrap">
                                        <figure className="u_img">
                                            <img src={dummy} alt="traide-img" />
                                        </figure>
                                        <div className="details">
                                            <span className="name">{data?.tradieName}</span>
                                            <span className="rating">{data?.ratings}, {data?.review} reviews </span>
                                        </div>
                                    </div>
                                    <div className="tags_wrap">
                                        <ul>
                                            {item?.tradeData?.length ?
                                                item?.tradeData?.map((item_trade: any) => (
                                                    <li className="main">
                                                        <img src={item_trade?.tradeSelectedUrl} alt="icon" />
                                                        {item_trade?.tradeName}
                                                    </li>
                                                ))
                                                : null}

                                            {item?.specializationData?.length ?
                                                renderSpecs(item, index)
                                                : null}
                                            {item?.specializationData?.length > 4 ?
                                                <li onClick={() => {
                                                    console.log('Here!');
                                                    let index_value = toggleSpec[index];
                                                    setToggleSpec({ [index]: index_value === undefined ? false : !index_value })
                                                }}>
                                                    {'More'}
                                                </li>
                                                : null}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))
                        : null}


                    <div className="flex_col_sm_4">
                        <div className="tradie_card">
                            <a href="javascript:void(0)" className="more_detail circle"></a>
                            <div className="user_wrap">
                                <figure className="u_img">
                                    <img src={dummy} alt="traide-img" />
                                </figure>
                                <div className="details">
                                    <span className="name">John Oldman</span>
                                    <span className="rating">4.9, 36 reviews </span>
                                </div>
                            </div>
                            <div className="tags_wrap">
                                <ul>
                                    <li className="main">
                                        <img src={Location} alt="icon" />Plumber
                            </li>
                                    <li className="main">
                                        <img src={Location} alt="icon" />Electrician
                            </li>
                                    <li>Electrical Instrumentation</li>
                                    <li>Security and Fire Alarm Installation</li>
                                    <li>Electrical Instrumentation</li>
                                    <li>Security and Fire Alarm Installation</li>
                                    <li>More</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="flex_col_sm_4">
                        <div className="tradie_card">
                            <a href="javascript:void(0)" className="more_detail circle"></a>
                            <div className="user_wrap">
                                <figure className="u_img">
                                    <img src={dummy} alt="traide-img" />
                                </figure>
                                <div className="details">
                                    <span className="name">John Oldman</span>
                                    <span className="rating">4.9, 36 reviews </span>
                                </div>
                            </div>
                            <div className="tags_wrap">
                                <ul>
                                    <li className="main">
                                        <img src={Location} alt="icon" />Plumber
                            </li>
                                    <li className="main">
                                        <img src={Location} alt="icon" />Electrician
                            </li>
                                    <li>Electrical Instrumentation</li>
                                    <li>Security and Fire Alarm Installation</li>
                                    <li>Electrical Instrumentation</li>
                                    <li>Security and Fire Alarm Installation</li>
                                    <li>More</li>
                                </ul>
                            </div>
                        </div>
                    </div> *


                </div>
                <button className="fill_grey_btn full_btn m-tb40 view_more">View all</button>
            </div>
        </div >

    )
}

export default SavedTradies
*/
