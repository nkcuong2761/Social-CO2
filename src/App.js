import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useState, useEffect, useMemo } from "react";
import {render} from 'react-dom';
import Map, {Marker, GeolocateControl, Popup} from 'react-map-gl';
import LOCATIONS from './assets/mock-data.json';
import { CardContainer } from './components/CardContainer';
import Button from "./components/Button"; 
import {getAllBluetoothInfo} from "./bluetooth.js";
import { dataToFirebase } from './dataToFirebase.js';
import 'mapbox-gl/dist/mapbox-gl.css';

function App() {

  const [viewport, setViewport] = useState({});
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
            // If we let the click event propagates to the map, it will immediately close the popup with `closeOnClick: true`
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
      console.log(`name: ${allCo2List.name}`);
      console.log(`id: ${allCo2List.id}`);
      await dataToFirebase("Library", "CO2_1", "University", allCo2List, "https://i.etsystatic.com/5514600/r/il/bad90f/714204774/il_570xN.714204774_3g8y.jpg");
    }} value="Get all Bluetooth info" id='bluetoothButton'/>
      {viewport.latitude && viewport.longitude && (
      <>
      <Map
        initialViewState={viewport}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken='pk.eyJ1IjoibWluaDJrIiwiYSI6ImNsOGF4Ym90NDAwamUzdm80NXF3aWtlMzUifQ.Sx32wnkCgtU13OpkmA7oEA'
      >
        {pins}
        {popupInfo && (
          <CardContainer img={popupInfo.img} name={popupInfo.name} type={popupInfo.type} CO2={popupInfo.CO2} setPopupInfo={setPopupInfo} />
        )}
      </Map>
      </>
    )}
    </div>
  )
};

export default App;


