import { useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import dummy from '../../../assets/images/u_placeholder.jpg';
import rateStar from '../../../assets/images/ic-star-fill.png';
import noDataFound from "../../../assets/images/no-search-data.png";
import more from '../../assets/images/icon-direction-right.png';
import { format } from 'date-fns';
import { renderTime } from '../../../utils/common';
import { setShowToast } from '../../../redux/common/actions';

interface Proptypes {
  loading: boolean;
  getPastJobList: (page: number) => void,
  pastJobList: Array<any>,
  history: any
};

const PastJobs = (props: Proptypes) => {
  useEffect(() => {
    props.getPastJobList(1);
  }, [props.getPastJobList]);

  return (
    <>
      <span className="sub_title">Past Jobs</span>
      <div className="flex_row tradies_row">
        {props.pastJobList.length ? props.pastJobList?.map((item: any) => (
          <div className="flex_col_sm_6" key={item.jobId}>
            <div className="tradie_card" data-aos="fade-in" data-aos-delay="250" data-aos-duration="1000">
              <NavLink to={`/job-details-page?jobId=${item.jobId}&redirect_from=jobs`} className="more_detail circle"></NavLink>
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
                  <li className="icon clock">
                    {renderTime(item.fromDate, item.toDate)}
                  </li>
                  <li className="icon dollar">{item.amount}</li>
                  <li className="icon location line-1">{item.locationName}</li>
                  {item.durations ? <li className="icon calendar">{item.durations}</li> : <li><span className="job_status">{item.status}</span></li>}
                </ul>
              </div>
              {/* <p className="commn_para line-3">
                {builderData.jobDescription}
              </p> */}
              <div className="job_progress_wrap" id="scroll-progress-bar">
                <div className="progress_wrapper">
                  <span className="completed-digit" id="digit-progress">
                    <b>Job Milestones {item.milestoneNumber}</b> of {item.totalMilestones}
                  </span>
                  <span className="progress_bar">
                    <input
                      className="done_progress"
                      id="progress-bar"
                      type="range"
                      min="0"
                      value={item.milestoneNumber / item.totalMilestones * 100}
                    />
                  </span>
                </div>
              </div>
              {/* {!item?.isRated && <NavLink to={{
                  pathname: "/review-builder",
                  state: { item: item }
                }}
                >
                  <button className="fill_grey_btn full_btn">
                    <img src={rateStar} alt="rating-star" /> Rate this job
                </button>
                </NavLink>} */}
              <button className="fill_grey_btn full_btn" onClick={() => setShowToast(true, 'Under Development')}>
                <img src={rateStar} alt="rating-star" /> Rate this job
              </button>
            </div>
          </div>
        )) : !props.loading && (
          <div className="no_record  m-t-vh">
            <figure className="no_img">
              <img src={noDataFound} alt="data not found" />
            </figure>
            <span>No Data Found</span>
          </div>
        )}
      </div >
    </>);
};

export default PastJobs;

{/*Review for builder */ }
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
{/* Review for builder close */ }
