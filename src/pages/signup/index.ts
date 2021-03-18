import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import SignupComponent from './signup';

const mapStateToProps = (state: any) => {
    return {
        userData: state.homeReducer.userData,
        error: state.homeReducer.error
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({}, dispatch);
}

const Signup  = connect(
    mapStateToProps,
    mapDispatchToProps
)(SignupComponent)

export default Signup