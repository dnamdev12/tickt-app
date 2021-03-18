import React from 'react';
import notFound from '../../assets/images/not-found.png';


export default function NotFound() {
    return (
        <div className="error_page_wrap">
            <figure className="no_img">
                <img src={notFound} alt="not-found" />
            </figure>
            <div className="content">
                <h1>Page Not Found</h1>
                <a className="fill_btn" title=" Home">Back To Home</a>
            </div>
        </div>
    )
}
