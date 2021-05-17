import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import JobDashboard from './jobDashboard';
import {
  getActiveJobList,
  getAppliedJobList,
  getPastJobList,
  getNewJobList,
  getApprovedMilestoneList,
  getMilestoneList,
  markMilestoneComplete,
} from '../../redux/jobs/actions';

const mapStateToProps = (state: any) => {
  const {
    jobs: {
      activeJobList,
      appliedJobList,
      pastJobList,
      newJobList,
      approvedMilestoneList,
      milestonesCount,
      newJobsCount,
      milestoneList,
    },
  } = state;

  return {
    activeJobList,
    appliedJobList,
    pastJobList,
    newJobList,
    approvedMilestoneList,
    milestoneList,
    milestonesCount,
    newJobsCount,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getActiveJobList,
      getAppliedJobList,
      getPastJobList,
      getNewJobList,
      getApprovedMilestoneList,
      getMilestoneList,
      markMilestoneComplete,
    },
    dispatch
  );
};

const JobDashboardPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(JobDashboard);

export default JobDashboardPage;
