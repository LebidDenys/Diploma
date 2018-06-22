import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { MeasurementShape } from './common/constants/shapes'
import axios from 'axios';
import { Link, Route, withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MapContainer from './map/map.container'
import Admin from './admin/admin.component'
import FormComponent from './admin/form/form.component'
import PrivateRoute from './common/privateRoute.component'
import Login from './logging/login.component'
import './styles.css'
import { fetchData, createMeasurement, logIn, logOut, editMeasurement, dele } from '../modules/app'

const host = 'http://localhost:3000/';

class App extends Component {
    state = {
        shouldLoad: true
    };

    componentDidMount() {
        if(this.state.shouldLoad){
            this.requestAPI();
            this.setState({
                shouldLoad: false
            })
        }
    }

    requestAPI = () => {
        axios.get(`${host}measurements`)
            .then(response => {
                this.props.fetchData(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    handleCreateMeasurement = measurement => {
        axios.post(`${host}measurements`, measurement)
            .then(response => {
                this.props.createMeasurement(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    handleEditMeasurement = measurement => {
        axios.put(`${host}measurements/${measurement._id}`, measurement)
            .then(response => {
                this.props.editMeasurement(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    handleDeleteMeasurement = measurementId => {
        console.log('come = ', measurementId)
        axios.delete(`${host}measurements/${measurementId}`)
            .then(response => {
                console.log(response)
                this.props.deleteMeasurement();
            })
            .catch(e => {
                console.log(e);
            });
    };

    handleSignIn = userData => {
        axios.post(`${host}user/login`, userData)
            .then(response => {
                this.props.logIn(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    handleSignOut = () => {
        axios.post(`${host}user/logout`)
            .then(response => {
                this.props.logOut();
            })
            .catch(e => {
                console.log(e);
            });
    };

    render() {
        return (
            <div>
                <header className="header">
                    <Link to='/map' className="header__link">map</Link>
                    <Link to='/admin' className="header__link">admin</Link>
                    {!this.props.isAuth &&
                        <Link to='/user/login' className="header__link--log">log in</Link>
                    }
                    {this.props.isAuth &&
                        <Link to='/map' className="header__link--log" onClick={this.handleSignOut}>log out</Link>
                    }
                </header>

                <main>
                    <Route path='/map' render={() => <MapContainer mode='user' />} />
                    <Route path='/login' render={() => <Login onSignin={this.handleSignIn} isAuth={this.props.isAuth} />  } />
                    <PrivateRoute
                        exact
                        isAuth={this.props.isAuth}
                        path='/admin'
                        component={Admin}
                    />
                    <PrivateRoute
                        isAuth={this.props.isAuth}
                        fetchData={this.requestAPI}
                        path='/admin/edit/:id'
                        mode='edit'
                        onEdit={this.handleEditMeasurement}
                        component={FormComponent}
                    />
                    <PrivateRoute
                        exact
                        isAuth={this.props.isAuth}
                        fetchData={this.requestAPI}
                        path='/admin/create'
                        mode='create'
                        onCreate={this.handleCreateMeasurement}
                        component={FormComponent}
                    />
                    <PrivateRoute
                        exact
                        isAuth={this.props.isAuth}
                        path='/admin/edit'
                        mode='edit'
                        component={MapContainer}
                    />
                    <PrivateRoute
                        exact
                        isAuth={this.props.isAuth}
                        path='/admin/delete'
                        onDelete={this.handleDeleteMeasurement}
                        mode='delete'
                        component={MapContainer}
                    />

                </main>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    measurements: state.app.measurements,
    isAuth: state.app.isAuth
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchData,
    createMeasurement,
    logIn,
    logOut,
    editMeasurement
}, dispatch);

App.propTypes = {
    measurements: PropTypes.arrayOf(PropTypes.shape(MeasurementShape)).isRequired,
    isAuth: PropTypes.bool.isRequired,
    fetchData: PropTypes.func.isRequired,
    createMeasurement: PropTypes.func.isRequired,
    editMeasurement: PropTypes.func.isRequired,
    logIn: PropTypes.func.isRequired,
    logOut: PropTypes.func.isRequired
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(App));
