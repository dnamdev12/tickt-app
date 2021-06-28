import React from 'react';
import templateImage from '../../../../assets/images/job-complete-bg.png';
import { withRouter } from 'react-router-dom';


const Success = (props: any) => {
    return (
        <div className="img_text_wrap">
            <figure className="full_image">
                <img src={templateImage} alt="template-item" loading="eager" />
                <div className="short_info">
                    <div className="content">
                        <h1 className="title">
                            {'Payment sent!'}
                        </h1>
                        <span className="show_label">
                            {'We’ll notify the tradesperson that payment has been received for completing this milestone.'}
                        </span>
                        <div className="flex_row">
                            <div className="flex_col_sm_6">
                                <div className="btn_wrapr">
                                    <button
                                        onClick={() => {
                                            props.history.push('/');
                                        }}
                                        className="fill_btn btn-effect">
                                        {'OK'}
                                    </button>
                                </div>
                            </div>
                            <div className="flex_col_sm_6">
                                <div className="btn_wrapr">
                                    <button
                                        onClick={() => {
                                            props.history.push('/');
                                        }}
                                        style={{backgroundColor:'#fff'}}
                                        className="fill_btn btn-effect">
                                        {'See your transactions'}
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* <div className="btn_wrapr">
                            <button
                                onClick={() => {
                                    props.history.push('/');
                                }}
                                className="fill_btn btn-effect">
                                {'OK'}
                            </button>
                        </div> */}
                    </div>
                </div>
            </figure>
        </div>
    )
}

export default withRouter(Success);