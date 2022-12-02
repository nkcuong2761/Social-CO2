import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, addDoc, getDoc, getDocs, connectFirestoreEmulator } from 'firebase/firestore';

import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useState, useEffect, useMemo, useRef } from "react";
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
import mapboxgl from '!mapbox-gl';
import { useAsync } from "react-async"

const firebaseConfig = {
  apiKey: "AIzaSyCRSc9yPEA3i9unBDcVzctM00L9gB2pCmk",
  authDomain: "bucknell-social-ventilation.firebaseapp.com",
  projectId: "bucknell-social-ventilation",
  storageBucket: "bucknell-social-ventilation.appspot.com",
  messagingSenderId: "206138886904",
  appId: "1:206138886904:web:521c2645b5a5503537890d",
  measurementId: "G-WHE5G8MJBS"
};

function dataEachDay(averageHourlyCo2) {
  // let days = {Mon: [], Tue: [], Wed: [], Thu: [], Fri: [], Sat: [], Sun: []}

  const dayMap = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  
  // Convert local into GMT hour
  function localToGmtHour(hour) {
    let now = new Date();
    return (hour + now.getTimezoneOffset() / 60) % 24;
  }

  let days = Object.fromEntries( dayMap.map( x => [x, []]) )
  // console.log(`days: ${JSON.stringify(days)}`)
  function addDataToEachDay(averageHourlyCo2) {// Add data from input to days
    for (let dayOfWeek=0; dayOfWeek<7; dayOfWeek++) {
      for (let hour=8; hour<24; hour++) {
        let gmtHour = localToGmtHour(hour);
        console.log(`${hour}->${gmtHour}`);
        days[dayMap[dayOfWeek]].push(Math.round(averageHourlyCo2[`${dayOfWeek}-${gmtHour}`]));
      }
    }
  }
  addDataToEachDay(averageHourlyCo2)
  console.log(JSON.stringify(days));
  return days
}

/**
 * Read `average`, `last-updated` and `num-raws` data from `aggregated` 
 * and `general_info` from `raw` (have `category`, and `image`) for all locations.
 */
async function dataFromFirebase(db) {
  // const rawRef = collection(db, `/raw`);
  // const aggregatedRef = collection(db, `/aggregated`);
  const nameRef = collection(db, "locationNames");

  // Get names and general info each location
  const names = (await getDoc(doc(nameRef, 'data'))).data().value;
  console.log(`names: ${names}`);

  const locations = [];
  for (let i=0; i<names.length; i++) {
    const generalInfoRef = collection(db, `/raw/${names[i]}/data`);
    const aggregatedRef = collection(db, `/aggregated/${names[i]}/data`);

    const generalInfo = (await getDoc(doc(generalInfoRef, 'general-info'))).data();
    const averageHourlyCo2 = (await getDoc(doc(aggregatedRef, 'average'))).data();
    const lastUpdated = (await getDoc(doc(aggregatedRef, 'last-updated'))).data().value;
    // const numRaws = (await getDoc(doc(numRawsRef, 'num-raws'))).data().value;

    // need to change average here
    locations.push({
      "name": names[i],
      "type": generalInfo.category,
      "img": generalInfo.image,
      "longitude": generalInfo.longitude,
      "latitude": generalInfo.latitude,
      "graphInfo": dataEachDay(averageHourlyCo2),
      "lastUpdated": lastUpdated
      // "numRaws": numRaws
    })
  }

  // console.log("Done");

  // For each location, get `average`, `last-updated` and `num-raws`

  return locations;
}


function coordsCloseEnough(coord1, coord2) {
  const threshold = 0.001255839902219956 / 4;
  const distance = Math.sqrt((coord1.longitude - coord2.longitude)**2 + (coord1.latitude - coord2.latitude)**2);
  console.log(`Current distance: ${distance}`);
  if (distance < threshold)
    return true;
  return false;
}

