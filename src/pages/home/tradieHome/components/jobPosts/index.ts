import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import JobPostsComponent from './jobPosts';
import { getJobWithJobTypeLatLong } from '../../../../../redux/homeSearch/actions';

const mapStateToProps = (state: any) => {
    return {
        jobDataWithJobTypeLatLong: state.homeSearch.jobDataWithJobTypeLatLong,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({ getJobWithJobTypeLatLong }, dispatch);
}

const JobPosts = connect(
    mapStateToProps,
    mapDispatchToProps
)(JobPostsComponent)

export default JobPosts