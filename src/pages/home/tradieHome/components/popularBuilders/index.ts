import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import PopularBuildersComponent from '../popularBuilders/popularBuilders';
import { getJobWithJobTypeLatLong } from '../../../../../redux/homeSearch/actions';

const mapStateToProps = (state: any) => {
    return {
        jobDataWithJobTypeLatLong: state.homeSearch.jobDataWithJobTypeLatLong,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({ getJobWithJobTypeLatLong }, dispatch);
}

const PopularBuilder = connect(
    mapStateToProps,
    mapDispatchToProps
)(PopularBuildersComponent)

export default PopularBuilder;