function report(state) {
  console.log(`Permission ${state}`);
}

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function App() {

  const [viewport, setViewport] = useState({});
  const [popupInfo, setPopupInfo] = useState(null);
  const [currentPos, setCurrentPos] = useState({});
  const [newPin, setNewPin] = useState(null);
  const [locations, setLocations] = useState([]);
  const [day, setDay] = useState(0);
  const [pins, setPins] = useState(null);
  const [db, setDb] = useState(null);

  // const nameRef = collection(db, '/locationNames');
  

  useEffect(() => {
    const firebaseApp = initializeApp(firebaseConfig);
    const temp = getFirestore(firebaseApp);
    setDb(temp);
    // connectFirestoreEmulator(db, 'localhost', 8080);

    const revealPosition = (pos) => {
      console.log(`Coords: ${pos.coords.latitude} ${pos.coords.longitude}`)
      setCurrentPos({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      }); 
      setViewport({
        ...viewport,
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        zoom: 14,
      });
    };
    const positionDenied = () => {};
    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
      if (result.state === 'granted') {
        report(result.state);
        navigator.geolocation.getCurrentPosition(revealPosition,positionDenied,null);
      } else if (result.state === 'prompt') {
        report(result.state);
        navigator.geolocation.getCurrentPosition(revealPosition,positionDenied,null);
      } else if (result.state === 'denied') {
        report(result.state);
      }
      result.addEventListener('change', () => {
        report(result.state);
      });
    });
  }, []);


  // TODO: Read `average`, `last-updated` and `num-raws` data from `aggregated` 
  // and `general_info` from `raw` (have location name, type and URL) for all locations.
  // Note: Reload to load new information.
  // TODO: only get data in a certain region
  useEffect(() => {
    const fetchData = async () => {
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      const l = await dataFromFirebase(db);
      // this will log 'Hello Word' to the console
      console.log('Hello World');
      setLocations(l);
    };
  
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [db])
  

  // Need to set names, etc as arguments
  const bluetoothButtonPressed = async (lastUpdated, name, type, image, longitude, latitude) => {
    const allCo2List = await getAllBluetoothInfo();
    // Check co2Datas
    console.log(`co2: ${allCo2List.co2}`);
    console.log(`interval: ${allCo2List.interval}, ago: ${allCo2List.ago}`);
    console.log(`now : ${new Date(allCo2List.now)}`);
    console.log(`name: ${allCo2List.name}`);
    console.log(`id: ${allCo2List.id}`);
    // const name = "Mamaaaaaaaaaaa";
    // const id = "CO2_1"; // Should not need this anymore
    // const type = "University";
    // const image = "https://i.etsystatic.com/5514600/r/il/bad90f/714204774/il_570xN.714204774_3g8y.jpg";
    // const longitude = -76.8832; //Current pos before update: -76.8868352, 40.96
    // const latitude = 40.9535035; // After update: -76.8832695, 40.9535035
    await dataToFirebase(db, allCo2List, lastUpdated, name, type, image,
      longitude, latitude);
  }

  // console.log(currentPos);
  useEffect(() => {
    // console.log(`Computing markers`);
    if (currentPos && !isEmpty(locations) ) {
      console.log(`Current pos: ${currentPos.longitude}, ${currentPos.latitude}`);
      let knownLocs = [];
      knownLocs.push(locations.map((location, index) => {
      // knownLocs.push(LOCATIONS.map((location, index) => {
        console.log(`Loading location: ${JSON.stringify(location)}`);
        return (
        <Marker
          key={`marker-${index+2}`}
          // longitude={-76.88408}//{location.longitude}
          // latitude={40.95459}//{location.latitude}
          longitude={location.longitude}
          latitude={location.latitude}
          anchor="bottom"
          onClick={e => {
            // If we let the click event propagates to the map, it will immediately close the popup with `closeOnClick: true`
            // TODO: If close enough, include bluetooth button
  
            e.originalEvent.stopPropagation();
            setPopupInfo({
              ...location,
              isClose: coordsCloseEnough(location, currentPos)
            }); 
          }}
        >
        </Marker>)
      }));
      console.log(`Computing markerss`);
      // Current position
      knownLocs.push(
        <Marker
          key={`marker-0`}
          longitude={currentPos.longitude}
          latitude={currentPos.latitude}
          anchor="bottom"
          color="red"
        >
        </Marker>
      );
      console.log(`Computing markersss`);
      // console.log(`lat diff: ${(LOCATIONS.at(1).latitude - currentPos.latitude)**2}`);
      // let dist = Math.sqrt((LOCATIONS.at(1).latitude - currentPos.latitude)**2 + (LOCATIONS.at(1).longitude - currentPos.longitude)**2);
      // console.log(`dist: ${dist}`);
      setPins(knownLocs);
    }
  }, [currentPos, locations]);
  
  // console.log(`pins: ${pins}`);

  return (
    <div className='map-container'>
    <NavBox locationName={(popupInfo && popupInfo.name) ? popupInfo.name : ''} 
            newCoords={(popupInfo && popupInfo.coords) ? popupInfo.coords : ''} getBluetoothData={bluetoothButtonPressed} setPopupInfo={setPopupInfo}/>
      {viewport.latitude && viewport.longitude && (
        <DayContext.Provider value={{day, setDay}}>
          <Map
            initialViewState={viewport}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxAccessToken='pk.eyJ1IjoibWluaDJrIiwiYSI6ImNsOGF4Ym90NDAwamUzdm80NXF3aWtlMzUifQ.Sx32wnkCgtU13OpkmA7oEA'
            onClick={e => {
              var coordinates = {
                longitude: e.lngLat.lng,
                latitude: e.lngLat.lat
              }
              console.log('Lng:', coordinates.longitude, 'Lat:', coordinates.latitude);
              if (coordsCloseEnough(coordinates, currentPos)) {
                setPopupInfo({
                  // ...popupInfo,
                  coords: coordinates
                }); 
                setNewPin(<Marker
                  key={`marker-1`}
                  longitude={coordinates.longitude}
                  latitude={coordinates.latitude}
                  anchor="bottom"
                  color="blue"
                >
                </Marker>);
              }
              else {
                setPopupInfo(null);
                setNewPin(null);
              }
            }}
          >
            <GeolocateControl />            
            {pins}
            {newPin}
            {popupInfo && (
              <CardContainer img={popupInfo.img} name={popupInfo.name} type={popupInfo.type} 
                            lastUpdated={popupInfo.lastUpdated}
                            graphInfo={popupInfo.graphInfo} 
                            isClose={popupInfo.isClose}
                            coords={popupInfo.coords}
                            bluetoothButtonPressed={bluetoothButtonPressed} 
                            setPopupInfo={setPopupInfo} />
            )}
          </Map>
        </DayContext.Provider>
    )}
    </div>
  )
};

export default App;