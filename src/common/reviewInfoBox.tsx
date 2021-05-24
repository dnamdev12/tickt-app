import dummy from '../assets/images/u_placeholder.jpg';

const ReviewInfoBox = (props: any) => {
    const { item } = props;
    return (
        <div className="flex_col_sm_3" key={item.reviewId}>
            <div className="review_card">
                <div className="rating_star">
                    star here..
                </div>
                <div className="pic_shot_dtl">
                    <figure className="u_img">
                        <img src={item.reviewSenderImage ? item.reviewSenderImage : dummy} alt="user-img" />
                    </figure>
                    <div className="name_wrap">
                        <span className="user_name" title="Cheryl">{item.reviewSenderName}</span>
                        <span className="date">{item.date}</span>
                    </div>
                </div>
                <p className="commn_para" title="">{item.review}</p>
            </div>
        </div>
    )
}

export default ReviewInfoBox;
