import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Form, Button, Dropdown } from 'semantic-ui-react'
import { toastr } from 'react-redux-toastr'
import './styles.css'
import MonthPicker from '../../common/month-picker/month-picker.component'
import FormItem from '../../common/form-item/form-item.component'
import { createMeasurement } from '../../../modules/app'
import { connect } from 'react-redux';
import {years} from '../../common/constants/dates';
import { MeasurementShape, PointShape } from '../../common/constants/shapes';

class FormComponent extends Component {
    constructor(props){
        super(props);
        const id = props.match.params.id;
        if(this.props.measurements.length === 0){
            this.props.fetchData();
        }
        const measurement = props.measurements.filter(item => item._id === id);
        this.state = {
            measurement: measurement.length !== 0 ?
                measurement[0] :
                {
                    point: '',
                    month: '',
                    year: 2015,
                    plumbum: '',
                    cadmium: '',
                    zinc: '',
                    copper: '',
                    chrome: '',
                    nikel: '',
                    manganese: '',
                    iron: ''
                }
        };
    }

    componentWillReceiveProps(nextProps){
        if(this.props.mode === 'edit'){
            const id = nextProps.match.params.id;
            const measurement = nextProps.measurements.filter(item => item._id === id);
            if(measurement.length !== 0){
                this.setState({
                    measurement: measurement[0]
                });
            }
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

    handlePointChange = e => {
        console.log(e.target.innerText)
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

    handleCreate = e => {
        const { month, year, lat, lng } = this.state.measurement;
        if( month === '' || year === '' || lat === '' || lng === ''){
            toastr.error('Error', `Please fill in month, year, latitude and longitude`);
            e.preventDefault();
        } else {
            this.props.onCreate(this.state.measurement);
        }
    };

    handleEdit = e => {
        const { month, year, lat, lng } = this.state.measurement;
        if( month === '' || year === '' || lat === '' || lng === ''){
            toastr.error('Error', `Please fill in month, year, latitude and longitude`);
            e.preventDefault();
        } else {
            this.props.onEdit(this.state.measurement);
        }
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
                <div className="dropdowns-wrapper">
                    <Dropdown
                        className="dropdown"
                        placeholder='Select Point'
                        selection
                        options={this.props.points}
                        value={this.state.point}
                        onChange={this.handlePointChange}
                    />
                </div>
                <Form className="form-wrapper">
                    <FormItem
                        name='Latitude'
                        id='lat'
                        value={this.state.measurement.lat}
                        onChange={this.handleFieldChange}
                    />
                    <FormItem
                        name='Longitude'
                        id='lng'
                        value={this.state.measurement.lng}
                        onChange={this.handleFieldChange}
                    />
                    <FormItem
                        name='Cadmium'
                        id='cadmium'
                        value={this.state.measurement.cadmium}
                        onChange={this.handleFieldChange}
                    />
                    <FormItem
                        name='Iron'
                        id='iron'
                        value={this.state.measurement.iron}
                        onChange={this.handleFieldChange}
                    />
                    <FormItem
                        name='Manganese'
                        id='manganese'
                        value={this.state.measurement.manganese}
                        onChange={this.handleFieldChange}
                    />
                    <FormItem
                        name='Copper'
                        id='copper'
                        value={this.state.measurement.copper}
                        onChange={this.handleFieldChange}
                    />
                    <FormItem
                        name='Nikel'
                        id='nikel'
                        value={this.state.measurement.nikel}
                        onChange={this.handleFieldChange}
                    />
                    <FormItem
                        name='Plumbum'
                        id='plumbum'
                        value={this.state.measurement.plumbum}
                        onChange={this.handleFieldChange}
                    />
                    <FormItem
                        name='Chrome'
                        id='chrome'
                        value={this.state.measurement.chrome}
                        onChange={this.handleFieldChange}
                    />
                    <FormItem
                        name='Zinc'
                        id='zinc'
                        value={this.state.measurement.zinc}
                        onChange={this.handleFieldChange}
                    />
                    {this.props.mode === 'create' &&
                        <Link to='/map'>
                            <Button primary onClick={this.handleCreate}>
                                CREATE
                            </Button>
                        </Link>
                    }
                    {this.props.mode === 'edit' &&
                        <Link to='/map'>
                            <Button primary onClick={this.handleEdit}>
                                SAVE
                            </Button>
                        </Link>
                    }
                </Form>
            </div>
        )
    }
}

FormComponent.propTypes = {
    mode: PropTypes.string.isRequired,
    measurements: PropTypes.arrayOf(PropTypes.shape(MeasurementShape)),
    points: PropTypes.arrayOf(PropTypes.shape(PointShape)),
    fetchData: PropTypes.func.isRequired,
    onCreate: PropTypes.func,
    onEdit: PropTypes.func,
};

FormComponent.defaultProps = {
    onCreate: null,
    onEdit: null,
};

const mapStateToProps = state => ({
    measurements: state.app.measurements,
    points: state.app.points,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    createMeasurement
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FormComponent);
