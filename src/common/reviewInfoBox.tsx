// @ts-ignore
import ReactStars from "react-rating-stars-component";

import dummy from '../assets/images/u_placeholder.jpg';
import vouch from '../assets/images/ic-template.png';


const ReviewInfoBox = (props: any) => {
    const { item } = props;
    return (
        <div className="flex_col_sm_3" key={item.reviewId}>
            <div className="review_card">
                <div className="rating_star">
                    <ReactStars
                        count={5}
                        value={item.rating ? item.rating : item.ratings}
                        size={18}
                        edit={false}
                        isHalf={true}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        activeColor="#ffd700"
                        color='#DFE5EF'
                    />
                </div>
                <div className="pic_shot_dtl">
                    <figure className="u_img">
                        <img src={item.userImage ? item.userImage : item.reviewSenderImage ? item.reviewSenderImage : dummy} alt="user-img" />
                    </figure>
                    <div className="name_wrap">
                        <span className="user_name" title="Cheryl">{item.name ? item.name : item.reviewSenderName}</span>
                        <span className="date">{item.date}</span>
                    </div>
                </div>
                <p className="commn_para ---" title="">
                    {(item.review)?.length ? item.review :
                        <i style={{color:'#929292'}}>
                            {'No Comments'}
                        </i>
                    }
                </p>
                {/* <div className="vouch">
                    <figure className="vouch_icon">
                        <img src={vouch} alt="vouch" />
                    </figure>
                    <a className="link">Vouch for John Oldman</a>
                </div> */}
            </div>
        </div>
    )
}

export default ReviewInfoBox;
