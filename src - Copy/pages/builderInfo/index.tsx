import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import BuilderInfoComponent from './builderInfo';
import {
    getTradieReviewList
} from '../../redux/jobs/actions';

const mapStateToProps = (state: any) => {
    return {
        // tradieReviewList: state.jobs.tradieReviewList,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        // getTradieReviewList,
    }, dispatch);
}

const BuilderInfo = connect(
    mapStateToProps,
    mapDispatchToProps
)(BuilderInfoComponent)

export default BuilderInfo;