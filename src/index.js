import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js';
import { getFirestore, collection, doc, setDoc, addDoc, getDoc, getDocs } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js';
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