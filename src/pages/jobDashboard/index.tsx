import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import JobDashboard from './jobDashboard';
import {
  callCategories,
} from '../../redux/jobDashboard/actions';

const mapStateToProps = (state: any) => {
  return {
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    callCategories,
  }, dispatch);
}

const JobDashboardPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(JobDashboard)

export default JobDashboardPage;
