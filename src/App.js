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
import * as BLUETOOTH from './data/bluetooth_constants';

import 'mapbox-gl/dist/mapbox-gl.css';

function buf2hex (buffer) {
  // Utility function to convert a buffer to hex values
  return Array.from(new Uint8Array (buffer))
      .map (b => b.toString (16).padStart (2, "0"))
      .join (" ");
}

function parseAsUint16NumbersLittleEndianSpaced(data) {
  if (data.byteLength < 2) {
      return [];
  }
  const uint16Numbers = [];
  for (let i = 0; i < (data.byteLength/2); i++) {
      if ((i*2) > data.byteLength) {
          debugger;
      }
      uint16Numbers[i] = data.getUint16(i*2, true); // TODO: Will try getUint16 and getUint8 to get headers
  }
  // debugger;
  const numberStringArray = uint16Numbers.map((uint8Number) => {
      return String(uint8Number);
  })
  return numberStringArray;
}

function aranet4DeviceRequestOptions() {
  const filter = {
      services: [BLUETOOTH.ARANET4_SENSOR_SERVICE_UUID]
  }
  const services = [

      //KNOWN aranet4 services
      'battery_service',
      'device_information',
      'generic_attribute',
      'generic_access',
      
      
      //Aranet4 SHOULD support these, but no.
      'environmental_sensing',
      'immediate_alert',

      
      //Purely investigatory services to query. I haven't seen these, but I'd be curious if they show up!
      // 'alert_notification',
      // 'automation_io', //https://www.bluetooth.org/docman/handlers/DownloadDoc.ashx?doc_id=304971
      'bond_management',
      // 'current_time',
      'link_loss',
      // 'mesh_provisioning',
      // 'mesh_proxy',
      // 'reference_time_update',
      'reconnection_configuration',
      'scan_parameters',
      'tx_power',
      // 'user_data',
    ];

  const deviceRequestOptions = {
      filters: [filter],
      optionalServices: services,
      acceptAllDevices: false
  }
  return deviceRequestOptions;

}

async function getADevice() {

  const options = aranet4DeviceRequestOptions();

  console.assert(navigator.bluetooth);
  console.assert(navigator.bluetooth.requestDevice);
  //https://developer.mozilla.org/en-US/docs/Web/API/Bluetooth/requestDevice
  //https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/modules/bluetooth/bluetooth.h;l=47?q=requestDevice%20lang:C%2B%2B&ss=chromium
  const device = await navigator.bluetooth.requestDevice(options);
  return device;
}

function checkServiceNames(services) {
  for (let serviceIndex = 0; serviceIndex < services.length; serviceIndex++) {
      const uuid = services[serviceIndex].uuid;
      const short_uuid = uuid.substring(4, 8).toUpperCase();
      if (BLUETOOTH.GENERIC_GATT_SERVICE_UUID_DESCRIPTIONS.has(uuid)) {
          const serviceName = BLUETOOTH.GENERIC_GATT_SERVICE_UUID_DESCRIPTIONS.get(uuid);
          console.log(`\tservices[${serviceIndex}].uuid: ${uuid}... Known service! ${serviceName}`);
      }
      else if (BLUETOOTH.GENERIC_GATT_SERVICE_SHORT_ID_DESCRIPTIONS.has(short_uuid)) {
          const serviceName = BLUETOOTH.GENERIC_GATT_SERVICE_SHORT_ID_DESCRIPTIONS.get(short_uuid);
          console.log(`\tservices[${serviceIndex}].uuid: ${uuid}... Known service! ${serviceName}`);
      }
      else {
        console.log(`\tservices[${serviceIndex}].uuid: ${uuid}`);
      }
  }
}

