import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Searchicon from "../../../../assets/images/main-search.png";
import search from "../../../../assets/images/ic-search.png";
import cross from "../../../../assets/images/close-black.png";
import bannerimg from "../../../../assets/images/home-banner.png";
import close from "../../../../assets/images/icon-close-1.png";
import Location from "../../../../assets/images/ic-location.png";
import uc from "../../../../assets/images/uc.png";
import icgps from "../../../../assets/images/ic-gps.png";
import BannerSearch from "../../../shared/bannerSearch";
import BannerSearchProps from "../../../shared/bannerSearchProps";
import moment from "moment";
// import BannerSearch from '../../tradieHome/components/bannerSearch/index';

const Banner = (props: any) => {
  const [positions, setPositions] = useState<any>([]);
  const location: any = useLocation();
  const [stateData, setStateData] = useState(location.state);
  const [isToggle, setToggleSearch] = useState(false);
  const [localInfo, setLocalInfo] = useState({}); // localInfo
  const [loading, setLoading] = useState(false);
  const [localData, setLocalData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { homeSearchJobData } = props; // props here.
  console.log(location, "location");
  useEffect(() => {
    props.getRecentSearchList();

    let data: any = {
      page: 1,
      isFiltered: false,
    };

    if (stateData?.tradeId) {
      data["tradeId"] = stateData?.tradeId;
    }

    if (stateData?.specializations) {
      data["specializationId"] = stateData?.specializations;
    }
    // tradeId: stateData?.tradeId,
    // specializationId: stateData?.specializations,
    if (stateData?.location) {
      data["location"] = stateData?.location;
    }

    if (props?.location?.state?.suggestionSelected) {
      data["address"] = JSON.stringify(
        props?.location?.state?.suggestionSelected
      );
    }

    if (stateData?.calender?.startDate) {
      data["from_date"] = moment(stateData?.calender?.startDate).format(
        "YYYY-MM-DD"
      );
    }
    if (stateData?.calender?.endDate) {
      data["to_date"] = moment(stateData?.calender?.endDate).format(
        "YYYY-MM-DD"
      );
    }
    let spec_count: any = stateData?.specializations?.length;

    if (!data?.address || !data?.address?.length) {
      delete data?.address;
    }

    setLocalInfo({
      name: stateData?.name,
      count: spec_count === 1 ? 0 : spec_count,
      tradeId: data.tradeId,
      specializationId: data.specializationId,
      location: data.location,
      doingLocalChanges: false,
      suggestionSelected: stateData?.suggestionSelected,
    });

    if (data?.address) {
      return;
    }

    // if (!stateData?.suggestionSelected || (data?.location?.coordinates && Array.isArray(data?.location?.coordinates) && data?.location?.coordinates?.length)) {
    props.postHomeSearchData(data);
    // }
  }, []);

  const getTitleInfo = (info: any) => {
    setLocalInfo(info);
  };

  /*
    useEffect(() => {
        let home: any = props.homeSearchJobData?.length ? true : false;
        if (home) {
            setLocalData(props.homeSearchJobData)
        } else {
            setLocalData([])
        }
    }, [props])
    */

  const checkIfExist = (data: any) => {
    if (data && Array.isArray(data) && data?.length) {
      let element_id = data[0].tradieId;
      let response = localData.find(
        (item: any) => item.tradieId === element_id
      );
      if (response) {
        return true;
      }
      return false;
    }
    return false;
  };

  useEffect(() => {
    let newProps = homeSearchJobData;
    let propsPage = 1;
    let propsTradeId = "";
    let localTradeId = "";
    let local_info: any = localInfo;
    let local_info_tradeId = "";
    if (
      local_info?.tradeId &&
      Array.isArray(local_info?.tradeId) &&
      local_info?.tradeId?.length
    ) {
      local_info_tradeId = local_info?.tradeId[0];
    }

    if (!hasMore) {
      setHasMore((prev: any) => !prev);
    }

    if (
      homeSearchJobData &&
      Array.isArray(homeSearchJobData) &&
      homeSearchJobData?.length
    ) {
      propsTradeId = homeSearchJobData[0]?.tradeData[0]?.tradeId;
      propsPage = homeSearchJobData[0]?.page;
    }

    if (localData && Array.isArray(localData) && localData?.length) {
      localTradeId = localData[0]?.tradeData[0]?.tradeId;
    }

    let cp = currentPage * 10;

    if (!local_info_tradeId?.length && localTradeId?.length) {
      getTitleInfo({
        name: "",
        count: 0,
        tradeId: [],
        specializationId: [],
        location: null,
        doingLocalChanges: false,
        suggestionSelected: "",
      });
    }

    if (propsPage) {
      if (local_info_tradeId?.length && localTradeId?.length) {
        if (!propsTradeId?.length && local_info_tradeId === localTradeId) {
          return;
        }
      }

      if (propsPage === 1 && currentPage === 1) {
        setLocalData(newProps);
        setCurrentPage(propsPage);
      } else if (
        propsPage > 1 &&
        currentPage > 1 &&
        currentPage === propsPage
      ) {
        if (!checkIfExist(newProps)) {
          setLocalData((prev: any) => [...prev, ...newProps]);
        }
      } else if (propsPage === 1 && currentPage > 1) {
        setLocalData(newProps);
        setCurrentPage(propsPage);
      } else {
        if (
          !local_info_tradeId?.length &&
          localTradeId?.length &&
          propsTradeId?.length
        ) {
          if (localTradeId === propsTradeId) {
            setLocalData(newProps);
            setCurrentPage(propsPage);
          }
        }
      }
    }
  }, [homeSearchJobData]);

  const handleChangeToggle = (value: any) => {
    setToggleSearch(value);
  };

  // let homeSearchJobData: any = props.homeSearchJobData;
  let local_info: any = localInfo;
  let isLoading: any = props.isLoading;
  const preFetch = (isTrue?: boolean) => {
    let position: any = props.position;
    let positions_: any = [];
    if (position?.long && !positions?.length) {
      let long: any = parseFloat(position?.long);
      let lat: any = parseFloat(position?.lat);
      positions_ = [long, lat];
      setPositions(positions_);
    }
    if (isTrue && positions_?.length) {
      redirectToUrl(positions_);
    }
  };
  console.log(location, "location");
  const redirectToUrl = (position: any) => {
    props.history.push({
      pathname: `search-tradie-results`,
      state: {
        name: null,
        tradeId: null,
        specializations: null,
        location: Object.keys(position).length
          ? { coordinates: position }
          : null,
        calender: null,
        address: null,
      },
    });
  };

  useEffect(() => {
    preFetch();
  }, []);

  const viewMoreClicked = () => {
    if (positions?.length) {
      redirectToUrl(positions);
    } else {
      preFetch(true);
    }
  };

  return (
    <div className="home_banner">
      <figure className="banner_img_img">
        <img src={bannerimg} alt="bannerimg" />
        <div className="banner_container">
          <BannerSearchProps
            {...props}
            getTitleInfo={getTitleInfo}
            localInfo={localInfo}
            handleChangeToggle={handleChangeToggle}
          />
          <div className="text-center">
            <h1 className="heading text_shine">Your local network</h1>
            <p className="commn_para">Connect with Tradies in your area</p>
            {/* <a className="fill_btn view-btn">View More</a> */}
            <button className="fill_btn view-btn" onClick={viewMoreClicked}>
              View More
            </button>
          </div>
        </div>
      </figure>
    </div>
  );
};

export default Banner;
