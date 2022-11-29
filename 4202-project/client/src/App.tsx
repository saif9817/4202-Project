import React from "react";
import "./App.css";


import Map from "./components/Map/Map";
import Search from "./components/Search/Search";
import Preview from "./components/Preview/Preview";
import Form from "./components/Form/Form";
import Elevation from "./components/API/Elevation";

function App() {
  Elevation('56.35,123.90', '123,456');
   
  return (
    <>
      <main>
        <Map />
        <Preview />
        <Form />
      </main>
    </>
  );
}

export default App;
