import dummy from '../../assets/images/u_placeholder.jpg';
import rateStar from '../../assets/images/ic-star-fill.png';
import more from '../../assets/images/icon-direction-right.png';


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
                <li className="icon location line-1">Melbourne CBD</li>
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
                <li className="icon location line-1">Melbourne CBD</li>
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
      {/* Past Jobs close */}



      {/*Review for builder */}
      {/* <div className="flex_row">
        <div className="flex_col_sm_6">
          <div className="relate">
            <button className="back"></button>
            <span className="xs_sub_title">Wire up circuit box</span>
          </div>
          <div className="form_field">
            <span className="sub_title">Review completed job</span>
          </div>
          <span className="inner_title">Rate this builder</span>
          <div className="form_field">
            Rating star here
          </div>
          <div className="form_field">
            <label className="form_label">Comment</label>
            <div className="text_field">
              <input type="text" placeholder="Thanks.." />
            </div>
          </div>
          <div className="form_field">
            <button className="fill_btn full_btn">Leave review</button>
          </div>
        </div>
        <hr></hr>
        <div className="flex_col_sm_6">
          <div className="relate">
            <span className="sub_title">Job details</span>
            <span className="edit_icon" title="More">
              <img src={more} alt="more" />
            </span>
          </div>
          <div className="tradie_card posted_by view_more ">
            <div className="user_wrap">
              <figure className="u_img">
                <img src={dummy} alt="traide-img" />
              </figure>
              <div className="details">
                <span className="name">Electrician</span>
                <span className="prof">Wire up 2 rooms in new apartment</span>
                <span className="prof">May 23 - 25 </span>
              </div>
            </div>
          </div>

        </div>
      </div> */}
      {/* Review for builder close */}


    </>
  );
};

export default PastJobs;
