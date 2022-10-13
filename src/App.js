import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useState, useEffect, useMemo } from "react";
import {render} from 'react-dom';
import Map, {Marker, GeolocateControl, Popup} from 'react-map-gl';
import LOCATIONS from './assets/mock-data.json';
import { LocationCard } from './components/LocationCard';
import { Button } from "react-bootstrap"; 
import {getAllBluetoothInfo} from "./bluetooth.js";
import 'mapbox-gl/dist/mapbox-gl.css';
// import './App.scss';


function App() {
  // const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  const [viewport, setViewport] = useState({
    // width: "100vw",
    // height: "100vh",
    // latitude: 40.730610,
    // longtitude: -73.935242,
    // zoom: 14
  });
  const [popupInfo, setPopupInfo] = useState(null);
  // const [bluetoothInfo, setBluetoothInfo] = useState(null);

  // useEffect(() => {
  //   setBluetoothInfo(getAllBluetoothInfo())
  // }, [])

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
      <>
      <Button onClick={getAllBluetoothInfo}>Get all Bluetooth info</Button>
      <Map
        initialViewState={viewport}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken='pk.eyJ1IjoibWluaDJrIiwiYSI6ImNsOGF4Ym90NDAwamUzdm80NXF3aWtlMzUifQ.Sx32wnkCgtU13OpkmA7oEA'
      >
        {/* <Marker longitude={viewport.longitude} latitude={viewport.latitude} color="red" /> */}
        {pins}
        {popupInfo && (
          <LocationCard img={popupInfo.img} name={popupInfo.name} type={popupInfo.type} CO2={popupInfo.CO2} setPopupInfo={setPopupInfo}/>
        )}
      </Map>
      </>
    )}
    </div>
  )
};

export default App;