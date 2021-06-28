import React, { useState, useEffect } from 'react'
import dummy from '../../assets/images/u_placeholder.jpg';
import vouch from '../../assets/images/ic-template.png';
import { withRouter } from 'react-router-dom';
import {
    HomeTradieProfile,
    AddVoucher,
    ChooseJob,
    getVouchers
} from '../../redux/jobs/actions';

import AddVoucherModal from './addVoucher';
import VoucherDetailModal from './voucherDetail';

const Vouchers = (props: any) => {
    const [stateData, setStateData] = useState<any>([]);
    const [errors, setErrors] = useState({});
    const [toggleRecommendation, setToggleRecommendation] = useState({ isTrue: false, item: {} });

    const [jobsList, setJobsList] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});

    const { id, path } = props?.location?.state;

    const closeToggle = () => {
        setToggleRecommendation({ isTrue: false, item: {} });
        setSelectedItem({});
        setToggle((prev: any) => false);
        prefetch();
    }

    useEffect(() => {
        prefetch();
    }, [id, path])


    const prefetch = async () => {
        let res_profile: any = await getVouchers({ tradieId: id, page:1 })
        // let res_profile: any = await HomeTradieProfile({ tradieId: id });
        if (res_profile.success) {

            let completeItems = res_profile?.data?.vouchesData; //[]
            // console.log({ res_profile })
            // if (res_profile?.data?.vouchesData?.length) {

            //     completeItems = res_profile?.data?.vouchesData?.concat([
            //         {
            //             "builderId": "608917d4905fe43acf9f3209",
            //             "builderName": "Test Builder",
            //             "builderImage": "https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659652_960_720.png",
            //             "date": "June 2021",
            //             "voucherId": "60cb63996ae55b1209e30b4c",
            //             "jobId": "60ca1193ebe3c60a92de499d",
            //             "jobName": "Test CT",
            //             "tradieId": "60b9d9e297d08d1ac8d0f57d",
            //             "tradieName": "Test Trade",
            //             "vouchDescription": "lorem ipsum simple dummy text",
            //             "recommendation": "https://appinventiv-development.s3.amazonaws.com/1623941933784file-sample_100kB.doc"
            //         }
            //     ])
            // }
            setStateData(res_profile.data);
        }
    }

    console.log({ selectedItem, toggle });
    let state_data: any = stateData;

    return (
        <div className="app_wrapper">
            <div className="section_wrapper">
                <div className="custom_container">

                    <VoucherDetailModal
                        toggleProps={toggleRecommendation.isTrue}
                        item={toggleRecommendation.item}
                        id={id}
                        closeToggle={closeToggle}
                    />
                    <AddVoucherModal
                        toggleProps={toggle}
                        id={id}
                        closeToggle={closeToggle}
                    />

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
                                    {`${stateData.length} Vouches`}
                                </span>
                            </div>
                        </div>
                        <div className="flex_col_sm_6 text-right">
                            <button
                                onClick={() => { setToggle((prev: any) => true) }}
                                className="fill_btn btn-effect add_vouch">
                                {'+ Leave a voucher'}
                            </button>
                        </div>
                    </div>

                    {state_data?.length ?
                        <div className="section_wrapper">
                            <div className="custom_container">
                                <span className="sub_title">Vouches</span>
                                <div className="flex_row">
                                    {state_data.map((item: any) => (
                                        <div className="flex_col_sm_3">
                                            <div className="review_card vouchers">
                                                <div className="pic_shot_dtl">
                                                    <figure className="u_img">
                                                        <img src={item?.builderImage || dummy} alt="user-img" />
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
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setToggleRecommendation((prev: any) => ({ ...prev, ...{ isTrue: true, item: item } }));
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