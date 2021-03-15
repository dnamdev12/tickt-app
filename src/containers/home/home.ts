import { connect } from 'react-redux'

import HomePage from '../../pages/home/home'
import * as actions from '../../redux/homeReducer/actions'

const mapStateToProps = (state: any) => {
    return {
        userData: state.homeReducer.userData,
        error: state.homeReducer.error
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        requestApiData: () => dispatch(actions.requestApiData())
    }
}

const Home  = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage)

export default Home