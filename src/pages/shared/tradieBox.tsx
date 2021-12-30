import React, { Component } from 'react'
import Location from "../../assets/images/ic-location.png";
import dummy from '../../assets/images/u_placeholder.jpg';
import { RouteComponentProps, withRouter } from "react-router";
interface State {
    isItemSpec: any
}

// Your component own properties
type PropsType = RouteComponentProps & {
    item: any,
    index: any,
    hideAos?: boolean,
    jobId?: any,
    specializationId?: any,
    hideInvite?: boolean,
    showStatus?: boolean,
}

class TradieBox extends Component<PropsType, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            isItemSpec: {},
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

    redirectPath = (item: any) => {
        const { jobId, specializationId, history, hideInvite, location } = this.props;

        console.log({ item }, '-->')

        let tradieId = item?.tradieId;

        if (jobId && tradieId) {
            history.push({
                pathname: `/tradie-info`,
                search: `?jobId=${jobId}&tradeId=${tradieId}&hideInvite=${hideInvite ? true : false}`,
                state: { url: location?.pathname }
            });
        } else {
            history.push({
                pathname: `/tradie-info`,
                search: `?tradeId=${tradieId}&hideInvite=${hideInvite ? true : false}`,
                state: { url: location?.pathname }
            });
        }
    }

    render() {
        const { item, index, hideAos, showStatus } = this.props;
        let this_state: any = this.state;
        let isItemSpec = this_state.isItemSpec;
        return (
            <div className="flex_col_sm_4">
                <div className="tradie_card"
                    data-aos={hideAos ? '' : "fade-in"}
                    data-aos-delay={hideAos ? '' : "250"}
                    data-aos-duration={hideAos ? '' : "1000"}>

                    <div className="f_spacebw tag_review">
                        <span className="form_label">{(item?.tradeData?.[0]?.tradeName) || (item?.tradie_details?.trade?.[0]?.trade_name) || (item?.trade?.[0]?.trade_name)}</span>
                        <span className="rating">
                            {(item?.ratings) || (item?.rating)?.toFixed(1) || (item?.tradie_details?.rating)?.toFixed(1) || '0'} | {item?.reviews || (item?.review) || (item?.tradie_details?.review) || '0'} reviews </span>
                    </div>

                    <span
                        onClick={() => { this.redirectPath(item) }}
                        className="more_detail new_top circle"></span>
                    <div className="user_wrap">
                        <figure className="u_img">
                            <img
                                src={item?.tradieImage || item?.tradie_details?.user_image || item?.user_image || dummy}
                                // onError={(e) => {
                                //     let event: any = e;
                                //     event.target.src = dummy;
                                // }}
                                alt="traide-img" />
                        </figure>
                        <div className="details">
                            <span className="name">{item?.tradieName || item?.tradie_details?.firstName || item?.firstName}</span>
                            <span className="job">{item?.businessName}</span>
                        </div>
                    </div>
                    {showStatus && item?.status && <div className="form_field"><div className="job_status" >{item?.status}</div></div>}
                    {/* <div className="tags_wrap">
                        <ul>
                            {item?.tradeData?.length ?
                                item?.tradeData?.map((item_trade: any, index: any) => (
                                    <li key={index}
                                        className="main">
                                        // <img src={item_trade?.tradeSelectedUrl} alt="icon" />
                                        {item_trade?.tradeName}
                                    </li>
                                ))
                                : null}

                            {item?.tradie_details?.trade?.length ?
                                item?.tradie_details?.trade.map((item_: any) => (
                                    <li key={index}
                                        className="main">
                                        // <img src={item_?.selected_url} alt="icon" />
                                        {item_?.trade_name}
                                    </li>
                                )) : null}


                            {item?.trade?.length ?
                                item?.trade.map((item_: any) => (
                                    <li key={index}
                                        className="main">
                                        // <img src={item_?.selected_url} alt="icon" />
                                        {item_?.trade_name}
                                    </li>
                                )) : null}
                        </ul>
                    </div> */}
                    {/* {item?.specializationData?.length ? (
                        <div className="tags_wrap">
                            <ul>
                                {isItemSpec[index] ?
                                    item?.specializationData?.map((item_spec: any, index_spec: any) => (
                                        <li key={index_spec}>{item_spec?.specializationName}</li>
                                    ))
                                    :
                                    item?.specializationData?.slice(0, 4)?.map((item_spec: any, index_spec: any) => (
                                        <li key={index_spec}>{item_spec?.specializationName}</li>
                                    ))}
                                {item?.specializationData?.length > 4 ? (
                                    <li>{'More'}</li>
                                ) : null}
                            </ul>
                        </div>
                    ) : null} */}

                    {/* {item?.tradie_details?.specializations[0]?.length ?
                        <div className="tags_wrap">
                            <ul>
                                {item?.tradie_details?.specializations[0]?.slice(0, 4)?.map((item_: any) => (
                                    <li key={index}>
                                        {item_?.name}
                                    </li>
                                ))}
                                {item?.tradie_details?.specializations && item?.tradie_details?.specializations[0]?.length > 4 ? (
                                    <li>{'More'}</li>
                                ) : null}
                            </ul>
                        </div>
                        : null}

                    {item?.specializations?.length ?
                        <div className="tags_wrap">
                            <ul>
                                {item?.specializations?.slice(0, 4)?.map((item_: any) => (
                                    <li key={index}>
                                        {item_?.name}
                                    </li>
                                ))}
                                {item?.specializations?.length > 4 ? (
                                    <li>{'More'}</li>
                                ) : null}
                            </ul>
                        </div>
                        : null} */}
                </div>
            </div>
        )
    }
}

export default withRouter(TradieBox);