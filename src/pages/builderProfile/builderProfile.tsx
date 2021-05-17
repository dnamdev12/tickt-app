import profilePlaceholder from '../../assets/images/ic-placeholder-detail.png';
import dummy from '../../assets/images/u_placeholder.jpg';
import portfolioPlaceholder from '../../assets/images/portfolio-placeholder.jpg';


const BuilderProfile = () => {
    return (
        <>
            <div className="app_wrapper">
                <div className="section_wrapper">
                    <div className="custom_container">
                        <div className="vid_img_wrapper pt-20">
                            <div className="flex_row">
                                <div className="flex_col_sm_8 relative">
                                    <button className="back"></button>
                                </div>
                            </div>
                            <div className="flex_row">
                                <div className="flex_col_sm_8">
                                    <figure className="vid_img_thumb">
                                        <img src={profilePlaceholder} alt="profile-pic" />
                                    </figure>
                                </div>
                                <div className="flex_col_sm_4 relative">
                                    <div className="detail_card">
                                        <span className="title">John Oldman</span>
                                        <span className="tagg">Project Manager</span>
                                        <span className="xs_sub_title">Company name</span>
                                        <ul className="review_job">
                                            <li>
                                                <span className="icon reviews">4.3</span>
                                                <span className="review_count"> reviews</span>
                                            </li>
                                            <li>
                                                <span className="icon job">21</span>
                                                <span className="review_count"> jobs completed</span>
                                            </li>
                                        </ul>
                                        <button className="fill_btn full_btn">Write a message</button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex_row description">
                                <div className="flex_col_sm_8">
                                    <div>
                                        <span className="sub_title">About</span>
                                        <p className="commn_para">** Currently on holiday, back Jan 10! ** Just finished up my Electricians apprenticeship working on large project sites around Melbourne. I aim to finish all my work in a timely and affordable manner. If that sounds good to you, flick me a message and I’ll reply ASAP! Just finished up my Electricians apprenticeship working on large project sites around Melbourne. I aim to finish all my work in a timely and affordable manner. Just finished up my Electricians apprenticeship working on large project sites around Melbourne. </p>
                                    </div>
                                </div>
                                <div className="flex_col_sm_4">
                                    <span className="sub_title">Areas of jobs</span>
                                    <div className="tags_wrap">
                                        <ul>
                                            <li>Circuit Board Wiring</li>
                                            <li>Highway</li>
                                            <li>Circuit Board Wiring</li>
                                            <li>Highway Systems</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="section_wrapper">
                    <div className="custom_container">
                        <span className="sub_title">Portfolio</span>
                        <ul className="portfolio_wrappr">
                            <li>
                                <figure className="portfolio_img">
                                    <img src={portfolioPlaceholder} alt="portfolio-images" />
                                    <span className="xs_sub_title">Machine Maintenance</span>
                                </figure>
                            </li>
                            <li>
                                <figure className="portfolio_img">
                                    <img src={portfolioPlaceholder} alt="portfolio-images" />
                                    <span className="xs_sub_title">Machine Maintenance</span>
                                </figure>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="section_wrapper">
                    <div className="custom_container">
                        <span className="sub_title">Job posted</span>
                        <div className="flex_row tradies_row">
                            <div className="flex_col_sm_6">
                                <div className="tradie_card">
                                    <a href="javascript:void(0)" className="more_detail circle"></a>
                                    <div className="user_wrap">
                                        <figure className="u_img">
                                            <img src={dummy} alt="traide-img" />
                                        </figure>
                                        <div className="details">
                                            <span className="name">Wire up circuit box</span>
                                        </div>
                                    </div>
                                    <div className="job_info">
                                        <ul>
                                            <li className="icon clock">32 minutes ago</li>
                                            <li className="icon dollar">$250 p/h</li>
                                            <li className="icon location line-1">Melbourne CBD</li>
                                            <li className="icon calendar">4 days </li>
                                        </ul>
                                    </div>
                                    <p className="commn_para">Sparky wanted for a quick job to hook up two floodlights on the exterior of an apartment building to the main electrical grid. Current sparky away due to illness. Sparky wanted for a quick job to hook up two floodlights...</p>
                                    <ul className="count_wrap">
                                        <li className="icon view">127</li>
                                        <li className="icon comment">32</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="flex_col_sm_6">
                                <div className="tradie_card">
                                    <a href="javascript:void(0)" className="more_detail circle"></a>
                                    <div className="user_wrap">
                                        <figure className="u_img">
                                            <img src={dummy} alt="traide-img" />
                                        </figure>
                                        <div className="details">
                                            <span className="name">Wire up circuit box</span>
                                        </div>
                                    </div>
                                    <div className="job_info">
                                        <ul>
                                            <li className="icon clock">32 minutes ago</li>
                                            <li className="icon dollar">$250 p/h</li>
                                            <li className="icon location line-1">Melbourne CBD</li>
                                            <li className="icon calendar">4 days </li>
                                        </ul>
                                    </div>
                                    <p className="commn_para">Sparky wanted for a quick job to hook up two floodlights on the exterior of an apartment building to the main electrical grid. Current sparky away due to illness. Sparky wanted for a quick job to hook up two floodlights...</p>
                                    <ul className="count_wrap">
                                        <li className="icon view">127</li>
                                        <li className="icon comment">32</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <button className="fill_grey_btn full_btn m-tb40 view_more">View all 10 jobs</button>
                    </div>
                </div>

                <div className="section_wrapper">
                    <div className="custom_container">
                        <span className="sub_title">Reviews</span>
                        <div className="flex_row review_parent">
                            <div className="flex_col_sm_3">
                                <div className="review_card">
                                    <div className="rating_star">
                                        star here..
                                </div>
                                    <div className="pic_shot_dtl">
                                        <figure className="u_img">
                                            <img src={dummy} alt="user-img" />
                                        </figure>
                                        <div className="name_wrap">
                                            <span className="user_name" title="Cheryl">Cheryl</span>
                                            <span className="date">August 2020</span>
                                        </div>
                                    </div>
                                    <p className="commn_para">Don’t usually go for Global Industries boards but my go to longboard was in the shop being repaired. Compared to my usual this one isn’t as grippy but the weight and speed really made up for it. That’s great.</p>
                                </div>
                            </div>
                            <div className="flex_col_sm_3">
                                <div className="review_card">
                                    <div className="rating_star">
                                        star here..
                                </div>
                                    <div className="pic_shot_dtl">
                                        <figure className="u_img">
                                            <img src={dummy} alt="user-img" />
                                        </figure>
                                        <div className="name_wrap">
                                            <span className="user_name" title="Cheryl">Cheryl</span>
                                            <span className="date">August 2020</span>
                                        </div>
                                    </div>
                                    <p className="commn_para" title="">Don’t usually go for Global Industries boards but my go to longboard was in the shop being repaired. Compared to my usual this one isn’t as grippy but the weight and speed really made up for it. That’s great.</p>
                                </div>
                            </div>
                            <div className="flex_col_sm_3">
                                <div className="review_card">
                                    <div className="rating_star">
                                        star here..
                                </div>
                                    <div className="pic_shot_dtl">
                                        <figure className="u_img">
                                            <img src={dummy} alt="user-img" />
                                        </figure>
                                        <div className="name_wrap">
                                            <span className="user_name" title="Cheryl">Cheryl</span>
                                            <span className="date">August 2020</span>
                                        </div>
                                    </div>
                                    <p className="commn_para">Don’t usually go for Global Industries boards but my go to longboard was in the shop being repaired. Compared to my usual this one isn’t as grippy but the weight and speed really made up for it. That’s great.</p>
                                </div>
                            </div>
                            <div className="flex_col_sm_3">
                                <div className="review_card">
                                    <div className="rating_star">
                                        star here..
                                </div>
                                    <div className="pic_shot_dtl">
                                        <figure className="u_img">
                                            <img src={dummy} alt="user-img" />
                                        </figure>
                                        <div className="name_wrap">
                                            <span className="user_name" title="Cheryl">Cheryl</span>
                                            <span className="date">August 2020</span>
                                        </div>
                                    </div>
                                    <p className="commn_para">Don’t usually go for Global Industries boards but my go to longboard was in the shop being repaired. Compared to my usual this one isn’t as grippy but the weight and speed really made up for it. That’s great.</p>
                                </div>
                            </div>
                            <div className="flex_col_sm_3">
                                <div className="review_card">
                                    <div className="rating_star">
                                        star here..
                                </div>
                                    <div className="pic_shot_dtl">
                                        <figure className="u_img">
                                            <img src={dummy} alt="user-img" />
                                        </figure>
                                        <div className="name_wrap">
                                            <span className="user_name" title="Cheryl">Cheryl</span>
                                            <span className="date">August 2020</span>
                                        </div>
                                    </div>
                                    <p className="commn_para">Don’t usually go for Global Industries boards but my go to longboard was in the shop being repaired. Compared to my usual this one isn’t as grippy but the weight and speed really made up for it. That’s great.</p>
                                </div>
                            </div>
                        </div>
                        <button className="fill_grey_btn full_btn view_more">View all 10 reviews</button>
                    </div>
                </div>
            </div>
        </>

    )
}

export default BuilderProfile;
