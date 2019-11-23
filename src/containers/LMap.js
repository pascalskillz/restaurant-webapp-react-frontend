import React, { Component } from 'react'
import Leaflet from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

Leaflet.Icon.Default.imagePath =
'../node_modules/leaflet'

delete Leaflet.Icon.Default.prototype._getIconUrl;

Leaflet.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});



export default class LMap extends Component {
state = {
    lat: 40.256184,
    lng: -74.041454,
    zoom: 15,
}


render() {
    const position = [this.state.lat, this.state.lng]
    return (
    <Map center={position} zoom={this.state.zoom}>
        <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
        <Popup>
            Tandoor India Cuisuine <br/>
            1610 NJ-35, <br/>Ocean Township, <br/>NJ 07712, 
            <br/>Located in: Orchard Plaza<br/>United States<br/>
            +1 732-531-1944 <br/>
            Tandorr@gmail.com
        </Popup>
        </Marker>
    </Map>
    )
}
}
