import React from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";

export default class MyMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 45.4215,
      lng: -75.6972,
      zoom: 14,
    };
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    const centre = [45.40226, -75.68882];
    return (
      <MapContainer center={centre} zoom={this.state.zoom} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            Ottawa.
          </Popup>
        </Marker>
        <Marker position={[45.3831, -75.6976]}>
          <Popup>
            Carleton University
          </Popup>
        </Marker>
      </MapContainer>
    );
  }
}
