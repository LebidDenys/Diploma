import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import './styles.css'

class Admin extends Component {
    render() {
        return (
            <div className="menu">
                <Button primary>Add new point</Button>
                <Button primary>Edit exciting point</Button>
            </div>
        )
    }
}

export default Admin;
