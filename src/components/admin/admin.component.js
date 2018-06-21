import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import './styles.css'

class Admin extends Component {
    render() {
        return (
            <div className="menu">
                <Link className="link" to='/user/admin/create'>Add new measurement</Link>
                <Link className="link" to='/user/admin/edit'>Edit exciting measurement</Link>
                <Link className="link" to='/user/admin/delete'>Delete exciting measurement</Link>
                <Link className="link" to='/user/admin/createUser'>Add new User</Link>
            </div>
        )
    }
}

export default Admin;
