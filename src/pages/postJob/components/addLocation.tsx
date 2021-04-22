
import { useRef, useState } from 'react';
import { Popper } from '@material-ui/core';
// @ts-ignore
// import PlacesAutocomplete from 'react-places-autocomplete';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

// import colorLogo from '../../../assets/images/ic-logo-yellow.png';
// import menu from '../../../assets/images/menu-line-white.svg';
// import bell from '../../../assets/images/ic-notification.png';
// import dummy from '../../../assets/images/u_placeholder.jpg';
import icgps from "../../../assets/images/ic-gps.png";
import CommonHeader from './commonHeader';

interface Proptypes {
  data: any;
  stepCompleted: Boolean;
  handleStepComplete: (data: any) => void;
  handleStepBack: () => void;
}

const AddLocation = ({ data, stepCompleted, handleStepComplete, handleStepBack }: Proptypes) => {
  const ref = useRef(null);
  const [address, setAddress] = useState('');
  const [locationDetails, setLocationDetails] = useState({
    location: {
      type: 'Point',
      coordinates: [],
    },
    location_name: '',
  });

  // const handleChange = (value: string | object, name: string) => {
  //   setLocationDetails((prevDetails) => ({
  //     ...prevDetails,
  //     [name]: value,
  //   }));
  // };

  const { location_name } = locationDetails;


  const handleChange = (address: any) => {
    // this.setState({ address });
    setAddress(address);
  };

  const handleSelect = (address: any) => {
    geocodeByAddress(address)
      .then((results: any) => getLatLng(results[0]))
      .then((latLng: any) => console.log('Success', latLng))
      .catch((error: any) => console.error('Error', error));
  };

  return (
    <div className="app_wrapper">

      {/* Header */}
      <CommonHeader />
      {/* Header close */}


      <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }: any) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion:any) => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>

      <div className="section_wrapper">
        <div className="custom_container">
          <div className="form_field">
            <div className="flex_row">
              <div className="flex_col_sm_5">
                <div className="relate">
                  <button className="back" onClick={handleStepBack}></button>
                  <span className="title">Location</span>
                </div>
                <p className="commn_para">Type the place for your job</p>
              </div>
            </div>
          </div>
          <div className="flex_row">
            <div className="flex_col_sm_5">
              <div className="form_field">
                <div className="text_field">
                  <PlacesAutocomplete
                    debounce={400}
                    searchOptions={{ types: ['(citites)'] }}
                    value={location_name}
                    onChange={(value: string) => handleChange(value)}
                    onSelect={(value: string) => handleChange(value)}
                  >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }: any) => (
                      <div>
                        <input
                          ref={ref}
                          {...getInputProps({
                            placeholder: 'Type a State, city or suburb',
                            className: 'location-search-input',
                          })}
                        />
                        <Popper open={true} anchorEl={ref.current} placement='bottom-start'>
                          {loading && <div>Loading...</div>}
                          {suggestions.map((suggestion: any) => {
                            const className = suggestion.active
                              ? 'suggestion-item--active'
                              : 'suggestion-item';
                            // inline style for demonstration purpose
                            const style = suggestion.active
                              ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                              : { backgroundColor: '#ffffff', cursor: 'pointer' };
                            return (
                              <div
                                {...getSuggestionItemProps(suggestion, {
                                  className,
                                  style,
                                })}
                              >
                                <span>{suggestion.description}</span>
                              </div>
                            );
                          })}
                        </Popper>
                      </div>
                    )}
                  </PlacesAutocomplete>
                </div>
                <span className="error_msg"></span>
              </div>
              <div className="form_field">
                <button className="location-btn">
                  <span className="gps_icon">
                    <img src={icgps} alt="gps-icon" />
                  </span>
                  {'Use my current location'}
                </button>
              </div>
              <div className="form_field">
                <button className="fill_btn full_btn" onClick={() => handleStepComplete(locationDetails)}>Continue</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default AddLocation
