import React, {Component} from 'react'
import { Dropdown } from 'semantic-ui-react'

class PointPicker extends Component {
    constructor(props){
        super(props);
        const points = [];
        if (props.points.length) {
            props.points.forEach(point => points.push({
                text: `${point.city} ${point.pointNumber}`,
                value: point._id,
                lat: point.lat,
                lng: point.lng
            }));
        }
        this.state = {
            points: points
        }
    }
    render() {
        return (
            <div>
                <Dropdown
                    className="dropdown-points"
                    placeholder='Select Point'
                    selection
                    options={this.state.points}
                    value={this.props.value}
                    onChange={this.props.onChange}
                    search
                />
            </div>
        )
    };
};

export default PointPicker;
