import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import BuilderInfoComponent from './builderInfo';
import {
    getTradieReviewList,

} from '../../redux/jobs/actions';
import { getBuilderProfileView } from '../../redux/profile/actions';

const mapStateToProps = (state: any) => {
    return {
        builderProfileViewData: state.profile.builderProfileViewData,
        isLoading: state.common.isLoading,
        isSkeletonLoading: state.common.isSkeletonLoading,
        userType: state.profile.userType,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        // getTradieReviewList,
        getBuilderProfileView
    }, dispatch);
}

const BuilderInfo = connect(
    mapStateToProps,
    mapDispatchToProps
)(BuilderInfoComponent)

export default BuilderInfo;