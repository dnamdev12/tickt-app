import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import SavedJobsComponent from './savedJobs';
import { getSavedJobList } from '../../redux/profile/actions';

const mapStateToProps = (state: any) => {
    return {
        jobDataWithJobTypeLatLong: state.homeSearch.jobDataWithJobTypeLatLong,
        savedJobs: state.profile.savedJobs,
        isLoading: state.common.isLoading,
    }
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
      {
          getSavedJobList,
      },
      dispatch
  );
};


const SavedJobs = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SavedJobsComponent)

export default SavedJobs;