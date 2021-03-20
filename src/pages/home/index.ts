import { connect } from 'react-redux'
import HomePage from './home'

const mapStateToProps = (state: any) => {
    return {
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        requestApiData: () => dispatch()
    }
}

const Home  = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage)

export default Home