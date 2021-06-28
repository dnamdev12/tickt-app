import { connect } from 'react-redux';
import loader from '../assets/images/loader.gif';
import { setShowToast } from '../redux/common/actions';

//@ts-ignore
import { Detector } from "react-detect-offline";



const Loader = (props: any) => {
  // Add active class next to loader class to show loader
  return (
    <>
      <Detector
        render={({ online }: any) => (
          online ? (
            <div className={`loader ${props.isLoading ? 'active' : ''}`}>
              <figure>
                <img src={loader} alt="loader" />
              </figure>
            </div>
          ) : (
            <div className="offline-mode">
            <span>{'No Internet connection'}</span> 
            </div>
          )
        )}
      />
    </>
  )
}

const mapStateToProps = (state: any) => {
  return {
    isLoading: state.common.isLoading,
  }
}

export default connect(mapStateToProps)(Loader);
