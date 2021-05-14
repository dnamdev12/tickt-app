import React, { useState, useEffect } from 'react';
import Constants from '../../../../../utils/constants';
// @ts-ignore
import PlacesAutocomplete, { geocodeByAddress, getLatLng, } from 'react-places-autocomplete';
import regex from '../../../../../utils/regex';
// @ts-ignore
import { format } from 'date-fns';
// @ts-ignore
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import moment from 'moment';
// @ts-ignore
import { useDetectClickOutside } from 'react-detect-click-outside';

import Searchicon from "../../../../../assets/images/main-search.png";
import search from "../../../../../assets/images/ic-search.png";
import Location from "../../../../../assets/images/ic-location.png";
import cross from "../../../../../assets/images/close-black.png";
import icgps from "../../../../../assets/images/ic-gps.png";
import residential from "../../../../../assets/images/ic-residential.png";
import close from "../../../../../assets/images/icon-close-1.png";

interface PropsType {
    history: any,
    location?: any,
    currentCoordinates: any,
    searchJobListData: Array<object>,
    recentSearchJobData: Array<object>,
    homeSearchJobData: Array<object>,
    paramsData?: any,
    setTradieHomeData: (data: any) => void,
    getSearchJobList: (data: any) => void,
    postHomeSearchData: (data: any) => void,
    cleanFiltersHandler?: (data: any) => void,
}

