import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HeaderComponent from './header';
import {
    callTradieProfileData
} from '../../redux/profile/actions';
import { getProfileBuilder } from '../../redux/homeSearch/actions'


const mapStateToProps = (state: any) => {
    return {
        tradieProfileData: state.profile.tradieProfileData,
        builderProfile:state.homeSearch.builderProfile
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        callTradieProfileData,
        getProfileBuilder
    }, dispatch);
}

const Header = connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderComponent)

export default Header;