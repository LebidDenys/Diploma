import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Map from './map/map.component';

const Body = () => {
    return (
        <div>
            <Switch>
                <Route path='/map' component={Map}/>
            </Switch>
        </div>
    );
}

export default Body;
