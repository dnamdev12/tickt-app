import BannerSearch from "../../../../common/tradieBannerSearch/index";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import bannerimg from "../../../../assets/images/tradie-banner.png";

interface PropsType {
  history: any;
  currentCoordinates: any;
  setTradieHomeData: (data: any) => void;
  getViewNearByJob: (data: any) => void;
}

const HomeBanner = (props: any) => {
  const [searchResultData, setSearchResultData] = useState({
    page: 1,
    searchByFilter: false,
    cleanFiltersData: false,
  });
  const [mapData, setMapData] = useState<any>({
    showMap: false,
  });
  const [paramsData, setParamsData] = useState<any>({});
  const [isToggleModifySearch, setToggleModifySearch] =
    useState<boolean>(false);
  const [jobListData, setJobListData] = useState<Array<any>>([]);
  const [apiRequestData, setApiRequestData] = useState<any>({});
  const [hasMoreItems, setHasMoreItems] = useState<boolean>(true);

  useEffect(() => {
    var queryParamsData = getQueryParamsData();
    let data: any = {};

    if (queryParamsData.jobResults === "viewNearByJob") {
      data = {
        page: 1,
        long: queryParamsData.defaultLong,
        lat: queryParamsData.defaultLat,
      };
      props.getViewNearByJob(data);
    } else {
      data = {
        page: 1,
        ...(queryParamsData.isFiltered
          ? { isFiltered: true }
          : { isFiltered: false }),
        ...(queryParamsData.tradeId?.length && {
          tradeId: queryParamsData.tradeId,
        }),
        ...(queryParamsData.jobTypes?.length && {
          jobTypes: queryParamsData.jobTypes,
        }),
        ...(queryParamsData.specializationId?.length && {
          specializationId: queryParamsData.specializationId,
        }),
        ...(queryParamsData.from_date && {
          from_date: queryParamsData.from_date,
        }),
        ...(queryParamsData.to_date && { to_date: queryParamsData.to_date }),
        ...(queryParamsData.min_budget >= 0 &&
          queryParamsData.max_budget > 0 && {
            pay_type: queryParamsData.pay_type,
          }),
        ...(queryParamsData.min_budget >= 0 &&
          queryParamsData.max_budget > 0 && {
            min_budget: queryParamsData.min_budget,
          }),
        ...(queryParamsData.min_budget >= 0 &&
          queryParamsData.max_budget > 0 && {
            max_budget: queryParamsData.max_budget,
          }),
        ...(queryParamsData.sortBy && { sortBy: queryParamsData.sortBy }),
        ...((queryParamsData.addres || queryParamsData.sortBy === 2) && {
          location: {
            coordinates: [
              queryParamsData.long
                ? queryParamsData.long
                : queryParamsData.defaultLong,
              queryParamsData.lat
                ? queryParamsData.lat
                : queryParamsData.defaultLat,
            ],
          },
        }),
        ...(queryParamsData.addres &&
          queryParamsData.address && { address: queryParamsData.address }),
      };
      props.postHomeSearchData(data);
    }
    setApiRequestData(data);
    return () => {
      props.resetViewNearByJobData();
      props.resetHomeSearchJobData();
    };
  }, []);

  const getQueryParamsData = () => {
    const params = new URLSearchParams(props.history?.location?.search);
    const specializationString = params.get("specializationId");
    const specializationArray = specializationString?.split(",");
    const tradeIdArray = params.get("tradeId") ? [params.get("tradeId")] : null;
    const jobTypesArray = params.get("jobTypes")
      ? [params.get("jobTypes")]
      : null;
    const queryParamsData: any = {
      page: Number(params.get("page")),
      isFiltered: params.get("isFiltered") === "true",
      isFilterOn: params.get("isFilterOn"),
      tradeId: tradeIdArray,
      specializationId: specializationArray,
      lat: Number(params.get("lat")),
      long: Number(params.get("long")),
      defaultLat: Number(params.get("defaultLat")),
      defaultLong: Number(params.get("defaultLong")),
      addres: params.get("addres"),
      address: params.get("address"),
      from_date: params.get("from_date"),
      to_date: params.get("to_date"),
      jobResults: params.get("jobResults"),
      heading: params.get("heading"),
      jobTypes: jobTypesArray,
      searchJob: params.get("searchJob")?.replaceAll("xxx", "&"),
      min_budget: Number(params.get("min_budget")),
      max_budget: Number(params.get("max_budget")),
      pay_type: params.get("pay_type"),
      sortBy: Number(params.get("sortBy")),
    };
    setParamsData(queryParamsData);
    return queryParamsData;
  };

  useEffect(() => {
    const jobResultsParam = new URLSearchParams(
      props.history?.location?.search
    ).get("jobResults");
    if (searchResultData.searchByFilter && props.homeSearchJobData?.length) {
      if (searchResultData.page === 1) {
        setJobListData(props.homeSearchJobData);
      } else {
        setJobListData((prevData: any) => [
          ...prevData,
          ...props.homeSearchJobData,
        ]);
      }
      setSearchResultData((prevData: any) => ({
        ...prevData,
        page: prevData.page + 1,
      }));
      if (props.homeSearchJobData?.length < 10) {
        setHasMoreItems(false);
      }
      return;
    }
    if (
      jobResultsParam === "viewNearByJob" &&
      props.viewNearByJobData?.length
    ) {
      if (searchResultData.page === 1) {
        setJobListData(props.viewNearByJobData);
      } else {
        setJobListData((prevData: any) => [
          ...prevData,
          ...props.viewNearByJobData,
        ]);
      }
      setSearchResultData((prevData: any) => ({
        ...prevData,
        page: prevData.page + 1,
      }));
      if (props.viewNearByJobData?.length < 10) {
        setHasMoreItems(false);
      }
      return;
    } else if (props.homeSearchJobData?.length) {
      if (searchResultData.page === 1) {
        setJobListData(props.homeSearchJobData);
      } else {
        setJobListData((prevData: any) => [
          ...prevData,
          ...props.homeSearchJobData,
        ]);
      }
      setSearchResultData((prevData: any) => ({
        ...prevData,
        page: prevData.page + 1,
      }));
      if (props.homeSearchJobData?.length < 10) {
        setHasMoreItems(false);
      }
    }
  }, [props.homeSearchJobData, props.viewNearByJobData]);

  const searchByFilter = (allFiltersData: any) => {
    const newParamsData = getQueryParamsData();
    if (allFiltersData === "callViewNearByJobApi") {
      const data = {
        page: 1,
        long: newParamsData.defaultLong,
        lat: newParamsData.defaultLat,
      };
      props.getViewNearByJob(data);
      props.history.replace(
        `/search-job-results?jobResults=viewNearByJob&defaultLat=${newParamsData.defaultLat}&defaultLong=${newParamsData.defaultLong}`
      );
      getQueryParamsData();
      setSearchResultData((prevData: any) => ({
        ...prevData,
        searchByFilter: false,
        page: 1,
      }));
      return;
    }
    var headingType: string = "";
    console.log(allFiltersData, "allFiltersData", newParamsData);

    if (newParamsData.tradeId?.length) {
      delete newParamsData.tradeId;
    }
    if (newParamsData.jobTypes?.length) {
      delete newParamsData.jobTypes;
    }
    if (newParamsData.specializationId?.length) {
      delete newParamsData.specializationId;
    }
    if (allFiltersData.jobTypes?.length && !allFiltersData.tradeId?.length) {
      headingType = props.jobTypeListData?.find(
        (i: any) => i._id === allFiltersData.jobTypes[0]
      )?.name;
      delete newParamsData.searchJob;
    }
    if (
      allFiltersData.tradeId?.length &&
      !allFiltersData.specializationId?.length
    ) {
      headingType = props.tradeListData?.find(
        (i: any) => i._id === allFiltersData?.tradeId[0]
      )?.trade_name;
      delete newParamsData.searchJob;
    }

    var data = {
      ...newParamsData,
      isFilterOn: "isFilterOn",
      jobResults: null,
      isFiltered: true,
      ...(allFiltersData.tradeId?.length && {
        tradeId: allFiltersData.tradeId,
      }),
      ...(allFiltersData.jobTypes?.length && {
        jobTypes: allFiltersData.jobTypes,
      }),
      ...(allFiltersData.jobTypes?.length &&
        !allFiltersData.tradeId?.length && { jobResults: "jobTypeList" }),
      ...(allFiltersData.jobTypes?.length &&
        !allFiltersData.tradeId?.length && { heading: headingType }),
      ...(allFiltersData.tradeId?.length &&
        !allFiltersData.specializationId?.length && {
          jobResults: "jobTypeList",
        }),
      ...(allFiltersData.tradeId?.length &&
        !allFiltersData.specializationId?.length && { heading: headingType }),
      ...(allFiltersData.specializationId?.length && {
        specializationId: allFiltersData.specializationId,
      }),
      ...(allFiltersData.min_budget >= 0 &&
        allFiltersData.max_budget > 0 && { pay_type: allFiltersData.pay_type }),
      ...(allFiltersData.min_budget >= 0 &&
        allFiltersData.max_budget > 0 && {
          min_budget: allFiltersData.min_budget,
        }),
      ...(allFiltersData.min_budget >= 0 &&
        allFiltersData.max_budget > 0 && {
          max_budget: allFiltersData.max_budget,
        }),
      ...([1, 2, 3].includes(allFiltersData.sortBy) && {
        sortBy: allFiltersData.sortBy,
      }),
    };

    if (allFiltersData.sortBy === 400) {
      delete data.sortBy;
    }
    if (data.searchJob) {
      delete data.heading;
      delete data.jobResults;
    }
    if (allFiltersData.max_budget === 0) {
      delete data.min_budget;
      delete data.max_budget;
      delete data.pay_type;
    }
    if (
      allFiltersData?.specializationId?.length &&
      allFiltersData?.tradeId?.length
    ) {
      const specializationList = props.tradeListData?.find(
        (i: any) => i._id === allFiltersData?.tradeId[0]
      )?.specialisations;
      const specializationName = specializationList?.find(
        (i: any) => i._id === allFiltersData?.specializationId[0]
      )?.name;
      if (specializationName) {
        data = {
          ...data,
          searchJob: specializationName,
        };
      }
    }

    const newObjData = {
      page: 1,
      isFiltered: true,
      ...(data.sortBy && { sortBy: data.sortBy }),
      ...(data.tradeId && { tradeId: data.tradeId }),
      ...(data.specializationId && { specializationId: data.specializationId }),
      ...(data.from_date && { from_date: data.from_date }),
      ...(data.to_date && { to_date: data.to_date }),
      ...(data.jobTypes && { jobTypes: data.jobTypes }),
      ...(data.min_budget >= 0 &&
        data.max_budget > 0 && { pay_type: data.pay_type }),
      ...(data.min_budget >= 0 &&
        data.max_budget > 0 && { min_budget: data.min_budget }),
      ...(data.min_budget >= 0 &&
        data.max_budget > 0 && { max_budget: data.max_budget }),
      ...((data.address || allFiltersData.sortBy === 2) && {
        location: {
          coordinates: [
            data.long ? data.long : data.defaultLong,
            data.lat ? data.lat : data.defaultLat,
          ],
        },
      }),
      // ...(data.addres && data.address && { address: data.address })
    };
    Object.keys(data).forEach(
      (key) =>
        (data[key] === undefined ||
          data[key] === null ||
          data[key] === 0 ||
          data[key] === "0") &&
        delete data[key]
    );
    var url = "search-job-results?";
    for (let [key, value] of Object.entries(data)) {
      console.log(key, value);
      url += `${key}=${value}&`;
    }
    const newUrl = url.slice(0, url.length - 1);
    props.postHomeSearchData(newObjData);
    props.history.replace(newUrl);
    setJobListData([]);
    setParamsData(data);
    setApiRequestData(newObjData);
    setSearchResultData((prevData: any) => ({
      ...prevData,
      page: 1,
      searchByFilter: true,
    }));
    setHasMoreItems(true);
  };

  // const cleanFiltersHandler = (isFiltersClean: boolean) => {
  //     setSearchResultData((prevData: any) => ({ ...prevData, cleanFiltersData: isFiltersClean }));
  //     if (isFiltersClean) { getQueryParamsData(); }
  // }

  const refreshParams = (data: any) => {
    setJobListData([]);
    getQueryParamsData();
    setApiRequestData(data);
    setSearchResultData((prevData: any) => ({
      ...prevData,
      page: 1,
      cleanFiltersData: true,
    }));
    setHasMoreItems(true);
  };

  const handleChangeToggle = (value: boolean) => {
    setToggleModifySearch(value);
  };
  const viewMoreClicked = () => {
    // props.history.push({
    //     pathname: '/search-job-results?pageType=viewNearByJob&heading=Jobs in your area',
    //     search
    //     state: {
    //         queryParam: "viewNearByJob",
    //         heading: "Jobs in your area",
    //     }
    // })
    props.history.push(
      `/search-job-results?jobResults=viewNearByJob&defaultLat=${props.currentCoordinates?.coordinates[1]}&defaultLong=${props.currentCoordinates?.coordinates[0]}`
    );
  };

  return (
    <div className="home_banner">
      <figure className="banner_img_img">
        <img src={bannerimg} alt="bannerimg" />
        <div className="banner_container">
          {/* <div className={`top_search ${isToggleModifySearch ? "active" : ""}`}> */}
          <BannerSearch
            {...props}
            handleChangeToggle={handleChangeToggle}
            paramsData={paramsData}
            refreshParams={refreshParams}
          />
          {/* </div> */}
          <div className="text-center">
            <h1 className="heading text_shine">See all around me</h1>
            <p className="commn_para">Get the job in your area</p>
            <button className="fill_btn view-btn" onClick={viewMoreClicked}>
              View More
            </button>
          </div>
        </div>
      </figure>
    </div>
  );
};

export default HomeBanner;
