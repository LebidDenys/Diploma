import React from 'react'
import { Link, Route } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MapContainer from './map/map.container'
import Admin from './admin/admin.component'
import './styles.css'
import {
    fetchData
} from '../modules/app'

const App = () => {
    return (
        <div>
            <header className="menu">
                <Link to='/map' className="link">map</Link>
                <Link to='/admin' className="link">admin</Link>
            </header>

            <main>
                <Route path='/map' component={MapContainer} />
                <Route path='/admin' component={Admin}/>
            </main>
        </div>
    );
};

const mapStateToProps = state => ({
    points: state.app.points
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchData,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
