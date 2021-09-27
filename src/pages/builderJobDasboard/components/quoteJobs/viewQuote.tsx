import React, { Component } from 'react'
import dummy from '../../../../assets/images/u_placeholder.jpg';
import { withRouter } from 'react-router-dom'
import noDataFound from '../../../assets/images/no-search-data.png';
import moment from 'moment';
import { renderTime } from '../../../../utils/common';

import {
    getAcceptDeclineTradie,
    quoteByJobId
} from '../../../../redux/quotes/actions';

type State = {
    toggle: boolean,
    dataItems: any
}

type Props = {
    // quotes_param: any,
    history: any,
    setJobLabel: any
    // quotesData: any
}

class ViewQuote extends Component<Props, State> {
    state: State = {
        toggle: false,
        dataItems: []
    };

    handleSubmit = async (item: any, status: number) => {
        const { jobId, userId } = item;
        let data = {
            "jobId": jobId,
            "tradieId": userId,
            "status": status
        };
        let response = await getAcceptDeclineTradie(data);
        if (response.success) {
            if (status == 1) {
                this.props.history.push('/quote-job-accepted');
            }

            if (status == 2) {
                this.props.setJobLabel('open');
                this.props.history.push('/jobs?active=open');
            }
        }
    }

    componentDidMount() {
        this.preFetchForQuotes();
    }

    preFetchForQuotes = () => {
        const props: any = this.props;
        const params = new URLSearchParams(props?.history?.location?.search);
        const quotes_param: any = params.get('quotes');
        const viewQuotesParam: any = params.get('viewQuotes');
        const jobId: any = params.get('jobId');
        const tradieId: any = params.get('tradieId');
        if (jobId?.length && !tradieId) {
            if (quotes_param === "true") {
                this.fetchQuotesById({ jobId: jobId, sortBy: 1 })
            } else {
                this.fetchQuotesById({ jobId: jobId, sortBy: 1 })
            }
        } else {
            if (tradieId?.length) {
                console.log({ tradieId })
                this.fetchQuotesById({ jobId: jobId, sortBy: 1, tradieId: tradieId })
            }
        }
    }

    fetchQuotesById = async ({ jobId, sortBy, tradieId }: { jobId: String, sortBy: Number, tradieId?: String }) => {
        let result = null;
        console.log({ tradieId }, 'tradieId');
        if (tradieId) {
            result = await quoteByJobId({ jobId, tradieId });
        } else {
            result = await quoteByJobId({ jobId, sortBy });
        }

        if (result?.success) {
            let data = result?.data?.resultData;
            if (data) {
                this.setState({ dataItems: data })
            }
        }
    }


