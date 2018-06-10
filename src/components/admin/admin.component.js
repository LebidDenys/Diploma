import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import './styles.css'

class Admin extends Component {
    render() {
        return (
            <div className="menu">
                <Link className="link" to='/admin/create'>Add new measurement</Link>
                <Link className="link" to='/admin/edit'>Edit exciting measurement</Link>
            </div>
        )
    }
}

export default Admin;