function dumpBluetoothCharacteristicProperties(properties, serviceIndex, characteristicIndex) {
  // readonly broadcast: boolean;
  // readonly read: boolean;
  // readonly writeWithoutResponse: boolean;
  // readonly write: boolean;
  // readonly notify: boolean;
  // readonly indicate: boolean;
  // readonly authenticatedSignedWrites: boolean;
  // readonly reliableWrite: boolean;
  // readonly writableAuxiliaries: boolean;

  let messages = "";
  messages += (`\tservices[${serviceIndex}], characteristics[${characteristicIndex}].properties:\n`);
  if (properties.broadcast) {
      messages += (`\t\tbroadcast: ${properties.broadcast}\n`);
  }
  if (properties.read) {
      messages += (`\t\tread: ${properties.read}\n`);
  }
  if (properties.writeWithoutResponse) {
      messages += (`\t\twriteWithoutResponse: ${properties.writeWithoutResponse}\n`);
  }
  if (properties.write) {
      messages += (`\t\twrite: ${properties.write}\n`);
  }
  if (properties.notify) {
      messages += (`\t\tnotify: ${properties.notify}\n`);
  }
  if (properties.indicate) {
      messages += (`\t\tindicate: ${properties.indicate}\n`);
  }
  if (properties.authenticatedSignedWrites) {
      messages += (`\t\tauthenticatedSignedWrites: ${properties.authenticatedSignedWrites}\n`);
  }
  if (properties.reliableWrite) {
      messages += (`\t\treliableWrite: ${properties.reliableWrite}\n`);
  }
  if (properties.writableAuxiliaries) {
      messages += (`\t\twritableAuxiliaries: ${properties.writableAuxiliaries}\n`);
  }
  return messages;
}

async function readableCharacteristic(characteristics, characteristicIndex) {
  //https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/modules/bluetooth/bluetooth_error.cc;l=142?q=requestDevice%20lang:C%2B%2B&ss=chromium
  try {
      const data = await characteristics[characteristicIndex].readValue();

      const SET_HISTORY_PARAM_INDEX = 1;
      console.assert(characteristics[SET_HISTORY_PARAM_INDEX].uuid == BLUETOOTH.ARANET_SET_HISTORY_PARAMETER_UUID);
      if (characteristics[characteristicIndex].uuid == BLUETOOTH.ARANET_SENSOR_LOGS_UUID) {
        try {
          // Request history (temperature)
          //const value = new Uint8Array([0x61, 0x01, 0x01, 0x00]); // Temp 
          //const value = new Uint8Array([0x61, 0x02, 0x01, 0x00]); // Humidity
          //const value = new Uint8Array([0x61, 0x03, 0x01, 0x00]); // Pressure
          const value = new Uint8Array([0x61, 0x04, 0x01, 0x00]); // CO2
          await characteristics[SET_HISTORY_PARAM_INDEX].writeValueWithResponse(value);

          let packet = await characteristics[characteristicIndex].readValue();
          console.log(`packet.byteLength: ${packet.byteLength}`);
          console.log(`Hex data: ${buf2hex(packet.buffer)}`);
          
          if (packet.byteLength > 10) { 
              // TODO: Need to parse the header

              const asLEUint16 = parseAsUint16NumbersLittleEndianSpaced(new DataView(data.buffer, 10));
              console.log(`Length ${asLEUint16.length}: ${asLEUint16.toString()}`);
          
              // Again
              for (let i = 0; i < 50; i++) {
                  packet = await characteristics[characteristicIndex].readValue();
                  console.log(`packet.byteLength: ${packet.byteLength}`);
                  console.log(`Hex data: ${buf2hex(packet.buffer)}`);
                  if (packet.byteLength <= 10) continue; 
                  const asLEUint16 = parseAsUint16NumbersLittleEndianSpaced(new DataView(packet.buffer, 10));
                  console.log(`${i} - Length ${asLEUint16.length}: ${asLEUint16.toString()}`);
              }
          }
        }
        catch (e) {
            if (e instanceof DOMException) {
                console.log(`\t\tCannot write?? to ${characteristics[1].uuid}! Error code: '${e.code}', Error message: '${e.message}'`);
            }
            else {
                throw e;
            }
        }
      }
  }
  catch (e) {
      if (e instanceof DOMException) {
          console.log(`\t\tCannot read from ${characteristics[characteristicIndex].uuid}! Error code: '${e.code}', Error message: '${e.message}'`);
      }
      else {
          throw e;
      }
  }
}

