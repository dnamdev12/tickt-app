import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import AllJobsComponent from './allJobs';
import { getJobWithJobTypeLatLong } from '../../../../../redux/homeSearch/actions';

const mapStateToProps = (state: any) => {
    return {
        jobDataWithJobTypeLatLong: state.homeSearch.jobDataWithJobTypeLatLong,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({ getJobWithJobTypeLatLong }, dispatch);
}

const AllJobs = connect(
    mapStateToProps,
    mapDispatchToProps
)(AllJobsComponent)

export default AllJobs