import React, { Component } from 'react'
import Location from "../../assets/images/ic-location.png";
import dummy from '../../assets/images/u_placeholder.jpg';

interface Props {
    item: any,
    index: any
}

interface State {
    isItemSpec: any
}


export default class TradieBox extends Component<Props, State> {
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
        const { item, index } = this.props;
        let this_state:any = this.state;
        let isItemSpec = this_state.isItemSpec;

        return (
            <div className="flex_col_sm_4">
                <div className="tradie_card">
                    <a href="javascript:void(0)" className="more_detail circle"></a>
                    <div className="user_wrap">
                        <figure className="u_img">
                            <img
                                src={item?.tradieImage}
                                onError={(e) => {
                                    let event: any = e;
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
                                    <li>{'More'}</li>
                                {/* {item?.specializationData?.length > 4 && !isItemSpec[index] ?
                                    <li onClick={() => { this.toggleMoreSpec(index) }}>{'More'}</li>
                                    : null} */}
                            </ul>
                        </div>
                    ) : null}
                </div>
            </div>
        )
    }
}
