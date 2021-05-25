import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import JobDashboard from './jobDashboard';
import {
    getActiveJobsBuilder,
    getPastJobsBuilder,
    getOpenJobsBuilder,
    getNewApplicantsBuilder,
    getnewJobApplicationListBuilder,
} from '../../redux/jobs/actions';

const mapStateToProps = (state: any) => {
    console.log({ state });
    const {
        jobs: {
            builderActionJobs,
            builderOpenJobs,
            builderPastJobs,
            builderNewApplicants,
            builderNewApplicantsList
        },
    } = state;
    return {
        activeJobs: builderActionJobs,
        openJobs: builderOpenJobs,
        pastJobs: builderPastJobs,
        applicantJobs: builderNewApplicants,
        approvalJobs: null,
        applicantsListJobs: builderNewApplicantsList,
        isLoading: state.common.isLoading
    
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators(
        {
            getActiveJobsBuilder,
            getPastJobsBuilder,
            getOpenJobsBuilder,
            getNewApplicantsBuilder,
            getnewJobApplicationListBuilder
        },
        dispatch
    );
};

const JobDashboardPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(JobDashboard);

export default JobDashboardPage;
