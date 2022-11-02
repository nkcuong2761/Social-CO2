import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useState, useEffect, useMemo } from "react";
import {render} from 'react-dom';
import Map, {Marker, GeolocateControl, Popup} from 'react-map-gl';
import { Button } from "react-bootstrap"; 
import LOCATIONS from './data/mock-data.json';

import {getAllBluetoothInfo} from "./bluetooth.js";
import { dataToFirebase } from './dataToFirebase.js';
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
    <Button onClick={async () => {
      const allCo2List = await getAllBluetoothInfo();
      // Check co2Datas
      console.log(`co2: ${allCo2List.co2}`);
      console.log(`interval: ${allCo2List.interval}, ago: ${allCo2List.ago}`);
      console.log(`now : ${new Date(allCo2List.now)}`);
      console.log(`co2: ${allCo2List.name}`);
      console.log(`co2: ${allCo2List.id}`);
      dataToFirebase("Dana117", "CO2_2", "University", allCo2List, "https://i.etsystatic.com/5514600/r/il/bad90f/714204774/il_570xN.714204774_3g8y.jpg");
    }}>Get all Bluetooth info</Button><br/>{viewport.latitude && viewport.longitude && (
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
    </div>
  )
};

export default App;


