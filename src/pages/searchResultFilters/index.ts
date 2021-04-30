import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import SearchResultFiltersComponent from './searchResultFilters';
import { getJobWithJobTypeLatLong } from '../../redux/homeSearch/actions';

const mapStateToProps = (state: any) => {
    return {
        jobDataWithJobTypeLatLong: state.homeSearch.jobDataWithJobTypeLatLong,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({ getJobWithJobTypeLatLong }, dispatch);
}

const SearchResultFilters = connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchResultFiltersComponent)

export default SearchResultFilters;