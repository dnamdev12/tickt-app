import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HeaderComponent from './header';
import { recallHeaderNotification } from '../../redux/homeSearch/actions';
import {
    callTradieProfileData,
    getProfileBuilder
} from '../../redux/profile/actions';

const mapStateToProps = (state: any) => {
    return {
        tradieProfileData: state.profile.tradieProfileData,
        builderProfile: state.profile.builderProfile,
        userType: state.profile.userType,
        recallHeaderNotif: state.homeSearch.recallHeaderNotif,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        callTradieProfileData,
        getProfileBuilder,
        recallHeaderNotification,
    }, dispatch);
}

const Header = connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderComponent)

export default Header;