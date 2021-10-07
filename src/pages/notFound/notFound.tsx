import notFound from '../../assets/images/not-found.png';
import { Link } from 'react-router-dom';

import dummy from '../../assets/images/u_placeholder.jpg';
import search from '../../assets/images/main-search.png';
import chatSearch from '../../assets/images/search-chat.png';
import more from '../../assets/images/icon-direction-right.png';
import viewMore from '../../assets/images/icon-direction-blue.png';
import menu from '../../assets/images/menu-line-blue.png';
import close from '../../assets/images/ic-cancel-blue.png';
import sendMedia from '../../assets/images/ic-media.png';
import sendBtn from '../../assets/images/ic-send.png';

export default function NotFound() {

    return (
        <div className="error_page_wrap">
            <figure className="no_img">
                <img src={notFound} alt="not-found" />
            </figure>
            <div className="content">
                <h1>Page Not Found</h1>
                <Link to="/" className="fill_btn full_btn btn-effect" title="Home">Back To Home</Link>
            </div>
        </div>
    )
}
