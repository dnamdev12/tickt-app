import React, { useEffect, useState } from 'react'
import Searchicon from "../../../../assets/images/main-search.png";
import search from "../../../../assets/images/ic-search.png";
import cross from "../../../../assets/images/close-black.png";
import bannerimg from '../../../../assets/images/home-banner.png'
import close from "../../../../assets/images/icon-close-1.png";
import Location from "../../../../assets/images/ic-location.png";
import uc from '../../../../assets/images/uc.png';
import icgps from "../../../../assets/images/ic-gps.png";
import BannerSearch from '../../../shared/bannerSearch';
// import BannerSearch from '../../tradieHome/components/bannerSearch/index';


const Banner = (props: any) => {
    const [positions, setPositions] = useState<any>([]);

    const preFetch = (isTrue?:boolean) => {
        let position: any = props.position;
        let positions_:any = [];
        if (position?.long && !positions?.length) {
            let long: any = parseFloat(position?.long);
            let lat: any = parseFloat(position?.lat);
            positions_ = [long, lat];
            setPositions(positions_);
        }
        if(isTrue && positions_?.length){
            redirectToUrl(positions_);
        }
    }

    const redirectToUrl = (position:any) => {
        props.history.push({
            pathname: `search-tradie-results`,
            state: {
                name: null,
                tradeId: null,
                specializations: null,
                location: Object.keys(position).length ? { "coordinates": position} : null,
                calender: null,
                address: null
            }
        })
    }

    useEffect(() => {
        preFetch();
    }, [])

    const viewMoreClicked = () => {
        if (positions?.length) {
            redirectToUrl(positions)
        } else {
            preFetch(true);
        }
    }

    return (
        <div className="home_banner">
            <figure className="banner_img">
                <img src={bannerimg} alt="bannerimg" />
                <div className="banner_container">
                    <BannerSearch {...props} />
                    <div className="text-center">
                        <h1 className="heading">Your local network</h1>
                        <p className="commn_para">Connect with tradespeople in your area</p>
                        {/* <a className="fill_btn view-btn">View More</a> */}
                        <button className="fill_btn view-btn" onClick={viewMoreClicked}>View More</button>
                    </div>
                </div>
            </figure>
        </div>
    )
}

export default Banner;
