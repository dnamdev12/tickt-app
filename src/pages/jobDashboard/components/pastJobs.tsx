import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import dummy from '../../../assets/images/u_placeholder.jpg';
import rateStar from '../../../assets/images/ic-star-fill.png';
import more from '../../assets/images/icon-direction-right.png';

interface Proptypes {
  getPastJobList: (page: number) => void,
  pastJobList: Array<any>,
};

const PastJobs = ({ getPastJobList, pastJobList }: Proptypes) => {
  useEffect(() => {
    getPastJobList(1);
  }, [getPastJobList]);

  return (
    <>
      {/* Past Jobs */}
      <span className="sub_title">Past Jobs</span>
      <div className="flex_row tradies_row">
        {pastJobList.map(({ jobId, tradeId, specializationId, tradeSelectedUrl, jobName, jobDescription, time, amount, locationName, durations }) => (
          <div className="flex_col_sm_6">
            <div className="tradie_card">
              <NavLink to={`/job-details-page?jobId=${jobId}&tradeId=${tradeId}&specializationId=${specializationId}`} className="more_detail circle"></NavLink>
              <div className="user_wrap">
                <figure className="u_img">
                  <img src={dummy || tradeSelectedUrl} alt="traide-img" />
                </figure>
                <div className="details">
                  <span className="name">{jobName}</span>
                </div>
              </div>
              <div className="job_info">
                <ul>
                  <li className="icon clock">{time}</li>
                  <li className="icon dollar">{amount}</li>
                  <li className="icon location line-1">{locationName}</li>
                  <li className="icon calendar">{durations}</li>
                </ul>
              </div>
              <button className="fill_grey_btn full_btn">
                <img src={rateStar} alt="rating-star" /> Rate this job
              </button>
              {/* <p className="commn_para line-3">
                {jobDescription}
              </p> */}
            </div>
          </div>
        ))}
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
