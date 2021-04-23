import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import BannerSearchComponent from './bannerSearch';
import { getSearchJobList, postHomeSearchData } from '../../../../../redux/homeSearch/actions';

const mapStateToProps = (state: any) => {
    return {
        searchJobListData: state.homeSearch.searchJobListData,
        homeSearchJobData: state.homeSearch.homeSearchJobData,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({ getSearchJobList, postHomeSearchData }, dispatch);
}

const BannerSearch = connect(
    mapStateToProps,
    mapDispatchToProps
)(BannerSearchComponent)

export default BannerSearch