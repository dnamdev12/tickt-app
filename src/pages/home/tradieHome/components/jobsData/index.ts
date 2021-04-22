import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import JobsDataComponent from './jobsData';
import { getJobWithJobTypeLatLong } from '../../../../../redux/homeSearch/actions';

const mapStateToProps = (state: any) => {
    return {
        jobDataWithJobTypeLatLong: state.homeSearch.jobDataWithJobTypeLatLong,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({ getJobWithJobTypeLatLong }, dispatch);
}

const JobsData = connect(
    mapStateToProps,
    mapDispatchToProps
)(JobsDataComponent)

export default JobsData