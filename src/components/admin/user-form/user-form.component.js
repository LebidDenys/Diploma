import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { toastr } from 'react-redux-toastr'
import { Form, Button } from 'semantic-ui-react'
import FormItem from '../../common/form-item/form-item.component'

class UserForm extends Component {
    state = {
        email: '',
        password: '',
        passwordConf: ''
    };

    handleFieldChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    handleCreate = e => {
        const isFieldsCorrect = this.state.password !== '' && this.state.password === this.state.passwordConf && this.state.email !== '';
        if(isFieldsCorrect){
            this.props.onCreate(this.state)
        } else {
            e.preventDefault();
            toastr.error('Error', `You entered wrong value or missed required field`);
        }
    };

    render() {
        return (
            <div>
                <Form className="form-wrapper">
                    <FormItem
                        name='Email'
                        id='email'
                        value={this.state.email}
                        onChange={this.handleFieldChange}
                    />
                    <FormItem
                        name='Password'
                        id='password'
                        type='password'
                        value={this.state.password}
                        onChange={this.handleFieldChange}
                    />
                    <FormItem
                        name='Confirm password'
                        id='passwordConf'
                        type='password'
                        value={this.state.passwordConf}
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

UserForm.propTypes = {
    onCreate: PropTypes.func.isRequired
};

export default UserForm;
