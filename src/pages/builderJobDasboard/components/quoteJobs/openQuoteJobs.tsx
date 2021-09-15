import React, { Component } from 'react'
import dummy from '../../../../assets/images/u_placeholder.jpg';
import { withRouter } from 'react-router-dom'
import noDataFound from '../../../assets/images/no-search-data.png';
import moment from 'moment';
import { renderTime } from '../../../../utils/common';

type State = {
    toggle: boolean
}

type Props = {
    quotes_param: any,
    history: any,
    quotesData: any,
    setToggleSort: () => void,
    toggleQuoteSort: boolean,
    jobId:String
}

class OpenQuoteJobs extends Component<Props, State> {
    state: State = {
        toggle: false,
    };
    render() {
        const { toggleQuoteSort, quotesData, jobId } = this.props;
        return (
            <React.Fragment>
                <div className="flex_row">
                    <div className="flex_col_sm_5">
                        <div className="relate">
                            <button 
                            onClick={() => {
                                this.props.history.push(`/job-detail??jobId=${jobId}&status=open&activeType=open`)
                            }}
                            className="back"></button>
                            <span className="title">Quotes</span>
                        </div>
                    </div>
                </div>

                <span className="sub_title">
                    <button
                        onClick={() => {
                            this.props.setToggleSort();
                        }}
                        className="fill_grey_btn sort_btn">
                        {`${toggleQuoteSort ? 'Highest' : 'Lowest'} quote`}
                    </button>
                </span>

                <div className="flex_row tradies_row">
                    {quotesData.map((item: any) => (
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


export default OpenQuoteJobs;