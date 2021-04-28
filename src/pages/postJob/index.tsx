import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import PostJobComponent from './postJob';
import { callTradeList } from '../../redux/auth/actions';
import { callCategories } from '../../redux/postJob/actions';
import { updateMileStoneIndex } from '../../redux/postJob/actions';

const mapStateToProps = (state: any) => {
  return {
    tradeListData: state.auth.tradeListData,
    editMilestoneId: state.postjob.editMilestoneId
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({ callTradeList, callCategories, updateMileStoneIndex }, dispatch);
}

const PostJob = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostJobComponent)

export default PostJob;
