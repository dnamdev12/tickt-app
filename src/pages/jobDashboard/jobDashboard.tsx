import { useState } from 'react';
import { NavLink, Route, Switch, useHistory } from 'react-router-dom';

import menu from '../../assets/images/menu-line-blue.png';
import close from '../../assets/images/ic-cancel-blue.png';
import ActiveJobsPage from './components/activeJobs';
import AppliedJobsPage from './components/appliedJobs';
import PastJobsPage from './components/pastJobs';
import NewJobsPage from './components/newJobs';
import ApprovedMilestonesPage from './components/approvedMilestones';
import MarkMilestonePage from './components/markMilestone';
import templateImage from '../../assets/images/job-complete-bg.png';
import reviewBuilderSuccess from '../../assets/images/review-builder-success.png';


interface Proptypes {
  getActiveJobList: (page: number) => void;
  activeJobList: Array<any>;
  getAppliedJobList: (page: number) => void;
  appliedJobList: Array<any>;
  getPastJobList: (page: number) => void;
  pastJobList: Array<any>;
  getNewJobList: (page: number) => void;
  approvedMilestoneList: Array<any>;
  getApprovedMilestoneList: (page: number) => void;
  newJobList: Array<any>;
  milestonesCount: number;
  newJobsCount: number;
}

const JobDashboard = ({
  getActiveJobList,
  activeJobList,
  getAppliedJobList,
  appliedJobList,
  getPastJobList,
  pastJobList,
  getNewJobList,
  newJobList,
  getApprovedMilestoneList,
  approvedMilestoneList,
  milestonesCount,
  newJobsCount,
}: Proptypes) => {
  const history = useHistory();
  const [openSidebar, setOpenSidebar] = useState(false);
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
              Nice one! The builder will review any required photos and approve
              your milestone shortly.
            </span>
            <div className="btn_wrapr">
              <button
                className="fill_btn"
                onClick={() => {
                  history.push('/mark-milestone/1');
                  setMilestoneComplete(false);
                }}
              >
                OK
              </button>
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
              <button
                className="fill_btn"
                onClick={() => {
                  history.push('/mark-milestone/1');
                  setMilestoneComplete(false);
                }}
              >
                OK
              </button>
              <button
                className="fill_btn white_btn"
                onClick={() => {
                  history.push('/past-jobs');
                  setMilestoneComplete(false);
                }}
              >
                See completed jobs
              </button>
            </div>
          </div>
        </div>
      </figure>
    </div>
  ) : (
    <div className="app_wrapper">
      <div className="custom_container">
        <span
          className="mob_side_nav"
          onClick={() => setOpenSidebar(!openSidebar)}
        >
          <img src={menu} alt="mob-side-nav" />
        </span>
        <div className="f_row">
          <div className={`side_nav_col${openSidebar ? ' active' : ''}`}>
            <button className="close_nav" onClick={() => setOpenSidebar(false)}>
              <img src={close} alt="close" />
            </button>
            <div className="stick">
              <span className="title">Job Dashboard</span>
              <ul className="dashboard_menu">
                <li>
                  <NavLink className="icon star" to="/active-jobs">
                    <span className="menu_txt">Active Jobs</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink className="icon applied" to="/applied-jobs">
                    <span className="menu_txt">Applied jobs</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink className="icon past" to="/past-jobs">
                    <span className="menu_txt">Past jobs</span>
                  </NavLink>
                </li>
                <hr></hr>
                <li>
                  <NavLink className="icon new" to="/new-jobs">
                    <span className="menu_txt">New jobs
                    {!!newJobsCount && (
                        <span className="badge_count">
                          {newJobsCount > 9 ? '9+' : newJobsCount}
                        </span>
                      )}
                    </span>


                  </NavLink>
                </li>
                <li>
                  <NavLink className="icon approved" to="/approved-milestones">
                    <span className="menu_txt">Approved milestones
                    {!!milestonesCount && (
                        <span className="badge_count">
                          {milestonesCount > 9 ? '9+' : milestonesCount}
                        </span>
                      )}
                    </span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="detail_col">
            <Switch>
              <Route
                path="/active-jobs"
                render={(props) => (
                  <ActiveJobsPage
                    getActiveJobList={getActiveJobList}
                    activeJobList={activeJobList}
                    {...props}
                  />
                )}
              />
              <Route
                path="/applied-jobs"
                render={(props) => (
                  <AppliedJobsPage
                    getAppliedJobList={getAppliedJobList}
                    appliedJobList={appliedJobList}
                    {...props}
                  />
                )}
              />
              <Route
                path="/past-jobs"
                render={(props) => (
                  <PastJobsPage
                    getPastJobList={getPastJobList}
                    pastJobList={pastJobList}
                    {...props}
                  />
                )}
              />
              <Route
                path="/new-jobs"
                render={(props) => (
                  <NewJobsPage
                    getNewJobList={getNewJobList}
                    newJobList={newJobList}
                    {...props}
                  />
                )}
              />
              <Route
                path="/approved-milestones"
                render={(props) => (
                  <ApprovedMilestonesPage
                    getApprovedMilestoneList={getApprovedMilestoneList}
                    approvedMilestoneList={approvedMilestoneList}
                    {...props}
                  />
                )}
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
