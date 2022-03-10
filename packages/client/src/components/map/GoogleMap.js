import React, { useState, useEffect } from "react";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Circle,
    InfoWindow,
} from "react-google-maps";
import Cacher from "../../services/cacher";

function MapComponent({ Crdnts }) {
    return (
        <GoogleMap defaultZoom={13} defaultCenter={Crdnts}>
            <Circle center={Crdnts} radius={500} />
            <InfoWindow>
                <div>Error</div>
            </InfoWindow>
        </GoogleMap>
    );
}

function withGeocode(WrappedComponent) {
    return function (props) {
        const cacher = new Cacher();
        // Crdnts = Coordinates
        const [Crdnts, setCrdnts] = useState({
            lat: 0,
            lng: 0,
        });
        const { location } = props;

        const geocodeLocation = location => {
            const geocoder = new window.google.maps.Geocoder();
            return new Promise((resolve, reject) => {
                geocoder.geocode({ address: location }, (res, sta) => {
                    if (sta === "OK") {
                        const geometry = res[0].geometry.location;
                        const coordinates = {
                            lat: geometry.lat(),
                            lng: geometry.lng(),
                        };
                        cacher.cacheValue(location, Crdnts);
                        resolve(coordinates);
                    } else {
                        reject("ERROR");
                    }
                });
            });
        };

        const GetGeocodedLocation = () => {
            // if Location is cached, return cached value
            if (cacher.isValueCached(location)) {
                let data = cacher.getCachedValue(location);
                setCrdnts({ ...Crdnts, data });
            } else {
                geocodeLocation(location)
                    .then(coordinates => {
                        setCrdnts({ ...Crdnts, coordinates });
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        };
        useEffect(() => {
            GetGeocodedLocation();
        }, [GetGeocodedLocation]);

        return <WrappedComponent {...props} {...Crdnts}></WrappedComponent>;
    };
}

export const MapWithGeocode = withScriptjs(
    withGoogleMap(withGeocode(MapComponent))
);
