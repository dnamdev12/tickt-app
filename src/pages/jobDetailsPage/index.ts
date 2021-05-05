import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import JobDetailsPageComponent from './jobDetailsPage';
import {
    getHomeJobDetails,
} from '../../redux/homeSearch/actions';

const mapStateToProps = (state: any) => {
    return {
        homeJobDetailsData: state.homeSearch.homeJobDetailsData,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        getHomeJobDetails
    }, dispatch);
}

const JobDetailsPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(JobDetailsPageComponent)

export default JobDetailsPage;