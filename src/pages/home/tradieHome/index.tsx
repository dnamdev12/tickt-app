import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import TradieHomeComponent from './tradieHome';
import { getSearchJobList } from '../../../redux/homeSearch/actions';

const mapStateToProps = (state: any) => {
    return {
        searchJobListData: state.homeSearch.searchJobListData,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({ getSearchJobList }, dispatch);
}

const TradieHome = connect(
    mapStateToProps,
    mapDispatchToProps
)(TradieHomeComponent)

export default TradieHome