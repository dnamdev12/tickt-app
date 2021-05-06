import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import JobDetailsPageComponent from './jobDetailsPage';
import {
    getHomeJobDetails,
    postHomeAppyJob,
    getHomeSaveJob
} from '../../redux/homeSearch/actions';

const mapStateToProps = (state: any) => {
    return {
        homeJobDetailsData: state.homeSearch.homeJobDetailsData,
        homeApplyJobData: state.homeSearch.homeApplyJobData,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        getHomeJobDetails,
        postHomeAppyJob,
        getHomeSaveJob
    }, dispatch);
}

const JobDetailsPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(JobDetailsPageComponent)

export default JobDetailsPage;