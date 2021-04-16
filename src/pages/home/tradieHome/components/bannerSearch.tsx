import React, { useState, useEffect } from 'react';
import Constants from '../../../../utils/constants';
// @ts-ignore
import PlacesAutocomplete, { geocodeByAddress, getLatLng, } from 'react-places-autocomplete';
import regex from '../../../../utils/regex';
// @ts-ignore
import { addDays, subDays, isEqual, isBefore, differenceInHours, lightFormat, format } from 'date-fns';
// @ts-ignore
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import colorLogo from '../../../../assets/images/ic-logo-yellow.png';
import dummy from '../../../../assets/images/u_placeholder.jpg';
import Searchicon from "../../../../assets/images/main-search.png";
import search from "../../../../assets/images/ic-search.png";
import Location from "../../../../assets/images/ic-location.png";
import cross from "../../../../assets/images/close-black.png";
import bannerimg from '../../../../assets/images/home-banner.png';
import icgps from "../../../../assets/images/ic-gps.png";
import residential from "../../../assets/images/ic-residential.png";
import industrial from "../../../assets/images/ic-money.png";
import contracted from "../../../assets/images/ic-contracted.png";
import commercial from "../../../assets/images/ic-commercial.png";
import hourlyRate from "../../../assets/images/ic-clock.png";

