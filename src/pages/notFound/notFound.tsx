import notFound from '../../assets/images/not-found.png';
import { Link } from 'react-router-dom';

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
