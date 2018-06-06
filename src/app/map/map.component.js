import React from 'react';
import { compose, withProps } from 'recompose';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
} from 'react-google-maps';

const apiKey = 'AIzaSyB0vGcXPWwMQDdcf2Xk4-9rHYy_izKltJ0';

const Map = compose(
    withProps({
        googleMapURL:
            `https://maps.googleapis.com/maps/api/js?key=${apiKey}`,
        loadingElement: <div style={{ height: `80%` }} />,
        containerElement: <div style={{ height: `600px` }} />,
        mapElement: <div style={{ height: `80%` }} />
    }),
    withScriptjs,
    withGoogleMap
)(() => (
    <GoogleMap defaultZoom={6} defaultCenter={{ lat: 48.83614219, lng: 31.74842143 }}>
        {(
            <Marker position={{ lat: 48.83614219, lng: 31.74842143 }} />
        )}
    </GoogleMap>
));

export default Map;
