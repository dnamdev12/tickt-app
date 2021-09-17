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
    dataItems:any
}

type Props = {
    // quotes_param: any,
    history: any,
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
            this.props.history.push('/quote-job-accepted');
        }
    }

    componentDidMount(){
        // this.preFetchForQuotes();
    }

    preFetchForQuotes = () => {
        const props: any = this.props;
        const params = new URLSearchParams(props?.history?.location?.search);
        const quotes_param: any = params.get('quotes');
        const viewQuotesParam: any = params.get('viewQuotes');
        const jobId: any = params.get('jobId');
        if (jobId?.length) {
            if (quotes_param === "true") {
                this.fetchQuotesById(jobId, 1)
            } else {
                this.fetchQuotesById(jobId, 1)
            }
        }
    }

    fetchQuotesById = async (jobId: String, sortBy: Number) => {
        let result = await quoteByJobId({ jobId, sortBy });
        console.log({ result });
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

        const props: any = this.props;
        const quotesData = props?.quotesData || [];
        const params = new URLSearchParams(props?.history?.location?.search);
        const jobId = params.get('jobId');
        const id = params.get('id');

        let item: any = {};
        if (quotesData && Array.isArray(quotesData) && quotesData?.length) {
            item = quotesData.find((item: any) => item._id === id);
        }
        return (
            <React.Fragment>
                <div className="flex_row">
                    <div className="flex_col_sm_5">
                        <div className="relate">
                            <button
                                onClick={() => {
                                    this.props.history.goBack();
                                    // this.props.history.push(`/jobs?active=open&quotes=true&jobId=${jobId}`)
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
                                    <li className="icon dollar">{'for quoting'}</li>
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
                            <span className="more_detail circle">
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
                                        <span className="rating">{item?.rating} , {item?.reviewCount} reviews</span>
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
                                {`Total Quote: $${item?.amount}`}
                            </span>
                        </div>

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