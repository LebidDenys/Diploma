import React from 'react';
import { compose, withProps } from 'recompose';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
} from 'react-google-maps';
import { connect } from "react-redux";

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
        {props.points.map(point=> {
            return (
                <Marker
                    key={point.id}
                    position={{ lat: point.lat, lng: point.lng }}
                    onClick={() => props.onMarkerClick(point)}
                />
            )
        })}
    </GoogleMap>
));

const mapStateToProps = state => ({
    points: state.app.points
});

export default connect(
    mapStateToProps,
)(Map);
