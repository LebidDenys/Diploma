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
        containerElement: <div style={{ height: `500px` }} />,
        mapElement: <div style={{ height: `100%` }} />
    }),
    withScriptjs,
    withGoogleMap
)(props => (
    <GoogleMap defaultZoom={6} defaultCenter={{ lat: 48.83614219, lng: 31.74842143 }}>
        {props.measurements && props.measurements.map(measurement=> {
            return (
                <Marker
                    key={measurement.id || measurement.lat}
                    position={{ lat: measurement.lat, lng: measurement.lng }}
                    onClick={() => props.onMarkerClick(measurement)}
                />
            )
        })}
    </GoogleMap>
));

export default Map;
