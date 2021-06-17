import React, { useState, useEffect } from 'react'
import dummy from '../../assets/images/u_placeholder.jpg';
import vouch from '../../assets/images/ic-template.png';
import { withRouter } from 'react-router-dom';
import {
    HomeTradieProfile,
    AddVoucher,
    ChooseJob
} from '../../redux/jobs/actions';



const Vouchers = (props: any) => {
    const [stateData, setStateData] = useState({});
    const [errors, setErrors] = useState({});
    const [toggleRecommendation, setToggleRecommendation] = useState(false);

    const [jobsList, setJobsList] = useState([]);
    const [reactSelect, setReactSelect] = useState({});
    const [toggle, setToggle] = useState(false);

    const { id, path } = props?.location?.state;


    useEffect(() => {
        prefetch();
    }, [id, path])

    const prefetch = async () => {
        let res_profile: any = await HomeTradieProfile({ tradieId: id });
        if (res_profile.success) {
            setStateData(res_profile.data);
        }
    }

    const handleSubmit = async () => {
        let data = {
            "jobId": "60c9be93a81e6b5f82097a91",
            "jobName": "Please Apply",
            "tradieId": id,
            "photos": ["https://appinventiv-development.s3.amazonaws.com/ezgif.com-gif-maker.png"],
            "vouchDescription": "This is vouchers",
            "recommendation": "This is recommendation url"
        }

        let response = await AddVoucher(data);
    }

    const isInvalid = (name: string, value: string) => {
        // switch (name) {
        //     case 'pay_type':
        //         return !value.length ? `${label[name]} is required.` : '';
        //     case 'amount':
        //         return ''
        // }
    }

    const priceOptions = [
        { value: 'Per hour', label: 'Per Hour' },
        { value: 'Fixed price', label: 'Fixed Price' },
    ];

    const handleChange = (value: string, name: string) => {
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: isInvalid(name, value),
        }));

        // setPaymentDetails((prevDetails) => {
        //     // if (name === "pay_type" && prevDetails.pay_type !== value) {
        //     //   prevDetails.amount = '';
        //     // }
        //     return ({
        //         ...prevDetails,
        //         [name]: value,
        //     })
        // })
    };

    console.log({ props, stateData, jobsList });
    let state_data: any = stateData;
    return (
        <div className="app_wrapper">
            <div className="section_wrapper">
                <div className="custom_container">
                    <div className="flex_row">
                        <div className="flex_col_sm_6">
                            <div className="relate">
                                <button
                                    onClick={() => {
                                        // let path: any = props.location.state.path;
                                        props.history.push(`tradie-info${path}`);
                                    }}
                                    className="back"></button>
                                <span className="title">
                                    {'2 Vouchers'}
                                </span>
                            </div>
                        </div>
                        <div className="flex_col_sm_6 text-right">
                            <button
                                onClick={() => { setToggle((prev: any) => !prev) }}
                                className="fill_btn btn-effect add_vouch">
                                {'+ Leave a voucher'}
                            </button>
                        </div>
                    </div>

                    {state_data?.vouchesData?.length ?
                        <div className="section_wrapper">
                            <div className="custom_container">
                                <span className="sub_title">Vouchers</span>
                                <div className="flex_row">
                                    {state_data?.vouchesData.map((item: any) => (
                                        <div className="flex_col_sm_3">
                                            <div className="review_card vouchers">
                                                <div className="pic_shot_dtl">
                                                    <figure className="u_img">
                                                        <img src={item?.userImage || dummy} alt="user-img" />
                                                    </figure>
                                                    <div className="name_wrap">
                                                        <span className="user_name" title={item?.builderName || ''}>
                                                            {item?.builderName || ''}
                                                        </span>
                                                        <span className="date">
                                                            {item?.date}
                                                        </span>
                                                    </div>
                                                </div>

                                                <span className="xs_head">
                                                    {item?.jobName}
                                                </span>

                                                <p className="commn_para" title="">
                                                    {item?.vouchDescription || ''}
                                                </p>
                                                <div className="vouch">
                                                    <figure className="vouch_icon">
                                                        <img src={vouch} alt="vouch" />
                                                    </figure>
                                                    <span
                                                        onClick={() => {
                                                            setToggleRecommendation((prev: any) => !prev)
                                                        }}
                                                        className="link">
                                                        {`Vouch for ${item?.tradieName}`}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        : null}
                </div>
            </div>
        </div >
    )
}

export default withRouter(Vouchers);