function checkKnownFunctionDescription(characteristics, characteristicIndex) {
  if (BLUETOOTH.aranet4KnownCharacteristicUUIDDescriptions.has(characteristics[characteristicIndex].uuid)) {
      console.log(`\t\tKnown Aranet4 characteristic! '${BLUETOOTH.aranet4KnownCharacteristicUUIDDescriptions.get(characteristics[characteristicIndex].uuid)}'`);
      return;
  }
  else if (BLUETOOTH.GENERIC_GATT_SERVICE_UUID_DESCRIPTIONS.has(characteristics[characteristicIndex].uuid)) {
      console.log(`\t\tKnown generic GATT characteristic! '${BLUETOOTH.GENERIC_GATT_SERVICE_UUID_DESCRIPTIONS.get(characteristics[characteristicIndex].uuid)}'`);
      return;
  }
  console.log(`\t\tUNKNOWN GATT characteristic! '${characteristics[characteristicIndex].uuid}'`);
}

async function loopOverCharacteristics(characteristics, serviceIndex) {
  for (let characteristicIndex = 0; characteristicIndex < characteristics.length; characteristicIndex++) {
      console.log(`\tservices[${serviceIndex}], characteristics[${characteristicIndex}].uuid: ${characteristics[characteristicIndex].uuid}`);
      checkKnownFunctionDescription(characteristics, characteristicIndex);
      const propertiesString = dumpBluetoothCharacteristicProperties(characteristics[characteristicIndex].properties, serviceIndex, characteristicIndex);
      console.log(propertiesString);
      if (characteristics[characteristicIndex].properties.read) {
          await readableCharacteristic(characteristics, characteristicIndex);
      }
      console.log('\n');
  }
}

async function loopOverServices(services) {
  for (let serviceIndex = 0; serviceIndex < services.length; serviceIndex++) {
      const uuid = services[serviceIndex].uuid;
      console.log(`services[${serviceIndex}].uuid: ${uuid}`);
      // debugger;
      // if(GENERIC_GATT_SERVICE_UUID_DESCRIPTIONS.has(services[serviceIndex].uuid.substring(0,8))) {
      //     debugger;
      // }
      //
      const short_uuid = uuid.substring(4, 8).toUpperCase();
      if (BLUETOOTH.GENERIC_GATT_SERVICE_UUID_DESCRIPTIONS.has(uuid)) {
          const serviceName = BLUETOOTH.GENERIC_GATT_SERVICE_UUID_DESCRIPTIONS.get(uuid);
          console.log(`services[${serviceIndex}].uuid: ${uuid}... Known service! ${serviceName}`);
      }
      else if (BLUETOOTH.GENERIC_GATT_SERVICE_SHORT_ID_DESCRIPTIONS.has(short_uuid)) {
          const serviceName = BLUETOOTH.GENERIC_GATT_SERVICE_SHORT_ID_DESCRIPTIONS.get(short_uuid);
          console.log(`\t\tKnown service! ${serviceName}`);
      }

      console.log(`services[${serviceIndex}].isPrimary: ${services[serviceIndex].isPrimary}`);
      // debugger;
      //getCharacteristics can fail!
      //Unhandled Rejection (NetworkError): Failed to execute 'getCharacteristics' on 'BluetoothRemoteGATTService': GATT Server is disconnected. Cannot retrieve characteristics. (Re)connect first with `device.gatt.connect`.
      const characteristics = await services[serviceIndex].getCharacteristics();

      console.log(`Got characteristics (length ${characteristics.length}):`);
      await loopOverCharacteristics(characteristics, serviceIndex);
      console.log('\n');
  }
}

async function getAllBluetoothInfo() {
  console.log("getting device");
  console.log(`This is one: ${1}`);
  const device = await getADevice();

  //https://source.chromium.org/chromium/chromium/src/+/main:content/browser/bluetooth/web_bluetooth_service_impl.cc;drc=0a303e330572dd85a162460d4d9e9959e2c917a6;bpv=1;bpt=1;l=1986?q=requestDevice%20lang:C%2B%2B&ss=chromium
  console.log(`device.id: ${device.id} (unique)`);
  console.log(`device.name: ${device.name}`);

  if (device.gatt === undefined) {
      debugger;
      return;
  }
  debugger;
  const deviceServer = await device.gatt.connect();

  const services = await deviceServer.getPrimaryServices();
  console.log(`${services.length} services:`);
  checkServiceNames(services);

  console.log(`----`);
  console.log(`----`);


  console.log(`Got services (length: ${services.length}):`);
  await loopOverServices(services);
  // After that, send data to server
}

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