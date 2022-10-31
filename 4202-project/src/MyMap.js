import React from "react";
import { MapContainer, TileLayer, Marker} from "react-leaflet";
import {useMap} from "react-leaflet/hooks";

export default class MyMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 45.4215,
      lng: 75.6972,
      zoom: 7,
    };
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <MapContainer center={position} zoom={this.state.zoom}>
      </MapContainer>
    );
  }
}
