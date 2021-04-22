import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import SearchResultsComponent from './tradieSearchJobResult';
import { getJobWithJobTypeLatLong } from '../../redux/homeSearch/actions';

const mapStateToProps = (state: any) => {
    return {
        jobDataWithJobTypeLatLong: state.homeSearch.jobDataWithJobTypeLatLong,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({ getJobWithJobTypeLatLong }, dispatch);
}

const TradieSearchJobResult = connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchResultsComponent)

export default TradieSearchJobResult;