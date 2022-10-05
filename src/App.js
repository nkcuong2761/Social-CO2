// import logo from './logo.svg';
// import './App.css'; 
// import React, { useRef, useEffect, useState } from 'react';
// import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
// import Map, { Marker } from "react-map-gl";

// mapboxgl.accessToken = 'pk.eyJ1IjoibWluaDJrIiwiYSI6ImNsOGF4Ym90NDAwamUzdm80NXF3aWtlMzUifQ.Sx32wnkCgtU13OpkmA7oEA';

// function App() {

//   // const mapContainer = useRef(null);
//   // const map = useRef(null);
//   // const [lng, setLng] = useState(-70.9);
//   // const [lat, setLat] = useState(42.35);
//   // const [zoom, setZoom] = useState(15);

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(successLocation,errorLocation,{enableHighAccuracy: true})
//   })

//   function successLocation(){
//     setupMap([position.coords.longtitude, position.coords.latitude])
//   }  

//   function errorLocation(){
    
//   }  

//   useEffect(() => {
//     if (map.current) return; // initialize map only once
//       map.current = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: 'mapbox://styles/mapbox/streets-v11', //type of map that we want 
//       center: [lng, lat],
//       zoom: zoom
//     });
//   });

//   return (
//     <div>
//       <div ref={mapContainer} className="map-container" />
//     </div>
//   );
// }

// export default App;
// import React, { useState, useEffect } from "react";
// import ReactMapGL, { Marker } from "react-map-gl"; // eslint-disable-next-line
// import "mapbox-gl/dist/mapbox-gl.css";
// import './App.css'; 
// // import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

// function App() {

//   const [viewport, setViewport] = useState({});

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition((pos) => {
//       setViewport({
//         ...viewport,
//         latitude: pos.coords.latitude,
//         longitude: pos.coords.longitude,
//         zoom: 3.5,
//       });
//     }); // eslint-disable-next-line
//   }, []);

//   return (
//     <div>
//       {viewport.latitude && viewport.longitude && (
//         <div>
//           <h1>Your Location:</h1>
//           <ReactMapGL
//             mapboxAccessToken="pk.eyJ1IjoibWluaDJrIiwiYSI6ImNsOGF4Ym90NDAwamUzdm80NXF3aWtlMzUifQ.Sx32wnkCgtU13OpkmA7oEA"
//             initialViewState={viewport}
//             mapStyle="mapbox://styles/mapbox/streets-v11"
//           ></ReactMapGL>
//             {/* <Marker
//               longitude={viewport.longitude}
//               latitude={viewport.latitude}
//             /> */}
//         </div>
//       )}
//     </div>
//   );
// }
// export default App;

import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useState, useEffect, useMemo } from "react";
import {render} from 'react-dom';
import Map, {Marker, GeolocateControl, Popup} from 'react-map-gl';
import { Button } from "react-bootstrap"; 
import LOCATIONS from './data/mock-data.json';

import {getAllBluetoothInfo} from "./bluetooth.js";

import 'mapbox-gl/dist/mapbox-gl.css';


function App() {
  const [viewport, setViewport] = useState({
    // width: "100vw",
    // height: "100vh",
    // latitude: 40.730610,
    // longtitude: -73.935242,
    // zoom: 14
  });
  const [popupInfo, setPopupInfo] = useState(null);

  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setViewport({
        ...viewport,
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        zoom: 14,
      });
    });
    // if (confirm('Connect to Aranet4 device?')) {
    //   // Save it!
    //   console.log('Connecting..');
    //   getAllBluetoothInfo();
    // } else {
    //   // Do nothing!
    //   console.log('User declined.');
    // }
  }, []);

  const pins = useMemo(
    () =>
      LOCATIONS.map((location, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={location.longitude}
          latitude={location.latitude}
          anchor="bottom"
          onClick={e => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo(location);
          }}
        >
        </Marker>
      )),
    []
  );
  
  return (
    <div className='map-container'>
    {viewport.latitude && viewport.longitude && (
    <Map
      initialViewState={viewport}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken='pk.eyJ1IjoibWluaDJrIiwiYSI6ImNsOGF4Ym90NDAwamUzdm80NXF3aWtlMzUifQ.Sx32wnkCgtU13OpkmA7oEA'
    >
      {/* <Marker longitude={viewport.longitude} latitude={viewport.latitude} color="red" /> */}
      {pins}
      {popupInfo && (
        <Popup
          anchor="top"
          longitude={Number(popupInfo.longitude)}
          latitude={Number(popupInfo.latitude)}
          onClose={() => setPopupInfo(null)}
        >
          <div>
            {popupInfo.location}, {popupInfo.CO2} | {"    "}
          </div>
        </Popup>
      )}
    </Map>
    )}

    <Button onClick={getAllBluetoothInfo}>Get all Bluetooth info</Button><br/>
    
    </div>
  )
};

export default App;