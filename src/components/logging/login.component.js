import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import './styles.css'
import { connect } from "react-redux";

class Login extends Component {
    state = {
        email: '',
        password: ''
    };

    handleFieldChange = e => {
        this.setState({
            [e.target.id]: e.target.innerText
        });
    };

    render() {
        return (
            <div className="login-forms">
                <Form>
                    <Form.Field>
                        <label>Email</label>
                        <input placeholder='email' id='email' onChange={this.handleFieldChange} />
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <input placeholder='password' id='password' onChange={this.handleFieldChange} />
                    </Form.Field>
                    <Button primary onClick={this.handleSubmit}>
                        Log in
                    </Button>
                </Form>
            </div>
        )
    }
}

export default Login;
