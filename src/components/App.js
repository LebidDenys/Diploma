import React, {Component} from 'react'
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
import { fetchData, createMeasurement } from '../modules/app'

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

    render() {
        return (
            <div>
                <header className="header">
                    <Link to='/map' className="link">map</Link>
                    {this.props.isAuth &&
                        <Link to='/user/admin' className="link">admin</Link>
                    }
                    {!this.props.isAuth &&
                        <Link to='/user/login' className="link">log in</Link>
                    }
                </header>

                <main>
                    <Route path='/map' render={() => <MapContainer mode='user' />} />
                    <Route path='/user/login' render={() => <Login />} />
                    <PrivateRoute isAuth={this.props.isAuth} exact path='/admin' component={Admin}/>
                    <PrivateRoute path='/user/admin/create' render={() => <FormComponent mode='create' onCreate={this.handleCreateMeasurement}/>}/>
                    <PrivateRoute path='/user/admin/edit' render={() => <MapContainer mode='admin'/>}/>
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
    createMeasurement
}, dispatch);

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(App));
