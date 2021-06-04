import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import TradieEditProfileComponent from './tradieEditProfile';
import {
    getTradieProfileView,
    getTradieBasicDetails,
} from './../../redux/profile/actions';

const mapStateToProps = (state: any) => {
    return {
        tradieProfileViewData: state.profile.tradieProfileViewData,
        tradieBasicDetailsData: state.profile.tradieBasicDetailsData,
        isLoading: state.common.isLoading
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        getTradieProfileView,
        getTradieBasicDetails
    }, dispatch);
}

const TradieEditProdile = connect(
    mapStateToProps,
    mapDispatchToProps
)(TradieEditProfileComponent)

export default TradieEditProdile;