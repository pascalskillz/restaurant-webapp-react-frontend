import React, { Component } from 'react';
import map from './maps';

class MapImport extends Component {
    render() {
        return  (
            <div>
                <map
                    google={this.props.google}
                    center={{lat: 18.5204, lng: 73.8567 }}
                    height='300px'
                    zoom={15}
                    />


            </div>
        );
    }

}

export default MapImport;
