
import { useEffect, useState } from 'react';
import { Popper } from '@material-ui/core';
// @ts-ignore
// import PlacesAutocomplete from 'react-places-autocomplete';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import icgps from "../../../assets/images/ic-gps.png";
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyDKFFrKp0D_5gBsA_oztQUhrrgpKnUpyPo");
Geocode.setLanguage("en");

interface Proptypes {
  data: any;
  stepCompleted: Boolean;
  handleStepComplete: (data: any) => void;
  handleStepBack: () => void;
}

const AddLocation = ({ data, stepCompleted, handleStepComplete, handleStepBack }: Proptypes) => {
  const [address, setAddress] = useState('');
  const [locationDetails, setLocationDetails] = useState<{ [index: string]: any }>({ location: {}, location_name: '' });
  const [error, setError] = useState('');
  const [localChanges, setLocationChanges] = useState(false);
  const [activeCurrent, setActiveCurrent] = useState(false);


  const setItemLocation = async (latitude: string, longitude: string) => {
    if (Object.keys(locationDetails?.location).length && locationDetails?.location_name?.length) {
      // let co_ord = locationDetails?.location?.coordinates;

      let response = await Geocode.fromLatLng(latitude, longitude);
      if (response) {
        const address = response.results[0].formatted_address;
        console.log({ address });
      }

      let coordinates_response = await Geocode.fromAddress('Calicut, Kerala, India');
      if (coordinates_response) {
        const { lat, lng } = coordinates_response.results[0].geometry.location;
        console.log(lat, lng);
      }
    }
  }

  const getCurrentPostion = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      let { latitude, longitude } = position?.coords;
      console.log({ latitude, longitude });
      setItemLocation(latitude.toString(), longitude.toString());
    });
  }

  useEffect(() => {
    if (stepCompleted && !localChanges) {
      setLocationDetails({
        location: {
          type: 'Point',
          coordinates: data?.coordinates
        },
        location_name: data?.location_name
      });
      setAddress(data?.location_name);
      setLocationChanges(true);
    }

    if (address.length > 2) {
      setActiveCurrent(false);
      document.getElementById('location_search_dynamic')?.focus();
    } else {
      setActiveCurrent(false);
      document.getElementById('location_search_static')?.focus();
    }

    // getCurrentPostion(); Just for testing
    return () => {
      // cleanup
    }
  }, [address, stepCompleted, data])

  const getCurrentLocation = async (e: any) => {
    e.preventDefault();
    setActiveCurrent(true);
    let permission_web = await navigator.permissions.query({ name: 'geolocation' });
    if (permission_web.state !== 'denied') {
      let coordinates_values: Array<number> = [];
      navigator.geolocation.getCurrentPosition(async (position) => {

        let { latitude, longitude } = position?.coords;

        // if (position?.coords?.latitude && position?.coords?.longitude) {
        //   coordinates_values.push(position.coords.latitude);
        //   coordinates_values.push(position.coords.longitude);
        // }

        let response = await Geocode.fromLatLng(latitude.toString(), longitude.toString());
        if (response) {
          const address = response.results[0].formatted_address;
          console.log({ address });
        }

        let coordinates_values = [latitude, longitude];
        console.log({ coordinates: coordinates_values, address: address })
        setLocation({ coordinates: coordinates_values, address: address })
      });
    } else {
      setError('Please enable the location permission from the settings so that Tickt app can access your location');
    }
  }

  const handleContinue = (e: any) => {
    e.preventDefault();
    let locationAddress: any = locationDetails;
    if (locationAddress?.location?.coordinates?.length) {
      console.log({ locationDetails })
      handleStepComplete(locationDetails);
      return
    }
    setError('please choose current location or search a location.');
  }

  const setLocation = ({ coordinates, address }: any) => {
    setLocationDetails({
      location: {
        type: 'Point',
        coordinates: coordinates,
      },
      location_name: address,
    });
    setAddress(address);
    setError('');
  }

  const handleSelect = async (address: any) => {

    let coordinates_response = await Geocode.fromAddress(address);
    if (coordinates_response) {
      const { lat, lng } = coordinates_response.results[0].geometry.location;
      console.log(lat, lng);
      setLocation({ coordinates: [lat, lng], address })
    }

    // geocodeByAddress(address)
    //   .then((results: any) => {
    //     console.log({ results });
    //     return getLatLng(results[0]);
    //   })
    //   .then((latLng: any) => {
    //     console.log('Success', { latLng });
    //     let coordinates_values = [];
    //     if (latLng?.lat && latLng?.lng) {
    //       coordinates_values.push(latLng?.lat);
    //       coordinates_values.push(latLng?.lng);
    //     }
    //     setLocation({ coordinates: coordinates_values, address })
    //   }).catch((error: any) => {
    //     setLocation({ coordinates: null, address })
    //     console.log('Error', error)
    //   });
  };

  const checkErrors = () => {
    let location_details: any = locationDetails;
    if (!location_details?.location?.coordinates?.length && !location_details?.location_name?.length && !address?.length) {
      return true;
    }
    return false;
  }

  // Please enable the location permission from the settings so that Tickt app can access your location
  return (
    <div className="app_wrapper">
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

                  <input
                    placeholder='Type a State, city or suburb'
                    className='location-search-input'
                    value={address}
                    style={{ display: address.length > 2 ? 'none' : '' }}
                    id="location_search_static"
                    onChange={(e) => setAddress(e.target.value)}
                    onFocus={(x) => {
                      console.log('Input - 1')
                    }}
                  />

                  <PlacesAutocomplete
                    // debounce={400}
                    value={address}
                    onChange={(value) => setAddress(value)}
                    onSelect={handleSelect}
                  >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }: any) => (
                      <div>
                        <input
                          id="location_search_dynamic"
                          onFocus={(x) => {
                            console.log('Input - 2')
                          }}
                          style={{ display: address.length < 3 ? 'none' : '' }}
                          {...getInputProps({
                            placeholder: 'Type a State, city or suburb',
                            className: 'location-search-input',
                          })}
                        />
                        <div className="autocomplete-drop-down-map-container">
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
                                <div className="suggestions-name">{suggestion.description}</div>
                              </div>
                            );
                          })}

                        </div>
                      </div>
                    )}
                  </PlacesAutocomplete>

                  <span className="error_msg">{error}</span>
                </div>
              </div>
              <div className="form_field">
                <button
                  className={activeCurrent ? 'location-btn location-btn-active' : "location-btn"}
                  onClick={getCurrentLocation}>
                  <span className="gps_icon">
                    <img src={icgps} alt="gps-icon" />
                  </span>
                  {'Use my current location'}
                </button>
              </div>

              <div className="form_field">
                <button
                  className={`fill_btn full_btn ${checkErrors() ? 'disable_btn' : ''}`}
                  onClick={handleContinue}>Continue</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div >
  )
}

export default AddLocation
