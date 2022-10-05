import * as BLUETOOTH from './data/bluetooth_constants';

function buf2hex(buffer) {
    // Utility function to convert a buffer to hex values
    return Array.from(new Uint8Array(buffer))
        .map(b => b.toString(16).padStart(2, "0"))
        .join(" ");
}

function parseAsUint16NumbersLittleEndianSpaced(data) {
    if (data.byteLength < 2) {
        return [];
    }
    const uint16Numbers = [];
    for (let i = 0; i < (data.byteLength / 2); i++) {
        if ((i * 2) > data.byteLength) {
            debugger;
        }
        uint16Numbers[i] = data.getUint16(i * 2, true);
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

async function getCo2DataFromCharacteristics(characteristics, sensorLogsIndex, setHistoryParamIndex) {
    //https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/modules/bluetooth/bluetooth_error.cc;l=142?q=requestDevice%20lang:C%2B%2B&ss=chromium
    const allCo2List = [];
    let interval = -1;
    let ago = -1;

    // TODO: Two different try-catch blocks
    try {
        const data = await characteristics[sensorLogsIndex].readValue();
        console.assert(characteristics[setHistoryParamIndex].uuid === BLUETOOTH.ARANET_SET_HISTORY_PARAMETER_UUID);
        console.assert(characteristics[sensorLogsIndex].uuid === BLUETOOTH.ARANET_SENSOR_LOGS_UUID)
        try {
            // Request history (temperature)
            //const value = new Uint8Array([0x61, 0x01, 0x01, 0x00]); // Temp 
            //const value = new Uint8Array([0x61, 0x02, 0x01, 0x00]); // Humidity
            //const value = new Uint8Array([0x61, 0x03, 0x01, 0x00]); // Pressure
            const value = new Uint8Array([0x61, 0x04, 0x01, 0x00]); // CO2
            await characteristics[setHistoryParamIndex].writeValueWithResponse(value);

            let packet = await characteristics[sensorLogsIndex].readValue();
            // console.log(`packet.byteLength: ${packet.byteLength}`);
            // console.log(`Hex data: ${buf2hex(packet.buffer)}`);
            let header = {
                "param": packet.getUint8(0, true), // 1 is temp, 2 humidity, 3 pressure, 4 co2
                "interval": packet.getUint16(1, true), // between each measurement
                "total_readings": packet.getUint16(3, true), // total number of readings possible
                "ago": packet.getUint16(5, true), // current measurement was taken [ago] seconds ago
                "start": packet.getUint16(7, true), // start index
                "count": packet.getUint8(9, true), // number of measurements in current packet
            };
            console.log(`Header: ${JSON.stringify(header)}`);
            console.assert(header.param === 4, header.param); // ensure we're getting CO2
            let total_num_readings = header.total_readings;
            interval = header.interval;
            ago = header.ago;
            // console.log(`Hex data, after: ${buf2hex(packet.buffer)}`);
            // console.log(`Header: ${[data.getUint8(0, true), data.getUint16(1, true), data.getUint16(3, true), 
            // data.getUint16(5, true), data.getUint16(7, true),  data.getUint8(9, true),]}`);

            let currentCount = 0;
            if (packet.byteLength > 10) {
                const co2List = parseAsUint16NumbersLittleEndianSpaced(new DataView(packet.buffer, 10));
                // console.log(`Length ${co2List.length}: ${co2List.toString()}`);
                allCo2List.push.apply(allCo2List, co2List.slice(0, header.count))
                currentCount += header.count;

                // Again
                // TODO: iterate till total_num_readings only
                while (currentCount < total_num_readings) {
                    packet = await characteristics[sensorLogsIndex].readValue();
                    // console.log(`packet.byteLength: ${packet.byteLength}`);
                    // console.log(`Hex data: ${buf2hex(packet.buffer)}`);
                    if (packet.byteLength <= 10) continue;
                    const co2List = parseAsUint16NumbersLittleEndianSpaced(new DataView(packet.buffer, 10));
                    // console.log(`${i} - Length ${co2List.length}: ${co2List.toString()}`);

                    header = {
                        "param": packet.getUint8(0, true), // 1 is temp, 2 humidity, 3 pressure, 4 co2
                        "interval": packet.getUint16(1, true), // between each measurement
                        "total_readings": packet.getUint16(3, true), // total number of readings possible
                        "ago": packet.getUint16(5, true), // current measurement was taken [ago] seconds ago
                        "start": packet.getUint16(7, true), // start index
                        "count": packet.getUint8(9, true), // number of measurements in current packet
                    };
                    // console.log(`header: ${JSON.stringify(header)}`);
                    console.assert(header.param === 4, header.param); // ensure we're getting CO2
                    console.assert(header.interval === interval, header.interval); // the interval should be consistent (TODO: need testing)
                    allCo2List.push.apply(allCo2List, co2List.slice(0, header.count));
                    currentCount += header.count;
                }
            }
        }
        catch (e) {
            if (e instanceof DOMException) {
                // TODO: If can't write into right place, display
                console.log(`\t\tCannot write?? to ${characteristics[setHistoryParamIndex].uuid}! Error message: '${e.message}'`);
            }
            else {
                throw e;
            }
        }
    }
    catch (e) {
        if (e instanceof DOMException) {
            // TODO: If can't read, display
            console.log(`\t\tCannot read from ${characteristics[sensorLogsIndex].uuid}! Error message: '${e.message}'`);
        }
        else {
            throw e;
        }
    }
    return {
        "co2": allCo2List,
        "ago": ago, // current measurement was taken [ago] seconds ago
        "interval": interval // between each measurement
    }
}

async function loopOverCharacteristics(characteristics) {
    // Find the needed characteristics
    let setHistoryParamIndex = 0;
    let sensorLogsIndex = 0;
    for (let characteristicIndex = 0; characteristicIndex < characteristics.length; characteristicIndex++) {
        console.log(`\tcharacteristics[${characteristicIndex}].uuid: ${characteristics[characteristicIndex].uuid}`);
        if (characteristics[characteristicIndex].uuid === BLUETOOTH.ARANET_SET_HISTORY_PARAMETER_UUID) {
            setHistoryParamIndex = characteristicIndex;
        }
        else if (characteristics[characteristicIndex].uuid === BLUETOOTH.ARANET_SENSOR_LOGS_UUID) {
            sensorLogsIndex = characteristicIndex
        }
    }

    if (setHistoryParamIndex === 0) {
        console.log("Set History Parameters characteristics not found!");
        // TODO: Throw Error
    }
    else if (sensorLogsIndex === 0) {
        console.log("Sensor Logs characteristics not found!");
        // TODO: Throw Error
    }

    return await getCo2DataFromCharacteristics(characteristics, sensorLogsIndex, setHistoryParamIndex);
}

async function loopOverServices(services) {
    let characteristics = null;
    for (let serviceIndex = 0; serviceIndex < services.length; serviceIndex++) {
        const uuid = services[serviceIndex].uuid;
        console.log(`services[${serviceIndex}].uuid: ${uuid}`);

        const short_uuid = uuid.substring(4, 8).toUpperCase();
        if (!BLUETOOTH.GENERIC_GATT_SERVICE_UUID_DESCRIPTIONS.has(uuid) &&
            !BLUETOOTH.GENERIC_GATT_SERVICE_SHORT_ID_DESCRIPTIONS.has(short_uuid))
            console.log(`Unknown service found: ${uuid}`);

        //getCharacteristics can fail!
        //Unhandled Rejection (NetworkError): Failed to execute 'getCharacteristics' on 'BluetoothRemoteGATTService': GATT Server is disconnected. Cannot retrieve characteristics. (Re)connect first with `device.gatt.connect`.
        if (uuid === BLUETOOTH.ARANET4_SENSOR_SERVICE_UUID)
            characteristics = await services[serviceIndex].getCharacteristics();
    }

    if (characteristics === null) {
        console.log("Set History Parameters characteristics not found!");
        // TODO: Throw Error
    }

    return await loopOverCharacteristics(characteristics);
}

export async function getAllBluetoothInfo() {
    console.log("getting device");
    const device = await getADevice();

    //https://source.chromium.org/chromium/chromium/src/+/main:content/browser/bluetooth/web_bluetooth_service_impl.cc;drc=0a303e330572dd85a162460d4d9e9959e2c917a6;bpv=1;bpt=1;l=1986?q=requestDevice%20lang:C%2B%2B&ss=chromium
    console.log(`device.id: ${device.id} (unique)`);
    console.log(`device.name: ${device.name}`);

    if (device.gatt === undefined) {
        debugger;
        return;
    }
    const deviceServer = await device.gatt.connect();

    const services = await deviceServer.getPrimaryServices();
    console.log(`${services.length} services:`);
    checkServiceNames(services);

    console.log(`----`);
    console.log(`----`);


    console.log(`Got services (length: ${services.length}):`);
    const allCo2Data = await loopOverServices(services);

    // Check co2Data
    console.log(`co2Data: ${allCo2Data.co2}`);
    console.log(`interval: ${allCo2Data.interval}, ago: ${allCo2Data.ago}`);

    // Process data

    // Send to server

}