import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { Message } from 'semantic-ui-react'
import { MeasurementShape } from '../common/constants/shapes'
import Map from './map.component'
import MonthPicker from '../common/month-picker/month-picker.component'
import { connect } from 'react-redux'
import './styles.css'
import { changeMonth, changeYear, fetchData } from '../../modules/app'

class MapContainer extends Component {
    state = {
        selectedMeasurements: [],
        activeMarkerId: ''
    };

    componentWillReceiveProps(nextProps) {
        let selectedMeasurements = this.filterMeasurement(nextProps.measurements, 'year', nextProps.activeYear);
        selectedMeasurements = this.filterMeasurement(selectedMeasurements, 'month', nextProps.activeMonth);
        this.setState({
            selectedMeasurements
        })
    };

    filterMeasurement = (arr, key, value) => {
        return arr.filter(item => item[key] === value)
    };

    handleMarkerClick = marker => {
        if (this.state.activeMarkerId === marker._id){
            this.setState({
                activeMarkerId:''
            })
        } else {
            this.setState({
                activeMarkerId: marker._id
            })
        }
        console.log(this.props.match.params.name)
    };

    handleMonthChange = e => {
        const month = e.target.innerText.substring(0,3).toLowerCase();
        this.props.changeMonth(month);
    };

    handleYearChange = e => {
        this.props.changeYear(e.target.innerText);
    };

    render() {
        if(this.props.mode === 'admin' && this.props.isAuth && this.state.activeMarkerId !== ''){
            return (
                <Redirect to={{pathname: `/user/admin/edit/${this.state.activeMarkerId}`, state: {from: this.props.location}, test: 'test'}} />
            )
        }
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
                    activeMarkerId={this.state.activeMarkerId}
                    onMarkerClick={this.handleMarkerClick}
                />
            </div>
        )
    }
}

MapContainer.propTypes = {
    measurements: PropTypes.arrayOf(PropTypes.shape(MeasurementShape)).isRequired,
    activeYear: PropTypes.number.isRequired,
    activeMonth: PropTypes.string.isRequired,
    mode: PropTypes.string.isRequired,
    isAuth: PropTypes.bool.isRequired,
    changeMonth: PropTypes.func.isRequired,
    changeYear: PropTypes.func.isRequired,
    fetchData: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    measurements: state.app.measurements,
    activeYear: parseInt(state.app.year, 10),
    activeMonth: state.app.month,
    isAuth: state.app.isAuth,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    changeMonth,
    changeYear,
    fetchData
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MapContainer);


