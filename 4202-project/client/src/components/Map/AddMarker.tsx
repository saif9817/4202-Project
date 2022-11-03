import React, { useState } from "react";
import { LatLng, LatLngExpression } from "leaflet";
import { Marker, useMapEvents, Tooltip } from "react-leaflet";
import { connect } from "react-redux";
import {
  setPlaceFormVisibility,
  setPrePlaceLocation,
} from "../../store/actions";
import { IState } from "../../store/models";

const AddMarker = ({ formIsOpen, toggleForm, setLocation }: any) => {
  const [position, setPosition] = useState(
    (null as unknown) as LatLngExpression
  );
  const [startMarker, setStartMarker] = useState(false);
  const [endMarker, setEndMarker] = useState(false);
  const [title, setTitle] = useState("");

  useMapEvents({
    click: (e) => {
      if (!startMarker) {
        setStartMarker(true);
        setTitle("Start");
      } else {
        if (!endMarker) {
          setEndMarker(true);
          setTitle("End");
        } else { //replace this with a clear and figure out how to make them persistent
          setStartMarker(true);
          setEndMarker(false);
          setTitle("Start");
        }
      }
      console.log(startMarker, endMarker);
      setPosition(e.latlng);
      setLocation(e.latlng);
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Tooltip>{title}</Tooltip>
    </Marker>
  );
};

const mapStateToProps = (state: IState) => {
  const { places } = state;

  return {
    formIsOpen: places.placeFormIsVisible,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    toggleForm: (payload: boolean) => dispatch(setPlaceFormVisibility(payload)),
    setLocation: (payload: LatLng) => dispatch(setPrePlaceLocation(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddMarker);


//OLD CODE snippets still need to keep to consult some of it

// import {
//   setPlaceFormVisibility,
//   setPrePlaceLocation,
// } from "../../store/actions";

// import { IState } from "../../store/models";
//   useMapEvents({
//     click: (e) => {
//       toggleForm(true);
//     },
//   });

//   return !formIsOpen || position === null ? null : (
//     <Marker position={position}></Marker>
//   );
// };

// const mapStateToProps = (state: IState) => {
//   const { places } = state;

//   return {
//     formIsOpen: places.placeFormIsVisible,
//   };
// };

// const mapDispatchToProps = (dispatch: any) => {
//   return {
//     toggleForm: (payload: boolean) => dispatch(setPlaceFormVisibility(payload)),
//     setLocation: (payload: LatLng) => dispatch(setPrePlaceLocation(payload)),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(AddMarker);