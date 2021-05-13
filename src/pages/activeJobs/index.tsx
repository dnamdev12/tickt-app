import dummy from '../../assets/images/u_placeholder.jpg';
import approved from '../../assets/images/approved.png';
import waiting from '../../assets/images/exclamation.png';

const ActiveJobs = () => {
  return (
    <>
      {/* Active Jobs */}
      <span className="sub_title">Active Jobs</span>
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
            <div className="job_progress_wrap" id="scroll-progress-bar">
              <div className="progress_wrapper">
                <span className="completed-digit" id="digit-progress">
                  <b>Job Milestones 2</b> of 5
                </span>
                <span className="approval_info">
                  <img src={approved} alt="icon" />
                  Approved{' '}
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
            <div className="job_progress_wrap" id="scroll-progress-bar">
              <div className="progress_wrapper">
                <span className="completed-digit" id="digit-progress">
                  <b>Job Milestones 2</b> of 5
                </span>
                <span className="approval_info">Awating </span>
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
            <div className="job_progress_wrap" id="scroll-progress-bar">
              <div className="progress_wrapper">
                <span className="completed-digit" id="digit-progress">
                  <b>Job Milestones 2</b> of 5
                </span>
                <span className="approval_info">
                  {/* <img src={approved} alt="icon" />Approved */}
                  <img src={waiting} alt="icon" />
                  Need approval
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
      </div>
      {/* Active Jobs close */}
    </>
  );
};

export default ActiveJobs;
