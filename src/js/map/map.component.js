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
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />
    }),
    withScriptjs,
    withGoogleMap
)(props => (
    <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
        {props.isMarkerShown && (
            <Marker position={{ lat: -34.397, lng: 150.644 }} />
        )}
    </GoogleMap>
));

export default Map;
