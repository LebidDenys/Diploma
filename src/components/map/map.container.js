import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { Message } from 'semantic-ui-react'
import { MeasurementShape } from '../common/constants/shapes'
import Map from './map.component'
import MonthPicker from '../common/month-picker/month-picker.component'
import { connect } from 'react-redux'
import './styles.css'
import { changeMonth, changeYear } from '../../modules/app'

class MapContainer extends Component {
    state = {
        selectedMeasurements: [],
        selectedMarker: {},
    };

    componentWillReceiveProps(nextProps) {
        let selectedMeasurements = this.filterMeasurement(nextProps.measurements, 'year', nextProps.activeYear);
        selectedMeasurements = this.filterMeasurement(selectedMeasurements, 'month', nextProps.activeMonth);
        this.setState({
            selectedMeasurements
        })
    }

    filterMeasurement = (arr, key, value) => {
        return arr.filter(item => item[key] === value)
    };

    handleMarkerClick = marker => {
        if (this.props.mode === 'user'){
            this.setState({
                selectedMarker: marker
            })
        } else {

        }
    };

    handleMonthChange = e => {
        const month = e.target.innerText.substring(0,3).toLowerCase();
        this.props.changeMonth(month);
    };

    handleYearChange = e => {
        this.props.changeYear(e.target.innerText);
        console.log(this.state.selectedMeasurements)
    };

    render() {
        return (
            <div>
                <div className="wrapper">
                    <MonthPicker
                        activeMonth={this.props.activeMonth}
                        activeYear={this.props.activeYear}
                        onMonthChange={this.handleMonthChange}
                        onYearChange={this.handleYearChange}
                    />
                    {this.state.selectedMeasurements.length === 0 &&
                        <Message className="message">
                            <p>
                                <span className="bold">Sorry</span>
                                <br />
                                There is no measurements for this dates.
                            </p>
                        </Message>
                    }
                </div>
                <Map
                    measurements={this.state.selectedMeasurements}
                    onMarkerClick={this.handleMarkerClick}
                />
                <div className="description-wrapper">
                    {this.state.selectedMarker && Object.keys(this.state.selectedMarker).map(key =>
                        (<span className="description-item">{key}: {this.state.selectedMarker[key]}</span>)
                    )}
                </div>
            </div>
        )
    }
}

MapContainer.propTypes = {
    measurements: PropTypes.arrayOf(PropTypes.shape(MeasurementShape)).isRequired,
    activeYear: PropTypes.number.isRequired,
    activeMonth: PropTypes.string.isRequired,
    mode: PropTypes.string.isRequired,
    changeMonth: PropTypes.func.isRequired,
    changeYear: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    measurements: state.app.measurements,
    activeYear: parseInt(state.app.year),
    activeMonth: state.app.month,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    changeMonth,
    changeYear
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MapContainer);


