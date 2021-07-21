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

const randomRating = Math.floor(Math.random() * 5) + 1;
const randomReview = Math.floor(Math.random() * 200) + 50;

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
        const { jobId, specializationId, history, hideInvite } = this.props;

        console.log({ item }, '-->')

        let tradieId = item?.tradieId;

        if (jobId && tradieId) {
            history.push(`tradie-info?jobId=${jobId}&tradeId=${tradieId}&hideInvite=${hideInvite ? true : false}`);
        } else {
            history.push(`tradie-info?tradeId=${tradieId}&hideInvite=${hideInvite ? true : false}`);
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
                    <span
                        onClick={() => { this.redirectPath(item) }}
                        className="more_detail circle"></span>
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
                            <span className="rating">{item?.ratings} , {item?.reviews} reviews </span>
                            {/* <span className="rating">{item?.ratings || randomRating} , {item?.reviews || randomReview} reviews </span> */}
                        </div>
                    </div>
                    {showStatus && item?.status && <div className="job_status">{item?.status}</div>}
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
                                {item?.specializationData?.length > 4 ? (
                                    <li>{'More'}</li>
                                ) : null}
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

export default withRouter(TradieBox);