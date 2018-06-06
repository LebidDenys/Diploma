import React, { Component } from 'react'
import Map from './map.component'
import './styles.css'

class MapContainer extends Component {
    state = {
        selectedPoint: {}
    };

    handleMarkerClick = marker => {
        this.setState({
            selectedPoint: marker
        })
    };

    render() {
        return (
            <div>
               <Map onMarkerClick={this.handleMarkerClick}/>
                <div  className="description-wrapper">
                    {this.state.selectedPoint && Object.keys(this.state.selectedPoint).map(key =>
                        (<span className="description-item">{key}: {this.state.selectedPoint[key]}</span>)
                    )}
                </div>
            </div>
        )
    }
}

export default MapContainer;
