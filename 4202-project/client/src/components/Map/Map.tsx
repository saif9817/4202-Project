import React, { useEffect, useState } from "react";
import { LatLngExpression } from "leaflet";
import { MapContainer, TileLayer, Marker, Tooltip, Polyline, LayersControl, GeoJSON } from "react-leaflet";
import { connect } from "react-redux";
import { setPlacePreviewVisibility, setSelectedPlace } from "../../store/actions";
import { IState, Place } from "../../store/models";
import "./Header.css";
import AddMarker from "./AddMarker";
import CyclingMap from "./CyclingMap";
import "./Map.css";
import { Elevation } from "../API/Elevation";

const Map = ({
  isVisible,
  places,
  selectedPlace,
  togglePreview,
  setPlaceForPreview
}: any) => {
  const defaultPosition: LatLngExpression = [45.40226, -75.68882];; // Ottawa position

  const showPlace = (place: Place) => {
    setPlaceForPreview(place);
    togglePreview(true);
  };

  const [useElev, setElev] = useState(true);

  const [useTime, setTime] = useState(0);

  const Cycling : GeoJSON.FeatureCollection<any> = CyclingMap;

  const layerCenter: LatLngExpression = [45.40226, -75.68882];

  const pathArr : LatLngExpression[] = []


  return (
    <div>
      <div className="header__container">
        <button
          style={{
            fontSize: "2rem",
            verticalAlign: "middle",
            position: "absolute",
            left: "1rem",
            top: "15px",
          }}
          onClick={() => {
            setElev(!useElev);
          }}
        >
          {useElev ? "Using Elevation" : "Not Using Elevation"}
        </button>
        <span>Ottawa</span>
        <button
          style={{
            fontSize: "2rem",
            verticalAlign: "middle",
            position: "absolute",
            right: "1rem",
            top: "15px",
          }}
          onClick={async() => {
            setTime(await Elevation(places[0].position.join(","), places[1].position.join(",")))
            console.log(useTime)
          }}
        >
          Calculate Route
        </button>
      </div>
      <div className="map__container">
        <MapContainer
          center={defaultPosition}
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: "100vh" }}
          zoomControl={true}
        >
          <LayersControl position="topright">
            <LayersControl.Overlay name="Cycling Network">
              <GeoJSON attribution="Ottawa" data={Cycling} />
            </LayersControl.Overlay>
            <LayersControl.Overlay name="Path">
              <Polyline positions={pathArr} color="red" />
            </LayersControl.Overlay>
          </LayersControl>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {places.map((place: Place) => (
            <Marker
              key={place.title}
              position={place.position}
              eventHandlers={{
                click: () => {
                  console.log(CyclingMap);
                },
              }}
            >
              <Tooltip>{place.title}</Tooltip>
            </Marker>
          ))}
          <AddMarker />
        </MapContainer>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IState) => {
  const { places } = state;
  return {
    isVisible: places.placePreviewsIsVisible,
    places: places.places,
    selectedPlace: places.selectedPlace,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    togglePreview: (payload: boolean) =>
      dispatch(setPlacePreviewVisibility(payload)),
    setPlaceForPreview: (payload: Place) =>
      dispatch(setSelectedPlace(payload)),
  };
};

// const mapDispatchToElevation = (dispatch: any) => {
//   return {
//     Elevation: (payload: string) =>
//       dispatch(Elevation(payload))
//   };
// };

export default connect(mapStateToProps, mapDispatchToProps)(Map);
