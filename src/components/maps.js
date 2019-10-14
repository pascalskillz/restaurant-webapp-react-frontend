import React, { Component } from 'react';
import { Maps, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

class Maps  extends React.Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
         lat: -1.2884,
         lng: 36.8233
        }}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyA7IlTzWHoo8InZXKMsMluISUIlN2xgdxQ')
})(Maps);