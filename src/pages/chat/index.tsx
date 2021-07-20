import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Chat from './chat';

const mapStateToProps = (state: any) => {
    return {
        builderProfile: state.profile.builderProfile,
        tradieProfileData: state.profile.tradieProfileData,
        isLoading: state.common.isLoading,
        isSkeletonLoading: state.common.isSkeletonLoading,
        userType: state.profile.userType,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
    }, dispatch);
}

const ChatComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(Chat)

export default ChatComponent;