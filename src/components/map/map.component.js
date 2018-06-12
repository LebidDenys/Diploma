import React from 'react';
import PropTypes from 'prop-types'
import { compose, withProps } from 'recompose';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
} from 'react-google-maps';
import { MeasurementShape } from '../common/constants/shapes'
import { InfoBox }  from "react-google-maps/lib/components/addons/InfoBox";

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
                    key={measurement._id}
                    position={{ lat: measurement.lat, lng: measurement.lng }}
                    onClick={() => props.onMarkerClick(measurement)}
                >
                    {props.activeMarkerId === measurement._id &&
                        <InfoBox
                            className="info-wrappper"
                            options={{ closeBoxURL: ``, enableEventPropagation: true }}
                        >
                            <div className="info-box">
                                {Object.keys(measurement).map(key =>
                                    (key !== '_id' && key !== 'updated_at' && key !== '__v' && <span className="description-item">{key}: {measurement[key]}<br /></span>)
                                )}
                            </div>
                        </InfoBox>
                    }
                </Marker>
            )
        })}
    </GoogleMap>
));

Map.propTypes = {
    measurements: PropTypes.arrayOf(PropTypes.shape(MeasurementShape)).isRequired,
    activeMarkerId: PropTypes.string,
    onMarkerClick: PropTypes.func.isRequired,
    onInfoClick: PropTypes.func.isRequired,
};

Map.defaultProps = {
    activeMarkerId: ''
}

export default Map;
