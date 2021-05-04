import { useState, useCallback, useRef } from 'react';
// @ts-ignore
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { formatRelative } from 'date-fns';

import jobIconDemo from "../../assets/images/jobicon.png";

const libraries: any = ["places", "geometry"];

// const center = {
//     lat: -37.840935,
//     lng: 144.946457
//     // lat: 21.17021,
//     // lng: 72.831062
// }

const mapContainerStyle = {
    width: "100%",
    height: "100vh"
}

const options = {
    // styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true
}

const RenderMap = (props: any) => {
    // const { isLoaded, loadError } = useLoadScript({
    //     // googleMapsApiKey: "AIzaSyDKFFrKp0D_5gBsA_oztQUhrrgpKnUpyPo",
    //     libraries
    // })

    var mapCenterCoordinates;
    if (props.filterByPrice) {
        mapCenterCoordinates = props.homeSearchJobData?.slice(0, 1);
    } else if (props?.location?.state?.queryParam == 'viewNearByJob') {
        mapCenterCoordinates = props.viewNearByJobData?.slice(0, 1);
    } else {
        mapCenterCoordinates = props.homeSearchJobData?.slice(0, 1);
    }
    console.log(mapCenterCoordinates, "mapCenterCoordinates");
    const center = {
        lat: mapCenterCoordinates?.length > 0 ? mapCenterCoordinates[0]?.location?.coordinates[1] : -37.840935,
        lng: mapCenterCoordinates?.length > 0 ? mapCenterCoordinates[0]?.location?.coordinates[0] : 144.946457
        // lat: 21.17021,
        // lng: 72.831062
    }
    const [markers, setMarkers] = useState<Array<any>>([]);
    const [selected, setSelected] = useState<any>(null);

    const onMapClick = useCallback((event) => {
        setMarkers(current => [
            ...current,
            {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
                time: new Date(),
            }])
    }, [])

    // console.log(props, "renderMap screen", mapCenterCoordinates[0]?.location?.coordinates[1], mapCenterCoordinates[0]?.location?.coordinates[0]);

    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, [])

    // if (loadError) return <span>Error loading maps</span>;
    // if (!isLoaded) return <span>Loading maps</span>;
    console.log(props, "props renderMap");

    const renderJobsData = () => {
        // const jobsData = props.viewNearByJobData;
        // return jobsData;
        console.log(props.homeSearchJobData, "homeSearchJobData response")
        var jobsData;
        if (props.filterByPrice) {
            jobsData = props.homeSearchJobData;
            return jobsData;
        } else if (props?.location?.state?.queryParam == 'viewNearByJob') {
            jobsData = props.viewNearByJobData;
            return jobsData;
        } else {
            jobsData = props.homeSearchJobData;
            return jobsData;
        }
        return null;
    }

    return (
        <div>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={11}
                center={center}
                options={options}
                onClick={onMapClick}
                onLoad={onMapLoad}
            >
                {/* {props.viewNearByJobData?.map((item: any) => ( */}
                {renderJobsData()?.map((item: any) => (
                    <Marker
                        key={new Date().toISOString()}
                        // position={{ lat: 21.17021, lng: 72.831062 }}
                        position={{ lat: item.location.coordinates[1], lng: item.location.coordinates[0] }}
                        icon={{
                            url: jobIconDemo,
                            scaledSize: new window.google.maps.Size(45, 45),
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(20, 20)
                        }}
                        onClick={() => {
                            const lat = item.location.coordinates[1];
                            const lng = item.location.coordinates[0];
                            // setSelected({ lat: lat, lng: lng });
                            setSelected(item);
                        }}
                    />
                ))}
                {selected ? (<InfoWindow position={{ lat: selected.location.coordinates[1], lng: selected.location.coordinates[0] }}
                    onCloseClick={() => setSelected(null)}
                >
                    <div className="preview_card">
                        <div className="tradie_card">
                            <a href="javascript:void(0)" className="more_detail circle"></a>
                            <div className="user_wrap">
                                <figure className="u_img">
                                    <img src={selected.tradeSelectedUrl ? selected.tradeSelectedUrl : ""} alt="traide-img" />
                                </figure>
                                <div className="details">
                                    <span className="name">{selected.tradeName}</span>
                                    <span className="prof">{selected.jobName}</span>
                                </div>
                            </div>
                            <div className="job_info">
                                <ul>
                                    <li className="icon clock">{selected.time}</li>
                                    <li className="icon dollar">{selected.amount}</li>
                                    <li className="icon location">{selected.locationName}</li>
                                    <li className="icon calendar">{selected.durations}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </InfoWindow>) : null}
            </GoogleMap>
        </div>
    )
}

export default RenderMap;
