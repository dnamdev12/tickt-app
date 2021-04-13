import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import PostJobComponent from './postJob';
import { callTradeList } from '../../redux/auth/actions';
import { callCategories } from '../../redux/postJob/actions';

const mapStateToProps = (state: any) => {
  return {
    tradeListData: state.auth.tradeListData,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({callTradeList, callCategories}, dispatch);
}

const PostJob = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostJobComponent)

export default PostJob;
