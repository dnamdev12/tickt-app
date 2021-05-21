import React from 'react'
import TradieBox from '../../shared/tradieBox';

interface Props {
    items: any,
    setJobLabel: any,
}

const ApplicantsList = ({ items, setJobLabel}: Props) => {
    return (
        <div className="section_wrapper">
            <div className="custom_container">
                <div className="form_field">
                    <div className="flex_row">
                        <div className="flex_col_sm_5">
                            <React.Fragment>
                                <div className="relate">
                                    <button
                                        className="back"
                                        onClick={() => {
                                            console.log('Here!');
                                            setJobLabel({ title: 'open' })
                                        }}>
                                    </button>
                                    <span className="title">
                                        {'New applicants'}
                                    </span>
                                </div>
                                <p className="commn_para">
                                    {'Here!'}
                                </p>
                            </React.Fragment>
                        </div>
                    </div>

                    <div className="flex_row">
                        {items?.length ?
                            items.map((item: any, index: any) => (
                                <TradieBox item={item} index={index} />
                            ))
                            : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ApplicantsList;
