import { useState, useCallback, useRef } from 'react';
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow
} from '@react-google-maps/api';
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
    width: "100vw",
    height: "100vh"
}

const options = {
    // styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true
}

const RenderMap = (props: any) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyDKFFrKp0D_5gBsA_oztQUhrrgpKnUpyPo",
        libraries
    })
    const mapCenterCoordinates = props.viewNearByJobData.slice(0, 1);
    const center = {
        lat: mapCenterCoordinates ? mapCenterCoordinates?.location?.coordinates[1] : -37.840935,
        lng: mapCenterCoordinates ? mapCenterCoordinates?.location?.coordinates[1] : 144.946457
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

    console.log(props, "renderMap screen");

    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, [])

    if (loadError) return <span>Error loading maps</span>;
    if (!isLoaded) return <span>Loading maps</span>;

    return (
        <div>
            <GoogleMap
                // mapContainerStyle={mapContainerStyle}
                zoom={6}
                center={center}
                options={options}
                onClick={onMapClick}
                onLoad={onMapLoad}
            >
                {props.viewNearByJobData?.map((item: any) => (
                    <Marker
                        key={new Date().toISOString()}
                        // position={{ lat: 21.17021, lng: 72.831062 }}
                        position={{ lat: item.location.coordinates[1], lng: item.location.coordinates[0] }}
                        icon={{
                            url: jobIconDemo,
                            scaledSize: new window.google.maps.Size(30, 30),
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
                    <div className="flex_col_sm_6">
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
