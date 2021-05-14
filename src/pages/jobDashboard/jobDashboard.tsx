import { useState } from 'react';
import { NavLink, Route, Switch, useHistory } from 'react-router-dom';

import menu from '../../assets/images/menu-line-blue.png';
import close from '../../assets/images/ic-cancel-blue.png';
import ActiveJobsPage from '../activeJobs';
import AppliedJobsPage from '../appliedJobs';
import PastJobsPage from '../pastJobs';
import NewJobsPage from '../newJobs';
import ApprovedMilestonesPage from '../approvedMilestones';
import MarkMilestonePage from '../markMilestone';
import templateImage from '../../assets/images/job-complete-bg.png';
import reviewBuilderSuccess from '../../assets/images/review-builder-success.png';


const JobDashboard = () => {
  const history = useHistory();
  const [milestoneComplete, setMilestoneComplete] = useState(false);
  const [jobComplete, setJobComplete] = useState(false);

  return milestoneComplete ? (

    // Review builder success
    // <div className="img_text_wrap">
    //   <figure className="full_image">
    //     <img src={reviewBuilderSuccess} alt="template-image" />
    //     <div className="short_info">
    //       <div className="content">
    //         <h1 className="title">Thanks!</h1>
    //         <span className="show_label">
    //           Your review will help other tradies find the highest quality builders on Tickt.
    //         </span>
    //         <div className="btn_wrapr">
    //           <button className="fill_btn">OK</button>
    //         </div>
    //       </div>
    //     </div>
    //   </figure>
    // </div>
    // Review builder success close

    <div className="img_text_wrap">
      <figure className="full_image">
        <img src={templateImage} alt="template-image" />
        <div className="short_info">
          <div className="content">
            <h1 className="title">Milestone is completed!</h1>
            <span className="show_label">
              Nice one! The builder will review any required photos and approve your milestone shortly.
            </span>
            <div className="btn_wrapr">
              <button className="fill_btn" onClick={() => { history.push('/mark-milestone/1'); setMilestoneComplete(false); }}>OK</button>
            </div>
          </div>
        </div>
      </figure>
    </div>
  ) : jobComplete ? (
    <div className="img_text_wrap">
      <figure className="full_image">
        <img src={templateImage} alt="template-image" />
        <div className="short_info">
          <div className="content">
            <h1 className="title">Your 7th job is completed!</h1>
            <span className="show_label">
              You have completed your 7th Job using Tickt! Click here to view
              your completed jobs or leave a review. You will be paid as soon as
              the builder signs off.
            </span>
            <div className="btn_wrapr">
              <button className="fill_btn" onClick={() => { history.push('/mark-milestone/1'); setMilestoneComplete(false); }}>OK</button>
              <button className="fill_btn white_btn" onClick={() => { history.push('/past-jobs'); setMilestoneComplete(false); }}>See completed jobs</button>
            </div>
          </div>
        </div>
      </figure>
    </div>
  ) : (
    <div className="app_wrapper">
      <div className="custom_container">
        <span className="mob_side_nav">
          <img src={menu} alt="mob-side-nav" />
        </span>
        <div className="f_row">
          <div className="side_nav_col">
            <button className="close_nav">
              <img src={close} alt="close" />
            </button>
            <div className="stick">
              <span className="title">Job Dashboard</span>
              <ul className="dashboard_menu">
                <li>
                  <NavLink className="icon star" to="/active-jobs">
                    Active Jobs
                  </NavLink>
                </li>
                <li>
                  <NavLink className="icon applied" to="/applied-jobs">
                    Applied jobs
                  </NavLink>
                </li>
                <li>
                  <NavLink className="icon past" to="/past-jobs">
                    Past jobs
                  </NavLink>
                </li>
                <hr></hr>
                <li>
                  <NavLink className="icon new" to="/new-jobs">
                    New jobs
                    <span className="badge_count">5</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink className="icon approved" to="/approved-milestones">
                    Approved milestones
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="detail_col">
            <Switch>
              <Route path="/active-jobs" component={ActiveJobsPage} />
              <Route path="/applied-jobs" component={AppliedJobsPage} />
              <Route path="/past-jobs" component={PastJobsPage} />
              <Route path="/new-jobs" component={NewJobsPage} />
              <Route
                path="/approved-milestones"
                component={ApprovedMilestonesPage}
              />
              <Route
                path="/mark-milestone/:jobId"
                component={() => (
                  <MarkMilestonePage
                    showMilestoneCompletePage={() => setMilestoneComplete(true)}
                    showJobCompletePage={() => setJobComplete(true)}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDashboard;
