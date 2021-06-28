import { connect } from 'react-redux';
import loader from '../assets/images/loader.gif';
import { setShowToast } from '../redux/common/actions';
import noInternet from '../assets/images/internet-connection-graphic.png'

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

            // Add hide_scroll class to body when it appears
            
            <div className="offline_mode">
              <figure className="no_img">
                <img src={noInternet} alt="no-internet" />
              </figure>
              <div className="content">
                <h1>{'No Internet Connection'}</h1>
              </div>
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
