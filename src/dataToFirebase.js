//import firebase from 'firebase/app';
import 'firebase/firestore';
//import {useCollectionData} from 'react-firebase-hooks/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, addDoc, getDoc, getDocs, connectFirestoreEmulator } from 'firebase/firestore';
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
 
export async function dataToFirebase(locationName, nthPull_CO2, category, allCo2List, imageURL){
    const firebaseApp = initializeApp(firebaseConfig);
    const db = getFirestore(firebaseApp);
    // const db = getFirestore();
    const locationRef = collection(db, `/raw/${locationName}/data`);
    connectFirestoreEmulator(db, 'localhost', 8080);
  
    await setDoc(doc(locationRef, nthPull_CO2), {
        category: category,
        interval: allCo2List.interval,
        ago: allCo2List.ago,
        now: allCo2List.now,
        co2: allCo2List.co2, //actually just all number, so can be [1534183990, 10, 200, 300] as [timestamp, timestep, all CO2 level]
        image: imageURL
    });
  }
