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
} from '../../redux/jobs/actions';
import {
  getBankDetails,
  addBankDetails,
  updateBankDetails,
  removeBankDetails,
} from '../../redux/profile/actions';

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
    profile: {
      bankDetails,
    }
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
    bankDetails,
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
      getBankDetails,
      addBankDetails,
      updateBankDetails,
      removeBankDetails,
    },
    dispatch
  );
};

const JobDashboardPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(JobDashboard);

export default JobDashboardPage;
