import notFound from '../../assets/images/not-found.png';
import { Link } from 'react-router-dom';

import menu from '../../assets/images/ic-filter-unselected.png';
import remove from '../../assets/images/close 1.png';

export default function NotFound() {
    return (
        // <div className="error_page_wrap">
        //     <figure className="no_img">
        //         <img src={notFound} alt="not-found" />
        //     </figure>
        //     <div className="content">
        //         <h1>Page Not Found</h1>
        //         <Link to="/" className="fill_btn" title=" Home">Back To Home</Link>
        //     </div>
        // </div>


        <div className="custom_container">
            <span className="mob_side_nav">
                <img src={menu} alt="mob-side-nav" />
            </span>
            <div className="f_row">
                <div className="side_nav_col">
                    <button className="close_nav">
                        <img alt="close" />
                    </button>
                    <div className="stick">
                        <span className="title">Job Dashboard</span>
                        <ul className="dashboard_menu">
                            <li>
                                <a className="icon star active">Active Jobs</a>
                            </li>
                            <li>
                                <a className="icon applied">Applied jobs</a>
                            </li>
                            <li>
                                <a className="icon past">Past jobs</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
