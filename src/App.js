import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useState, useEffect, useMemo } from "react";
import {render} from 'react-dom';
import Map, {Marker, GeolocateControl, Popup} from 'react-map-gl';
import LOCATIONS from './assets/mock-data.json';
import { CardContainer } from './components/CardContainer';
import {getAllBluetoothInfo} from "./bluetooth.js";
import { dataToFirebase } from './dataToFirebase.js';
import 'mapbox-gl/dist/mapbox-gl.css';
import './App.scss';
import { NavBox } from './components/NavBox';
import { DayContext } from './Context';


function App() {

  const [viewport, setViewport] = useState({});
  const [popupInfo, setPopupInfo] = useState(null);
  const [day, setDay] = useState(0);

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

  const bluetoothButtonPressed = async () => {
    const allCo2List = await getAllBluetoothInfo();
      // Check co2Datas
      console.log(`co2: ${allCo2List.co2}`);
      console.log(`interval: ${allCo2List.interval}, ago: ${allCo2List.ago}`);
      console.log(`now : ${new Date(allCo2List.now)}`);
      console.log(`co2: ${allCo2List.name}`);
      console.log(`co2: ${allCo2List.id}`);
      dataToFirebase("Dana117", "CO2_2", "University", allCo2List, "https://i.etsystatic.com/5514600/r/il/bad90f/714204774/il_570xN.714204774_3g8y.jpg");
  }
   
  return (
    <div className='map-container'>
    <NavBox locationName={(popupInfo) ? popupInfo.name : ''} getBluetoothData={bluetoothButtonPressed}/>
    {/* <Button onclick=bluetoothButtonPressed value="Get all Bluetooth info" id='bluetoothButton'/> */}
      {viewport.latitude && viewport.longitude && (
        <DayContext.Provider value={{day, setDay}}>
          <Map
            initialViewState={viewport}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxAccessToken='pk.eyJ1IjoibWluaDJrIiwiYSI6ImNsOGF4Ym90NDAwamUzdm80NXF3aWtlMzUifQ.Sx32wnkCgtU13OpkmA7oEA'
            onClick={() => setPopupInfo(null)}
          >
            {pins}
            {popupInfo && (
              <CardContainer img={popupInfo.img} name={popupInfo.name} type={popupInfo.type} CO2={popupInfo.CO2} setPopupInfo={setPopupInfo} />
            )}
          </Map>
        </DayContext.Provider>
    )}
    </div>
  )
};

export default App;