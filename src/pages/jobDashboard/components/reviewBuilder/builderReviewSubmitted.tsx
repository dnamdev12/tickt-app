import { NavLink } from 'react-router-dom';
import reviewBuilderSuccess from '../../../../assets/images/review-builder-success.png';

const BuilderReviewSuccess = () => {
    return (
        <div className="img_text_wrap">
            <figure className="full_image">
                <img src={reviewBuilderSuccess} alt="template-image" />
                <div className="short_info">
                    <div className="content">
                        <h1 className="title">Thanks!</h1>
                        <span className="show_label">
                            Your review will help other tradies find the highest quality builders on Tickt.
                        </span>
                        <NavLink to='/past-jobs'>
                            <div className="btn_wrapr">
                                <button className="fill_btn btn-effect">OK</button>
                            </div>
                        </NavLink>
                    </div>
                </div>
            </figure>
        </div>
    )
}

export default BuilderReviewSuccess;
