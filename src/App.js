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

//import firebase from 'firebase/app';
import 'firebase/firestore';
//import {useCollectionData} from 'react-firebase-hooks/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, addDoc, getDoc, getDocs } from 'firebase/firestore';
// import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js';

const firebaseConfig = {
  apiKey: "AIzaSyCRSc9yPEA3i9unBDcVzctM00L9gB2pCmk",
  authDomain: "bucknell-social-ventilation.firebaseapp.com",
  projectId: "bucknell-social-ventilation",
  storageBucket: "bucknell-social-ventilation.appspot.com",
  messagingSenderId: "206138886904",
  appId: "1:206138886904:web:521c2645b5a5503537890d",
  measurementId: "G-WHE5G8MJBS"
};

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

useEffect(async()=>{
  
const firebaseApp = initializeApp(firebaseConfig);
// const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

//Delete collection in command line: 
//firebase login
//firebase firestore:delete -r collectionName --project bucknell-social-ventilation

// Upload data manually
const locationRef = collection(db, "Dana116");

await setDoc(doc(locationRef, "CO2_1"), {
    category: "University",
    co2: [1534183990,10,300,400], //actually just all number, so can be [1534183990, 10, 200, 300] as [timestamp, timestep, all CO2 level]
    image: "https://i.etsystatic.com/5514600/r/il/bad90f/714204774/il_570xN.714204774_3g8y.jpg"
});

await setDoc(doc(locationRef, "CO2_2"), {
    category: "University",
    co2: [153419000,10,200,400], 
    image: "https://i.etsystatic.com/5514600/r/il/bad90f/714204774/il_570xN.714204774_3g8y.jpg"
});

const locationRef1 = collection(db, "Cole10");
await setDoc(doc(locationRef1, "CO2_1"), {
    category: "University",
    co2: [1534183990,10,300,400],
    image: "https://i.etsystatic.com/5514600/r/il/bad90f/714204774/il_570xN.714204774_3g8y.jpg"
});

await setDoc(doc(locationRef1, "CO2_2"), {
    category: "University",
    co2: [2534183990,10,400,200],
    image: "https://i.etsystatic.com/5514600/r/il/bad90f/714204774/il_570xN.714204774_3g8y.jpg"
});


// Getting data manually
const docRef1 = doc(db, "Dana116", "CO2_1");
const docSnap1 = await getDoc(docRef1);

if (docSnap1.exists()) {
    console.log("Document data:", docSnap1.data());
} else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
}

const docRef2 = doc(db, "Dana116", "CO2_2");
const docSnap2 = await getDoc(docRef2);

if (docSnap2.exists()) {
    console.log("Document data:", docSnap2.data());
} else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
}

const docRef3 = doc(db, "Cole10", "CO2_1");
const docSnap3 = await getDoc(docRef3);

if (docSnap3.exists()) {
    console.log("Document data:", docSnap3.data());
} else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
}

const docRef4 = doc(db, "Cole10", "CO2_2");
const docSnap4 = await getDoc(docRef4);

if (docSnap4.exists()) {
    console.log("Document data:", docSnap4.data());
} else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
}

},[]);


  
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

    <Button onClick={() => {
      const temp = getAllBluetoothInfo();
      // Check co2Data
      console.log(`co2: ${allCo2List.co2}`);
      console.log(`interval: ${allCo2List.interval}, ago: ${allCo2List.ago}`);
      console.log(`now : ${new Date(allCo2List.now)}`);
      // asdfadsf(temp);
    }}>Get all Bluetooth info</Button><br/>
    
    </div>
  )
};

export default App;


