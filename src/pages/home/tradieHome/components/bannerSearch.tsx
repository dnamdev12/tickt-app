import React, { useState, useEffect } from 'react';
import { addDays, subDays, isEqual, isBefore, differenceInHours, lightFormat, format } from 'date-fns';
import Carousel from 'react-multi-carousel';
import regex from '../../../../utils/regex';
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
        tradeId: '',
        specializationId: '',
        searchedJobId: null,
        location: {
            coordinates: [
            ]
        },
        locationName: '',
        from_date: '',
        to_date: '', //2021-05-02
    });
    const [inputFocus1, setInputFocus1] = useState<boolean>(false)
    const [inputFocus2, setInputFocus2] = useState<boolean>(false)
    const [inputFocus3, setInputFocus3] = useState<boolean>(false)

    // const [calenderRange1, setCalenderRange1] = useState({selection1: { startDate: new Date(), endDate: new Date(), key: 'selection1'}, selection2: { startDate: addDays(new Date(),1), endDate: subDays(new Date(), 1), key: 'selection2'}});
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
            setStateData((prevData: any) => ({ ...prevData, from_date: startDate, end_date: endDate }))
        }
    }, [calenderRange1])

    const handleClicked = (event: any) => {
        if (document.getElementById("recent-job-search-div") && (!document.getElementById("text-field-div")?.contains(event.target) && !document.getElementById("recent-job-search-div")?.contains(event.target))) {
            console.log("handleClicked1")
            setInputFocus1(false)
        }
        if (document.getElementById("custom-location-search-div") && (!document.getElementById("location-text-field-div")?.contains(event.target) && !document.getElementById("custom-location-search-div")?.contains(event.target))) {
            console.log("handleClicked2")
            setInputFocus2(false)
        }

        if (document.getElementById("custom-date-range-div") && (!document.getElementById("date-range-div")?.contains(event.target) && !document.getElementById("custom-date-range-div")?.contains(event.target))) {
            console.log("handleClicked3")
            setInputFocus3(false)
        }
    }

    const handleCalenderRange = (item: any) => {
        if (!isEqual(item.selection1?.startDate, item.selection1?.endDate) && isBefore(item.selection1?.startDate, item.selection1?.endDate)) {
            var hours = differenceInHours(new Date(item.selection1?.endDate), new Date(item.selection1?.startDate));
            if (hours >= 25) {
                setCalenderRange2((prevData: any) => ({ ...prevData, startDate: addDays(item.selection1?.startDate, 1), endDate: subDays(item.selection1?.endDate, 1) }))
            }
        } else {
            setCalenderRange2((prevData: any) => ({ ...prevData, startDate: null, endDate: null }))
        }
        setCalenderRange1(item.selection1)
    };

    console.log(calenderRange1, "calemderRange", calenderRange2)

    const checkInputValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
        const alphaRegex = new RegExp(regex.alphaSpecial)
        return alphaRegex.test(e.target.value)
    }

    const handleJobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (checkInputValidation(e)) {
            e.target.value.length > 0 && props.getSearchJobList(e.target.value)
            setStateData((prevData: any) => ({ ...prevData, searchedJob: e.target.value }))
        }
    }

    const cleanInputData = (item: string) => {
        setStateData((prevData: any) => ({ ...prevData, [item]: '' }))
        // setInputFocus1(false)
    }

    const searchedJobClicked = (item: any) => {
        console.log(item, "item recent")
        setStateData((prevData: any) => ({ ...prevData, searchedJob: item.name, tradeId: item._id, specializationId: item.specializationsId }));
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
            props.searchJobListData?.length ? <div className="custom_autosuggestion">
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
            </div> : <p>No Result Found!</p>
        )
    }

    console.log("bannerSearch ==> ", stateData, inputFocus1, inputFocus2, inputFocus3)

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
                                        <input type="text" placeholder="What jobs are you after?" value={stateData.searchedJob} onChange={handleJobChange} onFocus={() => setInputFocus1(true)} />
                                        <div className="border_eff"></div>
                                        <span className="detect_icon_ltr">
                                            <img src={Searchicon} alt="search" />
                                        </span>
                                        {stateData.searchedJob && inputFocus1 &&
                                            <span className="detect_icon" >
                                                <img src={cross} alt="cross" onClick={() => cleanInputData('searchedJob')} />
                                            </span>}
                                    </div>
                                </li>
                                {!stateData.searchedJob && inputFocus1 && recentJobSearches()}
                                {stateData.searchedJob && inputFocus1 && renderJobResult()}
                                <li className="loc_box">
                                    <div className="text_field" id="location-text-field-div">
                                        <div>
                                            <input type="text" placeholder="Where?" className="line-1" onFocus={() => setInputFocus2(true)} />
                                            <span className="detect_icon_ltr">
                                                <img src={Location} alt="location" />
                                            </span>
                                            {stateData.locationName && inputFocus2 && <span className="detect_icon" >
                                                <img src={cross} alt="cross" />
                                            </span>}
                                        </div>
                                    </div>
                                </li>
                                {inputFocus2 &&
                                    <div className="custom_autosuggestion location" id="custom-location-search-div">
                                        <button className="location-btn">
                                            <span className="gps_icon">
                                                <img src={icgps} />
                                            </span> Use my current location
                                        </button>
                                        {/* <span className="sub_title ">Recent searches</span> */}
                                        {/* <span className="blocked_note">
                                            You have blocked your location.
                                            To use this, change your location settings in browser.
                                        </span> */}
                                        {/* <div className="flex_row recent_search auto_loc">
                                            <div className="flex_col_sm_4">
                                                <div className="autosuggestion_icon card loc">
                                                    <span >Dummy location</span>
                                                    <span className="name">Noida, Uttar Pradesh, India</span></div></div>

                                            <div className="flex_col_sm_4">
                                                <div className="autosuggestion_icon card loc">
                                                    <span >Unnamed Road</span>
                                                    <span className="name"> Bichua, Madhya Pradesh 487001, India</span>
                                                </div>
                                            </div>
                                            <div className="flex_col_sm_4">
                                                <div className="autosuggestion_icon card loc">
                                                    <span >4 shantanu banlows rajpath club ni same</span>
                                                    <span className="name"> Narolgam, Ellisbridge, Ahmedabad, Gujarat 380006, India</span>
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                }
                                <li>
                                    <div className="custom_date_range" id="date-range-div">
                                        <div className="text_field">
                                            <span className="detect_icon_ltr calendar"></span>
                                            <input type="text" placeholder={stateData.from_date ? `${stateData.from_date} - ${stateData.end_date}` : "When?"} onFocus={() => setInputFocus3(true)} />
                                            {!stateData.from_date && inputFocus3 &&
                                                <span className="detect_icon" >
                                                    <img src={cross} alt="cross" onClick={() => cleanInputData('searchedJob')} />
                                                </span>}
                                            {inputFocus3 &&
                                                <div id="custom-date-range-div">
                                                    <DateRange
                                                        // onChange={(item: any) => setCalenderRange1({ ...calenderRange1, ...item})}
                                                        // ranges={[calenderRange1]}
                                                        // initialFocusedRange={[0,2]}
                                                        // color="red"
                                                        onChange={handleCalenderRange}
                                                        ranges={calenderRange2.endDate ? [calenderRange1, calenderRange2] : [calenderRange1]}
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
        </div>
    )
}

export default BannerSearch
