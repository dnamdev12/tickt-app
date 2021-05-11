import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import BuilderHomeComponent from './builderHome';
import {
    getSearchJobList,
    getRecentSearchList,
    getJobTypeList,
    getJobWithJobTypeLatLong,
    getViewNearByJob,
    postHomeSearchData
} from '../../../redux/homeSearch/actions';
import { callTradeList } from '../../../redux/auth/actions';
import { setHomeBuilder } from '../../../redux/jobs/actions';

const mapStateToProps = (state: any) => {
    console.log({ bh: state.jobs.builderHome }, '------------------------------------------------------------>')
    return {
        tradeListData: state.auth.tradeListData,
        searchJobListData: state.homeSearch.searchJobListData,
        jobTypeListData: state.homeSearch.jobTypeListData,
        builderHome: state.jobs.builderHome,
        // jobTypeList: state.homeSearch.jobTypeList,
        jobDataWithJobTypeLatLong: state.homeSearch.jobDataWithJobTypeLatLong,
        viewNearByJobData: state.homeSearch.viewNearByJobData,
        testBuilderHome: state.jobs.testBuilderHome,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        callTradeList,
        setHomeBuilder,
        getSearchJobList,
        getRecentSearchList,
        getJobTypeList,
        getJobWithJobTypeLatLong,
        getViewNearByJob,
        postHomeSearchData
    }, dispatch);
}

const BuilderHome = connect(
    mapStateToProps,
    mapDispatchToProps
)(BuilderHomeComponent)

export default BuilderHome;