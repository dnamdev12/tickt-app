import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import PostJobComponent from './postJob';
import { callTradeList } from '../../redux/auth/actions';
import { callCategories } from '../../redux/jobs/actions';
import { updateMileStoneIndex, updateMileStoneTimings, updateDetailScreen  } from '../../redux/jobs/actions';

const mapStateToProps = (state: any) => {
  return {
    tradeListData: state.auth.tradeListData,
    editMilestoneId: state.jobs.editMilestoneId,
    editMilestoneTiming: state.jobs.editMilestoneTiming,
    editDetailPage: state.jobs.editDetailPage,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({ callTradeList, callCategories, updateMileStoneIndex, updateMileStoneTimings, updateDetailScreen }, dispatch);
}

const PostJob = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostJobComponent)

export default PostJob;
