import React, { useState, useEffect } from 'react';
import Constants from '../../utils/constants';
// @ts-ignore
import PlacesAutocomplete, { geocodeByAddress, getLatLng, } from 'react-places-autocomplete';
import regex from '../../utils/regex';
// @ts-ignore
import { format } from 'date-fns';
// @ts-ignore
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import Searchicon from "../../assets/images/main-search.png";
import search from "../../assets/images/ic-search.png";
import Location from "../../assets/images/ic-location.png";
import cross from "../../assets/images/close-black.png";
import icgps from "../../assets/images/ic-gps.png";
import residential from "../../assets/images/ic-residential.png";
import close from "../../assets/images/icon-close-1.png";

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { getSearchJobList, getRecentSearchList, postHomeSearchData, getRecentLocationList } from '../../redux/homeSearch/actions';
import { isHandleChanges } from '../../redux/jobs/actions';
// @ts-ignore
import { useDetectClickOutside } from 'react-detect-click-outside';
import moment from 'moment';
import Geocode from "react-geocode";
import { setShowToast } from '../../redux/common/actions';

import { deleteRecentSearch } from '../../redux/homeSearch/actions';

Geocode.setApiKey("AIzaSyDKFFrKp0D_5gBsA_oztQUhrrgpKnUpyPo");
Geocode.setLanguage("en");
Geocode.setRegion("au");
// Geocode.setLocationType("ROOFTOP");

interface PropsType {
    history: any,
    location?: any,
    bannerData: any,
    selectedItem: any,
    selectedTrade: any,
    current_address: any,
    recentLocationData: Array<any>,

    searchText: any,
    stateData: any,
    addressText: any,
    selectedAddress: any,
    isHandleChanges: (item: any) => void,
    localChanges: boolean,
    searchJobListData: Array<object>,
    recentSearchJobData: Array<object>,
    homeSearchJobData: Array<object>,
    setBannerData: (data: any) => void,
    getSearchJobList: (data: any) => void,
    postHomeSearchData: (data: any) => void,
    handleChangeToggle?: (data: any) => void,
    getRecentSearchList?: () => void,
    getRecentLocationList: () => void,
}

const example_calender = { startDate: '', endDate: '', key: 'selection1' };

export function useStateFromProp(initialValue: any) {
    const [value, setValue] = useState(initialValue);

    useEffect(() => setValue(initialValue), [initialValue]);

    return [value, setValue];
}