const BannerSearch = (props: any) => {
    const [stateData, setStateData] = useState<any>({
        searchedJob: '',
        isSearchedJobSelected: false,
        tradeId: '',
        specializationId: '',
        searchedJobId: null,
        location: {
            coordinates: []
        },
        locationName: '',
        from_date: '',
        startDate: '',
        to_date: '',
        endDate: '',
    });
    const [errors, setErrors] = useState<any>({});
    const [inputFocus1, setInputFocus1] = useState<boolean>(false)
    const [inputFocus2, setInputFocus2] = useState<boolean>(false)
    const [inputFocus3, setInputFocus3] = useState<boolean>(false)

    const [selectedMapLocation, setSelectedMapLocation] = useState<any>('')

    const [calenderRange1, setCalenderRange1] = useState<any>({ startDate: new Date(), endDate: new Date(), key: 'selection1' });
    const [calenderRange2, setCalenderRange2] = useState<any>({ startDate: new Date(), endDate: null, key: 'selection2' });


    useEffect(() => {
        window.addEventListener('mousedown', handleClicked)

        // navigator.geolocation.getCurrentPosition(function (position) {
        //     console.log("Latitude is :", position.coords.latitude);
        //     console.log("Longitude is :", position.coords.longitude);
        // });

        return () => {
            window.removeEventListener('mousedown', handleClicked)
        }
    }, [])

    useEffect(() => {
        if (calenderRange1 && inputFocus3) {
            const startDate = format(new Date(calenderRange1.startDate), 'MMM dd')
            const endDate = format(new Date(calenderRange1.endDate), 'MMM dd')
            const start_date = format(new Date(calenderRange1.startDate), 'yyyy-MM-dd')
            const end_date = format(new Date(calenderRange1.endDate), 'yyyy-MM-dd')
            setStateData((prevData: any) => ({ ...prevData, startDate: startDate, endDate: endDate }))
            setStateData((prevData: any) => ({ ...prevData, start_date: start_date, end_date: end_date }))
        }
    }, [calenderRange1])

    const handleClicked = (event: any) => {
        if ((document.getElementById("recent-job-search-div") || document.getElementById("fetched-custom-job-category-div")) && (!document.getElementById("text-field-div")?.contains(event.target) && !document.getElementById("recent-job-search-div")?.contains(event.target))) {
            setInputFocus1(false)
        }

        if ((document.getElementById("current-location-search-div") || document.getElementById("autocomplete-dropdown-container")) && !document.getElementById("location-text-field-div")?.contains(event.target)) {
            setInputFocus2(false)
        }

        if (document.getElementById("custom-date-range-div") && (!document.getElementById("date-range-div")?.contains(event.target) && !document.getElementById("custom-date-range-div")?.contains(event.target))) {
            setInputFocus3(false)
        }
    }

    const handleCalenderRange = (item: any) => {
        // if (!isEqual(item.selection1?.startDate, item.selection1?.endDate) && isBefore(item.selection1?.startDate, item.selection1?.endDate)) {
        //     var hours = differenceInHours(new Date(item.selection1?.endDate), new Date(item.selection1?.startDate));
        //     if (hours >= 25) {
        //         setCalenderRange2((prevData: any) => ({ ...prevData, startDate: addDays(item.selection1?.startDate, 1), endDate: subDays(item.selection1?.endDate, 1) }))
        //     }
        // } else {
        //     setCalenderRange2((prevData: any) => ({ ...prevData, startDate: null, endDate: null }))
        // }
        setCalenderRange1(item.selection1)
    };

    console.log(calenderRange1, "calemderRange", stateData, "stateData")

    const checkInputValidation = (e: any) => {
        const alphaRegex = new RegExp(regex.alphaSpecial)
        return alphaRegex.test(e.target.value)
    }

    const handleJobChange = (e: any) => {
        if (checkInputValidation(e)) {
            e.target.value.length >= 1 && props.getSearchJobList(e.target.value)
            setStateData((prevData: any) => ({ ...prevData, searchedJob: e.target.value }))
        }
    }

    const cleanInputData = (item: string) => {
        if (item === "calender") {
            setStateData((prevData: any) => ({ ...prevData, start_date: '', end_date: '', startDate: '', endDate: '' }))
            return;
        }
        setStateData((prevData: any) => ({ ...prevData, [item]: '' }))
        console.log("clean handler")
    }

    const searchedJobClicked = (item: any) => {
        console.log(item, "item recent")
        setStateData((prevData: any) => ({ ...prevData, searchedJob: item.name, tradeId: item._id, specializationId: item.specializationsId, isSearchedJobSelected: true }));
        setInputFocus1(false);
    }

    const recentJobSearches = () => {
        return (
            <div className="custom_autosuggestion" id="recent-job-search-div">
                <span className="sub_title">Recent searches</span>
                <div className="flex_row recent_search">
                    <div className="flex_col_sm_4" onClick={() => searchedJobClicked({ name: 'Campervans', _id: 'dhc78hi237hiu', specializationId: 'jey89ehe997yyh' })}>
                        <div className="autosuggestion_icon card history">
                            <span>Campervans</span>
                            <span className="name">Vehicles</span>
                        </div>
                    </div>

                    <div className="flex_col_sm_4">
                        <div className="autosuggestion_icon card history">
                            <span>sparknotes1</span>
                            <span className="name">sparknotes</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const renderJobResult = () => {
        console.log(props.searchJobListData, "props.searchJobListData")
        return (
            props.searchJobListData?.length ? <div className="custom_autosuggestion" id="fetched-custom-job-category-div">
                <div className="flex_col recent_search">
                    {props.searchJobListData?.map((item: any) => {
                        return (
                            <div className="flex_col_sm_4" onClick={() => searchedJobClicked(item)}>
                                <div className="autosuggestion_icon card history">
                                    <span>{item.name}</span>
                                    <span className="name">{item.trade_name}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div> : <div className="custom_autosuggestion">
                <span>No Result Found!</span>
            </div>
        )
    }

    console.log("bannerSearch ==> ", stateData, inputFocus1, inputFocus2, inputFocus3)
    console.log("locationSelectHandler", selectedMapLocation)

    const locationSelectedHandler = (address: string) => {
        console.log("locationSelectedHandler", address, typeof address)
        setSelectedMapLocation(address);
        setInputFocus2(false);
        document.getElementById("location-input-tag")?.blur();
        geocodeByAddress(address)
            .then((results: any) => getLatLng(results[0]))
            .then((latLng: any) => console.log('Success', latLng))
            .catch((error: any) => console.error('Error', error));
    }

    const getCurrentLocation = (e: any) => {
        e.preventDefault();
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
        });
    }

    const onError = (status: string, clearSuggestions: Function) => {
        console.log('Google Maps API returned error with status: ', status)
        clearSuggestions();
    }

    const validateForm = () => {
        const newErrors: any = {};
        if (stateData.isSearchedJobSelected) {
            return true;
        } else if (!stateData.searchedJob) {
            newErrors.searchedJob = Constants.errorStrings.bannerSearchJobEmpty;
        } else {
            const searchJobRegex = new RegExp(regex.alphaSpecial);
            if (!searchJobRegex.test(stateData.searchedJob.trim())) {
                newErrors.searchedJob = Constants.errorStrings.bannerSearchJob;
            }
        }
        setErrors(newErrors);
        return !Object.keys(newErrors).length;
    }

    return (
        <div className="home_banner">
            <figure className="banner_img">
                <img src={bannerimg} alt="bannerimg" />
                <div className="banner_container">
                    <div className="home_search">
                        <button className="modal_srch_close">
                            <img src="assets/images/close 1.png" alt="close" />
                        </button>
                        <form className="search_wrapr">
                            <ul>
                                <li className="categ_box">
                                    <div className="text_field" id="text-field-div">
                                        <input type="text" placeholder="What jobs are you after?" value={stateData.searchedJob} onChange={handleJobChange} onFocus={() => setInputFocus1(true)} onBlur={validateForm} />
                                        <div className="border_eff"></div>
                                        <span className="detect_icon_ltr">
                                            <img src={Searchicon} alt="search" />
                                        </span>
                                        {stateData.searchedJob && inputFocus1 &&
                                            <span className="detect_icon" >
                                                <img src={cross} alt="cross" onClick={() => cleanInputData('searchedJob')} />
                                            </span>}
                                    </div>
                                    {!!errors.searchedJob && <span className="error_msg">{errors.searchedJob}</span>}
                                </li>
                                {!stateData.searchedJob && inputFocus1 && recentJobSearches()}
                                {stateData.searchedJob.length >= 1 && inputFocus1 && renderJobResult()}
                                <li className="loc_box">
                                    <div className="text_field" id="location-text-field-div">
                                        {/* <input type="text" placeholder="Where?" className="line-1" onFocus={() => setInputFocus2(true)} /> */}
                                        <PlacesAutocomplete
                                            value={selectedMapLocation}
                                            onChange={(city: any) => setSelectedMapLocation(city)}
                                            onSelect={locationSelectedHandler}
                                            highlightFirstSuggestion={true}
                                            // searchOptions={{ types: ['(cities)'] }}
                                            onError={onError}
                                            debounce={400}
                                        >
                                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }: any) => (
                                                <div>
                                                    <input
                                                        {...getInputProps({
                                                            placeholder: 'Where?',
                                                            className: 'line-1',
                                                        })}
                                                        onFocus={() => setInputFocus2(true)}
                                                        id="location-input-tag"
                                                    />
                                                    <span className="detect_icon_ltr">
                                                        <img src={Location} alt="location" />
                                                    </span>
                                                    {selectedMapLocation && inputFocus2 && <span className="detect_icon" >
                                                        <img src={cross} alt="cross" onClick={() => setSelectedMapLocation('')} />
                                                    </span>}
                                                    {/* <div className="autocomplete-dropdown-container" id="autocomplete-dropdown-container"> */}
                                                    <div className="flex_row recent_search auto_loc" id="autocomplete-dropdown-container">
                                                        {loading && <div>Loading...</div>}
                                                        {suggestions.map((suggestion: any) => {
                                                            // const className = suggestion.active
                                                            //     ? 'suggestion-item--active'
                                                            //     : 'autosuggestion_icon card loc';
                                                            const className = 'autosuggestion_icon card loc';
                                                            // inline style
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
                                    </div>
                                </li>
                                {!selectedMapLocation && inputFocus2 &&
                                    <div className="custom_autosuggestion location" id="current-location-search-div">
                                        <a className="location-btn" onClick={getCurrentLocation}>
                                            <span className="gps_icon">
                                                <img src={icgps} />
                                            </span> Use my current location
                                        </a>
                                        {/* <span className="blocked_note">
                                            You have blocked your location.
                                            To use this, change your location settings in browser.
                                        </span> */}
                                    </div>
                                }
                                <li>
                                    <div className="custom_date_range" id="date-range-div">
                                        <div className="text_field">
                                            <span className="detect_icon_ltr calendar"></span>
                                            <input type="text" placeholder={stateData.startDate ? `${stateData.startDate} - ${stateData.endDate}` : "When?"} onFocus={() => setInputFocus3(true)} />
                                            {stateData.startDate && inputFocus3 &&
                                                <span className="detect_icon" >
                                                    <img src={cross} alt="cross" onClick={() => cleanInputData('calender')} />
                                                </span>}
                                            {inputFocus3 &&
                                                <div id="custom-date-range-div">
                                                    <DateRange
                                                        // onChange={(item: any) => setCalenderRange1({ ...calenderRange1, ...item})}
                                                        // ranges={[calenderRange1]}
                                                        // initialFocusedRange={[0,2]}
                                                        // color="red"
                                                        onChange={handleCalenderRange}
                                                        // ranges={calenderRange2.endDate ? [calenderRange1, calenderRange2] : [calenderRange1]}
                                                        ranges={[calenderRange1]}
                                                        moveRangeOnFirstSelection={false}
                                                        rangeColors={["#ffcd42", "#b5b5b5"]}
                                                        showDateDisplay={false}
                                                        showSelectionPreview={true}
                                                        months={2}
                                                        showPreview={true}
                                                        minDate={new Date()}
                                                        direction="horizontal"
                                                        fixedHeight={true}
                                                    />
                                                </div>}
                                        </div>
                                    </div>
                                </li>
                                <div className="search_btn">
                                    <button type="button" className="fill_btn">
                                        <img src={search} alt="search" />
                                    </button>
                                </div>
                            </ul>
                        </form>
                    </div>
                    <div className="text-center">
                        <h1 className="heading text_effect">See all around me</h1>
                        <p className="commn_para">Get the job in your area</p>
                        <a className="fill_btn view-btn">View More</a>
                    </div>
                </div>
            </figure>
        </div >
    )
}

export default BannerSearch
