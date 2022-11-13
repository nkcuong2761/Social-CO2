//import firebase from 'firebase/app';
import 'firebase/firestore';
//import {useCollectionData} from 'react-firebase-hooks/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, addDoc, getDoc, getDocs, connectFirestoreEmulator } from 'firebase/firestore';
// import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js';
// import firebase from './Firebase.js';  

// const firebaseConfig = {
//   apiKey: "AIzaSyCRSc9yPEA3i9unBDcVzctM00L9gB2pCmk",
//   authDomain: "bucknell-social-ventilation.firebaseapp.com",
//   projectId: "bucknell-social-ventilation",
//   storageBucket: "bucknell-social-ventilation.appspot.com",
//   messagingSenderId: "206138886904",
//   appId: "1:206138886904:web:521c2645b5a5503537890d",
//   measurementId: "G-WHE5G8MJBS"
// };
 
// TODO: Set lastupdated as argument
export async function dataToFirebase(db, allCo2List, lastUpdated, locationName, category, imageURL, longitude, latitude){
  // const firebaseApp = initializeApp(firebaseConfig);
  // const db = getFirestore(firebaseApp);
  // db = firebase.firestore()
  // connectFirestoreEmulator(db, 'localhost', 8080);
  const locationRef = collection(db, `/raw/${locationName}/data`);
  // const lastUpdatedRef = doc(collection(db, `/aggregated/${locationName}/data`), 'last-updated');
  // let lastUpdated_obj = (await getDoc(lastUpdatedRef)).data();
  // let lastUpdated = 0;
  // if (!lastUpdated_obj) {
  //   lastUpdated = 0;
  // } else {
  //   lastUpdated = lastUpdated_obj["value"];
  // }
  // console.log(`lastUpdated=${lastUpdated}`);
    
  if (lastUpdated === 0) {
    await setDoc(doc(locationRef, `general-info`), {
      category: category,
      image: imageURL,
      longitude: longitude,
      latitude: latitude
    });
  }
  // await setDoc(doc(locationRef, `general-info`), {
  //   category: category,
  //   image: imageURL,
  //   longitude: longitude,
  //   latitude: latitude
  // });
  
  if (allCo2List.now - allCo2List.ago * 1000 - allCo2List.co2.length * allCo2List.interval * 1000 > lastUpdated) {
    await setDoc(doc(locationRef), {
      interval: allCo2List.interval,
      ago: allCo2List.ago,
      now: allCo2List.now,
      co2: allCo2List.co2, //actually just all number, so can be [1534183990, 10, 200, 300] as [timestamp, timestep, all CO2 level]
    });
  } else {
    const earliestIndex = Math.floor((allCo2List.now - allCo2List.ago * 1000 - lastUpdated) / (allCo2List.interval * 1000));
    console.log(`earliestIndex=${earliestIndex}`);
    if (earliestIndex > 0) {
      await setDoc(doc(locationRef), {
        interval: allCo2List.interval,
        ago: allCo2List.ago,
        now: allCo2List.now,
        co2: allCo2List.co2.slice(0,earliestIndex), //actually just all number, so can be [1534183990, 10, 200, 300] as [timestamp, timestep, all CO2 level]
      });
    }
  }

  // await setDoc(doc(locationRef, nthPull_CO2), {
  //     category: category,
  //     interval: allCo2List.interval,
  //     ago: allCo2List.ago,
  //     now: allCo2List.now,
  //     co2: allCo2List.co2, //actually just all number, so can be [1534183990, 10, 200, 300] as [timestamp, timestep, all CO2 level]
  //     image: imageURL
  // });
}
