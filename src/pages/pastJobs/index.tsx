import dummy from '../../assets/images/u_placeholder.jpg';
import rateStar from '../../assets/images/ic-star-fill.png';

const PastJobs = () => {
  return (
    <>
      {/* Past Jobs */}
      <span className="sub_title">Past Jobs</span>
      <div className="flex_row tradies_row">
        <div className="flex_col_sm_6">
          <div className="tradie_card">
            <a href="javascript:void(0)" className="more_detail circle"></a>
            <div className="user_wrap">
              <figure className="u_img">
                <img src={dummy} alt="traide-img" />
              </figure>
              <div className="details">
                <span className="name">Wire up circuit box</span>
              </div>
            </div>
            <div className="job_info">
              <ul>
                <li className="icon clock">32 minutes ago</li>
                <li className="icon dollar">$250 p/h</li>
                <li className="icon location">Melbourne CBD</li>
                <li className="icon calendar">4 days </li>
              </ul>
            </div>
            <button className="fill_grey_btn full_btn">
              <img src={rateStar} alt="rating-star" /> Rate this job
            </button>
          </div>
        </div>
        <div className="flex_col_sm_6">
          <div className="tradie_card">
            <a href="javascript:void(0)" className="more_detail circle"></a>
            <div className="user_wrap">
              <figure className="u_img">
                <img src={dummy} alt="traide-img" />
              </figure>
              <div className="details">
                <span className="name">Wire up circuit box</span>
              </div>
            </div>
            <div className="job_info">
              <ul>
                <li className="icon clock">32 minutes ago</li>
                <li className="icon dollar">$250 p/h</li>
                <li className="icon location">Melbourne CBD</li>
                <li className="icon calendar">4 days </li>
              </ul>
            </div>
            <p className="commn_para line-3">
              Sparky wanted for a quick job to hook up two floodlights on the
              exterior of an apartment building to the main electrical grid.
            </p>
          </div>
        </div>
      </div>
      {/* Applied Jobs close */}
    </>
  );
};

export default PastJobs;
