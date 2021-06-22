import dummy from '../../../assets/images/u_placeholder.jpg';
import approved from '../../../assets/images/approved.png';
import waiting from '../../../assets/images/exclamation.png';
import noDataFound from "../../../assets/images/no-search-data.png";
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

interface Proptypes {
  loading: boolean;
  getAppliedJobList: (page: number) => void,
  appliedJobList: Array<any>,
};

const AppliedJobs = ({ loading, getAppliedJobList, appliedJobList }: Proptypes) => {
  useEffect(() => {
    getAppliedJobList(1);
  }, [getAppliedJobList]);

  return (
    <>
      {/* Applied Jobs */}
      <span className="sub_title">Applied Jobs</span>
      <div className="flex_row tradies_row">
        {appliedJobList.length ? appliedJobList.map(({ jobId, tradeSelectedUrl, tradeId, specializationId, jobName, tradeName, time, amount, locationName, durations, milestoneNumber, totalMilestones, status }) => (
          <div className="flex_col_sm_6">
            <div className="tradie_card" data-aos="fade-in" data-aos-delay="250" data-aos-duration="1000">
              <NavLink to={`/job-details-page?jobId=${jobId}&redirect_from=jobs`} className="more_detail circle"></NavLink>
              <div className="user_wrap">
                <figure className="u_img">
                  <img src={tradeSelectedUrl || dummy} alt="traide-img" />
                </figure>
                <div className="details">
                    <span className="name">{tradeName}</span>
                    <span className="prof">{jobName}</span>
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
              <div className="job_progress_wrap" id="scroll-progress-bar">
                <div className="progress_wrapper">
                  <span className="completed-digit" id="digit-progress">
                    <b>Job Milestones {milestoneNumber}</b> of {totalMilestones}
                  </span>
                  <span className="approval_info">
                    <img src={waiting} alt="icon" />
                    PENDING
                  </span>
                  <span className="progress_bar">
                    <input
                      className="done_progress"
                      id="progress-bar"
                      type="range"
                      min="0"
                      value={milestoneNumber}
                      max={totalMilestones}
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        )) : !loading && (
          <div className="no_record  m-t-vh">
            <figure className="no_img">
              <img src={noDataFound} alt="data not found" />
            </figure>
            <span>No Data Found</span>
          </div>
        )}
      </div>
      {/* Applied Jobs close */}
    </>
  );
};

export default AppliedJobs;
