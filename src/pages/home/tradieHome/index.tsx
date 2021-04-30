import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import TradieHomeComponent from './tradieHome';
import {
    getSearchJobList,
    getRecentSearchList,
    getJobTypeList,
    getJobWithJobTypeLatLong,
    getViewNearByJob
} from '../../../redux/homeSearch/actions';

const mapStateToProps = (state: any) => {
    return {
        searchJobListData: state.homeSearch.searchJobListData,
        jobTypeListData: state.homeSearch.jobTypeListData,
        // jobTypeList: state.homeSearch.jobTypeList,
        jobDataWithJobTypeLatLong: state.homeSearch.jobDataWithJobTypeLatLong,
        viewNearByJobData: state.homeSearch.viewNearByJobData,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        getSearchJobList,
        getRecentSearchList,
        getJobTypeList,
        getJobWithJobTypeLatLong,
        getViewNearByJob
    }, dispatch);
}

const TradieHome = connect(
    mapStateToProps,
    mapDispatchToProps
)(TradieHomeComponent)

export default TradieHome