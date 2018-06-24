import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { toastr } from 'react-redux-toastr'
import { Form, Button } from 'semantic-ui-react'
import FormItem from '../../common/form-item/form-item.component'

class PointForm extends Component {
    state = {
        pointNumber: '',
        lat: '',
        lng: '',
        city: ''
    };

    handleFieldChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    handleCreate = e => {
        const isFieldsCorrect = this.state.pointNumber !== '' && this.state.lat !== '' && this.state.lng !== '' && this.state.city !== '';
        if(isFieldsCorrect){
            this.props.onCreate(this.state)
        } else {
            e.preventDefault();
            toastr.error('Error', `You missed required field`);
        }
    };

    render() {
        return (
            <div>
                <Form className="form-wrapper">
                    <FormItem
                        name='Point number'
                        id='pointNumber'
                        value={this.state.pointNumber}
                        onChange={this.handleFieldChange}
                    />
                    <FormItem
                        name='Latitude'
                        id='lat'
                        value={this.state.lat}
                        onChange={this.handleFieldChange}
                    />
                    <FormItem
                        name='Longitude'
                        id='lng'
                        value={this.state.lng}
                        onChange={this.handleFieldChange}
                    />
                    <FormItem
                        name='City'
                        id='city'
                        value={this.state.city}
                        onChange={this.handleFieldChange}
                    />
                    <Link to='/admin'>
                        <Button primary onClick={this.handleCreate}>
                            CREATE
                        </Button>
                    </Link>
                </Form>
            </div>
        )
    }
}

PointForm.propTypes = {
    onCreate: PropTypes.func.isRequired
};

export default PointForm;
