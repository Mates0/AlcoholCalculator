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

export function calculateAlcohol(addedAlcohol) {
    let weight = document.getElementById("weightForm").value
    localStorage.setItem('inputValue', weight);
    let gender = document.getElementById("genderForm").value
    localStorage.setItem("selectedGender", gender)
    let timeInput = document.getElementById("timeForm").value;
    localStorage.setItem('selectedTime', timeInput);
    localStorage.setItem('timeAndVolume', JSON.stringify(addedAlcohol));

    let userCreds = JSON.parse(sessionStorage.getItem("user-creds"));

    if (userCreds) {
        saveSessionStorageToUserProfile(userCreds, addedAlcohol)
            .then(() => {
                window.location.href = 'graphPage.html';
            })
            .catch((error) => {
                console.error("Error saving data:", error);
            });
    } else {
        window.location.href = 'graphPage.html';
    }
}

function saveSessionStorageToUserProfile(userCreds, addedAlcohol) {
    const db = getDatabase();

    const userProfileRef = ref(db, 'users/' + userCreds.uid + '/historyOfCalculatedAlcohol');

    return get(userProfileRef)
        .then((snapshot) => {
            const currentData = snapshot.val() || [];

            addedAlcohol.dateTime = new Date().toISOString();
            currentData.push(addedAlcohol);

            return set(userProfileRef, currentData);

        }).catch((error) => {
        console.error("Error saving data to user profile:", error);
    });
}
