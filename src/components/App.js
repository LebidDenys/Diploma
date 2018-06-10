import React from 'react'
import { Link, Route, withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MapContainer from './map/map.container'
import Admin from './admin/admin.component'
import FormComponent from './admin/form/form.component'
import './styles.css'
import {
    fetchData,
} from '../modules/app'

const App = () => {
    return (
        <div>
            <header className="header">
                <Link to='/map' className="link">map</Link>
                <Link to='/admin' className="link">admin</Link>
            </header>

            <main>
                <Route path='/map' render={() => <MapContainer mode='user'/>} />
                <Route exact path='/admin' component={Admin}/>
                <Route path='/admin/create' render={() => <FormComponent mode='create'/>}/>
                <Route path='/admin/edit' render={() => <MapContainer mode='admin'/>}/>
            </main>
        </div>
    );
};

const mapStateToProps = state => ({
    measurements: state.app.measurements
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchData,
}, dispatch);

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(App));
