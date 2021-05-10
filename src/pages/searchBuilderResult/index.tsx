import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import SearchResultBuilder from './searchResultBuilder';
import {
    getJobWithJobTypeLatLong,
    getViewNearByJob,
    postHomeSearchData
} from '../../redux/homeSearch/actions';

const mapStateToProps = (state: any) => {
    return {
        jobDataWithJobTypeLatLong: state.homeSearch.jobDataWithJobTypeLatLong,
        viewNearByJobData: state.homeSearch.viewNearByJobData,
        homeSearchJobData: state.homeSearch.homeSearchJobData,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        getJobWithJobTypeLatLong,
        getViewNearByJob,
        postHomeSearchData
    }, dispatch);
}

const TradieSearchJobResult = connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchResultBuilder)

export default TradieSearchJobResult;