const BannerSearch = (props: PropsType) => {
    let props_selected = props.selectedItem;
    const { selectedItem, isHandleChanges, localChanges, getRecentSearchList, getRecentLocationList } = props;
    const [locationStatus, setLocationStatus] = useState(null);
    const [stateData, setStateData] = useState<any>(null)
    const [searchText, setSearchText] = useState('');
    const [addressText, setAddressText] = useState<any>('');
    const [recentLocation, setRecentLocation] = useState<any>([]); // recentLocation
    const [selectedAddress, setSelectedAddress] = useState({});
    const [enableCurrentLocation, setCurrentLocations] = useState<boolean>(false);
    const [errors, setErrors] = useState<any>({});
    const [selectedTrade, setSelectedTrade] = useState({});

    const [inputFocus1, setInputFocus1] = useState<boolean>(false);
    const [inputFocus2, setInputFocus2] = useState<boolean>(false);
    const [inputFocus3, setInputFocus3] = useState<boolean>(false);

    const [calenderRange1, setCalenderRange1] = useState<any>(example_calender);

    const handleOnOutsideSearch = () => setInputFocus1(false);
    const handleOnOutsideLocation = () => {
        setInputFocus2(false)
    };
    const handleOnOutsideCalender = () => setInputFocus3(false);

    const [addressRef, setAddressRef] = useState('');

    const searchRef = useDetectClickOutside({ onTriggered: handleOnOutsideSearch });
    const locationRef = useDetectClickOutside({
        onTriggered: () => {
            if (addressText?.length > 3) {
                handleOnOutsideLocation()
            }
        }
    });
    const locationRefClone = useDetectClickOutside({
        onTriggered: () => {
            if (!addressText || addressText?.length < 2) {
                handleOnOutsideLocation()
            }
        }
    });
    const calenderRef = useDetectClickOutside({ onTriggered: handleOnOutsideCalender });

    const handleCalenderRange = (item: any) => {
        setCalenderRange1(item.selection1)
    };

    useEffect(() => {
        if (getRecentSearchList) {
            getRecentSearchList();
        }
        if (getRecentLocationList) {
            getRecentLocationList();
        }
        getRecentLocationData();
    }, [])

    useEffect(() => {
        console.log('In local-changes', { props: props.selectedItem })
        return () => {
            console.log('local-changes', { props: props.selectedItem })
        }
    }, [props])

    useEffect(() => {
        if (addressText?.length > 2) {
            document.getElementById('location-input-tag')?.focus();
        } else {
            document.getElementById('location_search_static')?.focus();
        }
    }, [addressText])

    useEffect(() => {
        if (props.recentLocationData?.length && JSON.stringify(props.recentLocationData[0]?.location?.coordinates) !== JSON.stringify(recentLocation[0]?.location?.coordinates)) {
            getRecentLocationData();
        }
    }, [props.recentLocationData, recentLocation]);

    useEffect(() => {
        if (searchText?.length > 2) {
            props.getSearchJobList(searchText);
        }
    }, [searchText])

    const getRecentLocationData = async () => {
        var recentLocationDetails: any = [];

        let recentLocationData = props.recentLocationData
        for (let index = 0; index < recentLocationData.length; index++) {
            let item = recentLocationData[index];
            try {
                let lat = item.location.coordinates[1];
                let long = item.location.coordinates[0];
                let response = await Geocode.fromLatLng(lat, long);
                let formatedCityText = JSON.parse(JSON.stringify(response?.results[0]));
                let cityText: any = null;
                if (formatedCityText?.formatted_address.includes(',')) {
                    cityText = formatedCityText?.formatted_address.split(',')
                } else {
                    cityText = formatedCityText?.formatted_address.split('-');
                }
                const newData = {
                    mainText: cityText?.length > 3 ? cityText?.slice(0, 2).join(',') : cityText?.slice(0, 1).join(','),
                    secondaryText: cityText?.length > 3 ? cityText?.slice(2, cityText?.length).join(',') : cityText?.slice(1, cityText?.length).join(','),
                }
                recentLocationDetails[index] = {
                    formatted_address: formatedCityText?.formatted_address,
                    location: { coordinates: item?.location?.coordinates },
                    allText: newData
                };

                if (recentLocationDetails?.length === props.recentLocationData?.length) {
                    setRecentLocation(recentLocationDetails);
                }
            } catch (err) {
                console.log({ err });
            }
        }
    }

    const checkIfExist = (_id: any) => {
        if (selectedTrade) {
            let isLength = Object.keys(selectedTrade).length;
            if (isLength) {
                let item: any = selectedTrade;
                if (item?._id === _id) {
                    return true;
                }
            }
        }
        return false;
    }

    const cleanRecentSearch = async (event: any, recentSearchId: string) => {
        event.stopPropagation();
        const data = {
            id: recentSearchId,
            status: 0
        }
        const res = await deleteRecentSearch(data);
        if (res.success) {
            if (getRecentSearchList) {
                getRecentSearchList();
            }
        }
    }

    const recentJobSearches = () => {
        let props_Clone: any = props;
        let tradeListData = props_Clone.tradeListData;
        return (
            <>
                <div className="custom_autosuggestion" id="recent-job-search-div">
                    {props?.recentSearchJobData?.length ?
                        <React.Fragment>
                            <span className="sub_title">Recent searches</span>
                            <div className="flex_row recent_search">
                                {props.recentSearchJobData?.length > 0 && props.recentSearchJobData?.slice(0, 4).map((item: any) => {
                                    return (
                                        <div
                                            className="flex_col_sm_3"
                                            onClick={() => {
                                                let selected_address: any = selectedAddress;
                                                props.history.push({
                                                    pathname: `search-tradie-results`,
                                                    state: {
                                                        name: item?.name,
                                                        tradeId: [item?._id],
                                                        specializations: [item?.specializationsId],
                                                        location: Object.keys(selected_address).length ? { "coordinates": [selected_address?.lng, selected_address?.lat] } : null,
                                                        calender: calenderRange1,
                                                        address: addressText,
                                                    }
                                                })
                                                // setItemSearch(item);
                                                // setSelectedTrade({});
                                            }}>
                                            <div className="card ico_txt_wrap">
                                                <figure className="ico">
                                                    <img src={item?.image || residential} alt="icon" />
                                                </figure>
                                                <div className="f_column">
                                                    <span>{item.name}</span>
                                                    <span className="name">{item.trade_name}</span>
                                                </div>
                                                <span className="remove_card" onClick={(event) => cleanRecentSearch(event, item.recentSearchId)}>
                                                    <img src={close} alt="remove" />
                                                </span>
                                            </div>
                                        </div>)
                                })}
                            </div>
                        </React.Fragment>
                        : null}

                    <div className="select_sphere recent_search">
                        <span className="sub_title">Categories</span>
                        <ul>
                            {tradeListData?.map(({ _id, trade_name, selected_url, specialisations }: { _id: string, trade_name: string, selected_url: string, specialisations: [] }) =>
                                <li
                                    onClick={() => {
                                        let item_spec: any = specialisations;
                                        if (item_spec?.length) {
                                            let getItem = item_spec[0];
                                            if (getItem) {
                                                setStateData({
                                                    image: selected_url,
                                                    name: getItem?.name,
                                                    specializationsId: getItem?._id,
                                                    trade_name: trade_name,
                                                    _id: _id,
                                                })
                                                setSearchText(getItem?.name);
                                            }
                                            setSelectedTrade({ _id, trade_name, selected_url, specialisations });
                                        }
                                    }}
                                    className={checkIfExist(_id) ? 'active' : ''}>
                                    <figure>
                                        <img src={selected_url} alt="" />
                                    </figure>
                                    <span className="name">{trade_name}</span>
                                </li>
                            )}
                        </ul>
                    </div>
                </div >
            </>
        )
    }

    const renderJobResult = () => {
        if (props?.searchJobListData?.length) {
            return (
                <div className="custom_autosuggestion" id="fetched-custom-job-category-div">
                    <div className="recent_search">
                        <ul className="drop_data">
                            {props.searchJobListData?.map((item: any) => {
                                return (
                                    <li onClick={() => {
                                        setItemSearch(item);
                                    }}>
                                        <figure className="category">
                                            <img src={item.image ? item.image : residential} alt="icon" />
                                        </figure>
                                        <div className="details">
                                            <span className="name">{item.name}</span>
                                            <span className="prof">{item.trade_name}</span>
                                        </div>
                                    </li>)
                            })}
                        </ul>
                    </div>
                </div>
            )
        }
        return null;
    }

    const onError = (status: string, clearSuggestions: Function) => {
        console.log('Google Maps API returned error with status: ', status)
        clearSuggestions();
    }

    const validateForm = () => {
        return true;
    }

    const setItemSearch = (item: any) => {
        setStateData(item);
        setSelectedTrade({});
        setSearchText(item?.name || '');
    }

    const bannerSearchClicked = () => {
        let selected_address: any = selectedAddress;
        let selected_trade: any = selectedTrade;
        let selected_item: any = props?.selectedItem;
        let props_trade: any = selected_item?.selectedTrade;

        if (!stateData?._id && !props_trade?._id) {
            setShowToast(true, 'please enter the valid search text.');
            return;
        }

        if (validateForm()) {
            let data: any = {
                page: 1,
                isFiltered: false,
                tradeId: [stateData?._id],
                specializationId: [stateData?.specializationsId],
            }

            if (Object.keys(selectedAddress).length) {
                data['location'] = {
                    "coordinates": [
                        parseFloat(selected_address?.lng),
                        parseFloat(selected_address?.lat)
                    ]
                }
            } else {
                delete data.location;
            }

            if (moment(calenderRange1?.startDate).isValid()) {
                data['from_date'] = moment(calenderRange1?.startDate).format('YYYY-MM-DD')
            } else {
                delete data.from_date;
            }

            if (moment(calenderRange1?.endDate).isValid()) {
                data['to_date'] = moment(calenderRange1?.endDate).format('YYYY-MM-DD')
            } else {
                delete data.to_date;
            }


            if (props_trade?._id) {
                data['tradeId'] = [props_trade._id];
                if (props_trade?.specialisations?.length) {
                    data['specializationId'] = props_trade.specialisations.map((item: any) => {
                        if (item?._id) {
                            return item?._id;
                        }
                        return item;
                    });
                }
            } else {
                if (selected_trade) {
                    if (Object.keys(selected_trade).length) {
                        data['tradeId'] = [selected_trade._id];
                        if (selected_trade?.specialisations?.length) {
                            data['specializationId'] = selected_trade.specialisations.map((item: any) => item._id);
                        }
                    }
                }
            }


            if (!localChanges) {
                props.postHomeSearchData(data);
            }
            isHandleChanges(false)
            props.history.push({
                pathname: `search-tradie-results`,
                state: {
                    name: searchText,
                    tradeId: data.tradeId,
                    specializations: data.specializationId,
                    location: Object.keys(selected_address).length ? { "coordinates": [selected_address?.lng, selected_address?.lat] } : null,
                    calender: calenderRange1,
                    address: addressText
                }
            })
        }
    }

    const filterFromAddress = (response: any) => {
        let city, state, country = null;
        for (let i = 0; i < response.results[0].address_components.length; i++) {
            for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
                switch (response.results[0].address_components[i].types[j]) {
                    case "locality":
                        city = response.results[0].address_components[i].long_name;
                        break;
                    case "administrative_area_level_1":
                        state = response.results[0].address_components[i].long_name;
                        break;
                    case "country":
                        country = response.results[0].address_components[i].long_name;
                        break;
                }
            }
        }
        return { city, state, country: country.toLowerCase() };
    }

    const getCurrentLocation = async () => {
        let itemToggle: any = await navigator.permissions.query({ name: 'geolocation' });
        setLocationStatus(itemToggle.state);
        let local_position: any = localStorage.getItem('position');
        let position: any = JSON.parse(local_position);
        if (position?.length) {
            let long = (position[0]).toString();
            let lat = (position[1]).toString();
            let response: any = await Geocode.fromLatLng(lat, long);
            const { city, state, country } = filterFromAddress(response);

            if (response && ["australia", "au"].includes(country)) {
                if (response?.results && Array.isArray(response.results) && response?.results?.length) {
                    const address = response.results[0].formatted_address;
                    setSelectedAddress({ lat, long });
                    setAddressText(address);
                    setInputFocus2(true);
                    setCurrentLocations(true);
                }
            } else {
                if (itemToggle?.state !== "denied") {
                    setShowToast(true, "Uh oh! we don't provide service currently in your location.");
                }
            }
        }
    }

    let selected_trade: any = selectedTrade;
    let length_spec = 0;

    if (props?.selectedItem) {
        let sProps = props?.selectedItem;
        if (Array.isArray(sProps?.selectedTrade?.specialisations)) {
            length_spec = sProps?.selectedTrade?.specialisations?.length
        }
    } else {
        length_spec = selected_trade?.specialisations?.length;
        if (!length_spec) {
            if (stateData?.specializationsId?.length) {
                length_spec = 1;
            }
        }
    }

    const checkPlaceholder = (calenderRange1: any) => {
        let fromDate: any = calenderRange1?.startDate;
        let toDate: any = calenderRange1?.endDate;
        return renderTime({ fromDate, toDate });
    }

    const renderTime = ({ fromDate, toDate }: any) => {
        if (moment(fromDate).isValid() && !moment(toDate).isValid()) {
            return `${moment(fromDate).format('DD MMM')}`
        }

        if (moment(fromDate).isValid() && moment(toDate).isValid()) {
            let yearEnd = moment().endOf("year").toISOString();
            let monthEnd = moment(fromDate).endOf("month").toISOString();

            let item: any = moment(toDate).diff(moment(fromDate), 'months', true);
            let item_year: any = moment(toDate).diff(moment(fromDate), 'years', true);

            let monthDiff = parseInt(item.toString());
            let yearDiff = parseInt(item_year.toString());

            if (yearDiff > 0 || moment(toDate).isAfter(yearEnd) || moment(toDate).isAfter(yearEnd)) {
                return `${moment(fromDate).format('DD MMM YY')} - ${moment(toDate).format('DD MMM YY')}`
            }
            if (monthDiff > 0 || moment(toDate).isAfter(monthEnd)) {
                return `${moment(fromDate).format('DD MMM')} - ${moment(toDate).format('DD MMM')}`
            }
            return `${moment(fromDate).format('DD MMM')} - ${moment(toDate).format('DD')}`
        }

        return 'when ?'
    }


    let custom_name = searchText;
    return (
        <div className="home_search">
            <button
                onClick={() => {
                    if (props?.handleChangeToggle) {
                        props.handleChangeToggle(false)
                    }
                }}
                className="modal_srch_close">
                <img src={close} alt="close" />
            </button>
            <form className={`search_wrapr ${!length_spec ? 'first_input' : ''}`}>
                {/* first_input */}
                <ul>
                    <li className="categ_box">
                        <div className="text_field" id="text-field-div">
                            <input
                                type="text"
                                ref={searchRef}
                                placeholder="What jobs are you after?"
                                value={length_spec > 1 ? `${custom_name} +${length_spec - 1}` : (custom_name)}
                                onChange={(e) => {
                                    // isHandleChanges(true)
                                    setSearchText((e.target.value).trimLeft());
                                }}
                                autoComplete="none"
                                // readOnly={props?.selectedItem ? true : false}
                                onFocus={() => { setInputFocus1(true) }}
                            />
                            <div className="border_eff"></div>
                            <span className="detect_icon_ltr">
                                <img src={Searchicon} alt="search" />
                            </span>
                            {searchText?.length && inputFocus1 ? (
                                <span className="detect_icon" >
                                    <img
                                        src={cross}
                                        alt="cross"
                                        onClick={() => {
                                            // clear here
                                            // isHandleChanges(true)
                                            setSearchText('');
                                            setStateData({});
                                            setSelectedTrade({})
                                        }} />
                                </span>
                            ) : null}
                        </div>
                        {!!errors.searchedJob && <span className="error_msg">{errors.searchedJob}</span>}
                    </li>
                    {!searchText?.length && inputFocus1 ? recentJobSearches() : null}
                    {searchText?.length > 2 && inputFocus1 ? renderJobResult() : null}

                    {/* {'location search start here!'} */}
                    <li className="loc_box">
                        <div id="location-text-field-div">
                            <div
                                className={`text_field ${addressText?.length > 2 ? 'none' : ''}`}>
                                <input
                                    id="location_search_static"
                                    placeholder='Where?'
                                    ref={locationRefClone}
                                    value={addressText}
                                    autoComplete="off"
                                    className={'line-1'}
                                    onChange={(e: any) => { setAddressText((e.target.value).trimLeft()) }}
                                    onFocus={() => {
                                        setInputFocus2(true)
                                    }}
                                />
                                <span className="detect_icon_ltr">
                                    <img src={Location} alt="location" />
                                </span>
                            </div>

                            <div>
                                <PlacesAutocomplete
                                    value={addressText}
                                    searchOptions={{ componentRestrictions: { country: "au" } }}
                                    onChange={(item: any) => {
                                        setAddressText(item)
                                        if (!addressText.length) {
                                            setSelectedAddress({});
                                        }
                                    }}
                                    shouldFetchSuggestions={true}
                                    onSelect={async (address) => {
                                        let selected_address: any = address;
                                        if (address.indexOf(',')) {
                                            selected_address = address.split(',')[0];
                                        }
                                        setAddressText(selected_address);
                                        let response = await Geocode.fromAddress(address);
                                        if (response?.results?.length) {
                                            const { lat, lng } = response.results[0].geometry.location;
                                            setSelectedAddress({ lat, lng });
                                            setInputFocus2(false);
                                        }
                                    }}
                                    highlightFirstSuggestion={true}
                                    onError={onError}
                                    debounce={0}
                                >
                                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }: any) => (
                                        <div>
                                            <div
                                                className={`text_field ${addressText?.length > 2 ? '' : 'none'}`}>
                                                <input
                                                    {...getInputProps({ placeholder: 'Where?', className: 'line-1' })}
                                                    id="location-input-tag"
                                                    ref={locationRef}
                                                    autoComplete="none"
                                                    onFocus={() => { setInputFocus2(true) }}
                                                />
                                                <span className="detect_icon_ltr">
                                                    <img src={Location} alt="location" />
                                                </span>
                                                {inputFocus2 && addressText?.length > 2 ?
                                                    <span className="detect_icon" >
                                                        <img
                                                            src={cross}
                                                            alt="cross"
                                                            onClick={() => {
                                                                setAddressText('');
                                                                setSelectedAddress({});
                                                            }}
                                                        />
                                                    </span> : null}
                                            </div>

                                            {suggestions?.length && inputFocus2 && addressText?.length > 2 ?
                                                <div className="custom_autosuggestion location" id="autocomplete-dropdown-container">
                                                    <div className="flex_row recent_search auto_loc">
                                                        <div className="flex_col_sm_4">
                                                            {!!errors.selectedMapLocation && <span className="error_msg">{errors.selectedMapLocation}</span>}
                                                            {loading && <div>Loading...</div>}

                                                            {suggestions.map((suggestion: any) => {
                                                                const className = 'autosuggestion_icon card loc name';
                                                                const style = suggestion.active
                                                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                                                return (
                                                                    <div
                                                                        {...getSuggestionItemProps(suggestion, { className, style, })}>
                                                                        <span>{suggestion.formattedSuggestion.mainText}</span>
                                                                        <span className="name">{suggestion.formattedSuggestion.secondaryText}</span>

                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                </div> : !loading && addressText?.length > 2 && !suggestions?.length && !enableCurrentLocation && !Object.keys(selectedAddress).length ? (
                                                    <div style={{ minHeight: '50px' }} className="custom_autosuggestion location" id="autocomplete-dropdown-container">
                                                        <div className="flex_row recent_search auto_loc">
                                                            <div className="flex_col_sm_4">
                                                                <div className="loc_suggestions">
                                                                    {'No Result Found.'}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : null}
                                        </div>
                                    )}
                                </PlacesAutocomplete>
                            </div>
                        </div>
                        {!!errors.selectedMapLocation && <span className="error_msg">{errors.selectedMapLocation}</span>}
                    </li>

                    {/* {'location search end here!'} */}

                    {!addressText?.length && inputFocus2 ?
                        <div className="custom_autosuggestion location" id="current-location-search-div">
                            <span
                                className="location-btn"
                                onClick={getCurrentLocation}>
                                <span className="gps_icon">
                                    <img src={icgps} alt="" />
                                </span> Use my current location
                            </span>
                            {locationStatus === "denied" &&
                                (<span className="blocked_note">
                                    You have blocked your location.
                                    To use this, change your location settings in browser.
                                </span>)}
                            <div className="flex_row recent_search auto_loc">
                                {recentLocation?.length ?
                                    <span className="sub_title">
                                        {'Recent searches'}
                                    </span>
                                    : null}
                                {recentLocation?.map((item: any) => {
                                    return (
                                        <div className="flex_col_sm_4"
                                            onClick={() => {
                                                let location_coordinates: any = item.location.coordinates
                                                setAddressText(item.formatted_address);
                                                setSelectedAddress({
                                                    lat: location_coordinates[1],
                                                    lng: location_coordinates[0]
                                                });
                                            }}>
                                            <div className="autosuggestion_icon card loc name">
                                                <span>{item.allText?.mainText}</span>
                                                <span className="name">{item.allText?.secondaryText}</span>
                                            </div>
                                        </div>)
                                })}
                            </div>
                        </div>
                        : null}
                    <li className={`date_box ${calenderRange1?.startDate ? 'date_value' : ''}`}>
                        <div
                            ref={calenderRef}
                            className="custom_date_range" id="date-range-div">
                            <div className="text_field">
                                <span className="detect_icon_ltr calendar"></span>
                                <input
                                    type="text"
                                    id="calender-input"
                                    placeholder={checkPlaceholder(calenderRange1)}
                                    autoComplete="none"
                                    onFocus={() => setInputFocus3(true)}
                                />
                                {calenderRange1?.startDate && inputFocus3 &&
                                    <span className="detect_icon" >
                                        <img
                                            src={cross}
                                            alt="cross"
                                            onClick={() => {
                                                setCalenderRange1({ startDate: '', endDate: '', key: 'selection1' })
                                            }} />
                                    </span>}
                            </div>
                            {/* {inputFocus3 && */}
                            {inputFocus3 ? (
                                <div
                                    className="custom_autosuggestion"
                                    id="custom-date-range-div">
                                    <DateRange
                                        onChange={handleCalenderRange}
                                        ranges={[calenderRange1]}
                                        moveRangeOnFirstSelection={false}
                                        rangeColors={["#fee600", "#b5b5b5"]}
                                        showDateDisplay={false}
                                        showSelectionPreview={true}
                                        months={2}
                                        showPreview={true}
                                        minDate={new Date()}
                                        maxDate={moment().add(2, 'years').toDate()}
                                        direction="horizontal"
                                        fixedHeight={true}
                                    />
                                </div>
                            ) : null}
                        </div>
                    </li>
                    <div className="search_btn">
                        <button type="button" className="fill_btn btn-effect" onClick={bannerSearchClicked}>
                            <img src={search} alt="search" />
                        </button>
                    </div>
                </ul>
            </form>
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return {
        searchJobListData: state.homeSearch.searchJobListData,
        recentSearchJobData: state.homeSearch.recentSearchJobData,
        homeSearchJobData: state.homeSearch.homeSearchJobData,
        tradeListData: state.auth.tradeListData,
        localChanges: state.jobs.localChanges,
        recentLocationData: state.homeSearch.recentLocationData,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        getSearchJobList,
        getRecentSearchList,
        postHomeSearchData,
        isHandleChanges,
        getRecentLocationList
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BannerSearch);