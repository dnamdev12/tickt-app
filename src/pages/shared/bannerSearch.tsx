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
import { getSearchJobList, getRecentSearchList, postHomeSearchData } from '../../redux/homeSearch/actions';
import { useDetectClickOutside } from 'react-detect-click-outside';
import moment from 'moment';
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyDKFFrKp0D_5gBsA_oztQUhrrgpKnUpyPo");
Geocode.setLanguage("en");

interface PropsType {
    history: any,
    location?: any,
    bannerData: any,
    current_address: any,
    searchJobListData: Array<object>,
    recentSearchJobData: Array<object>,
    homeSearchJobData: Array<object>,
    setBannerData: (data: any) => void,
    getSearchJobList: (data: any) => void,
    postHomeSearchData: (data: any) => void,
}

const example_calender = { startDate: '', endDate: '', key: 'selection1' };

const BannerSearch = (props: PropsType) => {
    let propsItem: any = props;
    let props_selected = propsItem.selectedItem;

    const [stateData, setStateData] = useState<any>(props.bannerData)
    const [searchText, setSearchText] = useState(props_selected?.searchText || '');
    const [addressText, setAddressText] = useState<any>(props_selected?.addressText || null);
    const [selectedAddress, setSelectedAddress] = useState(props_selected?.selectedAddress || {});
    const [enableCurrentLocation, setCurrentLocations] = useState<boolean>(false);
    const [errors, setErrors] = useState<any>({});
    const [selectedTrade, setSelectedTrade] = useState(props_selected?.selectedTrade || {});

    const [inputFocus1, setInputFocus1] = useState<boolean>(false);
    const [inputFocus2, setInputFocus2] = useState<boolean>(false);
    const [inputFocus3, setInputFocus3] = useState<boolean>(false);

    const [calenderRange1, setCalenderRange1] = useState<any>(props_selected?.calenderRange1 || example_calender);

    const handleOnOutsideSearch = () => setInputFocus1(false);
    const handleOnOutsideLocation = () => setInputFocus2(false);
    const handleOnOutsideCalender = () => setInputFocus3(false);

    const searchRef = useDetectClickOutside({ onTriggered: handleOnOutsideSearch });
    const locationRef = useDetectClickOutside({ onTriggered: handleOnOutsideLocation });
    const calenderRef = useDetectClickOutside({ onTriggered: handleOnOutsideCalender });

    useEffect(() => {
        if (props.bannerData !== stateData) {
            setStateData(props.bannerData);
        }
    }, [props.bannerData]);

    const handleCalenderRange = (item: any) => {
        setCalenderRange1(item.selection1)
    };

    const checkIfExist = (_id: any) => {
        let isLength = Object.keys(selectedTrade).length;
        if (isLength) {
            let item: any = selectedTrade;
            if (item?._id === _id) {
                return true;
            }
        }
        return false;
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
                                {props.recentSearchJobData?.length > 0 && props.recentSearchJobData?.slice(0, 2).map((item: any) => {
                                    return (
                                        <div
                                            className="flex_col_sm_4"
                                            onClick={() => {
                                                setItemSearch(item);
                                                setSelectedTrade({});
                                            }}>
                                            <div className="autosuggestion_icon card history">
                                                <span>{item.name}</span>
                                                <span className="name">{item.trade_name}</span>
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
        // const newErrors: any = {};
        // if (!stateData?.isSearchedJobSelected) {
        //     newErrors.searchedJob = Constants.errorStrings.bannerSearchJob;
        // } else if (!stateData?.searchedJob) {
        //     newErrors.searchedJob = Constants.errorStrings.bannerSearchJobEmpty;
        // } else {
        //     const searchJobRegex = new RegExp(regex.alphaSpecial);
        //     if (!searchJobRegex.test(stateData.searchedJob.trim())) {
        //         newErrors.searchedJob = Constants.errorStrings.bannerSearchJob;
        //     }
        // }

        // if (!stateData?.isMapLocationSelected && stateData?.selectedMapLocation) {
        //     newErrors.selectedMapLocation = Constants.errorStrings.bannerSearchLocation;
        // }
        // setErrors(newErrors);
        // return !Object.keys(newErrors).length;
    }

    const setItemSearch = (item: any) => {
        setStateData(item);
        setSelectedTrade({});
        setSearchText(item?.name || '');
    }

    const bannerSearchClicked = () => {
        let selected_address: any = selectedAddress;
        let selected_trade: any = selectedTrade;

        if (validateForm()) {
            // console.log({ stateData, selectedTrade })
            let data: any = {
                page: 1,
                isFiltered: false,
                tradeId: [stateData?._id],
                specializationId: [stateData?.specializationsId],
            }

            if (Object.keys(selectedAddress).length) {
                data['location'] = {
                    "coordinates": [
                        selected_address?.lng,
                        selected_address?.lat
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

            if (Object.keys(selectedTrade).length) {
                data['tradeId'] = [selected_trade._id];
                if (selected_trade?.specialisations?.map) {
                    data['specializationId'] = selected_trade.specialisations.map((item: any) => item._id);
                    console.log({ selectedTrade });
                }
            }
            console.log({ data })
            props.postHomeSearchData(data)
            props.history.push({
                pathname: `search-tradie-results`,
                state: {
                    data,
                    searchText,
                    selectedAddress,
                    addressText,
                    selectedTrade,
                    calenderRange1,
                    exta: (selected_trade.specialisations?.length - 1)
                }
            })
        }
    }

    let selected_trade: any = selectedTrade;
    let length_spec = selected_trade?.specialisations?.length;
    return (
        <div className="home_search">
            <button className="modal_srch_close">
                <img src={close} alt="close" />
            </button>
            <form className="search_wrapr">
                <ul>
                    <li className="categ_box">
                        <div className="text_field" id="text-field-div">
                            <input
                                type="text"
                                ref={searchRef}
                                placeholder="What jobs are you after?"
                                value={length_spec > 1 ? `${searchText} +${length_spec - 1}` : searchText}
                                onChange={(e) => {
                                    console.log('callable-Here!')
                                    setSearchText(e.target.value);
                                    props.getSearchJobList(e.target.value)
                                }}
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
                                            setItemSearch({});
                                        }} />
                                </span>
                            ) : null}
                        </div>
                        {!!errors.searchedJob && <span className="error_msg">{errors.searchedJob}</span>}
                    </li>
                    {!searchText?.length && inputFocus1 ? recentJobSearches() : null}
                    {searchText?.length && inputFocus1 ? renderJobResult() : null}

                    {/* {'location search start here!'} */}
                    <li className="loc_box">
                        <div id="location-text-field-div">

                            <div
                                style={{ display: !enableCurrentLocation ? 'none' : '' }}
                                className="text_field">
                                <input
                                    type="text"
                                    placeholder="Where?"
                                    className="line-1"
                                    id="location-input-tag"
                                    onChange={(e) => {
                                        setCurrentLocations(false);
                                        setAddressText(e.target.value);
                                    }}
                                    onFocus={() => {
                                        setCurrentLocations(false);
                                        setInputFocus2(true);
                                    }}
                                    value={addressText} />
                                <span className="detect_icon_ltr">
                                    <img src={Location} alt="location" />
                                </span>
                            </div>

                            <div style={{ display: enableCurrentLocation ? 'none' : '' }}>
                                <PlacesAutocomplete
                                    value={addressText}
                                    onChange={(item: any) => {
                                        setAddressText(item)
                                        if (!item.length) {
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
                                            console.log({ lat, lng })
                                            setSelectedAddress({ lat, lng });
                                            setInputFocus2(false);
                                        }
                                    }}
                                    highlightFirstSuggestion={true}
                                    onError={onError}
                                    debounce={400}
                                >
                                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }: any) => (
                                        <div>
                                            {console.log({ getInputProps, suggestions, getSuggestionItemProps, loading })}
                                            <div className="text_field">
                                                <input
                                                    {...getInputProps({ placeholder: 'Where?', className: 'line-1' })}
                                                    id="location-input-tag"
                                                    ref={locationRef}
                                                    onFocus={() => setInputFocus2(true)}
                                                />
                                                <span className="detect_icon_ltr">
                                                    <img src={Location} alt="location" />
                                                </span>
                                                {stateData?.selectedMapLocation && inputFocus2 && <span className="detect_icon" >
                                                    <img src={cross} alt="cross" onClick={() => setStateData((prevData: any) => ({ ...prevData, selectedMapLocation: '' }))} />
                                                </span>}
                                            </div>
                                            {suggestions?.length && inputFocus2 ?
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
                                                </div> : null}
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
                                onClick={() => {
                                    setAddressText(props.current_address);
                                    setCurrentLocations(true);
                                    setInputFocus2(false);
                                }}>
                                {/* // onClick={getCurrentLocation}> */}
                                <span className="gps_icon">
                                    <img src={icgps} alt="" />
                                </span> Use my current location
                            </span>
                            {stateData?.locationDenied && <span className="blocked_note">
                                You have blocked your location.
                                To use this, change your location settings in browser.
                              </span>}
                        </div>
                        : null}
                    <li>
                        <div
                            ref={calenderRef}
                            className="custom_date_range" id="date-range-div">
                            <div className="text_field">
                                <span className="detect_icon_ltr calendar"></span>
                                <input
                                    type="text"
                                    placeholder={calenderRange1?.startDate && !calenderRange1.endDate ?
                                        `${moment(calenderRange1?.startDate).format('MMM-DD')}` :
                                        calenderRange1?.startDate && calenderRange1.endDate ?
                                            `${moment(calenderRange1?.startDate).format('DD MMM')}-${moment(calenderRange1?.endDate).format('DD MMM')}`
                                            : "When?"}
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
                                        direction="horizontal"
                                        fixedHeight={true}
                                    />
                                </div>
                            ) : null}
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

const mapStateToProps = (state: any) => {
    return {
        searchJobListData: state.homeSearch.searchJobListData,
        recentSearchJobData: state.homeSearch.recentSearchJobData,
        homeSearchJobData: state.homeSearch.homeSearchJobData,
        tradeListData: state.auth.tradeListData,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        getSearchJobList,
        getRecentSearchList,
        postHomeSearchData
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BannerSearch);