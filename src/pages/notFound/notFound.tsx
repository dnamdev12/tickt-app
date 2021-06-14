import notFound from '../../assets/images/not-found.png';
import { Link } from 'react-router-dom';

import dummy from '../../assets/images/u_placeholder.jpg';
import search from '../../assets/images/main-search.png';
import chatSearch from '../../assets/images/search-chat.png';
import more from '../../assets/images/icon-direction-right.png';
import menu from '../../assets/images/menu-line-blue.png';
import close from '../../assets/images/ic-cancel-blue.png';

export default function NotFound() {
    return (

        <div className="error_page_wrap">
            <figure className="no_img">
                <img src={notFound} alt="not-found" />
            </figure>
            <div className="content">
                <h1>Page Not Found</h1>
                <Link to="/" className="fill_btn btn-effect" title=" Home">Back To Home</Link>
            </div>
        </div>



        // -----My revenue list ------//

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
        //                 <div className="flex_col_sm_2">
        //                     <span className="xs_sub_title mb0">Last jobs</span>
        //                 </div>
        //                 <div className="flex_col_sm_4">
        //                     <div className="search_bar">
        //                         <input type="text" placeholder="Search" />
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
        //                             <div className="details">
        //                                 <span className="inner_title line-3">Wire up circuit box</span>
        //                             </div>
        //                         </div>
        //                     </div>
        //                     <div className="flex_col_sm_3">
        //                         <span className="inner_title line-3">John Oldman</span>
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
        //                             <div className="details">
        //                                 <span className="inner_title line-3">Wire up circuit box</span>
        //                             </div>
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

        // -----My revenue list close ------//


        // -----My revenue detail ------//

        // <div className="app_wrapper">
        //     <div className="section_wrapper">
        //         <div className="custom_container">
        //             <div className="revenue_detail">
        //                 <div className="flex_row">
        //                     <div className="flex_col_sm_8">
        //                         <button className="back"></button>
        //                         <ul className="total_count_card">
        //                             <li>
        //                                 <div className="flex_row center_flex">
        //                                     <div className="flex_col_sm_9">
        //                                         <div className="img_txt_wrap">
        //                                             <figure className="job_img">
        //                                                 <img src={dummy} alt="job-img" />
        //                                             </figure>
        //                                             <div className="details">
        //                                                 <span className="inner_title">Wire up circuit box</span>
        //                                                 <span className="show_label">May 24 - 25</span>
        //                                             </div>
        //                                         </div>
        //                                     </div>
        //                                     <div className="flex_col_sm_3 text-right">
        //                                         <span className="sub_title">$1,400</span>
        //                                     </div>
        //                                 </div>
        //                             </li>
        //                         </ul>
        //                     </div>
        //                     <div className="flex_col_sm_4 col_ruler">
        //                         <span className="sub_title">Posted by</span>
        //                         <div className="tradie_card posted_by view_more ">
        //                             <a href="javascript:void(0)" className="chat circle"></a>
        //                             <div className="user_wrap">
        //                                 <figure className="u_img">
        //                                     <img src={dummy} alt="img" />
        //                                 </figure>
        //                                 <div className="details">
        //                                     <span className="name">John Oldman</span>
        //                                     <span className="rating">4.9, 36 reviews</span>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                         <div className="relate">
        //                             <span className="sub_title">Job details</span>
        //                             <span
        //                                 className="edit_icon"
        //                                 title="More">
        //                                 <img src={more} alt="more" />
        //                             </span>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>

        // -----My revenue detail close ------//




        // <div className="app_wrapper">
        //     <div className="custom_container">
        //         <span className="mob_side_nav">
        //             <img src={menu} alt="mob-side-nav" />
        //         </span>
        //         <div className="f_row chat_wrapr">
        //             <div className="side_nav_col">
        //                 <button className="close_nav">
        //                     <img src={close} alt="close" />
        //                 </button>
        //                 <div className="stick">
        //                     <span className="title">Chat</span>
        //                     <div className="search_bar">
        //                         <input type="text" placeholder="Search" />
        //                         <span className="detect_icon_ltr">
        //                             <img src={chatSearch} alt="search" />
        //                         </span>
        //                     </div>
        //                     <ul className="chat_list">
        //                         <li>
        //                             <a href="javascript:void(0)" className="chat active">
        //                                 <figure className="u_img">
        //                                     <img src={dummy} alt="img" />
        //                                 </figure>
        //                                 <div className="detail">
        //                                     <span className="inner_title line-1">John Oldman</span>
        //                                     <span className="inner_title job line-1">Wire up circuit box</span>
        //                                     <p className="commn_para line-1">Hi, thanks for request, hope you..</p>
        //                                     <span className="date_time">Aug 20</span>
        //                                     <span className="count">2</span>
        //                                 </div>
        //                             </a>
        //                         </li>
        //                         <li>
        //                             <a href="javascript:void(0)" className="chat">
        //                                 <figure className="u_img">
        //                                     <img src={dummy} alt="img" />
        //                                 </figure>
        //                                 <div className="detail">
        //                                     <span className="inner_title line-1">John Oldman</span>
        //                                     <span className="inner_title job line-1">Wire up circuit box</span>
        //                                     <p className="commn_para line-1">Hi, thanks for request, hope you..</p>
        //                                     <span className="date_time">Aug 20</span>
        //                                     <span className="count grey">2</span>
        //                                 </div>
        //                             </a>
        //                         </li>
        //                     </ul>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>

    );
}
