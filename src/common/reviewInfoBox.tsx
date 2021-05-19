import dummy from '../assets/images/u_placeholder.jpg';

const ReviewInfoBox = (props: any) => {
    return (
        <div className="flex_col_sm_3">
            <div className="review_card">
                <div className="rating_star">
                    star here..
                </div>
                <div className="pic_shot_dtl">
                    <figure className="u_img">
                        <img src={dummy} alt="user-img" />
                    </figure>
                    <div className="name_wrap">
                        <span className="user_name" title="Cheryl">Cheryl</span>
                        <span className="date">August 2020</span>
                    </div>
                </div>
                <p className="commn_para" title="">Don’t usually go for Global Industries boards but my go to longboard was in the shop being repaired. Compared to my usual this one isn’t as grippy but the weight and speed really made up for it. That’s great.</p>
            </div>
        </div>
    )
}

export default ReviewInfoBox;
