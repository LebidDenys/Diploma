import PropTypes from 'prop-types'

export const MeasurementShape = {
    _id: PropTypes.string.isRequired,
    point: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    month: PropTypes.string.isRequired,
    lead: PropTypes.number,
    cadmium: PropTypes.number,
    zinc: PropTypes.number,
    copper: PropTypes.number,
    chrome: PropTypes.number,
    nikel: PropTypes.number
};

export const PointShape = {
    _id: PropTypes.string.isRequired,
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
    city: PropTypes.string.isRequired
};
