// @ts-ignore
import ReactStars from "react-rating-stars-component";
import Rating from 'react-rating';

import dummy from '../assets/images/u_placeholder.jpg';
import vouch from '../assets/images/ic-template.png';



const empty_star_rating_below = (<span className="" data-index="4" data-forhalf="★" style={{ position: "relative", overflow: "hidden", cursor: "pointer", display: "block", float: "left", color: "rgb(223, 229, 239)", fontSize: "20px" }}>★</span>);

const full_star_rating_below = (<span className="" data-index="0" data-forhalf="★" style={{ position: "relative", overflow: "hidden", cursor: "pointer", display: "block", float: "left", color: "rgb(255, 215, 0)", fontSize: "20px" }}>★</span>);
const ReviewInfoBox = (props: any) => {
    const { item } = props;
    return (
        <div className="flex_col_sm_3" key={item.reviewId}>
            <div className="review_card">
                <div className="rating_star">
                    {/* <ReactStars
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
                    /> */}

                    <Rating
                        fractions={2}
                        emptySymbol={empty_star_rating_below}
                        fullSymbol={full_star_rating_below}
                        initialRating={item.rating ? item.rating : item.ratings}
                        readonly={true}
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
                        <i style={{ color: '#929292' }}>
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
