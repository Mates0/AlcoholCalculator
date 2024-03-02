// Import the functions you need from the SDKs you need
import {initializeApp} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {getDatabase, get, ref, set} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA6angt8_xASccfe0jBmuPjm0LM71jgoG4",
    authDomain: "alcoholcalculatorxd.firebaseapp.com",
    databaseURL: "https://alcoholcalculatorxd-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "alcoholcalculatorxd",
    storageBucket: "alcoholcalculatorxd.appspot.com",
    messagingSenderId: "701660401382",
    appId: "1:701660401382:web:736fd4dfdd08a17aecf527"
};
const app = initializeApp(firebaseConfig);

let userCreds = JSON.parse(sessionStorage.getItem('user-creds'));

export function addNewAlcoholToLists(beers, wines, liquor) {
    let name = document.getElementById("alcohol-name").value;
    let alcoholContent = parseFloat(document.getElementById("percentage-of-alcohol").value);
    let type = document.getElementById("inputState").value;

    let alcohol = {
        name: name,
        alcoholcontent: alcoholContent
    };

    if (type === "Piva") {
        beers.push(alcohol);
    } else if (type === "Vína") {
        wines.push(alcohol);
    } else if (type === "Tvrdý alkohol") {
        liquor.push(alcohol);
    }

    if (userCreds) {
        saveCustomAlcoholListsToDatabase(beers, wines, liquor, userCreds.uid);
    }

    document.getElementById("alcohol-name").value = "";
    document.getElementById("percentage-of-alcohol").value = "";
    document.getElementById("inputState").selectedIndex = 0;
}

function saveCustomAlcoholListsToDatabase(beers, wines, liquor, userId) {
    const db = getDatabase();
    const userAlcoholListsRef = ref(db, `users/${userId}/customAlcoholLists`);

    // Construct the data object containing all three lists
    const customAlcoholLists = {
        beers: beers,
        wines: wines,
        liquor: liquor
    };

    // Set the entire object to the database
    set(userAlcoholListsRef, customAlcoholLists)
        .then(() => {
            console.log("Custom alcohol lists saved to database");
        })
        .catch((error) => {
            console.error("Error saving custom alcohol lists to database:", error);
        });
}
