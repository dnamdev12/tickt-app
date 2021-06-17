import dummy from '../assets/images/u_placeholder.jpg';


const TradieJobInfoBox = (props: any) => {
    const jobClickHandler = (item: any) => {
        props.history.push(`/job-details-page?jobId=${item.jobId}&tradeId=${item.tradeId}&specializationId=${item.specializationId}`);
    }

    const { item } = props;
    return (
        <div className="flex_col_sm_6">
            <div className="tradie_card" data-aos="fade-in" data-aos-delay="250" data-aos-duration="1000">
                <a href="javascript:void(0)" className="more_detail circle" onClick={() => jobClickHandler(item)} />
                <div className="user_wrap">
                    <figure className="u_img">
                        <img src={item.tradeSelectedUrl ? item.tradeSelectedUrl : dummy} alt="traide-img" />
                    </figure>
                    <div className="details">
                        <span className="name">{item.tradeName}</span>
                        <span className="prof">{item.jobName}</span>
                    </div>
                </div>
                <div className="job_info">
                    <ul>
                        <li className="icon clock">{item.time}</li>
                        <li className="icon dollar">{item.amount}</li>
                        <li className="icon location line-1">{item.locationName}</li>
                        <li className="icon calendar">{item.durations}</li>
                    </ul>
                </div>
                <p className="commn_para line-3">{item.jobDescription}</p>
                <ul className="count_wrap">
                    <li className="icon view">{item.viewersCount}</li>
                    <li className="icon comment">{item.questionsCount}</li>
                </ul>
            </div>
        </div>
    )
}

export default TradieJobInfoBox;
