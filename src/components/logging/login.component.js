import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { Form, Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import './styles.css'

class Login extends Component {
    state = {
        email: '',
        password: '',
    };

    handleFieldChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    handleSubmit = () => {
        this.props.onSignin({
            email: this.state.email,
            password: this.state.password
        })
    }

    render() {
        if(this.props.isAuth){
            return (
                <Redirect
                    to={{
                        pathname: '/admin',
                        state: { from: this.props.location }
                    }}
                />
            )
        }
        return (
            <div className="login-forms">
                <Form>
                    <Form.Field>
                        <label>Email</label>
                        <input
                            placeholder='email'
                            id='email'
                            onChange={this.handleFieldChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <input
                            type='password'
                            placeholder='password'
                            id='password'
                            onChange={this.handleFieldChange}
                        />
                    </Form.Field>
                    <Button primary onClick={this.handleSubmit}>
                        Log in
                    </Button>
                </Form>
            </div>
        )
    }
}

Login.propTypes = {
    isAuth: PropTypes.bool.isRequired,
    onSignin: PropTypes.func.isRequired
}

export default Login;
