
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { assert } = require('@firebase/util');
admin.initializeApp()

const db = admin.firestore();

// const locationRef = collection(db, locationName);

function convertToHourlyCo2(allCo2List) {
    // Initialize
    let sumHourlyCo2 = {};
    for (let day = 0; day < 7; day++) { // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
        for (let hour = 0; hour < 24; hour++) // From 0h - 23h 
            sumHourlyCo2[`${day}-${hour}`] = 0;
    }

    let countHourlyCo2 = {}; // Number of measurements in the same day-hour
    for (let day = 0; day < 7; day++) { // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
        for (let hour = 0; hour < 24; hour++) // From 0h - 23h 
            countHourlyCo2[`${day}-${hour}`] = 0;
    }

    // Assign actual CO2 data
    let dateLatestMeasurement = allCo2List.now - allCo2List.ago * 1000; // Multiply 1000 to convert milisecond to second
    for (let i = 0; i < allCo2List.co2.length; i++) { 
        let date = new Date(dateLatestMeasurement - i * allCo2List.interval * 1000); // Multiply 1000 to convert milisecond to second
        let day = date.getDay();
        let hour = date.getHours();
        sumHourlyCo2[`${day}-${hour}`] += allCo2List.co2[i];   
        countHourlyCo2[`${day}-${hour}`] += 1;
    }
    return [sumHourlyCo2, countHourlyCo2];  
}

function getAverageHourlyCo2(sumHourlyCo2, countHourlyCo2) {
    let averageHourlyCo2 = {...sumHourlyCo2}; // Copy dictionary
    for (var key in averageHourlyCo2) {
        if (countHourlyCo2[key] != 0) {
            averageHourlyCo2[key] /= countHourlyCo2[key];
        }
    }
    return averageHourlyCo2;
}

exports.aggregateCo2Data = functions.firestore
    .document('/raw/{location}/data/{measurementID}')
    .onCreate(async (snap, context) => {
        // Get the data written to Realtime Database
        console.log(`Location & MeasurementID: ${context.params.location}, ${context.params.measurementID}`);
        const now = snap.data().now;
        const ago = snap.data().ago;
        const co2 = snap.data().co2;
        const interval = snap.data().interval;
        console.log(`Now is: ${now}`);

        const aggregatedAverageRef = db
        .collection('aggregated')
        .doc(`${context.params.location}`)
        .collection('data')
        .doc('average');

        const aggregatedCountRef = db
        .collection('aggregated')
        .doc(`${context.params.location}`)
        .collection('data')
        .doc('count');

        aggregatedAverageRef.get()
        .then((docSnapshot) => {
            if (docSnapshot.exists) {
                // Pass
                console.log("Document exists");
            } else {
                console.log("Document does not exist, creating..");
                // Initialize
                let averageHourlyCo2 = {};
                for (let day = 0; day < 7; day++) { // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
                    for (let hour = 0; hour < 24; hour++) // From 0h - 23h 
                        averageHourlyCo2[`${day}-${hour}`] = 0; 
                }
                let countHourlyCo2 = {}; // Number of measurements in the same day-hour
                for (let day = 0; day < 7; day++) { // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
                    for (let hour = 0; hour < 24; hour++) // From 0h - 23h 
                        countHourlyCo2[`${day}-${hour}`] = 0;
                }
                // Create the documents 
                aggregatedAverageRef.set(averageHourlyCo2); 
                aggregatedCountRef.set(countHourlyCo2);
            }
        });
          
        let averageHourlyCo2 = (await aggregatedAverageRef.get()).data(); // A dictionary
        let countHourlyCo2 = (await aggregatedCountRef.get()).data(); // Another dictionary
        assert(averageHourlyCo2);
        assert(countHourlyCo2);
        
        let sumHourlyCo2 = {};
        for (let day = 0; day < 7; day++) { // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
            for (let hour = 0; hour < 24; hour++) // From 0h - 23h 
                sumHourlyCo2[`${day}-${hour}`] = 0; 
        }
        let countHourlyCo2_new = {}; // Number of measurements in the same day-hour
        for (let day = 0; day < 7; day++) { // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
            for (let hour = 0; hour < 24; hour++) // From 0h - 23h 
                countHourlyCo2_new[`${day}-${hour}`] = 0;
        }

        // Assign actual CO2 data
        let dateLatestMeasurement = now - ago * 1000; // Multiply 1000 to convert milisecond to second
        for (let i = 0; i < co2.length; i++) { 
            let date = new Date(dateLatestMeasurement - i * interval * 1000); // Multiply 1000 to convert milisecond to second
            let day = date.getDay();
            let hour = date.getHours();
            sumHourlyCo2[`${day}-${hour}`] += co2[i];   
            countHourlyCo2_new[`${day}-${hour}`] += 1;
        }

        // let averageHourlyCo2 = {...sumHourlyCo2}; // Copy dictionary
        for (var key in averageHourlyCo2) {
            if (countHourlyCo2_new[key] != 0) {
                averageHourlyCo2[key] = (averageHourlyCo2[key]*countHourlyCo2[key] + sumHourlyCo2[key]) / (countHourlyCo2[key] + countHourlyCo2_new[key]);
                countHourlyCo2[key] += countHourlyCo2_new[key];
            }
        }

        console.log(`Agg Avg: ${JSON.stringify(averageHourlyCo2)}`);
        console.log(`Count Avg: ${JSON.stringify(countHourlyCo2)}`);
        aggregatedAverageRef.set(averageHourlyCo2); 
        aggregatedCountRef.set(countHourlyCo2);
    });

// await setDoc(doc(locationRef, nthPull_CO2), {
//     category: category,
//     interval: allCo2List.interval,
//     ago: allCo2List.ago,
//     now: allCo2List.now,
//     co2: allCo2List.co2, //actually just all number, so can be [1534183990, 10, 200, 300] as [timestamp, timestep, all CO2 level]
//     image: imageURL
// });