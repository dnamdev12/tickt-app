import { useState, useCallback, useRef } from 'react';
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow
} from '@react-google-maps/api';
import { formatRelative } from 'date-fns';

import residential from "../../assets/images/ic-residential.png";


const libraries: any = ["places", "geometry"];

const center = {
    lat: -37.840935,
    lng: 144.946457
}

const mapContainerStyle = {
    width: "100vw",
    height: "100vh"
}

const options = {
    // styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true
}

const RenderMap = () => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyDKFFrKp0D_5gBsA_oztQUhrrgpKnUpyPo",
        libraries
    })
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

    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, [])

    if (loadError) return <span>Error loading maps</span>;
    if (!isLoaded) return <span>Loading maps</span>;

    return (
        <div>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={14}
                center={center}
                options={options}
                onClick={onMapClick}
                onLoad={onMapLoad}
            >
                {markers.map((marker: any) => (
                    <Marker
                        key={marker.time.toISOString()}
                        position={{ lat: marker.lat, lng: marker.lng }}
                        icon={{
                            // url: "/demo.png",
                            url: residential,
                            scaledSize: new window.google.maps.Size(20, 20),
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(10, 10)
                        }}
                        onClick={() => {
                            setSelected(marker);
                        }}
                    />
                ))}
                {selected ? (<InfoWindow position={{ lat: selected.lat, lng: selected.lng }}
                onCloseClick={() => setSelected(null)}
                >
                    <div>
                        <span>Job details</span>
                        <p>Spotted at {formatRelative(selected.time, new Date())}</p>
                    </div>
                </InfoWindow>) : null}
            </GoogleMap>
        </div>
    )
}

export default RenderMap;
