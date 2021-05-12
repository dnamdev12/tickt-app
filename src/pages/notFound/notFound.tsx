import notFound from '../../assets/images/not-found.png';
import { Link } from 'react-router-dom';

import menu from '../../assets/images/ic-filter-unselected.png';
import remove from '../../assets/images/close 1.png';
import dummy from '../../assets/images/u_placeholder.jpg';
import approved from '../../assets/images/approved.png';
import waiting from '../../assets/images/exclamation.png';
import rateStar from '../../assets/images/ic-star-fill.png';
import editIconBlue from '../../assets/images/ic-edit-blue.png';
import check from '../../assets/images/checked-2.png';
import more from '../../assets/images/icon-direction-right.png';
import templateImage from '../../assets/images/job-complete-bg.png';



export default function NotFound() {
    return (
        <div className="error_page_wrap">
            <figure className="no_img">
                <img src={notFound} alt="not-found" />
            </figure>
            <div className="content">
                <h1>Page Not Found</h1>
                <Link to="/" className="fill_btn" title=" Home">Back To Home</Link>
            </div>
        </div>

    )
}
