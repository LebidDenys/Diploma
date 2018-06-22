import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { Message, Modal, Button } from 'semantic-ui-react'
import { MeasurementShape } from '../common/constants/shapes'
import Map from './map.component'
import MonthPicker from '../common/month-picker/month-picker.component'
import { connect } from 'react-redux'
import './styles.css'
import { changeMonth, changeYear, fetchData, markerClick } from '../../modules/app'

class MapContainer extends Component {
    constructor(props){
        super(props)
        let selectedMeasurements = this.filterMeasurement(this.props.measurements, 'year', this.props.activeYear);
        selectedMeasurements = this.filterMeasurement(selectedMeasurements, 'month', this.props.activeMonth);
        this.state = {
            selectedMeasurements: selectedMeasurements,
            deletingMarkerId: '',
            isModalOpen: false
        };
    }

    selectMeasurements

    filterMeasurement = (arr, key, value) => {
        return arr.filter(item => item[key] === value)
    };

    handleMarkerClick = marker => {
        if(this.props.mode === 'delete'){
            this.setState({
                deletingMarkerId: marker._id,
                isModalOpen: true
            })
        } else {
            if (this.props.selectedMarkerId === marker._id){
                this.props.markerClick('')
            } else {
                this.props.markerClick(marker._id)
            }
        }
    };

    handleDelete = () => {
        this.props.onDelete(this.state.deletingMarkerId);
        this.handleClose();
    };

    handleClose = () => {
        this.setState({
            deletingMarkerId: '',
            isModalOpen: false
        })
    };

    handleMonthChange = e => {
        const month = e.target.innerText.substring(0,3).toLowerCase();
        this.props.changeMonth(month);
        console.log(this.state.selectedMeasurements)
    };

    handleYearChange = e => {
        this.props.changeYear(e.target.innerText);
    };

    render() {
        if(this.props.mode === 'edit' && this.props.isAuth && this.props.selectedMarkerId !== ''){
            return (
                <Redirect to={{pathname: `/admin/edit/${this.props.selectedMarkerId}`, state: {from: this.props.location}, test: 'test'}} />
            )
        }
        return (
            <div>
                <div className="wrapper">
                    <Modal
                        open={this.state.isModalOpen}
                        onClose={this.handleClose}
                        basic
                    >
                        <Modal.Content>
                            <h3>Are you sure you want to delete this measurement?</h3>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button color='red' onClick={this.handleDelete} inverted>
                                DELETE
                            </Button>
                            <Button onClick={this.handleClose}>
                                CANCEL
                            </Button>
                        </Modal.Actions>
                    </Modal>
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
                    activeMarkerId={this.props.selectedMarkerId}
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
    selectedMarkerId: PropTypes.string.isRequired,
    isAuth: PropTypes.bool.isRequired,
    changeMonth: PropTypes.func.isRequired,
    changeYear: PropTypes.func.isRequired,
    fetchData: PropTypes.func.isRequired,
    onDelete: PropTypes.func
};

MapContainer.defaultProps = {
    onDelete: null
}

const mapStateToProps = state => ({
    measurements: state.app.measurements,
    activeYear: parseInt(state.app.year, 10),
    activeMonth: state.app.month,
    isAuth: state.app.isAuth,
    selectedMarkerId: state.app.selectedMeasurementId
});

const mapDispatchToProps = dispatch => bindActionCreators({
    changeMonth,
    changeYear,
    fetchData,
    markerClick
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MapContainer);