const BannerSearch = (props: PropsType) => {
    // const [stateData, setStateData] = useState<any>(props.bannerData)
    const { paramsData } = props;
    const [stateData, setStateData] = useState<any>({
        page: 1,
        searchedJob: '',
        isFiltered: false,
        isSearchedJobSelected: false,
        tradeId: [],
        specializationId: [],
        searchedJobId: null,
        location: {
            coordinates: [
                144.946457, //long
                -37.840935 //lat
                // props.currentAddress?.coordinates[0],
                // props.currentAddress?.coordinates[1]
            ]
        },
        bannerLocation: '',
        locationDenied: false,
        selectedMapLocation: '',
        isMapLocationSelected: false,
        from_date: '',
        startDate: '',
        to_date: '',
        endDate: '',
    });

    const [errors, setErrors] = useState<any>({});
    const [inputFocus1, setInputFocus1] = useState<boolean>(false)
    const [inputFocus2, setInputFocus2] = useState<boolean>(false)
    const [inputFocus3, setInputFocus3] = useState<boolean>(false)
    const [calenderRange1, setCalenderRange1] = useState<any>({ startDate: new Date(), endDate: new Date(), key: 'selection1' });

    const handleOnOutsideSearch = () => setInputFocus1(false);
    const handleOnOutsideLocation = () => setInputFocus2(false);
    const handleOnOutsideCalender = () => setInputFocus3(false);

    const searchRef = useDetectClickOutside({ onTriggered: handleOnOutsideSearch });
    const locationRef = useDetectClickOutside({ onTriggered: handleOnOutsideLocation });
    const calenderRef = useDetectClickOutside({ onTriggered: handleOnOutsideCalender });

    useEffect(() => {
        if (paramsData) {
            var data = {
                page: paramsData?.page ? paramsData?.page : 1,
                searchedJob: paramsData?.searchJob ? paramsData?.specializationId?.length >= 2 ? `${paramsData?.searchJob} +${paramsData?.specializationId?.length - 1}` : paramsData?.searchJob : '',
                isFiltered: paramsData?.isFiltered ? paramsData?.isFiltered : false,
                isSearchedJobSelected: paramsData?.searchJob ? true : false,
                tradeId: paramsData?.tradeId ? paramsData?.tradeId : [],
                specializationId: paramsData?.specializationId ? paramsData?.specializationId : [],
                // searchedJobId: null,
                location: {
                    coordinates: [
                        paramsData?.long ? paramsData?.long : paramsData?.defaultLong,
                        paramsData?.lat ? paramsData?.lat : paramsData?.defaultLat
                    ]
                },
                // bannerLocation: '',
                // locationDenied: false,
                selectedMapLocation: paramsData?.address ? paramsData?.address : '',
                isMapLocationSelected: paramsData?.address ? true : false,
                from_date: paramsData?.from_date ? paramsData?.from_date : '',
                startDate: '',
                to_date: paramsData?.to_date ? paramsData?.to_date : '',
                endDate: '',
            }
            if (paramsData?.from_date) {
                data.startDate = moment(paramsData?.from_date).format('MMM DD')
                data.endDate = moment(paramsData?.to_date).format('MMM DD')

            }
            setStateData((prevData: any) => ({ ...prevData, ...data }));
        }
    }, [paramsData])

    useEffect(() => {
        if (calenderRange1 && inputFocus3) {
            const startDate = format(new Date(calenderRange1.startDate), 'MMM dd')
            const endDate = format(new Date(calenderRange1.endDate), 'MMM dd')
            const from_date = format(new Date(calenderRange1.startDate), 'yyyy-MM-dd')
            const to_date = format(new Date(calenderRange1.endDate), 'yyyy-MM-dd')
            setStateData((prevData: any) => ({ ...prevData, startDate: startDate, endDate: endDate }))
            setStateData((prevData: any) => ({ ...prevData, from_date: from_date, to_date: to_date }))
        }
    }, [calenderRange1])

    useEffect(() => {
        if (props.currentCoordinates) {
            setStateData((prevData: any) => ({ ...prevData, location: props.currentCoordinates }));
        }
    }, [props.currentCoordinates])

    const handleCalenderRange = (item: any) => {
        setCalenderRange1(item.selection1)
    };

    console.log(stateData, "stateData diff", props.currentCoordinates)

    const checkInputValidation = (e: any) => {
        const alphaRegex = new RegExp(regex.alphaSpecial)
        return alphaRegex.test(e.target.value)
    }

    const handleJobChange = (e: any) => {
        // if (checkInputValidation(e)) {
        e.target.value.length >= 3 && props.getSearchJobList(e.target.value)
        setStateData((prevData: any) => ({ ...prevData, searchedJob: e.target.value, isSearchedJobSelected: false }))
        // }
    }

    const cleanInputData = (item: string) => {
        if (item === "calender") {
            setStateData((prevData: any) => ({ ...prevData, from_date: '', to_date: '', startDate: '', endDate: '' }))
            return;
        }
        setStateData((prevData: any) => ({ ...prevData, [item]: '' }))
    }

    const searchedJobClicked = (item: any, isRecentSearchesClicked?: string) => {
        setStateData((prevData: any) => ({ ...prevData, searchedJob: item.name, tradeId: [item._id], specializationId: [item.specializationsId], isSearchedJobSelected: true }));
        setInputFocus1(false);
        if (isRecentSearchesClicked == 'isRecentSearchesClicked') {
            const newSearchData = {
                tradeId: [item._id],
                specializationId: [item.specializationsId],
                searchedJob: item.name,
                isRecentSearchesClicked: "isRecentSearchesClicked"
            }
            bannerSearchClicked(newSearchData);
        }
    }

    const recentJobSearches = () => {
        return (
            <>
                {props.recentSearchJobData?.length > 0 && <div className="custom_autosuggestion" id="recent-job-search-div">
                    <span className="sub_title">Recent searches</span>
                    <div className="flex_row recent_search">
                        {props.recentSearchJobData?.length > 0 && props.recentSearchJobData?.slice(0, 2).map((item: any) => {
                            return (
                                <div className="flex_col_sm_4" onClick={() => searchedJobClicked(item, 'isRecentSearchesClicked')}>
                                    <div className="autosuggestion_icon card history">
                                        <span>{item.name}</span>
                                        <span className="name">{item.trade_name}</span>
                                    </div>
                                </div>)
                        })}
                    </div>
                </div >}
            </>
        )
    }

    const renderJobResult = () => {
        return (
            (props.searchJobListData?.length && stateData.searchedJob.length >= 3) ? <div className="custom_autosuggestion" id="fetched-custom-job-category-div">
                <div className="recent_search">
                    <ul className="drop_data">
                        {props.searchJobListData?.map((item: any) => {
                            return (<li onClick={() => searchedJobClicked(item)}>
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
            </div> : stateData.searchedJob.length < 3 ? '' : <span className="error_msg">Please select job type from the listtt</span>
        )
    }

    const locationSelectedHandler = (address: string, placeId?: any, suggestion?: any) => {
        console.log(address, "address")
        geocodeByAddress(address)
            .then((results: any) => getLatLng(results[0]))
            .then(({ lat, lng }: any) => {
                const locationNew: any = {
                    location: {
                        coordinates: [lng, lat]
                    }
                }
                console.log('Successfully got latitude and longitude', locationNew)
                setStateData((prevData: any) => ({ ...prevData, ...locationNew, selectedMapLocation: suggestion?.formattedSuggestion?.mainText, isMapLocationSelected: true }))
            }
            );
        setStateData((prevData: any) => ({ ...prevData, selectedMapLocation: suggestion?.formattedSuggestion?.mainText ? suggestion?.formattedSuggestion?.mainText : address, isMapLocationSelected: true }))
        setInputFocus2(false);
        document.getElementById("location-input-tag")?.blur();
    }

    const getCurrentLocation = (e: any) => {
        e.preventDefault();
        const showPosition = (position: any) => {
            var address: string;
            // const locationNew: any = {
            //     bannerLocation: {
            //         coordinates: []
            //     }
            // }
            // const lat = position.coords.latitude;
            // const long = position.coords.longitude;
            // locationNew.bannerLocation.coordinates[0] = long;
            // locationNew.bannerLocation.coordinates[1] = lat;
            var latlng = new google.maps.LatLng(props.currentCoordinates?.coordinates[1], props.currentCoordinates?.coordinates[0]);
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({ location: latlng }, function (results, status) {
                if (status !== google.maps.GeocoderStatus.OK) {
                    alert(status);
                }
                // This is checking to see if the Geoeode Status is OK before proceeding
                if (status == google.maps.GeocoderStatus.OK) {
                    setInputFocus2(false);
                    // document.getElementById("current-location-search-div")?.blur();
                    address = (results[1].formatted_address);
                    setStateData((prevData: any) => ({ ...prevData, selectedMapLocation: address, isMapLocationSelected: true, locationDenied: false }));
                }
            });
        }

        const showError = (error: any) => {
            if (error.code == error.PERMISSION_DENIED) {
                setStateData((prevData: any) => ({ ...prevData, bannerLocation: '', locationDenied: true }));
            }
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        }
    }

    const onError = (status: string, clearSuggestions: Function) => {
        console.log('Google Maps API returned error with status: ', status)
        clearSuggestions();
    }

    const validateForm = (isRecentSearchesClicked?: string) => {
        if (isRecentSearchesClicked == 'isRecentSearchesClicked' && props.history?.location?.pathname == '/') {
            return true;
        }
        const newErrors: any = {};
        if (!stateData?.isSearchedJobSelected) {
            newErrors.searchedJob = Constants.errorStrings.bannerSearchJob;
        } else if (!stateData?.searchedJob) {
            newErrors.searchedJob = Constants.errorStrings.bannerSearchJobEmpty;
        } else {
            const searchJobRegex = new RegExp(regex.alphaSpecial);
            if (!searchJobRegex.test(stateData.searchedJob.trim())) {
                newErrors.searchedJob = Constants.errorStrings.bannerSearchJob;
            }
        }
        if (!stateData?.isMapLocationSelected && stateData?.selectedMapLocation) {
            newErrors.selectedMapLocation = Constants.errorStrings.bannerSearchLocation;
        }
        setErrors(newErrors);
        return !Object.keys(newErrors).length;
    }

    const bannerSearchClicked = (newSearchData?: any) => {
        if (validateForm(newSearchData?.isRecentSearchesClicked)) {
            const params = new URLSearchParams(props.location?.search);
            const queryParamsData: any = {
                defaultLat: Number(params.get('defaultLat')),
                defaultLong: Number(params.get('defaultLong')),
            }
            const data = {
                page: stateData.page,
                isFiltered: false,
                tradeId: newSearchData?.tradeId ? newSearchData?.tradeId : stateData?.tradeId,
                location: stateData?.location,
                specializationId: newSearchData?.specializationId ? newSearchData?.specializationId : stateData?.specializationId,
                ...(stateData?.from_date && { from_date: stateData?.from_date }),
                ...(stateData?.to_date && { to_date: stateData?.to_date })
            }
            props.postHomeSearchData(data);
            const newData = {
                ...data,
                lat: stateData.location.coordinates[1],
                long: stateData.location.coordinates[0],
                defaultLat: props.currentCoordinates?.coordinates[1] ? props.currentCoordinates?.coordinates[1] : queryParamsData.defaultLat,
                defaultLong: props.currentCoordinates?.coordinates[0] ? props.currentCoordinates?.coordinates[0] : queryParamsData.defaultLong,
                ...(stateData.selectedMapLocation && { address: stateData.selectedMapLocation }),
                searchJob: newSearchData?.searchedJob ? newSearchData?.searchedJob : stateData?.searchedJob,
                jobResults: null
            }
            delete newData.location;
            Object.keys(newData).forEach(key => (newData[key] === undefined || newData[key] === null) && delete newData[key]);
            var url = 'search-job-results?';
            for (let [key, value] of Object.entries(newData)) {
                console.log(key, value);
                url += `${key}=${value}&`
            }
            const newUrl = url.slice(0, url.length - 1)
            console.log(newUrl, "newUrl", data, "data", newData, "newData");
            if (props.history?.location?.pathname == '/') {
                props.history.push(newUrl);
            } else {
                props.history.replace(newUrl);
                if (props?.cleanFiltersHandler) {
                    props?.cleanFiltersHandler(true);
                }
            }
        }
    }

    const renderPlacesData = ({ getInputProps, suggestions, getSuggestionItemProps, loading }: any) => (
        <React.Fragment>
            <div className="text_field">
                <input ref={locationRef} {...getInputProps({ placeholder: 'Where?', className: 'line-1' })} id="location-input-tag" onFocus={() => setInputFocus2(true)} />
                <span className="detect_icon_ltr">
                    <img src={Location} alt="location" />
                </span>
                {stateData?.selectedMapLocation && inputFocus2 && <span className="detect_icon" >
                    <img src={cross} alt="cross" onClick={() => setStateData((prevData: any) => ({ ...prevData, selectedMapLocation: '' }))} />
                </span>}
                {!!errors.selectedMapLocation && <span className="error_msg">{errors.selectedMapLocation}</span>}
            </div>
            {suggestions?.length > 0 && stateData?.selectedMapLocation.length >= 3 && inputFocus2 && <div className="custom_autosuggestion location" id="autocomplete-dropdown-container">
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
                                    {...getSuggestionItemProps(suggestion, {
                                        className,
                                        style,
                                    })}
                                >
                                    <span>{suggestion.formattedSuggestion.mainText}</span>
                                    <span className="name">{suggestion.formattedSuggestion.secondaryText}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>}
        </React.Fragment>
    )

    return (
        <div className="home_search">
            <button className="modal_srch_close">
                <img src={close} alt="close" />
            </button>
            {/* first_input class should remove when first input get the value */}
            <form className="search_wrapr first_input">
                <ul>
                    <li className="categ_box">
                        <div className="text_field" id="text-field-div">
                            <input type="text" ref={searchRef} placeholder="What jobs are you after?" value={stateData?.searchedJob} onChange={handleJobChange} onFocus={() => setInputFocus1(true)} />
                            {/* <input type="text" ref={searchRef} placeholder="What jobs are you after?" value={stateData?.searchedJob} onChange={handleJobChange} onFocus={() => setInputFocus1(true)} readOnly={props.history?.location?.pathname == '/search-job-results'} /> */}
                            {/* <input type="text" placeholder="What jobs are you after?" value={props.history?.location?.pathname == '/' ? stateData?.searchedJob : stateData.specializationId?.length >= 2 ? `${stateData?.searchedJob} +${stateData.specializationId?.length - 1}` : stateData?.searchedJob} onChange={handleJobChange} onFocus={() => setInputFocus1(true)} /> */}
                            {/* <input type="text" placeholder="What jobs are you after?" value={props.history?.location?.pathname == '/' ? stateData?.searchedJob : stateData?.searchedJob ? `${stateData.searchedJob}${stateData.specializationId?.length == 2 ? ' +1' : stateData.specializationId?.length >= 3 ? ` +${stateData.specializationId?.length - 1}` : ''}` : ''} onChange={handleJobChange} onFocus={() => setInputFocus1(true)} /> */}
                            <div className="border_eff"></div>
                            <span className="detect_icon_ltr">
                                <img src={Searchicon} alt="search" />
                            </span>
                            {!!stateData?.searchedJob && inputFocus1 &&
                                <span className="detect_icon" >
                                    <img src={cross} alt="cross" onClick={() => cleanInputData('searchedJob')} />
                                </span>}
                        </div>
                        {!!errors.searchedJob && <span className="error_msg">{errors.searchedJob}</span>}
                    </li>
                    {!stateData?.searchedJob && inputFocus1 && recentJobSearches()}
                    {stateData?.searchedJob?.length >= 1 && inputFocus1 && renderJobResult()}
                    <li className="loc_box">
                        <div id="location-text-field-div">
                            <PlacesAutocomplete
                                value={stateData?.selectedMapLocation}
                                onChange={(city: string) => setStateData((prevData: any) => ({ ...prevData, selectedMapLocation: city, isMapLocationSelected: false }))}
                                shouldFetchSuggestions={true}
                                onSelect={locationSelectedHandler}
                                highlightFirstSuggestion={true}
                                // searchOptions={{ types: ['(cities)','address'] }}
                                onError={onError}
                            // debounce={400}
                            >
                                {renderPlacesData}
                            </PlacesAutocomplete>
                        </div>
                    </li>
                    {!stateData?.selectedMapLocation && inputFocus2 &&
                        <div className="custom_autosuggestion location" id="current-location-search-div">
                            <a className="location-btn" onClick={getCurrentLocation}>
                                <span className="gps_icon">
                                    <img src={icgps} />
                                </span> Use my current location
                            </a>
                            {stateData?.locationDenied && <span className="blocked_note">
                                You have blocked your location.
                                To use this, change your location settings in browser.
                              </span>}
                        </div>
                    }
                    <li className="date_box">
                        <div className="custom_date_range" id="date-range-div">
                            <div className="text_field">
                                <span className="detect_icon_ltr calendar"></span>
                                <input type="text" placeholder={stateData?.startDate ? `${stateData?.startDate} - ${stateData?.endDate}` : "When?"} onFocus={() => setInputFocus3(true)} />
                                {stateData?.startDate && inputFocus3 &&
                                    <span className="detect_icon" >
                                        <img src={cross} alt="cross" onClick={() => cleanInputData('calender')} />
                                    </span>}
                            </div>
                            {inputFocus3 &&
                                <div className="custom_autosuggestion" id="custom-date-range-div">
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
                                        maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 2))}
                                        direction="horizontal"
                                        fixedHeight={true}
                                    />
                                </div>}
                        </div>
                    </li>
                    <div className="search_btn">
                        <button type="button" className="fill_btn" onClick={bannerSearchClicked}>
                            <img src={search} alt="search" />
                        </button>
                    </div>
                </ul>
            </form>
        </div>
    )
}

export default BannerSearch;
