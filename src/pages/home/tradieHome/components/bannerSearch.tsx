import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import regex from '../../../../utils/regex';

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
        location: '',
    });
    const [inputFocus1, setInputFocus1] = useState<boolean>(false)
    const [inputFocus2, setInputFocus2] = useState<boolean>(false)
    const [inputFocus3, setInputFocus3] = useState<boolean>(false)

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

    const handleClicked = (event: any) => {
        if (document.getElementById("recent-job-search-div") && (!document.getElementById("text-field-div")?.contains(event.target) && !document.getElementById("recent-job-search-div")?.contains(event.target))) {
            console.log("handleClicked1")
            setInputFocus1(false)
        }
        if (document.getElementById("custom-location-search-div") && (!document.getElementById("location-text-field-div")?.contains(event.target) && !document.getElementById("custom-location-search-div")?.contains(event.target))) {
            console.log("handleClicked2")
            setInputFocus2(false)
        }
    }

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
        setStateData((prevData: any) => ({ ...prevData, [item]: '', tradeId: '' }))
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

    console.log("bannerSearch ==> ", stateData, inputFocus1)

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
                                            <input type="text" placeholder="Where?" className="line-1" value={stateData.location} onChange={handleJobChange} onFocus={() => setInputFocus2(true)} />
                                            <span className="detect_icon_ltr">
                                                <img src={Location} alt="location" />
                                            </span>
                                            {stateData.location && inputFocus2 && <span className="detect_icon" >
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
                                        <span className="sub_title ">Recent searches</span>
                                        {/* <span className="blocked_note">
                                            You have blocked your location.
                                            To use this, change your location settings in browser.
                                        </span> */}
                                        <div className="flex_row recent_search auto_loc">
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
                                        </div>
                                    </div>
                                }
                                <li>
                                    <div className="custom_date_range">
                                        <div className="text_field">
                                            <span className="detect_icon_ltr calendar"></span>
                                            <input type="text" placeholder="When?" />
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
