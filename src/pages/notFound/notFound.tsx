import notFound from '../../assets/images/not-found.png';
import { Link } from 'react-router-dom';

import dummy from '../../assets/images/u_placeholder.jpg';
import search from '../../assets/images/main-search.png';

export default function NotFound() {
    return (
        // <div className="error_page_wrap">
        //     <figure className="no_img">
        //         <img src={notFound} alt="not-found" />
        //     </figure>
        //     <div className="content">
        //         <h1>Page Not Found</h1>
        //         <Link to="/" className="fill_btn btn-effect" title=" Home">Back To Home</Link>
        //     </div>
        // </div>


        // <div className="app_wrapper">
        //     <div className="section_wrapper">
        //         <div className="custom_container">
        //             <div className="relate">
        //                 <button className="back"></button>
        //                 <span className="title">My revenue</span>
        //             </div>
        //             <ul className="total_count_card">
        //                 <li className="revenue">
        //                     <span className="show_label">Total revenuew</span>
        //                     <span className="title">$23 285</span>
        //                 </li>
        //                 <li className="job">
        //                     <span className="show_label">Total Jobs</span>
        //                     <span className="title">12</span>
        //                 </li>
        //             </ul>
        //             <div className="flex_row center_flex">
        //                 <div className="flex_col_sm_3">
        //                     <span className="xs_sub_title mb0">Last jobs</span>
        //                 </div>
        //                 <div className="flex_col_sm_3">
        //                     <div className="search_bar">
        //                         <input type="text" placeholder="Search"/>
        //                         <span className="detect_icon_ltr">
        //                             <img src={search} alt="search" />
        //                         </span>
        //                     </div>

        //                 </div>
        //             </div>
        //             <div className="last_jobs">
        //                 <div className="flex_row">
        //                     <div className="flex_col_sm_3">
        //                         <span className="form_label">Job</span>
        //                     </div>
        //                     <div className="flex_col_sm_3">
        //                         <span className="form_label">Hired by</span>
        //                     </div>
        //                     <div className="flex_col_sm_3">
        //                         <span className="form_label">Date</span>
        //                     </div>
        //                     <div className="flex_col_sm_3">
        //                         <span className="form_label">Price</span>
        //                     </div>
        //                 </div>
        //                 <div className="flex_row center_flex">
        //                     <div className="flex_col_sm_3">
        //                         <div className="img_txt_wrap">
        //                             <figure className="job_img">
        //                                 <img src={dummy} alt="job-img" />
        //                             </figure>
        //                             <span className="inner_title">Wire up circuit box</span>
        //                         </div>
        //                     </div>
        //                     <div className="flex_col_sm_3">
        //                         <span className="inner_title">John Oldman</span>
        //                     </div>
        //                     <div className="flex_col_sm_3">
        //                         <span className="inner_title">25.08.2020</span>
        //                     </div>
        //                     <div className="flex_col_sm_3">
        //                         <span className="inner_title">$1400</span>
        //                     </div>
        //                 </div>
        //                 <div className="flex_row center_flex">
        //                     <div className="flex_col_sm_3">
        //                         <div className="img_txt_wrap">
        //                             <figure className="job_img">
        //                                 <img src={dummy} alt="job-img" />
        //                             </figure>
        //                             <span className="inner_title">Wire up circuit box</span>
        //                         </div>
        //                     </div>
        //                     <div className="flex_col_sm_3">
        //                         <span className="inner_title">John Oldman</span>
        //                     </div>
        //                     <div className="flex_col_sm_3">
        //                         <span className="inner_title">25.08.2020</span>
        //                     </div>
        //                     <div className="flex_col_sm_3">
        //                         <span className="inner_title">$1400</span>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>


        <div className="app_wrapper">
            <div className="section_wrapper">
                <div className="custom_container">
                    <div className="revenue_detail">
                        <button className="back"></button>
                        <ul className="total_count_card">
                            <li className="revenue">
                                <div className="f_spacebw">
                                    <div className="img_txt_wrap">
                                        <figure className="job_img">
                                            <img src={dummy} alt="job-img" />
                                        </figure>
                                        <span className="inner_title">Wire up circuit box</span>
                                    </div>
                                    <span className="sub_title">$1,400</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    );
}
