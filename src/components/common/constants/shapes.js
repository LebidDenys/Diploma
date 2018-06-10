import PropTypes from 'prop-types'

export const MeasurementShape = {
    id: PropTypes.number.isRequired,
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
    month: PropTypes.string.isRequired,
    lead: PropTypes.number.isRequired,
    cadmium: PropTypes.number.isRequired,
    zinc: PropTypes.number.isRequired,
    copper: PropTypes.number.isRequired,
    chrome: PropTypes.number.isRequired,
    nikel: PropTypes.number.isRequired
}
