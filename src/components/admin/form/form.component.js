import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { Form, Button } from 'semantic-ui-react'
import './styles.css'
import MonthPicker from '../../common/month-picker/month-picker.component'
import { createMeasurement } from '../../../modules/app'
import { connect } from "react-redux";

class FormComponent extends Component {
    state = {
        measurement: {
            month: '',
            year: 2015,
            lat: 0,
            lng: 0,
            plumbum: 0,
            cadmium: 0,
            zinc: 0,
            copper: 0,
            chrome: 0,
            nikel: 0,
            manganese: 0,
            iron: 0
        }
    };

    componentDidMount(){
        if(this.props.mode === 'edit'){
            const measurement = this.props.measurements.filter(item => item._id === this.props.match.params.id);
            console.log(measurement)
            this.setState(measurement);
            console.log(measurement, this.state)
        }
    }

    handleMonthChange = e => {
        const month = e.target.innerText.substring(0,3).toLowerCase();
        this.setState({
            measurement: {
                ...this.state.measurement,
                month
            }
        })
    };

    handleYearChange = e => {
        const year = parseInt(e.target.innerText, 10);
        this.setState({
            measurement: {
                ...this.state.measurement,
                year
            }
        })
    };

    handleFieldChange = e => {
        const value = parseFloat(e.target.value);
        this.setState({
            measurement: {
                ...this.state.measurement,
                [e.target.id]: isNaN(value) ? '' : value
            }
        });
    };

    handleCreate = () => {
        this.props.onCreate(this.state.measurement)
    };

    render() {
        return (
            <div>
                <MonthPicker
                    activeMonth={this.state.measurement.month}
                    activeYear={this.state.measurement.year}
                    onMonthChange={this.handleMonthChange}
                    onYearChange={this.handleYearChange}
                />
                <Form className="form-wrapper">
                    <Form.Field>
                        <label>Latitude</label>
                        <input placeholder='Latitude' id='lat' value={this.state.measurement.lat} onChange={this.handleFieldChange} />
                    </Form.Field>
                    <Form.Field>
                        <label>Longitude</label>
                        <input placeholder='Longitude' id='lng' onChange={this.handleFieldChange} />
                    </Form.Field>
                    <Form.Field>
                        <label>Cadmium</label>
                        <input placeholder='Cadmium' id='cadmium' onChange={this.handleFieldChange} />
                    </Form.Field>
                    <Form.Field>
                        <label>Iron</label>
                        <input placeholder='Iron' id='iron' onChange={this.handleFieldChange} />
                    </Form.Field>
                    <Form.Field>
                        <label>Manganese</label>
                        <input placeholder='Manganese' id='manganese' onChange={this.handleFieldChange} />
                    </Form.Field>
                    <Form.Field>
                        <label>Copper</label>
                        <input placeholder='Copper' id='copper' onChange={this.handleFieldChange} />
                    </Form.Field>
                    <Form.Field>
                        <label>Nikel</label>
                        <input placeholder='Nikel' id='nikel' onChange={this.handleFieldChange} />
                    </Form.Field>
                    <Form.Field>
                        <label>Plumbum</label>
                        <input placeholder='Plumbum' id='plumbum' onChange={this.handleFieldChange} />
                    </Form.Field>
                    <Form.Field>
                        <label>Chrome</label>
                        <input placeholder='Chrome' id='chrome' onChange={this.handleFieldChange} />
                    </Form.Field>
                    <Form.Field>
                        <label>Zinc</label>
                        <input placeholder='Zinc' id='zinc' onChange={this.handleFieldChange} />
                    </Form.Field>

                    {this.props.mode === 'create' &&
                        <Button primary onClick={this.handleCreate}>
                            CREATE
                        </Button>
                    }
                </Form>
            </div>
        )
    }
}

FormComponent.propTypes = {
    mode: PropTypes.string.isRequired
};
const mapStateToProps = state => ({
    measurements: state.app.measurements,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    createMeasurement
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FormComponent);
