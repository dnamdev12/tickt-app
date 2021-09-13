import React, { Component } from 'react'
import dummy from '../../../../assets/images/u_placeholder.jpg';
import { withRouter } from 'react-router-dom'
import noDataFound from '../../../assets/images/no-search-data.png';
import moment from 'moment';
import { renderTime } from '../../../../utils/common';

class ViewQuote extends Component {
    render() {
        const styleItem = {
            listStyle: 'none',
            display: 'inline-block',
            width: 'calc(100% / 3)',
            height: '50px',
            textAlign: 'center',
            paddingTop: '20px'
        }
        return (
            <React.Fragment>
                <div className="flex_row">
                    <div className="flex_col_sm_5">
                        <div className="relate">
                            <button className="back"></button>
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
                                    <img src="https://appinventiv-development.s3.amazonaws.com/1629085877591.png"
                                        alt="traide-img" />
                                </figure>
                                <div className="details">
                                    <span className="name">Electrician </span>
                                    <p className="commn_para">to wire up circuit box</p>
                                </div>
                            </div>
                            <div className="job_info">
                                <ul>
                                    <li className="icon dollar">$12 p/h</li>
                                    <li className=""><span>total $132</span></li>
                                    <li className="icon calendar">08 Sep - 31 Oct</li>
                                    <li className=""><span>In progress</span></li>
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
                                        src={dummy}
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
                                    <span className="name">{'John Oldman'}</span>
                                    <p className="commn_para">
                                        <span className="rating">4.5 , 36 reviews</span>
                                    </p>
                                </div>
                            </div>


                            <div
                                style={{
                                    width: '100%',
                                    border: '1px solid #000',
                                    margin: '0 auto'
                                }}
                                className="example">
                                <ul style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    width: '100%',
                                    paddingLeft: '0',
                                }}>
                                    
                                </ul>
                            </div>

                            <button
                                className="fill_grey_btn full_btn btn-effect">
                                {'Total quote: $2,000'}
                            </button>
                        </div>

                        <div style={{ textAlign: 'right', marginBottom: '20px' }}>
                            <span className="fill_grey_btn">Total Quote: $1,000</span>
                        </div>


                        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                            <button
                                className="fill_grey_btn quote_btn">
                                {'Submit Quote'}
                            </button>
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