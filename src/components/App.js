import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { MeasurementShape } from './common/constants/shapes'
import axios from 'axios';
import { Link, Route, withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ReduxToastr from 'react-redux-toastr'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import { toastr } from 'react-redux-toastr'
import 'semantic-ui-css/semantic.min.css'
import MapContainer from './map/map.container'
import Admin from './admin/admin.component'
import FormComponent from './admin/measurement-form/form.component'
import UserForm from './admin/user-form/user-form.component'
import PointForm from './admin/point-form/point-form.component'
import PrivateRoute from './common/privateRoute.component'
import Login from './admin/login/login.component'
import './styles.css'
import { fetchMeasurements, fetchPoints, createMeasurement, logIn, logOut, editMeasurement, deleteMeasurement } from '../redux-modules/app'

const host = 'http://localhost:3000/';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            shouldLoad: true,
        };
    }


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
                if(response.status === 200){
                    this.props.fetchMeasurements(response.data);
                } else {
                    toastr.error('Error', `Something went wrong while fetching data, server response with status ${response.status}`);
                }
            })
            .catch(e => {
                console.log(e);
            });
        axios.get(`${host}points`)
            .then(response => {
                if(response.status === 200){
                    this.props.fetchPoints(response.data);
                } else {
                    toastr.error('Error', `Something went wrong while fetching data, server response with status ${response.status}`);
                }
            })
            .catch(e => {
                console.log(e);
            });
    };

    handleCreateMeasurement = measurement => {
        axios({
            method: 'POST',
            data: measurement,
            url: `${host}measurements`
        })
            .then(response => {
                console.log(response)
                if(response.status === 200 && response.data !== 'You have not permission'){
                    this.props.createMeasurement(response.data);
                    toastr.success('Success', 'Measurement successfully created');
                } else {
                    console.log(response)
                    toastr.error('Error', `Something went wrong server response with status ${response.status}`);
                }
            })
            .catch(e => {
                console.log(e);
                toastr.error('Error', e);
            });
    };

    handleEditMeasurement = measurement => {
        axios.put(`${host}measurements/${measurement._id}`, measurement)
            .then(response => {
                if(response.status === 200 && response.data !== 'You have not permission') {
                    this.props.editMeasurement(response.data);
                    toastr.success('Success', 'Measurement successfully updated');
                } else {
                    toastr.error('Error', `Something went wrong server response with status ${response.status}`);
                }
            })
            .catch(e => {
                console.log(e);
                toastr.error('Error', e);
            });
    };

    handleDeleteMeasurement = measurementId => {
        console.log('come = ', measurementId)
        axios.delete(`${host}measurements/${measurementId}`)
            .then(response => {
                if(response.status === 200 && response.data !== 'You have not permission') {
                    this.props.deleteMeasurement(measurementId);
                    toastr.success('Success', 'Measurement successfully deleted');
                } else {
                    toastr.error('Error', `Something went wrong server response with status ${response.status}`);
                }
            })
            .catch(e => {
                console.log(e);
                toastr.error('Error', e);
            });
    };

    handleSignIn = userData => {
        axios.post(`${host}user/login`, userData)
            .then(response => {
                if(response.status === 200){
                    this.props.logIn(response.data);
                    console.log(response.cookie)
                    toastr.success('Hello', response.data.email);
                } else {
                    toastr.error('Error', `Something went wrong server response with status ${response.status}`);
                }
            })
            .catch(e => {
                console.log(e);
                toastr.error('Error', e);
            });
    };

    handleSignOut = () => {
        axios.post(`${host}user/logout`)
            .then(response => {
                if (response.status === 200){
                    toastr.success('Good bye', response.data.email);
                    this.props.logOut();
                } else {
                    toastr.error('Error', `Something went wrong server response with status ${response.status}`);
                }
            })
            .catch(e => {
                console.log(e);
                toastr.error('Error', e);
            });
    };

    handleCreateUser = userData => {
        axios.post(`${host}user/signup`, userData)
            .then(response => {
                if (response.status === 200 && response.data !== 'You have not permission'){
                    toastr.success('Success', `User ${response.data.email} successfully created`);
                } else {
                    toastr.error('Error', `Something went wrong server response with status ${response.status}`);
                }
            })
            .catch(e => {
                console.log(e);
                toastr.error('Error', 'Likely user with that email already exist');
            });
    };

    handleCreatePoint = pointData => {
        axios.post(`${host}points/`, pointData)
            .then(response => {
                if (response.status === 200 && response.data !== 'You have not permission'){
                    toastr.success('Success', `Point #${pointData.pointNumber} successfully created`);
                } else {
                    toastr.error('Error', `Something went wrong server response with status ${response.status}`);
                }
            })
            .catch(e => {
                console.log(e);
                toastr.error('Error', 'Something went wrong');
            });
    };

    // TODO: RENDER LOGIN LOGOUT LINKS METHOD

    render() {
        return (
            <div>
                <ReduxToastr
                    timeOut={4000}
                    newestOnTop={false}
                    preventDuplicates
                    position="top-left"
                    transitionIn="fadeIn"
                    transitionOut="fadeOut"
                    progressBar
                />

                <header className="header">
                    <Link to='/map' className="header__link">map</Link>
                    <Link to='/admin' className="header__link">admin</Link>
                    {!this.props.isAuth &&
                        <Link to='/login' className="header__link--log">log in</Link>
                    }
                    {this.props.isAuth &&
                        <Link to='/map' className="header__link--log" onClick={this.handleSignOut}>log out</Link>
                    }
                </header>

                <main>
                    <Route
                        path='/map'
                        render={() => <MapContainer mode='user' /> }
                    />
                    <Route
                        path='/login'
                        render={() => <Login onSignin={this.handleSignIn} isAuth={this.props.isAuth} /> }
                    />
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
                    <PrivateRoute
                        exact
                        isAuth={this.props.isAuth}
                        path='/admin/createUser'
                        onCreate={this.handleCreateUser}
                        component={UserForm}
                    />
                    <PrivateRoute
                        exact
                        isAuth={this.props.isAuth}
                        path='/admin/createPoint'
                        onCreate={this.handleCreatePoint}
                        component={PointForm}
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
    fetchMeasurements,
    createMeasurement,
    logIn,
    logOut,
    editMeasurement,
    deleteMeasurement,
    fetchPoints
}, dispatch);

App.propTypes = {
    measurements: PropTypes.arrayOf(PropTypes.shape(MeasurementShape)),
    isAuth: PropTypes.bool.isRequired,
    fetchMeasurements: PropTypes.func.isRequired,
    fetchPoints: PropTypes.func.isRequired,
    createMeasurement: PropTypes.func.isRequired,
    editMeasurement: PropTypes.func.isRequired,
    deleteMeasurement: PropTypes.func.isRequired,
    logIn: PropTypes.func.isRequired,
    logOut: PropTypes.func.isRequired
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(App));
