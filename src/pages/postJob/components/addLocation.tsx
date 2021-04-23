
import { useEffect, useState } from 'react';
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


const static_locations = [
  {
    "description": "Jakarta, Indonesia",
    "matched_substrings": [
      {
        "length": 1,
        "offset": 0
      }
    ],
    "place_id": "ChIJnUvjRenzaS4RoobX2g-_cVM",
    "reference": "ChIJnUvjRenzaS4RoobX2g-_cVM",
    "structured_formatting": {
      "main_text": "Jakarta",
      "main_text_matched_substrings": [
        {
          "length": 1,
          "offset": 0
        }
      ],
      "secondary_text": "Indonesia"
    },
    "terms": [
      {
        "offset": 0,
        "value": "Jakarta"
      },
      {
        "offset": 9,
        "value": "Indonesia"
      }
    ],
    "types": ["colloquial_area", "locality", "political", "geocode"]
  },
  {
    "description": "Jaipur, Rajasthan, India",
    "matched_substrings": [
      {
        "length": 1,
        "offset": 0
      }
    ],
    "place_id": "ChIJgeJXTN9KbDkRCS7yDDrG4Qw",
    "reference": "ChIJgeJXTN9KbDkRCS7yDDrG4Qw",
    "structured_formatting": {
      "main_text": "Jaipur",
      "main_text_matched_substrings": [
        {
          "length": 1,
          "offset": 0
        }
      ],
      "secondary_text": "Rajasthan, India"
    },
    "terms": [
      {
        "offset": 0,
        "value": "Jaipur"
      },
      {
        "offset": 8,
        "value": "Rajasthan"
      },
      {
        "offset": 19,
        "value": "India"
      }
    ],
    "types": ["locality", "political", "geocode"]
  },
  {
    "description": "Jacksonville, FL, USA",
    "matched_substrings": [
      {
        "length": 1,
        "offset": 0
      }
    ],
    "place_id": "ChIJ66_O8Ra35YgR4sf8ljh9zcQ",
    "reference": "ChIJ66_O8Ra35YgR4sf8ljh9zcQ",
    "structured_formatting": {
      "main_text": "Jacksonville",
      "main_text_matched_substrings": [
        {
          "length": 1,
          "offset": 0
        }
      ],
      "secondary_text": "FL, USA"
    },
    "terms": [
      {
        "offset": 0,
        "value": "Jacksonville"
      },
      {
        "offset": 14,
        "value": "FL"
      },
      {
        "offset": 18,
        "value": "USA"
      }
    ],
    "types": ["locality", "political", "geocode"]
  },
  {
    "description": "Joshua Tree National Park, California, USA",
    "matched_substrings": [
      {
        "length": 1,
        "offset": 0
      }
    ],
    "place_id": "ChIJe6hluYWP2oAR4p3rOqftdxk",
    "reference": "ChIJe6hluYWP2oAR4p3rOqftdxk",
    "structured_formatting": {
      "main_text": "Joshua Tree National Park",
      "main_text_matched_substrings": [
        {
          "length": 1,
          "offset": 0
        }
      ],
      "secondary_text": "California, USA"
    },
    "terms": [
      {
        "offset": 0,
        "value": "Joshua Tree National Park"
      },
      {
        "offset": 27,
        "value": "California"
      },
      {
        "offset": 39,
        "value": "USA"
      }
    ],
    "types": ["tourist_attraction", "park", "point_of_interest", "establishment"]
  },
  {
    "description": "Jodhpur, Rajasthan, India",
    "matched_substrings": [
      {
        "length": 1,
        "offset": 0
      }
    ],
    "place_id": "ChIJucwGqk6MQTkRuKvhClvqFIE",
    "reference": "ChIJucwGqk6MQTkRuKvhClvqFIE",
    "structured_formatting": {
      "main_text": "Jodhpur",
      "main_text_matched_substrings": [
        {
          "length": 1,
          "offset": 0
        }
      ],
      "secondary_text": "Rajasthan, India"
    },
    "terms": [
      {
        "offset": 0,
        "value": "Jodhpur"
      },
      {
        "offset": 9,
        "value": "Rajasthan"
      },
      {
        "offset": 20,
        "value": "India"
      }
    ],
    "types": ["locality", "political", "geocode"]
  }
];

interface Proptypes {
  data: any;
  stepCompleted: Boolean;
  handleStepComplete: (data: any) => void;
  handleStepBack: () => void;
}

const AddLocation = ({ data, stepCompleted, handleStepComplete, handleStepBack }: Proptypes) => {
  const [address, setAddress] = useState('');
  const [locationDetails, setLocationDetails] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    console.log({ address: address.length })
    if (address.length > 2) {
      document.getElementById('location_search_dynamic')?.focus();
    } else {
      document.getElementById('location_search_static')?.focus();
    }
    return () => {
      // cleanup
    }
  }, [address])

  const getCurrentLocation = async (e: any) => {
    e.preventDefault();
    let permission_web = await navigator.permissions.query({ name: 'geolocation' });
    if (permission_web.state !== 'denied') {
      let coordinates_values: Array<number> = [];
      navigator.geolocation.getCurrentPosition(function (position) {
        if (position?.coords?.latitude && position?.coords?.longitude) {
          coordinates_values.push(position.coords.latitude);
          coordinates_values.push(position.coords.longitude);
        }
        setLocation({ coordinates: coordinates_values, address: '' })
      });
    } else {
      setError('Please enable the location permission from the settings so that Tickt app can access your location');
    }
  }

  const handleContinue = (e: any) => {
    e.preventDefault();
    let locationAddress: any = locationDetails;
    if (locationAddress?.location?.coordinates?.length) {
      handleStepComplete(locationDetails);
      return
    }
    setError('please choose current location or search a location.');
  }

  const setLocation = ({ coordinates, address }: any) => {
    setLocationDetails({
      location: {
        type: 'Point',
        coordinates: coordinates || [22.1, 30.7],
      },
      location_name: address,
    });
    setAddress(address);
    setError('');
  }

  const handleSelect = (address: any) => {
    geocodeByAddress(address)
      .then((results: any) => {
        console.log({ results });
        return getLatLng(results[0]);
      })
      .then((latLng: any) => {
        console.log('Success', { latLng });
        let coordinates_values = [];
        if (latLng?.lat && latLng?.lng) {
          coordinates_values.push(latLng?.lat);
          coordinates_values.push(latLng?.lng);
        }
        setLocation({ coordinates: coordinates_values, address })
      }).catch((error: any) => {
        setLocation({ coordinates: null, address })
        console.log('Error', error)
      });
  };
  console.log({
    locationDetails,
    address
  })
  // const locationItem: any = locationDetails;
  // Please enable the location permission from the settings so that Tickt app can access your location
  return (
    <div className="app_wrapper">
      <CommonHeader />
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
                <button className="location-btn" onClick={getCurrentLocation}>
                  <span className="gps_icon">
                    <img src={icgps} alt="gps-icon" />
                  </span>
                  {'Use my current location'}
                </button>
              </div>

              <div className="form_field">
                <button className="fill_btn full_btn" onClick={handleContinue}>Continue</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default AddLocation
