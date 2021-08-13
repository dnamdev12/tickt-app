import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getPopularBuilder } from '../../redux/homeSearch/actions';

import dummy from '../../assets/images/u_placeholder.jpg';
import Location from "../../assets/images/ic-location.png";

const PopularBuilders = (props: any) => {
    const [buildersList, setBuildersList] = useState<Array<any>>([]);
    const [totalCount, setTotalCount] = useState<number>(1);
    const [pageNo, setPageNo] = useState<number>(1);
    const [hasMoreItems, setHasMoreItems] = useState<boolean>(true);
    const lat: string = props.history?.location?.state?.coordinates[1] ? props.history?.location?.state?.coordinates[1] : -37.8136;
    const long: string = props.history?.location?.state?.coordinates[0] ? props.history?.location?.state?.coordinates[0] : 144.9631;

    useEffect(() => {
        callJobList();
    }, []);

    const callJobList = async () => {
        if (buildersList.length >= totalCount) {
            setHasMoreItems(false);
            return;
        }
        const data = {
            long: long,
            lat: lat,
            page: pageNo,
            perPage: 10
        }
        const res = await getPopularBuilder(data);
        if (res.success) {
            const allBuilders = [...buildersList, ...res.result?.data];
            if (res.result?.data?.length < 10) {
                setHasMoreItems(false);
            }
            setBuildersList(allBuilders);
            setPageNo(pageNo + 1);
            if (res.result?.data?.totalCount !== totalCount) {
                setTotalCount(res.result?.data?.totalCount);
            }
        }
    }
    const backButtonClicked = () => {
        props.history?.goBack();
    }

    console.log('props: ', props);

    return (
        <div className="app_wrapper">
            <div className="section_wrapper bg_gray">
                <div className="custom_container">
                    <div className="relate">
                        <button className="back" onClick={backButtonClicked}></button>
                        <span className="title">Popular builders</span>
                    </div>
                    <InfiniteScroll
                        dataLength={buildersList.length}
                        next={callJobList}
                        style={{ overflowX: 'hidden' }}
                        hasMore={hasMoreItems}
                        loader={<></>}
                    >
                        <div className="flex_row tradies_row">
                            <div className="flex_col_sm_4">
                                <div className="tradie_card">
                                    <a href="javascript:void(0)" className="more_detail circle"></a>
                                    <div className="user_wrap">
                                        <figure className="u_img">
                                            <img src={dummy} alt="traide-img" />
                                        </figure>
                                        <div className="details">
                                            <span className="name">John Oldman</span>
                                            <span className="rating">4.9, 36 reviews </span>
                                        </div>
                                    </div>
                                    <div className="tags_wrap">
                                        <ul>
                                            <li className="main">
                                                <img src={Location} alt="icon" />Plumber
                                            </li>
                                            <li className="main">
                                                <img src={Location} alt="icon" />Electrician
                                            </li>
                                            <li>Electrical Instrumentation</li>
                                            <li>Security and Fire Alarm Installation</li>
                                            <li>Electrical Instrumentation</li>
                                            <li>Security and Fire Alarm Installation</li>
                                            <li>More</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </InfiniteScroll>
                </div>
            </div>
        </div>
    )
}

export default PopularBuilders;
