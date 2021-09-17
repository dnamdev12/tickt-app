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
    quotes_param: any,
    history: any,
    // quotesData: any,
    // setToggleSort: () => void,
    // toggleQuoteSort: boolean,
    jobId: String
}

class ListQuotes extends Component<Props, State> {
    state: State = {
        toggle: false,
        dataItems: []
    };

    componentDidMount() {
        let {dataItems} = this.state;
        if(!dataItems?.length){
            this.preFetchForQuotes();
        }
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
        const { jobId } = this.props;
        let { dataItems } = this.state;
        return (
            <React.Fragment>
                <div className="flex_row">
                    <div className="flex_col_sm_5">
                        <div className="relate">
                            <button
                                onClick={() => {
                                    // this.props.history.push(`/job-detail??jobId=${jobId}&status=open&activeType=open`)
                                    this.props.history.goBack();
                                }}
                                className="back"></button>
                            <span className="title">Quotes</span>
                        </div>
                    </div>
                </div>

                <span className="sub_title">
                    <button
                        onClick={() => {
                            
                        }}
                        className="fill_grey_btn sort_btn">
                        {`${false ? 'Highest' : 'Lowest'} quote`}
                    </button>
                </span>

                <div className="flex_row tradies_row">
                    {dataItems.map((item: any) => (
                        <div className="flex_col_sm_6">
                            <div
                                style={{ minHeight: '180px' }}
                                className="tradie_card"
                                data-aos="fade-in"
                                data-aos-delay="250"
                                data-aos-duration="1000"
                            >
                                <span
                                    onClick={() => {
                                        this.props.history.push(`/jobs?active=open&viewQuotes=true&jobId=${item?.jobId}&id=${item?._id}`)
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
                                        <span className="name">{item?.tradieName}</span>
                                        <p className="commn_para">
                                            <span className="rating">{item?.rating} , {item?.reviewCount} reviews</span>
                                        </p>
                                    </div>
                                </div>

                                <button
                                    className="fill_grey_btn full_btn btn-effect">
                                    {`Total quote: $${item?.amount}`}
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* <div className="no_record  m-t-vh">
                        <figure className="no_img">
                            <img src={noDataFound} alt="data not found" />
                        </figure>
                        <span>{'No Data Found'}</span>
                    </div> */}

                </div>
            </React.Fragment>
        )
    }
}


export default ListQuotes;