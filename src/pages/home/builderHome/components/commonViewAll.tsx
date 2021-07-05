import TradieBox from '../../../shared/tradieBox';
import noData from '../../../../assets/images/no-search-data.png';
import dummy from '../../../../assets/images/u_placeholder.jpg';


const SavedJobs = (props: any) => {

    const backButtonClicked = () => {
        props.history?.goBack();
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
                            {props?.location?.state?.data?.length > 0 ?
                                (props?.location?.state?.data?.map((item: any, index: any) => (
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
                            {props?.location?.state?.data?.length > 0 ?
                                (props?.location?.state?.data?.map((item: any, index: any) => {
                                    return (
                                        <li
                                            key={`${item.userName}item${index}`}
                                            data-aos="flip-right"
                                            data-aos-delay="200"
                                            onClick={() => {
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

    // else {
    //     return (
    //         <div className="section_wrapper bg_gray">
    //             <div className="custom_container">
    //                 <span className="title">
    //                     {'Popular tradespeople'}
    //                 </span>

    //             </div>
    //         </div>
    //     )
    // }
}

export default SavedJobs;
