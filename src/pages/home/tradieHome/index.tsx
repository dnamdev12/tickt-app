import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import TradieHomeComponent from './tradieHome';
import {
    getSearchJobList,
    getRecentSearchList,
    getJobTypeList,
    getJobWithJobTypeLatLong,
    getViewNearByJob,
    resetHomeSearchJobData
} from '../../../redux/homeSearch/actions';

const mapStateToProps = (state: any) => {
    return {
        searchJobListData: state.homeSearch.searchJobListData,
        jobTypeListData: state.homeSearch.jobTypeListData,
        jobDataWithJobTypeLatLong: state.homeSearch.jobDataWithJobTypeLatLong,
        viewNearByJobData: state.homeSearch.viewNearByJobData,
        homeSearchJobData: state.homeSearch.homeSearchJobData,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        getSearchJobList,
        getRecentSearchList,
        getJobTypeList,
        getJobWithJobTypeLatLong,
        getViewNearByJob,
        resetHomeSearchJobData,
    }, dispatch);
}

const TradieHome = connect(
    mapStateToProps,
    mapDispatchToProps
)(TradieHomeComponent)

export default TradieHome