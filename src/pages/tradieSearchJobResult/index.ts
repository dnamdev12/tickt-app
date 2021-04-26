import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import SearchResultsComponent from './tradieSearchJobResult';
import {
    getJobWithJobTypeLatLong,
    getViewNearByJob
} from '../../redux/homeSearch/actions';

const mapStateToProps = (state: any) => {
    return {
        jobDataWithJobTypeLatLong: state.homeSearch.jobDataWithJobTypeLatLong,
        viewNearByJobData: state.homeSearch.viewNearByJobData,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        getJobWithJobTypeLatLong,
        getViewNearByJob
    }, dispatch);
}

const TradieSearchJobResult = connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchResultsComponent)

export default TradieSearchJobResult;