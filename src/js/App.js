import React from 'react';
import { render } from 'react-dom';
import Map from './map/map.component';
import Header from './header/header.component';

class App extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div>
                <Header />
                <Map />
            </div>
        );
    }
}

export default App;
