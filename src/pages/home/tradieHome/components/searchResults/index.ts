import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import SearchResultsComponent from '../searchResults/searchResults';
import { getJobWithJobTypeLatLong } from '../../../../../redux/homeSearch/actions';

const mapStateToProps = (state: any) => {
    return {
        jobDataWithJobTypeLatLong: state.homeSearch.jobDataWithJobTypeLatLong,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({ getJobWithJobTypeLatLong }, dispatch);
}

const SearchResult = connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchResultsComponent)

export default SearchResult;