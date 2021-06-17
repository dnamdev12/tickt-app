import { connect } from 'react-redux'
import SavedJobsComponent from './savedJobs';

const mapStateToProps = (state: any) => {
    return {
        jobDataWithJobTypeLatLong: state.homeSearch.jobDataWithJobTypeLatLong,
    }
}

const SavedJobs = connect(
    mapStateToProps,
    null
)(SavedJobsComponent)

export default SavedJobs;