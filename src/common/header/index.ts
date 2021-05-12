import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HeaderComponent from './header';
import {
    callTradieProfileData
} from '../../redux/profile/actions';

const mapStateToProps = (state: any) => {
    return {
        tradieProfileData: state.profile.tradieProfileData,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        callTradieProfileData
    }, dispatch);
}

const Header = connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderComponent)

export default Header;