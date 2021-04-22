import dummy from '../../assets/images/u_placeholder.jpg';
import Location from "../../assets/images/ic-location.png";


const PopularBuilders = (props: any) => {

    const backButtonClicked = () => {
        props.history?.goBack();
    }

    return (
        <div className="app_wrapper">
            <div className="section_wrapper bg_gray">
                <div className="custom_container">
                    <div className="relate">
                        <button className="back" onClick={backButtonClicked}></button>
                        <span className="title">Popular builders</span>
                    </div>
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
                </div>
            </div>
        </div>
    )
}

export default PopularBuilders;
