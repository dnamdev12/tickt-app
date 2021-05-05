import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import JobDetailsPageComponent from './jobDetailsPage';
import { callTradeList } from './../../redux/auth/actions';
import {
    getJobWithJobTypeLatLong,
} from '../../redux/homeSearch/actions';

const mapStateToProps = (state: any) => {
    return {
        tradeListData: state.auth.tradeListData,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        callTradeList
    }, dispatch);
}

const JobDetailsPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(JobDetailsPageComponent)

export default JobDetailsPage;