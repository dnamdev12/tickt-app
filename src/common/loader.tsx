import { connect } from 'react-redux';
import loader from '../assets/images/page-loader.gif';

const Loader = (props: any) => {
    return (
        // Add active class next to loader class to show loader
        <div className={`loader ${props.isLoading ? 'active' : ''}`}> 
        <figure>
          <img src={loader} alt="loader" />
        </figure>
      </div>
    )
}

const mapStateToProps = (state: any) => {
  return {
    isLoading: state.common.isLoading,
  }
}

export default connect(mapStateToProps)(Loader);
