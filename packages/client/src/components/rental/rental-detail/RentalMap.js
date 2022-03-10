import React from "react";
import { MapWithGeocode } from "../../map/GoogleMap";

export default function RentalMap({ location }) {
    return (
        <MapWithGeocode
            googleMapURL="https://maps.googleapis.com/maps/api/js?libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `357.297px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            location={location}
        />
    );
}
