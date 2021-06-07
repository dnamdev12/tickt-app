import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import TradieEditProfileComponent from './tradieEditProfile';
import {
    getTradieProfileView,
    getTradieBasicDetails,
} from './../../redux/profile/actions';

import { callTradeList } from '../../redux/auth/actions';

import { callTradieProfileData } from '../../redux/profile/actions';

const mapStateToProps = (state: any) => {
    return {
        tradieProfileViewData: state.profile.tradieProfileViewData,
        tradieBasicDetailsData: state.profile.tradieBasicDetailsData,
        tradeListData: state.auth.tradeListData,
        isLoading: state.common.isLoading
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        getTradieProfileView,
        getTradieBasicDetails,
        callTradeList,
        callTradieProfileData,
    }, dispatch);
}

const TradieEditProdile = connect(
    mapStateToProps,
    mapDispatchToProps
)(TradieEditProfileComponent)

export default TradieEditProdile;