    render() {
        const styleItem = {
            listStyle: 'none',
            display: 'inline-block',
            width: 'calc(100% / 3)',
            height: '50px',
            textAlign: 'center',
            paddingTop: '20px'
        }
        let { dataItems } = this.state;
        const props: any = this.props;
        const quotesData = dataItems || [];
        const params = new URLSearchParams(props?.history?.location?.search);
        const id = params.get('id');
        const jobId = params.get('jobId');
        const tradieId = params.get('tradieId');
        const activeType: any = params.get('active');

        let item: any = {};
        if (tradieId?.length && Array.isArray(quotesData) && quotesData?.length) {
            item = quotesData[0];
        } else {
            if (quotesData && Array.isArray(quotesData) && quotesData?.length) {
                item = quotesData.find((item: any) => item._id === id);
            }
        }
        console.log({ dataItems }, 'dataItems')
        let CASE_1 = ['open', 'applicant'].includes(activeType);
        return (
            <React.Fragment>
                <div className="flex_row">
                    <div className="flex_col_sm_5">
                        <div className="relate">
                            <button
                                onClick={() => {
                                    if (CASE_1) {
                                        this.props.setJobLabel('listQuote');
                                        props.history.replace(`/jobs?active=${activeType}&quote=true&jobId=${jobId}`)
                                    }

                                    if (activeType == "active") {
                                        this.props.setJobLabel('active');
                                        this.props.history.goBack();
                                    }
                                }}
                                className="back"></button>
                            <span className="title">Quotes</span>
                        </div>
                    </div>
                </div>

                <div className="flex_row tradies_row">
                    <div className="flex_col_sm_6">
                        <div
                            style={{ minHeight: '180px' }}
                            className="tradie_card aos-init aos-animate"
                            data-aos="fade-in"
                            data-aos-delay="250"
                            data-aos-duration="1000">
                            {/* <span className="more_detail circle"></span> */}
                            <div className="user_wrap">
                                <figure className="u_img">
                                    <img src={item?.tradieImage || dummy}
                                        alt="traide-img"
                                        onError={(e: any) => {
                                            if (e?.target?.onerror) {
                                                e.target.onerror = null;
                                            }
                                            if (e?.target?.src) {
                                                e.target.src = dummy;
                                            }
                                        }}
                                    />
                                </figure>
                                <div className="details">
                                    <span className="name">{item?.trade_name} </span>
                                    <p className="commn_para">{item?.jobName}</p>
                                </div>
                            </div>
                            <div className="job_info">
                                <ul>
                                    <li className="icon clock">
                                        <span>
                                            {renderTime(item?.from_date, item?.to_date)}
                                        </span>
                                    </li>
                                    <li className="icon dollar">{item?.amount}</li>
                                    <li className="icon location">
                                        <span>
                                            {item?.location_name}
                                        </span>
                                    </li>
                                    <li className="icon calendar">{item?.duration}</li>
                                </ul>
                            </div>

                        </div>
                    </div>

                </div>


                <div className="flex_row tradies_row">
                    <div className="flex_col_sm_6">
                        <div
                            style={{ minHeight: '180px' }}
                            className="tradie_card" data-aos="fade-in" data-aos-delay="250" data-aos-duration="1000">
                            <span
                                onClick={() => {
                                    props.history.push(`/tradie-info?tradeId=${item?.userId}&hideInvite=true&active=true`)
                                }}
                                className="more_detail circle">
                            </span>
                            <div className="user_wrap">
                                <figure className="u_img">
                                    <img
                                        src={item?.tradieImage || dummy}
                                        alt="traide-img"
                                        onError={(e: any) => {
                                            if (e?.target?.onerror) {
                                                e.target.onerror = null;
                                            }
                                            if (e?.target?.src) {
                                                e.target.src = dummy;
                                            }
                                        }}
                                    />
                                </figure>
                                <div className="details">
                                    <span className="name">{item?.trade_name}</span>
                                    <p className="commn_para">
                                        <span className="rating">{item?.rating ? (item?.rating).toFixed(1) : ''} , {item?.reviewCount} reviews</span>
                                    </p>
                                </div>
                            </div>


                            <div className="example">
                                {item?.quote_item?.length ?
                                    item?.quote_item.map((quote_item: any) => (
                                        <table style={{ marginTop: '20px' }}>
                                            <tr>
                                                <th>Item</th>
                                                <th>Description</th>
                                                <th>Price</th>
                                            </tr>
                                            <tr>
                                                <td>{quote_item?.item_number}</td>
                                                <td>{quote_item?.description}</td>
                                                <td>{`$ ${quote_item?.price}`}</td>
                                            </tr>
                                        </table>
                                    ))
                                    : null}
                            </div>
                        </div>

                        <div style={{ textAlign: 'right', marginBottom: '20px' }}>
                            <span className="fill_grey_btn">
                                {`Total Quote: $${item?.totalQuoteAmount}`}
                            </span>
                        </div>

                        {CASE_1 && (
                            <div className="flex_row">
                                <div className="flex_col_sm_8">
                                    <div className="form_field">
                                        <button
                                            onClick={() => { this.handleSubmit(item, 1) }}
                                            className="fill_btn full_btn btn-effect">
                                            {'Accept Quote'}
                                        </button>
                                    </div>
                                    <div className="form_field">
                                        <button
                                            onClick={() => { this.handleSubmit(item, 2) }}
                                            className="fill_grey_btn full_btn btn-effect">
                                            {'Decline Quote'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>

                    {/* <div className="no_record  m-t-vh">
                        <figure className="no_img">
                            <img src={noDataFound} alt="data not found" />
                        </figure>
                        <span>{'No Data Found'}</span>
                    </div> */}

                </div>
            </React.Fragment >
        )
    }
}


export default ViewQuote;