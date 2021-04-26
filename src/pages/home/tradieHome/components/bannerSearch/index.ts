import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import BannerSearchComponent from './bannerSearch';
import { getSearchJobList, getRecentSearchList, postHomeSearchData } from '../../../../../redux/homeSearch/actions';

const mapStateToProps = (state: any) => {
    return {
        searchJobListData: state.homeSearch.searchJobListData,
        recentSearchJobData: state.homeSearch.recentSearchJobData,
        homeSearchJobData: state.homeSearch.homeSearchJobData,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        getSearchJobList,
        getRecentSearchList,
        postHomeSearchData
    }, dispatch);
}

const BannerSearch = connect(
    mapStateToProps,
    mapDispatchToProps
)(BannerSearchComponent)

export default BannerSearch