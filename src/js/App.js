import React from 'react';
import { render } from 'react-dom';
import Map from './map/map';

class App extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div>
                <Map />
            </div>
        );
    }
}

render(<App />, document.getElementById('root'));
