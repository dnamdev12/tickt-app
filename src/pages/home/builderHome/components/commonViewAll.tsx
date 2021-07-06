import TradieBox from '../../../shared/tradieBox';
import noData from '../../../../assets/images/no-search-data.png';
import dummy from '../../../../assets/images/u_placeholder.jpg';
import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom';
import { getSavedTradies } from '../../../../redux/jobs/actions'
import { setShowToast, setLoading } from '../../../../redux/common/actions';

const SavedJobs = (props: any) => {
    const [stateData, setStateData] = useState<any>([]);
    const [isLoad, setLoad] = useState(false);

    const backButtonClicked = () => {
        props.history?.goBack();
    }

    const preFetch = async () => {
        let response = await getSavedTradies({ page: 1 });
        if (response?.success) {
            setStateData(response.data);
            setLoad(true);
        }
    }

    useEffect(() => {
        console.log({
            state:props?.location?.state
        })
        setLoad(false);
        if (props?.location?.state?.title === "Saved tradespeople") {
            preFetch();
        } else {
            setStateData(props?.location?.state?.data);
            setLoad(true);
        }
    }, []);

    if (!isLoad) {
        return null;
    }

    return (
        <div className={'app_wrapper'} >
            <div className="section_wrapper">
                <div className="custom_container">
                    <div className="relate">
                        <button className="back" onClick={backButtonClicked}></button>
                        <span className="title">
                            {props?.location?.state?.title}
                        </span>
                    </div>
                    {!props?.location?.state?.popular ? (

                        <div className="flex_row tradies_row">
                            {stateData.length > 0 ?
                                (stateData?.map((item: any, index: any) => (
                                    <TradieBox
                                        item={item}
                                        index={index}
                                    />
                                ))) :
                                <div className="no_record">
                                    <figure className="no_img">
                                        <img src={noData} alt="data not found" />
                                    </figure>
                                    <span>No Data Found</span>
                                </div>}
                        </div>
                    ) : (
                        <ul className="popular_tradies">
                            {stateData?.length > 0 ?
                                (stateData?.map((item: any, index: any) => {
                                    return (
                                        <li
                                            key={`${item.userName}item${index}`}
                                            data-aos="flip-right"
                                            data-aos-delay="200"
                                            onClick={() => {
                                                // setShowToast(true,'Under development');
                                                if (props?.history && item?.tradieId) {
                                                    props?.history?.push(`tradie-info?tradeId=${item?.tradieId}&hideInvite=${false}`);
                                                }
                                            }}
                                            data-aos-duration="1000">
                                            <figure className="tradies_img">
                                                <img src={item.userImage || dummy} alt="tradies-img" />
                                            </figure>
                                            <span className="name">{item.userName}</span>
                                            <span className="post">{item.trade}</span>
                                        </li>)
                                })) : (
                                    <div className="no_record">
                                        <figure className="no_img">
                                            <img src={noData} alt="data not found" />
                                        </figure>
                                        <span>No Data Found</span>
                                    </div>
                                )}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    )
}

export default withRouter(SavedJobs);
