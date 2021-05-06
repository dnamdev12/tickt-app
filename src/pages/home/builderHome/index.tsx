import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import BuilderHomeComponent from './builderHome';
import {
    getSearchJobList,
    getRecentSearchList,
    getJobTypeList,
    getJobWithJobTypeLatLong,
    getViewNearByJob
} from '../../../redux/homeSearch/actions';
import { callTradeList } from '../../../redux/auth/actions';

const mapStateToProps = (state: any) => {
    return {
        tradeListData: state.auth.tradeListData,
        searchJobListData: state.homeSearch.searchJobListData,
        jobTypeListData: state.homeSearch.jobTypeListData,
        // jobTypeList: state.homeSearch.jobTypeList,
        jobDataWithJobTypeLatLong: state.homeSearch.jobDataWithJobTypeLatLong,
        viewNearByJobData: state.homeSearch.viewNearByJobData,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        callTradeList,
        getSearchJobList,
        getRecentSearchList,
        getJobTypeList,
        getJobWithJobTypeLatLong,
        getViewNearByJob
    }, dispatch);
}

const BuilderHome = connect(
    mapStateToProps,
    mapDispatchToProps
)(BuilderHomeComponent)

export default BuilderHome;