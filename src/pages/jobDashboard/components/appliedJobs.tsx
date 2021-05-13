import dummy from '../../../assets/images/u_placeholder.jpg';
import approved from '../../../assets/images/approved.png';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

interface Proptypes {
  getAppliedJobList: (page: number) => void,
  appliedJobList: Array<any>,
};

const AppliedJobs = ({ getAppliedJobList, appliedJobList }: Proptypes) => {
  useEffect(() => {
    getAppliedJobList(1);
  }, [getAppliedJobList]);

  return (
    <>
      {/* Applied Jobs */}
      <span className="sub_title">Applied Jobs</span>
      <div className="flex_row tradies_row">
        {appliedJobList.map(({ jobId, tradeId, specializationId, tradeSelectedUrl, jobName, time, amount, locationName, durations }) => (
          <div className="flex_col_sm_6">
            <div className="tradie_card">
              <NavLink to={`/job-details-page?jobId=${jobId}&tradeId=${tradeId}&specializationId=${specializationId}`} className="more_detail circle"></NavLink>
              <div className="user_wrap">
                <figure className="u_img">
                  <img src={tradeSelectedUrl || dummy} alt="traide-img" />
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
              <div className="job_progress_wrap" id="scroll-progress-bar">
                <div className="progress_wrapper">
                  <span className="completed-digit" id="digit-progress">
                    <b>Job Milestones 2</b> of 5
                  </span>
                  <span className="approval_info">
                    <img src={approved} alt="icon" />
                    Approved
                    {/* Awating */}
                    {/* <img src={waiting} alt="icon" /> */}
                    {/* Need approval */}
                  </span>
                  <span className="progress_bar">
                    <input
                      className="done_progress"
                      id="progress-bar"
                      type="range"
                      min="0"
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Applied Jobs close */}
    </>
  );
};

export default AppliedJobs;
