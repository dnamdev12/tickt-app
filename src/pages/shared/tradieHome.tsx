import React, { Component, useState } from 'react'
import Location from "../../assets/images/ic-location.png";
import dummy from '../../assets/images/u_placeholder.jpg';
import TradieBox from './tradieBox';
import noData from '../../assets/images/no-search-data.png';

interface Props {
    data: any,
    title: string,
    redirectPath: string,
    length: any
}

export default class TradieHome extends Component<Props> {
    render() {
        let data: any = [];
        let props: any = this.props;
        if (props?.data?.length) {
            data = props.data;
        }
        let redirectPath = props?.redirectPath;

        if (!data?.length) {
            return null;
        }

        return (
            <div className="section_wrapper bg_gray">
                <div className="custom_container">
                    <span className="title">{props.title}</span>
                    <div className="flex_row tradies_row">
                        {data?.length ?
                            data.splice(0, props.length || data.length - 1).map((item: any, index: number) => (<TradieBox item={item} index={index} />)) :
                            (
                                <div className="no_record">
                                        <figure className="no_data_img">
                                            <img src={noData} alt="data not found" />
                                        </figure>
                                        <span>No Data Found</span>
                                    </div>
                            )}
                    </div>
                    <button
                        onClick={() => {
                            if (redirectPath) {
                                props.history.push(props.redirectPath)
                            }
                        }}
                        className="fill_grey_btn full_btn m-tb40 view_more">View all</button>
                </div>
            </div >

        )
    }
}