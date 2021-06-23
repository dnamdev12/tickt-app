import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import TradieEditProfileComponent from './tradieEditProfile';
import {
    getTradieProfileView,
    getTradieBasicDetails,
    cleanTradieBasicDetails,
    cleanTradieProfileViewData
} from './../../redux/profile/actions';

import { callTradeList } from '../../redux/auth/actions';

import { callTradieProfileData } from '../../redux/profile/actions';

const mapStateToProps = (state: any) => {
    return {
        tradieProfileData: state.profile.tradieProfileData,
        tradieProfileViewData: state.profile.tradieProfileViewData,
        tradieBasicDetailsData: state.profile.tradieBasicDetailsData,
        tradeListData: state.auth.tradeListData,
        isLoading: state.common.isLoading,
        isSkeletonLoading: state.common.isSkeletonLoading
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        getTradieProfileView,
        getTradieBasicDetails,
        cleanTradieBasicDetails,
        callTradeList,
        callTradieProfileData,
        cleanTradieProfileViewData,
    }, dispatch);
}

const TradieEditProdile = connect(
    mapStateToProps,
    mapDispatchToProps
)(TradieEditProfileComponent)

export default TradieEditProdile;